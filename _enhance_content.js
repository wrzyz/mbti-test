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

const { QUESTIONS, TYPES, CAREERS, MATCHES, UI_TEXT } = ctx;

const quoteBank = [
  {
    zh: "金句：尴尬不会杀死人，但会教会你在电梯里修仙。",
    en: "Quote: Awkwardness won’t kill you—it teaches elevator meditation."
  },
  {
    zh: "金句：点子免费，行动收费；拖延最贵，还包邮焦虑。",
    en: "Quote: Ideas are free, action is paid; procrastination is premium with free anxiety shipping."
  },
  {
    zh: "金句：先确认对方要方案还是要回血，再输出，不然你就是人形弹幕。",
    en: "Quote: Check if they want a plan or a HP pack before speaking—or you’re just a walking barrage."
  },
  {
    zh: "金句：计划是理想国，执行是拆迁办；沙发才是最终政权。",
    en: "Quote: Plans are utopia, execution is demolition; the sofa is the final government."
  },
  {
    zh: "金句：社交是充电还是耗电，取决于你的电池型号，不取决于别人的热闹。",
    en: "Quote: Socializing charges or drains you by battery type—not by how loud the room is."
  },
  {
    zh: "金句：认真你就输了？不，认真你才知道自己在哪局游戏。",
    en: "Quote: “Don’t take it seriously”? No—seriousness tells you which game you’re in."
  },
  {
    zh: "金句：人生没有标准答案，但有标准借口；幽默是把借口升级成哲理。",
    en: "Quote: Life has no standard answers, only standard excuses; humor upgrades excuses into philosophy."
  },
  {
    zh: "金句：你不是懒，你是在用最低功耗模式对抗无限待办。",
    en: "Quote: You’re not lazy—you’re running low-power mode against infinite todos."
  },
  {
    zh: "金句：群聊已读不回，是一种当代武术：以静制动。",
    en: "Quote: Read-without-reply is modern martial arts: stillness beats chaos."
  },
  {
    zh: "金句：真相往往不温柔，但包装成笑话后，它会坐到你旁边。",
    en: "Quote: Truth isn’t gentle, but dressed as a joke it will sit next to you."
  },
  {
    zh: "金句：选择困难不是病，是大脑在做风险对冲。",
    en: "Quote: Choice paralysis isn’t illness—your brain is hedging risk."
  },
  {
    zh: "金句：朋友圈精修，现实毛边；成熟是允许两者同时在线。",
    en: "Quote: Feed is polished, life has burrs; maturity is letting both stay online."
  },
  {
    zh: "金句：你不是内耗，你是给人生开了太多后台程序。",
    en: "Quote: You’re not overthinking—you launched too many background processes."
  },
  {
    zh: "金句：会哭的人先有糖？不，会表达边界的人先有尊严。",
    en: "Quote: Not “cry first, candy later”—people with boundaries get dignity first."
  },
  {
    zh: "金句：效率的尽头是空白，空白的尽头是你真正想做的事。",
    en: "Quote: Efficiency ends in blank space; blank space reveals what you actually want."
  },
  {
    zh: "金句：别把热闹当亲密，别把沉默当冷漠。",
    en: "Quote: Don’t mistake noise for intimacy, or silence for coldness."
  },
  {
    zh: "金句：成年人的崩溃很安静，像电脑风扇突然开始唱歌。",
    en: "Quote: Adult meltdowns are quiet—like a fan suddenly singing opera."
  },
  {
    zh: "金句：你追的不是完美，是可控；而人生最爱随机掉落。",
    en: "Quote: You chase control, not perfection; life loves random loot drops."
  },
  {
    zh: "金句：幽默是高级防御，哲理是把防御改成导航。",
    en: "Quote: Humor is advanced defense; philosophy turns defense into navigation."
  },
  {
    zh: "金句：别急着成为别人喜欢的版本，先成为自己能住进去的版本。",
    en: "Quote: Don’t rush to be liked—first become a version you can live inside."
  },
  {
    zh: "金句：加班不是忠诚，睡眠才是可持续输出的基础设施。",
    en: "Quote: Overtime isn’t loyalty; sleep is infrastructure for sustainable output."
  },
  {
    zh: "金句：你的嘴可以很快，你的心可以很慢；别让节奏互相绑架。",
    en: "Quote: Mouth can be fast, heart can be slow—don’t let tempos kidnap each other."
  },
  {
    zh: "金句：所谓成熟，就是知道什么时候认真，什么时候摆烂得体面。",
    en: "Quote: Maturity is knowing when to care, and when to flop with dignity."
  },
  {
    zh: "金句：世界很吵，但你的节奏可以很小声且正确。",
    en: "Quote: The world is loud; your tempo can be quiet and still correct."
  },
  {
    zh: "金句：不是所有桥都要过，有些桥只是用来证明你还会游泳。",
    en: "Quote: Not every bridge must be crossed—some just prove you can still swim."
  },
  {
    zh: "金句：你越想证明自己，越像在给别人打工；先证明给日子看。",
    en: "Quote: The more you prove yourself to others, the more you work for them—prove it to your days."
  },
  {
    zh: "金句：快乐不是连续剧，是短视频；连着刷也会腻，停一下更香。",
    en: "Quote: Joy isn’t a series—it’s short clips; even joy needs a pause."
  },
  {
    zh: "金句：边界不是墙，是门：你有钥匙，别人才知道怎么进来。",
    en: "Quote: Boundaries aren’t walls—they’re doors with keys."
  },
  {
    zh: "金句：失败不可怕，可怕的是用同一套借口升级成人格。",
    en: "Quote: Failure isn’t scary; turning one excuse into a personality is."
  },
  {
    zh: "金句：你不是不够努力，你是努力的方向像散装烟花。",
    en: "Quote: You’re not underworking—your effort is fireworks without a target."
  },
  {
    zh: "金句：有些关系靠聊，有些关系靠懂；最贵的是被懂还不用解释。",
    en: "Quote: Some bonds need talk, some need knowing; rarest is being understood without footnotes."
  },
  {
    zh: "金句：人生像团建：有人抢麦，有人找逃生通道，都算参与。",
    en: "Quote: Life is team-building: some grab the mic, some map exits—both count as attending."
  },
  {
    zh: "金句：别用别人的高光当自己的进度条。",
    en: "Quote: Don’t use someone else’s highlight reel as your progress bar."
  },
  {
    zh: "金句：情绪是天气，性格是气候；别因为一场暴雨否定整座城。",
    en: "Quote: Mood is weather, personality is climate—don’t condemn a city for one storm."
  },
  {
    zh: "金句：你会不会被喜欢，常常取决于你敢不敢先喜欢自己一点点。",
    en: "Quote: Being liked often starts with daring to like yourself a little first."
  },
  {
    zh: "金句：真正的自由，是你说“不”的时候，声音不抖。",
    en: "Quote: Real freedom is saying no without your voice shaking."
  },
  {
    zh: "金句：把人生过成段子，不是逃避，是降维打击苦难。",
    en: "Quote: Turning life into bits isn’t escape—it’s dimensional damage to suffering."
  },
  {
    zh: "金句：你缺的不是鸡汤，是一把能关掉通知的勇气。",
    en: "Quote: You don’t need more soup—you need courage to mute notifications."
  },
  {
    zh: "金句：关系里最浪漫的不是甜，是准时和靠谱。",
    en: "Quote: Romance isn’t only sweetness—it’s punctual and reliable."
  },
  {
    zh: "金句：别急着赢，先别把自己弄丢。",
    en: "Quote: Don’t rush to win; first don’t lose yourself."
  },
  {
    zh: "金句：聪明是知道规则，智慧是知道何时可以不守无聊的规则。",
    en: "Quote: Smart knows the rules; wise knows when boring rules can be skipped."
  },
  {
    zh: "金句：你以为在选择道路，其实在选择要和谁一起耗电。",
    en: "Quote: You think you’re choosing a path—you’re choosing who drains your battery."
  },
  {
    zh: "金句：成年人的浪漫：把焦虑折叠好，再去吃饭。",
    en: "Quote: Adult romance: fold the anxiety neatly, then go eat."
  },
  {
    zh: "金句：别把“忙”当人格，把“有边界的忙”当能力。",
    en: "Quote: Don’t make “busy” a personality; make bounded busyness a skill."
  },
  {
    zh: "金句：有时候停下不是放弃，是给灵魂换轮胎。",
    en: "Quote: Stopping isn’t quitting—it’s changing your soul’s tires."
  },
  {
    zh: "金句：你越怕无聊，越容易被热闹绑架。",
    en: "Quote: The more you fear boredom, the easier noise kidnaps you."
  },
  {
    zh: "金句：笑点低不可耻，笑点稳才是生存技能。",
    en: "Quote: Easy laughter isn’t shameful; stable humor is a survival skill."
  },
  {
    zh: "金句：测人格不是给自己贴牢笼，是给人生开张使用说明书。",
    en: "Quote: A type test isn’t a cage—it’s a user manual for your life."
  }
];

