/**
 * Generate a large bilingual funny question bank and merge into data.js
 * Keeps TYPES / CAREERS / MATCHES / UI_TEXT, replaces QUESTIONS with a sample
 * and writes QUESTION_BANK (1000+).
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
    "\n;this.QUESTIONS=QUESTIONS;this.TYPES=TYPES;this.CAREERS=CAREERS;this.MATCHES=MATCHES;this.UI_TEXT=UI_TEXT;",
  ctx
);

const { TYPES, CAREERS, MATCHES, UI_TEXT } = ctx;

const situations = [
  { zh: "电梯里只剩你和老板，空气开始发霉", en: "Just you and the boss in an elevator; the air is rotting", tags: ["work", "social"], cat: { zh: "电梯社死", en: "Elevator Cringe" } },
  { zh: "团建突然点名让你自我介绍三十秒", en: "Team-building suddenly demands a 30-second intro", tags: ["work", "social"], cat: { zh: "团建破冰", en: "Team Icebreaker" } },
  { zh: "朋友局只认识主人，其他人全是 NPC", en: "You only know the host; everyone else is an NPC", tags: ["social"], cat: { zh: "社交电池", en: "Social Battery" } },
  { zh: "语音会议冷场五秒，所有人都在等“那个谁”", en: "Five seconds of call silence; everyone waits for “someone”", tags: ["work", "digital"], cat: { zh: "会议黑洞", en: "Meeting Black Hole" } },
  { zh: "饭局上突然被要求讲个笑话", en: "Dinner table suddenly demands a joke from you", tags: ["social"], cat: { zh: "餐厅点菜战", en: "Menu War" } },
  { zh: "新同事第一天，茶水间撞见全组人", en: "Day one, you bump into the whole team in the pantry", tags: ["work", "social"], cat: { zh: "面试表演赛", en: "Interview Show" } },
  { zh: "KTV 大家把麦塞给你", en: "At KTV, they shove the mic at you", tags: ["social"], cat: { zh: "KTV麦霸", en: "KTV Mic Boss" } },
  { zh: "邻居在电梯里开始热情搭话", en: "A neighbor starts chatting warmly in the elevator", tags: ["life", "social"], cat: { zh: "雨天社死", en: "Rain Cringe" } },
  { zh: "聚会有人提议“每个人说一个秘密”", en: "Someone proposes “everyone share a secret”", tags: ["social"], cat: { zh: "八卦雷达", en: "Gossip Radar" } },
  { zh: "微信群突然 @ 全体，要你今晚线上露脸", en: "Group chat @all wants your face on camera tonight", tags: ["digital", "social"], cat: { zh: "群聊政治", en: "Groupchat Politics" } },
  { zh: "领导说“随便做个大概就行”", en: "Boss says “just rough it out”", tags: ["work"], cat: { zh: "DDL神学", en: "Deadline Theology" } },
  { zh: "旅行攻略只有一句话：去有感觉的地方", en: "Travel plan is one line: go where it feels right", tags: ["travel"], cat: { zh: "旅行突发", en: "Travel Chaos" } },
  { zh: "组装家具说明书像天书", en: "Furniture manual looks like ancient runes", tags: ["home", "life"], cat: { zh: "室友生存赛", en: "Roommate Survival" } },
  { zh: "产品需求只有“要有感觉、高级、好用”", en: "Product brief is “make it feel premium and usable”", tags: ["work"], cat: { zh: "AI打工", en: "AI Sidekick" } },
  { zh: "朋友说“那家店氛围绝了”", en: "A friend says “that place has insane vibes”", tags: ["social", "food"], cat: { zh: "外卖命运", en: "Delivery Destiny" } },
  { zh: "你负责布置活动现场，预算模糊", en: "You must decorate an event with a fuzzy budget", tags: ["work", "social"], cat: { zh: "婚礼座位表", en: "Wedding Seating Chart" } },
  { zh: "地图软件显示三条差不多的路", en: "Maps shows three almost-equal routes", tags: ["travel"], cat: { zh: "通勤副本", en: "Commute Dungeon" } },
  { zh: "写作只给主题：成长", en: "Writing prompt is just “growth”", tags: ["school", "work"], cat: { zh: "考试周", en: "Exam Week" } },
  { zh: "新手机功能多到眼花", en: "New phone features are overwhelming", tags: ["digital"], cat: { zh: "网购深夜局", en: "Midnight Shopping" } },
  { zh: "做菜只说“适量盐”", en: "Recipe says “salt to taste”", tags: ["food", "home"], cat: { zh: "食堂选择困难", en: "Cafeteria Paralysis" } },
  { zh: "朋友失恋哭成表情包，边哭边问你怎么办", en: "A friend is crying-meme level and asks what to do", tags: ["love", "social"], cat: { zh: "恋爱修罗场", en: "Romance Arena" } },
  { zh: "团队里有人明显摸鱼拖进度", en: "Someone is clearly slacking and delaying the team", tags: ["work"], cat: { zh: "同事甩锅", en: "Blame Volleyball" } },
  { zh: "家人送了你完全用不上的礼物", en: "Family gifts you something useless", tags: ["family"], cat: { zh: "家庭聚餐", en: "Family Feast" } },
  { zh: "争论时对方开始讲“你就是不在乎我”", en: "During an argument they say “you just don’t care”", tags: ["love"], cat: { zh: "表白未遂", en: "Confession Attempt" } },
  { zh: "复盘会变成情绪批斗会", en: "A postmortem turns into emotional combat", tags: ["work"], cat: { zh: "项目复盘会", en: "Postmortem Meeting" } },
  { zh: "宠物把沙发当跑酷现场，账单也起飞", en: "Your pet turns the sofa into parkour and the bill takes off", tags: ["home", "money"], cat: { zh: "宠物医院账单", en: "Vet Bill Shock" } },
  { zh: "相亲开场三分钟，空气像过期奶茶", en: "Three minutes into a blind date, the air tastes like expired milk tea", tags: ["love"], cat: { zh: "相亲开场", en: "Blind Date Opener" } },
  { zh: "快递显示签收，门口却空空如也", en: "Parcel says delivered, doorstep is empty", tags: ["life"], cat: { zh: "快递失踪案", en: "Parcel Mystery" } },
  { zh: "闹钟响了，外面天气很好，但床引力满分", en: "Alarm rings, weather is perfect, bed gravity is maxed", tags: ["life"], cat: { zh: "夜猫子哲学", en: "Night Owl Philosophy" } },
  { zh: "房间乱成抽象画，客人还有一小时到", en: "Room is abstract art; guests arrive in one hour", tags: ["home", "social"], cat: { zh: "周末计划破产", en: "Weekend Bankruptcy" } },
  { zh: "邮件写到一半，又冒出五个新任务", en: "Mid-email, five new tasks appear", tags: ["work"], cat: { zh: "老板突然@你", en: "Boss @You" } },
  { zh: "假期只剩两天，愿望清单还很长", en: "Two vacation days left; wish list still long", tags: ["life", "travel"], cat: { zh: "机票改签", en: "Flight Change" } },
  { zh: "Wi-Fi 突然消失，家里进入原始社会", en: "Wi-Fi vanishes and home becomes prehistoric", tags: ["digital", "home"], cat: { zh: "Wi-Fi消失术", en: "Wi-Fi Vanishing Act" } },
  { zh: "深夜刷短视频，下一秒天亮了", en: "Doomscrolling shorts; next second it’s dawn", tags: ["digital"], cat: { zh: "深夜刷短视频", en: "Doomscroll Midnight" } },
  { zh: "健身房私教说“就差一点感觉”", en: "Gym coach says “you’re one vibe away”", tags: ["body"], cat: { zh: "健身玄学", en: "Gym Mysticism" } },
  { zh: "房租账单和理想生活同时到账", en: "Rent bill and dream life arrive together", tags: ["money", "home"], cat: { zh: "房租危机", en: "Rent Crisis" } },
  { zh: "生日惊喜翻车，蛋糕先塌了", en: "Birthday plot twist: cake collapses first", tags: ["social", "love"], cat: { zh: "生日惊喜翻车", en: "Birthday Plot Twist" } },
  { zh: "共享单车只剩一辆，车筐还进水", en: "Only one shared bike left, basket flooded", tags: ["travel"], cat: { zh: "共享单车缘分", en: "Bike Fate" } },
  { zh: "宿舍熄灯后，有人开始开人生研讨会", en: "After lights out, someone starts a life seminar", tags: ["school", "home"], cat: { zh: "宿舍熄灯后", en: "After Lights Out" } },
  { zh: "商场试衣间灯管闪得像审讯室", en: "Fitting-room lights flicker like an interrogation room", tags: ["life"], cat: { zh: "商场试衣间", en: "Fitting Room Drama" } },
  { zh: "节假日回家，亲戚连环追问进度条", en: "Holiday homecoming: relatives spam your progress bar", tags: ["family"], cat: { zh: "节假日回家", en: "Holiday Homecoming" } },
  { zh: "二次元浓度过高，现实开始加载失败", en: "Anime density too high; reality fails to load", tags: ["digital", "life"], cat: { zh: "二次元浓度", en: "Anime Density" } },
  { zh: "咖啡因危机：手抖但脑子还在开会", en: "Caffeine crisis: hands shaking, brain still in meeting", tags: ["work", "life"], cat: { zh: "咖啡因危机", en: "Caffeine Crisis" } },
  { zh: "游戏开黑有人开始指挥全场", en: "Party queue: someone starts commanding the whole lobby", tags: ["game", "social"], cat: { zh: "游戏开黑", en: "Party Queue" } },
  { zh: "朋友圈人设崩了，评论区开始考古", en: "Feed persona cracked; comment section starts archaeology", tags: ["digital", "social"], cat: { zh: "朋友圈人设", en: "Feed Persona" } },
  { zh: "表白朋友圈发出去 0.5 秒就后悔", en: "Soft-launch confession posted; regret arrives in 0.5s", tags: ["love", "digital"], cat: { zh: "表白朋友圈", en: "Public Soft Launch" } },
  { zh: "停电夜，手机只剩 8% 电", en: "Blackout night; phone battery at 8%", tags: ["home", "life"], cat: { zh: "停电夜", en: "Blackout Night" } },
  { zh: "养生局开局，你却点了炸鸡套餐", en: "Wellness arc starts; you order fried chicken", tags: ["body", "life"], cat: { zh: "养生局", en: "Wellness Arc" } },
  { zh: "追星现场人挤人，应援灯全灭", en: "Fandom field packed; lightsticks all die", tags: ["social", "digital"], cat: { zh: "追星现场", en: "Fandom Field" } },
  { zh: "AI 助手一本正经胡说八道", en: "AI sidekick is confidently wrong", tags: ["work", "digital"], cat: { zh: "AI打工", en: "AI Sidekick" } }
];

const quotePool = [
  { zh: "尴尬不会杀死人，但会训练你的影分身。", en: "Awkwardness won’t kill you—it trains clone mode." },
  { zh: "人生没有标准答案，只有标准段子。", en: "Life has no standard answers, only standard bits." },
  { zh: "你不是懒，你是在用低功耗模式对抗无限待办。", en: "Not lazy—low-power mode versus infinite todos." },
  { zh: "幽默是高级防御，行动是最终补丁。", en: "Humor is advanced defense; action is the final patch." },
  { zh: "别把热闹当亲密，别把沉默当冷漠。", en: "Don’t mistake noise for intimacy or silence for coldness." },
  { zh: "计划很丰满，执行很骨感，复盘很幽默。", en: "Plans are plump, execution is bony, reviews are funny." },
  { zh: "先活成自己的系统，再谈兼容世界。", en: "Be your own system before compatibility patches." },
  { zh: "边界不是墙，是带钥匙的门。", en: "Boundaries aren’t walls—they’re doors with keys." },
  { zh: "真正的成熟是：能整活，也能收工。", en: "Maturity is being able to clown and close the ticket." },
  { zh: "你追的不是完美，是可控；世界偏爱随机掉落。", en: "You chase control; the world drops RNG loot." },
  { zh: "把情绪当数据，把行动当答案。", en: "Treat feelings as data, action as the answer." },
  { zh: "人设可以演，良心不能离线。", en: "Persona can perform; conscience can’t go offline." },
  { zh: "社死是短剧，成长是长篇连载。", en: "Cringe is a short; growth is a long serial." },
  { zh: "会说“不”的人，才有资格认真说“好”。", en: "Only those who can say no can mean yes." },
  { zh: "别用别人的高光当自己的进度条。", en: "Don’t use someone else’s highlights as your progress bar." },
  { zh: "成年人的浪漫：把焦虑折叠好，再去吃饭。", en: "Adult romance: fold anxiety neatly, then eat." },
  { zh: "热情可贵，完成更勇敢。", en: "Passion is precious; finishing is braver." },
  { zh: "看见人心，不等于替人扛下全部风雨。", en: "Seeing hearts ≠ carrying all storms." },
  { zh: "问题比答案有趣，过程比结论诚实。", en: "Questions beat answers; process beats conclusions." },
  { zh: "把小事做对，大事才站得住。", en: "Get small things right so big things stand." },
  { zh: "照顾别人之前，先给自己的灯加油。", en: "Refuel your lamp before lighting others." },
  { zh: "美不是奢侈，是活着的证据。", en: "Beauty isn’t luxury—it’s proof of living." },
  { zh: "真正的自由，是说“不”时声音不抖。", en: "Real freedom is saying no without a shaky voice." },
  { zh: "今天的离谱，是明天的谈资。", en: "Today’s chaos is tomorrow’s story fuel." },
  { zh: "别内耗，去外卷宇宙本身。", en: "Stop internal spinning—out-compete the universe." },
  { zh: "已读不回也是一种边界艺术。", en: "Seen-and-no-reply is boundary art." },
  { zh: "情绪来了先落座，别让它当 CEO。", en: "Seat the emotion; don’t elect it CEO." },
  { zh: "你不是工具人，你是有保修期的主角。", en: "You’re not an NPC tool—you’re a hero with warranty." },
  { zh: "把“我应该”换成“我选择”，世界会安静一点。", en: "Swap “I should” for “I choose”; the world quiets." },
  { zh: "好笑的人通常更敢面对真实。", en: "Funny people often face truth sooner." },
  { zh: "低电量时别做高难度人格运算。", en: "Don’t run hard personality math on low battery." },
  { zh: "人生像补丁笔记：丑一点也能跑。", en: "Life is patch notes: ugly can still ship." },
  { zh: "嘴硬可以，心硬会掉血。", en: "Hard mouth ok; hard heart drains HP." },
  { zh: "先把今天救下来，再谈宏大叙事。", en: "Save today first, epic lore later." },
  { zh: "你的节奏比别人的期待更重要。", en: "Your tempo beats their expectations." },
  { zh: "认真生活，也认真开玩笑。", en: "Live seriously, joke seriously." },
  { zh: "别把自己活成别人的说明书。", en: "Don’t live as someone else’s manual." },
  { zh: "混乱里找秩序，秩序里留缝隙。", en: "Find order in chaos; leave gaps in order." },
  { zh: "能笑场的人，往往也更能重开。", en: "People who can laugh can also restart." },
  { zh: "把尴尬当剧情，把勇气当技能点。", en: "Treat cringe as plot, courage as skill points." }
];

const twists = [
  { zh: "而且雨突然下很大。", en: "And it starts pouring." },
  { zh: "关键是你电量只剩 12%。", en: "Also your battery is at 12%." },
  { zh: "旁边还有人在拍短视频。", en: "Someone nearby is filming a short video." },
  { zh: "你还没吃饭，血糖报警。", en: "You haven’t eaten; blood sugar is alarming." },
  { zh: "群里已经出现三个表情包审判。", en: "Three judgmental stickers already landed in chat." },
  { zh: "时间只够做一个漂亮动作。", en: "You only have time for one clean move." },
  { zh: "你昨天刚立过“要改变”的 flag。", en: "You just set a “I’ll change” flag yesterday." },
  { zh: "你的死党正在对面偷笑。", en: "Your bestie is smirking across from you." },
  { zh: "背景 BGM 突然很尴尬。", en: "Background BGM becomes painfully awkward." },
  { zh: "你还戴着有点丑的发箍。", en: "You’re also wearing a slightly ugly headband." },
  { zh: "手机刚好弹出工作消息。", en: "A work notification pops up right then." },
  { zh: "你本来只想安静做条咸鱼。", en: "You only wanted to be a quiet salted fish." },
  { zh: "有人开始起哄加油。", en: "People start hyping you up." },
  { zh: "空气里有一股“你上你也行”的味道。", en: "The air smells like “you do it then”." },
  { zh: "你的咖啡因已经超标。", en: "Your caffeine is already over limit." },
  { zh: "下一秒可能被做成表情包。", en: "You might become a sticker in one second." },
  { zh: "系统提示：今日社死额度已用 80%。", en: "System note: today’s cringe quota is 80% used." },
  { zh: "你的脑内弹幕已经开始刷屏。", en: "Your inner danmaku is already spamming." },
  { zh: "领导/长辈的目光锁定了你。", en: "A boss/elder gaze locks onto you." },
  { zh: "你刚发誓“今天一定稳”。", en: "You just swore “today I’ll be stable”." }
];

const flavor = [
  { zh: "还尽量不翻车", en: "try not to crash" },
  { zh: "并给自己留退路", en: "and leave an exit" },
  { zh: "同时假装很淡定", en: "while faking calm" },
  { zh: "顺便保住人设", en: "and protect the persona" },
  { zh: "用最小社交成本", en: "at minimum social cost" },
  { zh: "在不社死的前提下", en: "without full cringe death" },
  { zh: "顺便给未来自己擦屁股", en: "and clean up for future-you" },
  { zh: "尽量看起来很专业", en: "while looking pro" }
];

const optionSets = {
  EI: [
    [
      { value: "E", zh: "硬开话题，把冷场做成脱口秀", en: "Force a topic and turn silence into a talk show", hintZh: "社牛续命", hintEn: "Social CPR" },
      { value: "I", zh: "微笑点头，灵魂打开飞行模式", en: "Smile-nod while soul goes airplane mode", hintZh: "隐身术", hintEn: "Stealth" },
      { value: "E", zh: "主动自我介绍并拉人组队", en: "Intro yourself and form a squad", hintZh: "气氛组长", hintEn: "Vibe captain" },
      { value: "I", zh: "站到角落观察谁比较安全", en: "Stand in a corner and scan for safe NPCs", hintZh: "雷达侦察", hintEn: "Radar recon" }
    ],
    [
      { value: "E", zh: "接麦输出，顺手带动全场", en: "Take the mic and lift the whole room", hintZh: "热力全开", hintEn: "Full heat" },
      { value: "I", zh: "用最短句子过关，尽快回血", en: "Pass with minimal lines and recharge", hintZh: "节能模式", hintEn: "Eco mode" },
      { value: "E", zh: "把话题抛给更多人一起热闹", en: "Toss the topic to more people", hintZh: "群聊发动机", hintEn: "Chat engine" },
      { value: "I", zh: "假装看手机写逃跑剧本", en: "Fake-scroll while drafting escape", hintZh: "战术撤退", hintEn: "Tactical exit" }
    ],
    [
      { value: "E", zh: "先笑三声，再把场面盘活", en: "Laugh first, then revive the scene", hintZh: "人形暖风机", hintEn: "Human heater" },
      { value: "I", zh: "精准回一句，然后安静观察", en: "Reply once, then observe", hintZh: "精确社交", hintEn: "Precision social" },
      { value: "E", zh: "主动加好友，现场建联", en: "Add contacts and network live", hintZh: "人脉采集", hintEn: "Network farming" },
      { value: "I", zh: "找主人当锚点，减少随机伤害", en: "Anchor to the host to reduce RNG damage", hintZh: "安全挂机", hintEn: "Safe AFK" }
    ],
    [
      { value: "E", zh: "直接开整，冷场是燃料", en: "Go chaotic; silence is fuel", hintZh: "整活启动", hintEn: "Bit engine" },
      { value: "I", zh: "用表情包式微笑完成任务", en: "Complete the quest with meme smile", hintZh: "低耗通过", hintEn: "Low-cost pass" },
      { value: "E", zh: "拉人合唱/共创，越闹越好", en: "Pull people into a collab noise", hintZh: "集体狂欢", hintEn: "Group hype" },
      { value: "I", zh: "寻找撤离点，保护电量", en: "Find exit points and protect battery", hintZh: "电量管理", hintEn: "Battery admin" }
    ],
    [
      { value: "E", zh: "开麦报备进度，顺手整点幽默", en: "Mic up progress and drop a joke", hintZh: "公开透明", hintEn: "Public mode" },
      { value: "I", zh: "私聊关键人，减少公开暴露", en: "DM key people; reduce public exposure", hintZh: "静音操作", hintEn: "Silent ops" },
      { value: "E", zh: "现场连麦拉齐所有人", en: "Live-link everyone into sync", hintZh: "全员在线", hintEn: "All online" },
      { value: "I", zh: "先写草稿再发言，避免即兴翻车", en: "Draft first, speak later", hintZh: "预演派", hintEn: "Rehearse" }
    ]
  ],
  SN: [
    [
      { value: "S", zh: "先要清单、预算、截止和验收标准", en: "Demand list, budget, deadline, acceptance criteria", hintZh: "细节侦探", hintEn: "Detail detective" },
      { value: "N", zh: "先抓大感觉，边做边长出结构", en: "Catch the vibe first, structure emerges later", hintZh: "灵感测绘", hintEn: "Vibe mapping" },
      { value: "S", zh: "拆成可执行小步骤再开工", en: "Break into executable steps first", hintZh: "落地派", hintEn: "Grounded" },
      { value: "N", zh: "先脑暴十个可能，再挑最有趣的", en: "Brainstorm ten futures, pick the fun one", hintZh: "平行宇宙", hintEn: "Parallel worlds" }
    ],
    [
      { value: "S", zh: "对照事实和参数，拒绝抽象空气", en: "Stick to facts and specs; reject abstract air", hintZh: "实证", hintEn: "Evidence" },
      { value: "N", zh: "先画愿景草图，细节以后填", en: "Sketch the vision; details later", hintZh: "先看见", hintEn: "See first" },
      { value: "S", zh: "找可复用模板和先例", en: "Find reusable templates and precedents", hintZh: "经验库", hintEn: "Pattern library" },
      { value: "N", zh: "允许一点混乱，换创新空间", en: "Allow a little chaos for invention space", hintZh: "混沌创造", hintEn: "Chaos craft" }
    ],
    [
      { value: "S", zh: "先确认现实约束再谈梦想", en: "Confirm constraints before dreams", hintZh: "现实主义", hintEn: "Realism" },
      { value: "N", zh: "先问“如果可以更妙呢”", en: "Ask “what if it could be cooler?”", hintZh: "跃迁思维", hintEn: "Jump thinking" },
      { value: "S", zh: "用清单和测量把感觉变成数据", en: "Turn vibes into data with lists and measures", hintZh: "量化", hintEn: "Quantify" },
      { value: "N", zh: "用隐喻和故事先对齐方向", en: "Align direction with metaphor and story", hintZh: "叙事导航", hintEn: "Story nav" }
    ],
    [
      { value: "S", zh: "逐步验证，每步都可回滚", en: "Validate step-by-step with rollbacks", hintZh: "稳扎稳打", hintEn: "Steady" },
      { value: "N", zh: "先做概念原型，再谈完美细节", en: "Prototype the concept before polish", hintZh: "原型派", hintEn: "Prototype" },
      { value: "S", zh: "对照现场证据，不靠想象补全", en: "Use field evidence, not imagination fill", hintZh: "现场党", hintEn: "Field party" },
      { value: "N", zh: "把这件事写成一个更大的故事", en: "Frame it as a bigger story arc", hintZh: "世界观", hintEn: "Worldbuild" }
    ],
    [
      { value: "S", zh: "先截图、记账、标时间戳", en: "Screenshot, log, timestamp first", hintZh: "证据链", hintEn: "Evidence chain" },
      { value: "N", zh: "先脑内开分镜，再落地执行", en: "Storyboard in mind, then execute", hintZh: "分镜脑", hintEn: "Storyboard brain" },
      { value: "S", zh: "问清楚“成功长什么样”", en: "Ask what success looks like exactly", hintZh: "定义成功", hintEn: "Define win" },
      { value: "N", zh: "先追求惊喜感，再补齐规范", en: "Chase delight first, specs later", hintZh: "惊喜优先", hintEn: "Delight first" }
    ]
  ],
  TF: [
    [
      { value: "T", zh: "先止血：问题拆解、优先级排序", en: "Stop bleeding: break problem and prioritize", hintZh: "手术刀", hintEn: "Scalpel" },
      { value: "F", zh: "先接住情绪，再慢慢谈怎么办", en: "Hold the feelings first, solutions later", hintZh: "情绪急救", hintEn: "Emotion first aid" },
      { value: "T", zh: "把利弊列出来，做清晰取舍", en: "List pros/cons and choose cleanly", hintZh: "决策表", hintEn: "Decision grid" },
      { value: "F", zh: "优先维护关系和对方体面", en: "Protect relationship and dignity first", hintZh: "人心优先", hintEn: "People first" }
    ],
    [
      { value: "T", zh: "对事不对人，标准公开透明", en: "Issue over person; standards transparent", hintZh: "原则党", hintEn: "Principle mode" },
      { value: "F", zh: "留台阶，让对方有软着陆", en: "Leave an exit ramp for soft landing", hintZh: "缓冲带", hintEn: "Buffer zone" },
      { value: "T", zh: "用数据和结果说话", en: "Let data and outcomes speak", hintZh: "结果导向", hintEn: "Outcome-led" },
      { value: "F", zh: "先问大家感受，再调方案", en: "Ask how people feel, then adjust", hintZh: "共情校准", hintEn: "Empathy calibrate" }
    ],
    [
      { value: "T", zh: "指出关键矛盾，不怕短暂不适", en: "Name the core conflict even if awkward", hintZh: "直言", hintEn: "Straight talk" },
      { value: "F", zh: "用更柔的方式把真话送出去", en: "Deliver truth with softer packaging", hintZh: "软封装", hintEn: "Soft wrap" },
      { value: "T", zh: "按规则和公平处理", en: "Handle via rules and fairness", hintZh: "公平秤", hintEn: "Fair scale" },
      { value: "F", zh: "看情境和人，做有温度的例外", en: "Weigh context and people; warm exceptions", hintZh: "情境智慧", hintEn: "Context wisdom" }
    ],
    [
      { value: "T", zh: "先止损，再谈情绪复盘", en: "Stop the bleeding first, feelings later", hintZh: "止损", hintEn: "Damage control" },
      { value: "F", zh: "先让对方感到被理解", en: "Make them feel understood first", hintZh: "被看见", hintEn: "Seen" },
      { value: "T", zh: "设定边界和后果，清晰不拖", en: "Set boundaries and consequences cleanly", hintZh: "边界清晰", hintEn: "Clear borders" },
      { value: "F", zh: "协调两边需求，寻找共赢措辞", en: "Coordinate needs and win-win wording", hintZh: "和事佬Pro", hintEn: "Mediator pro" }
    ],
    [
      { value: "T", zh: "把情绪翻译成可执行任务", en: "Translate emotion into executable tasks", hintZh: "任务化", hintEn: "Taskify" },
      { value: "F", zh: "先给一句“我在”，再谈方案", en: "Say “I’m here” first, then plan", hintZh: "在场感", hintEn: "Presence" },
      { value: "T", zh: "用标准答案压住场面抖动", en: "Stabilize with standards", hintZh: "标准件", hintEn: "Standard part" },
      { value: "F", zh: "用玩笑卸压，再认真对齐", en: "Joke to decompress, then realign", hintZh: "笑着对齐", hintEn: "Laugh align" }
    ]
  ],
  JP: [
    [
      { value: "J", zh: "守计划，把临时冲动排进候补区", en: "Keep the plan; park impulses in backlog", hintZh: "日程守护", hintEn: "Schedule guard" },
      { value: "P", zh: "计划可改，快乐窗口先冲", en: "Plans flex; joy window first", hintZh: "即时响应", hintEn: "Live response" },
      { value: "J", zh: "先完成关键项，再谈自由发挥", en: "Finish critical path before freeform", hintZh: "关键路径", hintEn: "Critical path" },
      { value: "P", zh: "跟着状态走，灵感来了就转向", en: "Follow state; pivot when inspiration hits", hintZh: "浪潮冲浪", hintEn: "Ride the wave" }
    ],
    [
      { value: "J", zh: "列清单、设闹钟、闭环打勾", en: "List, alarms, close the loop", hintZh: "闭环强迫症", hintEn: "Closure mode" },
      { value: "P", zh: "保留空白，给意外留座位", en: "Keep blank space for surprises", hintZh: "留白艺术", hintEn: "Blank space" },
      { value: "J", zh: "提前准备 Plan B/C", en: "Prep plan B/C early", hintZh: "备份人生", hintEn: "Backup life" },
      { value: "P", zh: "到场再即兴组装方案", en: "Improvise the plan on arrival", hintZh: "现场工程", hintEn: "Field craft" }
    ],
    [
      { value: "J", zh: "把任务切块，按时交付", en: "Slice tasks and deliver on time", hintZh: "交付机器", hintEn: "Delivery machine" },
      { value: "P", zh: "先做最有感觉的部分", en: "Do the most exciting part first", hintZh: "兴趣驱动", hintEn: "Interest-driven" },
      { value: "J", zh: "清理环境再开工，减少干扰", en: "Clear environment first to cut noise", hintZh: "秩序启动", hintEn: "Order boot" },
      { value: "P", zh: "允许桌面混乱，先抓住灵感", en: "Allow desk chaos; catch inspiration first", hintZh: "混乱生产力", hintEn: "Chaos productivity" }
    ],
    [
      { value: "J", zh: "拒绝无限延期，今天必须收口", en: "No endless delay; close it today", hintZh: "收口人", hintEn: "Closer" },
      { value: "P", zh: "给自己弹性，状态在线再冲刺", en: "Keep elasticity; sprint when online", hintZh: "弹性时间", hintEn: "Elastic time" },
      { value: "J", zh: "用流程降低决策疲劳", en: "Use process to cut decision fatigue", hintZh: "流程护盾", hintEn: "Process shield" },
      { value: "P", zh: "保留即兴，避免被流程勒住", en: "Keep improv so process doesn’t choke you", hintZh: "反勒颈", hintEn: "Anti-choke" }
    ],
    [
      { value: "J", zh: "先定截止，再谈浪漫灵感", en: "Set deadline first, romance later", hintZh: "DDL 信仰", hintEn: "DDL faith" },
      { value: "P", zh: "先抓住现在这个快乐窗口", en: "Catch this joy window now", hintZh: "窗口期", hintEn: "Window" },
      { value: "J", zh: "把混乱收成清单再行动", en: "Compress chaos into a checklist", hintZh: "清单化", hintEn: "Checklistify" },
      { value: "P", zh: "先冲一波，边跑边校准", en: "Sprint first, calibrate mid-run", hintZh: "边跑边调", hintEn: "Run-tune" }
    ]
  ]
};

const axisMeta = {
  EI: { zh: "社死或社牛", en: "Cringe or Charge" },
  SN: { zh: "细节或脑洞", en: "Detail or Daydream" },
  TF: { zh: "理智或心软", en: "Logic or Soft Heart" },
  JP: { zh: "计划或浪", en: "Plan or Flow" }
};

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
  }
  return a;
}

function dump(value, indent = 0) {
  const pad = "  ".repeat(indent);
  if (value === null) return "null";
  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    const body = value.map((item) => pad + "  " + dump(item, indent + 1)).join(",\n");
    return "[\n" + body + "\n" + pad + "]";
  }
  if (typeof value === "object") {
    const keys = Object.keys(value);
    if (!keys.length) return "{}";
    const body = keys
      .map((k) => pad + "  " + JSON.stringify(k) + ": " + dump(value[k], indent + 1))
      .join(",\n");
    return "{\n" + body + "\n" + pad + "}";
  }
  return JSON.stringify(value);
}

function buildBank() {
  const bank = [];
  let id = 1;
  const axes = ["EI", "SN", "TF", "JP"];
  let seed = 20260728;
  function rnd() {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  }
  function pick(arr) {
    return arr[Math.floor(rnd() * arr.length)];
  }

  // 50 situations * 4 axes * 5 option sets * 2 twist layers ~= 2000, cap at 1400
  for (let layer = 0; layer < 2; layer++) {
    for (let s = 0; s < situations.length; s++) {
      for (let a = 0; a < axes.length; a++) {
        const axis = axes[a];
        const sets = optionSets[axis];
        for (let o = 0; o < sets.length; o++) {
          if (bank.length >= 1400) break;
          const sit = situations[s];
          const twist = twists[(s * 3 + o * 5 + layer * 7 + a) % twists.length];
          const quote = quotePool[(s * 11 + o * 3 + layer * 13 + a * 17) % quotePool.length];
          const flav = flavor[(s + o + layer + a) % flavor.length];
          const opts = sets[o].map((opt, idx) => {
            const useFlavor = (layer + idx + o) % 2 === 0;
            return {
              value: opt.value,
              label: {
                zh: useFlavor ? opt.zh + "（" + flav.zh + "）" : opt.zh,
                en: useFlavor ? opt.en + " (" + flav.en + ")" : opt.en
              },
              hint: { zh: opt.hintZh, en: opt.hintEn }
            };
          });
          bank.push({
            id: id++,
            axis,
            category: sit.cat,
            tags: sit.tags,
            kicker: {
              zh: sit.cat.zh + " · " + axisMeta[axis].zh + " · " + axis,
              en: sit.cat.en + " · " + axisMeta[axis].en + " · " + axis
            },
            text: {
              zh: sit.zh + "。" + twist.zh + "你会？",
              en: sit.en + ". " + twist.en + " You:"
            },
            quote: {
              zh: "金句：" + quote.zh,
              en: "Quote: " + quote.en
            },
            options: opts
          });
        }
      }
    }
  }
  return bank;
}

const QUESTION_BANK = buildBank();

function sampleBalanced(bank, perAxis = 12) {
  const axes = ["EI", "SN", "TF", "JP"];
  const out = [];
  axes.forEach((axis) => {
    const pool = bank.filter((q) => q.axis === axis);
    const shuffled = shuffle(pool);
    out.push.apply(out, shuffled.slice(0, perAxis));
  });
  return shuffle(out).map((q, i) => Object.assign({}, q, { id: i + 1 }));
}

const QUESTIONS = sampleBalanced(QUESTION_BANK, 12);

UI_TEXT.zh = Object.assign({}, UI_TEXT.zh, {
  brandSub: "千题题库 · 每次随机48题 · 搞笑有哲理",
  homeTitle: "从上千道离谱题里，抽中你的人间副本",
  homeLead:
    "题库 1000+ 情景，覆盖社死、群聊、恋爱、通勤、游戏、团建、夜猫子等。每次测试从题库均衡抽取 48 题（每维 12 题），选项够损，金句好笑也扎心。",
  feature1Title: "不是固定48题",
  feature1Text: "千题题库随机开局，重测就像开新地图。",
  feature2Title: "种类很杂很疯",
  feature2Text: "工作/恋爱/宿舍/旅行/AI打工/宠物迷惑行为……应有尽有。",
  feature3Title: "手机更好答",
  feature3Text: "大按钮、单列选项、金句卡片、进度常驻，单手可玩。",
  aboutBody:
    "纯前端趣味测试。题库 1000+，每次随机抽 48 题四选一。结果只存在浏览器本地。同一 Wi‑Fi 可用手机链接/二维码访问。娱乐向，有参考性，不是专业评估。",
  bankMeta: "题库 {bank} 题 · 本局 {n} 题",
  typesLead: "气质、哲理、恋爱、工作、社交增益/减益、名场面、避雷场、口头禅。重测会换题，人格地图还在。"
});

UI_TEXT.en = Object.assign({}, UI_TEXT.en, {
  brandSub: "1000+ bank · 48 random each run · funny + wise",
  homeTitle: "Draw your chaotic human dungeon from 1000+ prompts",
  homeLead:
    "A 1000+ scenario bank across cringe, chats, romance, commute, games, team-building, night-owl life. Each run samples 48 balanced questions (12 per axis).",
  feature1Title: "Not a fixed 48",
  feature1Text: "Randomized from a huge bank—retakes feel like new maps.",
  feature2Title: "Wild variety",
  feature2Text: "Work, love, dorms, travel, AI sidekicks, pet chaos, and more.",
  feature3Title: "Phone-first UX",
  feature3Text: "Big taps, single-column choices, sticky progress, one-hand friendly.",
  aboutBody:
    "Pure front-end fun quiz. 1000+ bank, 48 random 4-choice questions each run. Local-only results. Same Wi‑Fi phone link/QR supported. Entertaining, somewhat useful, not clinical.",
  bankMeta: "Bank {bank} · This run {n}",
  typesLead: "Vibe, philosophy, love/work, social buffs/debuffs, scenes, catchphrases. Retakes reshuffle questions."
});

const out =
  "const QUESTION_BANK = " +
  dump(QUESTION_BANK) +
  ";\n\nconst QUESTIONS = " +
  dump(QUESTIONS) +
  ";\n\nconst TYPES = " +
  dump(TYPES) +
  ";\n\nconst CAREERS = " +
  dump(CAREERS) +
  ";\n\nconst MATCHES = " +
  dump(MATCHES) +
  ";\n\nconst UI_TEXT = " +
  dump(UI_TEXT) +
  ";\n";

fs.writeFileSync(dataPath, out, "utf8");

const axisCount = QUESTION_BANK.reduce((a, q) => {
  a[q.axis] = (a[q.axis] || 0) + 1;
  return a;
}, {});
console.log("BANK", QUESTION_BANK.length, axisCount);
console.log("SAMPLE", QUESTIONS.length);
console.log("cats", new Set(QUESTION_BANK.map((q) => q.category.zh)).size);
console.log("sampleQ", QUESTION_BANK[0].text.zh);
console.log("sampleKick", QUESTION_BANK[0].kicker.zh);
