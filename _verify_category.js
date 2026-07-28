const { spawn } = require("child_process");
const http = require("http");
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");

const root = __dirname;
const PORT = Number(process.env.PORT || 8090);
const BASE = "http://127.0.0.1:" + PORT + "/";

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}
function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
function killPort(port) {
  try {
    const out = require("child_process").execSync(
      "powershell -NoProfile -Command \"Get-NetTCPConnection -LocalPort " +
        port +
        " -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }\"",
      { stdio: ["ignore", "pipe", "pipe"] }
    );
    return String(out || "");
  } catch (err) {
    return "";
  }
}
async function waitReady(timeoutMs) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(BASE, (res) => {
          res.resume();
          resolve();
        });
        req.on("error", reject);
        req.setTimeout(1500, () => {
          req.destroy();
          reject(new Error("timeout"));
        });
      });
      return;
    } catch (err) {
      await wait(250);
    }
  }
  throw new Error("server not ready on " + BASE);
}

async function runViewport(browser, name, options) {
  const context = await browser.newContext(options);
  const page = await context.newPage();
  page.setDefaultTimeout(20000);
  const errors = [];
  page.on("pageerror", (err) => errors.push(String(err)));
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#startBtn");
  // wait bank async load
  await page.waitForFunction(() => {
    const btn = document.getElementById("startBtn");
    const meta = document.getElementById("bankMeta");
    const n = (window.QUESTION_BANK && window.QUESTION_BANK.length) || 0;
    return btn && !btn.disabled && n >= 50000 && meta && /\d{4,}/.test(meta.textContent || "");
  }, null, { timeout: 120000 });

  const bankMeta = await page.locator("#bankMeta").innerText();
  assert(/5\d{4}|50000|5万|\d{4,}/.test(bankMeta), name + " bank meta weak: " + bankMeta);

  const catCount = await page.locator("#categoryGrid .category-chip").count();
  assert(catCount >= 18, name + " categories too few: " + catCount);

  // pick love category
  const love = page.locator('#categoryGrid [data-topic="love"]');
  if (await love.count()) {
    await love.click();
    await wait(200);
  }

  await page.click("#startBtn");
  await page.waitForSelector("#nicknameView.active, #nicknameInput", { timeout: 10000 });
  await page.fill("#nicknameInput", "验证员" + name);
  await page.click("#nickSubmitBtn");
  await page.waitForSelector("#options button");

  const optionCount = await page.locator("#options button").count();
  assert(optionCount === 4, name + " options != 4: " + optionCount);
  const qText = (await page.locator("#questionText").innerText()).trim();
  const qQuote = (await page.locator("#questionQuote").innerText()).trim();
  assert(qText.length > 8, name + " empty question");
  assert(qQuote.length > 4, name + " empty quote");
  const optTexts = await page.locator("#options button").allTextContents();
  assert(optTexts.every((t) => t && t.trim().length > 4), name + " blank option");
  // no identical full option set labels
  assert(new Set(optTexts.map((t) => t.trim())).size === 4, name + " duplicate option labels on screen");

  // answer a few
  for (let i = 0; i < 3; i += 1) {
    await page.locator("#options button").nth(i % 4).click();
    await wait(180);
  }

  // force complete
  await page.evaluate(() => {
    const list = typeof activeQuestions === "function" ? activeQuestions() : window.QUESTIONS || [];
    const total = Math.max(48, list.length || 48);
    const answers = [];
    for (let i = 0; i < total; i += 1) {
      const q = list[i] || list[0];
      answers.push(q.options[i % q.options.length].value);
    }
    state.answers = answers;
    state.index = answers.length - 1;
    state.name = state.name || "验证员";
    renderResult(calcResult(answers), true);
  });
  await page.waitForSelector("#typeBadge");
  const code = (await page.locator("#typeBadge").innerText()).trim();
  assert(/^[A-Z]{4}$/.test(code), name + " bad type " + code);

  // mobile overflow check
  const overflow = await page.evaluate(() => ({
    sw: document.documentElement.scrollWidth,
    cw: document.documentElement.clientWidth
  }));
  assert(overflow.sw <= overflow.cw + 10, name + " horizontal overflow " + JSON.stringify(overflow));

  // category sampling quality
  const topicStats = await page.evaluate(() => {
    const list = typeof activeQuestions === "function" ? activeQuestions() : [];
    const topics = {};
    list.forEach((q) => {
      const t = q.topic || "na";
      topics[t] = (topics[t] || 0) + 1;
    });
    return { n: list.length, topics: topics, first: list[0] && list[0].text && list[0].text.zh };
  });

  assert(!errors.length, name + " page errors: " + errors.join(" | "));
  console.log(
    "OK",
    name,
    "bankMeta=",
    bankMeta,
    "type=",
    code,
    "session=",
    JSON.stringify(topicStats),
    "opts0=",
    optTexts[0].slice(0, 40)
  );
  await context.close();
}

async function main() {
  assert(fs.existsSync(path.join(root, "bank.json")), "bank.json missing");
  assert(fs.existsSync(path.join(root, "data.js")), "data.js missing");
  const bankSize = fs.statSync(path.join(root, "bank.json")).size;
  const dataSize = fs.statSync(path.join(root, "data.js")).size;
  assert(bankSize > 1000000, "bank.json too small");
  assert(dataSize < 2 * 1024 * 1024, "data.js still too large: " + dataSize);

  let child = null;
  let startedByUs = false;
  let alreadyUp = false;
  try {
    await waitReady(1500);
    alreadyUp = true;
    console.log("reuse existing server", BASE);
  } catch (err) {
    alreadyUp = false;
  }
  let log = "";
  if (!alreadyUp) {
    child = spawn(process.execPath, [path.join(root, "server.js")], {
      cwd: root,
      env: Object.assign({}, process.env, { PORT: String(PORT), HOST: "0.0.0.0" }),
      stdio: ["ignore", "pipe", "pipe"]
    });
    startedByUs = true;
    child.stdout.on("data", (d) => {
      log += String(d);
    });
    child.stderr.on("data", (d) => {
      log += String(d);
    });
  }
  try {
    await waitReady(10000);
    console.log(log.trim() || "server up");
    const browser = await chromium.launch({ headless: true });
    try {
      await runViewport(browser, "desktop", { viewport: { width: 1280, height: 800 } });
      await runViewport(browser, "mobile", {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
        userAgent:
          "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.42"
      });
    } finally {
      await browser.close();
    }
    console.log("VERIFY_OK");
  } catch (err) {
    console.error("VERIFY_FAIL", err && err.stack ? err.stack : err);
    console.error("SERVER_LOG", log);
    process.exitCode = 1;
} finally {
    if (startedByUs && child) {
      try {
        child.kill();
      } catch (err) {}
    }
  }
}

main();
