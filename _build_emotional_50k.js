/**
 * Build a >=50k compact bank with emotionally human, conversational options.
 * Inspired by popular MBTI/quiz sites: colloquial, humorous, scenario-specific, no robot speak.
 * The bank is stored in compact form [id,axis,text,quote,kicker,options] in bank.json.
 *
 * Note: This script replaces the entire bank.json with a new generation.
 * Run with: node _build_emotional_50k.js
 */
const fs = require("fs");
const path = require("path");

const root = __dirname;
const bankPath = path.join(root, "bank.json");
const TARGET = 50000;

// Categories (20)
const CATEGORIES = [
  {id:"love",zh:"恋爱",en:"Love",emoji:"💘"},
  {id:"study",zh:"学习",en:"Study",emoji:"📚"},
  {id:"work",zh:"职场",en:"Work",emoji:"💼"},
  {id:"life",zh:"人生",en:"Life",emoji:"🌱"},
  {id:"funny",zh:"搞笑",en:"Funny",emoji:"😂"},
  {id:"anime",zh:"动漫",en:"Anime",emoji:"🎌"},
  {id:"game",zh:"游戏",en:"Games",emoji:"🎮"},
  {id:"family",zh:"家庭",en:"Family",emoji:"🏠"},
  {id:"digital",zh:"社媒",en:"Social",emoji:"📱"},
  {id:"travel",zh:"出行",en:"Travel",emoji:"🚇"},
  {id:"food",zh:"饮食",en:"Food",emoji:"🍜"},
  {id:"money",zh:"金钱",en:"Money",emoji:"💸"},
  {id:"dead",zh:"社死",en:"Cringe",emoji:"😰"},
  {id:"fish",zh:"摸鱼",en:"Slacking",emoji:"🐟"},
  {id:"drama",zh:"追剧",en:"Drama",emoji:"📺"},
  {id:"eat",zh:"干饭",en:"Feast",emoji:"🥟"},
  {id:"sport",zh:"运动",en:"Sport",emoji:"🏃"},
  {id:"pet",zh:"宠物",en:"Pets",emoji:"🐱"},
  {id:"night",zh:"深夜",en:"Night",emoji:"🌙"},
  {id:"friend",zh:"友情",en:"Friends",emoji:"🤝"}
];

const axisMeta = {
  EI:{zh:"社死或社牛",en:"Cringe or Charge",poles:["E","I"]},
  SN:{zh:"细节或脑洞",en:"Detail or Daydream",poles:["S","N"]},
  TF:{zh:"理智或心软",en:"Logic or Soft Heart",poles:["T","F"]},
  JP:{zh:"计划或浪",en:"Plan or Flow",poles:["J","P"]}
};

// Helper: pick random element from arr
function pick(arr,i){return arr[((i%arr.length)+arr.length)%arr.length];}

