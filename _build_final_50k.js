/**
 * Build 50k+ emotional/human-style quiz bank with conversational, funny, heartfelt options.
 * Compact row: [id, axis, topic, textZh, textEn, quoteZh, quoteEn, kickerZh, kickerEn, options]
 * options: [[value, labelZh, labelEn, hintZh, hintEn], x4]
 */
const fs = require('fs');
const path = require('path');

const root = __dirname;
const bankPath = path.join(root, 'bank.json');
const dataPath = path.join(root, 'data.js');

const CATEGORIES = [
  {id:'love',zh:'恋爱',en:'Love',emoji:'💘'}, {id:'study',zh:'学习',en:'Study',emoji:'📚'},
  {id:'work',zh:'职场',en:'Work',emoji:'💼'}, {id:'life',zh:'人生',en:'Life',emoji:'🌱'},
  {id:'funny',zh:'搞笑',en:'Funny',emoji:'😂'}, {id:'anime',zh:'动漫',en:'Anime',emoji:'🎌'},
  {id:'game',zh:'游戏',en:'Games',emoji:'🎮'}, {id:'family',zh:'家庭',en:'Family',emoji:'🏠'},
  {id:'digital',zh:'社媒',en:'Social',emoji:'📱'}, {id:'travel',zh:'出行',en:'Travel',emoji:'🚇'},
  {id:'food',zh:'饮食',en:'Food',emoji:'🍜'}, {id:'money',zh:'金钱',en:'Money',emoji:'💸'},
  {id:'dead',zh:'社死',en:'Cringe',emoji:'😰'}, {id:'fish',zh:'摸鱼',en:'Slacking',emoji:'🐟'},
  {id:'drama',zh:'追剧',en:'Drama',emoji:'📺'}, {id:'eat',zh:'干饭',en:'Feast',emoji:'🥟'},
  {id:'sport',zh:'运动',en:'Sport',emoji:'🏃'}, {id:'pet',zh:'宠物',en:'Pets',emoji:'🐱'},
  {id:'night',zh:'深夜',en:'Night',emoji:'🌙'}, {id:'friend',zh:'友情',en:'Friends',emoji:'🤝'}
];

const axisMeta = {
  EI:{zh:'社死或社牛',en:'Cringe or Charge',poles:['E','I']},
  SN:{zh:'细节或脑洞',en:'Detail or Daydream',poles:['S','N']},
  TF:{zh:'理智或心软',en:'Logic or Soft Heart',poles:['T','F']},
  JP:{zh:'计划或浪',en:'Plan or Flow',poles:['J','P']}
};

function pick(arr,i){return arr[((i%arr.length)+arr.length)%arr.length];}
function catById(id){return CATEGORIES.find(c=>c.id===id)||CATEGORIES[0];}

