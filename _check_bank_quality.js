const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = __dirname;
const dataPath = path.join(root, "data.js");
const code = fs.readFileSync(dataPath, "utf8");
const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(code + "\nthis.QUESTION_BANK=QUESTION_BANK; this.CATEGORIES=CATEGORIES; this.TYPES=TYPES; this.CODEX=CODEX; this.UI_TEXT=UI_TEXT;", sandbox);

const bank = sandbox.QUESTION_BANK || [];
const cats = sandbox.CATEGORIES || [];
const types = sandbox.TYPES || {};
const codex = sandbox.CODEX || [];

const optionSets = new Map();
let bad = 0;
const axis = { EI:0, SN:0, TF:0, JP:0 };
const topics = {};
const samples = [];

for (const q of bank) {
  if (!q || !Array.isArray(q.options) || q.options.length !== 4) { bad++; continue; }
  const key = q.options.map(o => (o.zh||"") + "|" + (o.en||"")).join("||");
  optionSets.set(key, (optionSets.get(key)||0)+1);
  if (q.axis) axis[q.axis] = (axis[q.axis]||0)+1;
  if (q.topic) topics[q.topic] = (topics[q.topic]||0)+1;
  const poles = new Set(q.options.map(o => o.pole).filter(Boolean));
  if (poles.size < 2) bad++;
  if (samples.length < 8 && Math.random() < 0.002) samples.push(q);
}

const dups = [...optionSets.values()].filter(v => v > 1).length;
const multi = [...optionSets.entries()].filter(([,v]) => v > 1).length;

console.log(JSON.stringify({
  bank: bank.length,
  categories: cats.length,
  types: Object.keys(types).length,
  codex: codex.length,
  bad,
  dupOptionSetKeys: multi,
  axis,
  topics,
  sample: samples.slice(0,3).map(q => ({
    id: q.id, axis: q.axis, topic: q.topic,
    stem: (q.stem&&q.stem.zh)||"",
    opts: (q.options||[]).map(o => o.zh)
  }))
}, null, 2));
