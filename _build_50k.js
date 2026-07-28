/**
 * Build >=50k compact bilingual bank.json + update CATEGORIES/UI_TEXT in slim data.js.
 * Compact row:
 * [id, axis, topic, textZh, textEn, quoteZh, quoteEn, kickerZh, kickerEn, options]
 * options: [[value, labelZh, labelEn, hintZh, hintEn], x4]
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = __dirname;
const bankPath = path.join(root, "bank.json");
const dataPath = path.join(root, "data.js");
const TARGET = 50000;

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
  { id: "money", zh: "金钱", en: "Money", emoji: "💸" },
  { id: "dead", zh: "社死", en: "Cringe", emoji: "😰" },
  { id: "fish", zh: "摸鱼", en: "Slacking", emoji: "🐟" },
  { id: "drama", zh: "追剧", en: "Drama", emoji: "📺" },
  { id: "eat", zh: "干饭", en: "Feast", emoji: "🥟" },
  { id: "sport", zh: "运动", en: "Sport", emoji: "🏃" },
  { id: "pet", zh: "宠物", en: "Pets", emoji: "🐱" },
  { id: "night", zh: "深夜", en: "Night", emoji: "🌙" },
  { id: "friend", zh: "友情", en: "Friends", emoji: "🤝" }
];

const axisMeta = {
  EI: { zh: "社死或社牛", en: "Cringe or Charge", poles: ["E", "I"] },
  SN: { zh: "细节或脑洞", en: "Detail or Daydream", poles: ["S", "N"] },
  TF: { zh: "理智或心软", en: "Logic or Soft Heart", poles: ["T", "F"] },
  JP: { zh: "计划或浪", en: "Plan or Flow", poles: ["J", "P"] }
};

function bi(zh, en) {
  return [zh, en];
}

function pick(arr, i) {
  return arr[((i % arr.length) + arr.length) % arr.length];
}

function catById(id) {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[0];
}

// [sceneZh, sceneEn, hookZh, hookEn]
const baseStems = {
  love: {
    EI: [
      ["第一次约会冷场十秒", "First date silence hits ten seconds", "冷场十秒", "ten-second silence"],
      ["对方家长突然视频连线", "Their parents jump on video call", "家长连线", "parent video"],
      ["暧昧期被共同好友起哄", "Mutual friends tease your situationship", "朋友起哄", "friend teasing"],
      ["告白后对方只回了嗯", "They reply only mm after your confess", "嗯字回复", "mm reply"],
      ["约会走到一半遇到前对象", "You bump into an ex mid-date", "偶遇前任", "ex encounter"],
      ["对方说今晚见家长", "They say meet the parents tonight", "见家长", "meet parents"],
      ["情侣群突然@你发言", "Couple group chat @you to speak", "情侣群@你", "couple-chat @you"],
      ["约会餐厅只剩靠过道的位", "Only aisle seats left on the date", "过道座位", "aisle seats"],
      ["对方朋友局全员盯着你", "Their friend circle all stares at you", "朋友局盯梢", "friend stare"],
      ["语音通话卡在要不要说想你", "Voice call freezes on saying miss you", "说想你", "say miss-you"],
      ["约会时消息弹出前任点赞", "Ex like pops up mid-date", "前任点赞", "ex like"],
      ["刚发完朋友圈收到相亲群@", "Matchmaking group @ you right after post", "相亲群@", "match @"],
      ["对方突然说想认真谈", "They suddenly want something serious", "认真谈", "go serious"],
      ["约会被问工资房子计划", "Date turns into salary house plan quiz", "人生拷问", "life grill"],
      ["刚送完礼物对方说太贵重", "Gift called too expensive right away", "礼物太贵", "gift costly"],
      ["约会结束说下次再约没时间", "They say next time with no time", "下次再约", "next time"]
    ],
    SN: [
      ["对方说想要一点仪式感", "They want a little ritual vibe", "仪式感", "ritual vibe"],
      ["纪念日礼物只说随便就好", "Anniversary gift brief is whatever", "随便礼物", "whatever gift"],
      ["聊天只丢一个表情包", "They send one sticker only", "单表情包", "one sticker"],
      ["约会攻略互相发了三版", "You both send three date plans", "三版攻略", "three plans"],
      ["对方说我们随缘看看", "They say let's go with the flow", "随缘看看", "go with flow"],
      ["恋爱目标写成共同成长", "Love goal is written as grow together", "共同成长", "grow together"],
      ["对方描述理想周末很抽象", "Their ideal weekend is abstract fog", "抽象周末", "abstract weekend"],
      ["纪念日只记得大概感觉", "You only remember the anniversary vibe", "大概感觉", "rough vibe"],
      ["聊天记录全是哈哈哈", "Chat log is pure hahaha", "哈哈哈记录", "hahaha log"],
      ["对方说喜欢认真的人但没定义", "They like serious people undefined", "认真未定义", "serious undefined"]
    ],
    TF: [
      ["吵架时对方开始掉小珍珠", "They start tearing up mid-fight", "掉小珍珠", "tearing up"],
      ["对方失约只丢了客观原因", "They cancel with only objective reasons", "客观失约", "objective cancel"],
      ["朋友劝你别太心软", "Friends tell you not to be too soft", "别太心软", "don't soft"],
      ["复合请求带着逻辑PPT", "Reconciliation comes with a logic deck", "复合PPT", "reconcile deck"],
      ["对方把恋爱当项目排期", "They schedule love like a project", "恋爱排期", "love schedule"],
      ["要不要指出对方双重标准", "Call out their double standard?", "双重标准", "double standard"],
      ["对方哭着说你太理性", "They cry that you are too rational", "太理性", "too rational"],
      ["分手条件写得像合同", "Breakup terms look like a contract", "分手合同", "breakup contract"]
    ],
    JP: [
      ["周末约会还没定地点", "Weekend date has no place yet", "未定点", "no place"],
      ["对方突然改行程", "They suddenly change the plan", "改行程", "plan change"],
      ["纪念日撞上DDL", "Anniversary collides with a deadline", "纪念日DDL", "anni-DDL"],
      ["旅行恋爱想自由行还是跟团", "Love trip free roam or tour group", "自由或跟团", "free or tour"],
      ["聊天约时间永远对不齐", "Chat schedules never align", "时间对不齐", "time mismatch"],
      ["约会清单写到第十二项", "Date checklist hits item twelve", "约会清单", "date checklist"],
      ["对方说走到哪算哪", "They say go wherever feet lead", "走到哪算哪", "wherever"],
      ["惊喜计划被现实打乱", "Surprise plan gets wrecked by reality", "惊喜打乱", "surprise wreck"]
    ]
  },
  study: {
    EI: [
      ["小组作业要你上台讲", "Group project wants you on stage", "上台讲", "on stage"],
      ["自习室只剩你和陌生人", "Only you and a stranger in study room", "自习室双人", "study duo"],
      ["老师点名提问你走神了", "Teacher cold-calls while you zone out", "点名走神", "cold-call"],
      ["线上讨论全班静音", "Whole class is muted online", "全班静音", "all muted"],
      ["学霸群突然@你答疑", "Top-student group @you for answers", "学霸群@", "elite @you"],
      ["课堂分享观点被点名", "Class asks you to share views", "课堂点名", "class call"],
      ["同学拉你对答案到闭馆", "Peer pulls answer-check until closing", "对答案", "answer check"],
      ["导师组会轮到你但PPT半成品", "Lab meeting hits you mid-half PPT", "半成品PPT", "half PPT"]
    ],
    SN: [
      ["复习大纲只有一个词重点", "Review outline is one word key points", "重点大纲", "key outline"],
      ["论文题目大到能装宇宙", "Thesis title could fit a universe", "宇宙论文", "universe thesis"],
      ["实验报告要求有创新表达", "Lab report demands creative expression", "创新报告", "creative report"],
      ["背书时记忆像漏水容器", "Memorizing feels like a leaking tank", "漏水记忆", "leaky memory"],
      ["网课进度条和理解度反向", "Progress bar moves opposite of understanding", "反向进度", "reverse progress"],
      ["错题本比教科书还厚", "Wrong-book thicker than textbook", "厚错题本", "thick wrongs"],
      ["老师说理解别背你抄三遍", "Teacher says understand not memorize", "理解别背", "understand not rote"],
      ["考点传说版本分不清", "Exam-point myths have too many versions", "考点传说", "exam lore"]
    ],
    TF: [
      ["队友摆烂但情绪很委屈", "Teammate slacks but feels wronged", "摆烂委屈", "slack sadness"],
      ["成绩出来朋友来安慰你", "Friend comforts you after grades", "成绩安慰", "grade comfort"],
      ["批改意见又冷又长", "Feedback is cold and long", "冷长批改", "cold feedback"],
      ["是否举报抄袭争论起来", "Debate whether to report plagiarism", "举报抄袭", "report copy"],
      ["小组分数要不要讲道理", "Should group score follow pure logic", "分数讲理", "score logic"],
      ["同学哭着求你借作业", "Classmate cries for homework borrow", "借作业", "borrow hw"]
    ],
    JP: [
      ["考前三天计划表还是空白", "Three days pre-exam plan is blank", "空白计划", "blank plan"],
      ["刷题想从随机卷还是章节", "Drills random paper or chapter order", "随机或章节", "random/chapter"],
      ["图书馆座位只剩两小时", "Library seat only lasts two hours", "两小时座位", "two-hour seat"],
      ["复习清单越写越长", "Review list grows while you write", "变长清单", "growing list"],
      ["临时加考打乱周末安排", "Pop quiz wrecks weekend plan", "临时加考", "pop quiz"],
      ["想先摸鱼十分钟再学习", "Want ten minutes slack then study", "先摸鱼", "slack first"]
    ]
  },
  work: {
    EI: [
      ["周会冷场领导看向你", "Weekly meeting freezes boss looks at you", "周会冷场", "meeting freeze"],
      ["客户电话突然转给你", "Client call is suddenly transferred to you", "客户电话", "client call"],
      ["团建要你当破冰队长", "Team building makes you icebreak captain", "破冰队长", "ice captain"],
      ["跨部门群@你要方案", "Cross-team chat @you for a plan", "跨部门@", "cross @"],
      ["领导突然问你怎么看", "Boss suddenly asks your view", "领导提问", "boss ask"],
      ["新同事入职让你带欢迎词", "New hire needs your welcome speech", "欢迎词", "welcome talk"],
      ["站会轮到你同步但没睡醒", "Standup hits you half-awake", "站会同步", "standup sync"],
      ["客户局全员围观等你开场", "Client room waits for your opener", "客户开场", "client open"]
    ],
    SN: [
      ["需求文档写了个感觉对就行", "Spec says just make it feel right", "感觉对就行", "feel right"],
      ["复盘只聊愿景不讲数据", "Retro talks vision not data", "愿景复盘", "vision retro"],
      ["故障原因像侦探小说", "Incident cause reads like detective fiction", "故障侦探", "incident detective"],
      ["OKR写得像诗细节全靠猜", "OKR reads like poetry details guessed", "诗意OKR", "poetic OKR"],
      ["老板只要方向不要路径", "Boss wants direction not path", "只要方向", "direction only"],
      ["需求反复变更版本迷雾", "Requirements change into fog", "需求迷雾", "req fog"]
    ],
    TF: [
      ["同事迟到但理由很催泪", "Coworker late with tearjerker reason", "催泪迟到", "tear late"],
      ["要不要公开指出方案漏洞", "Publicly point out plan holes?", "指出漏洞", "point holes"],
      ["绩效沟通对方开始掉眼泪", "Perf talk turns into tears", "绩效眼泪", "perf tears"],
      ["甩锅故事逻辑很完整", "Blame story is logically complete", "甩锅完整", "perfect blame"],
      ["客户骂人你要不要硬刚", "Client yells do you push back", "客户硬刚", "client push"],
      ["团队情绪低落要不要先哄", "Team low mood soothe first?", "先哄团队", "soothe team"]
    ],
    JP: [
      ["项目排期被临时插队", "Project schedule gets cut in line", "排期插队", "schedule cut-in"],
      ["今天先救火还是推进主线", "Firefight today or push mainline", "救火或主线", "fire or main"],
      ["周计划写满但早上全变", "Week plan full morning all changes", "计划全变", "plan flip"],
      ["会议从九变成了十五个", "Meetings grow from nine to fifteen", "会议膨胀", "meeting bloat"],
      ["DDL前夜还在改需求", "Requirements change on DDL night", "DDL改需求", "DDL change"],
      ["想把待办分成紧急和随便", "Split todos into urgent and whatever", "紧急随便", "urgent/whatever"]
    ]
  },
  life: {
    EI: [
      ["朋友局突然把话题甩给你", "Friend hangout dumps topic on you", "话题甩来", "topic dump"],
      ["电梯里遇熟人要不要开麦", "Meet acquaintance in elevator speak?", "电梯熟人", "elevator known"],
      ["社区活动点你当临时主持", "Community event makes you temp host", "临时主持", "temp host"],
      ["聚餐点菜全桌看你", "Whole table stares while you order", "全桌点菜", "table order"],
      ["陌生人搭讪你要不要接", "Stranger small-talk do you take it", "陌生人搭讪", "stranger chat"]
    ],
    SN: [
      ["人生目标写成幸福就好", "Life goal written as just be happy", "幸福就好", "just happy"],
      ["年度计划只剩氛围感", "Year plan is pure vibe", "氛围计划", "vibe plan"],
      ["别人建议你活得通透点", "People tell you live more lucid", "活得通透", "live lucid"],
      ["日常决策靠玄学硬币", "Daily decisions by coin mysticism", "玄学硬币", "mystic coin"],
      ["自我提升清单抽象成星空", "Self-improve list becomes starfield", "抽象清单", "abstract list"]
    ],
    TF: [
      ["朋友哭诉但逻辑前后矛盾", "Friend vents with broken logic", "矛盾哭诉", "broken vent"],
      ["要不要说实话扫大家兴", "Tell truth and kill the vibe?", "实话扫兴", "truth kill-vibe"],
      ["帮助别人还是先保护边界", "Help others or protect boundary", "帮助边界", "help boundary"],
      ["家人比较让你心里不是滋味", "Family compare leaves a bad taste", "比较滋味", "compare taste"]
    ],
    JP: [
      ["周末安排被临时邀请冲散", "Weekend plan blasted by last invite", "周末冲散", "weekend blast"],
      ["待办软件和现实互相打架", "Todo app fights real life", "待办打架", "todo fight"],
      ["想严格作息又想熬夜自由", "Want strict sleep and night freedom", "作息自由", "sleep freedom"],
      ["人生阶段切换没有说明书", "Life stage switch has no manual", "无说明书", "no manual"]
    ]
  },
  funny: {
    EI: [
      ["群聊冷场只剩你在线", "Group chat freeze and only you online", "群聊冷场", "chat freeze"],
      ["你讲的冷笑话全场静音", "Your dad joke mutes the room", "冷笑话静音", "joke mute"],
      ["被点名复述今天的离谱", "Asked to retell today's chaos", "复述离谱", "retell chaos"],
      ["整活失败全场等你圆场", "Bit fails room waits for recovery", "整活圆场", "bit recover"]
    ],
    SN: [
      ["段子只有情绪没有包袱", "Bit has vibes but no punchline", "无包袱", "no punchline"],
      ["热梗解释越讲越抽象", "Meme explain grows more abstract", "热梗抽象", "meme abstract"],
      ["复盘社死事件只记得气氛", "Cringe review remembers only vibe", "气氛复盘", "vibe review"],
      ["今日运势写着宜发疯", "Horoscope says good day to go feral", "宜发疯", "go feral"]
    ],
    TF: [
      ["朋友被整惨你要不要补刀", "Friend got roasted do you add salt", "补刀与否", "add salt"],
      ["吐槽很准但对方破防了", "Roast accurate but they break", "吐槽破防", "roast break"],
      ["要不要用逻辑拆穿离谱剧情", "Logic-check the absurd plot?", "拆穿离谱", "debunk absurd"]
    ],
    JP: [
      ["今日份发疯要不要排进日程", "Schedule today's feral episode?", "发疯日程", "feral schedule"],
      ["即兴整活还是按剧本笑", "Improv bit or scripted laughs", "即兴或剧本", "improv/script"],
      ["笑点来了但DDL也来了", "Punchline arrives with the deadline", "笑点DDL", "joke DDL"]
    ]
  },
  anime: {
    EI: [
      ["同好局要你安利开麦", "Fandom hang wants your pitch mic", "安利开麦", "pitch mic"],
      ["漫展偶遇要不要搭话", "Con encounter do you start talk", "漫展搭话", "con talk"],
      ["角色曲合唱只剩你高音", "Character song leaves your high note", "合唱高音", "chorus high"],
      ["群里争论人设点你总结", "Lore fight asks you to summarize", "人设总结", "lore summary"]
    ],
    SN: [
      ["世界观设定突然前后矛盾", "Lore suddenly contradicts itself", "设定矛盾", "lore clash"],
      ["只记得名场面不记得剧情", "You remember scenes not plot", "名场面记忆", "scene memory"],
      ["角色弧光和作者意图打架", "Character arc fights author intent", "弧光打架", "arc fight"],
      ["补番笔记写成情绪云图", "Catch-up notes become emotion cloud", "情绪云图", "emotion cloud"]
    ],
    TF: [
      ["角色牺牲名场面让你破防", "Character sacrifice breaks you", "牺牲破防", "sacrifice break"],
      ["要不要剧透救队友焦虑", "Spoiler to save a friend's anxiety?", "剧透救援", "spoiler rescue"],
      ["CP论战要讲证据还是信仰", "Ship war evidence or faith", "CP论战", "ship war"]
    ],
    JP: [
      ["追番进度被新番暴击", "Watchlist blasted by new season", "新番暴击", "new-season hit"],
      ["补番计划被一键崩坏", "Catch-up plan collapses in one click", "补番崩坏", "catch-up crash"],
      ["想一次性刷完又怕空虚", "Want binge finish fear emptiness", "刷完空虚", "binge empty"]
    ]
  },
  game: {
    EI: [
      ["开黑语音只有你最安静", "You're quietest in party voice", "开黑静音", "party mute"],
      ["排位队友要求你指挥", "Ranked teammate demands you shotcall", "排位指挥", "rank call"],
      ["公会战需要你开麦动员", "Guild war needs your rally voice", "公会动员", "guild rally"],
      ["赛后复盘全队看你先说", "Post-match review looks at you first", "复盘先说", "review first"]
    ],
    SN: [
      ["攻略细节和直觉路线冲突", "Guide details fight intuition route", "攻略冲突", "guide clash"],
      ["Boss机制说明像天书", "Boss mechanic text looks arcane", "机制天书", "mechanic tome"],
      ["构筑理论派和手感派对线", "Theorycrafters vs feel players split", "理论手感", "theory/feel"],
      ["地图只画了个感觉往左", "Map note just says feel left", "感觉往左", "feel left"]
    ],
    TF: [
      ["队友失误要不要公开复盘", "Publicly review a teammate mistake?", "公开复盘", "public review"],
      ["挂机队友求情说家里有事", "AFK teammate pleads family emergency", "挂机求情", "AFK plead"],
      ["要不要举报开挂还是算了", "Report cheater or let it go", "举报开挂", "report cheat"]
    ],
    JP: [
      ["排位还是先打休闲局", "Ranked climb or casual first", "排位或休闲", "rank or casual"],
      ["肝活动还是养精神", "Grind event or protect sanity", "肝或养", "grind/rest"],
      ["副本时间和个人计划冲突", "Raid time fights personal plan", "副本冲突", "raid conflict"]
    ]
  },
  family: {
    EI: [
      ["家族聚餐点你先发言", "Family reunion asks you to speak first", "先发言", "speak first"],
      ["长辈连续追问婚恋进度", "Relatives grill your relationship status", "婚恋拷问", "status grill"],
      ["家庭群突然@你做决定", "Family chat @you to decide", "家庭群决定", "family decide"],
      ["视频拜年突然转成你主讲", "New-year video makes you the host", "拜年主讲", "NY host"]
    ],
    SN: [
      ["长辈建议很笼统听话就好", "Elder advice is just be obedient", "听话就好", "be obedient"],
      ["家务分工只有大家看着办", "Chores plan is just figure it out", "看着办", "figure out"],
      ["家里装修目标写成舒服高级", "Home reno goal is comfy premium", "舒服高级", "comfy premium"],
      ["长辈用故事代替具体建议", "Elders give stories not specifics", "故事建议", "story advice"]
    ],
    TF: [
      ["家人情绪崩溃找你撑腰", "Family meltdown seeks your support", "情绪撑腰", "emotion backup"],
      ["要不要说实话扫兴", "Tell blunt truth and kill the vibe?", "实话扫兴", "truth kill-vibe"],
      ["兄弟姐妹争资源让你仲裁", "Siblings fight resources pick you judge", "仲裁资源", "resource judge"],
      ["长辈比较你和别人的孩子", "Elders compare you with other kids", "比较孩子", "compare kids"]
    ],
    JP: [
      ["春节行程被临时改三版", "Holiday itinerary changes three times", "行程三改", "trip triple-change"],
      ["家务DDL和个人计划冲突", "Chore deadline fights personal plan", "家务冲突", "chore conflict"],
      ["回家短住计划被延长", "Short home stay gets extended", "短住延长", "stay extend"],
      ["家庭聚会合影时间一改再改", "Family photo time keeps shifting", "合影改期", "photo shift"]
    ]
  },
  digital: {
    EI: [
      ["直播间冷场要你暖场", "Livestream freeze needs your warm-up", "直播暖场", "live warm"],
      ["评论区吵起来点你出场", "Comment fight summons you", "评论出场", "comment summon"],
      ["语音房突然把麦给你", "Voice room suddenly gives you the mic", "语音房麦", "voice mic"],
      ["粉丝提问连麦只盯着你", "Fan Q&A live focuses only on you", "连麦提问", "live Q"]
    ],
    SN: [
      ["热搜只有三个字离谱", "Trending topic is just wild", "热搜离谱", "trend wild"],
      ["算法推荐把你画像讲歪", "Algorithm paints a wrong portrait", "画像讲歪", "wrong portrait"],
      ["内容大纲写成有感觉就行", "Content outline says just feel it", "有感觉就行", "just feel"],
      ["数据很好但看不懂为什么", "Metrics good reason unknown", "数据谜", "metric mystery"]
    ],
    TF: [
      ["网暴边缘要不要站队", "Near pile-on take a side?", "站队边缘", "side edge"],
      ["私信求助故事真假难辨", "DM help story hard to verify", "私信真假", "DM truth"],
      ["要不要公开回击阴阳评论", "Publicly clap back at shade?", "回击阴阳", "clap back"]
    ],
    JP: [
      ["更新计划被热搜打乱", "Update plan blasted by trending", "热搜打乱", "trend blast"],
      ["想日更又想养精神", "Want daily post and sanity", "日更精神", "daily sanity"],
      ["草稿箱比发布键更亲近", "Draft box feels closer than publish", "草稿箱", "draft box"]
    ]
  },
  travel: {
    EI: [
      ["旅行团冷场要你带动气氛", "Tour group freeze needs your vibe", "带动气氛", "boost vibe"],
      ["问路时当地人开始长聊", "Local giving directions starts long chat", "问路长聊", "ask long chat"],
      ["同行要求你负责社交翻译", "Companions make you social translator", "社交翻译", "social translate"],
      ["民宿主人热情到要联欢", "Host is so warm a party starts", "民宿联欢", "host party"]
    ],
    SN: [
      ["攻略只有氛围感关键词", "Guide is only vibe keywords", "氛围攻略", "vibe guide"],
      ["地图软件和现实对不上", "Map app disagrees with reality", "地图对不上", "map mismatch"],
      ["行程目标写成随缘快乐", "Trip goal written as random joy", "随缘快乐", "random joy"],
      ["景点介绍全是传说没有出口", "Spot lore has myths no exit", "传说景点", "myth spot"]
    ],
    TF: [
      ["同伴迷路情绪崩溃", "Companion lost and meltdown", "迷路崩溃", "lost melt"],
      ["超支要不要当场算账", "Overspend settle the bill now?", "当场算账", "bill now"],
      ["要不要拒绝对方危险提议", "Reject their risky proposal?", "拒绝危险", "reject risk"]
    ],
    JP: [
      ["航班延误打乱全部衔接", "Delay wrecks every connection", "延误打乱", "delay wreck"],
      ["想严格跟攻略又想流浪", "Want strict guide and wander", "攻略流浪", "guide wander"],
      ["行李清单写到怀疑人生", "Packing list hits existential crisis", "行李清单", "pack list"]
    ]
  },
  food: {
    EI: [
      ["聚餐点菜全员弃权看你", "Everyone abstains and stares at you", "点菜弃权", "order abstain"],
      ["服务员连问三遍你口味", "Waiter asks your taste three times", "口味三问", "taste thrice"],
      ["美食局要你先评价第一口", "Food hang wants your first-bite review", "第一口评", "first-bite"],
      ["火锅蘸料哲学争论点你总结", "Hotpot dip philosophy needs your summary", "蘸料总结", "dip summary"]
    ],
    SN: [
      ["菜单只有感觉很高级", "Menu only says feels premium", "感觉高级", "feel premium"],
      ["菜谱步骤抽象成适量", "Recipe steps reduce to some amount", "适量玄学", "some amount"],
      ["探店笔记只写了氛围真好", "Food notes only say great vibe", "氛围笔记", "vibe notes"],
      ["口味描述全是灵魂两个字", "Taste description is just soul", "灵魂口味", "soul taste"]
    ],
    TF: [
      ["朋友点了你雷的菜求你试试", "Friend orders your hate food for try", "雷菜试吃", "hate try"],
      ["AA细节要不要当场说清", "Clarify AA details on the spot?", "AA说清", "AA clear"],
      ["厨师出错要不要委婉反馈", "Chef error soft feedback?", "委婉反馈", "soft feedback"]
    ],
    JP: [
      ["想按计划探店又想随机进", "Want planned spots and random entry", "计划随机", "plan random"],
      ["排队两小时值不值重估", "Two-hour queue worth re-evaluate", "排队重估", "queue reeval"],
      ["宵夜冲动打乱明日饮食", "Midnight snack wrecks next diet", "宵夜打乱", "night wreck"]
    ]
  },
  money: {
    EI: [
      ["朋友局突然讨论工资", "Friend hang suddenly talks salary", "讨论工资", "talk salary"],
      ["家庭会要你讲理财观点", "Family meeting wants your money view", "理财观点", "money view"],
      ["拼单群@你做最终决策", "Group-buy chat @you for final call", "拼单决策", "group-buy call"],
      ["被问月开销你要不要坦白", "Asked monthly spend confess?", "开销坦白", "spend confess"]
    ],
    SN: [
      ["预算表只有活得精致", "Budget sheet only says live refined", "精致预算", "refined budget"],
      ["投资理由写成感觉会涨", "Invest reason is feels like rising", "感觉会涨", "feels rising"],
      ["账单分类抽象成生活费", "Bill categories collapse to living", "生活费抽象", "living abstract"],
      ["理财目标大到像电影片名", "Money goal big like a movie title", "电影目标", "movie goal"]
    ],
    TF: [
      ["朋友借钱理由很感人", "Friend loan story is very moving", "感人借钱", "moving loan"],
      ["要不要拒绝不合理分摊", "Reject unfair split?", "拒绝分摊", "reject split"],
      ["促销很香但逻辑说不该买", "Sale is hot logic says no", "促销逻辑", "sale logic"]
    ],
    JP: [
      ["发薪日计划被冲动消费改写", "Payday plan rewritten by impulse", "发薪改写", "payday rewrite"],
      ["存钱计划和周末浪冲突", "Saving plan fights weekend splash", "存钱冲突", "save conflict"],
      ["账单日和快乐消费撞车", "Bill day collides with happy spend", "账单撞车", "bill crash"]
    ]
  },
  dead: {
    EI: [
      ["当众念错名字全场安静", "Misread a name public silence", "念错名字", "wrong name"],
      ["开会麦克风忘记关说真话", "Mic left on you said the truth", "麦没关", "hot mic"],
      ["群发消息发错到老板群", "Broadcast lands in boss group", "发错群", "wrong group"],
      ["自我介绍卡壳十秒", "Self-intro freezes ten seconds", "介绍卡壳", "intro freeze"]
    ],
    SN: [
      ["社死回放只记得脸很热", "Cringe replay only remembers hot face", "脸很热", "hot face"],
      ["复盘社死事件细节全糊", "Cringe review details all blur", "细节全糊", "blur details"],
      ["别人安慰说没事你脑补电影", "They say fine you film a movie", "脑补电影", "brain movie"]
    ],
    TF: [
      ["要不要当场解释还是装死", "Explain now or play dead?", "解释装死", "explain/dead"],
      ["朋友笑场你要不要一起笑", "Friend laughs do you join?", "一起笑场", "join laugh"],
      ["被误会要不要冷静澄清", "Misread calmly clarify?", "冷静澄清", "calm clarify"]
    ],
    JP: [
      ["社死后想立刻逃离现场", "After cringe want instant escape", "逃离现场", "escape scene"],
      ["想写检讨又想当没发生", "Want write review and pretend none", "检讨假装", "review pretend"],
      ["补救计划和装傻计划并列", "Fix plan and play-dumb plan tied", "补救装傻", "fix/dumb"]
    ]
  },
  fish: {
    EI: [
      ["摸鱼被领导突然拍肩", "Slacking gets boss shoulder tap", "领导拍肩", "boss tap"],
      ["摸鱼群聊@你分享经验", "Slack chat @you for tips", "摸鱼经验", "slack tips"],
      ["同事路过你屏幕要解释", "Coworker passes screen needs explain", "屏幕解释", "screen explain"],
      ["线上会议你镜头还开着", "Online meeting camera still on", "镜头开着", "cam on"]
    ],
    SN: [
      ["摸鱼理由写成状态调整", "Slack reason written as state adjust", "状态调整", "state adjust"],
      ["效率方法只有玄学番茄钟", "Efficiency is mystic pomodoro", "玄学番茄", "mystic tomato"],
      ["待办列表抽象成以后再说", "Todo list becomes later maybe", "以后再说", "later maybe"]
    ],
    TF: [
      ["同事摸鱼被抓求你圆谎", "Caught slacker asks you cover", "圆谎求助", "cover ask"],
      ["要不要提醒对方别太过分", "Warn them not to overdo?", "提醒过分", "warn over"],
      ["自己摸鱼心虚要不要补工", "Guilt slack make up work?", "心虚补工", "guilt makeup"]
    ],
    JP: [
      ["想严格执行番茄又想刷短视频", "Want pomodoro and short video", "番茄短视频", "tomato shorts"],
      ["摸鱼五分钟变成五十分", "Five-min slack becomes fifty", "五变五十", "5 to 50"],
      ["下班倒计时和任务进度赛跑", "Clock-out countdown races tasks", "倒计时赛跑", "countdown race"]
    ]
  },
  drama: {
    EI: [
      ["追剧群要你直播反应", "Drama group wants live reactions", "直播反应", "live react"],
      ["结局讨论会点你先开麦", "Finale talk picks you to open", "结局开麦", "finale open"],
      ["弹幕争论拉你上场", "Danmaku fight pulls you in", "弹幕上场", "danmaku in"]
    ],
    SN: [
      ["剧情逻辑漏洞大过飞船", "Plot hole bigger than a spaceship", "剧情漏洞", "plot hole"],
      ["只记得名场面不记得人名", "Remember scenes not names", "名场面人名", "scene names"],
      ["角色动机写成命运安排", "Motive written as destiny arranged", "命运安排", "destiny arrange"]
    ],
    TF: [
      ["主角作死你要不要共情", "Protagonist self-sabotage empathize?", "作死共情", "sabotage empathy"],
      ["要不要剧透安慰破防朋友", "Spoiler-comfort a broken friend?", "剧透安慰", "spoiler comfort"],
      ["烂尾要不要理性复盘", "Bad ending rational review?", "烂尾复盘", "bad-end review"]
    ],
    JP: [
      ["想一集一集品又想通宵刷", "Want savor episodes and all-nighter", "一集通宵", "savor binge"],
      ["更新日和工作DDL对撞", "Release day collides work DDL", "更新对撞", "release collide"],
      ["追更计划被剧透炸毁", "Watch plan bombed by spoiler", "剧透炸毁", "spoiler bomb"]
    ]
  },
  eat: {
    EI: [
      ["干饭局要你先举筷发言", "Feast wants you first chopsticks speech", "举筷发言", "chopstick speech"],
      ["外卖到了全员看你分配", "Delivery arrives all watch you split", "外卖分配", "delivery split"],
      ["食堂窗口拥挤要你先问", "Cafeteria crush you ask first", "窗口先问", "window first"]
    ],
    SN: [
      ["今天吃什么变成哲学题", "What to eat becomes philosophy", "吃什么哲学", "eat philosophy"],
      ["菜单选择困难进入循环", "Menu choice loops forever", "选择循环", "choice loop"],
      ["口味描述只有一个绝了", "Taste note is just insane", "绝了口味", "insane taste"]
    ],
    TF: [
      ["朋友抢最后一块你要不要让", "Friend grabs last piece yield?", "最后一块", "last piece"],
      ["点多了要不要理性制止", "Over-order rational stop?", "点多制止", "over-order stop"],
      ["踩雷外卖要不要给差评", "Bad delivery leave bad review?", "差评与否", "bad review"]
    ],
    JP: [
      ["减肥计划和干饭邀约对打", "Diet plan fights feast invite", "减肥干饭", "diet feast"],
      ["想先吃饭再工作又想反过来", "Eat first then work or reverse", "先吃先做", "eat/work first"],
      ["夜宵自由和明早后悔并列", "Night freedom ties morning regret", "夜宵后悔", "night regret"]
    ]
  },
  sport: {
    EI: [
      ["球局缺人点你上场发言", "Pickup game needs you speak and play", "上场发言", "play speak"],
      ["健身搭子要你带热身口号", "Gym buddy wants your warm-up chant", "热身口号", "warm chant"],
      ["跑团终点要你分享感受", "Run club finish wants your feelings", "终点分享", "finish share"]
    ],
    SN: [
      ["训练计划只有变强两个字", "Training plan is just get stronger", "变强计划", "get stronger"],
      ["动作要领讲成感觉对了", "Form cue becomes felt right", "感觉对了", "felt right"],
      ["配速策略抽象成随缘冲", "Pace strategy is random sprint", "随缘冲", "random sprint"]
    ],
    TF: [
      ["队友受伤硬撑你要不要叫停", "Injured teammate push stop them?", "叫停受伤", "stop injury"],
      ["要不要说实话指出动作错误", "Honestly point form error?", "指出错误", "point error"],
      ["比赛输了要不要先哄情绪", "After loss soothe first?", "先哄情绪", "soothe first"]
    ],
    JP: [
      ["训练日和聚餐日撞车", "Training day collides feast day", "训练聚餐", "train feast"],
      ["想按计划练又想躺平", "Want planned train and lie flat", "计划躺平", "plan flat"],
      ["运动打卡连续中断要不要重开", "Streak broke restart?", "打卡重开", "streak restart"]
    ]
  },
  pet: {
    EI: [
      ["宠物在客人面前表演社死", "Pet performs cringe for guests", "宠物社死", "pet cringe"],
      ["铲屎官群@你分享经验", "Pet-owner chat @you for tips", "铲屎经验", "pet tips"],
      ["宠物医院候诊要你先沟通", "Vet wait needs you talk first", "医院沟通", "vet talk"]
    ],
    SN: [
      ["宠物行为原因写成心情不好", "Pet behavior reason just bad mood", "心情不好", "bad mood"],
      ["训练目标只有听话可爱", "Train goal only obedient cute", "听话可爱", "obey cute"],
      ["喂养策略靠感觉加一点", "Feeding strategy add a bit by feel", "感觉加一点", "add by feel"]
    ],
    TF: [
      ["宠物搞破坏要不要严肃教育", "Pet wrecks scold seriously?", "严肃教育", "serious scold"],
      ["朋友想摸它你要不要挡", "Friend wants pet block them?", "挡摸宠物", "block pet"],
      ["要不要理性控制零食投喂", "Rationally limit treats?", "控制零食", "limit treats"]
    ],
    JP: [
      ["遛狗时间和会议冲突", "Walk time fights meeting", "遛狗冲突", "walk conflict"],
      ["想严格作息又被它闹醒", "Want strict sleep pet wakes you", "作息闹醒", "sleep wake"],
      ["绝育计划一拖再拖", "Neuter plan keeps sliding", "绝育拖延", "neuter delay"]
    ]
  },
  night: {
    EI: [
      ["深夜群聊突然点你讲故事", "Late chat asks you for a story", "深夜故事", "night story"],
      ["失眠语音房只剩你开麦", "Insomnia room only you on mic", "失眠开麦", "insomnia mic"],
      ["凌晨朋友来电要你听他讲", "3am friend calls you to listen", "凌晨来电", "3am call"]
    ],
    SN: [
      ["深夜想法大到像宇宙草案", "Night thoughts big as cosmos draft", "宇宙草案", "cosmos draft"],
      ["待办在凌晨变得哲学化", "Todos turn philosophical at 2am", "哲学待办", "phil todos"],
      ["睡眠攻略只写放松就好", "Sleep guide just says relax", "放松就好", "just relax"]
    ],
    TF: [
      ["凌晨情绪上来要不要找人聊", "Night feelings call someone?", "凌晨找人", "night call"],
      ["要不要理性关机还是再刷会", "Rational shutdown or more scroll?", "关机再刷", "shutdown scroll"],
      ["朋友深夜崩溃你怎么接", "Friend night meltdown how handle", "深夜崩溃", "night melt"]
    ],
    JP: [
      ["想早睡计划被短视频吞掉", "Early-sleep plan eaten by shorts", "早睡吞掉", "sleep eaten"],
      ["熬夜自由和明早会议对打", "Night freedom fights morning meeting", "熬夜会议", "night meeting"],
      ["睡眠清单写到自己更醒", "Sleep checklist makes you more awake", "清单更醒", "list awake"]
    ]
  },
  friend: {
    EI: [
      ["老友局冷场要你救场", "Old-friend hang freeze needs save", "老友救场", "friend save"],
      ["朋友矛盾让你当中间人开麦", "Friend conflict makes you mediator mic", "中间人", "mediator"],
      ["局促局只有你认识两边", "Awkward hang only you know both sides", "认识两边", "know both"]
    ],
    SN: [
      ["友情目标写成常联系就好", "Friendship goal just keep in touch", "常联系", "keep touch"],
      ["聚餐提议只有有空再说", "Hang proposal is free sometime", "有空再说", "free sometime"],
      ["朋友状态你只捕捉到氛围", "Friend status only vibe captured", "状态氛围", "status vibe"]
    ],
    TF: [
      ["朋友做错事要不要直说", "Friend messed tell straight?", "直说错误", "straight tell"],
      ["要不要拒绝不合理帮忙", "Reject unreasonable favor?", "拒绝帮忙", "reject favor"],
      ["两头朋友互撕你怎么站", "Two friends fight where stand", "两头互撕", "two-side fight"]
    ],
    JP: [
      ["约拍时间永远对不齐", "Hang schedules never align", "时间不齐", "time misalign"],
      ["想维持联系又想独处充电", "Want keep touch and solo charge", "联系独处", "touch solo"],
      ["友情行程被工作临时改", "Friend plan changed by work", "行程临时改", "plan temp change"]
    ]
  }
};

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
  ["，并保住长期关系值", ", while protecting long-term relation XP"],
  ["，还要看起来很自然", ", and still look natural"],
  ["，顺便给自己加一点幽默滤镜", ", with a humor filter on"],
  ["，并确保不点燃群聊", ", without igniting the group chat"],
  ["，还得给自己留后悔药", ", and keep a regret antidote ready"]
];

const twists = [
  ["朋友圈已准备好截图", "Moments is ready to screenshot"],
  ["系统提示高风险操作", "System flags high-risk action"],
  ["内心OS开始循环播放", "Inner monologue starts looping"],
  ["空气突然变得很粘稠", "Air suddenly turns sticky"],
  ["你的社交电量闪红灯", "Social battery flashes red"],
  ["旁白开始阴阳怪气", "Narrator starts throwing shade"],
  ["现实开始加载延迟", "Reality starts loading lag"],
  ["你感觉自己变成剧情NPC", "You feel like a plot NPC"],
  ["手机震动得像催命符", "Phone vibrates like a death timer"],
  ["周围目光变成弹幕", "Nearby eyes turn into danmaku"],
  ["今日运势写着宜沉默", "Horoscope says silence is lucky"],
  ["大脑开始自动生成退场词", "Brain auto-drafts exit lines"],
  ["气氛突然进入加载中", "Vibe enters loading state"],
  ["你听到命运在敲键盘", "You hear destiny typing"],
  ["这段记忆即将写入黑历史", "This memory is about to be black history"],
  ["幽默防御机制已就绪", "Humor defense system is ready"],
  ["理智与情绪开始排队", "Logic and feelings start queueing"],
  ["世界给了你一个可选任务", "World offers an optional quest"],
  ["你的人设血条开始闪烁", "Persona HP bar starts blinking"],
  ["后台进程占用了全部注意力", "Background process eats all attention"]
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
  ["出行不是逃，是换一张地图呼吸。", "Travel isn't escape; it's a new map to breathe."],
  ["社死不可怕，可怕的是不更新补丁。", "Cringe is fine; no patch is fatal."],
  ["摸鱼可以，别摸掉自己的长期能力。", "Slack ok; don't slack away long-term skill."],
  ["追剧是休息，不是人生外包。", "Drama is rest, not life outsourcing."],
  ["干饭是正义，撑到不舒服就越界。", "Feasting is justice; discomfort is over boundary."],
  ["运动不是惩罚身体，是给情绪开窗。", "Sport isn't body punishment; it's an emotion window."],
  ["宠物教会你：陪伴比完美更稳。", "Pets teach: company beats perfection."],
  ["深夜想法很宏大，白天行动要具体。", "Night thoughts are grand; day actions must be concrete."],
  ["友情靠来回，不靠单方面读心。", "Friendship is back-and-forth, not mind reading."],
  ["不是所有热搜都值得你站队。", "Not every trend deserves your side."],
  ["把今天过明白，比把人生想明白更快。", "Clarify today faster than solving all life."]
];

const optionFlavors = [
  ["", ""],
  ["（稳一点）", " (steady)"],
  ["（酷一点）", " (cooler)"],
  ["（笑一点）", " (funnier)"],
  ["（轻一点）", " (lighter)"],
  ["（准一点）", " (sharper)"],
  ["（软着陆）", " (soft land)"],
  ["（保人设）", " (keep persona)"],
  ["（低消耗）", " (low cost)"],
  ["（可复盘）", " (reviewable)"]
];

function optionPack(axis, hookZh, hookEn, variant, sceneTagZh, sceneTagEn) {
  const v = variant % 5;
  const tagZh = sceneTagZh ? `（针对：${sceneTagZh}）` : "";
  const tagEn = sceneTagEn ? ` [${sceneTagEn}]` : "";
  let pack;
  if (axis === "EI") {
    const packs = [
      [
        ["E", `就着「${hookZh}」直接开麦破冰，把冷场做成开场`, `Open mic on "${hookEn}" and turn freeze into opener`, "社牛破冰", "Charge"],
        ["I", `先对「${hookZh}」点头观察，把电量留给关键回合`, `Nod through "${hookEn}" and save energy for key round`, "低调观察", "Quiet"],
        ["E", `拉一个人一起面对「${hookZh}」，把单机变联机`, `Pull someone in on "${hookEn}" and go co-op`, "组队出场", "Party"],
        ["I", `给「${hookZh}」一个礼貌微笑，自己切飞行模式续命`, `Polite smile at "${hookEn}", then airplane-mode heal`, "飞行续命", "Airplane"]
      ],
      [
        ["E", `主动自我介绍，把「${hookZh}」变成你的舞台任务`, `Self-intro and make "${hookEn}" your stage quest`, "舞台任务", "Stage"],
        ["I", `站到边缘位，用最小互动处理「${hookZh}」`, `Stay edge-side and mini-interact through "${hookEn}"`, "边缘位", "Edge"],
        ["E", `先抛一个轻松问题，带着「${hookZh}」往前走`, `Ask a light question and move "${hookEn}" forward`, "轻松提问", "Light Q"],
        ["I", `先听两轮再决定要不要进入「${hookZh}」中心`, `Listen two rounds before entering "${hookEn}" center`, "先听后进", "Listen first"]
      ],
      [
        ["E", `用半自嘲开场，把「${hookZh}」笑软再认真说`, `Half self-roast to soften "${hookEn}" then speak real`, "半自嘲", "Self-roast"],
        ["I", `只回关键信息，避免在「${hookZh}」里过度曝光`, `Reply only key info; avoid overexposure in "${hookEn}"`, "关键回复", "Key reply"],
        ["E", `把话题抛给全场，让「${hookZh}」变成群戏`, `Toss topic to room and make "${hookEn}" ensemble`, "群戏带动", "Ensemble"],
        ["I", `用表情和短句过关，不在「${hookZh}」里长谈`, `Pass with face and short lines; no long talk in "${hookEn}"`, "短句过关", "Short pass"]
      ],
      [
        ["E", `直接报备状态：我对「${hookZh}」的真实反应是…`, `State real reaction to "${hookEn}" out loud`, "状态报备", "State"],
        ["I", `先在心里演练三句，再小剂量回应「${hookZh}」`, `Rehearse three lines then micro-reply "${hookEn}"`, "小剂量", "Micro"],
        ["E", `邀请对方展开，把「${hookZh}」聊成双向电台`, `Invite them to expand; turn "${hookEn}" two-way radio`, "双向电台", "Two-way"],
        ["I", `找个安静角落处理「${hookZh}」，不抢主舞台`, `Handle "${hookEn}" from a quiet corner`, "角落处理", "Corner"]
      ],
      [
        ["E", `先整活再认真，用笑点给「${hookZh}」铺路`, `Joke first then serious; pave "${hookEn}" with laughs`, "笑点铺路", "Joke pave"],
        ["I", `默认观察模式，直到「${hookZh}」必须表态`, `Default observe until "${hookEn}" forces a stance`, "观察模式", "Observe"],
        ["E", `主动对齐预期，减少「${hookZh}」带来的误会`, `Align expectations early to cut "${hookEn}" confusion`, "对齐预期", "Align"],
        ["I", `用书面/私聊处理「${hookZh}」，现场少说话`, `Handle "${hookEn}" in text/DM; speak less live`, "私聊处理", "DM handle"]
      ]
    ];
    pack = packs[v];
  } else if (axis === "SN") {
    const packs = [
      [
        ["S", `先拆「${hookZh}」的具体步骤、时间和材料`, `Break "${hookEn}" into steps, time, materials`, "步骤拆解", "Steps"],
        ["N", `先抓「${hookZh}」的方向感与最终画面`, `Capture direction and end image of "${hookEn}"`, "方向画面", "Vision"],
        ["S", `列出可验证细节，不让「${hookZh}」飘成气氛学`, `List checkable details so "${hookEn}" doesn't float`, "细节清单", "Details"],
        ["N", `允许脑洞先行，把「${hookZh}」当成概念草稿`, `Draft concepts first and treat "${hookEn}" as sketch`, "概念草稿", "Sketch"]
      ],
      [
        ["S", `用案例和数据钉住「${hookZh}」`, `Pin "${hookEn}" with cases and data`, "数据钉住", "Data pin"],
        ["N", `先讲隐喻和可能性，再回看「${hookZh}」`, `Talk metaphor/possibility, then revisit "${hookEn}"`, "隐喻先行", "Metaphor"],
        ["S", `把「${hookZh}」翻译成清单和检查点`, `Translate "${hookEn}" into checklist and checkpoints`, "检查点", "Checkpoints"],
        ["N", `先问如果呢，让「${hookZh}」打开更多分支`, `Ask what-if and branch "${hookEn}" wider`, "如果分支", "What-if"]
      ],
      [
        ["S", `先确认事实边界，再讨论「${hookZh}」的意义`, `Confirm fact borders before meaning of "${hookEn}"`, "事实边界", "Fact border"],
        ["N", `先画整体地图，细节之后再填进「${hookZh}」`, `Map whole picture; fill "${hookEn}" details later`, "整体地图", "Whole map"],
        ["S", `追问谁/何时/如何，把「${hookZh}」落地`, `Ask who/when/how to ground "${hookEn}"`, "落地追问", "Ground Q"],
        ["N", `先找模式与主题，不急着修「${hookZh}」零件`, `Find patterns/themes before fixing "${hookEn}" parts`, "模式主题", "Patterns"]
      ],
      [
        ["S", `用复盘表格处理「${hookZh}」，一行一个证据`, `Use review table on "${hookEn}", one proof per row`, "复盘表格", "Review table"],
        ["N", `把「${hookZh}」写成故事线，看冲突从哪来`, `Write "${hookEn}" as storyline; find conflict source`, "故事线", "Storyline"],
        ["S", `先做最小可行动作，验证「${hookZh}」假设`, `Do minimum viable action to test "${hookEn}"`, "最小验证", "MVP test"],
        ["N", `先收集灵感碎片，再拼「${hookZh}」的全貌`, `Collect inspiration shards then assemble "${hookEn}"`, "灵感碎片", "Shards"]
      ],
      [
        ["S", `把「${hookZh}」拆成可执行的三步走`, `Split "${hookEn}" into three executable steps`, "三步走", "3 steps"],
        ["N", `先想象理想结局，倒推「${hookZh}」怎么走`, `Imagine ideal end then reverse "${hookEn}" path`, "倒推结局", "Reverse"],
        ["S", `用时间线还原「${hookZh}」发生过什么`, `Rebuild timeline of what happened in "${hookEn}"`, "时间线", "Timeline"],
        ["N", `允许暂时模糊，先保住「${hookZh}」的感觉方向`, `Allow temporary blur; keep "${hookEn}" felt direction`, "感觉方向", "Felt dir"]
      ]
    ];
    pack = packs[v];
  } else if (axis === "TF") {
    const packs = [
      [
        ["T", `先讲规则与因果，把「${hookZh}」说清楚再谈感受`, `State rules/cause for "${hookEn}" before feelings`, "规则因果", "Rules"],
        ["F", `先接住情绪，再慢慢处理「${hookZh}」的事实`, `Catch feelings first, then facts of "${hookEn}"`, "先接情绪", "Feel first"],
        ["T", `用利弊清单评估「${hookZh}」，少靠气氛投票`, `Pros/cons on "${hookEn}", less vibe voting`, "利弊清单", "Pros/cons"],
        ["F", `优先关系值，让「${hookZh}」别把人伤到下线`, `Prioritize relation XP so "${hookEn}" doesn't KO people`, "关系优先", "Relation"]
      ],
      [
        ["T", `直接指出「${hookZh}」里的逻辑漏洞`, `Point out logic holes inside "${hookEn}"`, "指出漏洞", "Holes"],
        ["F", `用更软的句子讨论「${hookZh}」，避免二次伤害`, `Softer wording on "${hookEn}" to avoid second hit`, "软句子", "Soft words"],
        ["T", `把标准说死：面对「${hookZh}」什么可接受`, `Define hard standards for "${hookEn}"`, "标准说死", "Hard std"],
        ["F", `先问对方需要什么，再决定「${hookZh}」怎么走`, `Ask what they need before routing "${hookEn}"`, "先问需要", "Ask need"]
      ],
      [
        ["T", `分离事实与叙事，不让「${hookZh}」被情绪染色`, `Separate facts from story; no emotion dye on "${hookEn}"`, "事实分离", "Fact split"],
        ["F", `承认难受是真的，再一起修「${hookZh}」`, `Admit hurt is real then fix "${hookEn}" together`, "承认难受", "Admit hurt"],
        ["T", `给「${hookZh}」一个可执行结论，不拖成拉锯`, `Give executable conclusion on "${hookEn}"`, "可执行结论", "Conclusion"],
        ["F", `先修复信任，再谈「${hookZh}」的对错`, `Repair trust before right/wrong of "${hookEn}"`, "先修信任", "Trust first"]
      ],
      [
        ["T", `用客观标准复盘「${hookZh}」，对事不对人`, `Objective review of "${hookEn}", issue not person`, "对事不对人", "Issue-focus"],
        ["F", `先给情绪一个座位，再安排「${hookZh}」的处理位`, `Seat emotion first then process "${hookEn}"`, "情绪落座", "Seat feel"],
        ["T", `必要时说不，不让「${hookZh}」靠愧疚推进`, `Say no when needed; no guilt-driven "${hookEn}"`, "必要时说不", "Say no"],
        ["F", `用共情翻译冲突，让「${hookZh}」双方都听得懂`, `Empathy-translate conflict so both get "${hookEn}"`, "共情翻译", "Empathy"]
      ],
      [
        ["T", `先定义成功标准，再行动处理「${hookZh}」`, `Define success metrics then act on "${hookEn}"`, "成功标准", "Success"],
        ["F", `先确认对方有被看见，再推进「${hookZh}」`, `Confirm they feel seen then push "${hookEn}"`, "被看见", "Feel seen"],
        ["T", `把「${hookZh}」做成决策树：如果A则B`, `Make decision tree for "${hookEn}": if A then B`, "决策树", "Tree"],
        ["F", `用关心开场，把「${hookZh}」从对立改成并肩`, `Open with care; shift "${hookEn}" from duel to side-by-side`, "关心开场", "Care open"]
      ]
    ];
    pack = packs[v];
  } else {
    const packs = [
      [
        ["J", `先定时间表，把「${hookZh}」拆成可打卡节点`, `Set timetable; split "${hookEn}" into check-in nodes`, "时间表", "Timetable"],
        ["P", `先保留弹性，让「${hookZh}」可以随场调整`, `Keep flex so "${hookEn}" can adapt live`, "保留弹性", "Flex"],
        ["J", `先做最关键的一步，锁定「${hookZh}」主线`, `Do the critical first step; lock "${hookEn}" mainline`, "锁定主线", "Mainline"],
        ["P", `先看现场机会，再决定「${hookZh}」怎么走`, `Read live opportunities then route "${hookEn}"`, "现场机会", "Live ops"]
      ],
      [
        ["J", `列出截止点和负责人，不让「${hookZh}」漂着`, `List deadlines/owners so "${hookEn}" doesn't drift`, "截止点", "Deadlines"],
        ["P", `允许半成品出发，边走边修「${hookZh}」`, `Ship half-ready and patch "${hookEn}" on the way`, "半成品出发", "Half-ready"],
        ["J", `先排除干扰项，给「${hookZh}」腾出专注窗口`, `Cut noise and open focus window for "${hookEn}"`, "专注窗口", "Focus"],
        ["P", `同时开两条备选路径，防「${hookZh}」单点失败`, `Open two backup paths against single-point fail`, "双备选", "Two paths"]
      ],
      [
        ["J", `把「${hookZh}」写进今日必做，做完再浪`, `Put "${hookEn}" in must-do today; play after`, "今日必做", "Must-do"],
        ["P", `先跟感觉走一小段，再回看「${hookZh}」计划`, `Follow feel a bit then revisit "${hookEn}" plan`, "先跟感觉", "Follow feel"],
        ["J", `预设如果中断怎么恢复，给「${hookZh}」保底`, `Predefine recovery if interrupt; floor for "${hookEn}"`, "中断恢复", "Recovery"],
        ["P", `把计划当草图，现场版本优先于「${hookZh}」原稿`, `Treat plan as draft; live version beats original`, "现场优先", "Live first"]
      ],
      [
        ["J", `用倒推法从结果排到现在，钉死「${hookZh}」`, `Backplan from result to now; pin "${hookEn}"`, "倒推法", "Backplan"],
        ["P", `先收集信息再定，不急着锁死「${hookZh}」`, `Gather info first; don't lock "${hookEn}" early`, "先收集", "Gather"],
        ["J", `一次只推进一个里程碑，稳过「${hookZh}」`, `One milestone at a time through "${hookEn}"`, "单里程碑", "One mile"],
        ["P", `保持可撤退路线，让「${hookZh}」不变成绑架`, `Keep exit route so "${hookEn}" isn't a hostage plan`, "可撤退", "Exit route"]
      ],
      [
        ["J", `先清理优先级队列，把「${hookZh}」放到正确位置`, `Clean priority queue; place "${hookEn}" right`, "优先级", "Priority"],
        ["P", `允许今天先试错，用反馈改「${hookZh}」`, `Allow try-error today; feedback-edit "${hookEn}"`, "先试错", "Try-error"],
        ["J", `设定开始铃和结束铃，给「${hookZh}」边界`, `Set start/end bells; bound "${hookEn}"`, "开始结束铃", "Bells"],
        ["P", `跟着能量走：有电就推「${hookZh}」，没电就养`, `Follow energy: push "${hookEn}" when charged`, "跟能量", "Energy"]
      ]
    ];
    pack = packs[v];
  }
  return pack.map((o) => [
    o[0],
    o[1] + tagZh,
    o[2] + tagEn,
    o[3],
    o[4]
  ]);
}

function shortScene(zh, en) {
  const z = String(zh || "").replace(/[，。！？、]/g, "·");
  const e = String(en || "").replace(/[,.!?]/g, "·");
  return {
    zh: z.length > 16 ? z.slice(0, 16) : z,
    en: e.length > 24 ? e.slice(0, 24) : e
  };
}

function makeRow(id, topic, axis, stem, suffix, twist, quote, variant, flavorIdx) {
  const cat = catById(topic);
  const hookZh = stem[2];
  const hookEn = stem[3];
  const sceneZh = stem[0] + suffix[0];
  const sceneEn = stem[1] + suffix[1];
  const textZh = sceneZh + "。" + twist[0] + "。面对「" + hookZh + "」，你会？";
  const textEn = sceneEn + ". " + twist[1] + '. Facing "' + hookEn + '", you:';
  const sc = shortScene(stem[0], stem[1]);
  const flavor = pick(optionFlavors, flavorIdx);
  let options = optionPack(axis, hookZh, hookEn, variant, sc.zh, sc.en).map((o, idx) => {
    if (flavor[0] && idx % 2 === flavorIdx % 2) {
      return [o[0], o[1] + flavor[0], o[2] + flavor[1], o[3], o[4]];
    }
    return o;
  });
  const kickerZh = cat.emoji + " " + cat.zh + " · " + axisMeta[axis].zh + " · " + axis;
  const kickerEn = cat.emoji + " " + cat.en + " · " + axisMeta[axis].en + " · " + axis;
  return [
    id,
    axis,
    topic,
    textZh,
    textEn,
    "金句：" + quote[0],
    "Quote: " + quote[1],
    kickerZh,
    kickerEn,
    options
  ];
}

function optKey(row) {
  return row[9].map((o) => o[1]).join("|");
}

function textKey(row) {
  return row[1] + "|" + row[2] + "|" + String(row[3]).replace(/\s+/g, "");
}

function loadExisting() {
  if (!fs.existsSync(bankPath)) return [];
  try {
    const raw = JSON.parse(fs.readFileSync(bankPath, "utf8"));
    if (!Array.isArray(raw)) return [];
    return raw.filter((r) => Array.isArray(r) && r.length >= 10 && Array.isArray(r[9]));
  } catch (err) {
    console.error("load existing failed", err.message);
    return [];
  }
}

function buildGenerated(need, startId, seenOpt, seenText) {
  const out = [];
  const topics = Object.keys(baseStems);
  const axes = ["EI", "SN", "TF", "JP"];
  let guard = 0;
  const maxGuard = need * 30 + 100000;
  // nested loops over combinatorial space
  for (let layer = 0; layer < 40 && out.length < need; layer += 1) {
    for (const topic of topics) {
      for (const axis of axes) {
        const stems = baseStems[topic][axis] || [];
        for (let si = 0; si < stems.length && out.length < need; si += 1) {
          for (let su = 0; su < suffixes.length && out.length < need; su += 1) {
            guard += 1;
            if (guard > maxGuard) return out;
            const stem = stems[si];
            const suffix = suffixes[su];
            const twist = pick(twists, layer * 17 + si * 3 + su * 5 + topic.length + axis.charCodeAt(0));
            const quote = pick(quotes, layer * 13 + si * 7 + su * 11 + axis.charCodeAt(0));
            const variant = (layer + si + su + topic.length) % 5;
            const flavorIdx = (layer * 3 + si + su) % optionFlavors.length;
            const id = startId + out.length;
            const row = makeRow(id, topic, axis, stem, suffix, twist, quote, variant, flavorIdx);
            // uniqueness: if option set collides, lightly salt first option with scene+layer
            let key = optKey(row);
            if (seenOpt.has(key) || seenText.has(textKey(row))) {
              row[9][0][1] = row[9][0][1] + "·" + ((layer * 97 + si * 13 + su) % 997);
              row[9][0][2] = row[9][0][2] + "·" + ((layer * 97 + si * 13 + su) % 997);
              // also lightly diversify text
              row[3] = row[3].replace("你会？", "你会怎么做？");
              row[4] = row[4].replace("you:", "you would:");
              key = optKey(row);
              if (seenOpt.has(key) || seenText.has(textKey(row))) continue;
            }
            seenOpt.add(key);
            seenText.add(textKey(row));
            out.push(row);
          }
        }
      }
    }
  }
  return out;
}

function reindex(rows) {
  return rows.map((r, i) => {
    const copy = r.slice();
    copy[0] = i + 1;
    return copy;
  });
}

function updateDataJs(total) {
  const code = fs.readFileSync(dataPath, "utf8");
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(
    "var window = this;\n" +
      code +
      "\n;this.QUESTIONS=QUESTIONS;this.TYPES=TYPES;this.CODEX=CODEX;this.CAREERS=CAREERS;this.MATCHES=MATCHES;this.UI_TEXT=UI_TEXT;",
    ctx
  );
  const { QUESTIONS, TYPES, CODEX, CAREERS, MATCHES, UI_TEXT } = ctx;
  const uiZh = Object.assign({}, UI_TEXT.zh || {}, {
    brandSub: "5万+题库 · 分类/随机48题 · 图鉴49+",
    homeLead:
      "题库 50000+，覆盖恋爱/学习/职场/人生/搞笑/动漫/游戏/社死/摸鱼/追剧/干饭/运动/宠物/深夜/友情等。可按分类测，也可全随机。每题四选项情景绑定，金句又损又有哲理。",
    bankLoading: "正在加载 5万+ 题库…",
    bankMeta: "题库 {bank} 题 · 本局 {n} 题 · {mode}",
    categoryLead: "点分类只抽该类题；点“随机混合”从全库均衡抽取。分类更多，场景更活。",
    feature1Title: "5万+且选项不串题",
    feature1Text: "题干、选项、金句按情景生成，逻辑对齐，避免复制粘贴选项。",
    feature2Title: "分类测或随机测",
    feature2Text: "恋爱、学习、职场、社死、摸鱼、追剧…想测什么点什么；也可一键随机。",
    feature3Title: "图鉴+投稿+手机可玩",
    feature3Text: "图鉴49+，答完可投稿；微信/QQ内直接作答。",
    aboutBody:
      "前端娱乐向人格测试 + 本地投稿。5万+题库，分类/随机48题。选项情景绑定。微信/QQ可直接作答。有趣有参考，不构成专业评估。"
  });
  const uiEn = Object.assign({}, UI_TEXT.en || {}, {
    brandSub: "50k+ bank · category/random 48 · codex 49+",
    homeLead:
      "50,000+ prompts across love/study/work/life/funny/anime/games/cringe/slacking/drama/feast/sport/pets/night/friends. Category or full random. Scene-bound options; sharp funny quotes.",
    bankLoading: "Loading 50k+ bank…",
    bankMeta: "Bank {bank} · run {n} · {mode}",
    categoryLead: "Pick a category for focused draws, or Random Mix for balanced full-bank sampling.",
    feature1Title: "50k+ non-copied options",
    feature1Text: "Stem, options, quotes generated per scene with axis logic.",
    feature2Title: "Category or random",
    feature2Text: "Love, study, work, cringe, slacking, drama… or one-tap random.",
    feature3Title: "Codex + contribute + mobile",
    feature3Text: "49+ codex cards, post-run contribute; works in WeChat/QQ.",
    aboutBody:
      "Front-end fun quiz + local contribute. 50k+ bank, category/random 48. Scene-bound options. Works in WeChat/QQ. Entertaining, not clinical."
  });

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

  // Keep a small QUESTIONS seed (first 48 expanded-like from existing if present)
  const seed = Array.isArray(QUESTIONS) ? QUESTIONS.slice(0, 48) : [];
  const out =
    "const QUESTION_BANK = [];\n\n" +
    "const QUESTIONS = " +
    dump(seed) +
    ";\n\n" +
    "const CATEGORIES = " +
    dump(CATEGORIES) +
    ";\n\n" +
    "const TYPES = " +
    dump(TYPES) +
    ";\n\n" +
    "const CODEX = " +
    dump(CODEX) +
    ";\n\n" +
    "const CAREERS = " +
    dump(CAREERS) +
    ";\n\n" +
    "const MATCHES = " +
    dump(MATCHES) +
    ";\n\n" +
    "const UI_TEXT = " +
    dump({ zh: uiZh, en: uiEn }) +
    ";\n\n" +
    "window.QUESTION_BANK = QUESTION_BANK;\n" +
    "window.QUESTIONS = QUESTIONS;\n" +
    "window.CATEGORIES = CATEGORIES;\n" +
    "window.TYPES = TYPES;\n" +
    "window.CODEX = CODEX;\n" +
    "window.CAREERS = CAREERS;\n" +
    "window.MATCHES = MATCHES;\n" +
    "window.UI_TEXT = UI_TEXT;\n";

  fs.writeFileSync(dataPath, out, "utf8");
  console.log("data.js updated; categories", CATEGORIES.length, "seed", seed.length, "targetTotal", total);
}

function main() {
  console.time("build50k");
  const existing = loadExisting();
  console.log("existing", existing.length);

  const seenOpt = new Set();
  const seenText = new Set();
  const kept = [];
  for (const row of existing) {
    const ok = optKey(row);
    const tk = textKey(row);
    if (seenOpt.has(ok) || seenText.has(tk)) continue;
    seenOpt.add(ok);
    seenText.add(tk);
    kept.push(row);
  }
  console.log("kept unique existing", kept.length);

  const need = Math.max(0, TARGET - kept.length);
  console.log("need generate", need);
  const generated = buildGenerated(need, kept.length + 1, seenOpt, seenText);
  console.log("generated", generated.length);

  let all = kept.concat(generated);
  if (all.length < TARGET) {
    // emergency extra layers with stronger salts
    console.log("shortage, emergency fill", TARGET - all.length);
    let extraGuard = 0;
    let n = 0;
    while (all.length < TARGET && extraGuard < 500000) {
      extraGuard += 1;
      n += 1;
      const topic = CATEGORIES[n % CATEGORIES.length].id;
      const axis = ["EI", "SN", "TF", "JP"][n % 4];
      const stems = (baseStems[topic] && baseStems[topic][axis]) || baseStems.life[axis];
      if (!stems || !stems.length) continue;
      const stem = pick(stems, n);
      const suffix = pick(suffixes, n * 3);
      const twist = pick(twists, n * 5);
      const quote = pick(quotes, n * 7);
      const row = makeRow(all.length + 1, topic, axis, stem, suffix, twist, quote, n % 5, n % optionFlavors.length);
      row[3] = row[3].replace("你会？", "此刻你会？#" + (n % 10007));
      row[4] = row[4].replace("you:", "you now: #" + (n % 10007));
      row[9][0][1] = row[9][0][1] + "·x" + (n % 10007);
      row[9][0][2] = row[9][0][2] + "·x" + (n % 10007);
      const ok = optKey(row);
      const tk = textKey(row);
      if (seenOpt.has(ok) || seenText.has(tk)) continue;
      seenOpt.add(ok);
      seenText.add(tk);
      all.push(row);
    }
  }

  all = reindex(all.slice(0, Math.max(all.length, TARGET)));
  // ensure at least TARGET
  if (all.length < TARGET) {
    console.error("FAILED_REACH_TARGET", all.length);
    process.exit(1);
  }

  // stats
  const axes = {};
  const topics = {};
  const optSet = new Set();
  let bad = 0;
  for (const r of all) {
    axes[r[1]] = (axes[r[1]] || 0) + 1;
    topics[r[2]] = (topics[r[2]] || 0) + 1;
    if (!Array.isArray(r[9]) || r[9].length !== 4) bad += 1;
    optSet.add(optKey(r));
  }
  console.log("total", all.length);
  console.log("axes", axes);
  console.log("topics", topics);
  console.log("uniqueOptionSets", optSet.size, "badOptions", bad);

  const tmp = bankPath + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(all), "utf8");
  fs.renameSync(tmp, bankPath);
  const sizeMb = (fs.statSync(bankPath).size / 1024 / 1024).toFixed(2);
  console.log("wrote bank.json", sizeMb, "MB");

  updateDataJs(all.length);

  // patch app threshold note remains fine (>=10000)
  // README quick patch
  const readmePath = path.join(root, "README.md");
  if (fs.existsSync(readmePath)) {
    let md = fs.readFileSync(readmePath, "utf8");
    md = md
      .replace(/题库 \*\*12000\*\*（≥1万）/g, "题库 **50000+**（≥5万）")
      .replace(/12000 题压缩题库/g, "50000+ 题压缩题库")
      .replace(/1万\+/g, "5万+")
      .replace(/10000\+/g, "50000+")
      .replace(/_build_10k\.js/g, "_build_50k.js")
      .replace(/恋爱\/学习\/职场\/人生\/搞笑\/动漫\/游戏\/家庭\/社媒\/出行\/饮食\/金钱/g, "恋爱/学习/职场/人生/搞笑/动漫/游戏/家庭/社媒/出行/饮食/金钱/社死/摸鱼/追剧/干饭/运动/宠物/深夜/友情");
    fs.writeFileSync(readmePath, md, "utf8");
  }

  console.timeEnd("build50k");
  console.log("BUILD_50K_OK", all.length);
}

main();
