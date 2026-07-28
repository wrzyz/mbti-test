const fs = require('fs');
let content = fs.readFileSync('D:\\chatgpt\\mbti-test\\data.js', 'utf8');
// Fix the CATEGORIES array ending - remove extra bracket
const fixed = content.replace(/\"🤝\"}\]\]/, '"🤝"}]');
if (fixed !== content) {
    content = fixed;
    fs.writeFileSync('D:\\chatgpt\\mbti-test\\data.js', content);
    console.log('Fixed data.js CATEGORIES ending');
} else {
    // Try alternative
    content = content.replace(/\"\\\\uD83D\\\\uDB9D\"\\}\\]\]/, '"🤝"}]');
    fs.writeFileSync('D:\\chatgpt\\mbti-test\\data.js', content);
    console.log('Fixed with alternative');
}
