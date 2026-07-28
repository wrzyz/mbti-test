const fs = require("fs");
const path = require("path");
const p = path.join(__dirname, "_expand_all.js");
let s = fs.readFileSync(p, "utf8");

const oldKey = 'const key = q.axis + "|" + q.text.zh.replace(/\\s+/g, "");';
const newKey =
  'const key = q.axis + "|" + q.text.zh.replace(/\\s+/g, "") + "|" + q.options.map(function(o){return o.value + ":" + o.label.zh;}).join("||");';
if (!s.includes(oldKey)) {
  console.error("old key not found");
  process.exit(1);
}
s = s.replace(oldKey, newKey);

s = s.replace("if (bank.length >= 2400) break;", "if (bank.length >= 3200) break;");
s = s.replace(
  "for (let layer = 0; layer < 5; layer += 1) {",
  "for (let layer = 0; layer < 6; layer += 1) {"
);

const oldText = `text: {
            zh: sit[0] + "。" + twist[0] + "你会？",
            en: sit[1] + ". " + twist[1] + " You:"
          },`;
const newText = `text: {
            zh: sit[0] + "。" + twist[0] + (layer ? ("（版本" + (layer + 1) + "）") : "") + "你会？",
            en: sit[1] + ". " + twist[1] + (layer ? (" (v" + (layer + 1) + ")") : "") + " You:"
          },`;
if (!s.includes(oldText)) {
  console.error("old text block not found");
  process.exit(1);
}
s = s.replace(oldText, newText);

// Enrich codex variants if short: ensure makeCodex has enough.
// Already ~34 variants + 16 cores = 50. Keep.

// Extra scenes for denser bank variety
const extraScenesMarker = '["系统提示今日社交额度不足", "System says social quota is low", "社交电池", "Social Battery", "social"],';
if (s.includes(extraScenesMarker) && !s.includes("会议室突然让你做开场白")) {
  s = s.replace(
    extraScenesMarker,
    extraScenesMarker +
      `
    ["会议室突然让你做开场白", "Meeting room suddenly wants your opener", "会议黑洞", "Meeting Black Hole", "work"],
    ["朋友圈点赞战打到你头上", "Like-war lands on your feed", "群聊政治", "Groupchat Politics", "digital,social"],
    ["你被拉去当临时翻译", "You're pulled in as emergency translator", "社交电池", "Social Battery", "social,work"],
    ["电梯门快关，外面一群人招手", "Elevator door closing; crowd waves", "电梯社死", "Elevator Cringe", "work,social"],`
  );
}

fs.writeFileSync(p, s);
console.log("patched ok");
