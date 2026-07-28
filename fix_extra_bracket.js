const fs = require('fs');
let content = fs.readFileSync('D:\\chatgpt\\mbti-test\\app.js', 'utf8');

// Fix the extra ] in line with ": []];" -> ": [];"
content = content.replace(/:\ \]\];/g, ': [];');

fs.writeFileSync('D:\\chatgpt\\mbti-test\\app.js', content);
console.log('Fixed extra bracket');
