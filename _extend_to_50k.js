const fs = require('fs');
const path = require('path');

// 加载现有题库
const bankPath = path.join(__dirname, 'bank.json');
let allRows = [];

if (fs.existsSync(bankPath)) {
  const data = fs.readFileSync(bankPath, 'utf8');
  allRows = JSON.parse(data);
  console.log(`已加载现有题库: ${allRows.length} 题`);
} else {
  console.log('未发现现有题库，将从新开始');
}

// 定义扩展的新分类（新增4个高频共鸣分类）
const newCategories = [
  { id: 'dead', zh: '社死时刻', en: 'SocialDeath', emoji: '😰' },
  { id: 'fish', zh: '摸鱼时刻', en: 'FishAround', emoji: '🐟' },
  { id: 'drama', zh: '追剧', en: 'WatchDrama', emoji: '📺' },
  { id: 'eat', zh: '吃吃喝喝', en: 'EatWell', emoji: '🥟' }
];

// 更网感、更共鸣的场景题库
const stems = {
  'love': {
    'EI': [
      '约会时消息突然弹出前任的点赞',
      '刚发完朋友圈立刻收到相亲群的@',
      '第一次单独见家长就翻车',
      '对方突然说想认真谈关系让你措手不及',
      '约会被问工资/房子/计划像被审问',
      '刚送完礼物对方说太贵重了',
      '约会时对方突然说想静静',
      '约会结束对方说下次再约但没具体时间'
    ],
    'SN': [
      '对方说要仪式感你准备了惊喜但TA没看懂',
      '聊天记录里永远只有表情包和哈哈哈',
      '约会攻略发三次都得不到反馈',
      '纪念日礼物选了TA可能喜欢的其实不喜欢',
      '感情目标都是成长结果成了互相内耗',
      '对方说想要一点仪式感',
      '纪念日礼物只说随便就好'
    ]
  },
  'study': {
    'EI': [
      '小组作业所有人已读不回',
      '课堂当众点名让你分享观点',
      '自习室只剩你对着空气背书',
      '同学拉你对答案到图书馆闭馆',
      '线上讨论你哑火其他人高潮',
      '导师组会轮到你汇报PPT没做完'
    ],
    'SN': [
      '论文选题大到能装宇宙',
      '复习提纲越写越长越看不懂',
      '错题本比教科书还厚',
      '老师说理解别背你把笔记抄三遍',
      '考点传说版本多到分不清真假',
      '实验结果和理论模型完全不沾边'
    ]
  },
  'work': {
    'EI': [
      '晨会突然点到你同步进度',
      '团建玩游戏你要当队长',
      '客户局需要你破冰围观全在看你',
      '跨部门群@你要你一个方案',
      '客户突然找你说话全组在看你',
      '领导突然问你怎么看'
    ],
    'SN': [
      '需求文档写了个感觉对就行',
      '复盘只聊愿景不讲数据',
      '故障原因像侦探小说',
      'OKR写得像诗同事方案全是细节清单',
      '老板只要方向你不要路径',
      '需求反复变更不知道信哪个版本'
    ]
  },
  'life': {
    'EI': [
      '邻居开始长聊人生',
      '朋友婚礼你被拉去致辞',
      '小区群为停车吵翻',
      '陌生人问路还想听故事',
      '家庭聚餐要先敬酒',
      '旧同学聚会全是回忆杀'
    ],
    'SN': [
      '人生规划写到第三页空白',
      '你想看说明书对方看星空',
      '日常决策变成哲学题',
      '搬家清物品像考古',
      '你列利弊对方谈命运',
      '周末安排只写随便转转'
    ]
  },
  'funny': {
    'EI': [
      '社死名场面正在直播',
      '表情包本人出现在现场',
      '你被拉去当气氛组',
      '朋友让你当众讲冷笑话',
      '语音误触发到家族群',
      '你笑点太低全场安静'
    ],
    'SN': [
      '热搜逻辑像脱口秀稿',
      '你较真细节对方在玩梗',
      '段子背后其实有数据',
      '现实bug比剧本更荒诞',
      '你想还原真相对方要包袱',
      '迷因解释需要三页注释'
    ]
  },
  'dead': {  // 新增社死分类
    'EI': [
      '最尴尬时刻恰好直播',
      '表情包本人被认出',
      '语音房全家群误触',
      '全场安静讲冷笑话',
      '聚会被点名表演',
      '社死瞬间被转发群'
    ],
    'SN': [
      '热搜像脱口秀',
      '较真玩梗不理解',
      '段子真相难辨',
      '现实bug更离谱',
      '想解释大家看热闹',
      '较真玩梗当狂欢'
    ]
  },
  'fish': {  // 新增摸鱼分类
    'EI': [
      '会议中摸鱼被发现尴尬躲',
      '工作时领导刷手机走来',
      '同事八卦你忍不住插嘴',
      '工作群消息秒回',
      '同事偷懒你也放松被老板逮',
      '上班刷短视频同事喊'
    ],
    'SN': [
      '摸鱼技巧像学术课题',
      '上班找借口刷视频',
      '摸鱼时间精确计算',
      '摸鱼发现重要邮件',
      '摸鱼被发现屏幕内容',
      '摸鱼时发现重要消息弹出'
    ]
  },
  'drama': {  // 新增追剧分类
    'EI': [
      '安利新番没人看过',
      '漫展cos围观',
      '角色曲合唱嗨',
      '直播间弹幕要你说话',
      '追剧神转折剧透',
      '同好聚会自我介绍滔滔不绝'
    ],
    'SN': [
      '剧情杀无铺垫',
      '设定集厚如防身书',
      '关系图复杂过地铁',
      '隐藏结局靠氛围',
      '攻略对线党争论',
      '画面分镜考据争论'
    ]
  },
  'eat': {  // 新增吃吃喝喝分类
    'EI': [
      '火锅局第一个点菜',
      '等位陌生人聊天',
      '朋友点评味道',
      '直播连麦邀请',
      '聚餐结尾感言',
      '食堂拥挤挤中间'
    ],
    'SN': [
      '菜单氛围无重量',
      '网红店传说差距大',
      '你看配料对方摆盘',
      '黑暗料理超前',
      '你要复现对方惊喜',
      '账单精彩如小说'
    ]
  }
};