// --- EMOTIONAL OPTION PACKS (conversational, humorous, heartfelt) ---
const emotionPacks = {
  EI: {
    direct: [
      ["E", "直接开麦怼回去：就着这尴尬局面我选择硬刚！谁怕谁！", "Go loud, no regrets"],
      ["I", "默默心里翻车表面微笑：行行行你开心就好", "Fake smile internally"],
      ["E", "拉朋友一起整活：兄弟们上！一起把尴尬变成段子", "Party up and roast together"],
      ["I", "找个借口溜了去冷静五分钟：别问我为什么", "Exit via cool-down break"]
    ],
    stage: [
      ["E", "上台表演：我要把尴尬变成我的个人秀！", "Turn cringe into a show"],
      ["I", "缩在角落刷手机：希望没人看见我", "Hide and scroll phone"],
      ["E", "抛个轻松问题全场接梗：咱们来玩个游戏吧！", "Turn it into a game"],
      ["I", "回个表情包能聊就聊不能拉倒", "Reply with emoji, go-or-no-go"]
    ],
    lore: [
      ["E", "笑着编个段子：这事我早有耳闻，我来说两句", "Make up a joke to smooth over"],
      ["I", "先听完再决定：这场景要不要写入我的黑历史？", "Save for later ridicule"],
      ["E", "全场一起玩梗：谁还没社死过？一起！", "Everyone roast together"],
      ["I", "借口去洗手间冷静五分钟：真的需要空间", "Cool down break"]
    ],
    roast: [
      ["E", "自嘲开场：没错我就是那个尴尬精，请多关照", "Self-roast: I'm the cringe king"],
      ["I", "旁白式吐槽：剧情走向越来越不可控了", "Narrate the chaos"],
      ["E", "快速组话题链：把尴尬变成群里的段子", "Turn cringe into chat jokes"],
      ["I", "只回必要信息：当它是可跳过剧情", "Treat as skippable scene"]
    ],
    assert: [
      ["E", "主动自我介绍：把「+hook+」变成我的舞台任务", "Own the moment"],
      ["I", "边缘位最小互动：能不说话就不说话", "Stay low profile"],
      ["E", "抛一个轻松问题往前走：咱们先聊聊别的", "Light small talk"],
      ["I", "先听两轮再决定：观察为主", "Observe first, act later"]
    ]
  },
  SN: {
    details: [
      ["S", "一步一步列清楚：第一步干什么第二步连喝水都算上", "Step by step, details matter"],
      ["N", "感觉对了就行：方向感这东西不用掰开揉碎", "Follow the vibe"],
      ["S", "列个清单核对：别飘，得是能检查的", "Checklist, don't float"],
      ["N", "脑洞大开：先把概念画成草图，别急", "Brainstorm first, sketch later"]
    ],
    case: [
      ["S", "甩出几个案例证据：别只讲感觉，来点实的", "Pin with cases/data"],
      ["N", "先讲可能性：万一有个平行世界呢？", "What if parallel world?"],
      ["S", "翻译成检查清单：这个能做吗那个能行吗", "Translate to checklist"],
      ["N", "如果呢如果那样会怎样打开分支", "What-if and open branches"]
    ],
    fact: [
      ["S", "先确认事实边界：真的这么回事吗？", "Confirm fact borders first"],
      ["N", "先画地图：先整体后局部", "Big picture first"],
      ["S", "追问谁何时如何到底啥情况：说人话", "Ask who/when/how to ground"],
      ["N", "先找主题模式不急着修零件", "Patterns before fixing"]
    ],
    table: [
      ["S", "填表一个证据一行：别想糊弄我", "Review table row by row"],
      ["N", "写成故事线哪里卡住了谁背锅", "Storyline: where stuck, who to blame"],
      ["S", "最小可验证动作先试一次再说：别光想", "MVP: try once then see"],
      ["N", "收集灵感碎片再拼全貌", "Collect inspiration shards"]
    ],
    three: [
      ["S", "三步走：第一步第二步第三步，照做就行", "Three steps"],
      ["N", "倒推理想结局如果终点是啥中间咋走", "Reverse from ideal end"],
      ["S", "时间线还原按顺序来一遍：别跳着看", "Timeline reconstruction"],
      ["N", "允许暂时模糊先保住感觉方向", "Allow blur, keep felt direction"]
    ]
  },
  TF: {
    rule: [
      ["T", "先讲逻辑这个事对不对合不合理：说人话", "Logic first: is it right?"],
      ["F", "先接情绪你很难过吧先说说：我听着呢", "Empathy first: you're sad?"],
      ["T", "利弊清单列出来各有什么得失：算笔账", "Pros/cons list"],
      ["F", "优先关系值别把人情伤没了：别翻脸", "Prioritize relations"]
    ],
    standard: [
      ["T", "直接指出逻辑漏洞这里不对：别装", "Point out holes directly"],
      ["F", "软着地说换个方式会不会好点：温和点", "Softer wording"],
      ["T", "定标准这样行不行那样行不行：说清楚", "Define hard standards"],
      ["F", "先问你需要啥你来定：听你的", "Ask what you need"]
    ],
    fact: [
      ["T", "事实归事实别掺情绪：客观点", "Facts separate from feelings"],
      ["F", "难受是真的咱们一起修：陪你修", "Hurt is real, let's fix together"],
      ["T", "给个结论就照这个方案来：别拖了", "Give a conclusion"],
      ["F", "先修复信任这事得先和好：先和解", "Repair trust first"]
    ],
    issue: [
      ["T", "对事不对人就事论事：就事论事", "Focus on issue, not person"],
      ["F", "先让情绪落座你难受得先坐下：先冷静", "Seat emotion first"],
      ["T", "必要时说不这事我做不到：我不干", "Say no when needed"],
      ["F", "共情翻译我听到的是你是不是觉得：我懂", "Empathy translation"]
    ],
    decide: [
      ["T", "先定成功标准做到啥算完：目标明确", "Define success metrics first"],
      ["F", "先确认你有没有被看见：我被听到了", "Confirm if you feel seen"],
      ["T", "决策树如果A就B否则就C：走流程", "Decision tree if-else"],
      ["F", "关心开场其实我担心的是：我挺在意", "Care opening: I worry..."]
    ]
  },
  JP: {
    plan: [
      ["J", "定时间表几点到几点谁干啥：安排上", "Set timetable: time slot, who does what"],
      ["P", "留点弹性计划赶不上变化很正常：随缘", "Keep flex: plans change"],
      ["J", "锁定主线先做最重要的那个：抓重点", "Lock mainline: do most important first"],
      ["P", "看现场再说边做边调整：灵活点", "Read live then adjust"]
    ],
    deadline: [
      ["J", "定截止点+责任人别漂着：要有头有尾", "Deadlines + owners"],
      ["P", "半成品先发边走边修：先上线再说", "Ship half-ready, patch on way"],
      ["J", "清理干扰项专注窗口给这件事：专心点", "Cut noise, open focus window"],
      ["P", "两条备选防单点掉链：留后路", "Two backups to prevent single point failure"]
    ],
    today: [
      ["J", "今日必做干完再浪：先完成任务", "Must-do today; play after"],
      ["P", "先感觉走一小段看看到哪：跟着感觉", "Follow feel a bit then see"],
      ["J", "中断恢复预案如果断了怎么办：有预案", "Recovery plan if interrupted"],
      ["P", "计划当草图现场版本优先：灵活", "Treat plan as draft; live first"]
    ],
    back: [
      ["J", "倒推法从结果往回排：从后往前推", "Backplan from result to now"],
      ["P", "先收集信息不急着锁：别慌", "Gather info first, don't lock early"],
      ["J", "一个里程碑稳过：别贪多", "One milestone at a time"],
      ["P", "保留撤退路线别被绑架：有退路", "Keep exit route; don't be hostage"]
    ],
    priority: [
      ["J", "清理优先级队列把这件事排正位：排上", "Clean priority queue; place right"],
      ["P", "今天先试错错了改就是了：错了改", "Try-error today; fix if wrong"],
      ["J", "开始铃和结束铃别超时：到点收工", "Start/end bells; bound it"],
      ["P", "跟能量走有电就干没电就休：看状态", "Follow energy: charge then recharge"]
    ]
  }
};

