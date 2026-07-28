/**
 * Enhance emotionMap in expandOne function in app.js by adding more humorous/relatable entries.
 * Run this script via: node enhance_emotion_map.js
 */
const fs = require('fs');
const appPath = 'app.js';

let content = fs.readFileSync(appPath, 'utf8');

// Locate the emotionMap object.
const mapStart = content.indexOf('const emotionMap = {');
if (mapStart === -1) {
  console.error('emotionMap not found in app.js');
  process.exit(1);
}

// Find the closing brace of this object.
let brace = 0, i = mapStart;
for (; i < content.length; i++) {
  if (content[i] === '{') brace++;
  else if (content[i] === '}') {
    brace--;
    if (brace === 0) {
      i++; // include the }
      break;
    }
  }
}
const mapEnd = i;

// Additional humorous/relatable entries to insert before the closing brace.
const extraLines = [
  '    "别闹了": "别闹了，认真点行不行",',
  '    "凑合吧": "凑合吧，差不多得了",',
  '    "都行吧": "都行吧，随便",',
  '    "看心情": "看心情，爱咋咋地",',
  '    "随便你": "随便你，你说了算",',
  '    "再说吧": "再说吧，以后再说",',
  '    "装没看见": "装没看见，眼不见为净",',
  '    "先拉倒": "先拉倒，不想理了",',
  '    "随他吧": "随他吧，让他折腾",',
  '    "先不管": "先不管，回头再说",',
  '    "走一步看一步": "走一步看一步，边走边瞧",',
  '    "顺其自然": "顺其自然，佛系一点",',
  '    "车到山前必有路": "车到山前必有路，柳暗花明又一村",',
  '    "船到桥头自然直": "船到桥头自然直，不用瞎操心",',
  '    "命里有时终须有": "命里有时终须有，莫强求",',
  '    "退一步海阔天空": "退一步海阔天空，忍一忍风平浪静",',
  '    "塞翁失马焉知非福": "塞翁失马焉知非福，说不定是好事",',
  '    "人生没有白走的路": "人生没有白走的路，每一步都算数",',
  '    "一切自有安排": "一切自有安排，相信就好了",',
  '    "开心最重要": "开心最重要，其他的都是浮云",',
  '    "社死不丢人，不社死才丢人": "社死不丢人，不社死才丢人",',
  '    "尴尬是人生的调味剂": "尴尬是人生的调味剂，加点更香",',
  '    "尴尬也是一种能力": "尴尬也是一种能力，练多了就习惯了",',
  '    "尴尬过的人更有趣": "尴尬过的人更有趣，懂的都懂",',
  '    "尴尬是最好的学习材料": "尴尬是最好的学习材料，交学费才成长",',
  '    "尴尬过后是段子": "尴尬过后是段子，拿来逗朋友",',
  '    "尴尬时最显人品": "尴尬时最显人品，别慌别乱",',
  '    "尴尬是社交试金石": "尴尬是社交试金石，真朋友不笑你",',
  '    "尴尬是成长的必经之路": "尴尬是成长的必经之路，谁没尴尬过",',
  '    "尴尬是生活的幽默感": "尴尬是生活的幽默感，生活需要调剂"'
];

// Build new content by inserting extraLines before the closing '}'.
const mapBefore = content.slice(mapStart, mapEnd - 1); // exclude the final '}'
const mapAfter = content.slice(mapEnd - 1); // the '}' and beyond

// Insert extraLines before the '}' with proper indentation.
const newMap = mapBefore + '\n' + extraLines.join('\n') + '\n' + mapAfter;

content = content.slice(0, mapStart) + newMap + content.slice(mapEnd);

fs.writeFileSync(appPath, content, 'utf8');
console.log('Added ' + extraLines.length + ' emotional mapping entries to expandOne in app.js.');
console.log('Enhanced emotionMap for more human, humorous, relatable options.');
