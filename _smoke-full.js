const http = require("http");
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const root = __dirname;
function typeOf(file) {
  if (file.endsWith(".html")) return "text/html; charset=utf-8";
  if (file.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (file.endsWith(".css")) return "text/css; charset=utf-8";
  return "application/octet-stream";
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

(async () => {
  const server = http.createServer((req, res) => {
    let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    if (urlPath === "/") urlPath = "/index.html";
    const filePath = path.join(
      root,
      path.normalize(urlPath).replace(/^([.][.][\\/])+/, "").replace(/^[\\/]+/, "")
    );
    if (!filePath.startsWith(root) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.writeHead(404);
      res.end("not found");
      return;
    }
    res.writeHead(200, { "Content-Type": typeOf(filePath), "Cache-Control": "no-store" });
    res.end(fs.readFileSync(filePath));
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(8765, "127.0.0.1", resolve);
  });

  const base = "http://127.0.0.1:8765";
  const browser = await chromium.launch({ headless: true });

  for (const [label, viewport] of [
    ["desktop", { width: 1280, height: 800 }],
    ["mobile", { width: 390, height: 844 }]
  ]) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(base + "/", { waitUntil: "domcontentloaded", timeout: 10000 });
    await page.click("#startBtn");
    await page.waitForSelector("#nicknameView.active", { timeout: 5000 });
    await page.fill("#nicknameInput", "LabFox");
    await page.click("#nickSubmitBtn");
    await page.waitForSelector("#quizView.active", { timeout: 5000 });
    const totalQ = await page.evaluate(() => QUESTIONS.length);
    assert(totalQ >= 40, "need 40+ questions");
    console.log(label, "answering", totalQ);
    for (let i = 0; i < totalQ; i++) {
      const quote = ((await page.textContent("#questionQuote")) || "").trim();
      assert(quote.length > 0, "missing quote " + (i + 1));
      assert((await page.locator("#options .option-btn").count()) === 4, "need 4 options " + (i + 1));
      const before = ((await page.textContent("#progressLabel")) || "").trim();
      await page.locator("#options .option-btn").nth(i % 4).click({ timeout: 5000, force: true });
      if (i < totalQ - 1) {
        await page.waitForFunction(
          (prev) => {
            const now = (document.querySelector("#progressLabel") || {}).textContent || "";
            return now.trim() && now.trim() !== prev;
          },
          before,
          { timeout: 5000 }
        );
      }
      if ((i + 1) % 12 === 0) console.log(label, "progress", i + 1);
    }
    await page.waitForSelector("#resultView.active", { timeout: 8000 });
    const code = ((await page.textContent("#typeBadge")) || "").trim();
    assert(/^[EISNTFJP]{4}$/.test(code), "bad code " + code);
    await page.click("#generatePosterBtn");
    await page.waitForSelector("#posterModal:not([hidden])", { timeout: 5000 });
    assert((await page.locator("#posterSquare canvas, #posterTall canvas").count()) === 2, "posters missing");
    await page.locator("#posterModal [data-close-poster]").last().click({ force: true });
    await page.click("#retryBtn");
    await page.waitForSelector("#nicknameView.active", { timeout: 5000 });
    await page.click("#nickBackBtn");
    await page.waitForSelector("#homeView.active", { timeout: 5000 });
    await page.click("#previewTypesBtn");
    await page.waitForSelector("#typesView.active", { timeout: 5000 });
    assert((await page.locator("#typesGrid .type-tile").count()) === 16, "codex missing");
    if (errors.length) throw new Error(label + " " + errors.join("; "));
    console.log(label, "OK", code);
    await context.close();
  }

  await browser.close();
  server.close();
  console.log("ALL_OK");
})().catch((err) => {
  console.error("FAIL", err && err.stack ? err.stack : err);
  process.exit(1);
});
