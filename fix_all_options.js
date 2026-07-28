const fs = require('fs');
const content = fs.readFileSync('D:\\chatgpt\\mbti-test\\app.js', 'utf8');

// ============================================================
// STEP 1: REPLACE emotionMap with more colorful, human-like expressions
// ============================================================
const emotionMapSectionStart = content.indexOf('const emotionMap = {');
if (emotionMapSectionStart !== -1) {
  // Find the closing } for emotionMap
  let braceCount = 0;
  let endPos = emotionMapSectionStart;
  for (let i = emotionMapSectionStart; i < content.length && braceCount < 100; i++) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') braceCount--;
    if (braceCount === 0) {
      endPos = i;
      break;
    }
  }

  const newEmotionMap = `  const emotionMap = {
    // SN axis - conversational replacements (made funnier!)
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
    
    // TF axis - more empathetic and human
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
    
    // JP axis - more flexible and real-world
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
    
    // EI axis - more expressive and social
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
    
    // Life philosophy & humor - gold content
    "软着陆": "尽量让场面软着陆",
    "保人设": "顺便保住人设",
    "低消耗": "用最小社交成本",
    "可复盘": "还要能发朋友圈复盘",
    "别闹了": "别闹了，认真点行不行",
    "凑合吧": "凑合吧，差不多得了",
    "都行吧": "都行吧，随便",
    "看心情": "看心情，爱咋咋地",
    "随便你": "随便你，你说了算",
    "再说吧": "再说吧，以后再说",
    "装没看见": "装没看见，眼不见为净",
    "先拉倒": "先拉倒，不想理了",
    "随他吧": "随他吧，让他折腾",
    "先不管": "先不管，回头再说",
    "走一步看一步": "走一步看一步，边走边瞧",
    "顺其自然": "顺其自然，佛系一点",
    "车到山前必有路": "车到山前必有路，柳暗花明又一村",
    "船到桥头自然直": "船到桥头自然直，不用瞎操心",
    "命里有时终须有": "命里有时终须有，莫强求",
    "退一步海阔天空": "退一步海阔天空，忍一忍风平浪静",
    "塞翁失马焉知非福": "塞翁失马焉知非福，说不定是好事",
    "人生没有白走的路": "人生没有白走的路，每一步都算数",
    "一切自有安排": "一切自有安排，相信就好了",
    "开心最重要": "开心最重要，其他的都是浮云",
    "社死不丢人，不社死才丢人": "社死不丢人，不社死才丢人",
    "尴尬是人生的调味剂": "尴尬是人生的调味剂，加点更香",
    "尴尬也是一种能力": "尴尬也是一种能力，练多了就习惯了",
    "尴尬过的人更有趣": "尴尬过的人更有趣，懂的都懂",
    "尴尬是最好的学习材料": "尴尬是最好的学习材料，交学费才成长",
    "尴尬过后是段子": "尴尬过后是段子，拿来逗朋友",
    "尴尬时最显人品": "尴尬时最显人品，别慌别乱",
    "尴尬是社交试金石": "尴尬是社交试金石，真朋友不笑你",
    "尴尬是成长的必经之路": "尴尬是成长的必经之路，谁没尴尬过",
    "尴尬是生活的幽默感": "尴尬是生活的幽默感，生活需要调剂",
    "DDL是当代艺术": "DDL不是到期日，是创作灵感截止线",
    "回消息秒回": "秒回不是必须，偶尔失踪也正常",
    "选A选B": "A和B都行，最后看命",
    "纠结到死": "纠结到死也是一种选择",
    "先问闺蜜": "先问闺蜜她比你还纠结",
    "算了不选了": "算了不选了反正都差不多",
    "随缘吧": "随缘吧天注定",
    "主打一个": "主打一个看心情",
    "直接摆平": "直接摆平爱咋咋地",
    "佛系应对": "佛系随缘能拖则拖",
    "糊弄过去": "糊弄过去就行",
    "能拖则拖": "能拖则拖最后一天才做",
    "走一步算一步": "走一步算一步到了再说",
    "随机选一个": "随机选一个碰运气",
    "听天由命": "听天由命看缘分",
    "先溜为敬": "先溜为敬改天再议",
    "装没听见": "装没听见世界清净",
    "发个表情包": "发个表情包意思意思"
  };`;

  // Replace the old emotion map with the new one
  const updatedContent = content.substring(0, emotionMapSectionStart) + newEmotionMap + content.substring(endPos + 1);
  fs.writeFileSync('D:\\chatgpt\\mbti-test\\app.js', updatedContent);
  console.log('✅ Updated emotionMap with more colorful expressions');
}

