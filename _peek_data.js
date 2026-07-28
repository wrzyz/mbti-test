const fs=require("fs");
const s=fs.readFileSync("data.js","utf8");
const i=s.indexOf("QUESTION_BANK");
console.log("idx", i);
console.log(s.slice(i, i+2500));
const c=s.indexOf("CATEGORIES");
console.log("\n---CATEGORIES---\n", s.slice(c, c+1500));
const u=s.indexOf("UI_TEXT");
console.log("\n---UI---\n", s.slice(u, u+2000));