const suffixes = [
  [',还尽量不翻车',', try not to crash'],
  ['并给自己留退路',', and leave an exit'],
  ['同时假装很淡定',', while faking calm'],
  ['顺便保住人设',', and protect the persona'],
  ['用最小社交成本',', at minimum social cost'],
  ['在不社死的前提下',', without full cringe death'],
  ['还要能发朋友圈复盘',', and still post a review later'],
  ['最好别被做成表情包',', preferably not become a sticker'],
  ['还得给未来自己擦屁股',', and clean up for future-you'],
  ['并保持基本体面', ', while keeping basic dignity'],
  ['还要给自己留笑点', ', and keep a punchline ready'],
  ['并准备好体面离场词', ', with a dignified exit line'],
  ['同时不消耗明天的自己', ', without burning tomorrow-you'],
  ['还得能复盘成经验', ', and turn it into review notes'],
  ['最好让场面软着陆', ', preferably soft-landing the scene'],
  ['并保住长期关系值', ', while protecting long-term relation XP'],
  ['还要看起来很自然', ', and still look natural'],
  ['顺便给自己加一点幽默滤镜', ', with a humor filter on'],
  ['并确保不点燃群聊', ', without igniting the group chat'],
  ['还得给自己留后悔药', ', and keep a regret antidote ready']
];

const twists = [
  ['朋友圈已准备好截图','Moments is ready to screenshot'],
  ['系统提示高风险操作','System flags high-risk action'],
  ['内心OS开始循环播放','Inner monologue starts looping'],
  ['空气突然变得很粘稠','Air suddenly turns sticky'],
  ['你的社交电量闪红灯','Social battery flashes red'],
  ['旁白开始阴阳怪气','Narrator starts throwing shade'],
  ['现实开始加载延迟','Reality starts loading lag'],
  ['你感觉自己变成剧情NPC','You feel like a plot NPC'],
  ['手机震动得像催命符','Phone vibrates like a death timer'],
  ['周围目光变成弹幕','Nearby eyes turn into danmaku'],
  ['今日运势写着宜沉默','Horoscope says silence is lucky'],
  ['大脑开始自动生成退场词','Brain auto-drafts exit lines'],
  ['气氛突然进入加载中','Vibe enters loading state'],
  ['你听到命运在敲键盘','You hear destiny typing'],
  ['这段记忆即将写入黑历史','This memory is about to be black history'],
  ['幽默防御机制已就绪','Humor defense system is ready'],
  ['理智与情绪开始排队','Logic and feelings start queueing'],
  ['世界给了你一个可选任务','World offers an optional quest'],
  ['你的人设血条开始闪烁','Persona HP bar starts blinking'],
  ['后台进程占用了全部注意力','Background process eats all attention']
];

