/**
 * Replace expandOne in app.js with emotional mapping version.
 * Run this script directly via node.
 */
const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'app.js');
let content = fs.readFileSync(appPath, 'utf8');

// Find expandOne function using brace counting.
const start = content.indexOf('function expandOne(row, fallbackId) {');
if (start === -1) {
  console.error('expandOne not found');
  process.exit(1);
}

// Find matching closing brace.
let brace = 0;
let i = start;
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

const oldFunc = content.slice(start, i);
console.log('Old function length:', oldFunc.length);

// New function with emotional mapping.
const newFunc = 'function expandOne(row, fallbackId) {\n  if (!row) return null;\n  if (!Array.isArray(row)) return row;\n  const topic = row[2] || "life";\n  const emotionMap = {\n    "步骤拆解":"一步一步列清楚，别糊弄我",\n    "方向画面":"先想想最终啥样，别瞎忙",\n    "细节清单":"列个清单对核对，别飘",\n    "概念草稿":"脑洞大开，先画草图",\n    "数据钉住":"用案例数据钉住，别光说",\n    "隐喻先行":"先讲可能性，万一有平行世界呢",\n    "检查清单":"翻译成检查清单，这个能做吗",\n    "如果分支":"如果呢？如果那样会怎样？打开分支",\n    "事实边界":"先确认事实边界，真的这么回事吗",\n    "整体地图":"先画地图，先整体后局部",\n    "落地追问":"追问谁/何时/如何，到底啥情况",\n    "模式主题":"先找主题模式，不急着修零件",\n    "复盘表格":"复盘表格填一行一行证据",\n    "故事线":"写成故事线，哪里卡住了谁背锅",\n    "最小验证":"最小可验证动作，先试一次再说",\n    "灵感碎片":"收集灵感碎片，再拼全貌",\n    "三步走":"三步走：第一步第二步第三步",\n    "倒推":"倒推理想结局，如果终点是啥中间咋走",\n    "时间线":"时间线还原，按顺序来一遍",\n    "感觉方向":"允许暂时模糊，先保住感觉方向",\n    "逻辑优先":"先讲逻辑，这个事对不对合不合理",\n    "先共情":"先接情绪，你很难过吧先说说",\n    "利弊清单":"利弊清单列出来各有什么得失",\n    "关系优先":"优先关系值，别把人情伤没了",\n    "直接指":"直接指出逻辑漏洞这里不对",\n    "软语气":"软着地说换个方式会不会好点",\n    "定标准":"定标准这样行不行那样行不行",\n    "先问需要":"先问你需要啥你来定",\n    "事实分离":"事实归事实别掺情绪",\n    "承认难受":"难受是真的咱们一起修",\n    "结论":"给个结论就照这个方案来",\n    "先修信任":"先修复信任这事得先和解",\n    "对事":"对事不对人就事论事",\n    "情绪落座":"先让情绪落座你难受得先坐下",\n    "拒绝":"必要时说不这事我做不到",\n    "共情翻译":"共情翻译我听到的是你是不是觉得",\n    "成功标准":"先定成功标准做到啥算完",\n    "被看见":"先确认你有没有被看见",\n    "决策树":"决策树如果A就B否则就C",\n    "关心开场":"关心开场其实我担心的是",\n    "时间表":"定时间表几点到几点谁干啥",\n    "留弹性":"留点弹性计划赶不上变化很正常",\n    "锁定":"锁定主线先做最重要的那个",\n    "现场":"看现场再说边做边调整",\n    "截止点":"定截止点+责任人别漂着",\n    "半成品":"半成品先发边走边修",\n    "专注":"清理干扰项专注窗口给这件事",\n    "双备选":"两条备选防单点掉链",\n    "今日必做":"今日必做干完再浪",\n    "先跟感觉":"先感觉走一小段看看到哪",\n    "恢复预案":"中断恢复预案如果断了怎么办",\n    "草图":"计划当草图现场版本优先",\n    "收集":"先收集信息不急着锁",\n    "单里程碑":"一个里程碑稳过",\n    "撤退":"保留撤退路线别被绑架",\n    "优先级":"清理优先级队列把这件事排正位",\n    "先试错":"今天先试错错了改就是了",\n    "铃":"开始铃和结束铃别超时",\n    "能量":"跟能量走有电就干没电就休"\n  };\n  const options = Array.isArray(row[9])\n    ? row[9].map((o) => {\n        let labelZh = o[1];\n        let hintZh = o[3] || o[0];\n        labelZh = emotionMap[labelZh] || labelZh;\n        hintZh = emotionMap[hintZh] || hintZh;\n        return {\n          value: o[0],\n          label: { zh: labelZh, en: o[2] || labelZh },\n          hint: { zh: hintZh, en: o[4] || hintZh }\n        };\n      })\n    : [];\n  return {\n    id: row[0] || fallbackId || 0,\n    axis: row[1],\n    topic: topic,\n    tags: [topic, String(row[1] || "").toLowerCase(), "humor"],\n    category: { zh: topic, en: topic },\n    text: { zh: row[3], en: row[4] || row[3] },\n    quote: { zh: row[5], en: row[6] || row[5] },\n    kicker: { zh: row[7], en: row[8] || row[7] },\n    options: options\n  };\n}';

// Replace.
const newContent = content.slice(0, start) + newFunc + content.slice(i);
fs.writeFileSync(appPath, newContent, 'utf8');
console.log('expandOne replaced successfully with emotional mapping.');
