const { chromium } = require("playwright");
const http = require("http");
const fs = require("fs");
const path = require("path");
const root = "D:/chatgpt/mbti-test";

function contentType(file) {
  if (file.endsWith(".html")) return "text/html; charset=utf-8";
  if (file.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (file.endsWith(".css")) return "text/css; charset=utf-8";
  if (file.endsWith(".png")) return "image/png";
  if (file.endsWith(".svg")) return "image/svg+xml";
  return "application/octet-stream";
}

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";
  const filePath = path.join(root, urlPath.replace(/^\//, ""));
  if (!filePath.startsWith(root) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404);
    res.end("not found");
    return;
  }
  res.writeHead(200, { "Content-Type": contentType(filePath) });
  fs.createReadStream(filePath).pipe(res);
});

(async () => {
  const port = await new Promise((resolve, reject) => {
    server.listen(0, "127.0.0.1", () => resolve(server.address().port));
    server.on("error", reject);
  });
  const base = "http://127.0.0.1:" + port;
  const browser = await chromium.launch({ headless: true });
  const errors = [];

  async function runFlow(label, viewport) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    page.on("pageerror", (err) => errors.push(label + " pageerror: " + err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(label + " console: " + msg.text());
    });
    await page.goto(base + "/", { waitUntil: "networkidle" });
    await page.waitForSelector("#startBtn");
    const startVisible = await page.isVisible("#startBtn");
    await page.click("#startBtn");
    await page.waitForSelector("#nicknameView.active");
    await page.fill("#nicknameInput", "测试员小镜");
    await page.click("#nickSubmitBtn");
    await page.waitForSelector("#quizView.active");
    for (let i = 0; i < 32; i++) {
      await page.waitForSelector(".option-btn");
      await page.click(".option-btn");
      await page.waitForTimeout(220);
    }
    await page.waitForSelector("#resultView.active", { timeout: 10000 });
    const code = await page.textContent("#typeBadge");
    const analysis = await page.textContent("#analysisTip");
    const snark = await page.textContent("#snarkTip");
    await page.click("#generatePosterBtn");
    await page.waitForSelector("#posterModal:not([hidden])");
    const squareCanvas = await page.locator("#posterSquare canvas").count();
    const tallCanvas = await page.locator("#posterTall canvas").count();
    await page.click("[data-close-poster]");
    await page.click("#langBtn");
    await page.waitForTimeout(200);
    const enTitle = await page.textContent("#typeTitle");
    console.log(
      JSON.stringify(
        {
          label,
          startVisible,
          code,
          analysisLen: (analysis || "").length,
          snarkLen: (snark || "").length,
          squareCanvas,
          tallCanvas,
          enTitle,
          box: await page.locator(".app-shell").boundingBox()
        },
        null,
        2
      )
    );
    await context.close();
  }

  await runFlow("desktop", { width: 1280, height: 800 });
  await runFlow("mobile", { width: 390, height: 844 });
  await browser.close();
  server.close();
  if (errors.length) {
    console.log("ERRORS");
    errors.forEach((e) => console.log(e));
    process.exit(1);
  }
  console.log("ALL_OK");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
