const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let content = fs.readFileSync(dataPath, 'utf8');

// New CATEGORIES array with 20 categories.
const newCategories = [
  { id: 'love', zh: '恋爱', en: 'Love', emoji: '💘' },
  { id: 'study', zh: '学习', en: 'Study', emoji: '📚' },
  { id: 'work', zh: '职场', en: 'Work', emoji: '💼' },
  { id: 'life', zh: '人生', en: 'Life', emoji: '🌱' },
  { id: 'funny', zh: '搞笑', en: 'Funny', emoji: '😂' },
  { id: 'anime', zh: '动漫', en: 'Anime', emoji: '🎌' },
  { id: 'game', zh: '游戏', en: 'Games', emoji: '🎮' },
  { id: 'family', zh: '家庭', en: 'Family', emoji: '🏠' },
  { id: 'digital', zh: '社媒', en: 'Social', emoji: '📱' },
  { id: 'travel', zh: '出行', en: 'Travel', emoji: '🚇' },
  { id: 'food', zh: '饮食', en: 'Food', emoji: '🍜' },
  { id: 'money', zh: '金钱', en: 'Money', emoji: '💸' },
  { id: 'dead', zh: '社死', en: 'Cringe', emoji: '😰' },
  { id: 'fish', zh: '摸鱼', en: 'Slacking', emoji: '🐟' },
  { id: 'drama', zh: '追剧', en: 'Drama', emoji: '📺' },
  { id: 'eat', zh: '干饭', en: 'Feast', emoji: '🥟' },
  { id: 'sport', zh: '运动', en: 'Sport', emoji: '🏃' },
  { id: 'pet', zh: '宠物', en: 'Pets', emoji: '🐱' },
  { id: 'night', zh: '深夜', en: 'Night', emoji: '🌙' },
  { id: 'friend', zh: '友情', en: 'Friends', emoji: '🤝' }
];

// Replace the CATEGORIES array in data.js.
const categoriesJson = JSON.stringify(newCategories);
const oldCategoriesStr = 'const CATEGORIES = [' + content.slice(content.indexOf('const CATEGORIES = ['));
// Better: find the pattern "const CATEGORIES = [...];" and replace.
const catRegex = /(const CATEGORIES = \[[\s\S]*?\]);/;
const newContent = content.replace(catRegex, `const CATEGORIES = ${categoriesJson}];`);

if (newContent === content) {
  console.log('CATEGORIES not updated (pattern not matched).');
} else {
  fs.writeFileSync(dataPath, newContent, 'utf8');
  console.log('CATEGORIES updated to 20 categories in data.js.');
}

// Also update UI_TEXT.brandSub to reflect 5万+ if needed.
// Find UI_TEXT.zh.brandSub and update.
const uiTextMatch = content.match(/const UI_TEXT = \{[\s\S]*?\};/);
if (uiTextMatch) {
  // Simple replace: we can re-generate UI_TEXT fully, but for safety we just update brandSub.
  // This is more complex; skip for now as it's not critical.
}
