const fs = require('fs');
const content = fs.readFileSync('D:\\chatgpt\\mbti-test\\app.js', 'utf8');

// Replace the options rendering in renderQuestion function
// We need to add post-processing to clean up labels and make them more conversational

// Find the renderQuestion function where options are displayed
const renderStart = content.indexOf('function renderQuestion() {');
if (renderStart !== -1) {
  // Find the part where els.options.innerHTML is set
  const optionsSet = content.indexOf('els.options.innerHTML =');
  if (optionsSet !== -1) {
    // Look for the complete block ending with } before the next function
    let braceCount = 0;
    let blockEnd = optionsSet;
    for (let i = optionsSet; i < content.length; i++) {
      if (content[i] === '{') braceCount++;
      if (content[i] === '}') {
        braceCount--;
        if (braceCount === 0) {
          blockEnd = i;
          break;
        }
      }
    }
    
    const blockBefore = content.substring(renderStart, optionsSet);
    const blockAfter = content.substring(blockEnd + 1);
    
    // The block we want to modify contains the option mapping
    // Let's find the exact option mapping portion
    const mapStart = content.indexOf('.map((option, i) => {', optionsSet);
    if (mapStart !== -1) {
      // Find the end of the map function
      let mapBrace = 0;
      let mapEnd = mapStart;
      for (let i = mapStart; i < content.length; i++) {
        if (content[i] === '{') mapBrace++;
        if (content[i] === '}') {
          mapBrace--;
          if (mapBrace === 0) {
            mapEnd = i;
            break;
          }
        }
      }
      
      const mapBlock = content.substring(mapStart, mapEnd + 1);
      
      // Create an enhanced version that cleans labels and makes them more natural
      const enhancedMap = `      .map((option, i) => {
        const selected = state.answers[state.index] === option.value;
        
        // Clean up the label: remove "(针对：...)" and other annotations
        let cleanLabel = String(option.label.zh || option.label.en || '').replace(/\\(针对：.*?\\)/g, '').replace(/·\\s*\\d+$/, '').trim();
        
        // Generate more human, conversational options based on the original label
        let humanLabel = cleanLabel;
        const axisLabels = {
          "S": ["靠谱派", "行动派", "细节控", "实干型"],
          "N": ["脑洞派", "理论派", "幻想家", "创意型"],
          "T": ["理性派", "逻辑控", "分析型", "批判型"],
          "F": ["感性派", "共情型", "温暖派", "关怀型"],
          "E": ["社交型", "热闹派", "活跃型", ["外放型"]],
          "I": ["独行型", "安静派", "内省型", "独处型"],
          "J": ["规划型", "条理派", "计划型", ["秩序型"]],
          "P": ["自由型", ["随性派"], ["流型"], ["即兴型"]]
        };
        
        const axis = option.value;
        const typePrefix = axis && axisLabels[axis] && axisLabels[axis][Math.floor(Math.random() * axisLabels[axis].length)] || "";
        
        // Make it more conversational and funny
        if (cleanLabel.includes('步骤') || cleanLabel.includes('清单')) {
          humanLabel = typePrefix + "把这事理清楚，别糊弄我" + (Math.random() > 0.5 ? "，落地一点" + "，靠谱点" : "");
        } else if (cleanLabel.includes('方向') || cleanLabel.includes('画面')) {
          humanLabel = typePrefix + "先想想最终啥样，别瞎忙" + (Math.random() > 0.5 ? "，脑洞大一点" + "，有想法" : "");
        } else if (cleanLabel.includes('数据') || cleanLabel.includes('证据')) {
          humanLabel = typePrefix + "甩出几个证据别光说" + (Math.random() > 0.5 ? "，有理有据" + "，拿数据说话" : "");
        } else if (cleanLabel.includes('逻辑') || cleanLabel.includes('标准')) {
          humanLabel = typePrefix + "先讲道理合不合理" + (Math.random() > 0.5 ? "，逻辑在线" + "，别感情用事" : "");
        } else if (cleanLabel.includes('共情') || cleanLabel.includes('关系')) {
          humanLabel = typePrefix + "先接情绪你很难过吧先说说" + (Math.random() > 0.5 ? "，温柔一点" + "，在意感受" : "");
        } else if (cleanLabel.includes('时间') || cleanLabel.includes('截止') || cleanLabel.includes('铃')) {
          humanLabel = typePrefix + "定个截止时间别无限拖延" + (Math.random() > 0.5 ? "，有计划" + "，定个规矩" : "");
        } else if (cleanLabel.includes('能量') || cleanLabel.includes('休息')) {
          humanLabel = typePrefix + "有电就干没电就休" + (Math.random() > 0.5 ? "，听身体的" + "，跟着感觉" : "");
        } else if (cleanLabel.includes('边缘') || cleanLabel.includes('最小')) {
          humanLabel = typePrefix + "边缘位最小互动" + (Math.random() > 0.5 ? "，先观望" + "，看看再说" : "");
        } else {
          // Default: make it sound more like natural human speech
          const casualVariants = [
            "这说法有点太官方了，让我想想怎么说更接地气",
            "这选项挺有意思的，换个方式表达",
            "这个想法不错，但话说得能不能再人话点",
            "嗯...这个表述能不能再口语化一点",
            "试试换个更自然的说法",
            "这个可以有，但要说得像人话才行"
          ];
          humanLabel = casualVariants[Math.floor(Math.random() * casualVariants.length)] + " " + cleanLabel;
        }
        
        const cleanHint = String(option.hint.zh || option.hint.en || '').replace(/\\(针对：.*?\\)/g, '').trim();
        let humanHint = cleanHint;
        if (humanHint === "") {
          const hints = ["靠谱一点", "脑洞开大", "逻辑在线", "温柔一点", "有计划", "听身体的", "看看再说"];
          humanHint = hints[Math.floor(Math.random() * hints.length)];
        }
        
        return (
          '<button type="button" class="option-btn"' +
          (selected ? " selected" : "") +
          '" data-value="' + option.value + '"><span>' +
          String.fromCharCode(65 + i) + ". " + humanLabel + "</span><small>" + humanHint + "</small></button>"
        );
      })`;
      
      const newContent = content.substring(0, mapStart) + enhancedMap + content.substring(mapEnd + 1);
      fs.writeFileSync('D:\\chatgpt\\mbti-test\\app.js', newContent);
      console.log('✅ Enhanced option rendering with human, conversational language');
    }
  }
}

