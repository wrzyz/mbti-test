const fs = require("fs");
const path = require("path");
const vm = require("vm");
const http = require("http");
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

function checkSyntaxAndData() {
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
  assert(Array.isArray(sandbox.QUESTION_BANK) && sandbox.QUESTION_BANK.length >= 1000, "QUESTION_BANK should be 1000+");
  assert(Array.isArray(sandbox.QUESTIONS) && sandbox.QUESTIONS.length >= 40, "QUESTIONS should be 40+");
  assert(Object.keys(sandbox.TYPES).length === 16, "TYPES should be 16");
  assert(Object.keys(sandbox.CAREERS).length === 16, "CAREERS should be 16");
  assert(Object.keys(sandbox.MATCHES).length === 16, "MATCHES should be 16");
  const probe = sandbox.QUESTION_BANK.slice(0, 40).concat(sandbox.QUESTIONS);
  for (const q of probe) {
    assert(q.options.length === 4, "each question needs 4 options");
    assert(q.text.zh && q.text.en, "bilingual question text required");
    assert(q.quote && q.quote.zh && q.quote.en, "each question needs bilingual quote");
  }
  for (const code of Object.keys(sandbox.TYPES)) {
    const info = sandbox.TYPES[code];
    assert(info.philosophy && info.philosophy.zh, "type philosophy missing " + code);
    assert(info.vibe && info.vibe.zh, "type vibe missing " + code);
    assert(info.loveStyle && info.loveStyle.zh, "type loveStyle missing " + code);
    assert(info.bestScene && info.bestScene.zh, "type bestScene missing " + code);
  }
  const requiredIds = [
    "homeView", "nicknameView", "quizView", "resultView", "typesView",
    "startBtn", "nicknameForm", "nicknameInput", "options", "typeBadge",
    "generatePosterBtn", "posterModal", "soundBtn", "langBtn",
    "questionQuote", "quoteLabel", "phonePanel", "typesGrid", "bankMeta"
  ];
  for (const id of requiredIds) {
    assert(html.includes('id="' + id + '"'), "missing id " + id);
  }
  console.log("static-check ok");
}

async function browserFlow() {
  const server = http.createServer((req, res) => {
    let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    if (urlPath === "/") urlPath = "/index.html";
    const filePath = path.join(root, path.normalize(urlPath).replace(/^([.][.][\\/])+/, "").replace(/^[\\/]+/, ""));
    if (!filePath.startsWith(root) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.writeHead(404);
      res.end("not found");
      return;
    }
    res.writeHead(200, { "Content-Type": typeOf(filePath), "Cache-Control": "no-store" });
    res.end(fs.readFileSync(filePath));
  });

  // Avoid Chromium unsafe ports (e.g. 5060) from OS-assigned listen(0).
  const preferredPorts = [8765, 8766, 8767, 8877, 8899, 9001, 9010, 9123];
  let port = null;
  for (const candidate of preferredPorts) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve, reject) => {
        const onError = (err) => {
          server.off("listening", onListening);
          reject(err);
        };
        const onListening = () => {
          server.off("error", onError);
          resolve();
        };
        server.once("error", onError);
        server.once("listening", onListening);
        server.listen(candidate, "127.0.0.1");
      });
      port = candidate;
      break;
    } catch (err) {
      if (!err || err.code !== "EADDRINUSE") throw err;
    }
  }
  if (!port) throw new Error("no free safe port for verify server");
  const base = "http://127.0.0.1:" + port;
  console.log("server", base);

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    for (const [label, viewport] of [
      ["desktop", { width: 1280, height: 800 }],
      ["mobile", { width: 390, height: 844 }]
    ]) {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(base + "/", { waitUntil: "domcontentloaded", timeout: 10000 });
      console.log(label, "loaded");
      await page.click("#startBtn");
      await page.waitForSelector("#nicknameView.active", { timeout: 5000 });
      console.log(label, "nickname");
      await page.fill("#nicknameInput", "LabFox");
      await page.click("#nickSubmitBtn");
      await page.waitForSelector("#quizView.active", { timeout: 5000 });
      console.log(label, "quiz");
      const runtime = await page.evaluate(() => ({
        bank: typeof QUESTION_BANK !== "undefined" ? QUESTION_BANK.length : 0,
        total: (document.querySelector("#progressLabel") || {}).textContent || "",
        bankMeta: (document.querySelector("#quizBankMeta") || {}).textContent || ""
      }));
      assert(runtime.bank >= 1000, "runtime bank should be 1000+");
      assert(/48/.test(runtime.total) || /48/.test(runtime.bankMeta), "run size should be 48");
      const totalQ = 48;
      for (let i = 0; i < totalQ; i++) {
        const quote = ((await page.textContent("#questionQuote")) || "").trim();
        assert(quote.length > 0, "missing quote on question " + (i + 1));
        const optionCount = await page.locator("#options .option-btn").count();
        assert(optionCount === 4, "need 4 options on question " + (i + 1));
        const progressBefore = ((await page.textContent("#progressLabel")) || "").trim();
        await page.locator("#options .option-btn").nth(i % 4).click({ timeout: 5000, force: true });
        if (i < totalQ - 1) {
          await page.waitForFunction(
            (prev) => {
              const now = (document.querySelector("#progressLabel") || {}).textContent || "";
              return now.trim() && now.trim() !== prev;
            },
            progressBefore,
            { timeout: 5000 }
          );
        }
      }
      await page.waitForSelector("#resultView.active", { timeout: 8000 });
      const code = ((await page.textContent("#typeBadge")) || "").trim();
      assert(/^[EISNTFJP]{4}$/.test(code), "invalid type code " + code);
      await page.click("#generatePosterBtn");
      await page.waitForSelector("#posterModal:not([hidden])", { timeout: 5000 });
      const posters = await page.locator("#posterSquare canvas, #posterTall canvas").count();
      assert(posters === 2, "posters missing");
      const box = await page.locator(".app-shell, .shell").boundingBox();
      assert(box && box.width > 200, "layout width invalid");
      // Close poster modal, return home, then open 16-type codex.
      await page.locator("#posterModal [data-close-poster]").last().click({ force: true });
      await page.waitForSelector("#posterModal[hidden]", { timeout: 5000 });
      await page.click("#retryBtn");
      await page.waitForSelector("#nicknameView.active", { timeout: 5000 });
      await page.click("#nickBackBtn");
      await page.waitForSelector("#homeView.active", { timeout: 5000 });
      await page.click("#previewTypesBtn");
      await page.waitForSelector("#typesView.active", { timeout: 5000 });
      const codexCount = await page.locator("#typesGrid .type-tile").count();
      assert(codexCount === 16, "codex should list 16 types");
      console.log(label, "ok", code, "width", Math.round(box.width));
      if (errors.length) throw new Error(label + " " + errors.join("; "));
      await context.close();
    }
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}

(async () => {
  checkSyntaxAndData();
  await browserFlow();
  console.log("ALL_OK");
})().catch((err) => {
  console.error("FAIL", err);
  process.exit(1);
});