// ============================================================
// STEP 2: COMPLETELY REWRITE THE OPTION GENERATION LOGIC
// Instead of simple mapping, generate truly conversational, funny, philosophical options
// ============================================================
const optionsBlockIdx = content.indexOf('function expandOne(row, fallbackId) {');
if (optionsBlockIdx !== -1) {
  // Find the entire function body up to its closing }
  let braceCount = 0;
  let funcEnd = optionsBlockIdx;
  for (let i = optionsBlockIdx; i < content.length; i++) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') braceCount--;
    if (braceCount === 0) {
      funcEnd = i;
      break;
    }
  }

  // Now find the specific section within expandOne where options are processed
  // We need to replace the whole function expandOne with an improved version
  // First, let me get the original expandOne function text
  
  const originalExpandOne = content.substring(optionsBlockIdx, funcEnd + 1);
  
  // Create a NEW, improved expandOne function
  const newExpandOne = `function expandOne(row, fallbackId) {
  if (!row) return null;
  if (!Array.isArray(row)) return row;
  const topic = row[2] || "life";
  
  // Rich emotional/human mapping for option labels and hints (enhanced with more humor!)
  const emotionMap = {
    // SN axis
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
    // EI axis extra
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
    // Life philosophy & humor
    "软着陆": "尽量让场面软着陆",
    "保人设": "顺便保住人设",
    "低消耗": "用最小社交成本",
    "可复盘": "还要能发朋友圈复盘",
    "别闹了": "别闹了，认真点行不行",
    "凑合吧": "凑合吧，差不多得了",
    "都行吧": "都行吧，随便",
    "看心情": "看心情，爱咋咋地",
    "随便你": "随便你，你说了算",
    "再说吧": "再说吧，以后再说",
    "装没看见": "装没看见，眼不见为净",
    "先拉倒": "先拉倒，不想理了",
    "随他吧": "随他吧，让他折腾",
    "先不管": "先不管，回头再说",
    "走一步看一步": "走一步看一步，边走边瞧",
    "顺其自然": "顺其自然，佛系一点",
    "车到山前必有路": "车到山前必有路，柳暗花明又一村",
    "船到桥头自然直": "船到桥头自然直，不用瞎操心",
    "命里有时终须有": "命里有时终须有，莫强求",
    "退一步海阔天空": "退一步海阔天空，忍一忍风平浪静",
    "塞翁失马焉知非福": "塞翁失马焉知非福，说不定是好事",
    "人生没有白走的路": "人生没有白走的路，每一步都算数",
    "一切自有安排": "一切自有安排，相信就好了",
    "开心最重要": "开心最重要，其他的都是浮云",
    "社死不丢人，不社死才丢人": "社死不丢人，不社死才丢人",
    "尴尬是人生的调味剂": "尴尬是人生的调味剂，加点更香",
    "尴尬也是一种能力": "尴尬也是一种能力，练多了就习惯了",
    "尴尬过的人更有趣": "尴尬过的人更有趣，懂的都懂",
    "尴尬是最好的学习材料": "尴尬是最好的学习材料，交学费才成长",
    "尴尬过后是段子": "尴尬过后是段子，拿来逗朋友",
    "尴尬时最显人品": "尴尬时最显人品，别慌别乱",
    "尴尬是社交试金石": "尴尬是社交试金石，真朋友不笑你",
    "尴尬是成长的必经之路": "尴尬是成长的必经之路，谁没尴尬过",
    "尴尬是生活的幽默感": "尴尬是生活的幽默感，生活需要调剂",
    "DDL是当代艺术": "DDL不是到期日，是创作灵感截止线",
    "回消息秒回": "秒回不是必须，偶尔失踪也正常",
    "选A选B": "A和B都行，最后看命",
    "纠结到死": "纠结到死也是一种选择",
    "先问闺蜜": "先问闺蜜她比你还纠结",
    "算了不选了": "算了不选了反正都差不多",
    "随缘吧": "随缘吧天注定",
    "主打一个": "主打一个看心情",
    "直接摆平": "直接摆平爱咋咋地",
    "佛系应对": "佛系随缘能拖则拖",
    "糊弄过去": "糊弄过去就行",
    "能拖则拖": "能拖则拖最后一天才做",
    "走一步算一步": "走一步算一步到了再说",
    "随机选一个": "随机选一个碰运气",
    "听天由命": "听天由命看缘分",
    "先溜为敬": "先溜为敬改天再议",
    "装没听见": "装没听见世界清净",
    "发个表情包": "发个表情包意思意思"
  };

  // The REAL improvement: instead of simple mapping, generate truly human, funny options
  // Each option gets a unique voice based on its axis (S/N/T/F/E/I/J/P)
  const generateHumanOption = (baseLabel, axis, contextText) => {
    // Remove any "(针对：...)" or similar annotations
    let cleanLabel = String(baseLabel || '').replace(/\\(针对：.*?\\)/g, '').replace(/·\\s*\\d+$/, '').trim();
    
    // Try emotion map first
    let result = emotionMap[cleanLabel];
    
    // If no direct match, generate based on axis and context
    if (!result) {
      const prefixes = {
        "S": ["靠谱派：", "务实派：", "行动派：", "干货派："],
        "N": ["脑洞派：", "理论派：", "未来派：", "可能性派："],
        "T": ["理性派：", "逻辑派：", "分析派：", "批判派："],
        "F": ["感性派：", "共情派：", "温暖派：", "关怀派："],
        "E": ["社交派：", "外向派：", "活跃派：", "热闹派："],
        "I": ["独行派：", "内省派：", "安静派：", "独处派："],
        "J": ["规划派：", "计划派：", "秩序派：", "条理派："],
        "P": ["自由派：", "随性派：", [flow派：", "即兴派："]
      };
      
      const suffixes = {
        "S": ["实在点好", "靠谱点行不行", "别整虚的", "落地一点"],
        "N": ["想象力最重要", "脑洞够大", "别拘泥现实", "天马行空没问题"],
        "T": ["讲道理优先", "逻辑通顺才成", "数据说话", "别感情用事"],
        "F": ["感受最重要", "体贴点行不行", "别太冷冰冰", "温柔一点"],
        "E": ["热闹才好玩", "人多才开心", "别一个人闷着", "出来嗨啊"],
        "I": ["静静待挺好", "独处也自在", "安静一点行吗", "自己待着挺好"],
        "J": ["按计划来", "规矩点行不行", "别随意拖延", "按计划走"],
        "P": ["自由发挥", "随性一点", "别太束缚", "灵活一点"]
      };
      
      const randomPrefix = prefixes[axis] && prefixes[axis][Math.floor(Math.random() * prefixes[axis].length)] || "";
      const randomSuffix = suffixes[axis] && suffixes[axis][Math.floor(Math.random() * suffixes[axis].length)] || "";
      
      // Generate creative variations based on context
      const variations = {
        "步骤拆解": [`${randomPrefix}把这事理清楚，别一头雾水 ${randomSuffix}`, `${randomPrefix}步骤清晰点，别糊弄我 ${randomSuffix}`, `${randomPrefix}拆解开来说清楚 ${randomSuffix}`],
        "方向画面": [`${randomPrefix}$先想想最终啥样子，别瞎忙 ${randomSuffix}`, `${randomPrefix}$有目标才不会迷路 ${randomSuffix}`, `${randomPrefix}$先想清楚终点在哪 ${randomSuffix}`],
        "细节清单": [`${randomPrefix}$列个清单对核对，别飘 ${randomSuffix}`, `${randomPrefix}$细节决定成败 ${randomSuffix}`, `${randomPrefix}$清单在手，干活不愁 ${randomSuffix}`],
        "概念草稿": [`${randomPrefix}$脑洞大开先画草图 ${randomSuffix}`, `${randomPrefix}$想法先记下来再说 ${randomSuffix}`, `${randomPrefix}$别急着完美，先有再说 ${randomSuffix}`],
        "数据钉住": [`${randomPrefix}$甩出几个证据别光说 ${randomSuffix}`, `${randomPrefix}$拿事实说话 ${randomSuffix}`, `${randomPrefix}$数据不会骗人 ${randomSuffix}`],
        "逻辑优先": [`${randomPrefix}$讲道理第一 ${randomSuffix}`, `${randomPrefix}$先想通再说 ${randomSuffix}`, `${randomPrefix}$逻辑通了才好办 ${randomSuffix}`],
        "先共情": [`${randomPrefix}$先接情绪你很难过吧先说说 ${randomSuffix}`, `${randomPrefix}$别急着给答案先听我说 ${randomSuffix}`, `${randomPrefix}$情绪到位了事情才好谈 ${randomSuffix}`],
        "关系优先": [`${randomPrefix}$人情在先道理在后 ${randomSuffix}`, `${randomPrefix}$别伤了和气 ${randomSuffix}`, `${randomPrefix}$关系还在事就好说 ${randomSuffix}`],
        "定标准": [`${randomPrefix}$说清楚行不行 ${randomSuffix}`, `${randomPrefix}$有了标准才好衡量 ${randomSuffix}`, `${randomPrefix}$标准定了就不扯皮 ${randomSuffix}`],
        "时间表": [`${randomPrefix}$几点到几点谁干啥 ${randomSuffix}`, `${randomPrefix}$按部就班走 ${randomSuffix}`, `${randomPrefix}$有计划才不乱 ${randomSuffix}`],
        "留弹性": [`${randomPrefix}$计划赶得上变化正常啦 ${randomSuffix}`, `${randomPrefix}$别太死板 ${randomSuffix}`, `${randomPrefix}$留点余地总没错 ${randomSuffix}`],
        "锁定": [`${randomPrefix}$先抓最重要的那个 ${randomSuffix}`, `${randomPrefix}$主线优先 ${randomSuffix}`, `${randomPrefix}$别贪多嚼不烂 ${randomSuffix}`],
        "今日必做": [`${randomPrefix}$干完再浪 ${randomSuffix}`, `${randomPrefix}$今日事今日毕 ${randomSuffix}`, `${randomPrefix}$先把要紧的事办了 ${randomSuffix}`],
        "先试错": [`${randomPrefix}$错了改就是了 ${randomSuffix}`, `${randomPrefix}$不怕犯错怕不改 ${randomSuffix}`, `${randomPrefix}$试错也是经验 ${randomSuffix}`],
        "能量": [`${randomPrefix}$有电就干没电就休 ${randomSuffix}`, `${randomPrefix}$跟着感觉走 ${randomSuffix}`, `${randomPrefix}$累了就歇着呗 ${randomSuffix}`],
        "开麦怼回去": [`${randomPrefix}$谁怕谁！${randomSuffix}`, `${randomPrefix}$有理就要争 ${randomSuffix}`, `${randomPrefix}$别憋着说出来 ${randomSuffix}`],
        "表面微笑": [`${randomPrefix}$心里翻车表面行行行你开心就好 ${randomSuffix}`, `${randomPrefix}$皮笑肉不笑 ${randomSuffix}`, `${randomPrefix}$礼貌微笑内心戏多 ${randomSuffix}`],
        "自嘲开场": [`${randomPrefix}$没错我就是那个尴尬精 ${randomSuffix}`, `${randomPrefix}$尴尬就尴尬呗 ${randomSuffix}`, `${randomPrefix}$尴尬也是种特色 ${randomSuffix}`],
        "社死不丢人": [`${randomPrefix}$不社死才丢人 ${randomSuffix}`, `${randomPrefix}$谁没尴尬过 ${randomSuffix}`, `${randomPrefix}$尴尬是青春的勋章 ${randomSuffix}`]
      };
      
      if (variations[cleanLabel]) {
        result = variations[cleanLabel][Math.floor(Math.random() * variations[cleanLabel].length)];
      } else {
        // Fallback: make something up based on the axis
        const fallbacks = {
          "S": `${cleanLabel} —— 靠谱一点行嘛`,
          "N": `${cleanLabel} —— 脑洞开大点`,
          "T": `${cleanLabel} —— 逻辑在线`,
          "F": `${cleanLabel} —— 温柔点说`,
          "E": `${cleanLabel} —— 热闹一下`,
          "I": `${cleanLabel} —— 静静就好`,
          "J": `${cleanLabel} —— 按规矩来`,
          "P": `${cleanLabel} —— 随心所欲`
        };
        result = fallbacks[axis] || cleanLabel;
      }
    }
    
    return result || cleanLabel;
  };

  // Process options with the new human-oriented approach
  const options = row[9] ? row[9].map((o, idx) => {
    const rawValue = o[0];
    const rawLabel = o[1] || '';
    const rawHint = o[3] || o[0];
    
    // Get the appropriate axis-specific generation
    const axis = row[1] || 'SN';
    
    const labelZh = generateHumanOption(rawLabel, axis);
    const hintZh = generateHumanOption(rawHint, axis);
    
    return {
      value: rawValue,
      label: { zh: labelZh, en: o[2] || labelZh },
      hint: { zh: hintZh, en: o[4] || hintZh }
    };
  }) : [];

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

  // Replace the original expandOne function with the new one
  const finalContent = content.substring(0, optionsBlockIdx) + newExpandOne + content.substring(funcEnd + 1);
  fs.writeFileSync('D:\\chatgpt\\mbti-test\\app.js', finalContent);
  console.log('✅ Rewrote expandOne with human, funny option generation');
}

console.log('All updates complete! Please restart the server.');
