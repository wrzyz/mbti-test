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
    const filePath = path.join(root, path.normalize(urlPath).replace(/^([.][.][\\/])+/, "").replace(/^[\\/]+/, ""));
    if (!filePath.startsWith(root) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.writeHead(404);
      res.end("not found");
      return;
    }
    let data = fs.readFileSync(filePath);
    if (filePath.endsWith("index.html")) {
      const inject = '<script>window.LAB_PHONE_URL="http://192.168.2.6:8765/";window.LAB_LAN_URLS=["http://192.168.2.6:8765/"];</script>';
      data = Buffer.from(String(data).replace("</head>", inject + "</head>"));
    }
    res.writeHead(200, { "Content-Type": typeOf(filePath), "Cache-Control": "no-store" });
    res.end(data);
  });
  await new Promise((resolve) => server.listen(8765, "127.0.0.1", resolve));
  const browser = await chromium.launch({ headless: true });

  for (const [label, viewport] of [
    ["desktop", { width: 1280, height: 800 }],
    ["mobile", { width: 390, height: 844 }]
  ]) {
    const page = await browser.newPage({ viewport });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("http://127.0.0.1:8765/", { waitUntil: "domcontentloaded", timeout: 10000 });
    const phoneText = ((await page.textContent("#phoneLinkText")) || "").trim();
    assert(phoneText.includes("192.168.2.6"), "phone link missing lan");
    await page.click("#previewTypesBtn");
    await page.waitForSelector("#typesView.active", { timeout: 5000 });
    const codex = await page.locator("#typesGrid .type-tile.rich").count();
    assert(codex === 16, "codex count " + codex);
    const codexText = await page.locator("#typesGrid .type-tile.rich").first().innerText();
    assert(codexText.includes("哲理") || codexText.toLowerCase().includes("philosophy") || codexText.length > 80, "codex too thin");
    await page.click("#backHomeFromTypesBtn");
    await page.click("#startBtn");
    await page.waitForSelector("#nicknameView.active", { timeout: 5000 });
    await page.fill("#nicknameInput", "金句猎人");
    await page.click("#nickSubmitBtn");
    await page.waitForSelector("#quizView.active", { timeout: 5000 });
    const quote = ((await page.textContent("#questionQuote")) || "").trim();
    assert(quote.length > 8, "quote missing");
    assert(await page.isVisible("#quoteCard"), "quote card missing");
    assert((await page.locator("#options .option-btn").count()) === 4, "need 4 options");
    const totalQ = await page.evaluate(() => QUESTIONS.length);
    for (let i = 0; i < totalQ; i++) {
      const q = ((await page.textContent("#questionQuote")) || "").trim();
      assert(q.length > 0, "empty quote " + (i + 1));
      const before = ((await page.textContent("#progressLabel")) || "").trim();
      await page.locator("#options .option-btn").nth(i % 4).click({ force: true });
      if (i < totalQ - 1) {
        await page.waitForFunction((prev) => {
          const now = (document.querySelector("#progressLabel") || {}).textContent || "";
          return now.trim() && now.trim() !== prev;
        }, before, { timeout: 5000 });
      }
    }
    await page.waitForSelector("#resultView.active", { timeout: 8000 });
    if (errors.length) throw new Error(label + " " + errors.join("; "));
    console.log(label, "OK quote+codex");
    await page.close();
  }
  await browser.close();
  server.close();
  console.log("CONTENT_OK");
})().catch((err) => {
  console.error("CONTENT_FAIL", err);
  process.exit(1);
});
