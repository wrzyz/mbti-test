const { spawn } = require("child_process");
const fs = require("fs");
const child = spawn(process.execPath, ["verify-simple.js"], {
  cwd: "D:/chatgpt/mbti-test",
  stdio: ["ignore", "pipe", "pipe"]
});
let out = "";
const timer = setTimeout(() => {
  out += "\nTIMEOUT_KILL\n";
  child.kill();
}, 60000);
child.stdout.on("data", (d) => { out += d.toString(); process.stdout.write(d); });
child.stderr.on("data", (d) => { out += d.toString(); process.stderr.write(d); });
child.on("exit", (code) => {
  clearTimeout(timer);
  fs.writeFileSync("D:/chatgpt/mbti-test/verify-out.txt", out);
  console.log("EXIT", code);
});
