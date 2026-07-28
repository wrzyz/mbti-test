const { chromium } = require("playwright");
const fs = require("fs");
(async () => {
  const log = [];
  const p = (...a) => {
    const s = a.map(String).join(" ");
    log.push(s);
    console.log(s);
  };
  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push("console:" + m.text());
    });
    const t0 = Date.now();
    await page.goto("http://127.0.0.1:8090/", { waitUntil: "domcontentloaded", timeout: 30000 });
    p("goto_ms", Date.now() - t0);
    await page.waitForSelector("#startBtn", { timeout: 10000 });
    p("start_text", await page.locator("#startBtn").innerText());
    p("disabled_before", await page.locator("#startBtn").isDisabled());
    const t1 = Date.now();
    await page.waitForFunction(
      () => {
        const btn = document.getElementById("startBtn");
        const n = (window.QUESTION_BANK && window.QUESTION_BANK.length) || 0;
        return btn && !btn.disabled && n >= 50000;
      },
      null,
      { timeout: 120000 }
    );
    p("bank_ms", Date.now() - t1);
    const meta = await page.locator("#bankMeta").innerText();
    const info = await page.evaluate(() => ({
      n: window.QUESTION_BANK.length,
      cats: document.querySelectorAll("#categoryGrid .category-chip").length,
      ready: !document.getElementById("startBtn").disabled
    }));
    p(JSON.stringify({ meta, info, errors }));
    await page.click("#startBtn");
    await page.waitForSelector("#nicknameInput", { timeout: 10000 });
    p("nickname_ok");
    await page.fill("#nicknameInput", "测试员");
    await page.click("#nickSubmitBtn");
    await page.waitForSelector("#options button", { timeout: 10000 });
    const opts = await page.locator("#options button").count();
    const q = await page.locator("#questionText").innerText();
    p("quiz_ok", opts, q.slice(0, 40));
    await browser.close();
    p("SMOKE_OK");
    try { fs.writeFileSync("smoke-async-result.txt", log.join("\n"), "utf8"); } catch (_) {}
  } catch (e) {
    p("FAIL", e && e.stack ? e.stack : e);
    try { fs.writeFileSync("smoke-async-result.txt", log.join("\n"), "utf8"); } catch (_) {}
    process.exit(1);
  }
})();
