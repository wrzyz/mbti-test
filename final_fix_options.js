const fs = require('fs');
let content = fs.readFileSync('D:\\chatgpt\\mbti-test\\app.js', 'utf8');

// Find the exact block to replace: from "  const options = Array.isArray(row[9])" to "    : [];"
// This is a multi-line block that we need to replace entirely.

// Simpler approach: use string replace with a precise pattern
// Find: "  const options = Array.isArray(row[9])\n    ? row[9].map((o) => {\n        let labelZh = o[1];\n        let hintZh = o[3] || o[0];\n        // If the label is a tech phrase, replace with conversational version.\n        labelZh = emotionMap[labelZh] || labelZh;\n        hintZh = emotionMap[hintZh] || hintZh;\n        return {\n          value: o[0],\n          label: { zh: labelZh, en: o[2] || labelZh },\n          hint: { zh: hintZh, en: o[4] || hintZh }\n        };\n      })\n    : [];"

// Since the exact whitespace might vary, let's use a more flexible approach
// Find the start line: "  const options = Array.isArray(row[9])"
const startLine = content.indexOf('  const options = Array.isArray(row[9])');
if (startLine === -1) {
  console.log('ERROR: Could not find start line');
  process.exit(1);
}

// Find the ending "    : [];" after this start
const afterStart = content.substring(startLine);
const colonIndex = afterStart.indexOf('    : [];');
if (colonIndex === -1) {
  console.log('ERROR: Could not find end of options block');
  process.exit(1);
};
const endLine = startLine + colonIndex + 7; // 7 is length of "    : [];"

console.log(`Replacing from ${startLine} to ${endLine}`);

// New enhanced options block
const newOptionsBlock = `  const options = Array.isArray(row[9])
    ? row[9].map((o) => {
        let labelZh = o[1];
        let hintZh = o[3] || o[0];
        
        // Clean up: remove "(针对：...)" annotations and trailing numbers
        labelZh = labelZh.replace(/\\(针对：.*?\\)/g, '').replace(/\\s*\\d+$/, '').trim();
        hintZh = hintZh.replace(/\\(针对：.*?\\)/g, '').trim();
        
        // First try emotionMap replacement
        labelZh = emotionMap[labelZh] || labelZh;
        hintZh = emotionMap[hintZh] || hintZh;
        
        // If still a technical phrase, make it more conversational
        if (labelZh.includes('步骤') || labelZh.includes('清单')) {
          labelZh = "把这事理清楚，别糊弄我";
        } else if (labelZh.includes('方向') || labelZh.includes('画面') || labelZh.includes('概念')) {
          labelZh = "先想想最终啥样，别瞎忙";
        } else if (labelZh.includes('逻辑') || labelZh.includes('数据')) {
          labelZh = "先讲道理合不合理";
        } else if (labelZh.includes('共情') || labelZh.includes('关系')) {
          labelZh = "先接情绪你很难过吧先说说";
        } else if (labelZh.includes('时间') || labelZh.includes('截止')) {
          labelZh = "定个截止时间别无限拖延";
        } else if (labelZh.includes('能量')) {
          labelZh = "有电就干没电就休";
        } else if (labelZh.includes('边缘')) {
          labelZh = "边缘位先观察不是怂";
        }
        return {
          value: o[0],
          label: { zh: labelZh, en: o[2] || labelZh },
          hint: { zh: hintZh, en: o[4] || hintZh }
        };
      })
    : [];`;

// Note: In JavaScript strings, we need double backslashes for regex
// But when writing to file, we want single backslashes in the actual source code
// So we need to escape them properly

// Actually, let me use a different approach: write the code with actual single backslashes
// and let JavaScript handle the string escaping properly

const actualNewOptionsBlock = `  const options = Array.isArray(row[9])
    ? row[9].map((o) => {
        let labelZh = o[1];
        let hintZh = o[3] || o[0];
        
        // Clean up: remove "(针对：...)" annotations and trailing numbers
        labelZh = labelZh.replace(/\\(针对：.*?\\)/g, '').replace(/\\s*\\d+$/, '').trim();
        hintZh = hintZh.replace(/\\(针对：.*?\\)/g, '').trim();
        
        // First try emotionMap replacement
        labelZh = emotionMap[labelZh] || labelZh;
        hintZh = emotionMap[hintZh] || hintZh;
        
        // If still a technical phrase, make it more conversational
        if (labelZh.includes('步骤') || labelZh.includes('清单')) {
          labelZh = "把这事理清楚，别糊弄我";
        } else if (labelZh.includes('方向') || labelZh.includes('画面') || labelZh.includes('概念')) {
          labelZh = "先想想最终啥样，别瞎忙";
        } else if (labelZh.includes('逻辑') || labelZh.includes('数据')) {
          labelZh = "先讲道理合不合理";
        } else if (labelZh.includes('共情') || labelZh.includes('关系')) {
          labelZh = "先接情绪你很难过吧先说说";
        } else if (labelZh.includes('时间') || labelZh.includes('截止')) {
          labelZh = "定个截止时间别无限拖延";
        } else if (labelZh.includes('能量')) {
          labelZh = "有电就干没电就休";
        } else if (labelZh.includes('边缘')) {
          labelZh = "边缘位先观察不是怂";
        }
        return {
          value: o[0],
          label: { zh: labelZh, en: o[2] || labelZh },
          hint: { zh: hintZh, en: o[4] || hintZh }
        };
      })
    : [];`;

// Replace in content
const newContent = content.substring(0, startLine) + actualNewOptionsBlock + content.substring(endLine);
fs.writeFileSync('D:\\chatgpt\\mbti-test\\app.js', newContent);
console.log('✅ Successfully enhanced option generation in expandOne');
