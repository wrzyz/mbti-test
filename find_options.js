const fs = require('fs');
const content = fs.readFileSync('D:\\chatgpt\\mbti-test\\app.js', 'utf8');
const lines = content.split('\n');

// 找到 const options = Array.isArray 的行
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('const options = Array.isArray')) {
    console.log('Found at line ' + (i + 1));
    // 查看接下来的几行确认位置
    for (let j = i; j < Math.min(i + 20, lines.length); j++) {
      console.log((j + 1) + ': ' + lines[j]);
    }
    break;
  }
}
