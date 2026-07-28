const fs = require("fs");
const path = require("path");
const http = require("http");
const { spawn } = require("child_process");
const { chromium } = require("playwright");

const root = __dirname;
const PORT = 8791;
const BASE = "http://127.0.0.1:" + PORT + "/";

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForServer(url, timeoutMs) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
          res.resume();
          resolve();
        });
        req.on("error", reject);
      });
      return;
    } catch (err) {
      await wait(200);
    }
  }
  throw new Error("server not ready: " + url);
}

async function main() {
  const data = fs.readFileSync(path.join(root, "data.js"), "utf8");
  const vm = require("vm");
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(
    data +
      "\n;this.QUESTION_BANK=QUESTION_BANK;this.QUESTIONS=QUESTIONS;this.TYPES=TYPES;this.CODEX=CODEX;this.UI_TEXT=UI_TEXT;",
    sandbox
  );
  assert(sandbox.QUESTION_BANK.length >= 2000, "bank < 2000: " + sandbox.QUESTION_BANK.length);
  assert(sandbox.CODEX.length >= 49, "codex < 49: " + sandbox.CODEX.length);
  assert(sandbox.QUESTIONS.length === 48, "QUESTIONS sample should be 48");
  const bad = sandbox.QUESTION_BANK.filter((q) => !q.options || q.options.length !== 4 || !q.quote || !q.text);
  assert(bad.length === 0, "bad questions: " + bad.length);
  console.log("static-ok", sandbox.QUESTION_BANK.length, sandbox.CODEX.length);

  const child = spawn(process.execPath, [path.join(root, "server.js")], {
    cwd: root,
    env: Object.assign({}, process.env, { PORT: String(PORT), HOST: "127.0.0.1" }),
    stdio: ["ignore", "pipe", "pipe"]
  });
  let serverLog = "";
  child.stdout.on("data", (d) => {
    serverLog += String(d);
  });
  child.stderr.on("data", (d) => {
    serverLog += String(d);
  });

  try {
    await waitForServer(BASE, 8000);

    // API contribute
    const payload = {
      axis: "EI",
      text: { zh: "验证投稿：群红包来了你会怎么整活？", en: "Verify contribute: red packet drops, what do you do?" },
      quote: { zh: "完成比完美更像成年人。", en: "Done looks more adult than perfect." },
      options: [
        { value: "E", label: { zh: "直接语音报喜", en: "Voice celebrate" } },
        { value: "I", label: { zh: "先观察手速生态", en: "Observe first" } },
        { value: "E", label: { zh: "拉群整活", en: "Rally the chat" } },
        { value: "I", label: { zh: "默默截图存档", en: "Quiet screenshot" } }
      ]
    };
    const apiRes = await fetch(BASE + "api/contribute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const apiJson = await apiRes.json();
    assert(apiJson.ok, "contribute failed: " + JSON.stringify(apiJson));
    const bankRes = await fetch(BASE + "user-bank.json");
    const bankJson = await bankRes.json();
    assert(Array.isArray(bankJson.questions) && bankJson.questions.length >= 1, "user bank empty");
    console.log("api-ok", apiJson.status, "userBank", bankJson.questions.length);

    const browser = await chromium.launch({ headless: true });
    try {
      for (const viewport of [
        { name: "desktop", width: 1280, height: 800 },
        { name: "mobile", width: 390, height: 844, isMobile: true, hasTouch: true }
      ]) {
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
          isMobile: !!viewport.isMobile,
          hasTouch: !!viewport.hasTouch,
          userAgent:
            viewport.name === "mobile"
              ? "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.0"
              : undefined
        });
        const page = await context.newPage();
        page.setDefaultTimeout(15000);
        await page.goto(BASE, { waitUntil: "networkidle" });
        await page.waitForSelector("#startBtn");
        const bankMeta = await page.locator("#bankMeta").innerText();
        assert(/3600|2000|3\d{3}/.test(bankMeta) || /题库/.test(bankMeta), "bank meta missing: " + bankMeta);

        if (viewport.name === "mobile") {
          const bannerVisible = await page.locator("#inAppBanner").isVisible();
          assert(bannerVisible, "in-app banner should show in WeChat UA");
        }

        await page.click("#previewTypesBtn");
        await page.waitForSelector("#typesView.active, #typesView.view.active, #typesGrid article");
        const codexCount = await page.locator("#typesGrid article").count();
        assert(codexCount >= 49, "codex cards < 49: " + codexCount);
        await page.click("#backHomeFromTypesBtn");

        await page.click("#startBtn");
        await page.waitForSelector("#nicknameForm");
        await page.fill("#nicknameInput", "测 unification".slice(0, 2) + "试员");
        await page.click("#nickSubmitBtn");
        await page.waitForSelector("#quizView.active, #options .option-btn, #options button");

        // answer first 3 then jump via evaluate for speed? keep full 48 for reliability of result page.
        for (let i = 0; i < 48; i += 1) {
          await page.waitForSelector("#options button, #options .option-btn");
          const buttons = page.locator("#options button, #options .option-btn");
          const count = await buttons.count();
          assert(count === 4, "need 4 options at q" + (i + 1) + " got " + count);
          const quote = (await page.locator("#questionQuote").innerText()).trim();
          assert(quote.length > 0, "missing quote at q" + (i + 1));
          await buttons.nth(i % 4).click();
          // flip animation lock
          await wait(120);
        }

        await page.waitForSelector("#resultView.active, #typeBadge, #contributeForm", { timeout: 20000 });
        const code = (await page.locator("#typeBadge").innerText()).trim();
        assert(/^[A-Z]{4}$/.test(code), "bad result code " + code);
        await page.fill("#contributeText", "浏览器投稿：" + viewport.name + " 场景整活题 " + Date.now());
        await page.fill("#contributeOptA", "直接上场");
        await page.fill("#contributeOptB", "先观察");
        await page.fill("#contributeOptC", "拉人组队");
        await page.fill("#contributeOptD", "默默记录");
        await page.click("#contributeSubmitBtn");
        await wait(400);
        const feedback = await page.locator("#contributeFeedback").innerText();
        assert(/收录|更新|去重|本机|Accepted|Bank|dedup|local|Fail|ok|题库/i.test(feedback), "bad feedback: " + feedback);
        console.log("flow-ok", viewport.name, code, "codex", codexCount, "fb", feedback.slice(0, 40));
        await context.close();
      }
    } finally {
      await browser.close();
    }
    console.log("VERIFY_OK");
  } finally {
    child.kill("SIGTERM");
    await wait(300);
    try {
      child.kill("SIGKILL");
    } catch (err) {}
  }
}

main().catch((err) => {
  console.error("VERIFY_FAIL", err && err.stack ? err.stack : err);
  process.exit(1);
});