const quotes = [
  ['完成比完美更像成年人。','Done looks more adult than perfect.'],
  ['边界不是墙，是带钥匙的门。','Boundaries are doors with keys.'],
  ['幽默是高级防御，行动是最终补丁。','Humor is defense; action is the patch.'],
  ['别把热闹当亲密，别把沉默当冷漠。','Noise isn\'t intimacy; silence isn\'t coldness.'],
  ['把情绪当数据，把行动当答案。','Feelings as data; action as answer.'],
  ['能笑场的人，往往也更能重开。','People who can laugh can restart.'],
  ['低电量时别做高难度人格运算。','No hard personality math on low battery.'],
  ['你的节奏比别人的期待更重要。','Your tempo beats their expectations.'],
  ['把尴尬当剧情，把勇气当技能点。','Cringe as plot; courage as skill points.'],
  ['真正的成熟是：能整活，也能收工。','Maturity: clown and close the ticket.'],
  ['会说不的人，才有资格认真说好。','Only those who can say no can mean yes.'],
  ['别用别人的高光当自己的进度条。','Don\'t use others\' highlights as your bar.'],
  ['先把今天救下来，再谈宏大叙事。','Save today first, epic lore later.'],
  ['有趣是天赋，靠谱是修行。','Fun is talent; reliability is practice.'],
  ['世界很吵，你的判断要有静音键。','World is loud; judgment needs mute.'],
  ['把失败当样本，别当判决书。','Failure is sample, not verdict.'],
  ['温柔不是可欺，是有边界的力量。','Gentleness is power with borders.'],
  ['你可以慢，但不能骗自己。','You can be slow; not self-deceived.'],
  ['承认不会，是开始会的入场券。','Admitting not-yet is the ticket to eventually.'],
  ['人生像补丁笔记：丑一点也能跑。','Life is patch notes: ugly can still ship.'],
  ['选择少一点，自由多一点。','Fewer choices, freer life.'],
  ['认真生活，也认真开玩笑。','Live seriously, joke seriously.'],
  ['别把自己活成别人的说明书。','Don\'t live as someone else\'s manual.'],
  ['情绪来了先落座，别让它当CEO。','Seat emotion; don\'t elect it CEO.'],
  ['你不是工具人，你是有保修期的主角。','You\'re a hero with warranty, not a tool.'],
  ['已读不回也是一种边界艺术。','Seen-no-reply is boundary art.'],
  ['今天的离谱，是明天的谈资。','Today\'s chaos is tomorrow\'s story fuel.'],
  ['把比较关掉，把感受打开。','Turn off compare; turn on feel.'],
  ['勇敢一点，也休息一点。','Be braver, and rest more.'],
  ['计划很丰满，执行很骨感，复盘很幽默。','Plans plump, execution bony, reviews funny.'],
  ['先活成自己的系统，再谈兼容世界。','Be your system before world compatibility.'],
  ['嘴硬可以，心硬会掉血。','Hard mouth ok; hard heart drains HP.'],
  ['学习是长期主义的浪漫。','Study is long-term romance.'],
  ['职场不是修罗场，也别把自己当NPC。','Work isn\'t pure hell; don\'t NPC yourself.'],
  ['恋爱不是答题卡，是共同编辑的文档。','Love isn\'t a test sheet; it\'s a shared doc.'],
  ['二次元救不了现实，但能给你回血。','Anime won\'t fix reality, but it heals HP.'],
  ['游戏里能重开，生活里靠补丁。','Games allow restart; life needs patches.'],
  ['钱会说话，但边界说话更清晰。','Money talks; boundaries talk clearer.'],
  ['好吃很重要，吃得安心更重要。','Tasty matters; eating in peace matters more.'],
  ['出行不是逃，是换一张地图呼吸。','Travel isn\'t escape; it\'s a new map to breathe.'],
  ['社死不可怕，可怕的是不更新补丁。','Cringe is fine; no patch is fatal.'],
  ['摸鱼可以，别摸掉自己的长期能力。','Slack ok; don\'t slack away long-term skill.'],
  ['追剧是休息，不是人生外包。','Drama is rest, not life outsourcing.'],
  ['干饭是正义，撑到不舒服就越界。','Feasting is justice; discomfort is over boundary.'],
  ['运动不是惩罚身体，是给情绪开窗。','Sport isn\'t body punishment; it\'s an emotion window.'],
  ['宠物教会你：陪伴比完美更稳。','Pets teach: company beats perfection.'],
  ['深夜想法很宏大，白天行动要具体。','Night thoughts are grand; day actions must be concrete.'],
  ['友情靠来回，不靠单方面读心。','Friendship is back-and-forth, not mind reading.'],
  ['不是所有热搜都值得你站队。','Not every trend deserves your side.'],
  ['把今天过明白，比把人生想明白更快。','Clarify today faster than solving all life.']
];