// Emotional option packs per axis. Each pack is an array of 4 options [value,label,hint].
// The label text is fully humanized, spoken language, with humor/emotion.
function getOptionPacks(axis, hook, variant) {
  // variant 0-4 selects different flavor version within the axis
  const v = variant % 5;
  if (axis === "EI") {
    const packs = [
      [
        ["E","直接开麦怼回去：就着「"+hook+"」来个社牛破冰，让冷场变成我的高光时刻","Charge blurt"],
        ["I","默默在心里翻车：完了完了朋友圈截图都有了…表面微笑：行行行你开心就好","Fake smile"],
        ["E","拉着朋友一起演一出戏：兄弟们上，咱们假装这很正常，顺便吐槽一把","Party up joke"],
        ["I","找个借口溜去洗手间冷静五分钟：别问我为什么，你们继续","Escape heal"]
      ],
      [
        ["E","上台表演：我就让这尴尬变成我的个人秀，全场聚焦我","Stage show"],
        ["I","缩在角落刷手机，心里：希望没人看见我，赶紧装没看见","Hide corner"],
        ["E","抛个轻松问题全场接梗：咱们来玩个游戏吧！","Turn game"],
        ["I","回简短表情包，能聊就聊，不能拉倒，主打一个随缘","Emoji reply"]
      ],
      [
        ["E","笑着接话编段故事：这事我早有耳闻，听我给你圆回来","Joke lore"],
        ["I","先听完再决定：这场景要不要写入我的黑历史？","Think first"],
        ["E","全场一起玩梗：谁还没社死过？一起笑一笑","Dare all"],
        ["I","借口去洗手间冷静五分钟：场面太尴尬我先撤一下","Exit excuse"]
      ],
      [
        ["E","自嘲开场：没错我就是那个尴尬精，咋地吧","Self-roast"],
        ["I","像在旁白：剧情走向越来越不可控了，好家伙","Narrate"],
        ["E","快速组话题链，让尴尬变成群聊段子","Topic chain"],
        ["I","只回必要信息，当它是个可跳过剧情，不深究","Skip scene"]
      ],
      [
        ["E","主动自我介绍：嘿，我就是那个打破沉默的人，来，聊聊","Take charge"],
        ["I","内心OS：这场景我记住了…后续可能会发朋友圈吐槽","Internal OS"],
        ["E","拉着队友一起上场：咱们表演一出双簧，逗大家开心","Team up"],
        ["I"]
      ]
    ];
    return packs[v];
  } else if (axis === "SN") {
    const packs = [
      [
        ["S","先拆步骤：第一步干什么，第二步填什么，连喝水都算上，别瞎蒙","Step by step"],
        ["N","感觉对了就行：方向感这东西不用掰开揉碎，凭直觉走","Vibe first"],
        ["S","列个清单核对：能不能做到，有没有证据，别飘","Checklist"],
        ["N","脑洞大开：先把概念画成草图，细节之后再说","Sketch idea"]
      ],
      [
        ["S","用案例数据钉住：别光说感觉，拿出点干货","Pin data"],
        ["N","先讲可能性：万一有个平行世界呢？","What if"],
        ["S","翻译成检查清单：这个能做吗，那个能行吗？","Check list"],
        ["N","如果呢？如果那样会怎样？打开分支","What-if branch"]
      ],
      [
        ["S","先确认事实边界：真的这么回事吗？还是我在做梦？","Fact border"],
        ["N","先画地图：先整体后局部，别一头扎进细节","Big map"],
        ["S","追问谁/何时/如何：到底啥情况，给我整明白","Ground Q"],
        ["N","先找主题/模式，不急着修零件，先看看格局","Pattern first"]
      ],
      [
        ["S","复盘表格填一行一行证据：别光靠感觉","Review table"],
        ["N","写成故事线：哪里卡住了，谁背锅，编个故事","Storyline"],
        ["S","最小可验证动作：先试一次再说，别光想","MVP"],
        ["N","收集灵感碎片，再拼全貌，慢慢来","Shards"]
      ],
      [
        ["S","三步走：第一步第二步第三步，照着做","3 steps"],
        ["N","倒推理想结局：如果终点是啥，中间咋走？","Reverse"],
        ["S","时间线还原：按时间顺序来一遍，别乱","Timeline"],
        ["N","允许暂时模糊：先保住感觉方向，别较真","Felt dir"]
      ]
    ];
    return packs[v];
  } else if (axis === "TF") {
    const packs = [
      [
        ["T","先讲逻辑：这个事对不对，合不合理，咱理性分析一下","Logic first"],
        ["F","先接情绪：你很难过吧，先说说，咱们一起想办法","Empathy first"],
        ["T","利弊清单列出来：各有什么得失，别靠气氛投票","Pros/cons"],
        ["F","优先关系值：别把人情伤没了，和气生财","Relation first"]
      ],
      [
        ["T","直接指出逻辑漏洞：这里不对，咱们得说道说道","Point out"],
        ["F","软着地说：换个方式会不会好点？委婉一点","Soft words"],
        ["T","定标准：这样行不行，那样行不行，说死","Standards"],
        ["F","先问你需要啥：你来定，我听你的","Ask need"]
      ],
      [
        ["T","事实归事实，别掺情绪，客观点","Fact split"],
        ["F","难受是真的，咱们一起修，抱抱你","Admit hurt"],
        ["T","给个结论：就照这个方案来，别拖了","Conclusion"],
        ["F","先修复信任：这事得先和解，和气第一","Trust first"]
      ],
      [
        ["T","对事不对人：就事论事，别上升到人格","Issue focus"],
        ["F","先让情绪落座：你难受得先坐下，听我说","Seat feel"],
        ["T","必要时说不：这事我做不到，别勉强","Say no"],
        ["F","共情翻译：我听到的是你是不是觉得...","Empathy"]
      ],
      [
        ["T","先定成功标准：做到啥算完，别模糊","Success"],
        ["F","先确认你有没有被看见，别忽视你的感受","Seen"],
        ["T","决策树：如果A就B，否则就C，画个树","Tree"],
        ["F","关心开场：其实我担心的是你的安全","Care open"]
      ]
    ];
    return packs[v];
  } else { // JP
    const packs = [
      [
        ["J","定时间表：几点到几点谁干啥，安排上","Timetable"],
        ["P","留点弹性：计划赶不上变化，正常的事","Flex"],
        ["J","锁定主线：先做最重要的那个，别分心","Mainline"],
        ["P","看现场再说：边做边调整，灵活一点","Live"]
      ],
      [
        ["J","定截止点+责任人：别漂着，盯紧点","Deadlines"],
        ["P","半成品先发：边走边修，先发出去再说","Half-ready"],
        ["J","清理干扰项：专注窗口给这件事，别分心","Focus"],
        ["P","两条备选：防单点掉链，备选一个","Two paths"]
      ],
      [
        ["J","今日必做：干完再浪，今日事今日毕","Must-do"],
        ["P","先感觉走一小段：看看到哪，顺其自然","Follow feel"],
        ["J","中断恢复预案：如果断了怎么办，提前想好","Recovery"],
        ["P","计划当草图：现场版本优先，别死磕草稿","Draft"]
      ],
      [
        ["J","倒推法：从结果往回排，倒着来","Backplan"],
        ["P","先收集信息，不急着锁，多了解点","Gather"],
        ["J","一个里程碑稳过：别贪多，稳一点","One mile"],
        ["P","保留撤退路线：别被绑架，留条后路","Exit route"]
      ],
      [
        ["J","清理优先级队列：把这件事排正位，别乱","Priority"],
        ["P","今天先试错：错了改就是了，别怕","Try-error"],
        ["J","开始铃和结束铃：别超时，到点就收","Bells"],
        ["P","跟能量走：有电就干，没电就休，听身体的","Energy"]
      ]
    ];
    return packs[v];
  }
}