const optionFlavor = [
  [
    { zh: "先整活暖场，把冷空气笑化了", en: "Warm the room with bits until ice melts", hintZh: "人形热空调", hintEn: "Human heater" },
    { zh: "微笑点头，灵魂已打开飞行模式", en: "Smile and nod while soul goes airplane mode", hintZh: "社交隐身", hintEn: "Social stealth" },
    { zh: "精准抛一个话题，像投放探测气球", en: "Drop one precise topic like a probe balloon", hintZh: "可控社交", hintEn: "Controlled social" },
    { zh: "假装看手机，实则在写逃跑剧本", en: "Fake-scroll phone while drafting escape", hintZh: "战术撤退", hintEn: "Tactical retreat" }
  ],
  [
    { zh: "直接开脑暴，白板先被我占领", en: "Brainstorm first, claim the whiteboard", hintZh: "灵感开火", hintEn: "Idea open fire" },
    { zh: "先要数据，没有证据不谈梦想", en: "Demand data; no evidence, no dream talk", hintZh: "实证派", hintEn: "Evidence mode" },
    { zh: "给三个方案：稳、疯、能交差", en: "Offer three plans: safe, wild, submitable", hintZh: "现实魔法", hintEn: "Practical magic" },
    { zh: "先问截止日期，再决定要不要哲学", en: "Ask the deadline before philosophy", hintZh: "DDL神学", hintEn: "Deadline theology" }
  ]
];