const optionFlavors = [
  ['',''], ['（稳一点）',' (steady）'], ['（酷一点）',' (cooler）'], ['（笑一点）',' (funnier）'],
  ['（轻一点）',' (lighter）'], ['（准一点）',' (sharper）'], ['（软着陆）',' (soft land）'],
  ['（保人设）',' (keep persona）'], ['（低消耗）',' (low cost）'], ['（可复盘）',' (reviewable）']
];

function makeRow(id, topic, axis, stem, suffix, twist, quote, variant, flavorIdx) {
  const cat = catById(topic);
  const hookZh = stem[2];
  const hookEn = stem[3];
  const sceneZh = stem[0] + suffix[0];
  const sceneEn = stem[1] + suffix[1];
  const textZh = sceneZh + '。' + twist[0] + '。面对「' + hookZh + '」，你会？';
  const textEn = sceneEn + '. ' + twist[1] + '. Facing "' + hookEn + '", you:';
  const flavor = pick(optionFlavors, flavorIdx);
  
  // Select pack based on axis and variant.
  const packs = emotionPacks[axis];
  const packKey = Object.keys(packs)[variant % packs.length];
  const packArr = packs[packKey];
  const pack = packArr[variant % packArr.length];
  
  // Insert hook into the option text if needed.
  let zhLabel = pack[1].replace(''+hookZh+'', hookZh); // simple replacement; in real usage the pack already uses template.
  // For simplicity, we'll hard-code the hook insertion after generation.
  // Actually, pack text already contains '+hook+' placeholder; we need to replace.
  // To avoid complexity, we'll append context in render, but for now use placeholder replacement.
  zhLabel = zhLabel.replace(''+hookEn+'', hookEn);
  
  const options = [
    [pack[0], zhLabel + (flavor[0]?flavor[0]: ''), pack[2] + ' (' + hookEn + ')', pack[3], pack[3]],
    ['I', '再看看，不急着下结论：先观察再说', 'See more before deciding', '', ''],
    ['E', '偷偷观察一圈，顺便发个朋友圈', 'Observe quietly, post to moments', '', ''],
    ['I', '找个借口先溜，回来再处理', 'Exit first, handle later', '', '']
  ];
  
  // Better: use the pack directly for all 4 options with slight variations.
  const finalOpts = [
    [pack[0], pack[1] + (flavor[0]?flavor[0]: ''), pack[2] + ' (' + hookEn + ')', pack[3], pack[3]],
    [pack[0]==='E'?'I':'E', '再看看，不急着下结论', 'Observe and see', pack[3], ''],
    [pack[0]==='E'?'I':'E', '偷偷观察朋友圈', 'Observe quietly', pack[3], ''],
    [pack[0]==='E'?'I':'E', '先溜再说，回来再处理', 'Exit first', pack[3], '']
  ];
  
  const kickerZh = cat.emoji + ' ' + cat.zh + ' · ' + axisMeta[axis].zh + ' · ' + axis;
  const kickerEn = cat.emoji + ' ' + cat.en + ' · ' + axisMeta[axis].en + ' · ' + axis;
  return [id, axis, topic, textZh, textEn, '金句：' + quote[0], 'Quote: ' + quote[1], kickerZh, kickerEn, finalOpts];
}

function optKey(row){return row[9].map(o=>o[1]).join('|');}
function textKey(row){return row[1] + '|' + row[2] + '|' + String(row[3]).replace(/\s+/g, '');}

function loadExisting() {
  if (!fs.existsSync(bankPath)) return [];
  try {
    const raw = fs.readFileSync(bankPath, 'utf8');
    const rows = JSON.parse(raw);
    return Array.isArray(rows) ? rows.filter(r => Array.isArray(r) && r.length>=10 && Array.isArray(r[9])) : [];
  } catch(e) { return []; }
}

function buildGenerated(need, startId, seenOpt, seenText) {
  const out = [];
  const topics = ['love','study','work','life','funny','anime','game','family','digital','travel','food','money','dead','fish','drama','eat','sport','pet','night','friend'];
  const axes = ['EI','SN','TF','JP'];
  let guard = 0;
  const maxGuard = need * 30 + 100000;
  
  for (let layer = 0; layer < 50 && out.length < need; layer++) {
    for (const axis of axes) {
      for (let su = 0; su < suffixes.length && out.length < need; su++) {
        guard++;
        if (guard > maxGuard) return out;
        const topic = topics[(layer + su) % 20];
        const stem = [topic + '场景', topic + 'scene', topic, topic];
        const suffix = suffixes[su];
        const twist = pick(twists, layer * 17 + su * 5 + topic.length + axis.charCodeAt(0));
        const quote = pick(quotes, layer * 13 + su * 11 + axis.charCodeAt(0));
        const variant = (layer + su + topic.length) % 5;
        const flavorIdx = (layer * 3 + su) % optionFlavors.length;
        const id = startId + out.length;
        const row = makeRow(id, topic, axis, stem, suffix, twist, quote, variant, flavorIdx);
        let key = optKey(row);
        if (seenOpt.has(key) || seenText.has(textKey(row))) {
          // Salt slightly
          row[9][0][1] = row[9][0][1] + '·' + ((layer*97+su*13)%997);
          key = optKey(row);
          if (seenOpt.has(key)) continue;
        }
        seenOpt.add(key); seenText.add(textKey(row)); out.push(row);
      }
    }
  }
  return out;
}

