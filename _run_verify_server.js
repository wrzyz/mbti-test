const { spawn } = require("child_process");
const path = require("path");
const http = require("http");
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
        req.setTimeout(1000, () => {
          req.destroy();
          reject(new Error("timeout"));
        });
      });
      return;
    } catch (err) {
      await wait(200);
    }
  }
  throw new Error("server not ready");
}

async function getJson(url, opts) {
  const res = await fetch(url, opts);
  const data = await res.json().catch(async () => ({ raw: await res.text() }));
  return { status: res.status, data };
}

async function runViewport(browser, name, options) {
  const context = await browser.newContext(options);
  const page = await context.newPage();
  page.setDefaultTimeout(12000);
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#startBtn");
  const bankMeta = await page.locator("#bankMeta").innerText();
  assert(/[2-9]\d{3}/.test(bankMeta), name + " bank meta weak: " + bankMeta);
  if (options.userAgent && /MicroMessenger/i.test(options.userAgent)) {
    assert(await page.locator("#inAppBanner").isVisible(), name + " banner missing");
  }
  await page.click("#previewTypesBtn");
  await page.waitForSelector("#typesGrid article");
  const codexCount = await page.locator("#typesGrid article").count();
  assert(codexCount >= 49, name + " codex < 49: " + codexCount);
  await page.click("#backHomeFromTypesBtn");
  await page.click("#startBtn");
  await page.fill("#nicknameInput", "快测" + name);
  await page.click("#nickSubmitBtn");
  await page.waitForSelector("#options button");
  for (let i = 0; i < 4; i += 1) {
    const buttons = page.locator("#options button");
    assert((await buttons.count()) === 4, name + " options != 4");
    assert((await page.locator("#questionQuote").innerText()).trim().length > 0, name + " no quote");
    await buttons.nth(i % 4).click();
    await wait(150);
  }
  await page.evaluate(() => {
    const list = typeof activeQuestions === "function" ? activeQuestions() : QUESTIONS;
    const total = Math.max(48, list.length || 48);
    const answers = [];
    for (let i = 0; i < total; i += 1) {
      const q = list[i] || list[0];
      answers.push(q.options[i % q.options.length].value);
    }
    state.answers = answers;
    state.index = answers.length - 1;
    state.name = state.name || "快测员";
    renderResult(calcResult(answers), true);
  });
  await page.waitForSelector("#typeBadge");
  const code = (await page.locator("#typeBadge").innerText()).trim();
  assert(/^[A-Z]{4}$/.test(code), name + " bad code " + code);
  assert(await page.locator("#contributeForm").isVisible(), name + " no contribute form");
  const stamp = Date.now();
  await page.fill("#contributeText", name + " 投稿验证题 " + stamp + " 请收录");
  await page.fill("#contributeOptA", "直接上场");
  await page.fill("#contributeOptB", "先观察");
  await page.fill("#contributeOptC", "拉人组队");
  await page.fill("#contributeOptD", "默默记录");
  await page.click("#contributeSubmitBtn");
  await wait(500);
  const feedback = await page.locator("#contributeFeedback").innerText();
  assert(feedback.length > 0, name + " empty feedback");
  const overflow = await page.evaluate(() => ({
    sw: document.documentElement.scrollWidth,
    cw: document.documentElement.clientWidth
  }));
  assert(overflow.sw <= overflow.cw + 8, name + " overflow");
  console.log("OK", name, bankMeta, "codex", codexCount, code, feedback.slice(0, 40));
  await context.close();
}

async function main() {
  const child = spawn(process.execPath, [path.join(root, "server.js")], {
    cwd: root,
    env: Object.assign({}, process.env, { PORT: String(PORT), HOST: "127.0.0.1" }),
    stdio: ["ignore", "pipe", "pipe"]
  });
  let log = "";
  child.stdout.on("data", (d) => {
    log += String(d);
  });
  child.stderr.on("data", (d) => {
    log += String(d);
  });
  try {
    await waitReady(8000);
    console.log(log.trim());
    const api = await getJson(BASE + "api/contribute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        axis: "SN",
        text: { zh: "一体化验证投稿题请入库ABC", en: "integrated contribute ABC" },
        quote: { zh: "把尴尬当剧情。", en: "Treat cringe as plot." },
        options: [
          { value: "S", label: { zh: "先看细节", en: "details" } },
          { value: "N", label: { zh: "先脑补结局", en: "ending" } },
          { value: "S", label: { zh: "记录事实", en: "facts" } },
          { value: "N", label: { zh: "开脑洞", en: "ideas" } }
        ]
      })
    });
    assert(api.status === 200 && api.data.ok, "api fail " + JSON.stringify(api));
    console.log("api", api.data.status, api.data.size);
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
  } finally {
    child.kill();
  }
}

main().catch((err) => {
  console.error("VERIFY_FAIL", err && err.stack ? err.stack : err);
  process.exit(1);
});