function pickQuote(i) {
  return quoteBank[i % quoteBank.length];
}

function boostQuestion(q, i) {
  const quote = pickQuote(i);
  q.quote = { zh: quote.zh, en: quote.en };

  // Make kicker punchier while keeping axis tag.
  if (q.kicker && q.kicker.zh) {
    const axis = q.axis || "";
    const kickers = {
      EI: { zh: "社死或社牛 · E/I", en: "Cringe or Charge · E/I" },
      SN: { zh: "细节侦探局 · S/N", en: "Detail Detective · S/N" },
      TF: { zh: "理智与心软对决 · T/F", en: "Logic vs Soft Heart · T/F" },
      JP: { zh: "计划与摆烂议会 · J/P", en: "Plan vs Flow Council · J/P" }
    };
    if (kickers[axis]) q.kicker = kickers[axis];
  }

  // Slightly punch option hints if short.
  if (Array.isArray(q.options)) {
    q.options = q.options.map((opt, idx) => {
      const next = Object.assign({}, opt);
      if (!next.hint) next.hint = { zh: "人性选项", en: "Human option" };
      if (next.hint && next.hint.zh && next.hint.zh.length < 4) {
        next.hint = {
          zh: next.hint.zh + "·很真实",
          en: (next.hint.en || "real") + " · very real"
        };
      }
      // Ensure label exists
      if (next.label && next.label.zh && !/[。！？!?…]$/.test(next.label.zh) && next.label.zh.length < 10) {
        next.label = {
          zh: next.label.zh,
          en: next.label.en
        };
      }
      return next;
    });
  }
  return q;
}

QUESTIONS.forEach((q, i) => boostQuestion(q, i));