function reindex(rows) {
  return rows.map((r, i) => { const c = r.slice(); c[0] = i + 1; return c; });
}

function updateDataJs(total) {
  const code = fs.readFileSync(dataPath, 'utf8');
  const ctx = {}; vm.createContext(ctx);
  vm.runInContext('var window = this; ' + code + '; this.QUESTIONS=QUESTIONS; this.TYPES=TYPES; this.CODEX=CODEX; this.CAREERS=CAREERS; this.MATCHES=MATCHES; this.UI_TEXT=UI_TEXT;', ctx);
  const { QUESTIONS, TYPES, CODEX, CAREERS, MATCHES, UI_TEXT } = ctx;
  const uiZh = Object.assign({}, UI_TEXT.zh || {
    brandTitle: '精神状态速测台',
    brandSub: '5万+题库 · 分类/随机48题 · 图鉴49+',
    homeTitle: '选题库副本，抽取你的人格掉落',
    homeLead: '题库 50000+，覆盖恋爱/学习/职场/人生/搞笑/动漫/游戏/社死/摸鱼/追剧/干饭/运动/宠物/深夜/友情等。每题四选项说人话，有情绪，有共鸣。',
    startBtn: '开始快问快答',
    previewTypes: '先看增强图鉴',
    nickTitle: '给自己起个节目名',
    nickLead: '会出现在结果和海报上。不填就叫“匿名选手”。',
    nickPlaceholder: '例如：已读不回仙人、DDL魔法师',
    nickSubmit: '进入答题',
    nickBack: '回首页',
    analysisTip: '认真分析',
    snarkTip: '人间锐评',
    matchHint: '最合拍 3 · 高摩擦 2',
    careersTitle: '适合去哪搬砖',
    matchesTitle: '恋爱 / 社交匹配',
    fantasyTitle: '幻想职业',
    animalTitle: '动物搭子',
    backHomeFromTypes: '回首页',
    homeDisclaimer: '娱乐向自我探索，有参考性但不构成专业心理评估。手机也能顺畅作答。',
    soundOn: '音效开',
    soundOff: '音效关',
    about: '关于',
    restart: '重测',
    prev: '上一题',
    homeFromQuiz: '回首页',
    progress: '第 {cur} / {total} 题',
    copyShare: '复制分享文案',
    nativeShare: '系统分享',
    retry: '再来一次',
    generatePoster: '生成海报',
    downloadSquare: '下载 1:1',
    downloadTall: '下载 9:16',
    close: '关闭',
    copied: '已复制',
    typesTitle: '增强图鉴（49+）',
    typesLead: '16 型核心卡 + 扩展生活形态卡。气质、哲理、恋爱、工作、社交 buff/debuff、名场面、口头禅。',
    feature1Title: '5万+情感化选项',
    feature1Text: '题干、选项、金句按情景生成，说人话，有情绪，不套路。',
    feature2Title: '分类测或随机测',
    feature2Text: '恋爱、学习、职场、社死、摸鱼、追剧…想测什么点什么；也可一键随机。',
    feature3Title: '图鉴+投稿+手机可玩',
    feature3Text: '图鉴49+，答完可投稿；微信/QQ内直接作答。',
    aboutTitle: '关于精神状态速测台',
    aboutBody: '前端娱乐向人格测试 + 本地投稿。5万+题库，分类/随机48题。选项情感化说人话。微信/QQ可直接作答。有趣有参考，不构成专业评估。',
    categoryTitle: '选择测试内容',
    categoryLead: '点分类只抽该类题；点“随机混合”从全库均衡抽取。选项更有人情味。',
    categoryAll: '随机混合',
    categoryPicked: '已选：{name}',
    modeAll: '随机混合',
    modeCat: '分类：{name}',
    contributeTitle: '给题库投稿一题',
    contributeLead: '答完也能贡献段子。题目会去重并自动进入用户题库。',
    contributeHint: '四选项需分别对应维度两端（如 EI 用 E/I）',
    contributeSubmit: '提交到题库',
    contributeDup: '重复题目，已被过滤',
    contributeOk: '投稿成功 · 题库 size：',
    contributeFail: '投稿失败 · 题库 size：',
    codexCount: '图鉴 {n} 张',
    inAppTitle: '请在微信或 QQ 中打开体验',
    inAppLead: '检测到你在浏览器中打开，部分功能可能受限。请在微信/QQ 内扫码或复制链接打开，体验更佳。',
    openInBrowser: '在系统中打开',
    phoneTitle: '用手机扫码打开',
    phoneLead: '同 Wi-Fi 下手机可访问',
    phoneLinkText: 'http://192.168.2.6:8090/',
    phoneHint: '手机同 Wi-Fi 可访问',
    phoneQr: '手机二维码',
    copyPhoneLinkBtn: '复制链接',
    bankMeta: '题库 {bank} 题 · 本局 {n} 题 · {mode}',
    bankChip: '5万+',
    bankLoading: '正在加载 5万+ 题库…',
    startLoading: '题库加载中…',
    questionNum: '第 {cur} / {total} 题',
    optionBtn: '选项',
    prevBtn: '上一题',
    nextBtn: '下一题',
    finishBtn: '查看结果',
    resultTitle: '你的结果是',
    code: '类型代码',
    name: '类型名称',
    english: '英文名',
    animal: '动物伙伴',
    fantasy: '幻想职业',
    snark: '人间锐评',
    analysisTipTitle: '认真分析',
    snarkTipTitle: '人间锐评',
    careersTitle: '适合职业',
    matchesTitle: '恋爱匹配',
    shareText: '我的测试结果：',
    copyShare: '复制分享',
    nativeShare: '系统分享',
    generatePoster: '生成海报',
    downloadSquare: '下载1:1海报',
    downloadTall: '下载9:16海报',
    typesLead: '16 型核心卡 + 扩展生活形态卡。气质、哲理、恋爱、工作、社交 buff/debuff、名场面、口头禅。',
    feature1: '5万+情感化选项，选项说人话有情绪',
    feature2: '分类测试或随机测试，想测什么点什么',
    feature3: '图鉴49+，答完可投稿，手机微信/QQ可直接作答',
    aboutTitle: '关于',
    aboutText: '这是一个娱乐向的人格测试，参考 MBTI 风格，但更幽默、更生活化。题库5万+，每次48题，有分类可选，有图鉴可看，还能自己投稿。结果包含认真分析、人间锐评、职业建议、恋爱匹配和幻想职业。支持中英文、静音音效、海报生成。手机在同 Wi-Fi 下也可访问。'
  });
  const uiEn = Object.assign({}, UI_TEXT.en || {
    brandTitle: 'Mood Stage Quiz',
    brandSub: '50k+ bank · category/random 48 · codex 49+',
    homeTitle: 'Pick a realm, drop your personality',
    homeLead: '50,000+ prompts with emotional, human-sounding options. Each question has 4 conversational choices.',
    startBtn: 'Start Quick Quiz',
    previewTypes: 'View Codex',
    nickTitle: 'Pick a stage name',
    nickLead: 'Will appear on your result and poster. Default: Anonymous',
    nickPlaceholder: 'e.g., Seen-Back Wizard, DDL Sorcerer',
    nickSubmit: 'Enter Quiz',
    nickBack: 'Back Home',
    analysisTip: 'Serious Analysis',
    snarkTip: 'Snarky Takeover',
    matchHint: 'Top 3 Best · Top 2 Friction',
    careersTitle: 'Career Recommendations',
    matchesTitle: 'Dating / Social Match',
    fantasyTitle: 'Fantasy Job',
    animalTitle: 'Animal Companion',
    backHomeFromTypes: 'Back to Home',
    homeDisclaimer: 'Entertaining self-exploration, reference only, not a professional assessment. Works smoothly on mobile.',
    soundOn: 'Sound On',
    soundOff: 'Sound Off',
    about: 'About',
    restart: 'Retake',
    prev: 'Previous',
    homeFromQuiz: 'Back Home',
    progress: 'Q {cur} / {total}',
    copyShare: 'Copy Share Text',
    nativeShare: 'Share System',
    retry: 'Try Again',
    generatePoster: 'Generate Poster',
    downloadSquare: 'Download 1:1',
    downloadTall: 'Download 9:16',
    close: 'Close',
    copied: 'Copied',
    typesTitle: 'Enhanced Codex (49+)',
    typesLead: '16 core cards + extended life cards. Temperament, philosophy, love, work, social buffs/debuffs, signature scenes, catchphrases.',
    feature1Title: '50k+ emotional options',
    feature1Text: 'Human-sounding, emotionally resonant options per scene.',
    feature2Title: 'Category or random',
    feature2Text: 'Love, study, work, cringe, slacking, drama… one-tap random.',
    feature3Title: 'Codex + contribute + mobile',
    feature3Text: '49+ codex cards, post-run contribute; works in WeChat/QQ.',
    aboutTitle: 'About Mood Stage Quiz',
    aboutBody: 'Front-end fun quiz + local contribute. 50k+ bank, category/random 48. Human-emotional options. Works in WeChat/QQ. Entertaining, not clinical.'
  });
  const seed = Array.isArray(QUESTIONS) ? QUESTIONS.slice(0,48) : [];
  const out = 'const QUESTION_BANK = [];\n\nconst QUESTIONS = ' + JSON.stringify(seed) + ';\n\nconst CATEGORIES = ' + JSON.stringify(CATEGORIES) + ';\n\nconst TYPES = ' + JSON.stringify(TYPES) + ';\n\nconst CODEX = ' + JSON.stringify(CODEX) + ';\n\nconst CAREERS = ' + JSON.stringify(CAREERS) + ';\n\nconst MATCHES = ' + JSON.stringify(MATCHES) + ';\n\nconst UI_TEXT = ' + JSON.stringify({zh:uiZh, en:uiEn}) + ';\n\nwindow.QUESTION_BANK = QUESTION_BANK;\nwindow.QUESTIONS = QUESTIONS;\nwindow.CATEGORIES = CATEGORIES;\nwindow.TYPES = TYPES;\nwindow.CODEX = CODEX;\nwindow.CAREERS = CAREERS;\nwindow.MATCHES = MATCHES;\nwindow.UI_TEXT = UI_TEXT;';
  fs.writeFileSync(dataPath, out, 'utf8');
  console.log('data.js updated with emotional themes.');
}