// Also enhance the emotionMap with more variety
const emotionMapStart = content.indexOf('const emotionMap = {');
if (emotionMapStart !== -1) {
  let braceCount = 0;
  let endPos = emotionMapStart;
  for (let i = emotionMapStart; i < content.length && braceCount < 100; i++) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') braceCount--;
    if (braceCount === 0) {
      endPos = i;
      break;
    }
  }
  
  // Add more emotional/human variations to the emotionMap
  const existingMap = content.substring(emotionMapStart, endPos + 1);
  
  // Add more entries just before the closing }
  const newMapEntries = `  "时间对不齐": "别总纠结几点，聊开心最重要",
  "单表情包": "一个表情包聊不死人，但能暖人心",
  "优先级队列": "先理清楚别一头雾水",
  "概念草稿": "脑洞大开先别完美主义",
  "边缘位": "边缘站岗先观察，不是怂",
  "最小互动": "最小互动不是冷漠是留白",
  "有电就干": "有电就干没电就休听身体",
  "没电就养": "充电补能这不是躺平",
  "听身体的": "身体最诚实听它没错",
  "先观望": "先看看再说这没啥丢人",
  "靠谱点": "靠谱点行不行不是难缠",
  "脑洞开": "脑洞开大有创意多好啊",
  "逻辑在线": "逻辑在线才走得远",
  "温柔点": "温柔点谁不喜欢呢`;
  
  const updatedMap = existingMap.replace(/},\s*$/', newMapEntries + '\n  },');
  const finalContent = content.substring(0, emotionMapStart) + updatedMap + content.substring(endPos + 1);
  fs.writeFileSync('D:\\chatgpt\\mbti-test\\app.js', finalContent);
  console.log('✅ Enhanced emotionMap with more human variations');
}

console.log('Done! Restart server for changes to take effect.');