// Scene stems for each category, providing the base hook.
const stems = {
  love:{
    EI:[["第一次约会冷场十秒","First date silence hits ten seconds"],["对方家长突然视频连线","Their parents jump on video call"],["暧昧期被共同好友起哄","Mutual friends tease your situationship"]],
    SN:[["对方说想要一点仪式感","They want a little ritual vibe"],["聊天只丢一个表情包","They send one sticker only"],["对方说我们随缘看看","They say let's go with the flow"]],
    TF:[["吵架时对方开始掉小珍珠","They start tearing up mid-fight"],["朋友劝你别太心软","Friends tell you not to be too soft"]],
    JP:[["周末约会还没定地点","Weekend date has no place"],["对方突然改行程","They suddenly change the plan"]]
  },
  study:{
    EI:[["小组作业要你上台讲","Group project wants you on stage"],["自习室只剩你和陌生人","Only you and a stranger in study room"],["老师点名提问你走神了","Teacher cold-calls while you zone out"]],
    SN:[["复习大纲只有一个词重点","Review outline is one word key points"],["论文题目大到能装宇宙","Thesis title could fit a universe"]],
    TF:[["队友摆烂但情绪很委屈","Teammate slacks but feels wronged"]],
    JP:[["考前三天计划表还是空白","Three days pre-exam plan is blank"]]
  },
  work:{
    EI:[["周会冷场领导看向你","Weekly meeting freezes boss looks at you"],["客户电话突然转给你","Client call is suddenly transferred to you"]],
    SN:[["需求文档写了个感觉对就行","Spec says just make it feel right"],["故障原因像侦探小说","Incident cause reads like detective novel"]],
    TF:[["同事迟到但理由很催泪","Coworker late with tearjerker reason"]],
    JP:[["项目排期被临时插队","Project schedule gets cut in line"]]
  },
  life:{
    EI:[["朋友局突然把话题甩给你","Friend hangout dumps topic on you"],["电梯里遇熟人要不要开麦","Meet acquaintance in elevator speak?"]],
    SN:[["人生目标写成幸福就好","Life goal written as just be happy"],["日常决策靠玄学硬币","Daily decisions by coin mysticism"]],
    TF:[["朋友哭诉但逻辑前后矛盾","Friend vents with broken logic"]],
    JP:[["周末安排被临时邀请冲散","Weekend plan blasted by last invite"]]
  },
  funny:{
    EI:[["群聊冷场只剩你在线","Group chat freeze and only you online"],["你讲的冷笑话全场静音","Your dad joke mutes the room"]],
    SN:[["段子只有情绪没有包袱","Bit has vibes but no punchline"],["今日运势写着宜发疯","Horoscope says good day to go feral"]],
    TF:[["朋友被整惨你要不要补刀","Friend got roasted do you add salt"]],
    JP:[["今日份发疯要不要排进日程","Schedule today's feral episode?"]]
  },
  anime:{
    EI:[["同好局要你安利开麦","Fandom hang wants your pitch mic"],["漫展偶遇要不要搭话","Con encounter do you start talk?"]],
    SN:[["世界观设定突然前后矛盾","Lore suddenly contradicts itself"],["只记得名场面不记得剧情","You remember scenes not plot"]],
    TF:[["角色牺牲名场面让你破防","Character sacrifice breaks you"]],
    JP:[["追番进度被新番暴击","Watchlist blasted by new season"]]
  },
  game:{
    EI:[["开黑语音只有你最安静","You're quietest in party voice"],["排位队友要求你指挥","Ranked teammate demands you shotcall"]],
    SN:["攻略细节和直觉路线冲突","Guide details fight intuition route","构筑理论派和手感派对线","Theorycrafters vs feel players split"],
    TF:["队友失误要不要公开复盘","Publicly review a teammate mistake?","挂机队友求情说家里有事","AFK teammate pleads family emergency"],
    JP:["排位还是先打休闲局","Ranked climb or casual first?","肝活动还是养精神","Grind event or protect sanity"]
  },
  family:{
    EI:[["家族聚餐点你先发言","Family reunion asks you to speak first"],["长辈连续追问婚恋进度","Relatives grill your relationship status"]],
    SN:[["长辈建议很笼统听话就好","Elder advice is just be obedient"],[\"家务分工只有大家看着办\", \"Chores plan is just figure it out\"]],
    TF:[\"家人情绪崩溃找你撑腰\", \"Family meltdown seeks your support\"],
    JP:[\"春节行程被临时改三版\", \"Holiday itinerary changes three times\"]
  },
  digital:{
    EI:[\"直播间冷场要你暖场\", \"Livestream freeze needs your warm-up\", \"评论区吵起来点你出场\", \"Comment fight summons you\"],
    SN:[\"热搜只有三个字离谱\", \"Trending topic is just wild\", \"算法推荐把你画像讲歪\", \"Algorithm paints a wrong portrait\"],
    TF:[\"网暴边缘要不要站队\", \"Near pile-on take a side?\", \"私信求助故事真假难辨\", \"DM help story hard to verify\"],
    JP:[\"更新计划被热搜打乱\", \"Update plan blasted by trending\", \"想日更又想养精神\", \"Want daily post and sanity\"]
  },
  travel:{
    EI:[\"旅行团冷场要你带动气氛\", \"Tour group freeze needs your vibe\", \"问路时当地人开始长聊\", \"Local giving directions starts long chat\"],
    SN:[\"攻略只有氛围感关键词\", \"Guide is only vibe keywords\", \"地图软件和现实对不上\", \"Map app disagrees with reality\"],
    TF:[\"同伴迷路情绪崩溃\", \"Companion lost and meltdown\", \"超支要不要当场算账\", \"Overspend settle the bill now\"],
    JP:[\"航班延误打乱全部衔接\", \"Delay wrecks every connection\", \"想严格跟攻略又想流浪\", \"Want strict guide and wander\"]
  },
  food:{
    EI:[\"聚餐点菜全员弃权看你\", \"Everyone abstains and stares at you\", \"服务员连问三遍你口味\", \"Waiter asks your taste three times\"],
    SN:[\"菜单只有感觉很高级\", \"Menu only says feels premium\", \"探店笔记只写了氛围真好\", \"Food notes only say great vibe\"],
    TF:[\"朋友点了你雷的菜求你试试\", \"Friend orders your hate food for try\", \"AA细节要不要当场算清\", \"Clarify AA details on the spot\"],
    JP:[\"今天吃什么变成哲学题\", \"What to eat becomes philosophy\", \"想按计划探店又想随机进\", \"Want planned spots and random entry\"]
  },
  money:{
    EI:[\"朋友局突然讨论工资\", \"Friend hang suddenly talks salary\", \"家庭会要你讲理财观点\", \"Family meeting wants your money view\"],
    SN:[\"预算表只有活得精致\", \"Budget sheet only says live refined\", \"投资理由写成感觉会涨\", \"Invest reason is feels like rising\"],
    TF:[\"朋友借钱理由很感人\", \"Friend loan story is very moving\", \"要不要拒绝不合理分摊\", \"Reject unfair split?\"],
    JP:[\"发薪日计划被冲动消费改写\", \"Payday plan rewritten by impulse\", \"存钱计划和周末浪冲突\", \"Saving plan fights weekend splash\"]
  },
  dead:{ // social cringe
    EI:[\"当众念错名字全场安静\", \"Misread a name public silence\", \"开会麦克风忘记关说真话\", \"Mic left on you said the truth\"],
    SN:[\"社死回放只记得脸很热\", \"Cringe replay only remembers hot face\", \"复盘社死事件细节全糊\", \"Cringe review details all blur\"],
    TF:[\"要不要当场解释还是装死\", \"Explain now or play dead?\", \"朋友笑场你要不要一起笑\", \"Friend laughs do you join?\"],
    JP:[\"社死后想立刻逃离现场\", \"After cringe want instant escape\", \"想写检讨又想当没发生\", \"Want write review and pretend\"]
  },
  fish:{ // slacking at work
    EI:[\"摸鱼被领导突然拍肩\", \"Slacking gets boss shoulder tap\", \"摸鱼群聊@你分享经验\", \"Slack chat @you for tips\"],
    SN:[\"摸鱼理由写成状态调整\", \"Slack reason written as state adjust\", \"效率方法只有玄学番茄钟\", \"Efficiency is mystic pomodoro\"],
    TF:[\"同事摸鱼被抓求你圆谎\", \"Caught slacker asks you cover\", \"自己摸鱼心虚要不要补工\", \"Guilt slack make up work?\"],
    JP:[\"想严格执行番茄又想刷短视频\", \"Want pomodoro and short video\", \"摸鱼五分钟变成五十分\", \"Five-min slack becomes fifty\"]
  },
  drama:{ // watching drama
    EI:[\"追剧群要你直播反应\", \"Drama group wants live reactions\", \"结局讨论会点你先开麦\", \"Finale talk picks you to open\"],
    SN:[\"剧情逻辑漏洞大过飞船\", \"Plot hole bigger than spaceship\", \"只记得名场面不记得人名\", \"Remember scenes not names\"],
    TF:[\"主角作死你要不要共情\", \"Protagonist self-sabotage empathize?\", \"要不要剧透安慰破防朋友\", \"Spoiler-comfort a broken friend?\"],
    JP:[\"想一集一集品又想通宵刷\", \"Want savor episodes and all-nighter\", \"更新日和工作DDL对撞\", \"Release day collides work DDL\"]
  },
  eat:{ // food/dining
    EI:[\"干饭局要你先举筷发言\", \"Feast wants you first chopsticks speech\", \"外卖到了全员看你分配\", \"Delivery arrives all watch you split\"],
    SN:[\"今天吃什么变成哲学题\", \"What to eat becomes philosophy\", \"菜单选择困难进入循环\", \"Menu choice loops forever\"],
    TF:[\"朋友抢最后一块你要不要让\", \"Friend grabs last piece yield?\", \"点多了要不要理性制止\", \"Over-order rational stop?\"],
    JP:[\"减肥计划和干饭邀约对打\", \"Diet plan fights feast invite\", \"想先吃饭又想反过来\", \"Eat first then work or reverse\"]
  },
  sport:{
    EI:[\"球局缺人点你上场发言\", \"Pickup game needs you speak and play\"],
    SN:[\"训练计划只有变强两个字\", \"Training plan is just get stronger\"],
    TF:[\"队友受伤硬撑你要不要叫停\", \"Injured teammate stop them?\"],
    JP:[\"训练日和聚餐日撞车\", \"Training day collides feast day\"]
  },
  pet:{
    EI:[\"宠物在客人面前表演社死\", \"Pet performs cringe for guests\"],
    SN:[\"宠物行为原因写成心情不好\", \"Pet behavior reason just bad mood\"],
    TF:[\"宠物搞破坏要不要严肃教育\", \"Pet wrecks scold seriously?\"],
    JP:[\"遛狗时间和会议冲突\", \"Walk time fights meeting\"]
  },
  night:{
    EI:[\"深夜群聊突然点你讲故事\", \"Late chat asks you for a story\"],
    SN:[\"深夜想法大到像宇宙草案\", \"Night thoughts big as cosmos draft\"],
    TF:[\"凌晨情绪上来要不要找人聊\", \"Night feelings call someone?\"],
    JP:[\"想早睡计划被短视频吞掉\", \"Early-sleep plan eaten by shorts\"]
  },
  friend:{
    EI:[\"老友局冷场要你救场\", \"Old-friend hang freeze needs save\"],
    SN:[\"友情目标写成常联系就好\", \"Friendship goal just keep in touch\"],
    TF:[\"朋友做错事要不要直说\", \"Friend messed tell straight?\"],
    JP:[\"约拍时间永远对不齐\", \"Hang schedules never align\"]
  }
};

// Suffixes to append to stem text
const suffixes = [
  \"，还尽量不翻车\", \"并给自己留退路\", \"同时假装很淡定\", \"顺便保住人设\",
  \"用最小社交成本\", \"在不社死的前提下\", \"还要能发朋友圈复盘\", \"最好别被做成表情包\",
  \"还得给未来自己擦屁股\", \"并保持基本体面\", \"还要给自己留笑点\", \"并准备好体面离场词\",
  \"同时不消耗明天的自己\", \"还得能复盘成经验\", \"最好让场面软着陆\", \"并保住长期关系值\"
];

// Twist phrases
const twists = [
  \"朋友圈已准备好截图\", \"系统提示高风险操作\", \"内心OS开始循环播放\", \"空气突然变得很粘稠\",
  \"你的社交电量闪红灯\", \"旁白开始阴阳怪气\", \"现实开始加载延迟\", \"你感觉自己变成剧情NPC\",
  \"手机震动得像催命符\", \"周围目光变成弹幕\", \"今日运势写着宜沉默\", \"大脑开始自动生成退场词\",
  \"气氛突然进入加载中\", \"你听到命运在敲键盘\", \"这段记忆即将写入黑历史\", \"幽默防御机制已就绪\",
  \"理智与情绪开始排队\", \"世界给了你一个可选任务\", \"你的人设血条开始闪烁\", \"后台进程占用了全部注意力\"
];

// Quotes (golden sentences)
const quotes = [
  \"完成比完美更像成年人。\", \"边界不是墙，是带钥匙的门。\", \"幽默是高级防御，行动是最终补丁。\",
  \"别把热闹当亲密，别把沉默当冷漠。\", \"把情绪当数据，把行动当答案。\", \"能笑场的人，往往也更能重开。\",
  \"低电量时别做高难度人格运算。\", \"你的节奏比别人的期待更重要。\", \"把尴尬当剧情，把勇气当技能点。\",
  \"真正的成熟是：能整活，也能收工。\", \"会说不的人，才有资格认真说好。\", \"别用别人的高光当自己的进度条。\",
  \"先把今天救下来，再谈宏大叙事。\", \"有趣是天赋，靠谱是修行。\", \"世界很吵，你的判断要有静音键。\",
  \"把失败当样本，别当判决书。\", \"温柔不是可欺，是有边界的力量。\", \"你可以慢，但不能骗自己。\",
  \"承认不会，是开始会的入场券。\", \"人生像补丁笔记：丑一点也能跑。\", \"选择少一点，自由多一点。\",
  \"认真生活，也认真开玩笑。\", \"别把自己活成别人的说明书。\", \"情绪来了先落座，别让它当CEO。\",
  \"你不是工具人，你是有保修期的主角。\", \"已读不回也是一种边界艺术。\", \"今天的离谱，是明天的谈资。\",
  \"把比较关掉，把感受打开。\", \"勇敢一点，也休息一点。\", \"计划很丰满，执行很骨感，复盘很幽默。\",
  \"先活成自己的系统，再谈兼容世界。\", \"嘴硬可以，心硬会掉血。\", \"学习是长期主义的浪漫。\",
  \"职场不是修罗场，也别把自己当NPC。\", \"恋爱不是答题卡，是共同编辑的文档。\", \"二次元救不了现实，但能给你回血。\",
  \"游戏里能重开，生活里靠补丁。\", \"钱会说话，但边界说话更清晰。\", \"好吃很重要，吃得安心更重要。\",
  \"出行不是逃，是换一张地图呼吸。\", \"社死不可怕，可怕的是不更新补丁。\", \"摸鱼可以，别摸掉自己的长期能力。\",
  \"追剧是休息，不是人生外包。\", \"干饭是正义，撑到不舒服就越界。\", \"运动不是惩罚身体，是给情绪开窗。\",
  \"宠物教会你：陪伴比完美更稳。\", \"深夜想法很宏大，白天行动要具体。\", \"友情靠来回，不靠单方面读心。\",
  \"不是所有热搜都值得你站队。\", \"把今天过明白，比把人生想明白更快。\"];

// Generate compact rows
function generate() {
  const bank = [];
  let id = 1;
  const topics = Object.keys(stems);
  const axes = ["EI","SN","TF","JP"];
  const extraGuard = 200000; // safety guard

  // First, generate using the stem-based approach with emotional options.
  for (let layer=0; layer<20 && bank.length<TARGET; layer++) {
    for (const topic of topics) {
      for (const axis of axes) {
        const stemArr = stems[topic][axis];
        if (!Array.isArray(stemArr)) continue;
        for (let sidx=0; sidx<stemArr.length && bank.length<TARGET; sidx++) {
          const stem = Array.isArray(stemArr[sidx]) ? stemArr[sidx] : [stemArr[sidx], stemArr[sidx], stemArr[sidx], stemArr[sidx]];
          const stemZh = stem[0] || topic+"场景";
          const stemEn = stem[1] || topic+"scene";
          const hook = stem[2] || stemZh;
          const hookEn = stem[3] || stemEn;
          for (let su=0; su<suffixes.length && bank.length<TARGET; su++) {
            const suffix = suffixes[su];
            const twist = pick(twists, layer*10+sidx*5+su*3+axis.charCodeAt(0));
            const quote = pick(quotes, layer*7+sidx*4+su*2+axis.charCodeAt(0));
            const variant = (layer+sidx+su+topic.length)%5;
            const flavorIdx = (layer*3+sidx+su) % 10;
            const options = getOptionPacks(axis, hook, variant);
            // Ensure each option has a label (humanized text) and a hint (short).
            // The optionPack returns [value, label, hint]; we need to extend with en label/en hint.
            const optionRows = options.map(o => {
              const val = o[0];
              const labelZh = o[1];
              const hintZh = o[2] || labelZh;
              // English: simple translation of the first part (just use Chinese for now, could be auto-trans later)
              const labelEn = labelZh; // placeholder; could be machine translated if needed
              const hintEn = hintZh;
              return [val, labelZh, labelEn, hintZh, hintEn];
            });
            const textZh = stemZh + suffix + ". " + twist + "。面对「" + hook + \"」，你会？";
            const textEn = stemEn + ". " + twist + '. Facing "' + hookEn + '", you?';
            const kickerZh = catById(topic).emoji + " " + catById(topic).zh + " · " + axisMeta[axis].zh + " · " + axis;
            const kickerEn = catById(topic).emoji + " " + catById(topic).en + " · " + axisMeta[axis].en + " · " + axis;
            const row = [id, axis, topic, textZh, textEn, "金句："+quote, "Quote: "+quote, kickerZh, kickerEn, optionRows];
            bank.push(row);
            id++;
          }
        }
      }
    }
  }

  // If still short, fill with random emotional variations
  if (bank.length < TARGET) {
    console.log("Need", TARGET-bank.length, "more rows...");
    const filler = [];
    while (bank.length < TARGET && filler.length < extraGuard) {
      filler++;
      const topic = topics[Math.floor(Math.random()*topics.length)];
      const axis = axes[Math.floor(Math.random()*axes.length)];
      const hook = topic + "场景";
      const hookEn = topic;
      const twist = pick(twists, Math.floor(Math.random()*twists.length));
      const quote = pick(quotes, Math.floor(Math.random()*quotes.length));
      const suffix = pick(suffixes, Math.floor(Math.random()*suffixes.length));
      const textZh = topic+"场景"+suffix+". "+twist+". 面对「"+hook+"」，你会？";
      const textEn = topic+"scene. "+twist+'. Facing "' + hookEn + '", you?';
      const options = getOptionPacks(axis, hook, Math.floor(Math.random()*5));
      const optionRows = options.map(o => [o[0], o[1], o[1], o[2], o[2]]);
      const kickerZh = catById(topic).emoji + " " + catById(topic).zh + " · " + axisMeta[axis].zh + " · " + axis;
      const row = [id, axis, topic, textZh, textEn, "金句："+quote, "Quote: "+quote, kickerZh, kickerEn, optionRows];
      bank.push(row);
      id++;
    }
  }

  // Truncate to target
  bank.splice(TARGET);
  return bank;
}

function catById(id){ return CATEGORIES.find(c=>c.id===id) || CATEGORIES[0]; }

// Write bank.json
const bank = generate();
fs.writeFileSync(bankPath, JSON.stringify(bank), "utf8");
console.log("Wrote bank.json with", bank.length, "rows");
console.log("Sample row 0:", bank[0]);
console.log("Sample row last:", bank[bank.length-1]);