// 丰富网感选项模板
const optionTemplates = {
  'EI': [
    ['直接把「{scene)」变成自己的高光时刻，开麦就整', '站在中间位把尴尬当开场白，社死变社牛', '拉队友一起表演双人相声，冷场变热场', '用表情包终结冷场，让对方笑出声'],
    ['主动自我介绍把「{scene)」变成认识新朋友的机会', '站到边缘位默默观察然后用实力反转', '抛一个轻松话题带着「{scene)」往前走', '简短回应避免扩大事态，低调处理']
  ],
  'SN': [
    ['按优先级拆解「{scene)」的核心约束条件', '深挖现象背后的模式和故事', '用小步验证的方式调整策略逐步收敛', '保留创意火花但要落地实操补丁'],
    ['列出清单优先解决关键要素', '先预设三种不同结局再选择路径', '确认事实边界后再进行评论解释', '允许浪漫思维但必须有可执行方案']
  ],
  'TF': [
    ['对齐规则和后果再给出建设性意见', '先共情安抚情绪再展开理性分析', '将复杂议题拆解成可讨论的具体要点', '优先修复关系裂痕而非单纯对错评判'],
    ['设定明确边界同时提供多个可行方案', '先表达理解认同再提出实用建议', '使用利弊分析工具辅助决策过程', '先询问对方真正需求然后再设计方案']
  ],
  'JP': [
    ['锁定优先级防止「{scene)」被其他事项干扰', '把它当作支线情节不必死磕主线任务', '拆分成三个可阶段性完成的目标', '先配合当前状态再谈判计划安排'],
    ['设立截止点和验收标准控制范围', '保留弹性余地应对突发转向', '最小闭环验证后再向外扩展', '跟随能量流动一步一回头评估路线']
  ]
};

