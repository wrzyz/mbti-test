const { chromium } = require("playwright");
const http = require("http");

const BASE = process.env.BASE_URL || "http://127.0.0.1:8090/";

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function getJson(url, opts) {
  const res = await fetch(url, opts);
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (err) {
    data = text;
  }
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
    assert(await page.locator("#inAppBanner").isVisible(), name + " in-app banner missing");
  }

  await page.click("#previewTypesBtn");
  await page.waitForSelector("#typesGrid article");
  const codexCount = await page.locator("#typesGrid article").count();
  assert(codexCount >= 49, name + " codex < 49: " + codexCount);
  await page.click("#backHomeFromTypesBtn");

  await page.click("#startBtn");
  await page.waitForSelector("#nicknameInput");
  await page.fill("#nicknameInput", "快测" + name);
  await page.click("#nickSubmitBtn");
  await page.waitForSelector("#options button");

  // Answer 4 questions visibly, then force-complete via page API for speed.
  for (let i = 0; i < 4; i += 1) {
    const buttons = page.locator("#options button");
    assert((await buttons.count()) === 4, name + " options != 4 at " + i);
    const quote = (await page.locator("#questionQuote").innerText()).trim();
    assert(quote.length > 0, name + " missing quote");
    await buttons.nth(i % 4).click();
    await wait(160);
  }

  await page.evaluate(() => {
    const answers = [];
    const list = typeof activeQuestions === "function" ? activeQuestions() : QUESTIONS;
    const total = Math.max(48, list.length || 48);
    const cycle = ["E", "I", "S", "N", "T", "F", "J", "P"];
    for (let i = 0; i < total; i += 1) {
      const q = list[i] || list[0];
      if (q && q.options && q.options.length) answers.push(q.options[i % q.options.length].value);
      else answers.push(cycle[i % cycle.length]);
    }
    state.answers = answers;
    state.index = answers.length - 1;
    state.name = state.name || "快测员";
    const result = calcResult(answers);
    renderResult(result, true);
  });

  await page.waitForSelector("#typeBadge");
  const code = (await page.locator("#typeBadge").innerText()).trim();
  assert(/^[A-Z]{4}$/.test(code), name + " bad code " + code);
  assert(await page.locator("#contributeForm").isVisible(), name + " contribute form hidden");

  const stamp = Date.now();
  await page.fill("#contributeText", name + " 投稿验证题 " + stamp + " 请收录");
  await page.fill("#contributeOptA", "直接上场");
  await page.fill("#contributeOptB", "先观察");
  await page.fill("#contributeOptC", "拉人组队");
  await page.fill("#contributeOptD", "默默记录");
  await page.click("#contributeSubmitBtn");
  await wait(500);
  const feedback = await page.locator("#contributeFeedback").innerText();
  assert(feedback.length > 0, name + " empty contribute feedback");

  // layout sanity
  const startBox = await page.locator("#startBtn").boundingBox().catch(() => null);
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth };
  });
  assert(overflow.scrollWidth <= overflow.clientWidth + 8, name + " horizontal overflow");

  console.log("OK", name, "bank", bankMeta, "codex", codexCount, "code", code, "fb", feedback.slice(0, 36));
  await context.close();
}

async function main() {
  const home = await getJson(BASE.replace(/\/$/, "") + "/lan.json");
  console.log("lan", home.status, home.data);

  const contribute = await getJson(BASE + "api/contribute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      axis: "TF",
      text: { zh: "接口层投稿验证题请自动入库XYZ", en: "API contribute verify XYZ" },
      quote: { zh: "有趣是天赋，靠谱是修行。", en: "Fun is talent; reliability is practice." },
      options: [
        { value: "T", label: { zh: "先讲规则", en: "rules" } },
        { value: "F", label: { zh: "先顾感受", en: "feel" } },
        { value: "T", label: { zh: "列利弊", en: "pros" } },
        { value: "F", label: { zh: "先抱抱", en: "hug" } }
      ]
    })
  });
  assert(contribute.status === 200 && contribute.data && contribute.data.ok, "API contribute fail " + JSON.stringify(contribute));
  console.log("api", contribute.data.status, "size", contribute.data.size);

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
}

main().catch((err) => {
  console.error("VERIFY_FAIL", err && err.stack ? err.stack : err);
  process.exit(1);
});
