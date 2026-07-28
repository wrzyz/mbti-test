/**
 * Build 10k+ coherent bilingual bank:
 * - topic categories (love/study/work/life/funny/anime/game/family/digital/travel...)
 * - axis-aligned options unique per question (scene-bound wording)
 * - rich quotes
 * Preserves TYPES/CAREERS/MATCHES/CODEX and rewrites QUESTION_BANK/QUESTIONS/CATEGORIES/UI_TEXT.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = __dirname;
const dataPath = path.join(root, "data.js");
const code = fs.readFileSync(dataPath, "utf8");
const ctx = {};
vm.createContext(ctx);
vm.runInContext(
  code +
    "\n;this.TYPES=TYPES;this.CAREERS=CAREERS;this.MATCHES=MATCHES;this.CODEX=typeof CODEX!=='undefined'?CODEX:[];this.UI_TEXT=UI_TEXT;",
  ctx
);

const { TYPES, CAREERS, MATCHES, CODEX, UI_TEXT } = ctx;

function bi(zh, en) {
  return { zh, en };
}
function dump(value, indent = 0) {
  const pad = "  ".repeat(indent);
  if (value === null) return "null";
  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    return "[\n" + value.map((item) => pad + "  " + dump(item, indent + 1)).join(",\n") + "\n" + pad + "]";
  }
  if (typeof value === "object") {
    const keys = Object.keys(value);
    if (!keys.length) return "{}";
    return (
      "{\n" +
      keys.map((k) => pad + "  " + JSON.stringify(k) + ": " + dump(value[k], indent + 1)).join(",\n") +
      "\n" +
      pad +
      "}"
    );
  }
  return JSON.stringify(value);
}
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
  }
  return a;
}
function pick(arr, i) {
  return arr[i % arr.length];
}

const CATEGORIES = [
  { id: "love", zh: "恋爱", en: "Love", emoji: "💘" },
  { id: "study", zh: "学习", en: "Study", emoji: "📚" },
  { id: "work", zh: "职场", en: "Work", emoji: "💼" },
  { id: "life", zh: "人生", en: "Life", emoji: "🌱" },
  { id: "funny", zh: "搞笑", en: "Funny", emoji: "😂" },
  { id: "anime", zh: "动漫", en: "Anime", emoji: "🎌" },
  { id: "game", zh: "游戏", en: "Games", emoji: "🎮" },
  { id: "family", zh: "家庭", en: "Family", emoji: "🏠" },
  { id: "digital", zh: "社媒", en: "Social", emoji: "📱" },
  { id: "travel", zh: "出行", en: "Travel", emoji: "🚇" },
  { id: "food", zh: "饮食", en: "Food", emoji: "🍜" },
  { id: "money", zh: "金钱", en: "Money", emoji: "💸" }
];

const axisMeta = {
  EI: { zh: "社死或社牛", en: "Cringe or Charge", poles: ["E", "I"] },
  SN: { zh: "细节或脑洞", en: "Detail or Daydream", poles: ["S", "N"] },
  TF: { zh: "理智或心软", en: "Logic or Soft Heart", poles: ["T", "F"] },
  JP: { zh: "计划或浪", en: "Plan or Flow", poles: ["J", "P"] }
};

// topic -> axis -> scene stems [zh, en, hookZh, hookEn]
const stems = {
  love: {
    EI: [
      ["第一次约会冷场十秒", "First date silence hits ten seconds", "冷场十秒", "ten-second silence"],
      ["对方家长突然视频连线", "Their parents jump on video call", "家长连线", "parent video"],
      ["暧昧期被共同好友起哄", "Mutual friends tease your situationship", "朋友起哄", "friend teasing"],
      ["告白后对方只回了嗯", "They reply only 'mm' after your confess", "嗯字回复", "mm reply"],
      ["约会走到一半遇到前对象", "You bump into an ex mid-date", "偶遇前任", "ex encounter"],
      ["对方说今晚见家长", "They say meet the parents tonight", "见家长", "meet parents"],
      ["情侣群突然@你发言", "Couple group chat @you to speak", "情侣群@你", "couple-chat @you"],
      ["约会餐厅只剩靠过道的位", "Only aisle seats left on the date", "过道座位", "aisle seats"]
    ],
    SN: [
      ["对方说想要一点仪式感", "They want a little ritual vibe", "仪式感", "ritual vibe"],
      ["纪念日礼物只说随便就好", "Anniversary gift brief is 'whatever'", "随便礼物", "whatever gift"],
      ["聊天只丢一个表情包", "They send one sticker only", "单表情包", "one sticker"],
      ["约会攻略互相发了三版", "You both send three date plans", "三版攻略", "three plans"],
      ["对方说我们随缘看看", "They say let's go with the flow", "随缘看看", "go with flow"],
      ["恋爱目标写成共同成长", "Love goal is written as grow together", "共同成长", "grow together"]
    ],
    TF: [
      ["吵架时对方开始掉小珍珠", "They start tearing up mid-fight", "掉小珍珠", "tearing up"],
      ["对方失约只丢了客观原因", "They cancel with only objective reasons", "客观失约", "objective cancel"],
      ["朋友劝你别太心软", "Friends tell you not to be too soft", "别太心软", "don't soft"],
      ["复合请求带着逻辑PPT", "Reconciliation comes with a logic deck", "复合PPT", "reconcile deck"],
      ["对方把恋爱当项目排期", "They schedule love like a project", "恋爱排期", "love schedule"]
    ],
    JP: [
      ["周末约会还没定地点", "Weekend date has no place yet", "未定点", "no place"],
      ["对方突然改行程", "They suddenly change the plan", "改行程", "plan change"],
      ["纪念日撞上DDL", "Anniversary collides with a deadline", "纪念日DDL", "anni-DDL"],
      ["旅行恋爱想自由行还是跟团", "Love trip: free roam or tour group", "自由或跟团", "free or tour"],
      ["聊天约时间永远对不齐", "Chat schedules never align", "时间对不齐", "time mismatch"]
    ]
  },
  study: {
    EI: [
      ["小组作业要你上台讲", "Group project wants you on stage", "上台讲", "on stage"],
      ["自习室只剩你和陌生人", "Only you and a stranger in study room", "自习室双人", "study duo"],
      ["老师点名提问你走神了", "Teacher cold-calls while you zone out", "点名走神", "cold-call"],
      ["线上讨论全班静音", "Whole class is muted online", "全班静音", "all muted"],
      ["学霸群突然@你答疑", "Top-student group @you for answers", "学霸群@", "elite @you"]
    ],
    SN: [
      ["复习大纲只有一个词：重点", "Review outline is one word: key points", "重点大纲", "key outline"],
      ["论文题目大到能装宇宙", "Thesis title could fit a universe", "宇宙论文", "universe thesis"],
      ["实验报告要求有创新表达", "Lab report demands creative expression", "创新报告", "creative report"],
      ["背书时记忆像漏水容器", "Memorizing feels like a leaking tank", "漏水记忆", "leaky memory"],
      ["网课进度条和理解度反向", "Progress bar moves opposite of understanding", "反向进度", "reverse progress"]
    ],
    TF: [
      ["队友摆烂但情绪很委屈", "Teammate slacks but feels wronged", "摆烂委屈", "slack sadness"],
      ["成绩出来朋友来安慰你", "Friend comforts you after grades", "成绩安慰", "grade comfort"],
      ["批改意见又冷又长", "Feedback is cold and long", "冷长批改", "cold feedback"],
      ["是否举报抄袭争论起来", "Debate whether to report plagiarism", "举报抄袭", "report copy"]
    ],
    JP: [
      ["考前三天计划表还是空白", "Three days pre-exam plan is blank", "空白计划", "blank plan"],
      ["刷题想从随机卷还是章节", "Drills: random paper or chapter order", "随机或章节", "random/chapter"],
      ["图书馆座位只剩两小时", "Library seat only lasts two hours", "两小时座位", "two-hour seat"],
      ["复习清单越写越长", "Review list grows while you write", "变长清单", "growing list"]
    ]
  },
  work: {
    EI: [
      ["周会冷场，领导看向你", "Weekly meeting freezes; boss looks at you", "周会冷场", "meeting freeze"],
      ["客户电话突然转给你", "Client call is suddenly transferred to you", "客户来电", "client call"],
      ["团建要你带破冰游戏", "Team-building wants you to icebreak", "破冰游戏", "icebreaker"],
      ["电梯里只剩你和CEO", "Just you and the CEO in the elevator", "电梯CEO", "elevator CEO"],
      ["跨部门对齐会点你开场", "Cross-team sync asks you to open", "对齐开场", "sync open"]
    ],
    SN: [
      ["需求文档只有要好用高级", "PRD only says premium and usable", "高级好用", "premium usable"],
      ["复盘会要提炼底层逻辑", "Retro wants underlying logic", "底层逻辑", "base logic"],
      ["老板说先出个感觉稿", "Boss wants a vibe draft first", "感觉稿", "vibe draft"],
      ["线上故障描述互相矛盾", "Incident reports contradict each other", "矛盾故障", "contradict incident"]
    ],
    TF: [
      ["裁员传闻下同事来诉苦", "Layoff rumors; coworker vents to you", "裁员诉苦", "layoff vent"],
      ["绩效争议要你表态", "Perf dispute needs your stance", "绩效表态", "perf stance"],
      ["客户情绪崩溃你在线", "Client melts down while you're live", "客户崩溃", "client melt"],
      ["是否公开指出方案硬伤", "Whether to publicly name a hard flaw", "公开硬伤", "public flaw"]
    ],
    JP: [
      ["DDL今晚，需求还在改", "Deadline tonight; requirements still change", "今晚DDL", "DDL tonight"],
      ["排期表被临时插入紧急单", "Schedule gets an emergency insert", "插入紧急", "urgent insert"],
      ["周计划被三个会议吃掉", "Weekly plan eaten by three meetings", "会议吞计划", "meetings eat plan"],
      ["要不要先做完美方案", "Ship perfect plan or start messy", "完美或开做", "perfect or start"]
    ]
  },
  life: {
    EI: [
      ["社区活动邀请你当主持", "Community event invites you to host", "社区主持", "community host"],
      ["相亲局只有你不认识人", "Blind meetup where you know nobody", "相亲陌生局", "stranger meetup"],
      ["邻居开始长聊人生", "Neighbor starts a long life chat", "邻居长聊", "neighbor chat"],
      ["朋友婚礼点你致辞", "Friend's wedding asks you for a toast", "婚礼致辞", "wedding toast"]
    ],
    SN: [
      ["人生目标写成幸福就好", "Life goal is just be happy", "幸福就好", "just happy"],
      ["体检报告一堆箭头", "Health report is full of arrows", "体检箭头", "health arrows"],
      ["搬家清单漏了关键东西", "Moving list missed something key", "搬家漏项", "move miss"],
      ["人生选择像多结局游戏", "Life choices feel like multi-endings", "多结局", "multi-ending"]
    ],
    TF: [
      ["朋友借钱理由很真很惨", "Friend borrows money with a raw story", "借钱真惨", "loan story"],
      ["要不要拒绝超额人情", "Whether to refuse excess favor debt", "超额人情", "favor debt"],
      ["家庭会议情绪先于事实", "Family meeting puts feelings first", "情绪会议", "feel meeting"]
    ],
    JP: [
      ["年度计划写到第三行放弃", "Yearly plan dies at line three", "年计弃疗", "year plan quit"],
      ["周末本想充电却被局拉走", "Weekend charge plan hijacked by hangout", "周末被拉", "weekend pull"],
      ["习惯打卡断了四天", "Habit streak broke for four days", "打卡断裂", "streak break"]
    ]
  },
  funny: {
    EI: [
      ["群聊突然要你表演才艺", "Group chat demands a talent show", "才艺表演", "talent show"],
      ["表情包战争点你出战", "Sticker war drafts you as champion", "表情包出战", "sticker draft"],
      ["社死名场面被做成动图", "Your cringe moment becomes a GIF", "社死动图", "cringe GIF"],
      ["朋友让你当临时脱口秀", "Friends make you improv stand-up", "临时脱口秀", "temp standup"]
    ],
    SN: [
      ["脑洞段子和现实细节对撞", "Bit collides with real details", "段子对撞", "bit collision"],
      ["解释梗时越解释越冷", "Explaining the meme makes it colder", "解释变冷", "explain colder"],
      ["笑点建立在错误前提上", "Joke stands on a wrong premise", "错误前提", "wrong premise"]
    ],
    TF: [
      ["吐槽很爽但可能伤人", "Roast is fun but may hurt", "吐槽伤人", "roast hurt"],
      ["要不要把真相说成段子", "Tell truth as a joke or straight", "真相段子", "truth bit"]
    ],
    JP: [
      ["整活灵感来了但DDL也来了", "Bit idea arrives with a deadline", "整活VS DDL", "bit vs DDL"],
      ["段子库存空了还被点梗", "Joke inventory empty but you're called", "库存空", "empty stock"]
    ]
  },
  anime: {
    EI: [
      ["同人展要你当临时主持", "Doujin event asks you to host", "同人主持", "doujin host"],
      ["漫展通道堵成Boss战", "Convention hall becomes a boss fight", "漫展Boss", "con boss"],
      ["声优见面会抽中互动", "You win a voice-actor interaction", "声优互动", "VA interact"],
      ["群里安利番剧点你开麦", "Group asks you to pitch an anime", "安利开麦", "pitch mic"]
    ],
    SN: [
      ["世界观设定突然前后矛盾", "Lore suddenly contradicts itself", "设定矛盾", "lore clash"],
      ["只记得名场面不记得剧情", "You remember scenes not plot", "名场面记忆", "scene memory"],
      ["角色弧光和作者意图打架", "Character arc fights author intent", "弧光打架", "arc fight"]
    ],
    TF: [
      ["角色牺牲名场面让你破防", "Character sacrifice breaks you", "牺牲破防", "sacrifice break"],
      ["要不要剧透救队友焦虑", "Spoiler to save a friend's anxiety?", "剧透救援", "spoiler rescue"]
    ],
    JP: [
      ["追番进度被新番暴击", "Watchlist blasted by new season", "新番暴击", "new-season hit"],
      ["补番计划被一键崩坏", "Catch-up plan collapses in one click", "补番崩坏", "catch-up crash"]
    ]
  },
  game: {
    EI: [
      ["开黑语音只有你最安静", "You're quietest in party voice", "开黑静音", "party mute"],
      ["排位队友要求你指挥", "Ranked teammate demands you shotcall", "排位指挥", "rank call"],
      ["公会战需要你开麦动员", "Guild war needs your rally voice", "公会动员", "guild rally"]
    ],
    SN: [
      ["攻略细节和直觉路线冲突", "Guide details fight your intuition route", "攻略冲突", "guide clash"],
      ["Boss机制说明像天书", "Boss mechanic text looks arcane", "机制天书", "mechanic tome"],
      ["构筑理论派和手感派对线", "Theorycrafters vs feel players split", "理论手感", "theory/feel"]
    ],
    TF: [
      ["队友失误要不要公开复盘", "Publicly review a teammate's mistake?", "公开复盘", "public review"],
      ["挂机队友求情说家里有事", "AFK teammate pleads family emergency", "挂机求情", "AFK plead"]
    ],
    JP: [
      ["排位还是先打休闲局", "Ranked climb or casual first", "排位或休闲", "rank or casual"],
      ["肝活动还是养精神", "Grind event or protect sanity", "肝或养", "grind/rest"]
    ]
  },
  family: {
    EI: [
      ["家族聚餐点你先发言", "Family reunion asks you to speak first", "先发言", "speak first"],
      ["长辈连续追问婚恋进度", "Relatives grill your relationship status", "婚恋拷问", "status grill"],
      ["家庭群突然@你做决定", "Family chat @you to decide", "家庭群决定", "family decide"],
      ["亲戚让你给小朋友做榜样发言", "Relatives ask you to role-model for kids", "榜样发言", "role-model talk"],
      ["视频拜年突然转成你主讲", "New-year video call makes you the host", "拜年主讲", "NY host"]
    ],
    SN: [
      ["长辈建议很笼统：听话就好", "Elder advice is just be obedient", "听话就好", "be obedient"],
      ["家务分工只有大家看着办", "Chores plan is just figure it out", "看着办", "figure out"],
      ["家里装修目标写成舒服高级", "Home reno goal is comfy premium", "舒服高级", "comfy premium"],
      ["长辈用故事代替具体建议", "Elders give stories instead of specifics", "故事建议", "story advice"]
    ],
    TF: [
      ["家人情绪崩溃找你撑腰", "Family meltdown seeks your support", "情绪撑腰", "emotion backup"],
      ["要不要说实话扫兴", "Tell blunt truth and kill the vibe?", "实话扫兴", "truth kill-vibe"],
      ["兄弟姐妹争资源让你仲裁", "Siblings fight resources and pick you as judge", "仲裁资源", "resource judge"],
      ["长辈比较你和别人的孩子", "Elders compare you with other kids", "比较孩子", "compare kids"]
    ],
    JP: [
      ["春节行程被临时改三版", "Holiday itinerary changes three times", "行程三改", "trip triple-change"],
      ["家务DDL和个人计划冲突", "Chore deadline fights personal plan", "家务冲突", "chore conflict"],
      ["家庭聚会合影时间一改再改", "Family photo time keeps shifting", "合影改期", "photo shift"],
      ["回家短住计划被延长", "Short home stay gets extended", "短住延长", "stay extend"]
    ]
  },
  digital: {
    EI: [
      ["直播间冷场要你暖场", "Livestream freeze needs your warm-up", "直播暖场", "live warm"],
      ["评论区吵起来点你出场", "Comment fight summons you", "评论出场", "comment summon"],
      ["语音房突然把麦给你", "Voice room suddenly gives you the mic", "语音房麦", "voice mic"]
    ],
    SN: [
      ["热搜只有三个字：离谱", "Trending topic is just wild", "热搜离谱", "trend wild"],
      ["算法推荐把你画像讲歪", "Algorithm paints a wrong portrait of you", "画像讲歪", "wrong portrait"]
    ],
    TF: [
      ["网暴边缘要不要站队", "Near pile-on: take a side?", "站队边缘", "side edge"],
      ["私信求助故事真假难辨", "DM help story is hard to verify", "私信真假", "DM truth"]
    ],
    JP: [
      ["想断网一天但消息爆炸", "Want offline day but inbox explodes", "断网爆炸", "offline boom"],
      ["内容日历被热点打断", "Content calendar broken by hot news", "日历打断", "calendar break"]
    ]
  },
  travel: {
    EI: [
      ["火车对面开始搭话", "Train seatmate starts chatting", "火车搭话", "train chat"],
      ["旅行团要你当临时翻译", "Tour group makes you emergency translator", "临时翻译", "temp translator"],
      ["机场大屏延误全员焦虑", "Delay board makes everyone anxious", "延误焦虑", "delay anxiety"]
    ],
    SN: [
      ["攻略和现场完全不是一回事", "Guide and reality are different games", "攻略失真", "guide mismatch"],
      ["导航给三条差不多的路", "Nav offers three similar routes", "三路导航", "three routes"]
    ],
    TF: [
      ["同行人走丢情绪先炸", "Companion is lost and panics first", "走丢情绪", "lost panic"],
      ["要不要为省钱改烂路线", "Take a worse route to save money?", "省钱烂路", "cheap bad route"]
    ],
    JP: [
      ["行程表被雨天重写", "Itinerary rewritten by rain", "雨天重写", "rain rewrite"],
      ["自由行还是跟固定班次", "Free roam or fixed timetable", "自由或班次", "free/fixed"]
    ]
  },
  food: {
    EI: [
      ["聚餐点菜所有人看你", "Everyone stares at you to order", "点菜注视", "order stare"],
      ["火锅店位置只剩拼桌", "Hotpot only has shared table left", "火锅拼桌", "shared hotpot"],
      ["餐厅服务员连续追问口味", "Waiter keeps probing your taste", "口味追问", "taste probe"]
    ],
    SN: [
      ["菜谱写着适量无法量化", "Recipe says to taste with no numbers", "适量迷雾", "to-taste fog"],
      ["探店文案全是氛围没有地址细节", "Review is vibe-only, no address detail", "氛围探店", "vibe review"]
    ],
    TF: [
      ["朋友点了你雷的菜求你别挑", "Friend ordered your dislike and asks chill", "雷点菜", "dislike dish"],
      ["AA还是你请引发微妙空气", "AA vs you-pay creates awkward air", "AA微妙", "AA awkward"]
    ],
    JP: [
      ["减肥计划和深夜外卖对打", "Diet plan vs midnight delivery fight", "减肥外卖", "diet delivery"],
      ["先排队名店还是随便吃", "Queue famous shop or eat anything", "名店或随便", "famous/any"]
    ]
  },
  money: {
    EI: [
      ["朋友局开始讨论投资观点", "Hangout turns into investment opinions", "投资观点", "invest takes"],
      ["家庭会议点你讲开支", "Family meeting asks you to present spend", "讲开支", "present spend"]
    ],
    SN: [
      ["理财目标只有财富自由四个字", "Finance goal is only financial freedom", "财富自由", "fin freedom"],
      ["账单分类细到怀疑人生", "Bill categories are too detailed to live", "账单过细", "bill over-detail"]
    ],
    TF: [
      ["借钱请求带着故事和眼泪", "Loan ask comes with story and tears", "借钱眼泪", "loan tears"],
      ["要不要拒绝不合理分摊", "Refuse an unfair split?", "拒绝分摊", "refuse split"]
    ],
    JP: [
      ["存钱计划和冲动消费对线", "Saving plan vs impulse buy duel", "存钱冲动", "save/impulse"],
      ["先还债还是先投资自己", "Pay debt first or invest in self", "还债或投资", "debt/self"]
    ]
  }
};

// Fix family EI first entry if any accidental mess - already clean array above after ternary.

const twists = [
  ["现场空气突然凝固", "the air freezes on the spot"],
  ["你的社交电量只剩 12%", "your social battery is at 12%"],
  ["旁白开始阴阳怪气", "the narrator gets snarky"],
  ["系统提示高风险操作", "system flags high-risk action"],
  ["朋友圈已准备好截图", "Moments is ready to screenshot"],
  ["BGM 突然变得很燃", "BGM suddenly goes hype"],
  ["你的人设补丁还没装完", "your persona patch is unfinished"],
  ["时间只给你八秒决策", "you only get eight seconds"],
  ["对面眼神开始发光", "their eyes start glowing"],
  ["你预感到会成为名场面", "you sense a highlight reel forming"],
  ["理智和本能开始开会", "reason and instinct open a meeting"],
  ["钱包和尊严同时震动", "wallet and dignity both vibrate"]
];

const quotes = [
  ["完成比完美更像成年人。", "Done looks more adult than perfect."],
  ["边界不是墙，是带钥匙的门。", "Boundaries are doors with keys."],
  ["幽默是高级防御，行动是最终补丁。", "Humor is defense; action is the patch."],
  ["别把热闹当亲密，别把沉默当冷漠。", "Noise isn't intimacy; silence isn't coldness."],
  ["把情绪当数据，把行动当答案。", "Feelings as data; action as answer."],
  ["能笑场的人，往往也更能重开。", "People who can laugh can restart."],
  ["低电量时别做高难度人格运算。", "No hard personality math on low battery."],
  ["你的节奏比别人的期待更重要。", "Your tempo beats their expectations."],
  ["把尴尬当剧情，把勇气当技能点。", "Cringe as plot; courage as skill points."],
  ["真正的成熟是：能整活，也能收工。", "Maturity: clown and close the ticket."],
  ["会说不的人，才有资格认真说好。", "Only those who can say no can mean yes."],
  ["别用别人的高光当自己的进度条。", "Don't use others' highlights as your bar."],
  ["先把今天救下来，再谈宏大叙事。", "Save today first, epic lore later."],
  ["有趣是天赋，靠谱是修行。", "Fun is talent; reliability is practice."],
  ["世界很吵，你的判断要有静音键。", "World is loud; judgment needs mute."],
  ["把失败当样本，别当判决书。", "Failure is sample, not verdict."],
  ["温柔不是可欺，是有边界的力量。", "Gentleness is power with borders."],
  ["你可以慢，但不能骗自己。", "You can be slow; not self-deceived."],
  ["承认不会，是开始会的入场券。", "Admitting not-yet is the ticket to eventually."],
  ["人生像补丁笔记：丑一点也能跑。", "Life is patch notes: ugly can still ship."],
  ["选择少一点，自由多一点。", "Fewer choices, freer life."],
  ["认真生活，也认真开玩笑。", "Live seriously, joke seriously."],
  ["别把自己活成别人的说明书。", "Don't live as someone else's manual."],
  ["情绪来了先落座，别让它当CEO。", "Seat emotion; don't elect it CEO."],
  ["你不是工具人，你是有保修期的主角。", "You're a hero with warranty, not a tool."],
  ["已读不回也是一种边界艺术。", "Seen-no-reply is boundary art."],
  ["今天的离谱，是明天的谈资。", "Today's chaos is tomorrow's story fuel."],
  ["把比较关掉，把感受打开。", "Turn off compare; turn on feel."],
  ["勇敢一点，也休息一点。", "Be braver, and rest more."],
  ["计划很丰满，执行很骨感，复盘很幽默。", "Plans plump, execution bony, reviews funny."],
  ["先活成自己的系统，再谈兼容世界。", "Be your system before world compatibility."],
  ["嘴硬可以，心硬会掉血。", "Hard mouth ok; hard heart drains HP."],
  ["学习是长期主义的浪漫。", "Study is long-term romance."],
  ["职场不是修罗场，也别把自己当NPC。", "Work isn't pure hell; don't NPC yourself."],
  ["恋爱不是答题卡，是共同编辑的文档。", "Love isn't a test sheet; it's a shared doc."],
  ["二次元救不了现实，但能给你回血。", "Anime won't fix reality, but it heals HP."],
  ["游戏里能重开，生活里靠补丁。", "Games allow restart; life needs patches."],
  ["钱会说话，但边界说话更清晰。", "Money talks; boundaries talk clearer."],
  ["好吃很重要，吃得安心更重要。", "Tasty matters; eating in peace matters more."],
  ["出行不是逃，是换一张地图呼吸。", "Travel isn't escape; it's a new map to breathe."]
];

function optionPack(axis, hookZh, hookEn, variant) {
  const v = variant % 4;
  if (axis === "EI") {
    const packs = [
      [
        ["E", `就着「${hookZh}」直接开麦破冰，把冷场做成开场`, `Open the mic on "${hookEn}" and turn freeze into opener`, "社牛破冰", "Charge icebreak"],
        ["I", `先对「${hookZh}」点头观察，把电量留给关键回合`, `Nod through "${hookEn}" and save energy for key round`, "低调观察", "Quiet observe"],
        ["E", `拉一个人一起面对「${hookZh}」，把单机变联机`, `Pull someone in on "${hookEn}" and go co-op`, "组队出场", "Party up"],
        ["I", `给「${hookZh}」一个礼貌微笑，自己切飞行模式续命`, `Polite smile at "${hookEn}", then airplane-mode heal`, "飞行续命", "Airplane heal"]
      ],
      [
        ["E", `主动自我介绍，把「${hookZh}」变成你的舞台任务`, `Self-intro and make "${hookEn}" your stage quest`, "舞台任务", "Stage quest"],
        ["I", `站到边缘位，用最小互动处理「${hookZh}」`, `Stay edge-side and mini-interact through "${hookEn}"`, "边缘位", "Edge seat"],
        ["E", `先抛一个轻松问题，带着「${hookZh}」往前走`, `Ask a light question and move "${hookEn}" forward`, "轻松提问", "Light ask"],
        ["I", `回短句保底，不把「${hookZh}」扩成大型晚会`, `Short replies only; don't expand "${hookEn}" into a gala`, "短句保底", "Short-reply"]
      ],
      [
        ["E", `笑着接话，把「${hookZh}」聊成能转发的名场面`, `Laugh-reply and turn "${hookEn}" into shareable lore`, "名场面制造", "Lore craft"],
        ["I", `先听完再决定，不让「${hookZh}」抽干社交血条`, `Listen first so "${hookEn}" doesn't drain social HP`, "听完再动", "Listen first"],
        ["E", `邀请全场一起玩，稀释「${hookZh}」的压力光环`, `Invite everyone so "${hookEn}" pressure dilutes`, "压力稀释", "Dilute pressure"],
        ["I", `找借口短暂离场，给「${hookZh}」降温后再回`, `Step out briefly, cool "${hookEn}", then return`, "离场降温", "Cool exit"]
      ],
      [
        ["E", `用自嘲开场，先拿下「${hookZh}」的主动权`, `Self-roast first and seize initiative on "${hookEn}"`, "自嘲抢权", "Roast initiative"],
        ["I", `保持在线但低频，像旁白一样处理「${hookZh}」`, `Stay online low-freq, narrate through "${hookEn}"`, "旁白模式", "Narrator mode"],
        ["E", `快速组话题链，不让「${hookZh}」停在死寂`, `Chain topics fast so "${hookEn}" never dies silent`, "话题链", "Topic chain"],
        ["I", `只回应必要信息，把「${hookZh}」当成可跳过剧情`, `Only required replies; treat "${hookEn}" as skippable`, "跳过剧情", "Skip scene"]
      ]
    ];
    return packs[v];
  }
  if (axis === "SN") {
    const packs = [
      [
        ["S", `先拆「${hookZh}」的具体步骤、时间和材料`, `Break "${hookEn}" into steps, time, materials`, "步骤拆解", "Step break"],
        ["N", `先抓「${hookZh}」的方向感与最终画面`, `Capture direction and end image of "${hookEn}"`, "方向画面", "Direction shot"],
        ["S", `列出可验证细节，不让「${hookZh}」飘成气氛学`, `List checkable details so "${hookEn}" doesn't float`, "细节清单", "Detail list"],
        ["N", `允许脑洞先行，把「${hookZh}」当成概念草稿`, `Draft concepts first and treat "${hookEn}" as sketch`, "概念草稿", "Concept draft"]
      ],
      [
        ["S", `用案例和数据钉住「${hookZh}」`, `Pin "${hookEn}" with cases and data`, "数据钉住", "Data pin"],
        ["N", `先讲隐喻和可能性，再回看「${hookZh}」`, `Talk metaphor/possibility, then revisit "${hookEn}"`, "隐喻先行", "Metaphor first"],
        ["S", `把「${hookZh}」还原成可执行清单`, `Reduce "${hookEn}" into executable checklist`, "可执行", "Executable"],
        ["N", `从「${hookZh}」联想到三条未来支线`, `From "${hookEn}" branch three future routes`, "未来支线", "Future routes"]
      ],
      [
        ["S", `先确认定义：大家说的「${hookZh}」是不是同一件事`, `Confirm definition: is "${hookEn}" the same thing?`, "对齐定义", "Align define"],
        ["N", `先问如果更理想会怎样，再落地「${hookZh}」`, `Ask ideal version first, then land "${hookEn}"`, "理想先行", "Ideal first"],
        ["S", `记录现状事实，不让「${hookZh}」被形容词绑架`, `Log facts so adjectives don't kidnap "${hookEn}"`, "事实记录", "Fact log"],
        ["N", `给「${hookZh}」起一个世界观标题再推进`, `Title "${hookEn}" like worldbuilding, then proceed`, "世界观标题", "World title"]
      ],
      [
        ["S", `按优先级处理「${hookZh}」里最硬的约束`, `Handle hardest constraints in "${hookEn}" first`, "硬约束", "Hard constraint"],
        ["N", `先找「${hookZh}」背后的模式和故事`, `Find patterns/story behind "${hookEn}"`, "模式故事", "Pattern story"],
        ["S", `小步试验，用结果校正「${hookZh}」`, `Small trials to correct "${hookEn}"`, "小步试验", "Small trial"],
        ["N", `把「${hookZh}」当成灵感火花，再慢慢收敛`, `Treat "${hookEn}" as spark, then converge`, "灵感收敛", "Spark converge"]
      ]
    ];
    return packs[v];
  }
  if (axis === "TF") {
    const packs = [
      [
        ["T", `先讲清规则与后果，再处理「${hookZh}」`, `Clarify rules/consequences before "${hookEn}"`, "规则后果", "Rules first"],
        ["F", `先接住情绪，再一起看「${hookZh}」`, `Hold feelings first, then face "${hookEn}"`, "接住情绪", "Hold feelings"],
        ["T", `用利弊表评估「${hookZh}」，少靠气氛投票`, `Pros/cons table for "${hookEn}", less vibe voting`, "利弊表", "Pros/cons"],
        ["F", `优先关系不破，再优化「${hookZh}」的方案`, `Protect relationship first, then optimize "${hookEn}"`, "关系优先", "Relation first"]
      ],
      [
        ["T", `把「${hookZh}」拆成可判定的标准`, `Split "${hookEn}" into decidable criteria`, "判定标准", "Criteria"],
        ["F", `问一句你现在最需要什么，再碰「${hookZh}」`, `Ask what they need most, then touch "${hookEn}"`, "需要优先", "Need first"],
        ["T", `对事不对人，直接指出「${hookZh}」的结构性问题`, `Name structural issues in "${hookEn}"`, "对事不对人", "Issue focus"],
        ["F", `先肯定难处，再协商「${hookZh}」的边界`, `Affirm the hard part, then negotiate "${hookEn}"`, "先肯定", "Affirm first"]
      ],
      [
        ["T", `给「${hookZh}」一个可复查的结论`, `Give "${hookEn}" a reviewable conclusion`, "可复查", "Reviewable"],
        ["F", `让每个人被听见，再收束「${hookZh}」`, `Make everyone heard, then close "${hookEn}"`, "被听见", "Be heard"],
        ["T", `如果证据不足，就暂缓「${hookZh}」的拍板`, `If evidence weak, pause decision on "${hookEn}"`, "证据暂缓", "Evidence pause"],
        ["F", `用更软的表达推进「${hookZh}」，避免二次伤害`, `Softer wording on "${hookEn}" to avoid re-hurt`, "软表达", "Soft wording"]
      ],
      [
        ["T", `公开标准，减少「${hookZh}」里的模糊空间`, `Publish standards to cut fog in "${hookEn}"`, "公开标准", "Open standard"],
        ["F", `先修复信任，再谈「${hookZh}」的对错`, `Repair trust before right/wrong of "${hookEn}"`, "修复信任", "Repair trust"],
        ["T", `用流程解决「${hookZh}」，而不是靠临时态度`, `Process-fix "${hookEn}" instead of mood`, "流程解决", "Process fix"],
        ["F", `站在对方视角复述「${hookZh}」，确认理解`, `Restate "${hookEn}" from their view to confirm`, "视角复述", "Perspective restates"]
      ]
    ];
    return packs[v];
  }
  // JP
  const packs = [
    [
      ["J", `先给「${hookZh}」定截止与顺序，再允许变化`, `Set deadline/order for "${hookEn}", then allow change`, "截止顺序", "Deadline order"],
      ["P", `先抓住「${hookZh}」的当前窗口，边走边调`, `Catch current window of "${hookEn}" and tune live`, "窗口边调", "Window tune"],
      ["J", `把「${hookZh}」写进清单，完成一项划一项`, `Checklist "${hookEn}" and check items off`, "清单推进", "Checklist push"],
      ["P", `保留弹性位，让「${hookZh}」能吸收突发`, `Keep slack so "${hookEn}" absorbs surprises`, "弹性位", "Slack space"]
    ],
    [
      ["J", `先锁优先级，不让「${hookZh}」被所有事打断`, `Lock priority so "${hookEn}" isn't interrupted by all`, "锁优先级", "Lock priority"],
      ["P", `把突发当成支线，不和「${hookZh}」死磕`, `Treat surprise as side quest, not duel with "${hookEn}"`, "支线思维", "Side-quest"],
      ["J", `拆成三块可完成任务再碰「${hookZh}」`, `Split into three finishable blocks for "${hookEn}"`, "三块法", "Three blocks"],
      ["P", `先跟状态合作，再跟「${hookZh}」的计划谈判`, `Cooperate with state, then negotiate plan of "${hookEn}"`, "状态合作", "State coop"]
    ],
    [
      ["J", `预设Plan B，降低「${hookZh}」翻车成本`, `Prebuild Plan B to cut crash cost of "${hookEn}"`, "Plan B", "Plan B"],
      ["P", `允许今天只完成「${hookZh}」的最小可行版`, `Allow MVP-only progress on "${hookEn}" today`, "最小可行", "MVP today"],
      ["J", `用时间盒限制「${hookZh}」的拖延区间`, `Time-box the procrastination zone of "${hookEn}"`, "时间盒", "Time box"],
      ["P", `先行动产生信息，再回头修正「${hookZh}」`, `Act for info, then revise "${hookEn}"`, "行动出信息", "Act for info"]
    ],
    [
      ["J", `把「${hookZh}」的关键路径先铺好`, `Pave the critical path of "${hookEn}" first`, "关键路径", "Critical path"],
      ["P", `保持可转向，不把「${hookZh}」焊死`, `Stay steerable; don't weld "${hookEn}" shut`, "可转向", "Steerable"],
      ["J", `每日回顾一次「${hookZh}」进度`, `Daily review progress of "${hookEn}"`, "每日回顾", "Daily review"],
      ["P", `灵感来时先做，排期稍后对齐「${hookZh}」`, `Do it when inspired; align schedule of "${hookEn}" later`, "灵感先做", "Inspired first"]
    ]
  ];
  return packs[v];
}

function expandStems() {
  // Expand each axis list by composing mild context suffixes for volume + uniqueness.
  const suffixes = [
    ["，还尽量不翻车", ", try not to crash"],
    ["，并给自己留退路", ", and leave an exit"],
    ["，同时假装很淡定", ", while faking calm"],
    ["，顺便保住人设", ", and protect the persona"],
    ["，用最小社交成本", ", at minimum social cost"],
    ["，在不社死的前提下", ", without full cringe death"],
    ["，还要能发朋友圈复盘", ", and still post a review later"],
    ["，最好别被做成表情包", ", preferably not become a sticker"],
    ["，还得给未来自己擦屁股", ", and clean up for future-you"],
    ["，并保持基本体面", ", while keeping basic dignity"],
    ["，还要给自己留笑点", ", and keep a punchline ready"],
    ["，并准备好体面离场词", ", with a dignified exit line"],
    ["，同时不消耗明天的自己", ", without burning tomorrow-you"],
    ["，还得能复盘成经验", ", and turn it into review notes"],
    ["，最好让场面软着陆", ", preferably soft-landing the scene"],
    ["，并保住长期关系值", ", while protecting long-term relation XP"]
  ];
  const out = {};
  Object.keys(stems).forEach((topic) => {
    out[topic] = {};
    Object.keys(stems[topic]).forEach((axis) => {
      const base = stems[topic][axis];
      const expanded = [];
      for (let s = 0; s < base.length; s += 1) {
        for (let u = 0; u < suffixes.length; u += 1) {
          const b = base[s];
          const suf = suffixes[u];
          expanded.push([b[0] + suf[0], b[1] + suf[1], b[2], b[3], s, u]);
        }
      }
      out[topic][axis] = expanded;
    });
  });
  return out;
}

function buildBank() {
  const expanded = expandStems();
  const bank = [];
  let id = 1;
  const topicIds = Object.keys(expanded);
  for (let layer = 0; layer < 6; layer += 1) {
    for (const topic of topicIds) {
      for (const axis of ["EI", "SN", "TF", "JP"]) {
        const list = expanded[topic][axis] || [];
        for (let i = 0; i < list.length; i += 1) {
          if (bank.length >= 12000) break;
          const row = list[i];
          const twist = pick(twists, i * 3 + layer * 5 + topic.length);
          const quote = pick(quotes, i * 7 + layer * 11 + axis.charCodeAt(0));
          const variant = (i + layer * 2 + topic.length) % 4;
          const hookZh = row[2];
          const hookEn = row[3];
          const opts = optionPack(axis, hookZh, hookEn, variant).map((opt) => ({
            value: opt[0],
            label: bi(opt[1], opt[2]),
            hint: bi(opt[3], opt[4])
          }));
          // slight layer flavor on options to increase uniqueness further
          if (layer > 0) {
            const flavorZh = ["（稳一点）", "（酷一点）", "（笑一点）", "（轻一点）", "（准一点）"][(layer - 1) % 5];
            const flavorEn = [" (steady)", " (cooler)", " (funnier)", " (lighter)", " (sharper)"][(layer - 1) % 5];
            opts.forEach((o, idx) => {
              if ((idx + layer) % 2 === 0) {
                o.label = bi(o.label.zh + flavorZh, o.label.en + flavorEn);
              }
            });
          }
          const cat = CATEGORIES.find((c) => c.id === topic) || CATEGORIES[0];
          const textZh = row[0] + "。" + twist[0] + "。面对「" + hookZh + "」，你会？";
          const textEn = row[1] + ". " + twist[1] + ". Facing \"" + hookEn + "\", you:";
          bank.push({
            id: id++,
            axis,
            category: bi(cat.zh, cat.en),
            topic: topic,
            tags: [topic, axis.toLowerCase(), "humor", "layer" + layer],
            kicker: bi(cat.emoji + " " + cat.zh + " · " + axisMeta[axis].zh + " · " + axis, cat.emoji + " " + cat.en + " · " + axisMeta[axis].en + " · " + axis),
            text: bi(textZh, textEn),
            quote: bi("金句：" + quote[0], "Quote: " + quote[1]),
            options: opts
          });
        }
      }
    }
  }

  // uniqueness by axis+text+options
  const seen = new Set();
  const unique = [];
  for (const q of bank) {
    const key =
      q.axis +
      "|" +
      q.text.zh.replace(/\s+/g, "") +
      "|" +
      q.options
        .map((o) => o.value + ":" + o.label.zh)
        .join("||");
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(q);
  }
  // Make option sets unique by binding each option to the full scene phrase,
  // not only the short hook. This keeps logic while avoiding copy-paste options.
  const final = [];
  const optSeen = new Set();
  for (const q of unique) {
    const sceneZh = String(q.text.zh).split("。")[0];
    const sceneEn = String(q.text.en).split(".")[0];
    const shortZh = sceneZh.length > 18 ? sceneZh.slice(0, 18) + "…" : sceneZh;
    const shortEn = sceneEn.length > 28 ? sceneEn.slice(0, 28) + "…" : sceneEn;
    q.options = q.options.map((o) => ({
      value: o.value,
      label: bi(
        o.label.zh.replace(/「[^」]+」/g, "「" + shortZh + "」"),
        o.label.en.replace(/"[^"]+"/g, '"' + shortEn + '"')
      ),
      hint: o.hint
    }));
    const optKey = q.options.map((o) => o.label.zh).join("|");
    if (optSeen.has(optKey)) continue;
    optSeen.add(optKey);
    final.push(q);
  }
  final.forEach((q, i) => {
    q.id = i + 1;
  });
  return final;
}

const QUESTION_BANK = buildBank();
if (QUESTION_BANK.length < 10000) {
  console.error("BANK_TOO_SMALL", QUESTION_BANK.length);
  process.exit(1);
}

const QUESTIONS = (() => {
  const out = [];
  ["EI", "SN", "TF", "JP"].forEach((axis) => {
    out.push.apply(out, shuffle(QUESTION_BANK.filter((q) => q.axis === axis)).slice(0, 12));
  });
  return shuffle(out).map((q, i) => Object.assign({}, q, { id: i + 1 }));
})();

const nextCodex = Array.isArray(CODEX) && CODEX.length >= 49 ? CODEX : CODEX;

UI_TEXT.zh = Object.assign({}, UI_TEXT.zh, {
  brandSub: "1万+题库 · 分类/随机48题 · 图鉴49+",
  homeTitle: "选题库副本，抽取你的人格掉落",
  homeLead: "题库 10000+，覆盖恋爱/学习/职场/人生/搞笑/动漫/游戏等。可按分类测，也可全随机。每题四选项与情景绑定，金句又损又有哲理。",
  feature1Title: "1万+且选项不串题",
  feature1Text: "题干、选项、金句按情景生成，逻辑对齐，避免复制粘贴选项。",
  feature2Title: "分类测或随机测",
  feature2Text: "恋爱、学习、职场、动漫…想测什么点什么；也可一键随机。",
  feature3Title: "图鉴+投稿+手机可玩",
  feature3Text: "图鉴49+，答完可投稿；微信/QQ内直接作答。",
  bankMeta: "题库 {bank} 题 · 本局 {n} 题 · {mode}",
  categoryTitle: "选择测试内容",
  categoryLead: "点分类只抽该类题；点“随机混合”从全库均衡抽取。",
  categoryAll: "随机混合",
  categoryPicked: "已选：{name}",
  modeAll: "随机混合",
  modeCat: "分类：{name}",
  aboutBody: "纯前端趣味测试 + 本地投稿。题库1万+，分类/随机48题。选项与题目绑定生成。微信/QQ内可直接作答。娱乐向，有参考性，非专业评估。"
});
UI_TEXT.en = Object.assign({}, UI_TEXT.en, {
  brandSub: "10k+ bank · category/random 48 · codex 49+",
  homeTitle: "Pick a dungeon, loot your type",
  homeLead: "10,000+ prompts across love/study/work/life/funny/anime/games. Category mode or full random. Options are scene-bound; quotes are sharp and wise.",
  feature1Title: "10k+ non-copied options",
  feature1Text: "Stem, options, quotes generated per scene with axis logic.",
  feature2Title: "Category or random",
  feature2Text: "Love, study, work, anime... or shuffle all.",
  feature3Title: "Codex + contribute + mobile",
  feature3Text: "49+ codex, contribute after results; play in WeChat/QQ.",
  bankMeta: "Bank {bank} · Run {n} · {mode}",
  categoryTitle: "Choose test focus",
  categoryLead: "Pick a category or full random mix.",
  categoryAll: "Random mix",
  categoryPicked: "Selected: {name}",
  modeAll: "Random mix",
  modeCat: "Category: {name}",
  aboutBody: "Front-end fun quiz + local contribute. 10k+ bank, category/random 48. Scene-bound options. Works in WeChat/QQ. Entertaining, not clinical."
});

const out =
  "const QUESTION_BANK = " +
  dump(QUESTION_BANK) +
  ";\n\nconst QUESTIONS = " +
  dump(QUESTIONS) +
  ";\n\nconst CATEGORIES = " +
  dump(CATEGORIES) +
  ";\n\nconst TYPES = " +
  dump(TYPES) +
  ";\n\nconst CODEX = " +
  dump(nextCodex) +
  ";\n\nconst CAREERS = " +
  dump(CAREERS) +
  ";\n\nconst MATCHES = " +
  dump(MATCHES) +
  ";\n\nconst UI_TEXT = " +
  dump(UI_TEXT) +
  ";\n";

fs.writeFileSync(dataPath, out, "utf8");

const axes = QUESTION_BANK.reduce((a, q) => {
  a[q.axis] = (a[q.axis] || 0) + 1;
  return a;
}, {});
const topics = QUESTION_BANK.reduce((a, q) => {
  a[q.topic] = (a[q.topic] || 0) + 1;
  return a;
}, {});
const optMap = new Map();
for (const q of QUESTION_BANK) {
  const k = q.options.map((o) => o.label.zh).join("|");
  optMap.set(k, (optMap.get(k) || 0) + 1);
}
const dupOpts = [...optMap.values()].filter((n) => n > 1).length;
console.log("BANK", QUESTION_BANK.length, axes);
console.log("TOPICS", topics);
console.log("dupOptionSets", dupOpts);
console.log("CODEX", nextCodex.length);
console.log("sample", QUESTION_BANK[0].text.zh);
console.log("sampleOpts", QUESTION_BANK[0].options.map((o) => o.value + ":" + o.label.zh).join(" | "));
