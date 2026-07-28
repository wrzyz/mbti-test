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
    res.writeHead(200, { "Content-Type": typeOf(filePath), "Cache-Control": "no-store" });
    res.end(fs.readFileSync(filePath));
  });
  await new Promise((resolve) => server.listen(8765, "127.0.0.1", resolve));
  const base = "http://127.0.0.1:8765";
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  page.on("pageerror", (e) => console.log("PAGEERROR", e.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") console.log("CONSOLE", msg.text());
  });
  await page.goto(base + "/", { waitUntil: "domcontentloaded", timeout: 10000 });
  console.log("title", await page.title());
  console.log("start visible", await page.isVisible("#startBtn"));
  await page.click("#startBtn");
  await page.waitForSelector("#nicknameView.active", { timeout: 5000 });
  await page.fill("#nicknameInput", "Smoke");
  await page.click("#nickSubmitBtn");
  await page.waitForSelector("#quizView.active", { timeout: 5000 });
  console.log("qcount", await page.evaluate(() => QUESTIONS.length));
  console.log("quote", await page.textContent("#questionQuote"));
  console.log("options", await page.locator("#options .option-btn").count());
  const t0 = Date.now();
  await page.locator("#options .option-btn").first().click({ timeout: 5000 });
  console.log("first click ms", Date.now() - t0);
  await page.waitForTimeout(300);
  console.log("progress", await page.textContent("#progressLabel"));
  for (let i = 0; i < 5; i++) {
    await page.locator("#options .option-btn").nth(i % 4).click({ timeout: 5000 });
    await page.waitForTimeout(250);
    console.log("step", i + 2, await page.textContent("#progressLabel"));
  }
  await browser.close();
  server.close();
  console.log("SMOKE_OK");
})().catch((err) => {
  console.error("SMOKE_FAIL", err);
  process.exit(1);
});