const typeExtra = {
  INTJ: {
    vibe: { zh: "冷静军师，内心有张长期作战地图", en: "Cool strategist with a long campaign map" },
    philosophy: { zh: "先把世界看穿，再决定要不要手下留情。", en: "See through the world first, then choose mercy." },
    loveStyle: { zh: "慢热但专一，喜欢用行动代替情话。", en: "Slow-burn loyal; actions over sweet talk." },
    workStyle: { zh: "目标拆解狂魔，讨厌无效会议。", en: "Goal-decomposer; allergic to useless meetings." },
    socialBuff: { zh: "关键时刻能一针见血", en: "Cuts to the point in crisis" },
    socialDebuff: { zh: "日常可能像人形防火墙", en: "Can feel like a human firewall daily" },
    meme: { zh: "我不是高冷，我是电量管理系统严格。", en: "Not cold—strict battery management." },
    bestScene: { zh: "复杂项目、长期布局、独立攻坚", en: "Complex projects, long games, solo raids" },
    worstScene: { zh: "突然团建、即兴尬聊、无意义加班", en: "Surprise bonding, improv small talk, pointless OT" }
  },
  INTP: {
    vibe: { zh: "思维实验室常驻研究员", en: "Resident of the idea lab" },
    philosophy: { zh: "问题比答案有趣，过程比结论诚实。", en: "Questions beat answers; process is more honest than conclusions." },
    loveStyle: { zh: "用分享怪知识表达喜欢。", en: "Shows love by sharing weird knowledge." },
    workStyle: { zh: "拆概念、建模型、讨厌拍脑袋。", en: "Breaks concepts, builds models, hates gut-only calls." },
    socialBuff: { zh: "能把混乱讨论理出结构", en: "Structures chaotic talks" },
    socialDebuff: { zh: "聊着聊着进入平行宇宙", en: "Drifts into a parallel universe mid-chat" },
    meme: { zh: "我不是迟钝，我在后台渲染。", en: "Not slow—rendering in the background." },
    bestScene: { zh: "研究、写作、系统优化", en: "Research, writing, systems" },
    worstScene: { zh: "强行社交、频繁打断、空洞KPI", en: "Forced socializing, constant interrupts, empty KPIs" }
  },
  ENTJ: {
    vibe: { zh: "进度条本人，走路带风带DDL", en: "A walking progress bar with deadlines" },
    philosophy: { zh: "方向对了，努力才不是自我感动。", en: "Effort only counts when direction is right." },
    loveStyle: { zh: "强势但护短，喜欢共同升级。", en: "Bold and protective; loves leveling up together." },
    workStyle: { zh: "决策快、标准高、执行猛。", en: "Fast decisions, high bar, hard execution." },
    socialBuff: { zh: "能带队冲锋", en: "Leads the charge" },
    socialDebuff: { zh: "有时像人形催更器", en: "Can feel like a human reminder bot" },
    meme: { zh: "不是我凶，是时间在凶。", en: "I’m not fierce—time is." },
    bestScene: { zh: "管理、创业、关键推进", en: "Management, startups, crisis pushes" },
    worstScene: { zh: "无目标闲聊、低效扯皮", en: "Aimless chat, low-efficiency drama" }
  },
  ENTP: {
    vibe: { zh: "辩论场加速器，点子批发商", en: "Debate accelerator and idea wholesaler" },
    philosophy: { zh: "先把可能性展开，再谈谁对谁错。", en: "Expand possibilities before verdicts." },
    loveStyle: { zh: "互怼是调情，无聊是分手预警。", en: "Sparring is flirting; boredom is a breakup alert." },
    workStyle: { zh: "破局、提案、临场反应拉满。", en: "Breaks deadlocks, pitches, improvises hard." },
    socialBuff: { zh: "把冷场变成脱口秀", en: "Turns silence into a talk show" },
    socialDebuff: { zh: "有时抬杠像呼吸", en: "Sometimes argues like breathing" },
    meme: { zh: "我不是抬杠，我是在压力测试逻辑。", en: "Not arguing—stress-testing logic." },
    bestScene: { zh: "创意提案、谈判、创新实验", en: "Creative pitches, negotiation, experiments" },
    worstScene: { zh: "死板流程、重复劳动、禁止提问", en: "Rigid process, repetition, no questions" }
  },
  INFJ: {
    vibe: { zh: "温柔雷达，擅长听懂潜台词", en: "Gentle radar for subtext" },
    philosophy: { zh: "看见人心，不等于要替人扛下全部风雨。", en: "Seeing hearts doesn’t mean carrying every storm." },
    loveStyle: { zh: "深度连接党，讨厌敷衍式陪伴。", en: "Deep-bond type; hates half-present company." },
    workStyle: { zh: "意义驱动，擅长长期育人与规划。", en: "Meaning-driven; long-term mentoring and planning." },
    socialBuff: { zh: "给人被理解的安全感", en: "Makes people feel understood" },
    socialDebuff: { zh: "容易默默耗尽电量", en: "Quietly drains battery" },
    meme: { zh: "我看起来平静，其实内心在开战略会。", en: "I look calm; inside is a strategy meeting." },
    bestScene: { zh: "咨询、创作、组织文化", en: "Counseling, creative work, culture" },
    worstScene: { zh: "虚伪应酬、价值错位的环境", en: "Fake socializing, misaligned values" }
  },
  INFP: {
    vibe: { zh: "理想主义旅人，口袋里装着小宇宙", en: "Idealist traveler with a pocket universe" },
    philosophy: { zh: "世界可以吵，内心得有自己的灯。", en: "World can be loud; keep a lamp inside." },
    loveStyle: { zh: "细腻真挚，需要被认真对待。", en: "Tender and sincere; needs real care." },
    workStyle: { zh: "价值对齐才有动力，适合创作表达。", en: "Needs value alignment; thrives in expression." },
    socialBuff: { zh: "能把人的柔软接住", en: "Catches people’s soft spots safely" },
    socialDebuff: { zh: "冲突来时可能原地蒸发", en: "May evaporate during conflict" },
    meme: { zh: "我不是玻璃心，我是高精度情绪传感器。", en: "Not fragile—high-precision emotion sensor." },
    bestScene: { zh: "写作、设计、心理支持、独立创作", en: "Writing, design, support, indie creating" },
    worstScene: { zh: "冷血竞争、价值羞辱、无意义打卡", en: "Cold competition, value shaming, empty check-ins" }
  },
  ENFJ: {
    vibe: { zh: "人群充电器，天生场控位", en: "Crowd charger and natural host" },
    philosophy: { zh: "成就别人，不等于牺牲自己。", en: "Lifting others shouldn’t erase you." },
    loveStyle: { zh: "热烈负责，喜欢共同成长剧本。", en: "Warm and responsible; co-growth storyline." },
    workStyle: { zh: "协调、激励、把团队捏成一股绳。", en: "Coordinates, motivates, binds teams." },
    socialBuff: { zh: "气氛组组长本组", en: "Head of vibe operations" },
    socialDebuff: { zh: "太想照顾所有人", en: "Tries to care for everyone" },
    meme: { zh: "我不是好说话，我是默认开启助人模式。", en: "Not soft—help mode is on by default." },
    bestScene: { zh: "教育、社群、管理、公关", en: "Education, community, management, PR" },
    worstScene: { zh: "孤立无援、价值被忽视", en: "Isolation, ignored values" }
  },
  ENFP: {
    vibe: { zh: "行走的灵感弹幕，热度常年在线", en: "Walking inspiration barrage, always hot" },
    philosophy: { zh: "热情可贵，完成更勇敢。", en: "Passion is precious; finishing is braver." },
    loveStyle: { zh: "浪漫即兴，需要自由也需要回应。", en: "Romantic improv; needs freedom and response." },
    workStyle: { zh: "创意连接器，适合打开新局面。", en: "Creative connector; opens new fronts." },
    socialBuff: { zh: "三句话让场面活过来", en: "Revives rooms in three lines" },
    socialDebuff: { zh: "兴趣标签页开太多", en: "Too many interest tabs" },
    meme: { zh: "我不是三分钟热度，我是多线程人生。", en: "Not short heat—multithreaded life." },
    bestScene: { zh: "内容、活动、跨界合作", en: "Content, events, cross-collab" },
    worstScene: { zh: "枯燥流水线、长期压抑表达", en: "Dull pipelines, suppressed expression" }
  },
  ISTJ: {
    vibe: { zh: "秩序守护者，靠谱本靠谱", en: "Order guardian, reliability incarnate" },
    philosophy: { zh: "把小事做对，大事才站得住。", en: "Get small things right so big things stand." },
    loveStyle: { zh: "稳定付出，用陪伴代替表演。", en: "Stable care; presence over performance." },
    workStyle: { zh: "流程清晰、责任到人、结果可追。", en: "Clear process, ownership, traceable results." },
    socialBuff: { zh: "关键时最能托底", en: "Best foundation in crisis" },
    socialDebuff: { zh: "变化太快会皱眉", en: "Frowns at rapid change" },
    meme: { zh: "我不是古板，我是防翻车系统。", en: "Not rigid—anti-crash system." },
    bestScene: { zh: "审计、运营、质量管理、行政", en: "Audit, ops, QA, admin" },
    worstScene: { zh: "毫无规则的混乱局", en: "Rule-free chaos" }
  },
  ISFJ: {
    vibe: { zh: "温柔后勤部，默默把一切安好", en: "Gentle logistics, quietly fixing everything" },
    philosophy: { zh: "照顾别人之前，先把自己的灯加油。", en: "Refuel your lamp before lighting others." },
    loveStyle: { zh: "细水长流，记得你随口提过的小事。", en: "Long-flow care; remembers small mentions." },
    workStyle: { zh: "支持型高手，细节与责任拉满。", en: "Support expert; details and duty maxed." },
    socialBuff: { zh: "让人感到被妥善安放", en: "Makes people feel safely placed" },
    socialDebuff: { zh: "不说出口的委屈会堆积", en: "Unspoken hurt stacks up" },
    meme: { zh: "我不是好欺负，我只是先忍了三秒。", en: "Not weak—I just waited three seconds." },
    bestScene: { zh: "护理、客户成功、教育支持", en: "Care, CS, education support" },
    worstScene: { zh: "被持续索取且不被看见", en: "Constant taking without being seen" }
  },
  ESTJ: {
    vibe: { zh: "现场指挥官，效率强迫症友好", en: "On-site commander, efficiency-friendly" },
    philosophy: { zh: "规则不是束缚，是少踩坑的护栏。", en: "Rules aren’t cages—they’re guardrails." },
    loveStyle: { zh: "直接明确，承诺说到做到。", en: "Direct and clear; promises kept." },
    workStyle: { zh: "目标、分工、复盘，一条龙。", en: "Goals, roles, reviews—full pipeline." },
    socialBuff: { zh: "能把一盘散沙拧成绳", en: "Turns loose sand into rope" },
    socialDebuff: { zh: "语气可能像通告", en: "Tone can sound like an announcement" },
    meme: { zh: "不是我管太多，是放养会出事。", en: "Not controlling—free-range causes incidents." },
    bestScene: { zh: "管理、项目交付、运营统筹", en: "Management, delivery, ops" },
    worstScene: { zh: "无纪律团队、模糊责任", en: "Undisciplined teams, blurry ownership" }
  },
  ESFJ: {
    vibe: { zh: "人际关系润滑剂，气氛稳定器", en: "Social lubricant and vibe stabilizer" },
    philosophy: { zh: "被需要很好，被尊重更好。", en: "Being needed is nice; being respected is better." },
    loveStyle: { zh: "用心经营仪式感与日常照顾。", en: "Builds rituals and daily care." },
    workStyle: { zh: "协调资源、照顾体验、维护关系。", en: "Coordinates resources, UX, relationships." },
    socialBuff: { zh: "谁尴尬都会被你救", en: "Saves anyone from awkwardness" },
    socialDebuff: { zh: "太在意评价会内耗", en: "Overcares about opinions" },
    meme: { zh: "我不是爱操心，我是预装了关怀系统。", en: "Not nosy—care system preinstalled." },
    bestScene: { zh: "社群、HR、客户关系、活动", en: "Community, HR, CR, events" },
    worstScene: { zh: "冷漠竞争、孤立任务", en: "Cold rivalry, isolated tasks" }
  },
  ISTP: {
    vibe: { zh: "冷静修理工，问题来了先动手", en: "Cool fixer; hands first when problems arrive" },
    philosophy: { zh: "少说多做，世界会诚实反馈。", en: "Less talk, more do—the world replies honestly." },
    loveStyle: { zh: " dedicates through help, not speeches.", en: "Loves by fixing, not speeching." },
    workStyle: { zh: "实操强、应变快、讨厌空谈。", en: "Hands-on, adaptive, anti-empty-talk." },
    socialBuff: { zh: "关键现场最稳的那个人", en: "Steadiest person on-site" },
    socialDebuff: { zh: "情绪沟通可能像说明书", en: "Emotion talk may sound like a manual" },
    meme: { zh: "我不是冷漠，我在看哪里能拧紧。", en: "Not cold—scanning what to tighten." },
    bestScene: { zh: "工程、技术排查、现场处理", en: "Engineering, debugging, field work" },
    worstScene: { zh: "漫长会议、情绪拉扯", en: "Endless meetings, emotional tug-of-war" }
  },
  ISFP: {
    vibe: { zh: "美学流浪者，安静但有主见", en: "Aesthetic wanderer, quiet with spine" },
    philosophy: { zh: "美不是奢侈，是活着的证据。", en: "Beauty isn’t luxury—it’s proof of living." },
    loveStyle: { zh: "温柔陪伴，用感受确认关系。", en: "Gentle presence; feels the bond." },
    workStyle: { zh: "手感与审美驱动，适合创作落地。", en: "Craft and taste driven; makes beauty real." },
    socialBuff: { zh: "给人松弛的真实感", en: "Gives relaxed realness" },
    socialDebuff: { zh: "压力大时容易缩回去", en: "Retreats under heavy pressure" },
    meme: { zh: "我不是摆烂，我在保护灵感湿度。", en: "Not flopping—protecting inspiration humidity." },
    bestScene: { zh: "设计、艺术、体验、手工", en: "Design, art, experience, craft" },
    worstScene: { zh: "粗暴管理、审美被踩", en: "Harsh management, taste stomped" }
  },
  ESTP: {
    vibe: { zh: "现场冲锋队，刺激是燃料", en: "Field striker; thrills are fuel" },
    philosophy: { zh: "机会不等人，犹豫会过期。", en: "Chance won’t wait; hesitation expires." },
    loveStyle: { zh: "热烈直接，一起玩才是恋爱。", en: "Bold and direct; play is love language." },
    workStyle: { zh: "抢跑、试错、临场决策。", en: "Sprints, tests, live decisions." },
    socialBuff: { zh: "带动全场行动力", en: "Boosts group action" },
    socialDebuff: { zh: "耐心库存有时告急", en: "Patience inventory can hit zero" },
    meme: { zh: "我不是莽，我是小步快跑版勇敢。", en: "Not reckless—brave in small sprints." },
    bestScene: { zh: "销售、赛事、应急、商务前线", en: "Sales, sports, emergency, frontline biz" },
    worstScene: { zh: "漫长审批、纯理论空转", en: "Long approvals, pure theory loops" }
  },
  ESFP: {
    vibe: { zh: "现场开心果，快乐传染源", en: "Live-room joy source" },
    philosophy: { zh: "认真生活，也认真快乐。", en: "Live earnestly—and joyfully." },
    loveStyle: { zh: "浪漫具体，喜欢制造共同回忆。", en: "Concrete romance; builds shared memories." },
    workStyle: { zh: "表现力强，适合面对人的舞台。", en: "Expressive; thrives on human stages." },
    socialBuff: { zh: "谁郁闷都能被你点亮", en: "Lights up anyone gloomy" },
    socialDebuff: { zh: "长期枯燥会掉血", en: "Long dullness drains HP" },
    meme: { zh: "我不是吵，我是给沉闷世界加BGM。", en: "Not loud—adding BGM to a dull world." },
    bestScene: { zh: "表演、主持、服务体验、达人", en: "Performance, hosting, service, creator" },
    worstScene: { zh: "孤立重复、情绪压抑环境", en: "Isolated repetition, suppressed mood" }
  }
};

