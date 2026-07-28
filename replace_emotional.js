/**
 * Replace expandOne in app.js with a version that has rich emotional/human mapping.
 * Run this script via: node replace_emotional.js
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

console.log('Found expandOne at index', start, 'end at', i);

// New function body using template literal for readability.
const newFunc = `function expandOne(row, fallbackId) {
  if (!row) return null;
  if (!Array.isArray(row)) return row;
  const topic = row[2] || "life";
  // Rich emotional/human mapping for option labels and hints.
  const emotionMap = {
    // SN axis: conversational replacements
    "步骤拆解": "一步一步列清楚，别糊弄我",
    "方向画面": "先想想最终啥样，别瞎忙",
    "细节清单": "列个清单对核对，别飘",
    "概念草稿": "脑洞大开先画草图",
    "数据钉住": "甩出几个案例证据别只讲感觉",
    "隐喻先行": "先讲可能性万一有平行世界呢",
    "检查清单": "翻译成检查清单这个能做吗",
    "如果分支": "如果呢如果那样会怎样打开分支",
    "事实边界": "先确认事实边界真的这么回事吗",
    "整体地图": "先画地图先整体后局部",
    "落地追问": "追问谁何时如何到底啥情况",
    "模式主题": "先找主题模式不急着修零件",
    "复盘表格": "填表一行一个证据",
    "故事线": "写成故事线哪里卡住了谁背锅",
    "最小验证": "最小可验证动作先试一次再说",
    "灵感碎片": "收集灵感碎片再拼全貌",
    "三步走": "三步走第一步第二步第三步",
    "倒推": "倒推理想结局如果终点是啥中间咋走",
    "时间线": "时间线还原按顺序来一遍",
    "感觉方向": "允许暂时模糊先保住感觉方向",
    // TF axis
    "逻辑优先": "先讲逻辑这个事对不对合不合理",
    "先共情": "先接情绪你很难过吧先说说",
    "利弊清单": "利弊清单列出来各有什么得失",
    "关系优先": "优先关系值别把人情伤没了",
    "直接指": "直接指出逻辑漏洞这里不对",
    "软语气": "软着地说换个方式会不会好点",
    "定标准": "定标准这样行不行那样行不行",
    "先问需要": "先问你需要啥你来定",
    "事实分离": "事实归事实别掺情绪",
    "承认难受": "难受是真的咱们一起修",
    "结论": "给个结论就照这个方案来",
    "先修信任": "先修复信任这事得先和解",
    "对事": "对事不对人就事论事",
    "情绪落座": "先让情绪落座你难受得先坐下",
    "拒绝": "必要时说不这事我做不到",
    "共情翻译": "共情翻译我听到的是你是不是觉得",
    "成功标准": "先定成功标准做到啥算完",
    "被看见": "先确认你有没有被看见",
    "决策树": "决策树如果A就B否则就C",
    "关心开场": "关心开场其实我担心的是",
    // JP axis
    "时间表": "定时间表几点到几点谁干啥",
    "留弹性": "留点弹性计划赶不上变化很正常",
    "锁定": "锁定主线先做最重要的那个",
    "现场": "看现场再说边做边调整",
    "截止点": "定截止点+责任人别漂着",
    "半成品": "半成品先发边走边修",
    "专注": "清理干扰项专注窗口给这件事",
    "双备选": "两条备选防单点掉链",
    "今日必做": "今日必做干完再浪",
    "先跟感觉": "先感觉走一小段看看到哪",
    "恢复预案": "中断恢复预案如果断了怎么办",
    "草图": "计划当草图现场版本优先",
    "收集": "先收集信息不急着锁",
    "单里程碑": "一个里程碑稳过",
    "撤退": "保留撤退路线别被绑架",
    "优先级": "清理优先级队列把这件事排正位",
    "先试错": "今天先试错错了改就是了",
    "铃": "开始铃和结束铃别超时",
    "能量": "跟能量走有电就干没电就休",
    // EI axis extra conversational variants
    "开麦怼回去": "直接开麦怼回去谁怕谁！",
    "表面微笑": "默默心里翻车表面微笑行行行你开心就好",
    "拉友演戏": "拉着朋友一起演一出戏兄弟们上",
    "溜号续命": "找个借口溜了去楼下抽烟刷手机哭一会",
    "个人秀": "上台表演我就让这尴尬变成我的个人秀",
    "缩角落": "缩在角落刷手机心里希望没人看见我",
    "抛游戏接梗": "抛个轻松问题全场接梗咱们来玩个游戏吧",
    "回表情包": "回简短表情包能聊就聊不能拉倒",
    "编故事哄场": "笑着接话编段故事这事我早有耳闻",
    "先听再定": "先听完决定这场景要不要写入黑历史",
    "全场玩梗": "全场一起玩梗谁还没社死过一起",
    "借冷静": "借口去洗手间冷静五分钟别问我为什么",
    "自嘲开场": "自嘲开场没错我就是那个尴尬精",
    "旁白吐槽": "像在旁白剧情走向越来越不可控",
    "话题段子化": "快速组话题链让尴尬变成群聊段子",
    "跳过剧情": "只回必要信息当它是可跳过剧情",
    // Common fallback tags that might appear from older generation
    "软着陆": "尽量让场面软着陆",
    "保人设": "顺便保住人设",
    "低消耗": "用最小社交成本",
    "可复盘": "还要能发朋友圈复盘"
  };
  const options = Array.isArray(row[9])
    ? row[9].map((o) => {
        let labelZh = o[1];
        let hintZh = o[3] || o[0];
        // If the label is a tech phrase, replace with conversational version.
        labelZh = emotionMap[labelZh] || labelZh;
        hintZh = emotionMap[hintZh] || hintZh;
        return {
          value: o[0],
          label: { zh: labelZh, en: o[2] || labelZh },
          hint: { zh: hintZh, en: o[4] || hintZh }
        };
      })
    : [];
  return {
    id: row[0] || fallbackId || 0,
    axis: row[1],
    topic: topic,
    tags: [topic, String(row[1] || "").toLowerCase(), "humor"],
    category: { zh: topic, en: topic },
    text: { zh: row[3], en: row[4] || row[3] },
    quote: { zh: row[5], en: row[6] || row[5] },
    kicker: { zh: row[7], en: row[8] || row[7] },
    options: options
  };
}`;

// Replace.
const newContent = content.slice(0, start) + newFunc + content.slice(i);
fs.writeFileSync(appPath, newContent, 'utf8');
console.log('expandOne replaced successfully with rich emotional mapping.');