// 丰富金句库
const quotes = [
  '活着就是各种缝缝补补修修补补', '成年人的崩溃从关微信开始', '别回头身后没有灯火眼里皆是迷茫',
  '生活不止眼前的苟且还有明天的房租', '道理我都懂但还是过不好这一生', '早睡早起身体好熬夜秃头烦恼多',
  '世上无难事只怕有心人有钱万事不难', '努力不一定成功但不努力一定很爽', '风吹日晒雨淋生活就像麻辣烫',
  '人生没有彩排每一天都是直播', '面子是给穷人看的尊严是给富人用的', '成年人的世界里没有容易二字只有房贷',
  '别人家的孩子你家的镜子照出来自己', '理想很丰满现实很骨感钱包更瘪', '嘴上说着躺平心里比谁都卷',
  '当代年轻人三大病：选择困难症拖延症纠结症', '一边养生一边作死一边焦虑一边放纵', '朋友圈精致人设线下真实面目',
  '白天职场扮演晚上灵魂出窍', '社死现场：请把尴尬当剧本', '摸鱼最高境界：被发现像没被发现',
  '追剧人：剧情杀还没到我已经哭死', '吃货的最高境界：减肥从明天开始', '职场人的生存法则：沉默是金，摸鱼是银'
];

// 风格修饰词
const styleMods = [
  ['（轻一点）', ' (lighter)'], ['（稳一点）', ' (steadier)'], ['（酷一点）', ' (cooler)'],
  ['（笑着来）', ' (with a grin)'], ['（少内耗）', ' (less spiral)'], ['（真实点）', ' (real talk)']
];

function makeQuestion() {
  const topics = Object.keys(stems);
  const topic = topics[Math.floor(Math.random() * topics.length)];
  const axis = ['EI', 'SN', 'TF', 'JP'][Math.floor(Math.random() * 4)];
  
  const topicStems = stems[topic] || stems['love'];
  const stemList = topicStems[axis] || topicStems['EI'];
  const stemBase = stemList[Math.floor(Math.random() * stemList.length)];
  
  // 提取场景短语
  const sceneMatch = stemBase.match(/「([^」]+)」/);
  const scenePhrase = sceneMatch ? sceneMatch[1] : stemBase.split('，')[0].split('。')[0] || '场景';
  
  // 网感语气词
  const topicWords = ['社死', '翻车', '社牛', '摸鱼', '追剧', '吃瓜', '绝绝子', '真的谢', '拿捏', '破防', 'emo', '躺平', '摆烂', 'yyds', '栓Q'];
  const wordRandom = topicWords[Math.floor(Math.random() * topicWords.length)];
  
  // 构建题干
  const twists = ['还尽量不翻车', '并给自己留退路', '同时不想消耗社交电量', '还得给未来自己擦屁股'];
  const pressures = ['朋友圈已准备好截图', '时间只给你八秒决策', '旁白开始阴阳怪气', 'BGM突然变得很燃'];
  const twist = twists[Math.floor(Math.random() * twists.length)];
  const pressure = pressures[Math.floor(Math.random() * pressures.length)];
  
  const stemChinese = `${stemBase}，${twist}。${pressure}。面对「${scenePhrase}」，你会？`;
  
  // 金句
  const quoteChinese = quotes[Math.floor(Math.random() * quotes.length)];
  
  // 构建选项（场景绑定，确保唯一性）
  const templates = optionTemplates[axis] || optionTemplates['EI'];
  const templateSet = templates[Math.floor(Math.random() * templates.length)];
  const poles = axis === 'EI' ? ['E', 'I'] : axis === 'SN' ? ['S', 'N'] : axis === 'TF' ? ['T', 'F'] : ['J', 'P'];
  
  const options = [];
  for (let i = 0; i < 4; i++) {
    let optionText = templateSet[i].replace('{scene)', `"${scenePhrase}"`);
    const style = styleMods[Math.floor(Math.random() * styleMods.length)];
    optionText += style[0];
    
    const enText = optionText.replace(/（[^\)]+）/g, (m) => {
      const chinese = m.replace('（', '').replace('）', '');
      const map = { '（轻一点）': '(lighter)', '（稳一点）': '(steadier)', '（酷一点）': '(cooler)', '（笑着来）': '(with a grin)', '（少内耗）': '(less spiral)', '（真实点）': '(real talk)' };
      return map[chinese] || '';
    });
    
    const val = poles[i % 2];
    options.push({
      value: val,
      label: { zh: optionText, en: enText },
      hint: { zh: poles[i % 2] === 'E' ? '社牛' : poles[i % 2] === 'I' ? '低调' : 'S', en: poles[i % 2] === 'E' ? 'Charge' : 'Quiet' }
    });
  }
  
  return {
    id: null,
    axis: axis,
    category: { zh: topic, en: topic },
    topic: topic,
    tags: [topic, axis.toLowerCase()],
    kicker: { zh: `${wordRandom}${topic} · ${axis}`, en: `${wordRandom}${topic} · ${axis}` },
    text: { zh: stemChinese, en: stemChinese },
    quote: { zh: quoteChinese, en: 'Quote: ' + quoteChinese },
    options: options
  };
}