// Fix the accidental English-only loveStyle for ISTP
typeExtra.ISTP.loveStyle = {
  zh: "用帮忙和行动表达喜欢，不靠演讲。",
  en: "Loves by helping and doing, not speeching."
};

Object.keys(TYPES).forEach((code) => {
  const info = TYPES[code];
  const extra = typeExtra[code] || {};
  Object.assign(info, extra);

  // Expand lists for denser codex
  const traitZh = (info.traits && info.traits.zh) || [];
  const traitEn = (info.traits && info.traits.en) || [];
  const moreTraits = {
    zh: Array.from(new Set(traitZh.concat([extra.vibe ? extra.vibe.zh.slice(0, 6) : "人间样本", "反差萌", "可被参考"]))).slice(0, 5),
    en: Array.from(new Set(traitEn.concat(["human sample", "contrast charm", "referenceable"]))).slice(0, 5)
  };
  info.traits = moreTraits;

  const strZh = (info.strengths && info.strengths.zh) || [];
  const strEn = (info.strengths && info.strengths.en) || [];
  info.strengths = {
    zh: Array.from(new Set(strZh.concat([extra.socialBuff ? extra.socialBuff.zh : "关键稳定", "独特输出"]))).slice(0, 4),
    en: Array.from(new Set(strEn.concat([extra.socialBuff ? extra.socialBuff.en : "crisis stable", "unique output"]))).slice(0, 4)
  };

  const wZh = (info.watchouts && info.watchouts.zh) || [];
  const wEn = (info.watchouts && info.watchouts.en) || [];
  info.watchouts = {
    zh: Array.from(new Set(wZh.concat([extra.socialDebuff ? extra.socialDebuff.zh : "容易被误解"]))).slice(0, 3),
    en: Array.from(new Set(wEn.concat([extra.socialDebuff ? extra.socialDebuff.en : "easy to misread"]))).slice(0, 3)
  };

  if (!info.growth || !info.growth.zh) {
    info.growth = { zh: "把优点当工具，把缺点当提醒。", en: "Use strengths as tools, flaws as reminders." };
  }
  if (!info.slogan || !info.slogan.zh) {
    info.slogan = extra.meme || { zh: "我是我，说明书稍后送达。", en: "I am me; manual arrives later." };
  }

  // Funniest analysis/snark polish if short
  if (info.analysis && info.analysis.zh && info.analysis.zh.length < 36) {
    info.analysis.zh += "别急着贴标签，先观察你在压力下的默认动作。";
  }
  if (info.snark && info.snark.zh && !info.snark.zh.includes("。")) {
    info.snark.zh += "。";
  }
});