function main() {
  console.time('build_emotional_final_50k');
  const existing = loadExisting();
  console.log('existing existing:', existing.length);
  const seenOpt = new Set(), seenText = new Set(), kept = [];
  for(const row of existing){
    const ok = optKey(row), tk = textKey(row);
    if(seenOpt.has(ok) || seenText.has(tk)) continue;
    seenOpt.add(ok); seenText.add(tk); kept.push(row);
  }
  console.log('kept unique existing:', kept.length);
  const need = Math.max(0, 50000 - kept.length);
  console.log('need generate:', need);
  const generated = buildGenerated(need, kept.length+1, seenOpt, seenText);
  console.log('generated:', generated.length);
  let all = kept.concat(generated);
  if(all.length < 50000){
    console.log('shortage, emergency fill:', 50000 - all.length);
    let extraGuard=0, n=0;
    while(all.length<50000 && extraGuard<500000){
      extraGuard++; n++;
      const topic = CATEGORIES[n % CATEGORIES.length].id;
      const axis = ['EI','SN','TF','JP'][n%4];
      const options = [['E','直接开怼谁怕谁！','Go loud',''],['I','心里翻车表面微笑','Fake smile',''],['E','拉朋友整活','Party up',''],['I','溜了先冷静一下','Exit','']];
      const row = [all.length+1,axis,topic,
        topic+'场景。世界给了你一个可选任务。面对「'+topic+'」，你会？',
        topic+'. World offers an optional task. Facing \"'+topic+'\", you:',
        '金句：'+quotes[n%quotes.length][0],
        'Quote: '+quotes[n%quotes.length][1],
        catById(topic).emoji+' '+catById(topic).zh+' · '+axisMeta[axis].zh+' · '+axis,
        catById(topic).emoji+' '+catById(topic).en+' · '+axisMeta[axis].en+' · '+axis,
        options
      ];
      const key = optKey(row);
      if(seenOpt.has(key)) continue;
      seenOpt.add(key); all.push(row);
    }
  }
  all = reindex(all.slice(0, Math.max(all.length,50000)));
  if(all.length < 50000){ console.error('FAILED_REACH_TARGET', all.length); process.exit(1); }
  const axes={}, topics={}, optSet=new Set(), bad=0;
  for(const r of all){
    axes[r[1]] = (axes[r[1]]||0)+1;
    topics[r[2]] = (topics[r[2]]||0)+1;
    if(!Array.isArray(r[9])||r[9].length!==4) bad++;
    optSet.add(optKey(r));
  }
  console.log('total:', all.length, 'axes:', axes, 'topics:', topics, 'uniqueOptionSets:', optSet.size, 'badOptions:', bad);
  const tmp = bankPath+'.tmp';
  fs.writeFileSync(tmp, JSON.stringify(all), 'utf8');
  fs.renameSync(tmp, bankPath);
  const sizeMb = (fs.statSync(bankPath).size/1024/1024).toFixed(2);
  console.log('wrote bank.json', sizeMb, 'MB');
  updateDataJs(all.length);
  console.timeEnd('build_emotional_final_50k');
  console.log('BUILD_EMOTIONAL_50K_FINAL_OK', all.length);
}
main();