function generateQuestions(count) {
  const uniqueSet = new Set();
  const questions = [];
  let attempts = 0;
  const maxAttempts = count * 10;
  
  console.log(`开始生成 ${count} 道唯一题目...`);
  
  while (questions.length < count && attempts < maxAttempts) {
    attempts++;
    const q = makeQuestion();
    
    // 唯一性检查：题干 + 四个选项的中文文本组合
    const keyParts = [q.text.zh];
    q.options.forEach(opt => keyParts.push(opt.label.zh));
    const key = keyParts.join('||');
    
    if (!uniqueSet.has(key)) {
      uniqueSet.add(key);
      questions.push(q);
    }
    
    if (attempts % 2000 === 0) {
      console.log(`已生成 ${questions.length} 道题目（尝试了 ${attempts} 次）`);
    }
  }
  
  console.log(`完成！最终获得 ${questions.length} 道唯一题目，尝试次数：${attempts}`);
  return questions;
}

// 生成扩展题目（目标是达到5万+）
const currentTotal = allRows.length;
const targetTotal = 50000;  // 目标5万+
const needed = Math.max(targetTotal - currentTotal, 20000);  // 至少扩展2万

console.log(`当前题数: ${currentTotal}, 目标: ${targetTotal}, 需要扩展: ${needed}`);

const newQuestions = generateQuestions(needed);

// 转换为compact格式并分配ID
const allNewRows = [...allRows];

// 添加现有题目（确保格式正确）
allRows.forEach(row => {
  if (Array.isArray(row) && row.length >= 10) {
    allNewRows.push(row);
  }
});

// 添加新题目
newQuestions.forEach((q, idx) => {
  const id = allNewRows.length + 1;
  const row = [
    id,
    q.axis,
    q.topic,
    q.text.zh,
    q.text.en,
    q.quote.zh,
    q.quote.en,
    q.kicker.zh,
    q.kicker.en,
    q.options
  ];
  allNewRows.push(row);
});

// 写入新题库
const outputPath = path.join(__dirname, 'bank_50k.json');
fs.writeFileSync(outputPath, JSON.stringify(allNewRows, null, 2), 'utf8');
console.log(`新题库已写入: ${outputPath} (${allNewRows.length} 题)`);

// 统计信息
const axesCount = {};
const topicCount = {};
allNewRows.forEach(row => {
  axesCount[row[1]] = (axesCount[row[1]] || 0) + 1;
  topicCount[row[2]] = (topicCount[row[2]] || 0) + 1;
});

console.log('\n=== 统计信息 ===');
console.log(`总题数: ${allNewRows.length}`);
console.log(`轴分布: ${JSON.stringify(axesCount)}`);
console.log(`类别分布: ${JSON.stringify(topicCount)}`);

// 验证唯一性
const verifySet = new Set();
allNewRows.forEach(row => {
  const key = `${row[3]}||${row[9].map(o => o.label.zh).join('||')}`;
  if (verifySet.has(key)) {
    console.warn(`警告: 发现重复题目! ID: ${row[0]}`);
  }
  verifySet.add(key);
});

console.log(`唯一性验证: ${verifySet.size} 个唯一题目集合`);

// 更新data.js中的QUESTIONS种子（前48题）
const dataPath = path.join(__dirname, 'data.js');
const dataContent = fs.readFileSync(dataPath, 'utf8');
const seedQuestions = allNewRows.slice(0, 48).map(row => ({
  id: row[0],
  axis: row[1],
  topic: row[2],
  text: { zh: row[3], en: row[4] },
  quote: { zh: row[5], en: row[6] },
  kicker: { zh: row[7], en: row[8] },
  options: row[9].map(o => ({ value: o.value, label: { zh: o.label.zh, en: o.label.en }, hint: { zh: o.hint.zh, en: o.hint.en } }))
}));

// 更新UI_TEXT中的分类信息
const updatedUI = dataContent.replace(
  /CATEGORIES = \[[^\]]*\]/,
  `CATEGORIES = ${JSON.stringify([...newCategories, ...CATEGORIES])}`
);

console.log('\n扩展完成! 现在可以替换 bank.json 并使用新的题库。');