// UI text upgrades
UI_TEXT.zh = Object.assign({}, UI_TEXT.zh, {
  brandTitle: "精神状态速测台",
  brandSub: "48题 · 金句加持 · 搞笑也有哲理",
  homeTitle: "测完你就知道：你是哪种人间操作系统",
  homeLead:
    "48 道离谱情景题，每题 4 个选项 + 一条又好笑又扎心的金句。答完给你认真分析、人间锐评、职业方向、恋爱匹配，以及超详细 16 型图鉴。",
  startBtn: "开始快问快答",
  previewTypes: "先看增强图鉴",
  feature1Title: "金句不是装饰",
  feature1Text: "每题都有搞笑 + 哲理金句，边答边被点醒（也可能被逗笑）。",
  feature2Title: "图鉴不是简介",
  feature2Text: "16 型含气质、哲理、恋爱、工作、社交增益/减益、名场面与避雷场。",
  feature3Title: "手机也能答",
  feature3Text: "同一 Wi‑Fi 打开电脑显示的手机链接，人人都能测。",
  typesTitle: "16 型增强图鉴（加量版）",
  typesLead: "气质、哲理、恋爱风格、工作风格、社交增益/减益、名场面、避雷场、口头禅，一次看够。",
  aboutBody:
    "纯前端趣味测试：48 题四选一，结果只存在你的浏览器。同一 Wi‑Fi 下，用首页「手机访问」里的链接或二维码即可答题。不是专业心理评估，但足够自我观察和社交开聊。",
  researcher: "场控小喇叭",
  researcherLine: "我是小喇叭。每题送你一句金句：好笑是入口，哲理是售后。",
  quoteLabel: "本场金句",
  phoneTitle: "手机访问（同一 Wi‑Fi）",
  phoneLead: "把下面链接发到手机，或扫二维码，人人都能答。",
  phoneCopy: "复制手机链接",
  phoneLocalHint: "若你在电脑打开的是 127.0.0.1，请用局域网地址给手机。",
  phoneReady: "当前地址可直接给手机用",
  codexVibe: "气质",
  codexPhilosophy: "哲理",
  codexLove: "恋爱风格",
  codexWork: "工作风格",
  codexBuff: "社交增益",
  codexDebuff: "社交减益",
  codexBest: "名场面",
  codexWorst: "避雷场",
  codexMeme: "口头禅",
  referenceNote: "结果是四维偏好统计：好玩、可参考，但别当判决书。"
});

