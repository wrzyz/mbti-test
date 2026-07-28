const fs = require('fs');
const lines = fs.readFileSync('D:\\chatgpt\\mbti-test\\app.js', 'utf8').split('\n');

// Find emotionMap start and end
let inMap = false;
let depth = 0;
let start = -1;
let end = -1;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!inMap && line.includes('const emotionMap = {')) {
    inMap = true;
    start = i;
    depth = 1;
    continue;
  }
  if (inMap) {
    depth += (line.match(/{/g) || []).length;
    depth -= (line.match(/}/g) || []).length;
    if (depth === 0) {
      end = i;
      break;
    }
  }
}

if (start !== -1 && end !== -1) {
  console.log(`emotionMap lines ${start + 1} to ${end + 1}`);
  for (let i = start; i <= end; i++) {
    console.log((i + 1) + ': ' + lines[i]);
  }
} else {
  console.log('Could not find emotionMap');
}
