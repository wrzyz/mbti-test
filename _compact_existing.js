/**
 * Convert the already-built 12k QUESTION_BANK into:
 * - bank.json (compact arrays, fast download/parse)
 * - slim data.js (QUESTIONS seed + TYPES/CODEX/etc, no full bank inline)
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = __dirname;
const dataPath = path.join(root, "data.js");
const bankPath = path.join(root, "bank.json");
const code = fs.readFileSync(dataPath, "utf8");
const ctx = {};
vm.createContext(ctx);
vm.runInContext(
  code +
    "\n;this.QUESTION_BANK=QUESTION_BANK;this.QUESTIONS=QUESTIONS;this.CATEGORIES=CATEGORIES;this.TYPES=TYPES;this.CODEX=CODEX;this.CAREERS=CAREERS;this.MATCHES=MATCHES;this.UI_TEXT=UI_TEXT;",
  ctx
);

const {
  QUESTION_BANK,
  QUESTIONS,
  CATEGORIES,
  TYPES,
  CODEX,
  CAREERS,
  MATCHES,
  UI_TEXT
} = ctx;

if (!Array.isArray(QUESTION_BANK) || QUESTION_BANK.length < 10000) {
  console.error("BANK_MISSING_OR_SMALL", QUESTION_BANK && QUESTION_BANK.length);
  process.exit(1);
}

function dump(value, indent = 0) {
  const pad = "  ".repeat(indent);
  if (value === null) return "null";
  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    return "[\n" + value.map((item) => pad + "  " + dump(item, indent + 1)).join(",\n") + "\n" + pad + "]";
  }
  if (typeof value === "object") {
    const keys = Object.keys(value);
    if (!keys.length) return "{}";
    return (
      "{\n" +
      keys.map((k) => pad + "  " + JSON.stringify(k) + ": " + dump(value[k], indent + 1)).join(",\n") +
      "\n" +
      pad +
      "}"
    );
  }
  return JSON.stringify(value);
}

function shortenLabel(label, hook) {
  if (!label) return label;
  // Replace long scene quotes with short hook for readability, keep uniqueness via surrounding text + hook.
  const zh = String(label.zh || "")
    .replace(/「[^」]{12,}」/g, "「" + hook + "」")
    .replace(/（[^）]{0,6}）/g, (m) => m);
  const en = String(label.en || "").replace(/"[^"]{20,}"/g, '"' + hook + '"');
  return { zh, en };
}

const compact = [];
const optSeen = new Map();
let shortened = 0;
for (let i = 0; i < QUESTION_BANK.length; i += 1) {
  const q = QUESTION_BANK[i];
  const hookZh = (q.kicker && q.kicker.zh ? String(q.kicker.zh).split("·")[0] : "") || (q.topic || "scene");
  // Prefer explicit hook inside text: 面对「xxx」
  const m = String((q.text && q.text.zh) || "").match(/面对「([^」]+)」/);
  const hook = m ? m[1] : hookZh.replace(/[^\u4e00-\u9fa5A-Za-z0-9]/g, "").slice(0, 8) || "场景";
  const options = (q.options || []).map((o) => {
    const label = shortenLabel(o.label, hook);
    if (label.zh !== (o.label && o.label.zh)) shortened += 1;
    return [o.value, label.zh, (o.label && o.label.en) || label.en || "", (o.hint && o.hint.zh) || "", (o.hint && o.hint.en) || ""];
  });
  // ensure option-set uniqueness after shortening
  let key = options.map((o) => o[1]).join("|");
  if (optSeen.has(key)) {
    options[0][1] = options[0][1] + "·" + (i % 97);
    options[0][2] = options[0][2] + "·" + (i % 97);
    key = options.map((o) => o[1]).join("|");
  }
  optSeen.set(key, true);
  compact.push([
    i + 1,
    q.axis,
    q.topic || "life",
    q.text.zh,
    q.text.en,
    q.quote.zh,
    q.quote.en,
    q.kicker.zh,
    q.kicker.en,
    options
  ]);
}

fs.writeFileSync(bankPath, JSON.stringify(compact), "utf8");

UI_TEXT.zh = Object.assign({}, UI_TEXT.zh || {}, {
  brandSub: "1万+题库 · 分类/随机48题 · 图鉴49+",
  homeLead:
    "题库 10000+，覆盖恋爱/学习/职场/人生/搞笑/动漫/游戏等。可按分类测，也可全随机。每题四选项与情景绑定，金句又损又有哲理。",
  startBtn: "开始快问快答",
  startLoading: "题库加载中…",
  bankLoading: "正在加载 1万+ 题库…",
  bankMeta: "题库 {bank} 题 · 本局 {n} 题 · {mode}",
  categoryTitle: "选择测试内容",
  categoryLead: "点分类只抽该类题；点“随机混合”从全库均衡抽取。",
  categoryAll: "随机混合",
  categoryPicked: "已选：{name}",
  modeAll: "随机混合",
  modeCat: "分类：{name}",
  aboutBody:
    "纯前端趣味测试 + 本地投稿。题库1万+异步加载，分类/随机48题。选项与题目绑定。微信/QQ内可直接作答。娱乐向，有参考性，非专业评估。"
});
UI_TEXT.en = Object.assign({}, UI_TEXT.en || {}, {
  brandSub: "10k+ bank · category/random 48 · codex 49+",
  homeLead:
    "10,000+ prompts across love/study/work/life/funny/anime/games. Category mode or full random. Options are scene-bound; quotes are sharp and wise.",
  startBtn: "Start rapid quiz",
  startLoading: "Loading bank…",
  bankLoading: "Loading 10k+ bank…",
  bankMeta: "Bank {bank} · Run {n} · {mode}",
  categoryTitle: "Choose test focus",
  categoryLead: "Pick a category or full random mix.",
  categoryAll: "Random mix",
  categoryPicked: "Selected: {name}",
  modeAll: "Random mix",
  modeCat: "Category: {name}",
  aboutBody:
    "Front-end fun quiz + local contribute. 10k+ async bank, category/random 48. Scene-bound options. Works in WeChat/QQ. Entertaining, not clinical."
});

const seedQuestions = Array.isArray(QUESTIONS) && QUESTIONS.length ? QUESTIONS : compact.slice(0, 48);
// normalize seed to full objects if compact rows somehow leaked
const normalizedSeed = seedQuestions.map((q, idx) => {
  if (Array.isArray(q)) {
    return {
      id: idx + 1,
      axis: q[1],
      topic: q[2],
      category: { zh: q[2], en: q[2] },
      text: { zh: q[3], en: q[4] },
      quote: { zh: q[5], en: q[6] },
      kicker: { zh: q[7], en: q[8] },
      options: (q[9] || []).map((o) => ({
        value: o[0],
        label: { zh: o[1], en: o[2] },
        hint: { zh: o[3], en: o[4] }
      }))
    };
  }
  return Object.assign({}, q, { id: idx + 1 });
});

const out =
  "const QUESTION_BANK = [];\n\n" +
  "const QUESTIONS = " +
  dump(normalizedSeed) +
  ";\n\n" +
  "const CATEGORIES = " +
  dump(CATEGORIES) +
  ";\n\n" +
  "const TYPES = " +
  dump(TYPES) +
  ";\n\n" +
  "const CODEX = " +
  dump(CODEX) +
  ";\n\n" +
  "const CAREERS = " +
  dump(CAREERS) +
  ";\n\n" +
  "const MATCHES = " +
  dump(MATCHES) +
  ";\n\n" +
  "const UI_TEXT = " +
  dump(UI_TEXT) +
  ";\n" +
  "window.QUESTION_BANK = QUESTION_BANK;\n" +
  "window.QUESTIONS = QUESTIONS;\n" +
  "window.CATEGORIES = CATEGORIES;\n" +
  "window.TYPES = TYPES;\n" +
  "window.CODEX = CODEX;\n" +
  "window.CAREERS = CAREERS;\n" +
  "window.MATCHES = MATCHES;\n" +
  "window.UI_TEXT = UI_TEXT;\n";

fs.writeFileSync(dataPath, out, "utf8");

const axes = {};
const topics = {};
for (const row of compact) {
  axes[row[1]] = (axes[row[1]] || 0) + 1;
  topics[row[2]] = (topics[row[2]] || 0) + 1;
}
console.log(
  JSON.stringify(
    {
      bank: compact.length,
      shortenedLabels: shortened,
      dataMB: +(fs.statSync(dataPath).size / 1024 / 1024).toFixed(2),
      bankMB: +(fs.statSync(bankPath).size / 1024 / 1024).toFixed(2),
      axes,
      topics,
      sampleQ: compact[0][3],
      sampleOpts: compact[0][9].map((o) => o[0] + ":" + o[1])
    },
    null,
    2
  )
);