UI_TEXT.en = Object.assign({}, UI_TEXT.en, {
  brandTitle: "Mood Stage Quiz",
  brandSub: "48Q · Quotes · Funny with philosophy",
  homeTitle: "Find your human operating system",
  homeLead:
    "48 chaotic scenarios, 4 choices each, plus one funny-and-wise quote per question. Get analysis, roast, careers, matches, and a dense 16-type codex.",
  startBtn: "Start rapid quiz",
  previewTypes: "Open enhanced codex",
  feature1Title: "Quotes matter",
  feature1Text: "Every question ships a humorous, slightly philosophical line.",
  feature2Title: "Codex is dense",
  feature2Text: "Vibe, philosophy, love, work, social buff/debuff, best/worst scenes.",
  feature3Title: "Phone-friendly",
  feature3Text: "Same Wi‑Fi: open the phone link shown on the home page.",
  typesTitle: "16-Type Enhanced Codex (Plus)",
  typesLead: "Vibe, philosophy, love/work styles, social buffs/debuffs, best/worst scenes, catchphrases.",
  aboutBody:
    "Pure front-end fun quiz. 48 questions, 4 choices. Results stay local. On the same Wi‑Fi, use the phone link/QR on the home page. Not a clinical assessment.",
  researcher: "Stage Horn",
  researcherLine: "I’m Horn. One quote per question: humor first, philosophy as after-sales.",
  quoteLabel: "Quote of the question",
  phoneTitle: "Phone access (same Wi‑Fi)",
  phoneLead: "Send this link to your phone or scan the QR so anyone can play.",
  phoneCopy: "Copy phone link",
  phoneLocalHint: "If you opened 127.0.0.1 on desktop, use the LAN URL for phones.",
  phoneReady: "Current URL can be used on phones",
  codexVibe: "Vibe",
  codexPhilosophy: "Philosophy",
  codexLove: "Love style",
  codexWork: "Work style",
  codexBuff: "Social buff",
  codexDebuff: "Social debuff",
  codexBest: "Best scene",
  codexWorst: "Avoid scene",
  codexMeme: "Catchphrase",
  referenceNote: "Result is four-axis preference stats: fun and useful, not a verdict."
});

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

const out =
  "const QUESTIONS = " +
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
console.log("enhanced data.js");
console.log("Q", QUESTIONS.length, "quotes", QUESTIONS.filter((q) => q.quote && q.quote.zh).length);
console.log("type fields sample", Object.keys(TYPES.ENFP).join(","));
