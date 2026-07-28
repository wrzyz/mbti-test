const fs = require('fs');
let content = fs.readFileSync('D:\\chatgpt\\mbti-test\\app.js', 'utf8');

// Find the renderQuestion function and the options.innerHTML part
// We need to replace the innerHTML generation with enhanced version

// First, let's find the exact line where els.options.innerHTML is set
const optionsLineIdx = content.indexOf('els.options.innerHTML =');
if (optionsLineIdx === -1) {
  console.log('Could not find els.options.innerHTML');
  process.exit(1);
}

console.log('Found at position:', optionsLineIdx);

// Find the start of the .map() chain
const mapStart = content.indexOf('.map((option, i) => {', optionsLineIdx);
if (mapStart === -1) {
  console.log('Could not find .map()');
  process.exit(1;
}

console.log('Found .map at:', mapStart);

// Find the closing }) of the map function
let braceCount = 0;
let mapEnd = mapStart;
for (let i = mapStart; i < content.length; i++) {
  if (content[i] === '{') braceCount++;
  if (content[i] === '}') {
    braceCount--;
    if (braceCount === 0) {
      mapEnd = i;
      break;
    }
  }
}

console.log('Map ends at:', mapEnd);

// Now create the replacement - we need to replace from optionsLineIdx to mapEnd + some after
// Actually, let's be more careful and replace just the map function body

// Find the complete block: els.options.innerHTML = q.options.map(...).join("");
const joinPart = content.indexOf('.join("");', mapEnd);
if (joinPart === -1) {
  console.log('Could not find .join("")');
  process.exit(1);
}

console.log('Found .join at:', joinPart);

// The block to replace is from optionsLineIdx to joinPart + 9 (".join("");" length)
const replaceStart = optionsLineIdx;
const replaceEnd = joinPart + 9;

const before = content.substring(0, replaceStart);
const after = content.substring(replaceEnd);

// Create new enhanced rendering code
const newCode = `  els.options.innerHTML = q.options
      .map((option, i) => {
        const selected = state.answers[state.index] === option.value;
        
        // Clean up and enhance the label to be more conversational
        let rawLabel = option.label.zh || option.label.en || "";
        // Remove "(针对：...)" annotations
        rawLabel = rawLabel.replace(/\\(针对：.*?\\)/g, '').replace(/·\\s*\\d+$/, '').trim();
        
        // Make it sound more human and conversational
        let humanLabel = rawLabel;
        const axis = option.value;
        
        // Apply axis-based conversational enhancements
        if (rawLabel.includes('步骤') || rawLabel.includes('清单')) {
          humanLabel = (axis === 'S' ? '靠谱派：' : '') + rawLabel + ' —— 别糊弄我，落地一点';
        } else if (rawLabel.includes('方向') || rawLabel.includes('画面') || rawLabel.includes('概念')) {
          humanLabel = (axis === 'N' ? '脑洞派：' : '') + rawLabel + ' —— 先别完美主义，有想法就好';
        } else if (rawLabel.includes('逻辑') || rawLabel.includes('数据') || rawLabel.includes('证据')) {
          humanLabel = (axis === 'T' ? '理性派：' : '') + rawLabel + ' —— 有理有据才服人';
        } else if (rawLabel.includes('共情') || rawLabel.includes('关系') || rawLabel.includes('情绪')) {
          humanLabel = (axis === 'F' ? '感性派：' : '') + rawLabel + ' —— 先听我说再说';
        } else if (rawLabel.includes('时间') || rawLabel.includes('截止') || rawLabel.includes('铃')) {
          humanLabel = (axis === 'J' ? '规划派：' : '') + rawLabel + ' —— 定个规矩不拖拉';
        } else if (rawLabel.includes('能量') || rawLabel.includes('休息') || rawLabel.includes('电')) {
          humanLabel = (axis === 'P' ? '自由派：' : '') + rawLabel + ' —— 有电就干没电就休';
        } else {
          // Add a casual conversational touch
          const casualSuffixes = ['—— 靠谱点行不行', '—— 别整虚的', '—— 接地气一点', '—— 说人话', '—— 真实点'];
          humanLabel = rawLabel + casualSuffixes[Math.floor(Math.random() * casualSuffixes.length)];
        }
        
        // Clean and enhance hint
        let rawHint = option.hint.zh || option.hint.en || '';
        rawHint = rawHint.replace(/\\(针对：.*?\\)/g, '').trim();
        let humanHint = rawHint;
        if (!humanHint) {
          const hints = ['靠谱', '脑洞', '逻辑', '温柔', '计划', '听身体的', '看看再说'];
          humanHint = hints[Math.floor(Math.random() * hints.length)] + '一点';
        }
        
        return (
          '<button type="button" class="option-btn"' +
          (selected ? " selected" : "") +
          '" data-value="' + option.value + '"><span>' +
          String.fromCharCode(65 + i) + ". " + humanLabel + "</span><small>" + humanHint + "</small></button>"
        );
      })
      .join("");`;

content = before + newCode + after;
fs.writeFileSync('D:\\chatgpt\\mbti-test\\app.js', content);
console.log('✅ Successfully enhanced option rendering in app.js');
