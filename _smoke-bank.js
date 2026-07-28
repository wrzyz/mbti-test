const fs = require("fs");
const path = require("path");
const vm = require("vm");
const http = require("http");
const { chromium } = require("playwright");

const root = __dirname;

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function typeOf(file) {
  if (file.endsWith(".html")) return "text/html; charset=utf-8";
  if (file.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (file.endsWith(".css")) return "text/css; charset=utf-8";
  return "application/octet-stream";
}

function staticCheck() {
  const data = fs.readFileSync(path.join(root, "data.js"), "utf8");
  const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  new vm.Script(data, { filename: "data.js" });
  new vm.Script(app, { filename: "app.js" });
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(
    data +
      "\n;this.QUESTION_BANK=QUESTION_BANK;this.QUESTIONS=QUESTIONS;this.TYPES=TYPES;this.CAREERS=CAREERS;this.MATCHES=MATCHES;this.UI_TEXT=UI_TEXT;",
    sandbox
  );
  assert(sandbox.QUESTION_BANK.length >= 1000, "bank < 1000");
  assert(sandbox.QUESTIONS.length === 48, "sample not 48");
  assert(Object.keys(sandbox.TYPES).length === 16, "types not 16");
  for (const id of ["bankMeta", "quizBankMeta", "questionQuote", "startBtn", "options"]) {
    assert(html.includes('id="' + id + '"'), "missing " + id);
  }
  assert(app.includes("sampleQuestions") && app.includes("updateBankMeta"), "app bank wiring missing");
  console.log("static-check ok", sandbox.QUESTION_BANK.length);
}

async function flow() {
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
    server.listen(0, "127.0.0.1", resolve);
  });
  const { port } = server.address();
  const base = "http://127.0.0.1:" + port;
  console.log("server", base);

  const browser = await chromium.launch({ headless: true });
  try {
    for (const [label, viewport] of [
      ["desktop", { width: 1280, height: 800 }],
      ["mobile", { width: 390, height: 844 }]
    ]) {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(base + "/", { waitUntil: "domcontentloaded", timeout: 20000 });
      const bankMeta = ((await page.textContent("#bankMeta")) || "").trim();
      assert(/\d{3,}/.test(bankMeta), "bankMeta missing on home: " + bankMeta);
      await page.click("#startBtn");
      await page.waitForSelector("#nicknameView.active", { timeout: 5000 });
      await page.fill("#nicknameInput", "LabFox");
      await page.click("#nickSubmitBtn");
      await page.waitForSelector("#quizView.active", { timeout: 5000 });

      const runtime = await page.evaluate(() => ({
        bank: QUESTION_BANK.length,
        progress: (document.querySelector("#progressLabel") || {}).textContent || "",
        quote: (document.querySelector("#questionQuote") || {}).textContent || "",
        options: document.querySelectorAll("#options .option-btn").length,
        quizMeta: (document.querySelector("#quizBankMeta") || {}).textContent || ""
      }));
      assert(runtime.bank >= 1000, "runtime bank too small");
      assert(runtime.options === 4, "need 4 options");
      assert(runtime.quote.trim().length > 0, "quote missing");
      assert(/48/.test(runtime.progress) || /48/.test(runtime.quizMeta), "not 48-run");

      await page.evaluate(async () => {
        for (let i = 0; i < 60; i++) {
          if (document.querySelector("#resultView.active")) break;
          const buttons = document.querySelectorAll("#options .option-btn");
          if (!buttons.length) break;
          buttons[i % buttons.length].click();
          await new Promise((resolve) => setTimeout(resolve, 140));
        }
      });

      await page.waitForSelector("#resultView.active", { timeout: 20000 });
      const code = ((await page.textContent("#typeBadge")) || "").trim();
      assert(/^[EISNTFJP]{4}$/.test(code), "bad code " + code);

      await page.click("#generatePosterBtn");
      await page.waitForSelector("#posterModal:not([hidden])", { timeout: 5000 });
      const posters = await page.locator("#posterSquare canvas, #posterTall canvas").count();
      assert(posters === 2, "posters missing");
      await page.locator("#posterModal [data-close-poster]").last().click({ force: true });
      await page.click("#retryBtn");
      await page.waitForSelector("#nicknameView.active", { timeout: 5000 });
      await page.click("#nickBackBtn");
      await page.waitForSelector("#homeView.active", { timeout: 5000 });
      await page.click("#previewTypesBtn");
      await page.waitForSelector("#typesView.active", { timeout: 5000 });
      const codexCount = await page.locator("#typesGrid .type-tile").count();
      assert(codexCount === 16, "codex not 16");
      const box = await page.locator(".app-shell").boundingBox();
      assert(box && box.width > 200, "layout broken");
      if (errors.length) throw new Error(label + " " + errors.join("; "));
      console.log(label, "ok", code, "width", Math.round(box.width));
      await context.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
}

(async () => {
  staticCheck();
  await flow();
  console.log("CONTENT_OK");
})().catch((err) => {
  console.error("FAIL", err && err.stack ? err.stack : err);
  process.exit(1);
});
