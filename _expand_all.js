/**
 * Expand bank to 2000+, codex to 49+, richer quotes.
 * Keeps TYPES / CAREERS / MATCHES and rewrites QUESTION_BANK / QUESTIONS / CODEX / UI_TEXT.
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
    "\n;this.QUESTION_BANK=typeof QUESTION_BANK!=='undefined'?QUESTION_BANK:[];this.QUESTIONS=QUESTIONS;this.TYPES=TYPES;this.CAREERS=CAREERS;this.MATCHES=MATCHES;this.UI_TEXT=UI_TEXT;",
  ctx
);

const { TYPES, CAREERS, MATCHES, UI_TEXT } = ctx;

function bi(zh, en) {
  return { zh, en };
}
function list(zh, en) {
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

const scenes = {
  EI: [
    ["电梯里只剩你和老板，空气开始发霉", "Just you and the boss in an elevator", "电梯社死", "Elevator Cringe", "work,social"],
    ["团建突然点名让你自我介绍三十秒", "Team-building demands a 30-second intro", "团建破冰", "Team Icebreaker", "work,social"],
    ["朋友局只认识主人，其他人全是NPC", "You only know the host; others are NPCs", "社交电池", "Social Battery", "social"],
    ["语音会议冷场五秒，所有人都在等那个谁", "Call silence lasts five seconds", "会议黑洞", "Meeting Black Hole", "work,digital"],
    ["饭局上突然被要求讲个笑话", "Dinner table demands a joke", "餐厅点菜战", "Menu War", "social"],
    ["KTV大家把麦塞给你", "They shove the mic at you at KTV", "KTV麦霸", "KTV Mic Boss", "social"],
    ["微信群突然@全体，要你今晚线上露脸", "Group chat @all wants your face tonight", "群聊政治", "Groupchat Politics", "digital,social"],
    ["邻居在电梯里开始热情搭话", "Neighbor chats warmly in the elevator", "雨天社死", "Rain Cringe", "life,social"],
    ["新同事第一天，茶水间撞见全组人", "Day one pantry encounter with whole team", "茶水间遭遇战", "Pantry Encounter", "work,social"],
    ["开黑语音里只有你最安静", "You're quietest in party voice chat", "游戏开黑", "Party Queue", "game,social"],
    ["婚礼把你安排到陌生人桌", "Wedding seats you with strangers", "婚礼座位表", "Wedding Seating Chart", "family,social"],
    ["面试官说介绍一下你自己不限时间", "Interviewer says introduce yourself freely", "面试表演赛", "Interview Show", "work"],
    ["你想低调进场，开场音乐却点了你的名曲", "You want low-key entry; BGM cues your theme", "KTV麦霸", "KTV Mic Boss", "social"],
    ["群红包来了，手速和人设同时崩", "Red packet drops; speed and persona crash", "群聊政治", "Groupchat Politics", "digital,social"],
    ["你被临时叫去救场主持", "You're suddenly asked to host and save the show", "团建破冰", "Team Icebreaker", "work,social"],
    ["系统提示今日社交额度不足", "System says social quota is low", "社交电池", "Social Battery", "social"],
    ["约会餐厅太安静，你们开始听彼此咀嚼", "Date restaurant is too quiet", "相亲开场", "Blind Date Opener", "love"],
    ["老师点名提问，你刚好走神", "Teacher cold-calls you mid-daydream", "考试周", "Exam Week", "school"],
    ["追星现场人挤人，应援灯全灭", "Fandom field packed; lightsticks die", "追星现场", "Fandom Field", "social,digital"],
    ["宠物摄像头拍到了你社死名场面", "Pet cam records your cringe highlight", "宠物迷惑行为", "Pet Chaos", "home,digital"],
    ["你想安静养生，朋友拉你去蹦迪", "You want wellness; friends drag you clubbing", "社交电池", "Social Battery", "social,body"],
    ["突然被要求当婚礼司仪", "You're suddenly asked to host a wedding", "婚礼座位表", "Wedding Seating Chart", "family,social"],
    ["聚会有人提议每个人说一个秘密", "Someone proposes everyone share a secret", "八卦雷达", "Gossip Radar", "social"],
    ["游戏排到王者局，队友开始指挥人生", "Ranked match starts; teammates coach your life", "游戏开黑", "Party Queue", "game,social"]
  ],
  SN: [
    ["领导说随便做个大概就行", "Boss says just rough it out", "DDL神学", "Deadline Theology", "work"],
    ["旅行攻略只有一句话：去有感觉的地方", "Travel plan: go where it feels right", "旅行突发", "Travel Chaos", "travel"],
    ["组装家具说明书像天书", "Furniture manual looks like ancient runes", "室友生存赛", "Roommate Survival", "home,life"],
    ["产品需求只有要有感觉高级好用", "Product brief is vibe premium usable", "AI打工", "AI Sidekick", "work"],
    ["朋友说那家店氛围绝了", "Friend says that place has insane vibes", "外卖命运", "Delivery Destiny", "social,food"],
    ["地图软件显示三条差不多的路", "Maps shows three almost-equal routes", "通勤副本", "Commute Dungeon", "travel"],
    ["写作只给主题：成长", "Writing prompt is just growth", "考试周", "Exam Week", "school,work"],
    ["做菜只说适量盐", "Recipe says salt to taste", "食堂选择困难", "Cafeteria Paralysis", "food,home"],
    ["新手机功能多到眼花", "New phone features overwhelm you", "网购深夜局", "Midnight Shopping", "digital"],
    ["项目目标是提升体验感", "Project goal is improve experience feel", "项目复盘会", "Postmortem Meeting", "work"],
    ["看展时讲解员大谈隐喻", "Museum guide speaks only in metaphors", "二次元浓度", "Anime Density", "life"],
    ["装修方案只有高级一点", "Renovation brief is just make it premium", "房租危机", "Rent Crisis", "home,money"],
    ["AI助手一本正经胡说八道", "AI sidekick is confidently wrong", "AI打工", "AI Sidekick", "work,digital"],
    ["代码一提交，线上立刻表演艺术", "Code ships and production becomes art", "DDL神学", "Deadline Theology", "work,digital"],
    ["预算砍半，需求一个没少", "Budget cut in half, requirements full", "房租危机", "Rent Crisis", "work,money"],
    ["旅行丢了行李，攻略还在云端", "Luggage lost; itinerary still in cloud", "旅行突发", "Travel Chaos", "travel"],
    ["短视频算法开始比你更懂你", "Short-video algo claims it knows you", "深夜刷短视频", "Doomscroll Midnight", "digital"],
    ["商场试衣间灯管闪得像审讯室", "Fitting-room lights flicker like interrogation", "商场试衣间", "Fitting Room Drama", "life"],
    ["你被要求用三句话讲清复杂项目", "Explain complex project in three lines", "会议黑洞", "Meeting Black Hole", "work"],
    ["系统更新后，你的习惯全失效", "Update breaks all your habits", "Wi-Fi消失术", "Wi-Fi Vanishing Act", "digital"],
    ["导航把你带进一条人生岔路", "Navigation sends you into a life detour", "通勤副本", "Commute Dungeon", "travel"],
    ["健身房镜子比私教更严格", "Gym mirror is stricter than coach", "健身玄学", "Gym Mysticism", "body"],
    ["短视频评论区开始替你人生做决定", "Comment section decides your life", "深夜刷短视频", "Doomscroll Midnight", "digital"],
    ["项目群里没人说话，只有你在 concurrent 思考", "Project chat silent; brain concurrent", "会议黑洞", "Meeting Black Hole", "work,digital"]
  ],
  TF: [
    ["朋友失恋哭成表情包，边哭边问你怎么办", "Friend is crying-meme and asks what to do", "恋爱修罗场", "Romance Arena", "love,social"],
    ["团队里有人明显摸鱼拖进度", "Someone is clearly slacking", "同事甩锅", "Blame Volleyball", "work"],
    ["家人送了你完全用不上的礼物", "Family gifts something useless", "家庭聚餐", "Family Feast", "family"],
    ["争论时对方开始讲你就是不在乎我", "They say you just don't care", "表白未遂", "Confession Attempt", "love"],
    ["复盘会变成情绪批斗会", "Postmortem becomes emotional combat", "项目复盘会", "Postmortem Meeting", "work"],
    ["宠物把沙发当跑酷现场，账单也起飞", "Pet parkours sofa; bill takes off", "宠物医院账单", "Vet Bill Shock", "home,money"],
    ["相亲开场三分钟，空气像过期奶茶", "Blind date air tastes like expired milk tea", "相亲开场", "Blind Date Opener", "love"],
    ["快递显示签收，门口却空空如也", "Parcel says delivered; doorstep empty", "快递失踪案", "Parcel Mystery", "life"],
    ["有人当众甩锅给你", "Someone publicly dumps blame on you", "同事甩锅", "Blame Volleyball", "work,social"],
    ["朋友借钱开口很轻松，你心里很重", "Friend asks for money lightly", "房租危机", "Rent Crisis", "money,social"],
    ["群聊里有人阴阳怪气点名你", "Someone passive-aggressively @you", "群聊政治", "Groupchat Politics", "digital,social"],
    ["长辈把关心做成连环追问", "Elders convert care into interrogation", "节假日回家", "Holiday Homecoming", "family"],
    ["约会迟到，对方只回了一个嗯", "You're late; they reply mm", "恋爱修罗场", "Romance Arena", "love"],
    ["室友半夜煮面，火警差点响", "Roommate cooks noodles at midnight", "室友生存赛", "Roommate Survival", "home,school"],
    ["朋友让你帮选对象，标准互相打架", "Friend asks you to pick dates; criteria clash", "相亲开场", "Blind Date Opener", "love,social"],
    ["你写了三页周报，领导只看表情包", "3-page report; boss sees stickers", "会议黑洞", "Meeting Black Hole", "work"],
    ["家里来亲戚，你的房间先被审判", "Relatives arrive; room is judged first", "节假日回家", "Holiday Homecoming", "family,home"],
    ["你想理性分手，对方开始讲宇宙", "You want rational breakup; they talk cosmos", "恋爱修罗场", "Romance Arena", "love"],
    ["朋友让你评价他的新头像", "Friend asks you to rate a new avatar", "朋友圈人设", "Feed Persona", "social,digital"],
    ["你把秘密说漏嘴，空气瞬间固态", "You leak a secret; air solidifies", "八卦雷达", "Gossip Radar", "social"],
    ["你想讲原则，场面却要你讲情商", "You want principles; room wants soft skills", "同事甩锅", "Blame Volleyball", "work,social"],
    ["你写了很长道歉，对方只回了收到", "Long apology; reply is received", "表白未遂", "Confession Attempt", "love,social"],
    ["家里Wi-Fi密码被改了，没人承认", "Wi-Fi password changed; nobody confesses", "Wi-Fi消失术", "Wi-Fi Vanishing Act", "home,digital"],
    ["朋友圈人设崩了，评论区开始考古", "Feed persona cracked; archaeology starts", "朋友圈人设", "Feed Persona", "digital,social"]
  ],
  JP: [
    ["闹钟响了，外面天气很好，但床引力满分", "Alarm rings; bed gravity maxed", "夜猫子哲学", "Night Owl Philosophy", "life"],
    ["房间乱成抽象画，客人还有一小时到", "Room is abstract art; guests in one hour", "周末计划破产", "Weekend Bankruptcy", "home,social"],
    ["邮件写到一半，又冒出五个新任务", "Mid-email, five new tasks appear", "老板突然@你", "Boss @You", "work"],
    ["假期只剩两天，愿望清单还很长", "Two vacation days left; wish list long", "机票改签", "Flight Change", "life,travel"],
    ["Wi-Fi突然消失，家里进入原始社会", "Wi-Fi vanishes; home goes prehistoric", "Wi-Fi消失术", "Wi-Fi Vanishing Act", "digital,home"],
    ["深夜刷短视频，下一秒天亮了", "Doomscrolling; next second it's dawn", "深夜刷短视频", "Doomscroll Midnight", "digital"],
    ["共享单车只剩一辆，车筐还进水", "One shared bike left; basket flooded", "共享单车缘分", "Bike Fate", "travel"],
    ["宿舍熄灯后，有人开始开人生研讨会", "After lights out, life seminar starts", "宿舍熄灯后", "After Lights Out", "school,home"],
    ["生日惊喜翻车，蛋糕先塌了", "Birthday twist: cake collapses first", "生日惊喜翻车", "Birthday Plot Twist", "social,love"],
    ["咖啡因危机：手抖但脑子还在开会", "Caffeine crisis; brain still in meeting", "咖啡因危机", "Caffeine Crisis", "work,life"],
    ["健身私教说就差一点感觉", "Coach says you're one vibe away", "健身玄学", "Gym Mysticism", "body"],
    ["表白朋友圈发出去0.5秒就后悔", "Soft-launch regret in 0.5s", "表白朋友圈", "Public Soft Launch", "love,digital"],
    ["停电夜，手机只剩8%电", "Blackout night; phone at 8%", "停电夜", "Blackout Night", "home,life"],
    ["养生局开局，你却点了炸鸡套餐", "Wellness arc starts; fried chicken ordered", "养生局", "Wellness Arc", "body,life"],
    ["你被拉进一个只会@你的项目群", "Project group only @you", "老板突然@你", "Boss @You", "work,digital"],
    ["外卖小哥到了，你还在纠结地址备注", "Delivery arrives; address notes unfinished", "外卖命运", "Delivery Destiny", "life,food"],
    ["周末计划写满，现实只执行了刷牙", "Weekend plan full; only brushed teeth", "周末计划破产", "Weekend Bankruptcy", "life"],
    ["家里断水，你还想洗头", "Water out; you still want to wash hair", "停电夜", "Blackout Night", "home,life"],
    ["地铁末班车还有两分钟，你在安检门口", "Last subway in two minutes; still at security", "通勤副本", "Commute Dungeon", "travel"],
    ["你的待办列表开始自我繁殖", "Todo list starts self-replicating", "DDL神学", "Deadline Theology", "work,life"],
    ["你点了健康餐，却闻到炸鸡", "Healthy meal ordered; fried chicken smell hits", "养生局", "Wellness Arc", "food,body"],
    ["论文截止前三小时，灵感才上班", "Inspiration clocks in 3h before deadline", "考试周", "Exam Week", "school"],
    ["你的周计划被临时会议切成碎片", "Weekly plan diced by surprise meetings", "老板突然@你", "Boss @You", "work"],
    ["你负责点菜，桌上有六个口味党", "You order for six taste parties", "餐厅点菜战", "Menu War", "food,social"],
    ["凌晨三点灵感爆发，早上却失忆", "3am inspiration; morning amnesia", "夜猫子哲学", "Night Owl Philosophy", "life"],
    ["你想极简生活，快递却天天到", "Minimalism goal; parcels arrive daily", "网购深夜局", "Midnight Shopping", "life,money"],
    ["旅行同伴只想随缘，你想准点", "Travel buddy wants fate; you want punctuality", "旅行突发", "Travel Chaos", "travel,social"],
    ["你列了完美清单，第一项就卡住", "Perfect checklist stalls on item one", "周末计划破产", "Weekend Bankruptcy", "life,work"]
  ]
};

const twists = [
  ["而且雨突然下很大。", "And it starts pouring."],
  ["关键是你电量只剩12%。", "Also your battery is at 12%."],
  ["旁边还有人在拍短视频。", "Someone nearby is filming."],
  ["你还没吃饭，血糖报警。", "You haven't eaten; blood sugar alarms."],
  ["群里已经出现三个表情包审判。", "Three judgmental stickers landed."],
  ["时间只够做一个漂亮动作。", "You only have time for one clean move."],
  ["你昨天刚立过要改变的flag。", "You just set an I'll-change flag yesterday."],
  ["你的死党正在对面偷笑。", "Your bestie is smirking across from you."],
  ["背景BGM突然很尴尬。", "Background BGM becomes awkward."],
  ["你还戴着有点丑的发箍。", "You're wearing a slightly ugly headband."],
  ["手机刚好弹出工作消息。", "A work notification pops up."],
  ["你本来只想安静做条咸鱼。", "You only wanted to be a quiet salted fish."],
  ["有人开始起哄加油。", "People start hyping you up."],
  ["空气里有一股你上你也行的味道。", "The air smells like you-do-it-then."],
  ["你的咖啡因已经超标。", "Your caffeine is already over limit."],
  ["下一秒可能被做成表情包。", "You might become a sticker next second."],
  ["系统提示：今日社死额度已用80%。", "System: cringe quota 80% used."],
  ["你的脑内弹幕已经开始刷屏。", "Your inner danmaku is spamming."],
  ["领导或长辈的目光锁定了你。", "A boss/elder gaze locks onto you."],
  ["你刚发誓今天一定稳。", "You just swore today you'll be stable."],
  ["钱包比心情更紧张。", "Your wallet is more nervous than your mood."],
  ["现实突然开启硬模式。", "Reality switches to hard mode."],
  ["朋友已经开始录制全过程。", "A friend already started full recording."],
  ["你还卡在加载页。", "You're still stuck on the loading screen."]
];

const quotes = [
  ["尴尬不会杀死人，但会训练你的影分身。", "Awkwardness trains clone mode."],
  ["人生没有标准答案，只有标准段子。", "Life has no standard answers, only bits."],
  ["你不是懒，你是在用低功耗模式对抗无限待办。", "Not lazy—low-power versus infinite todos."],
  ["幽默是高级防御，行动是最终补丁。", "Humor is defense; action is the patch."],
  ["别把热闹当亲密，别把沉默当冷漠。", "Noise isn't intimacy; silence isn't coldness."],
  ["计划很丰满，执行很骨感，复盘很幽默。", "Plans plump, execution bony, reviews funny."],
  ["先活成自己的系统，再谈兼容世界。", "Be your system before world compatibility."],
  ["边界不是墙，是带钥匙的门。", "Boundaries are doors with keys."],
  ["真正的成熟是：能整活，也能收工。", "Maturity: clown and close the ticket."],
  ["你追的不是完美，是可控；世界偏爱随机掉落。", "You chase control; world drops RNG."],
  ["把情绪当数据，把行动当答案。", "Feelings as data; action as answer."],
  ["人设可以演，良心不能离线。", "Persona can perform; conscience can't offline."],
  ["社死是短剧，成长是长篇连载。", "Cringe is a short; growth is a serial."],
  ["会说不的人，才有资格认真说好。", "Only those who can say no can mean yes."],
  ["别用别人的高光当自己的进度条。", "Don't use others' highlights as progress."],
  ["成年人的浪漫：把焦虑折叠好，再去吃饭。", "Adult romance: fold anxiety, then eat."],
  ["热情可贵，完成更勇敢。", "Passion is precious; finishing is braver."],
  ["看见人心，不等于替人扛下全部风雨。", "Seeing hearts ≠ carrying all storms."],
  ["问题比答案有趣，过程比结论诚实。", "Questions beat answers; process beats conclusions."],
  ["把小事做对，大事才站得住。", "Get small things right so big things stand."],
  ["照顾别人之前，先给自己的灯加油。", "Refuel your lamp before lighting others."],
  ["美不是奢侈，是活着的证据。", "Beauty is proof of living."],
  ["真正的自由，是说不时声音不抖。", "Freedom is saying no without shaky voice."],
  ["今天的离谱，是明天的谈资。", "Today's chaos is tomorrow's story fuel."],
  ["别内耗，去外卷宇宙本身。", "Stop internal spinning—out-compete the universe."],
  ["已读不回也是一种边界艺术。", "Seen-no-reply is boundary art."],
  ["情绪来了先落座，别让它当CEO。", "Seat emotion; don't elect it CEO."],
  ["你不是工具人，你是有保修期的主角。", "You're a hero with warranty, not a tool."],
  ["把我应该换成我选择，世界会安静一点。", "Swap I should for I choose."],
  ["好笑的人通常更敢面对真实。", "Funny people face truth sooner."],
  ["低电量时别做高难度人格运算。", "No hard personality math on low battery."],
  ["人生像补丁笔记：丑一点也能跑。", "Life is patch notes: ugly can still ship."],
  ["嘴硬可以，心硬会掉血。", "Hard mouth ok; hard heart drains HP."],
  ["先把今天救下来，再谈宏大叙事。", "Save today first, epic lore later."],
  ["你的节奏比别人的期待更重要。", "Your tempo beats their expectations."],
  ["认真生活，也认真开玩笑。", "Live seriously, joke seriously."],
  ["别把自己活成别人的说明书。", "Don't live as someone else's manual."],
  ["混乱里找秩序，秩序里留缝隙。", "Find order in chaos; leave gaps in order."],
  ["能笑场的人，往往也更能重开。", "People who can laugh can restart."],
  ["把尴尬当剧情，把勇气当技能点。", "Cringe as plot; courage as skill points."],
  ["完成比完美更像成年人。", "Done looks more adult than perfect."],
  ["别用热闹填满空，用选择填满空。", "Fill emptiness with choices, not noise."],
  ["温柔不是无欺，是有边界的力量。", "Gentleness is power with borders."],
  ["你可以慢，但不能骗自己。", "You can be slow; not self-deceived."],
  ["把期待调低半格，幸福会升一格。", "Lower expectation half; joy rises one."],
  ["承认不会，是开始会的入场券。", "Admitting not-yet is the ticket to eventually."],
  ["有趣是天赋，靠谱是修行。", "Fun is talent; reliability is practice."],
  ["别把拖延当性格，那只是没切块。", "Delay isn't personality—it's uncut tasks."],
  ["爱自己不是口号，是日程表上的一项。", "Self-love is a calendar item."],
  ["世界很吵，你的判断要有静音键。", "World is loud; judgment needs mute."],
  ["把失败当样本，别当判决书。", "Failure is sample, not verdict."],
  ["好笑之后，记得把功课做完。", "After the laugh, finish homework."],
  ["你的价值不在回复速度。", "Your worth is not reply latency."],
  ["勇敢一点，也休息一点。", "Be braver, and rest more."],
  ["选择少一点，自由多一点。", "Fewer choices, freer life."],
  ["把比较关掉，把感受打开。", "Turn off compare; turn on feel."],
  ["你可以不完美地上线。", "You can ship imperfect."],
  ["别怕重来，怕的是假装没看到。", "Don't fear restart; fear pretending not to see."],
  ["幽默救场，诚实救命。", "Humor saves scene; honesty saves life."],
  ["先成为自己的队友。", "Become your own teammate first."]
];

const optionSets = {
  EI: [
    [
      ["E", "硬开话题，把冷场做成脱口秀", "Force a topic into a talk show", "社牛续命", "Social CPR"],
      ["I", "微笑点头，灵魂打开飞行模式", "Smile-nod while soul goes airplane mode", "隐身术", "Stealth"],
      ["E", "主动自我介绍并拉人组队", "Intro yourself and form a squad", "气氛组长", "Vibe captain"],
      ["I", "站到角落观察谁比较安全", "Corner-scan for safe NPCs", "雷达侦察", "Radar recon"]
    ],
    [
      ["E", "接麦输出，顺手带动全场", "Take the mic and lift the room", "热力全开", "Full heat"],
      ["I", "用最短句子过关，尽快回血", "Pass with minimal lines and recharge", "节能模式", "Eco mode"],
      ["E", "把话题抛给更多人一起热闹", "Toss the topic to more people", "群聊发动机", "Chat engine"],
      ["I", "假装看手机写逃跑剧本", "Fake-scroll while drafting escape", "战术撤退", "Tactical exit"]
    ],
    [
      ["E", "先笑三声，再把场面盘活", "Laugh first, then revive the scene", "人形暖风机", "Human heater"],
      ["I", "精准回一句，然后安静观察", "Reply once, then observe", "精确社交", "Precision social"],
      ["E", "主动加好友，现场建联", "Add contacts and network live", "人脉采集", "Network farming"],
      ["I", "找主人当锚点，减少随机伤害", "Anchor to host to reduce RNG", "安全挂机", "Safe AFK"]
    ],
    [
      ["E", "直接开整，冷场是燃料", "Go chaotic; silence is fuel", "整活启动", "Bit engine"],
      ["I", "用表情包式微笑完成任务", "Complete the quest with meme smile", "低耗通过", "Low-cost pass"],
      ["E", "拉人合唱共创，越闹越好", "Pull people into collab noise", "集体狂欢", "Group hype"],
      ["I", "寻找撤离点，保护电量", "Find exits and protect battery", "电量管理", "Battery admin"]
    ],
    [
      ["E", "开麦报备进度，顺手整点幽默", "Mic up progress and drop a joke", "公开透明", "Public mode"],
      ["I", "私聊关键人，减少公开暴露", "DM key people; reduce exposure", "静音操作", "Silent ops"],
      ["E", "现场连麦拉齐所有人", "Live-link everyone into sync", "全员在线", "All online"],
      ["I", "先写草稿再发言，避免即兴翻车", "Draft first, speak later", "预演派", "Rehearse"]
    ],
    [
      ["E", "把尴尬讲出来，变成全场段子", "Name awkwardness and turn it into a bit", "破冰大师", "Icebreak pro"],
      ["I", "用点头微笑把社交成本压到最低", "Nod-smile to minimize social cost", "成本控制", "Cost control"],
      ["E", "主动组织下一步，别让场面漂着", "Organize next step so room doesn't drift", "场面导演", "Scene director"],
      ["I", "先听完整，再决定要不要入场", "Listen fully before entering", "观望位", "Watch seat"]
    ]
  ],
  SN: [
    [
      ["S", "先要清单、预算、截止和验收标准", "Demand list, budget, deadline, criteria", "细节侦探", "Detail detective"],
      ["N", "先抓大感觉，边做边长出结构", "Catch vibe first; structure later", "灵感测绘", "Vibe mapping"],
      ["S", "拆成可执行小步骤再开工", "Break into executable steps first", "落地派", "Grounded"],
      ["N", "先脑暴十个可能，再挑最有趣的", "Brainstorm ten futures, pick fun one", "平行宇宙", "Parallel worlds"]
    ],
    [
      ["S", "对照事实和参数，拒绝抽象空气", "Stick to facts; reject abstract air", "实证", "Evidence"],
      ["N", "先画愿景草图，细节以后填", "Sketch vision; details later", "先看见", "See first"],
      ["S", "找可复用模板和先例", "Find templates and precedents", "经验库", "Pattern library"],
      ["N", "允许一点混乱，换创新空间", "Allow chaos for invention space", "混沌创造", "Chaos craft"]
    ],
    [
      ["S", "先确认现实约束再谈梦想", "Confirm constraints before dreams", "现实主义", "Realism"],
      ["N", "先问如果可以更妙呢", "Ask what if it could be cooler", "跃迁思维", "Jump thinking"],
      ["S", "用清单和测量把感觉变成数据", "Turn vibes into measurable data", "量化", "Quantify"],
      ["N", "用隐喻和故事先对齐方向", "Align direction with metaphor", "叙事导航", "Story nav"]
    ],
    [
      ["S", "逐步验证，每步都可回滚", "Validate step-by-step with rollbacks", "稳扎稳打", "Steady"],
      ["N", "先做概念原型，再谈完美细节", "Prototype concept before polish", "原型派", "Prototype"],
      ["S", "对照现场证据，不靠想象补全", "Use field evidence, not imagination", "现场党", "Field party"],
      ["N", "把这件事写成一个更大的故事", "Frame it as a bigger story arc", "世界观", "Worldbuild"]
    ],
    [
      ["S", "先截图、记账、标时间戳", "Screenshot, log, timestamp first", "证据链", "Evidence chain"],
      ["N", "先脑内开分镜，再落地执行", "Storyboard first, execute later", "分镜脑", "Storyboard brain"],
      ["S", "问清楚成功长什么样", "Ask what success looks like", "定义成功", "Define win"],
      ["N", "先追求惊喜感，再补齐规范", "Chase delight first, specs later", "惊喜优先", "Delight first"]
    ],
    [
      ["S", "把模糊需求翻译成可检查条款", "Translate fuzzy needs into clauses", "条款翻译", "Clause translate"],
      ["N", "先找灵感锚点，再反推路径", "Find anchors, reverse-engineer path", "锚点思维", "Anchor think"],
      ["S", "用样例和对比避免各说各话", "Use samples to avoid parallel talk", "样例对齐", "Sample align"],
      ["N", "先定义气质，再补工具细节", "Define vibe first, tools later", "气质先行", "Vibe first"]
    ]
  ],
  TF: [
    [
      ["T", "先止血：问题拆解、优先级排序", "Stop bleeding: break and prioritize", "手术刀", "Scalpel"],
      ["F", "先接住情绪，再慢慢谈怎么办", "Hold feelings first, solutions later", "情绪急救", "Emotion first aid"],
      ["T", "把利弊列出来，做清晰取舍", "List pros/cons and choose cleanly", "决策表", "Decision grid"],
      ["F", "优先维护关系和对方体面", "Protect relationship and dignity", "人心优先", "People first"]
    ],
    [
      ["T", "对事不对人，标准公开透明", "Issue over person; standards clear", "原则党", "Principle mode"],
      ["F", "留台阶，让对方有软着陆", "Leave an exit ramp for soft landing", "缓冲带", "Buffer zone"],
      ["T", "用数据和结果说话", "Let data and outcomes speak", "结果导向", "Outcome-led"],
      ["F", "先问大家感受，再调方案", "Ask how people feel, then adjust", "共情校准", "Empathy calibrate"]
    ],
    [
      ["T", "指出关键矛盾，不怕短暂不适", "Name core conflict even if awkward", "直言", "Straight talk"],
      ["F", "用更柔的方式把真话送出去", "Deliver truth with softer packaging", "软封装", "Soft wrap"],
      ["T", "按规则和公平处理", "Handle via rules and fairness", "公平秤", "Fair scale"],
      ["F", "看情境和人，做有温度的例外", "Weigh context; allow warm exceptions", "情境智慧", "Context wisdom"]
    ],
    [
      ["T", "先止损，再谈情绪复盘", "Stop damage first, feelings later", "止损", "Damage control"],
      ["F", "先让对方感到被理解", "Make them feel understood first", "被看见", "Seen"],
      ["T", "设定边界和后果，清晰不拖", "Set boundaries and consequences cleanly", "边界清晰", "Clear borders"],
      ["F", "协调两边需求，寻找共赢措辞", "Coordinate needs with win-win wording", "和事佬Pro", "Mediator pro"]
    ],
    [
      ["T", "把情绪翻译成可执行任务", "Translate emotion into tasks", "任务化", "Taskify"],
      ["F", "先给一句我在，再谈方案", "Say I'm here first, then plan", "在场感", "Presence"],
      ["T", "用标准答案压住场面抖动", "Stabilize with standards", "标准件", "Standard part"],
      ["F", "用玩笑卸压，再认真对齐", "Joke to decompress, then realign", "笑着对齐", "Laugh align"]
    ],
    [
      ["T", "先确认事实，再进入情绪区", "Confirm facts before emotion zone", "事实闸门", "Fact gate"],
      ["F", "先确认对方感受被接收", "Confirm their feelings are received", "接收确认", "Receive confirm"],
      ["T", "用清晰标准结束扯皮", "End the tangle with clear standards", "收口标准", "Close standard"],
      ["F", "用尊重语气把难话说完", "Say hard things with respect", "硬话软说", "Hard soft"]
    ]
  ],
  JP: [
    [
      ["J", "守计划，把临时冲动排进候补区", "Keep plan; park impulses in backlog", "日程守护", "Schedule guard"],
      ["P", "计划可改，快乐窗口先冲", "Plans flex; joy window first", "即时响应", "Live response"],
      ["J", "先完成关键项，再谈自由发挥", "Finish critical path before freeform", "关键路径", "Critical path"],
      ["P", "跟着状态走，灵感来了就转向", "Follow state; pivot on inspiration", "浪潮冲浪", "Ride the wave"]
    ],
    [
      ["J", "列清单、设闹钟、闭环打勾", "List, alarms, close the loop", "闭环强迫症", "Closure mode"],
      ["P", "保留空白，给意外留座位", "Keep blank space for surprises", "留白艺术", "Blank space"],
      ["J", "提前准备Plan B/C", "Prep plan B/C early", "备份人生", "Backup life"],
      ["P", "到场再即兴组装方案", "Improvise plan on arrival", "现场工程", "Field craft"]
    ],
    [
      ["J", "把任务切块，按时交付", "Slice tasks and deliver on time", "交付机器", "Delivery machine"],
      ["P", "先做最有感觉的部分", "Do the most exciting part first", "兴趣驱动", "Interest-driven"],
      ["J", "清理环境再开工，减少干扰", "Clear environment first", "秩序启动", "Order boot"],
      ["P", "允许桌面混乱，先抓住灵感", "Allow desk chaos; catch inspiration", "混乱生产力", "Chaos productivity"]
    ],
    [
      ["J", "拒绝无限延期，今天必须收口", "No endless delay; close today", "收口人", "Closer"],
      ["P", "给自己弹性，状态在线再冲刺", "Keep elasticity; sprint when online", "弹性时间", "Elastic time"],
      ["J", "用流程降低决策疲劳", "Use process to cut decision fatigue", "流程护盾", "Process shield"],
      ["P", "保留即兴，避免被流程勒住", "Keep improv so process doesn't choke", "反勒颈", "Anti-choke"]
    ],
    [
      ["J", "先定截止，再谈浪漫灵感", "Set deadline first, romance later", "DDL信仰", "DDL faith"],
      ["P", "先抓住现在这个快乐窗口", "Catch this joy window now", "窗口期", "Window"],
      ["J", "把混乱收成清单再行动", "Compress chaos into checklist", "清单化", "Checklistify"],
      ["P", "先冲一波，边跑边校准", "Sprint first, calibrate mid-run", "边跑边调", "Run-tune"]
    ],
    [
      ["J", "把今天拆成三块可完成任务", "Split today into three finishable blocks", "三块法", "Three blocks"],
      ["P", "先跟状态合作，再跟计划谈判", "Cooperate with state, then negotiate plan", "状态外交", "State diplomacy"],
      ["J", "先锁优先级，再允许浪", "Lock priorities, then allow drift", "优先级锁", "Priority lock"],
      ["P", "把突发当成新支线任务", "Treat surprise as side quest", "支线玩家", "Side-quest player"]
    ]
  ]
};

const flavors = [
  ["还尽量不翻车", "try not to crash"],
  ["并给自己留退路", "and leave an exit"],
  ["同时假装很淡定", "while faking calm"],
  ["顺便保住人设", "and protect the persona"],
  ["用最小社交成本", "at minimum social cost"],
  ["在不社死的前提下", "without full cringe death"],
  ["顺便给未来自己擦屁股", "and clean up for future-you"],
  ["尽量看起来很专业", "while looking pro"],
  ["还要能发朋友圈复盘", "and still post a review later"],
  ["最好别被做成表情包", "preferably not become a sticker"]
];

const axisLabel = {
  EI: { zh: "社死或社牛", en: "Cringe or Charge" },
  SN: { zh: "细节或脑洞", en: "Detail or Daydream" },
  TF: { zh: "理智或心软", en: "Logic or Soft Heart" },
  JP: { zh: "计划或浪", en: "Plan or Flow" }
};

function buildBank() {
  const bank = [];
  let id = 1;
  const layerMarks = [
    ["", ""],
    ["此刻直播感很强，", "Live-mode intensity now, "],
    ["旁白开始阴阳怪气，", "Narrator gets snarky, "],
    ["系统弹窗提示风险，", "System popup warns risk, "],
    ["朋友圈已准备好截图，", "Moments is ready to screenshot, "],
    ["宇宙在等你整活，", "Universe waits for your bit, "],
    ["你的人格补丁还没装完，", "Your personality patch is incomplete, "],
    ["BGM 突然变得很热血，", "BGM suddenly turns epic, "]
  ];
  for (let layer = 0; layer < layerMarks.length; layer += 1) {
    for (const axis of ["EI", "SN", "TF", "JP"]) {
      const sits = scenes[axis];
      const sets = optionSets[axis];
      for (let s = 0; s < sits.length; s += 1) {
        for (let o = 0; o < sets.length; o += 1) {
          if (bank.length >= 3600) break;
          const sit = sits[s];
          const twist = twists[(s * 5 + o * 3 + layer * 7) % twists.length];
          const quote = quotes[(s * 11 + o * 5 + layer * 13) % quotes.length];
          const flav = flavors[(s + o + layer * 2) % flavors.length];
          const mark = layerMarks[layer];
          const opts = sets[o].map((opt, idx) => {
            const useFlavor = (layer + idx + o) % 2 === 0;
            return {
              value: opt[0],
              label: {
                zh: useFlavor ? opt[1] + "（" + flav[0] + "）" : opt[1],
                en: useFlavor ? opt[2] + " (" + flav[1] + ")" : opt[2]
              },
              hint: { zh: opt[3], en: opt[4] }
            };
          });
          bank.push({
            id: id++,
            axis,
            category: { zh: sit[2], en: sit[3] },
            tags: sit[4].split(","),
            kicker: {
              zh: sit[2] + " · " + axisLabel[axis].zh + " · " + axis,
              en: sit[3] + " · " + axisLabel[axis].en + " · " + axis
            },
            text: {
              zh: sit[0] + "。" + mark[0] + twist[0] + "你会？",
              en: sit[1] + ". " + mark[1] + twist[1] + " You:"
            },
            quote: {
              zh: "金句：" + quote[0],
              en: "Quote: " + quote[1]
            },
            options: opts
          });
        }
      }
    }
  }
  const seen = new Set();
  const unique = [];
  for (const q of bank) {
    const key =
      q.axis +
      "|" +
      q.text.zh.replace(/\s+/g, "") +
      "|" +
      q.options
        .map(function (o) {
          return o.value + ":" + o.label.zh;
        })
        .join("||");
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(q);
  }
  unique.forEach((q, i) => {
    q.id = i + 1;
  });
  return unique;
}

function makeCodex(types) {
  const codex = [];
  Object.keys(types).forEach((code) => {
    const info = types[code];
    codex.push({
      id: code,
      kind: "core",
      code,
      name: info.name,
      english: info.english,
      emoji: info.emoji,
      animal: info.animal,
      fantasy: info.fantasy,
      vibe: info.vibe,
      philosophy: info.philosophy,
      analysis: info.analysis,
      snark: info.snark,
      traits: info.traits,
      strengths: info.strengths,
      watchouts: info.watchouts,
      growth: info.growth,
      slogan: info.slogan,
      meme: info.meme,
      loveStyle: info.loveStyle,
      workStyle: info.workStyle,
      socialBuff: info.socialBuff,
      socialDebuff: info.socialDebuff,
      bestScene: info.bestScene,
      worstScene: info.worstScene
    });
  });

  const variants = [
    ["INTJ-夜航", "Night Pilot INTJ", "🧠", "战略夜猫", "把世界当可优化系统，凌晨最清醒", "效率是温柔的一种形式", "你不是冷，你是在省电给真正重要的事。"],
    ["INTP-实验室", "Lab Ghost INTP", "🔬", "思维深潜", "问题比答案有趣，结论可以再等等", "好奇心是最高级的忠诚", "你不是拖延，你是在等脑内模型编译完成。"],
    ["ENTJ-冲锋", "Charge ENTJ", "⚔️", "目标激光", "先定胜局，再谈感受分包", "领导力是扛结果不是抢话筒", "你不是强势，你只是对模糊过敏。"],
    ["ENTP-整活", "Bit Engine ENTP", "🎭", "灵感摔跤手", "把规则当玩具，把辩论当暖身", "有趣是生产力的入场券", "你不是抬杠，你是在压力测试现实。"],
    ["INFJ-灯塔", "Lighthouse INFJ", "🕊️", "深层导航", "看见人心，也守住边界", "温柔需要脊梁", "你不是敏感，你是高清接收器。"],
    ["INFP-诗核", "Poem Core INFP", "🌙", "价值守护", "世界吵闹，你坚持自己的滤镜", "真实比讨好更浪漫", "你不是玻璃心，你是高精度情感镜头。"],
    ["ENFJ-篝火", "Bonfire ENFJ", "🔥", "气氛总控", "把人点亮，也别把自己烧干", "照顾别人前先加油", "你不是好说话，你是默认开启救援模式。"],
    ["ENFP-烟花", "Firework ENFP", "✨", "热情弹幕", "连接一切，再学会收口", "热情可贵，完成更勇敢", "你不是三分钟热度，你是多线程人生。"],
    ["ISTJ-城墙", "Wall ISTJ", "🧱", "秩序工匠", "靠谱是最长情的浪漫", "稳定是高级能力", "你不是死板，你是防崩溃补丁。"],
    ["ISFJ-暖库", "Warm Vault ISFJ", "🫖", "默默补给", "记得所有细节，也记得休息", "被需要不是义务", "你不是老好人，你是有边界的补给站。"],
    ["ESTJ-调度", "Dispatch ESTJ", "📋", "现场指挥官", "流程救场，结果说话", "清晰是对团队的尊重", "你不是控制欲，你是怕混乱吞人。"],
    ["ESFJ-管家", "House Captain ESFJ", "🎀", "关系维护员", "场面和人心都要照顾", "和谐不是和稀泥", "你不是爱操心，你是默认打开群体雷达。"],
    ["ISTP-拆解", "Tear-down ISTP", "🛠️", "冷静技师", "少说话，多修好", "能力是最好的解释", "你不是冷淡，你是在动手而不是开发布会。"],
    ["ISFP-滤镜", "Filter ISFP", "🎨", "审美游侠", "用感受校准世界", "美是活着的证据", "你不是矫情，你是在保护感官预算。"],
    ["ESTP-现开", "Live Wire ESTP", "⚡", "现场玩家", "先冲再调，临场最强", "行动是最快的思考", "你不是莽，你是低延迟决策。"],
    ["ESFP-舞台", "Stage ESFP", "🎤", "快乐广播", "把瞬间过成电影", "快乐也需要管理", "你不是吵，你是把气氛从待机唤醒。"],
    ["社死幸存者", "Cringe Survivor", "🙈", "尴尬转化器", "把社死炼成谈资", "尴尬训练影分身", "你不是社恐，你是有经验的翻车老司机。"],
    ["DDL法师", "Deadline Mage", "⏰", "截止炼金", "压力一来灵感上班", "完成比完美更成人", "你不是懒，你是靠最后五分钟超频。"],
    ["已读不回仙人", "Seen-No-Reply Immortal", "📵", "边界修行", "沉默也是回复", "已读不回是边界艺术", "你不是高冷，你是在做电量管理。"],
    ["表情包外交官", "Sticker Diplomat", "🐸", "幽默谈判", "用梗卸压，用态度成交", "幽默是高级防御", "你不是不正经，你是用笑完成沟通。"],
    ["群聊政治家", "Groupchat Politician", "🗳️", "舆论导航", "读空气比读消息快", "热闹不等于亲密", "你不是戏多，你是群聊版本的雷达站。"],
    ["低电量隐士", "Low-Battery Hermit", "🔋", "回血专家", "社交有额度，独处是充电桩", "低电量别做高难度人格运算", "你不是不合群，你是在防止关机。"],
    ["清单修道士", "Checklist Monk", "✅", "闭环信徒", "勾完一项就多一点自由", "秩序是安全感", "你不是强迫症，你是反混乱工程师。"],
    ["灵感流浪者", "Idea Nomad", "🌀", "点子游牧", "点子很多，落地要地图", "灵感要配施工队", "你不是善变，你是版本迭代太勤。"],
    ["共情海绵", "Empathy Sponge", "🧽", "情绪吸收", "别人的雨会淋到你", "看见不等于替扛", "你不是软弱，你是默认开了情绪蓝牙。"],
    ["逻辑手术刀", "Logic Scalpel", "🗡️", "问题解剖", "先分清事实和情绪", "清晰是温柔", "你不是冷血，你是先止血再拥抱。"],
    ["即兴冲浪手", "Improv Surfer", "🌊", "状态玩家", "计划可改，窗口先冲", "弹性是智慧", "你不是随意，你是高适配系统。"],
    ["边界建筑师", "Boundary Architect", "🚧", "关系工程", "门上有锁也有钥匙", "会说不才会好好说好", "你不是难相处，你是防过载设计。"],
    ["复盘哲学家", "Review Philosopher", "📜", "事后清明", "把翻车写成说明书", "失败是样本不是判决", "你不是爱后悔，你是在升级固件。"],
    ["快乐工程师", "Joy Engineer", "🎉", "快乐施工", "把好玩做成可持续", "有趣要配靠谱", "你不是只想玩，你是在给生活装加速器。"],
    ["夜猫思想家", "Night Owl Thinker", "🦉", "凌晨清醒", "白天待机，夜晚编译", "节奏比期待重要", "你不是颠倒，你是时区不同。"],
    ["人间观察员", "Human Observer", "👀", "现场田野", "先看懂再出手", "观察是参与的前奏", "你不是局外人，你是在加载地图。"],
    ["温和硬核党", "Softcore Hardcore", "🧊", "柔中带钢", "语气软，底线硬", "温柔需要脊梁", "你不是好欺负，你是礼帽下藏盔甲。"],
    ["补丁人生家", "Patch-Note Human", "🧩", "迭代选手", "每天发一小版更稳的自己", "丑一点也能跑", "你不是反复横跳，你是持续发布。"]
  ];

  variants.forEach((v, idx) => {
    const maybeCode = v[0].slice(0, 4);
    const code = /^[EI][NS][TF][JP]$/.test(maybeCode) ? maybeCode : "EXT";
    codex.push({
      id: "X" + String(idx + 1).padStart(2, "0"),
      kind: "extended",
      code,
      name: bi(v[0], v[1]),
      english: v[1],
      emoji: v[2],
      animal: bi(v[3], v[3]),
      fantasy: bi(v[3] + "职业形态", v[3] + " career form"),
      vibe: bi(v[4], v[4]),
      philosophy: bi(v[5], v[5]),
      analysis: bi(v[4] + "。这是增强图鉴扩展卡，帮你对照生活形态。", v[4] + ". Extended codex card for life-form mapping."),
      snark: bi(v[6], v[6]),
      traits: list([v[3], "搞笑有哲理", "生活可对照"], [v[3], "funny+wise", "life mirror"]),
      strengths: list(["识别自己", "讲出人话", "能笑也能改"], ["self-spot", "plain talk", "laugh and fix"]),
      watchouts: list(["别标签锁死", "别只拿来玩梗"], ["don't lock labels", "don't meme-only"]),
      growth: bi("把好笑的自我认知，转成明天可执行的一小步。", "Turn funny self-awareness into one doable step tomorrow."),
      slogan: bi(v[5], v[5]),
      meme: bi(v[6], v[6]),
      loveStyle: bi("先理解节奏，再谈亲密配方。", "Understand tempo before intimacy recipes."),
      workStyle: bi("发挥形态优势，补上短板流程。", "Use form strengths; patch process gaps."),
      socialBuff: bi("让同类秒懂，让异类少误会。", "Same-types get you; others misread less."),
      socialDebuff: bi("被贴标签时记得抗议一下。", "Protest when over-labeled."),
      bestScene: bi("需要自嘲和清醒同时在场时。", "When self-roast and clarity are both needed."),
      worstScene: bi("被逼表演单一人设时。", "When forced into one persona.")
    });
  });
  return codex;
}

const QUESTION_BANK = buildBank();
const QUESTIONS = (() => {
  const out = [];
  ["EI", "SN", "TF", "JP"].forEach((axis) => {
    out.push.apply(out, shuffle(QUESTION_BANK.filter((q) => q.axis === axis)).slice(0, 12));
  });
  return shuffle(out).map((q, i) => Object.assign({}, q, { id: i + 1 }));
})();
const CODEX = makeCodex(TYPES);

UI_TEXT.zh = Object.assign({}, UI_TEXT.zh, {
  brandSub: "2000+题库 · 每次随机48题 · 图鉴49+",
  homeTitle: "从两千多道离谱题里，抽中你的人间副本",
  homeLead: "题库 2000+ 情景，分类与选项逻辑对齐。每次均衡抽取 48 题，金句够多够疯。答完可投稿题目，题库自动更新；增强图鉴 49+ 张。微信/QQ 内置浏览器可直接作答。",
  feature1Title: "2000+ 不重复抽题",
  feature1Text: "按维度均衡抽样，重测像开新地图。",
  feature2Title: "图鉴49+加量",
  feature2Text: "16型核心 + 扩展形态，好笑也有哲理。",
  feature3Title: "答完可投稿",
  feature3Text: "你的题目审过后进入题库，自动去重更新。",
  aboutBody: "纯前端趣味测试 + 本地投稿接口。题库 2000+，每次随机 48 题。微信/QQ 内置浏览器可直接作答。娱乐向，有参考性，不是专业评估。",
  bankMeta: "题库 {bank} 题 · 本局 {n} 题",
  typesTitle: "增强图鉴（49+）",
  typesLead: "16 型核心卡 + 扩展生活形态卡。气质、哲理、恋爱、工作、社交 buff/debuff、名场面、口头禅。",
  contributeTitle: "给题库投稿一题",
  contributeLead: "答完也能贡献段子。题目会去重并自动进入用户题库。",
  contributeAxis: "维度",
  contributeText: "题干",
  contributeQuote: "金句",
  contributeOptA: "选项A",
  contributeOptB: "选项B",
  contributeOptC: "选项C",
  contributeOptD: "选项D",
  contributeSubmit: "提交到题库",
  contributeOk: "已收录，题库已更新",
  contributeDup: "这题太眼熟了，已去重跳过",
  contributeFail: "提交失败，已先保存在本机",
  contributeHint: "四选项需分别对应维度两端（如 EI 用 E/I）",
  inAppTitle: "微信/QQ 内可直接作答",
  inAppLead: "不用跳外部浏览器，当前页就能测完、看结果、投稿。",
  codexCount: "图鉴 {n} 张",
  openInBrowser: "如需系统浏览器可点这里（非必须）"
});

UI_TEXT.en = Object.assign({}, UI_TEXT.en, {
  brandSub: "2000+ bank · 48 random · 49+ codex",
  homeTitle: "Draw your chaotic dungeon from 2000+ prompts",
  homeLead: "2000+ coherent scenarios. Each run samples 48 balanced questions. Rich quotes. Contribute after results; bank auto-updates. Codex 49+. Works inside WeChat/QQ.",
  feature1Title: "2000+ unique draws",
  feature1Text: "Axis-balanced sampling; retakes feel new.",
  feature2Title: "Codex 49+",
  feature2Text: "16 cores + extended life forms, funny and wise.",
  feature3Title: "Contribute after test",
  feature3Text: "Your prompts enter the bank with dedupe.",
  aboutBody: "Front-end fun quiz + local contribute API. 2000+ bank, 48 random each run. Works inside WeChat/QQ webviews. Entertaining, not clinical.",
  bankMeta: "Bank {bank} · This run {n}",
  typesTitle: "Enhanced Codex (49+)",
  typesLead: "16 core cards + extended life-form cards with vibe, philosophy, love/work, buffs/debuffs, scenes, catchphrases.",
  contributeTitle: "Contribute a question",
  contributeLead: "Add a funny prompt after your result. Dedupe + auto bank update.",
  contributeAxis: "Axis",
  contributeText: "Prompt",
  contributeQuote: "Quote",
  contributeOptA: "Option A",
  contributeOptB: "Option B",
  contributeOptC: "Option C",
  contributeOptD: "Option D",
  contributeSubmit: "Submit to bank",
  contributeOk: "Accepted. Bank updated.",
  contributeDup: "Looks familiar; deduped.",
  contributeFail: "Submit failed; saved locally first.",
  contributeHint: "Four options should map to both poles (e.g. E/I for EI).",
  inAppTitle: "Play inside WeChat/QQ",
  inAppLead: "No external browser needed. Finish, view results, contribute here.",
  codexCount: "Codex {n} cards",
  openInBrowser: "Optional: open system browser"
});

const out =
  "const QUESTION_BANK = " +
  dump(QUESTION_BANK) +
  ";\n\nconst QUESTIONS = " +
  dump(QUESTIONS) +
  ";\n\nconst TYPES = " +
  dump(TYPES) +
  ";\n\nconst CODEX = " +
  dump(CODEX) +
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
console.log("BANK", QUESTION_BANK.length, axes);
console.log("CODEX", CODEX.length);
console.log("QUOTES", quotes.length);
console.log("sample", QUESTION_BANK[0].text.zh);
console.log("sampleOpts", QUESTION_BANK[0].options.map((o) => o.value + ":" + o.label.zh).join(" | "));
