const fs = require("fs");
const rows = JSON.parse(fs.readFileSync("bank.json", "utf8"));
const seen = new Set();
let touched = 0;
for (let i = 0; i < rows.length; i += 1) {
  const opts = rows[i][9];
  for (const o of opts) {
    const before = o[1];
    o[1] = String(o[1])
      .replace(/\s*·\d+/g, "")
      .replace(/#\d+/g, "")
      .replace(/\s+/g, " ")
      .trim();
    o[2] = String(o[2] || "")
      .replace(/\s*·\d+/g, "")
      .replace(/#\d+/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (o[1] !== before) touched += 1;
  }
  let key = opts.map((o) => o[1]).join("|");
  if (seen.has(key)) {
    // natural disambiguation using unique stem fragment already on option A;
    // tweak C with topic word if needed
    const topic = rows[i][2] || "scene";
    opts[2][1] = opts[2][1] + "（" + topic + "局）";
    opts[2][2] = opts[2][2] + " (" + topic + " run)";
    key = opts.map((o) => o[1]).join("|");
  }
  if (seen.has(key)) {
    opts[3][1] = opts[3][1] + "，换个节奏";
    opts[3][2] = opts[3][2] + ", change tempo";
    key = opts.map((o) => o[1]).join("|");
  }
  seen.add(key);
  rows[i][9] = opts;
}
fs.writeFileSync("bank.json", JSON.stringify(rows));
console.log(
  JSON.stringify(
    {
      n: rows.length,
      unique: seen.size,
      touched,
      sample: rows[0][9].map((o) => o[1]),
      sample2: rows[250][9].map((o) => o[1])
    },
    null,
    2
  )
);
