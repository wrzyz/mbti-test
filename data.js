const QUESTION_BANK = [];

const QUESTIONS = [
  {
    "id": 1,
    "axis": "SN",
    "category": {
      "zh": "游戏",
      "en": "Games"
    },
    "topic": "game",
    "tags": [
      "game",
      "sn",
      "humor",
      "layer1"
    ],
    "kicker": {
      "zh": "🎮 游戏 · 细节或脑洞 · SN",
      "en": "🎮 Games · Detail or Daydream · SN"
    },
    "text": {
      "zh": "构筑理论派和手感派对线，同时假装很淡定。系统提示高风险操作。面对「理论手感」，你会？",
      "en": "Theorycrafters vs feel players split, while faking calm. system flags high-risk action. Facing \"theory/feel\", you:"
    },
    "quote": {
      "zh": "金句：先把今天救下来，再谈宏大叙事。",
      "en": "Quote: Save today first, epic lore later."
    },
    "options": [
      {
        "value": "S",
        "label": {
          "zh": "先拆「构筑理论派和手感派对线，同时假装很淡…」的具体步骤、时间和材料",
          "en": "Break \"Theorycrafters vs feel playe…\" into steps, time, materials"
        },
        "hint": {
          "zh": "步骤拆解",
          "en": "Step break"
        }
      },
      {
        "value": "N",
        "label": {
          "zh": "先抓「构筑理论派和手感派对线，同时假装很淡…」的方向感与最终画面（稳一点）",
          "en": "Capture direction and end image of \"Theorycrafters vs feel playe…\" (steady)"
        },
        "hint": {
          "zh": "方向画面",
          "en": "Direction shot"
        }
      },
      {
        "value": "S",
        "label": {
          "zh": "列出可验证细节，不让「构筑理论派和手感派对线，同时假装很淡…」飘成气氛学",
          "en": "List checkable details so \"Theorycrafters vs feel playe…\" doesn't float"
        },
        "hint": {
          "zh": "细节清单",
          "en": "Detail list"
        }
      },
      {
        "value": "N",
        "label": {
          "zh": "允许脑洞先行，把「构筑理论派和手感派对线，同时假装很淡…」当成概念草稿（稳一点）",
          "en": "Draft concepts first and treat \"Theorycrafters vs feel playe…\" as sketch (steady)"
        },
        "hint": {
          "zh": "概念草稿",
          "en": "Concept draft"
        }
      }
    ]
  },
  {
    "id": 2,
    "axis": "SN",
    "category": {
      "zh": "学习",
      "en": "Study"
    },
    "topic": "study",
    "tags": [
      "study",
      "sn",
      "humor",
      "layer1"
    ],
    "kicker": {
      "zh": "📚 学习 · 细节或脑洞 · SN",
      "en": "📚 Study · Detail or Daydream · SN"
    },
    "text": {
      "zh": "网课进度条和理解度反向，最好让场面软着陆。朋友圈已准备好截图。面对「反向进度」，你会？",
      "en": "Progress bar moves opposite of understanding, preferably soft-landing the scene. Moments is ready to screenshot. Facing \"reverse progress\", you:"
    },
    "quote": {
      "zh": "金句：完成比完美更像成年人。",
      "en": "Quote: Done looks more adult than perfect."
    },
    "options": [
      {
        "value": "S",
        "label": {
          "zh": "用案例和数据钉住「网课进度条和理解度反向，最好让场面软…」",
          "en": "Pin \"Progress bar moves opposite …\" with cases and data"
        },
        "hint": {
          "zh": "数据钉住",
          "en": "Data pin"
        }
      },
      {
        "value": "N",
        "label": {
          "zh": "先讲隐喻和可能性，再回看「网课进度条和理解度反向，最好让场面软…」（稳一点）",
          "en": "Talk metaphor/possibility, then revisit \"Progress bar moves opposite …\" (steady)"
        },
        "hint": {
          "zh": "隐喻先行",
          "en": "Metaphor first"
        }
      },
      {
        "value": "S",
        "label": {
          "zh": "把「网课进度条和理解度反向，最好让场面软…」还原成可执行清单",
          "en": "Reduce \"Progress bar moves opposite …\" into executable checklist"
        },
        "hint": {
          "zh": "可执行",
          "en": "Executable"
        }
      },
      {
        "value": "N",
        "label": {
          "zh": "从「网课进度条和理解度反向，最好让场面软…」联想到三条未来支线（稳一点）",
          "en": "From \"Progress bar moves opposite …\" branch three future routes (steady)"
        },
        "hint": {
          "zh": "未来支线",
          "en": "Future routes"
        }
      }
    ]
  },
  {
    "id": 3,
    "axis": "JP",
    "category": {
      "zh": "出行",
      "en": "Travel"
    },
    "topic": "travel",
    "tags": [
      "travel",
      "jp",
      "humor",
      "layer1"
    ],
    "kicker": {
      "zh": "🚇 出行 · 计划或浪 · JP",
      "en": "🚇 Travel · Plan or Flow · JP"
    },
    "text": {
      "zh": "行程表被雨天重写，还要给自己留笑点。BGM 突然变得很燃。面对「雨天重写」，你会？",
      "en": "Itinerary rewritten by rain, and keep a punchline ready. BGM suddenly goes hype. Facing \"rain rewrite\", you:"
    },
    "quote": {
      "zh": "金句：二次元救不了现实，但能给你回血。",
      "en": "Quote: Anime won't fix reality, but it heals HP."
    },
    "options": [
      {
        "value": "J",
        "label": {
          "zh": "预设Plan B，降低「行程表被雨天重写，还要给自己留笑点」翻车成本",
          "en": "Prebuild Plan B to cut crash cost of \"Itinerary rewritten by rain,…\""
        },
        "hint": {
          "zh": "Plan B",
          "en": "Plan B"
        }
      },
      {
        "value": "P",
        "label": {
          "zh": "允许今天只完成「行程表被雨天重写，还要给自己留笑点」的最小可行版（稳一点）",
          "en": "Allow MVP-only progress on \"Itinerary rewritten by rain,…\" today (steady)"
        },
        "hint": {
          "zh": "最小可行",
          "en": "MVP today"
        }
      },
      {
        "value": "J",
        "label": {
          "zh": "用时间盒限制「行程表被雨天重写，还要给自己留笑点」的拖延区间",
          "en": "Time-box the procrastination zone of \"Itinerary rewritten by rain,…\""
        },
        "hint": {
          "zh": "时间盒",
          "en": "Time box"
        }
      },
      {
        "value": "P",
        "label": {
          "zh": "先行动产生信息，再回头修正「行程表被雨天重写，还要给自己留笑点」（稳一点）",
          "en": "Act for info, then revise \"Itinerary rewritten by rain,…\" (steady)"
        },
        "hint": {
          "zh": "行动出信息",
          "en": "Act for info"
        }
      }
    ]
  },
  {
    "id": 4,
    "axis": "EI",
    "category": {
      "zh": "职场",
      "en": "Work"
    },
    "topic": "work",
    "tags": [
      "work",
      "ei",
      "humor",
      "layer3"
    ],
    "kicker": {
      "zh": "💼 职场 · 社死或社牛 · EI",
      "en": "💼 Work · Cringe or Charge · EI"
    },
    "text": {
      "zh": "客户电话突然转给你，同时不消耗明天的自己。时间只给你八秒决策。面对「客户来电」，你会？",
      "en": "Client call is suddenly transferred to you, without burning tomorrow-you. you only get eight seconds. Facing \"client call\", you:"
    },
    "quote": {
      "zh": "金句：承认不会，是开始会的入场券。",
      "en": "Quote: Admitting not-yet is the ticket to eventually."
    },
    "options": [
      {
        "value": "E",
        "label": {
          "zh": "笑着接话，把「客户电话突然转给你，同时不消耗明天的…」聊成能转发的名场面",
          "en": "Laugh-reply and turn \"Client call is suddenly tran…\" into shareable lore"
        },
        "hint": {
          "zh": "名场面制造",
          "en": "Lore craft"
        }
      },
      {
        "value": "I",
        "label": {
          "zh": "先听完再决定，不让「客户电话突然转给你，同时不消耗明天的…」抽干社交血条（笑一点）",
          "en": "Listen first so \"Client call is suddenly tran…\" doesn't drain social HP (funnier)"
        },
        "hint": {
          "zh": "听完再动",
          "en": "Listen first"
        }
      },
      {
        "value": "E",
        "label": {
          "zh": "邀请全场一起玩，稀释「客户电话突然转给你，同时不消耗明天的…」的压力光环",
          "en": "Invite everyone so \"Client call is suddenly tran…\" pressure dilutes"
        },
        "hint": {
          "zh": "压力稀释",
          "en": "Dilute pressure"
        }
      },
      {
        "value": "I",
        "label": {
          "zh": "找借口短暂离场，给「客户电话突然转给你，同时不消耗明天的…」降温后再回（笑一点）",
          "en": "Step out briefly, cool \"Client call is suddenly tran…\", then return (funnier)"
        },
        "hint": {
          "zh": "离场降温",
          "en": "Cool exit"
        }
      }
    ]
  },
  {
    "id": 5,
    "axis": "SN",
    "category": {
      "zh": "出行",
      "en": "Travel"
    },
    "topic": "travel",
    "tags": [
      "travel",
      "sn",
      "humor",
      "layer0"
    ],
    "kicker": {
      "zh": "🚇 出行 · 细节或脑洞 · SN",
      "en": "🚇 Travel · Detail or Daydream · SN"
    },
    "text": {
      "zh": "攻略和现场完全不是一回事，并保持基本体面。你预感到会成为名场面。面对「攻略失真」，你会？",
      "en": "Guide and reality are different games, while keeping basic dignity. you sense a highlight reel forming. Facing \"guide mismatch\", you:"
    },
    "quote": {
      "zh": "金句：今天的离谱，是明天的谈资。",
      "en": "Quote: Today's chaos is tomorrow's story fuel."
    },
    "options": [
      {
        "value": "S",
        "label": {
          "zh": "按优先级处理「攻略和现场完全不是一回事，并保持基本…」里最硬的约束",
          "en": "Handle hardest constraints in \"Guide and reality are differ…\" first"
        },
        "hint": {
          "zh": "硬约束",
          "en": "Hard constraint"
        }
      },
      {
        "value": "N",
        "label": {
          "zh": "先找「攻略和现场完全不是一回事，并保持基本…」背后的模式和故事",
          "en": "Find patterns/story behind \"Guide and reality are differ…\""
        },
        "hint": {
          "zh": "模式故事",
          "en": "Pattern story"
        }
      },
      {
        "value": "S",
        "label": {
          "zh": "小步试验，用结果校正「攻略和现场完全不是一回事，并保持基本…」",
          "en": "Small trials to correct \"Guide and reality are differ…\""
        },
        "hint": {
          "zh": "小步试验",
          "en": "Small trial"
        }
      },
      {
        "value": "N",
        "label": {
          "zh": "把「攻略和现场完全不是一回事，并保持基本…」当成灵感火花，再慢慢收敛",
          "en": "Treat \"Guide and reality are differ…\" as spark, then converge"
        },
        "hint": {
          "zh": "灵感收敛",
          "en": "Spark converge"
        }
      }
    ]
  },
  {
    "id": 6,
    "axis": "SN",
    "category": {
      "zh": "职场",
      "en": "Work"
    },
    "topic": "work",
    "tags": [
      "work",
      "sn",
      "humor",
      "layer0"
    ],
    "kicker": {
      "zh": "💼 职场 · 细节或脑洞 · SN",
      "en": "💼 Work · Detail or Daydream · SN"
    },
    "text": {
      "zh": "需求文档只有要好用高级，并给自己留退路。时间只给你八秒决策。面对「高级好用」，你会？",
      "en": "PRD only says premium and usable, and leave an exit. you only get eight seconds. Facing \"premium usable\", you:"
    },
    "quote": {
      "zh": "金句：会说不的人，才有资格认真说好。",
      "en": "Quote: Only those who can say no can mean yes."
    },
    "options": [
      {
        "value": "S",
        "label": {
          "zh": "用案例和数据钉住「需求文档只有要好用高级，并给自己留退…」",
          "en": "Pin \"PRD only says premium and us…\" with cases and data"
        },
        "hint": {
          "zh": "数据钉住",
          "en": "Data pin"
        }
      },
      {
        "value": "N",
        "label": {
          "zh": "先讲隐喻和可能性，再回看「需求文档只有要好用高级，并给自己留退…」",
          "en": "Talk metaphor/possibility, then revisit \"PRD only says premium and us…\""
        },
        "hint": {
          "zh": "隐喻先行",
          "en": "Metaphor first"
        }
      },
      {
        "value": "S",
        "label": {
          "zh": "把「需求文档只有要好用高级，并给自己留退…」还原成可执行清单",
          "en": "Reduce \"PRD only says premium and us…\" into executable checklist"
        },
        "hint": {
          "zh": "可执行",
          "en": "Executable"
        }
      },
      {
        "value": "N",
        "label": {
          "zh": "从「需求文档只有要好用高级，并给自己留退…」联想到三条未来支线",
          "en": "From \"PRD only says premium and us…\" branch three future routes"
        },
        "hint": {
          "zh": "未来支线",
          "en": "Future routes"
        }
      }
    ]
  },
  {
    "id": 7,
    "axis": "EI",
    "category": {
      "zh": "恋爱",
      "en": "Love"
    },
    "topic": "love",
    "tags": [
      "love",
      "ei",
      "humor",
      "layer3"
    ],
    "kicker": {
      "zh": "💘 恋爱 · 社死或社牛 · EI",
      "en": "💘 Love · Cringe or Charge · EI"
    },
    "text": {
      "zh": "对方家长突然视频连线，最好别被做成表情包。朋友圈已准备好截图。面对「家长连线」，你会？",
      "en": "Their parents jump on video call, preferably not become a sticker. Moments is ready to screenshot. Facing \"parent video\", you:"
    },
    "quote": {
      "zh": "金句：情绪来了先落座，别让它当CEO。",
      "en": "Quote: Seat emotion; don't elect it CEO."
    },
    "options": [
      {
        "value": "E",
        "label": {
          "zh": "主动自我介绍，把「对方家长突然视频连线，最好别被做成表…」变成你的舞台任务",
          "en": "Self-intro and make \"Their parents jump on video …\" your stage quest"
        },
        "hint": {
          "zh": "舞台任务",
          "en": "Stage quest"
        }
      },
      {
        "value": "I",
        "label": {
          "zh": "站到边缘位，用最小互动处理「对方家长突然视频连线，最好别被做成表…」（笑一点）",
          "en": "Stay edge-side and mini-interact through \"Their parents jump on video …\" (funnier)"
        },
        "hint": {
          "zh": "边缘位",
          "en": "Edge seat"
        }
      },
      {
        "value": "E",
        "label": {
          "zh": "先抛一个轻松问题，带着「对方家长突然视频连线，最好别被做成表…」往前走",
          "en": "Ask a light question and move \"Their parents jump on video …\" forward"
        },
        "hint": {
          "zh": "轻松提问",
          "en": "Light ask"
        }
      },
      {
        "value": "I",
        "label": {
          "zh": "回短句保底，不把「对方家长突然视频连线，最好别被做成表…」扩成大型晚会（笑一点）",
          "en": "Short replies only; don't expand \"Their parents jump on video …\" into a gala (funnier)"
        },
        "hint": {
          "zh": "短句保底",
          "en": "Short-reply"
        }
      }
    ]
  },
  {
    "id": 8,
    "axis": "TF",
    "category": {
      "zh": "游戏",
      "en": "Games"
    },
    "topic": "game",
    "tags": [
      "game",
      "tf",
      "humor",
      "layer2"
    ],
    "kicker": {
      "zh": "🎮 游戏 · 理智或心软 · TF",
      "en": "🎮 Games · Logic or Soft Heart · TF"
    },
    "text": {
      "zh": "队友失误要不要公开复盘，在不社死的前提下。BGM 突然变得很燃。面对「公开复盘」，你会？",
      "en": "Publicly review a teammate's mistake?, without full cringe death. BGM suddenly goes hype. Facing \"public review\", you:"
    },
    "quote": {
      "zh": "金句：认真生活，也认真开玩笑。",
      "en": "Quote: Live seriously, joke seriously."
    },
    "options": [
      {
        "value": "T",
        "label": {
          "zh": "把「队友失误要不要公开复盘，在不社死的前…」拆成可判定的标准（酷一点）",
          "en": "Split \"Publicly review a teammate's…\" into decidable criteria (cooler)"
        },
        "hint": {
          "zh": "判定标准",
          "en": "Criteria"
        }
      },
      {
        "value": "F",
        "label": {
          "zh": "问一句你现在最需要什么，再碰「队友失误要不要公开复盘，在不社死的前…」",
          "en": "Ask what they need most, then touch \"Publicly review a teammate's…\""
        },
        "hint": {
          "zh": "需要优先",
          "en": "Need first"
        }
      },
      {
        "value": "T",
        "label": {
          "zh": "对事不对人，直接指出「队友失误要不要公开复盘，在不社死的前…」的结构性问题（酷一点）",
          "en": "Name structural issues in \"Publicly review a teammate's…\" (cooler)"
        },
        "hint": {
          "zh": "对事不对人",
          "en": "Issue focus"
        }
      },
      {
        "value": "F",
        "label": {
          "zh": "先肯定难处，再协商「队友失误要不要公开复盘，在不社死的前…」的边界",
          "en": "Affirm the hard part, then negotiate \"Publicly review a teammate's…\""
        },
        "hint": {
          "zh": "先肯定",
          "en": "Affirm first"
        }
      }
    ]
  },
  {
    "id": 9,
    "axis": "SN",
    "category": {
      "zh": "搞笑",
      "en": "Funny"
    },
    "topic": "funny",
    "tags": [
      "funny",
      "sn",
      "humor",
      "layer3"
    ],
    "kicker": {
      "zh": "😂 搞笑 · 细节或脑洞 · SN",
      "en": "😂 Funny · Detail or Daydream · SN"
    },
    "text": {
      "zh": "笑点建立在错误前提上，还尽量不翻车。对面眼神开始发光。面对「错误前提」，你会？",
      "en": "Joke stands on a wrong premise, try not to crash. their eyes start glowing. Facing \"wrong premise\", you:"
    },
    "quote": {
      "zh": "金句：选择少一点，自由多一点。",
      "en": "Quote: Fewer choices, freer life."
    },
    "options": [
      {
        "value": "S",
        "label": {
          "zh": "按优先级处理「笑点建立在错误前提上，还尽量不翻车」里最硬的约束",
          "en": "Handle hardest constraints in \"Joke stands on a wrong premi…\" first"
        },
        "hint": {
          "zh": "硬约束",
          "en": "Hard constraint"
        }
      },
      {
        "value": "N",
        "label": {
          "zh": "先找「笑点建立在错误前提上，还尽量不翻车」背后的模式和故事（笑一点）",
          "en": "Find patterns/story behind \"Joke stands on a wrong premi…\" (funnier)"
        },
        "hint": {
          "zh": "模式故事",
          "en": "Pattern story"
        }
      },
      {
        "value": "S",
        "label": {
          "zh": "小步试验，用结果校正「笑点建立在错误前提上，还尽量不翻车」",
          "en": "Small trials to correct \"Joke stands on a wrong premi…\""
        },
        "hint": {
          "zh": "小步试验",
          "en": "Small trial"
        }
      },
      {
        "value": "N",
        "label": {
          "zh": "把「笑点建立在错误前提上，还尽量不翻车」当成灵感火花，再慢慢收敛（笑一点）",
          "en": "Treat \"Joke stands on a wrong premi…\" as spark, then converge (funnier)"
        },
        "hint": {
          "zh": "灵感收敛",
          "en": "Spark converge"
        }
      }
    ]
  },
  {
    "id": 10,
    "axis": "JP",
    "category": {
      "zh": "出行",
      "en": "Travel"
    },
    "topic": "travel",
    "tags": [
      "travel",
      "jp",
      "humor",
      "layer2"
    ],
    "kicker": {
      "zh": "🚇 出行 · 计划或浪 · JP",
      "en": "🚇 Travel · Plan or Flow · JP"
    },
    "text": {
      "zh": "自由行还是跟固定班次，在不社死的前提下。时间只给你八秒决策。面对「自由或班次」，你会？",
      "en": "Free roam or fixed timetable, without full cringe death. you only get eight seconds. Facing \"free/fixed\", you:"
    },
    "quote": {
      "zh": "金句：别把热闹当亲密，别把沉默当冷漠。",
      "en": "Quote: Noise isn't intimacy; silence isn't coldness."
    },
    "options": [
      {
        "value": "J",
        "label": {
          "zh": "把「自由行还是跟固定班次，在不社死的前提…」的关键路径先铺好（酷一点）",
          "en": "Pave the critical path of \"Free roam or fixed timetable…\" first (cooler)"
        },
        "hint": {
          "zh": "关键路径",
          "en": "Critical path"
        }
      },
      {
        "value": "P",
        "label": {
          "zh": "保持可转向，不把「自由行还是跟固定班次，在不社死的前提…」焊死",
          "en": "Stay steerable; don't weld \"Free roam or fixed timetable…\" shut"
        },
        "hint": {
          "zh": "可转向",
          "en": "Steerable"
        }
      },
      {
        "value": "J",
        "label": {
          "zh": "每日回顾一次「自由行还是跟固定班次，在不社死的前提…」进度（酷一点）",
          "en": "Daily review progress of \"Free roam or fixed timetable…\" (cooler)"
        },
        "hint": {
          "zh": "每日回顾",
          "en": "Daily review"
        }
      },
      {
        "value": "P",
        "label": {
          "zh": "灵感来时先做，排期稍后对齐「自由行还是跟固定班次，在不社死的前提…」",
          "en": "Do it when inspired; align schedule of \"Free roam or fixed timetable…\" later"
        },
        "hint": {
          "zh": "灵感先做",
          "en": "Inspired first"
        }
      }
    ]
  },
  {
    "id": 11,
    "axis": "SN",
    "category": {
      "zh": "职场",
      "en": "Work"
    },
    "topic": "work",
    "tags": [
      "work",
      "sn",
      "humor",
      "layer2"
    ],
    "kicker": {
      "zh": "💼 职场 · 细节或脑洞 · SN",
      "en": "💼 Work · Detail or Daydream · SN"
    },
    "text": {
      "zh": "老板说先出个感觉稿，最好让场面软着陆。对面眼神开始发光。面对「感觉稿」，你会？",
      "en": "Boss wants a vibe draft first, preferably soft-landing the scene. their eyes start glowing. Facing \"vibe draft\", you:"
    },
    "quote": {
      "zh": "金句：把比较关掉，把感受打开。",
      "en": "Quote: Turn off compare; turn on feel."
    },
    "options": [
      {
        "value": "S",
        "label": {
          "zh": "先确认定义：大家说的「老板说先出个感觉稿，最好让场面软着陆」是不是同一件事（酷一点）",
          "en": "Confirm definition: is \"Boss wants a vibe draft firs…\" the same thing? (cooler)"
        },
        "hint": {
          "zh": "对齐定义",
          "en": "Align define"
        }
      },
      {
        "value": "N",
        "label": {
          "zh": "先问如果更理想会怎样，再落地「老板说先出个感觉稿，最好让场面软着陆」",
          "en": "Ask ideal version first, then land \"Boss wants a vibe draft firs…\""
        },
        "hint": {
          "zh": "理想先行",
          "en": "Ideal first"
        }
      },
      {
        "value": "S",
        "label": {
          "zh": "记录现状事实，不让「老板说先出个感觉稿，最好让场面软着陆」被形容词绑架（酷一点）",
          "en": "Log facts so adjectives don't kidnap \"Boss wants a vibe draft firs…\" (cooler)"
        },
        "hint": {
          "zh": "事实记录",
          "en": "Fact log"
        }
      },
      {
        "value": "N",
        "label": {
          "zh": "给「老板说先出个感觉稿，最好让场面软着陆」起一个世界观标题再推进",
          "en": "Title \"Boss wants a vibe draft firs…\" like worldbuilding, then proceed"
        },
        "hint": {
          "zh": "世界观标题",
          "en": "World title"
        }
      }
    ]
  },
  {
    "id": 12,
    "axis": "TF",
    "category": {
      "zh": "搞笑",
      "en": "Funny"
    },
    "topic": "funny",
    "tags": [
      "funny",
      "tf",
      "humor",
      "layer3"
    ],
    "kicker": {
      "zh": "😂 搞笑 · 理智或心软 · TF",
      "en": "😂 Funny · Logic or Soft Heart · TF"
    },
    "text": {
      "zh": "要不要把真相说成段子，最好让场面软着陆。旁白开始阴阳怪气。面对「真相段子」，你会？",
      "en": "Tell truth as a joke or straight, preferably soft-landing the scene. the narrator gets snarky. Facing \"truth bit\", you:"
    },
    "quote": {
      "zh": "金句：你的节奏比别人的期待更重要。",
      "en": "Quote: Your tempo beats their expectations."
    },
    "options": [
      {
        "value": "T",
        "label": {
          "zh": "把「要不要把真相说成段子，最好让场面软着…」拆成可判定的标准",
          "en": "Split \"Tell truth as a joke or stra…\" into decidable criteria"
        },
        "hint": {
          "zh": "判定标准",
          "en": "Criteria"
        }
      },
      {
        "value": "F",
        "label": {
          "zh": "问一句你现在最需要什么，再碰「要不要把真相说成段子，最好让场面软着…」（笑一点）",
          "en": "Ask what they need most, then touch \"Tell truth as a joke or stra…\" (funnier)"
        },
        "hint": {
          "zh": "需要优先",
          "en": "Need first"
        }
      },
      {
        "value": "T",
        "label": {
          "zh": "对事不对人，直接指出「要不要把真相说成段子，最好让场面软着…」的结构性问题",
          "en": "Name structural issues in \"Tell truth as a joke or stra…\""
        },
        "hint": {
          "zh": "对事不对人",
          "en": "Issue focus"
        }
      },
      {
        "value": "F",
        "label": {
          "zh": "先肯定难处，再协商「要不要把真相说成段子，最好让场面软着…」的边界（笑一点）",
          "en": "Affirm the hard part, then negotiate \"Tell truth as a joke or stra…\" (funnier)"
        },
        "hint": {
          "zh": "先肯定",
          "en": "Affirm first"
        }
      }
    ]
  },
  {
    "id": 13,
    "axis": "TF",
    "category": {
      "zh": "游戏",
      "en": "Games"
    },
    "topic": "game",
    "tags": [
      "game",
      "tf",
      "humor",
      "layer3"
    ],
    "kicker": {
      "zh": "🎮 游戏 · 理智或心软 · TF",
      "en": "🎮 Games · Logic or Soft Heart · TF"
    },
    "text": {
      "zh": "挂机队友求情说家里有事，并保住长期关系值。朋友圈已准备好截图。面对「挂机求情」，你会？",
      "en": "AFK teammate pleads family emergency, while protecting long-term relation XP. Moments is ready to screenshot. Facing \"AFK plead\", you:"
    },
    "quote": {
      "zh": "金句：世界很吵，你的判断要有静音键。",
      "en": "Quote: World is loud; judgment needs mute."
    },
    "options": [
      {
        "value": "T",
        "label": {
          "zh": "把「挂机队友求情说家里有事，并保住长期关…」拆成可判定的标准",
          "en": "Split \"AFK teammate pleads family e…\" into decidable criteria"
        },
        "hint": {
          "zh": "判定标准",
          "en": "Criteria"
        }
      },
      {
        "value": "F",
        "label": {
          "zh": "问一句你现在最需要什么，再碰「挂机队友求情说家里有事，并保住长期关…」（笑一点）",
          "en": "Ask what they need most, then touch \"AFK teammate pleads family e…\" (funnier)"
        },
        "hint": {
          "zh": "需要优先",
          "en": "Need first"
        }
      },
      {
        "value": "T",
        "label": {
          "zh": "对事不对人，直接指出「挂机队友求情说家里有事，并保住长期关…」的结构性问题",
          "en": "Name structural issues in \"AFK teammate pleads family e…\""
        },
        "hint": {
          "zh": "对事不对人",
          "en": "Issue focus"
        }
      },
      {
        "value": "F",
        "label": {
          "zh": "先肯定难处，再协商「挂机队友求情说家里有事，并保住长期关…」的边界（笑一点）",
          "en": "Affirm the hard part, then negotiate \"AFK teammate pleads family e…\" (funnier)"
        },
        "hint": {
          "zh": "先肯定",
          "en": "Affirm first"
        }
      }
    ]
  },
  {
    "id": 14,
    "axis": "TF",
    "category": {
      "zh": "人生",
      "en": "Life"
    },
    "topic": "life",
    "tags": [
      "life",
      "tf",
      "humor",
      "layer2"
    ],
    "kicker": {
      "zh": "🌱 人生 · 理智或心软 · TF",
      "en": "🌱 Life · Logic or Soft Heart · TF"
    },
    "text": {
      "zh": "朋友借钱理由很真很惨，还得给未来自己擦屁股。旁白开始阴阳怪气。面对「借钱真惨」，你会？",
      "en": "Friend borrows money with a raw story, and clean up for future-you. the narrator gets snarky. Facing \"loan story\", you:"
    },
    "quote": {
      "zh": "金句：幽默是高级防御，行动是最终补丁。",
      "en": "Quote: Humor is defense; action is the patch."
    },
    "options": [
      {
        "value": "T",
        "label": {
          "zh": "先讲清规则与后果，再处理「朋友借钱理由很真很惨，还得给未来自己…」（酷一点）",
          "en": "Clarify rules/consequences before \"Friend borrows money with a …\" (cooler)"
        },
        "hint": {
          "zh": "规则后果",
          "en": "Rules first"
        }
      },
      {
        "value": "F",
        "label": {
          "zh": "先接住情绪，再一起看「朋友借钱理由很真很惨，还得给未来自己…」",
          "en": "Hold feelings first, then face \"Friend borrows money with a …\""
        },
        "hint": {
          "zh": "接住情绪",
          "en": "Hold feelings"
        }
      },
      {
        "value": "T",
        "label": {
          "zh": "用利弊表评估「朋友借钱理由很真很惨，还得给未来自己…」，少靠气氛投票（酷一点）",
          "en": "Pros/cons table for \"Friend borrows money with a …\", less vibe voting (cooler)"
        },
        "hint": {
          "zh": "利弊表",
          "en": "Pros/cons"
        }
      },
      {
        "value": "F",
        "label": {
          "zh": "优先关系不破，再优化「朋友借钱理由很真很惨，还得给未来自己…」的方案",
          "en": "Protect relationship first, then optimize \"Friend borrows money with a …\""
        },
        "hint": {
          "zh": "关系优先",
          "en": "Relation first"
        }
      }
    ]
  },
  {
    "id": 15,
    "axis": "TF",
    "category": {
      "zh": "恋爱",
      "en": "Love"
    },
    "topic": "love",
    "tags": [
      "love",
      "tf",
      "humor",
      "layer1"
    ],
    "kicker": {
      "zh": "💘 恋爱 · 理智或心软 · TF",
      "en": "💘 Love · Logic or Soft Heart · TF"
    },
    "text": {
      "zh": "复合请求带着逻辑PPT，还得给未来自己擦屁股。你预感到会成为名场面。面对「复合PPT」，你会？",
      "en": "Reconciliation comes with a logic deck, and clean up for future-you. you sense a highlight reel forming. Facing \"reconcile deck\", you:"
    },
    "quote": {
      "zh": "金句：你的节奏比别人的期待更重要。",
      "en": "Quote: Your tempo beats their expectations."
    },
    "options": [
      {
        "value": "T",
        "label": {
          "zh": "给「复合请求带着逻辑PPT，还得给未来自…」一个可复查的结论",
          "en": "Give \"Reconciliation comes with a …\" a reviewable conclusion"
        },
        "hint": {
          "zh": "可复查",
          "en": "Reviewable"
        }
      },
      {
        "value": "F",
        "label": {
          "zh": "让每个人被听见，再收束「复合请求带着逻辑PPT，还得给未来自…」（稳一点）",
          "en": "Make everyone heard, then close \"Reconciliation comes with a …\" (steady)"
        },
        "hint": {
          "zh": "被听见",
          "en": "Be heard"
        }
      },
      {
        "value": "T",
        "label": {
          "zh": "如果证据不足，就暂缓「复合请求带着逻辑PPT，还得给未来自…」的拍板",
          "en": "If evidence weak, pause decision on \"Reconciliation comes with a …\""
        },
        "hint": {
          "zh": "证据暂缓",
          "en": "Evidence pause"
        }
      },
      {
        "value": "F",
        "label": {
          "zh": "用更软的表达推进「复合请求带着逻辑PPT，还得给未来自…」，避免二次伤害（稳一点）",
          "en": "Softer wording on \"Reconciliation comes with a …\" to avoid re-hurt (steady)"
        },
        "hint": {
          "zh": "软表达",
          "en": "Soft wording"
        }
      }
    ]
  },
  {
    "id": 16,
    "axis": "EI",
    "category": {
      "zh": "金钱",
      "en": "Money"
    },
    "topic": "money",
    "tags": [
      "money",
      "ei",
      "humor",
      "layer2"
    ],
    "kicker": {
      "zh": "💸 金钱 · 社死或社牛 · EI",
      "en": "💸 Money · Cringe or Charge · EI"
    },
    "text": {
      "zh": "朋友局开始讨论投资观点，还要能发朋友圈复盘。你预感到会成为名场面。面对「投资观点」，你会？",
      "en": "Hangout turns into investment opinions, and still post a review later. you sense a highlight reel forming. Facing \"invest takes\", you:"
    },
    "quote": {
      "zh": "金句：有趣是天赋，靠谱是修行。",
      "en": "Quote: Fun is talent; reliability is practice."
    },
    "options": [
      {
        "value": "E",
        "label": {
          "zh": "用自嘲开场，先拿下「朋友局开始讨论投资观点，还要能发朋友…」的主动权（酷一点）",
          "en": "Self-roast first and seize initiative on \"Hangout turns into investmen…\" (cooler)"
        },
        "hint": {
          "zh": "自嘲抢权",
          "en": "Roast initiative"
        }
      },
      {
        "value": "I",
        "label": {
          "zh": "保持在线但低频，像旁白一样处理「朋友局开始讨论投资观点，还要能发朋友…」",
          "en": "Stay online low-freq, narrate through \"Hangout turns into investmen…\""
        },
        "hint": {
          "zh": "旁白模式",
          "en": "Narrator mode"
        }
      },
      {
        "value": "E",
        "label": {
          "zh": "快速组话题链，不让「朋友局开始讨论投资观点，还要能发朋友…」停在死寂（酷一点）",
          "en": "Chain topics fast so \"Hangout turns into investmen…\" never dies silent (cooler)"
        },
        "hint": {
          "zh": "话题链",
          "en": "Topic chain"
        }
      },
      {
        "value": "I",
        "label": {
          "zh": "只回应必要信息，把「朋友局开始讨论投资观点，还要能发朋友…」当成可跳过剧情",
          "en": "Only required replies; treat \"Hangout turns into investmen…\" as skippable"
        },
        "hint": {
          "zh": "跳过剧情",
          "en": "Skip scene"
        }
      }
    ]
  },
  {
    "id": 17,
    "axis": "EI",
    "category": {
      "zh": "学习",
      "en": "Study"
    },
    "topic": "study",
    "tags": [
      "study",
      "ei",
      "humor",
      "layer4"
    ],
    "kicker": {
      "zh": "📚 学习 · 社死或社牛 · EI",
      "en": "📚 Study · Cringe or Charge · EI"
    },
    "text": {
      "zh": "老师点名提问你走神了，同时不消耗明天的自己。你的社交电量只剩 12%。面对「点名走神」，你会？",
      "en": "Teacher cold-calls while you zone out, without burning tomorrow-you. your social battery is at 12%. Facing \"cold-call\", you:"
    },
    "quote": {
      "zh": "金句：认真生活，也认真开玩笑。",
      "en": "Quote: Live seriously, joke seriously."
    },
    "options": [
      {
        "value": "E",
        "label": {
          "zh": "主动自我介绍，把「老师点名提问你走神了，同时不消耗明天…」变成你的舞台任务（轻一点）",
          "en": "Self-intro and make \"Teacher cold-calls while you…\" your stage quest (lighter)"
        },
        "hint": {
          "zh": "舞台任务",
          "en": "Stage quest"
        }
      },
      {
        "value": "I",
        "label": {
          "zh": "站到边缘位，用最小互动处理「老师点名提问你走神了，同时不消耗明天…」",
          "en": "Stay edge-side and mini-interact through \"Teacher cold-calls while you…\""
        },
        "hint": {
          "zh": "边缘位",
          "en": "Edge seat"
        }
      },
      {
        "value": "E",
        "label": {
          "zh": "先抛一个轻松问题，带着「老师点名提问你走神了，同时不消耗明天…」往前走（轻一点）",
          "en": "Ask a light question and move \"Teacher cold-calls while you…\" forward (lighter)"
        },
        "hint": {
          "zh": "轻松提问",
          "en": "Light ask"
        }
      },
      {
        "value": "I",
        "label": {
          "zh": "回短句保底，不把「老师点名提问你走神了，同时不消耗明天…」扩成大型晚会",
          "en": "Short replies only; don't expand \"Teacher cold-calls while you…\" into a gala"
        },
        "hint": {
          "zh": "短句保底",
          "en": "Short-reply"
        }
      }
    ]
  },
  {
    "id": 18,
    "axis": "JP",
    "category": {
      "zh": "职场",
      "en": "Work"
    },
    "topic": "work",
    "tags": [
      "work",
      "jp",
      "humor",
      "layer0"
    ],
    "kicker": {
      "zh": "💼 职场 · 计划或浪 · JP",
      "en": "💼 Work · Plan or Flow · JP"
    },
    "text": {
      "zh": "周计划被三个会议吃掉，并保住长期关系值。你的社交电量只剩 12%。面对「会议吞计划」，你会？",
      "en": "Weekly plan eaten by three meetings, while protecting long-term relation XP. your social battery is at 12%. Facing \"meetings eat plan\", you:"
    },
    "quote": {
      "zh": "金句：别把热闹当亲密，别把沉默当冷漠。",
      "en": "Quote: Noise isn't intimacy; silence isn't coldness."
    },
    "options": [
      {
        "value": "J",
        "label": {
          "zh": "把「周计划被三个会议吃掉，并保住长期关系…」的关键路径先铺好",
          "en": "Pave the critical path of \"Weekly plan eaten by three m…\" first"
        },
        "hint": {
          "zh": "关键路径",
          "en": "Critical path"
        }
      },
      {
        "value": "P",
        "label": {
          "zh": "保持可转向，不把「周计划被三个会议吃掉，并保住长期关系…」焊死",
          "en": "Stay steerable; don't weld \"Weekly plan eaten by three m…\" shut"
        },
        "hint": {
          "zh": "可转向",
          "en": "Steerable"
        }
      },
      {
        "value": "J",
        "label": {
          "zh": "每日回顾一次「周计划被三个会议吃掉，并保住长期关系…」进度",
          "en": "Daily review progress of \"Weekly plan eaten by three m…\""
        },
        "hint": {
          "zh": "每日回顾",
          "en": "Daily review"
        }
      },
      {
        "value": "P",
        "label": {
          "zh": "灵感来时先做，排期稍后对齐「周计划被三个会议吃掉，并保住长期关系…」",
          "en": "Do it when inspired; align schedule of \"Weekly plan eaten by three m…\" later"
        },
        "hint": {
          "zh": "灵感先做",
          "en": "Inspired first"
        }
      }
    ]
  },
  {
    "id": 19,
    "axis": "EI",
    "category": {
      "zh": "人生",
      "en": "Life"
    },
    "topic": "life",
    "tags": [
      "life",
      "ei",
      "humor",
      "layer2"
    ],
    "kicker": {
      "zh": "🌱 人生 · 社死或社牛 · EI",
      "en": "🌱 Life · Cringe or Charge · EI"
    },
    "text": {
      "zh": "邻居开始长聊人生，最好让场面软着陆。对面眼神开始发光。面对「邻居长聊」，你会？",
      "en": "Neighbor starts a long life chat, preferably soft-landing the scene. their eyes start glowing. Facing \"neighbor chat\", you:"
    },
    "quote": {
      "zh": "金句：有趣是天赋，靠谱是修行。",
      "en": "Quote: Fun is talent; reliability is practice."
    },
    "options": [
      {
        "value": "E",
        "label": {
          "zh": "笑着接话，把「邻居开始长聊人生，最好让场面软着陆」聊成能转发的名场面（酷一点）",
          "en": "Laugh-reply and turn \"Neighbor starts a long life …\" into shareable lore (cooler)"
        },
        "hint": {
          "zh": "名场面制造",
          "en": "Lore craft"
        }
      },
      {
        "value": "I",
        "label": {
          "zh": "先听完再决定，不让「邻居开始长聊人生，最好让场面软着陆」抽干社交血条",
          "en": "Listen first so \"Neighbor starts a long life …\" doesn't drain social HP"
        },
        "hint": {
          "zh": "听完再动",
          "en": "Listen first"
        }
      },
      {
        "value": "E",
        "label": {
          "zh": "邀请全场一起玩，稀释「邻居开始长聊人生，最好让场面软着陆」的压力光环（酷一点）",
          "en": "Invite everyone so \"Neighbor starts a long life …\" pressure dilutes (cooler)"
        },
        "hint": {
          "zh": "压力稀释",
          "en": "Dilute pressure"
        }
      },
      {
        "value": "I",
        "label": {
          "zh": "找借口短暂离场，给「邻居开始长聊人生，最好让场面软着陆」降温后再回",
          "en": "Step out briefly, cool \"Neighbor starts a long life …\", then return"
        },
        "hint": {
          "zh": "离场降温",
          "en": "Cool exit"
        }
      }
    ]
  },
  {
    "id": 20,
    "axis": "SN",
    "category": {
      "zh": "动漫",
      "en": "Anime"
    },
    "topic": "anime",
    "tags": [
      "anime",
      "sn",
      "humor",
      "layer4"
    ],
    "kicker": {
      "zh": "🎌 动漫 · 细节或脑洞 · SN",
      "en": "🎌 Anime · Detail or Daydream · SN"
    },
    "text": {
      "zh": "角色弧光和作者意图打架，还得给未来自己擦屁股。你的社交电量只剩 12%。面对「弧光打架」，你会？",
      "en": "Character arc fights author intent, and clean up for future-you. your social battery is at 12%. Facing \"arc fight\", you:"
    },
    "quote": {
      "zh": "金句：你的节奏比别人的期待更重要。",
      "en": "Quote: Your tempo beats their expectations."
    },
    "options": [
      {
        "value": "S",
        "label": {
          "zh": "用案例和数据钉住「角色弧光和作者意图打架，还得给未来自…」（轻一点）",
          "en": "Pin \"Character arc fights author …\" with cases and data (lighter)"
        },
        "hint": {
          "zh": "数据钉住",
          "en": "Data pin"
        }
      },
      {
        "value": "N",
        "label": {
          "zh": "先讲隐喻和可能性，再回看「角色弧光和作者意图打架，还得给未来自…」",
          "en": "Talk metaphor/possibility, then revisit \"Character arc fights author …\""
        },
        "hint": {
          "zh": "隐喻先行",
          "en": "Metaphor first"
        }
      },
      {
        "value": "S",
        "label": {
          "zh": "把「角色弧光和作者意图打架，还得给未来自…」还原成可执行清单（轻一点）",
          "en": "Reduce \"Character arc fights author …\" into executable checklist (lighter)"
        },
        "hint": {
          "zh": "可执行",
          "en": "Executable"
        }
      },
      {
        "value": "N",
        "label": {
          "zh": "从「角色弧光和作者意图打架，还得给未来自…」联想到三条未来支线",
          "en": "From \"Character arc fights author …\" branch three future routes"
        },
        "hint": {
          "zh": "未来支线",
          "en": "Future routes"
        }
      }
    ]
  },
  {
    "id": 21,
    "axis": "JP",
    "category": {
      "zh": "游戏",
      "en": "Games"
    },
    "topic": "game",
    "tags": [
      "game",
      "jp",
      "humor",
      "layer2"
    ],
    "kicker": {
      "zh": "🎮 游戏 · 计划或浪 · JP",
      "en": "🎮 Games · Plan or Flow · JP"
    },
    "text": {
      "zh": "排位还是先打休闲局，同时假装很淡定。对面眼神开始发光。面对「排位或休闲」，你会？",
      "en": "Ranked climb or casual first, while faking calm. their eyes start glowing. Facing \"rank or casual\", you:"
    },
    "quote": {
      "zh": "金句：先活成自己的系统，再谈兼容世界。",
      "en": "Quote: Be your system before world compatibility."
    },
    "options": [
      {
        "value": "J",
        "label": {
          "zh": "预设Plan B，降低「排位还是先打休闲局，同时假装很淡定」翻车成本（酷一点）",
          "en": "Prebuild Plan B to cut crash cost of \"Ranked climb or casual first…\" (cooler)"
        },
        "hint": {
          "zh": "Plan B",
          "en": "Plan B"
        }
      },
      {
        "value": "P",
        "label": {
          "zh": "允许今天只完成「排位还是先打休闲局，同时假装很淡定」的最小可行版",
          "en": "Allow MVP-only progress on \"Ranked climb or casual first…\" today"
        },
        "hint": {
          "zh": "最小可行",
          "en": "MVP today"
        }
      },
      {
        "value": "J",
        "label": {
          "zh": "用时间盒限制「排位还是先打休闲局，同时假装很淡定」的拖延区间（酷一点）",
          "en": "Time-box the procrastination zone of \"Ranked climb or casual first…\" (cooler)"
        },
        "hint": {
          "zh": "时间盒",
          "en": "Time box"
        }
      },
      {
        "value": "P",
        "label": {
          "zh": "先行动产生信息，再回头修正「排位还是先打休闲局，同时假装很淡定」",
          "en": "Act for info, then revise \"Ranked climb or casual first…\""
        },
        "hint": {
          "zh": "行动出信息",
          "en": "Act for info"
        }
      }
    ]
  },
  {
    "id": 22,
    "axis": "EI",
    "category": {
      "zh": "学习",
      "en": "Study"
    },
    "topic": "study",
    "tags": [
      "study",
      "ei",
      "humor",
      "layer2"
    ],
    "kicker": {
      "zh": "📚 学习 · 社死或社牛 · EI",
      "en": "📚 Study · Cringe or Charge · EI"
    },
    "text": {
      "zh": "老师点名提问你走神了，并保住长期关系值。现场空气突然凝固。面对「点名走神」，你会？",
      "en": "Teacher cold-calls while you zone out, while protecting long-term relation XP. the air freezes on the spot. Facing \"cold-call\", you:"
    },
    "quote": {
      "zh": "金句：选择少一点，自由多一点。",
      "en": "Quote: Fewer choices, freer life."
    },
    "options": [
      {
        "value": "E",
        "label": {
          "zh": "就着「老师点名提问你走神了，并保住长期关系…」直接开麦破冰，把冷场做成开场（酷一点）",
          "en": "Open the mic on \"Teacher cold-calls while you…\" and turn freeze into opener (cooler)"
        },
        "hint": {
          "zh": "社牛破冰",
          "en": "Charge icebreak"
        }
      },
      {
        "value": "I",
        "label": {
          "zh": "先对「老师点名提问你走神了，并保住长期关系…」点头观察，把电量留给关键回合",
          "en": "Nod through \"Teacher cold-calls while you…\" and save energy for key round"
        },
        "hint": {
          "zh": "低调观察",
          "en": "Quiet observe"
        }
      },
      {
        "value": "E",
        "label": {
          "zh": "拉一个人一起面对「老师点名提问你走神了，并保住长期关系…」，把单机变联机（酷一点）",
          "en": "Pull someone in on \"Teacher cold-calls while you…\" and go co-op (cooler)"
        },
        "hint": {
          "zh": "组队出场",
          "en": "Party up"
        }
      },
      {
        "value": "I",
        "label": {
          "zh": "给「老师点名提问你走神了，并保住长期关系…」一个礼貌微笑，自己切飞行模式续命",
          "en": "Polite smile at \"Teacher cold-calls while you…\", then airplane-mode heal"
        },
        "hint": {
          "zh": "飞行续命",
          "en": "Airplane heal"
        }
      }
    ]
  },
  {
    "id": 23,
    "axis": "JP",
    "category": {
      "zh": "恋爱",
      "en": "Love"
    },
    "topic": "love",
    "tags": [
      "love",
      "jp",
      "humor",
      "layer3"
    ],
    "kicker": {
      "zh": "💘 恋爱 · 计划或浪 · JP",
      "en": "💘 Love · Plan or Flow · JP"
    },
    "text": {
      "zh": "周末约会还没定地点，并保持基本体面。理智和本能开始开会。面对「未定点」，你会？",
      "en": "Weekend date has no place yet, while keeping basic dignity. reason and instinct open a meeting. Facing \"no place\", you:"
    },
    "quote": {
      "zh": "金句：会说不的人，才有资格认真说好。",
      "en": "Quote: Only those who can say no can mean yes."
    },
    "options": [
      {
        "value": "J",
        "label": {
          "zh": "把「周末约会还没定地点，并保持基本体面」的关键路径先铺好",
          "en": "Pave the critical path of \"Weekend date has no place ye…\" first"
        },
        "hint": {
          "zh": "关键路径",
          "en": "Critical path"
        }
      },
      {
        "value": "P",
        "label": {
          "zh": "保持可转向，不把「周末约会还没定地点，并保持基本体面」焊死（笑一点）",
          "en": "Stay steerable; don't weld \"Weekend date has no place ye…\" shut (funnier)"
        },
        "hint": {
          "zh": "可转向",
          "en": "Steerable"
        }
      },
      {
        "value": "J",
        "label": {
          "zh": "每日回顾一次「周末约会还没定地点，并保持基本体面」进度",
          "en": "Daily review progress of \"Weekend date has no place ye…\""
        },
        "hint": {
          "zh": "每日回顾",
          "en": "Daily review"
        }
      },
      {
        "value": "P",
        "label": {
          "zh": "灵感来时先做，排期稍后对齐「周末约会还没定地点，并保持基本体面」（笑一点）",
          "en": "Do it when inspired; align schedule of \"Weekend date has no place ye…\" later (funnier)"
        },
        "hint": {
          "zh": "灵感先做",
          "en": "Inspired first"
        }
      }
    ]
  },
  {
    "id": 24,
    "axis": "SN",
    "category": {
      "zh": "职场",
      "en": "Work"
    },
    "topic": "work",
    "tags": [
      "work",
      "sn",
      "humor",
      "layer4"
    ],
    "kicker": {
      "zh": "💼 职场 · 细节或脑洞 · SN",
      "en": "💼 Work · Detail or Daydream · SN"
    },
    "text": {
      "zh": "复盘会要提炼底层逻辑，还得能复盘成经验。系统提示高风险操作。面对「底层逻辑」，你会？",
      "en": "Retro wants underlying logic, and turn it into review notes. system flags high-risk action. Facing \"base logic\", you:"
    },
    "quote": {
      "zh": "金句：会说不的人，才有资格认真说好。",
      "en": "Quote: Only those who can say no can mean yes."
    },
    "options": [
      {
        "value": "S",
        "label": {
          "zh": "用案例和数据钉住「复盘会要提炼底层逻辑，还得能复盘成经…」（轻一点）",
          "en": "Pin \"Retro wants underlying logic…\" with cases and data (lighter)"
        },
        "hint": {
          "zh": "数据钉住",
          "en": "Data pin"
        }
      },
      {
        "value": "N",
        "label": {
          "zh": "先讲隐喻和可能性，再回看「复盘会要提炼底层逻辑，还得能复盘成经…」",
          "en": "Talk metaphor/possibility, then revisit \"Retro wants underlying logic…\""
        },
        "hint": {
          "zh": "隐喻先行",
          "en": "Metaphor first"
        }
      },
      {
        "value": "S",
        "label": {
          "zh": "把「复盘会要提炼底层逻辑，还得能复盘成经…」还原成可执行清单（轻一点）",
          "en": "Reduce \"Retro wants underlying logic…\" into executable checklist (lighter)"
        },
        "hint": {
          "zh": "可执行",
          "en": "Executable"
        }
      },
      {
        "value": "N",
        "label": {
          "zh": "从「复盘会要提炼底层逻辑，还得能复盘成经…」联想到三条未来支线",
          "en": "From \"Retro wants underlying logic…\" branch three future routes"
        },
        "hint": {
          "zh": "未来支线",
          "en": "Future routes"
        }
      }
    ]
  },
  {
    "id": 25,
    "axis": "JP",
    "category": {
      "zh": "恋爱",
      "en": "Love"
    },
    "topic": "love",
    "tags": [
      "love",
      "jp",
      "humor",
      "layer1"
    ],
    "kicker": {
      "zh": "💘 恋爱 · 计划或浪 · JP",
      "en": "💘 Love · Plan or Flow · JP"
    },
    "text": {
      "zh": "对方突然改行程，还得能复盘成经验。现场空气突然凝固。面对「改行程」，你会？",
      "en": "They suddenly change the plan, and turn it into review notes. the air freezes on the spot. Facing \"plan change\", you:"
    },
    "quote": {
      "zh": "金句：把尴尬当剧情，把勇气当技能点。",
      "en": "Quote: Cringe as plot; courage as skill points."
    },
    "options": [
      {
        "value": "J",
        "label": {
          "zh": "把「对方突然改行程，还得能复盘成经验」的关键路径先铺好",
          "en": "Pave the critical path of \"They suddenly change the pla…\" first"
        },
        "hint": {
          "zh": "关键路径",
          "en": "Critical path"
        }
      },
      {
        "value": "P",
        "label": {
          "zh": "保持可转向，不把「对方突然改行程，还得能复盘成经验」焊死（稳一点）",
          "en": "Stay steerable; don't weld \"They suddenly change the pla…\" shut (steady)"
        },
        "hint": {
          "zh": "可转向",
          "en": "Steerable"
        }
      },
      {
        "value": "J",
        "label": {
          "zh": "每日回顾一次「对方突然改行程，还得能复盘成经验」进度",
          "en": "Daily review progress of \"They suddenly change the pla…\""
        },
        "hint": {
          "zh": "每日回顾",
          "en": "Daily review"
        }
      },
      {
        "value": "P",
        "label": {
          "zh": "灵感来时先做，排期稍后对齐「对方突然改行程，还得能复盘成经验」（稳一点）",
          "en": "Do it when inspired; align schedule of \"They suddenly change the pla…\" later (steady)"
        },
        "hint": {
          "zh": "灵感先做",
          "en": "Inspired first"
        }
      }
    ]
  },
  {
    "id": 26,
    "axis": "JP",
    "category": {
      "zh": "搞笑",
      "en": "Funny"
    },
    "topic": "funny",
    "tags": [
      "funny",
      "jp",
      "humor",
      "layer4"
    ],
    "kicker": {
      "zh": "😂 搞笑 · 计划或浪 · JP",
      "en": "😂 Funny · Plan or Flow · JP"
    },
    "text": {
      "zh": "整活灵感来了但DDL也来了，还要给自己留笑点。时间只给你八秒决策。面对「整活VS DDL」，你会？",
      "en": "Bit idea arrives with a deadline, and keep a punchline ready. you only get eight seconds. Facing \"bit vs DDL\", you:"
    },
    "quote": {
      "zh": "金句：勇敢一点，也休息一点。",
      "en": "Quote: Be braver, and rest more."
    },
    "options": [
      {
        "value": "J",
        "label": {
          "zh": "把「整活灵感来了但DDL也来了，还要给自…」的关键路径先铺好（轻一点）",
          "en": "Pave the critical path of \"Bit idea arrives with a dead…\" first (lighter)"
        },
        "hint": {
          "zh": "关键路径",
          "en": "Critical path"
        }
      },
      {
        "value": "P",
        "label": {
          "zh": "保持可转向，不把「整活灵感来了但DDL也来了，还要给自…」焊死",
          "en": "Stay steerable; don't weld \"Bit idea arrives with a dead…\" shut"
        },
        "hint": {
          "zh": "可转向",
          "en": "Steerable"
        }
      },
      {
        "value": "J",
        "label": {
          "zh": "每日回顾一次「整活灵感来了但DDL也来了，还要给自…」进度（轻一点）",
          "en": "Daily review progress of \"Bit idea arrives with a dead…\" (lighter)"
        },
        "hint": {
          "zh": "每日回顾",
          "en": "Daily review"
        }
      },
      {
        "value": "P",
        "label": {
          "zh": "灵感来时先做，排期稍后对齐「整活灵感来了但DDL也来了，还要给自…」",
          "en": "Do it when inspired; align schedule of \"Bit idea arrives with a dead…\" later"
        },
        "hint": {
          "zh": "灵感先做",
          "en": "Inspired first"
        }
      }
    ]
  },
  {
    "id": 27,
    "axis": "JP",
    "category": {
      "zh": "游戏",
      "en": "Games"
    },
    "topic": "game",
    "tags": [
      "game",
      "jp",
      "humor",
      "layer0"
    ],
    "kicker": {
      "zh": "🎮 游戏 · 计划或浪 · JP",
      "en": "🎮 Games · Plan or Flow · JP"
    },
    "text": {
      "zh": "肝活动还是养精神，并准备好体面离场词。你的社交电量只剩 12%。面对「肝或养」，你会？",
      "en": "Grind event or protect sanity, with a dignified exit line. your social battery is at 12%. Facing \"grind/rest\", you:"
    },
    "quote": {
      "zh": "金句：情绪来了先落座，别让它当CEO。",
      "en": "Quote: Seat emotion; don't elect it CEO."
    },
    "options": [
      {
        "value": "J",
        "label": {
          "zh": "把「肝活动还是养精神，并准备好体面离场词」的关键路径先铺好",
          "en": "Pave the critical path of \"Grind event or protect sanit…\" first"
        },
        "hint": {
          "zh": "关键路径",
          "en": "Critical path"
        }
      },
      {
        "value": "P",
        "label": {
          "zh": "保持可转向，不把「肝活动还是养精神，并准备好体面离场词」焊死",
          "en": "Stay steerable; don't weld \"Grind event or protect sanit…\" shut"
        },
        "hint": {
          "zh": "可转向",
          "en": "Steerable"
        }
      },
      {
        "value": "J",
        "label": {
          "zh": "每日回顾一次「肝活动还是养精神，并准备好体面离场词」进度",
          "en": "Daily review progress of \"Grind event or protect sanit…\""
        },
        "hint": {
          "zh": "每日回顾",
          "en": "Daily review"
        }
      },
      {
        "value": "P",
        "label": {
          "zh": "灵感来时先做，排期稍后对齐「肝活动还是养精神，并准备好体面离场词」",
          "en": "Do it when inspired; align schedule of \"Grind event or protect sanit…\" later"
        },
        "hint": {
          "zh": "灵感先做",
          "en": "Inspired first"
        }
      }
    ]
  },
  {
    "id": 28,
    "axis": "EI",
    "category": {
      "zh": "学习",
      "en": "Study"
    },
    "topic": "study",
    "tags": [
      "study",
      "ei",
      "humor",
      "layer2"
    ],
    "kicker": {
      "zh": "📚 学习 · 社死或社牛 · EI",
      "en": "📚 Study · Cringe or Charge · EI"
    },
    "text": {
      "zh": "学霸群突然@你答疑，同时假装很淡定。你预感到会成为名场面。面对「学霸群@」，你会？",
      "en": "Top-student group @you for answers, while faking calm. you sense a highlight reel forming. Facing \"elite @you\", you:"
    },
    "quote": {
      "zh": "金句：职场不是修罗场，也别把自己当NPC。",
      "en": "Quote: Work isn't pure hell; don't NPC yourself."
    },
    "options": [
      {
        "value": "E",
        "label": {
          "zh": "用自嘲开场，先拿下「学霸群突然@你答疑，同时假装很淡定」的主动权（酷一点）",
          "en": "Self-roast first and seize initiative on \"Top-student group @you for a…\" (cooler)"
        },
        "hint": {
          "zh": "自嘲抢权",
          "en": "Roast initiative"
        }
      },
      {
        "value": "I",
        "label": {
          "zh": "保持在线但低频，像旁白一样处理「学霸群突然@你答疑，同时假装很淡定」",
          "en": "Stay online low-freq, narrate through \"Top-student group @you for a…\""
        },
        "hint": {
          "zh": "旁白模式",
          "en": "Narrator mode"
        }
      },
      {
        "value": "E",
        "label": {
          "zh": "快速组话题链，不让「学霸群突然@你答疑，同时假装很淡定」停在死寂（酷一点）",
          "en": "Chain topics fast so \"Top-student group @you for a…\" never dies silent (cooler)"
        },
        "hint": {
          "zh": "话题链",
          "en": "Topic chain"
        }
      },
      {
        "value": "I",
        "label": {
          "zh": "只回应必要信息，把「学霸群突然@你答疑，同时假装很淡定」当成可跳过剧情",
          "en": "Only required replies; treat \"Top-student group @you for a…\" as skippable"
        },
        "hint": {
          "zh": "跳过剧情",
          "en": "Skip scene"
        }
      }
    ]
  },
  {
    "id": 29,
    "axis": "TF",
    "category": {
      "zh": "学习",
      "en": "Study"
    },
    "topic": "study",
    "tags": [
      "study",
      "tf",
      "humor",
      "layer0"
    ],
    "kicker": {
      "zh": "📚 学习 · 理智或心软 · TF",
      "en": "📚 Study · Logic or Soft Heart · TF"
    },
    "text": {
      "zh": "成绩出来朋友来安慰你，最好让场面软着陆。钱包和尊严同时震动。面对「成绩安慰」，你会？",
      "en": "Friend comforts you after grades, preferably soft-landing the scene. wallet and dignity both vibrate. Facing \"grade comfort\", you:"
    },
    "quote": {
      "zh": "金句：世界很吵，你的判断要有静音键。",
      "en": "Quote: World is loud; judgment needs mute."
    },
    "options": [
      {
        "value": "T",
        "label": {
          "zh": "公开标准，减少「成绩出来朋友来安慰你，最好让场面软着…」里的模糊空间",
          "en": "Publish standards to cut fog in \"Friend comforts you after gr…\""
        },
        "hint": {
          "zh": "公开标准",
          "en": "Open standard"
        }
      },
      {
        "value": "F",
        "label": {
          "zh": "先修复信任，再谈「成绩出来朋友来安慰你，最好让场面软着…」的对错",
          "en": "Repair trust before right/wrong of \"Friend comforts you after gr…\""
        },
        "hint": {
          "zh": "修复信任",
          "en": "Repair trust"
        }
      },
      {
        "value": "T",
        "label": {
          "zh": "用流程解决「成绩出来朋友来安慰你，最好让场面软着…」，而不是靠临时态度",
          "en": "Process-fix \"Friend comforts you after gr…\" instead of mood"
        },
        "hint": {
          "zh": "流程解决",
          "en": "Process fix"
        }
      },
      {
        "value": "F",
        "label": {
          "zh": "站在对方视角复述「成绩出来朋友来安慰你，最好让场面软着…」，确认理解",
          "en": "Restate \"Friend comforts you after gr…\" from their view to confirm"
        },
        "hint": {
          "zh": "视角复述",
          "en": "Perspective restates"
        }
      }
    ]
  },
  {
    "id": 30,
    "axis": "JP",
    "category": {
      "zh": "恋爱",
      "en": "Love"
    },
    "topic": "love",
    "tags": [
      "love",
      "jp",
      "humor",
      "layer4"
    ],
    "kicker": {
      "zh": "💘 恋爱 · 计划或浪 · JP",
      "en": "💘 Love · Plan or Flow · JP"
    },
    "text": {
      "zh": "聊天约时间永远对不齐，最好让场面软着陆。你的人设补丁还没装完。面对「时间对不齐」，你会？",
      "en": "Chat schedules never align, preferably soft-landing the scene. your persona patch is unfinished. Facing \"time mismatch\", you:"
    },
    "quote": {
      "zh": "金句：你不是工具人，你是有保修期的主角。",
      "en": "Quote: You're a hero with warranty, not a tool."
    },
    "options": [
      {
        "value": "J",
        "label": {
          "zh": "预设Plan B，降低「聊天约时间永远对不齐，最好让场面软着…」翻车成本（轻一点）",
          "en": "Prebuild Plan B to cut crash cost of \"Chat schedules never align, …\" (lighter)"
        },
        "hint": {
          "zh": "Plan B",
          "en": "Plan B"
        }
      },
      {
        "value": "P",
        "label": {
          "zh": "允许今天只完成「聊天约时间永远对不齐，最好让场面软着…」的最小可行版",
          "en": "Allow MVP-only progress on \"Chat schedules never align, …\" today"
        },
        "hint": {
          "zh": "最小可行",
          "en": "MVP today"
        }
      },
      {
        "value": "J",
        "label": {
          "zh": "用时间盒限制「聊天约时间永远对不齐，最好让场面软着…」的拖延区间（轻一点）",
          "en": "Time-box the procrastination zone of \"Chat schedules never align, …\" (lighter)"
        },
        "hint": {
          "zh": "时间盒",
          "en": "Time box"
        }
      },
      {
        "value": "P",
        "label": {
          "zh": "先行动产生信息，再回头修正「聊天约时间永远对不齐，最好让场面软着…」",
          "en": "Act for info, then revise \"Chat schedules never align, …\""
        },
        "hint": {
          "zh": "行动出信息",
          "en": "Act for info"
        }
      }
    ]
  },
  {
    "id": 31,
    "axis": "TF",
    "category": {
      "zh": "恋爱",
      "en": "Love"
    },
    "topic": "love",
    "tags": [
      "love",
      "tf",
      "humor",
      "layer3"
    ],
    "kicker": {
      "zh": "💘 恋爱 · 理智或心软 · TF",
      "en": "💘 Love · Logic or Soft Heart · TF"
    },
    "text": {
      "zh": "吵架时对方开始掉小珍珠，最好别被做成表情包。朋友圈已准备好截图。面对「掉小珍珠」，你会？",
      "en": "They start tearing up mid-fight, preferably not become a sticker. Moments is ready to screenshot. Facing \"tearing up\", you:"
    },
    "quote": {
      "zh": "金句：低电量时别做高难度人格运算。",
      "en": "Quote: No hard personality math on low battery."
    },
    "options": [
      {
        "value": "T",
        "label": {
          "zh": "把「吵架时对方开始掉小珍珠，最好别被做成…」拆成可判定的标准",
          "en": "Split \"They start tearing up mid-fi…\" into decidable criteria"
        },
        "hint": {
          "zh": "判定标准",
          "en": "Criteria"
        }
      },
      {
        "value": "F",
        "label": {
          "zh": "问一句你现在最需要什么，再碰「吵架时对方开始掉小珍珠，最好别被做成…」（笑一点）",
          "en": "Ask what they need most, then touch \"They start tearing up mid-fi…\" (funnier)"
        },
        "hint": {
          "zh": "需要优先",
          "en": "Need first"
        }
      },
      {
        "value": "T",
        "label": {
          "zh": "对事不对人，直接指出「吵架时对方开始掉小珍珠，最好别被做成…」的结构性问题",
          "en": "Name structural issues in \"They start tearing up mid-fi…\""
        },
        "hint": {
          "zh": "对事不对人",
          "en": "Issue focus"
        }
      },
      {
        "value": "F",
        "label": {
          "zh": "先肯定难处，再协商「吵架时对方开始掉小珍珠，最好别被做成…」的边界（笑一点）",
          "en": "Affirm the hard part, then negotiate \"They start tearing up mid-fi…\" (funnier)"
        },
        "hint": {
          "zh": "先肯定",
          "en": "Affirm first"
        }
      }
    ]
  },
  {
    "id": 32,
    "axis": "SN",
    "category": {
      "zh": "搞笑",
      "en": "Funny"
    },
    "topic": "funny",
    "tags": [
      "funny",
      "sn",
      "humor",
      "layer0"
    ],
    "kicker": {
      "zh": "😂 搞笑 · 细节或脑洞 · SN",
      "en": "😂 Funny · Detail or Daydream · SN"
    },
    "text": {
      "zh": "脑洞段子和现实细节对撞，在不社死的前提下。对面眼神开始发光。面对「段子对撞」，你会？",
      "en": "Bit collides with real details, without full cringe death. their eyes start glowing. Facing \"bit collision\", you:"
    },
    "quote": {
      "zh": "金句：好吃很重要，吃得安心更重要。",
      "en": "Quote: Tasty matters; eating in peace matters more."
    },
    "options": [
      {
        "value": "S",
        "label": {
          "zh": "先确认定义：大家说的「脑洞段子和现实细节对撞，在不社死的前…」是不是同一件事",
          "en": "Confirm definition: is \"Bit collides with real detai…\" the same thing?"
        },
        "hint": {
          "zh": "对齐定义",
          "en": "Align define"
        }
      },
      {
        "value": "N",
        "label": {
          "zh": "先问如果更理想会怎样，再落地「脑洞段子和现实细节对撞，在不社死的前…」",
          "en": "Ask ideal version first, then land \"Bit collides with real detai…\""
        },
        "hint": {
          "zh": "理想先行",
          "en": "Ideal first"
        }
      },
      {
        "value": "S",
        "label": {
          "zh": "记录现状事实，不让「脑洞段子和现实细节对撞，在不社死的前…」被形容词绑架",
          "en": "Log facts so adjectives don't kidnap \"Bit collides with real detai…\""
        },
        "hint": {
          "zh": "事实记录",
          "en": "Fact log"
        }
      },
      {
        "value": "N",
        "label": {
          "zh": "给「脑洞段子和现实细节对撞，在不社死的前…」起一个世界观标题再推进",
          "en": "Title \"Bit collides with real detai…\" like worldbuilding, then proceed"
        },
        "hint": {
          "zh": "世界观标题",
          "en": "World title"
        }
      }
    ]
  },
  {
    "id": 33,
    "axis": "JP",
    "category": {
      "zh": "搞笑",
      "en": "Funny"
    },
    "topic": "funny",
    "tags": [
      "funny",
      "jp",
      "humor",
      "layer3"
    ],
    "kicker": {
      "zh": "😂 搞笑 · 计划或浪 · JP",
      "en": "😂 Funny · Plan or Flow · JP"
    },
    "text": {
      "zh": "整活灵感来了但DDL也来了，还尽量不翻车。对面眼神开始发光。面对「整活VS DDL」，你会？",
      "en": "Bit idea arrives with a deadline, try not to crash. their eyes start glowing. Facing \"bit vs DDL\", you:"
    },
    "quote": {
      "zh": "金句：把比较关掉，把感受打开。",
      "en": "Quote: Turn off compare; turn on feel."
    },
    "options": [
      {
        "value": "J",
        "label": {
          "zh": "把「整活灵感来了但DDL也来了，还尽量不…」的关键路径先铺好",
          "en": "Pave the critical path of \"Bit idea arrives with a dead…\" first"
        },
        "hint": {
          "zh": "关键路径",
          "en": "Critical path"
        }
      },
      {
        "value": "P",
        "label": {
          "zh": "保持可转向，不把「整活灵感来了但DDL也来了，还尽量不…」焊死（笑一点）",
          "en": "Stay steerable; don't weld \"Bit idea arrives with a dead…\" shut (funnier)"
        },
        "hint": {
          "zh": "可转向",
          "en": "Steerable"
        }
      },
      {
        "value": "J",
        "label": {
          "zh": "每日回顾一次「整活灵感来了但DDL也来了，还尽量不…」进度",
          "en": "Daily review progress of \"Bit idea arrives with a dead…\""
        },
        "hint": {
          "zh": "每日回顾",
          "en": "Daily review"
        }
      },
      {
        "value": "P",
        "label": {
          "zh": "灵感来时先做，排期稍后对齐「整活灵感来了但DDL也来了，还尽量不…」（笑一点）",
          "en": "Do it when inspired; align schedule of \"Bit idea arrives with a dead…\" later (funnier)"
        },
        "hint": {
          "zh": "灵感先做",
          "en": "Inspired first"
        }
      }
    ]
  },
  {
    "id": 34,
    "axis": "EI",
    "category": {
      "zh": "恋爱",
      "en": "Love"
    },
    "topic": "love",
    "tags": [
      "love",
      "ei",
      "humor",
      "layer3"
    ],
    "kicker": {
      "zh": "💘 恋爱 · 社死或社牛 · EI",
      "en": "💘 Love · Cringe or Charge · EI"
    },
    "text": {
      "zh": "暧昧期被共同好友起哄，同时不消耗明天的自己。时间只给你八秒决策。面对「朋友起哄」，你会？",
      "en": "Mutual friends tease your situationship, without burning tomorrow-you. you only get eight seconds. Facing \"friend teasing\", you:"
    },
    "quote": {
      "zh": "金句：会说不的人，才有资格认真说好。",
      "en": "Quote: Only those who can say no can mean yes."
    },
    "options": [
      {
        "value": "E",
        "label": {
          "zh": "笑着接话，把「暧昧期被共同好友起哄，同时不消耗明天…」聊成能转发的名场面",
          "en": "Laugh-reply and turn \"Mutual friends tease your si…\" into shareable lore"
        },
        "hint": {
          "zh": "名场面制造",
          "en": "Lore craft"
        }
      },
      {
        "value": "I",
        "label": {
          "zh": "先听完再决定，不让「暧昧期被共同好友起哄，同时不消耗明天…」抽干社交血条（笑一点）",
          "en": "Listen first so \"Mutual friends tease your si…\" doesn't drain social HP (funnier)"
        },
        "hint": {
          "zh": "听完再动",
          "en": "Listen first"
        }
      },
      {
        "value": "E",
        "label": {
          "zh": "邀请全场一起玩，稀释「暧昧期被共同好友起哄，同时不消耗明天…」的压力光环",
          "en": "Invite everyone so \"Mutual friends tease your si…\" pressure dilutes"
        },
        "hint": {
          "zh": "压力稀释",
          "en": "Dilute pressure"
        }
      },
      {
        "value": "I",
        "label": {
          "zh": "找借口短暂离场，给「暧昧期被共同好友起哄，同时不消耗明天…」降温后再回（笑一点）",
          "en": "Step out briefly, cool \"Mutual friends tease your si…\", then return (funnier)"
        },
        "hint": {
          "zh": "离场降温",
          "en": "Cool exit"
        }
      }
    ]
  },
  {
    "id": 35,
    "axis": "SN",
    "category": {
      "zh": "家庭",
      "en": "Family"
    },
    "topic": "family",
    "tags": [
      "family",
      "sn",
      "humor",
      "layer1"
    ],
    "kicker": {
      "zh": "🏠 家庭 · 细节或脑洞 · SN",
      "en": "🏠 Family · Detail or Daydream · SN"
    },
    "text": {
      "zh": "长辈建议很笼统：听话就好，用最小社交成本。钱包和尊严同时震动。面对「听话就好」，你会？",
      "en": "Elder advice is just be obedient, at minimum social cost. wallet and dignity both vibrate. Facing \"be obedient\", you:"
    },
    "quote": {
      "zh": "金句：幽默是高级防御，行动是最终补丁。",
      "en": "Quote: Humor is defense; action is the patch."
    },
    "options": [
      {
        "value": "S",
        "label": {
          "zh": "先拆「长辈建议很笼统：听话就好，用最小社交…」的具体步骤、时间和材料",
          "en": "Break \"Elder advice is just be obed…\" into steps, time, materials"
        },
        "hint": {
          "zh": "步骤拆解",
          "en": "Step break"
        }
      },
      {
        "value": "N",
        "label": {
          "zh": "先抓「长辈建议很笼统：听话就好，用最小社交…」的方向感与最终画面（稳一点）",
          "en": "Capture direction and end image of \"Elder advice is just be obed…\" (steady)"
        },
        "hint": {
          "zh": "方向画面",
          "en": "Direction shot"
        }
      },
      {
        "value": "S",
        "label": {
          "zh": "列出可验证细节，不让「长辈建议很笼统：听话就好，用最小社交…」飘成气氛学",
          "en": "List checkable details so \"Elder advice is just be obed…\" doesn't float"
        },
        "hint": {
          "zh": "细节清单",
          "en": "Detail list"
        }
      },
      {
        "value": "N",
        "label": {
          "zh": "允许脑洞先行，把「长辈建议很笼统：听话就好，用最小社交…」当成概念草稿（稳一点）",
          "en": "Draft concepts first and treat \"Elder advice is just be obed…\" as sketch (steady)"
        },
        "hint": {
          "zh": "概念草稿",
          "en": "Concept draft"
        }
      }
    ]
  },
  {
    "id": 36,
    "axis": "TF",
    "category": {
      "zh": "学习",
      "en": "Study"
    },
    "topic": "study",
    "tags": [
      "study",
      "tf",
      "humor",
      "layer4"
    ],
    "kicker": {
      "zh": "📚 学习 · 理智或心软 · TF",
      "en": "📚 Study · Logic or Soft Heart · TF"
    },
    "text": {
      "zh": "批改意见又冷又长，顺便保住人设。理智和本能开始开会。面对「冷长批改」，你会？",
      "en": "Feedback is cold and long, and protect the persona. reason and instinct open a meeting. Facing \"cold feedback\", you:"
    },
    "quote": {
      "zh": "金句：有趣是天赋，靠谱是修行。",
      "en": "Quote: Fun is talent; reliability is practice."
    },
    "options": [
      {
        "value": "T",
        "label": {
          "zh": "先讲清规则与后果，再处理「批改意见又冷又长，顺便保住人设」（轻一点）",
          "en": "Clarify rules/consequences before \"Feedback is cold and long, a…\" (lighter)"
        },
        "hint": {
          "zh": "规则后果",
          "en": "Rules first"
        }
      },
      {
        "value": "F",
        "label": {
          "zh": "先接住情绪，再一起看「批改意见又冷又长，顺便保住人设」",
          "en": "Hold feelings first, then face \"Feedback is cold and long, a…\""
        },
        "hint": {
          "zh": "接住情绪",
          "en": "Hold feelings"
        }
      },
      {
        "value": "T",
        "label": {
          "zh": "用利弊表评估「批改意见又冷又长，顺便保住人设」，少靠气氛投票（轻一点）",
          "en": "Pros/cons table for \"Feedback is cold and long, a…\", less vibe voting (lighter)"
        },
        "hint": {
          "zh": "利弊表",
          "en": "Pros/cons"
        }
      },
      {
        "value": "F",
        "label": {
          "zh": "优先关系不破，再优化「批改意见又冷又长，顺便保住人设」的方案",
          "en": "Protect relationship first, then optimize \"Feedback is cold and long, a…\""
        },
        "hint": {
          "zh": "关系优先",
          "en": "Relation first"
        }
      }
    ]
  },
  {
    "id": 37,
    "axis": "TF",
    "category": {
      "zh": "家庭",
      "en": "Family"
    },
    "topic": "family",
    "tags": [
      "family",
      "tf",
      "humor",
      "layer4"
    ],
    "kicker": {
      "zh": "🏠 家庭 · 理智或心软 · TF",
      "en": "🏠 Family · Logic or Soft Heart · TF"
    },
    "text": {
      "zh": "长辈比较你和别人的孩子，并保持基本体面。BGM 突然变得很燃。面对「比较孩子」，你会？",
      "en": "Elders compare you with other kids, while keeping basic dignity. BGM suddenly goes hype. Facing \"compare kids\", you:"
    },
    "quote": {
      "zh": "金句：你的节奏比别人的期待更重要。",
      "en": "Quote: Your tempo beats their expectations."
    },
    "options": [
      {
        "value": "T",
        "label": {
          "zh": "公开标准，减少「长辈比较你和别人的孩子，并保持基本体…」里的模糊空间（轻一点）",
          "en": "Publish standards to cut fog in \"Elders compare you with othe…\" (lighter)"
        },
        "hint": {
          "zh": "公开标准",
          "en": "Open standard"
        }
      },
      {
        "value": "F",
        "label": {
          "zh": "先修复信任，再谈「长辈比较你和别人的孩子，并保持基本体…」的对错",
          "en": "Repair trust before right/wrong of \"Elders compare you with othe…\""
        },
        "hint": {
          "zh": "修复信任",
          "en": "Repair trust"
        }
      },
      {
        "value": "T",
        "label": {
          "zh": "用流程解决「长辈比较你和别人的孩子，并保持基本体…」，而不是靠临时态度（轻一点）",
          "en": "Process-fix \"Elders compare you with othe…\" instead of mood (lighter)"
        },
        "hint": {
          "zh": "流程解决",
          "en": "Process fix"
        }
      },
      {
        "value": "F",
        "label": {
          "zh": "站在对方视角复述「长辈比较你和别人的孩子，并保持基本体…」，确认理解",
          "en": "Restate \"Elders compare you with othe…\" from their view to confirm"
        },
        "hint": {
          "zh": "视角复述",
          "en": "Perspective restates"
        }
      }
    ]
  },
  {
    "id": 38,
    "axis": "SN",
    "category": {
      "zh": "学习",
      "en": "Study"
    },
    "topic": "study",
    "tags": [
      "study",
      "sn",
      "humor",
      "layer0"
    ],
    "kicker": {
      "zh": "📚 学习 · 细节或脑洞 · SN",
      "en": "📚 Study · Detail or Daydream · SN"
    },
    "text": {
      "zh": "论文题目大到能装宇宙，还要能发朋友圈复盘。钱包和尊严同时震动。面对「宇宙论文」，你会？",
      "en": "Thesis title could fit a universe, and still post a review later. wallet and dignity both vibrate. Facing \"universe thesis\", you:"
    },
    "quote": {
      "zh": "金句：钱会说话，但边界说话更清晰。",
      "en": "Quote: Money talks; boundaries talk clearer."
    },
    "options": [
      {
        "value": "S",
        "label": {
          "zh": "按优先级处理「论文题目大到能装宇宙，还要能发朋友圈…」里最硬的约束",
          "en": "Handle hardest constraints in \"Thesis title could fit a uni…\" first"
        },
        "hint": {
          "zh": "硬约束",
          "en": "Hard constraint"
        }
      },
      {
        "value": "N",
        "label": {
          "zh": "先找「论文题目大到能装宇宙，还要能发朋友圈…」背后的模式和故事",
          "en": "Find patterns/story behind \"Thesis title could fit a uni…\""
        },
        "hint": {
          "zh": "模式故事",
          "en": "Pattern story"
        }
      },
      {
        "value": "S",
        "label": {
          "zh": "小步试验，用结果校正「论文题目大到能装宇宙，还要能发朋友圈…」",
          "en": "Small trials to correct \"Thesis title could fit a uni…\""
        },
        "hint": {
          "zh": "小步试验",
          "en": "Small trial"
        }
      },
      {
        "value": "N",
        "label": {
          "zh": "把「论文题目大到能装宇宙，还要能发朋友圈…」当成灵感火花，再慢慢收敛",
          "en": "Treat \"Thesis title could fit a uni…\" as spark, then converge"
        },
        "hint": {
          "zh": "灵感收敛",
          "en": "Spark converge"
        }
      }
    ]
  },
  {
    "id": 39,
    "axis": "SN",
    "category": {
      "zh": "职场",
      "en": "Work"
    },
    "topic": "work",
    "tags": [
      "work",
      "sn",
      "humor",
      "layer0"
    ],
    "kicker": {
      "zh": "💼 职场 · 细节或脑洞 · SN",
      "en": "💼 Work · Detail or Daydream · SN"
    },
    "text": {
      "zh": "线上故障描述互相矛盾，还得给未来自己擦屁股。朋友圈已准备好截图。面对「矛盾故障」，你会？",
      "en": "Incident reports contradict each other, and clean up for future-you. Moments is ready to screenshot. Facing \"contradict incident\", you:"
    },
    "quote": {
      "zh": "金句：二次元救不了现实，但能给你回血。",
      "en": "Quote: Anime won't fix reality, but it heals HP."
    },
    "options": [
      {
        "value": "S",
        "label": {
          "zh": "先拆「线上故障描述互相矛盾，还得给未来自己…」的具体步骤、时间和材料",
          "en": "Break \"Incident reports contradict …\" into steps, time, materials"
        },
        "hint": {
          "zh": "步骤拆解",
          "en": "Step break"
        }
      },
      {
        "value": "N",
        "label": {
          "zh": "先抓「线上故障描述互相矛盾，还得给未来自己…」的方向感与最终画面",
          "en": "Capture direction and end image of \"Incident reports contradict …\""
        },
        "hint": {
          "zh": "方向画面",
          "en": "Direction shot"
        }
      },
      {
        "value": "S",
        "label": {
          "zh": "列出可验证细节，不让「线上故障描述互相矛盾，还得给未来自己…」飘成气氛学",
          "en": "List checkable details so \"Incident reports contradict …\" doesn't float"
        },
        "hint": {
          "zh": "细节清单",
          "en": "Detail list"
        }
      },
      {
        "value": "N",
        "label": {
          "zh": "允许脑洞先行，把「线上故障描述互相矛盾，还得给未来自己…」当成概念草稿",
          "en": "Draft concepts first and treat \"Incident reports contradict …\" as sketch"
        },
        "hint": {
          "zh": "概念草稿",
          "en": "Concept draft"
        }
      }
    ]
  },
  {
    "id": 40,
    "axis": "EI",
    "category": {
      "zh": "恋爱",
      "en": "Love"
    },
    "topic": "love",
    "tags": [
      "love",
      "ei",
      "humor",
      "layer1"
    ],
    "kicker": {
      "zh": "💘 恋爱 · 社死或社牛 · EI",
      "en": "💘 Love · Cringe or Charge · EI"
    },
    "text": {
      "zh": "对方家长突然视频连线，用最小社交成本。你预感到会成为名场面。面对「家长连线」，你会？",
      "en": "Their parents jump on video call, at minimum social cost. you sense a highlight reel forming. Facing \"parent video\", you:"
    },
    "quote": {
      "zh": "金句：选择少一点，自由多一点。",
      "en": "Quote: Fewer choices, freer life."
    },
    "options": [
      {
        "value": "E",
        "label": {
          "zh": "笑着接话，把「对方家长突然视频连线，用最小社交成本」聊成能转发的名场面",
          "en": "Laugh-reply and turn \"Their parents jump on video …\" into shareable lore"
        },
        "hint": {
          "zh": "名场面制造",
          "en": "Lore craft"
        }
      },
      {
        "value": "I",
        "label": {
          "zh": "先听完再决定，不让「对方家长突然视频连线，用最小社交成本」抽干社交血条（稳一点）",
          "en": "Listen first so \"Their parents jump on video …\" doesn't drain social HP (steady)"
        },
        "hint": {
          "zh": "听完再动",
          "en": "Listen first"
        }
      },
      {
        "value": "E",
        "label": {
          "zh": "邀请全场一起玩，稀释「对方家长突然视频连线，用最小社交成本」的压力光环",
          "en": "Invite everyone so \"Their parents jump on video …\" pressure dilutes"
        },
        "hint": {
          "zh": "压力稀释",
          "en": "Dilute pressure"
        }
      },
      {
        "value": "I",
        "label": {
          "zh": "找借口短暂离场，给「对方家长突然视频连线，用最小社交成本」降温后再回（稳一点）",
          "en": "Step out briefly, cool \"Their parents jump on video …\", then return (steady)"
        },
        "hint": {
          "zh": "离场降温",
          "en": "Cool exit"
        }
      }
    ]
  },
  {
    "id": 41,
    "axis": "EI",
    "category": {
      "zh": "恋爱",
      "en": "Love"
    },
    "topic": "love",
    "tags": [
      "love",
      "ei",
      "humor",
      "layer1"
    ],
    "kicker": {
      "zh": "💘 恋爱 · 社死或社牛 · EI",
      "en": "💘 Love · Cringe or Charge · EI"
    },
    "text": {
      "zh": "对方家长突然视频连线，最好让场面软着陆。系统提示高风险操作。面对「家长连线」，你会？",
      "en": "Their parents jump on video call, preferably soft-landing the scene. system flags high-risk action. Facing \"parent video\", you:"
    },
    "quote": {
      "zh": "金句：会说不的人，才有资格认真说好。",
      "en": "Quote: Only those who can say no can mean yes."
    },
    "options": [
      {
        "value": "E",
        "label": {
          "zh": "就着「对方家长突然视频连线，最好让场面软着…」直接开麦破冰，把冷场做成开场",
          "en": "Open the mic on \"Their parents jump on video …\" and turn freeze into opener"
        },
        "hint": {
          "zh": "社牛破冰",
          "en": "Charge icebreak"
        }
      },
      {
        "value": "I",
        "label": {
          "zh": "先对「对方家长突然视频连线，最好让场面软着…」点头观察，把电量留给关键回合（稳一点）",
          "en": "Nod through \"Their parents jump on video …\" and save energy for key round (steady)"
        },
        "hint": {
          "zh": "低调观察",
          "en": "Quiet observe"
        }
      },
      {
        "value": "E",
        "label": {
          "zh": "拉一个人一起面对「对方家长突然视频连线，最好让场面软着…」，把单机变联机",
          "en": "Pull someone in on \"Their parents jump on video …\" and go co-op"
        },
        "hint": {
          "zh": "组队出场",
          "en": "Party up"
        }
      },
      {
        "value": "I",
        "label": {
          "zh": "给「对方家长突然视频连线，最好让场面软着…」一个礼貌微笑，自己切飞行模式续命（稳一点）",
          "en": "Polite smile at \"Their parents jump on video …\", then airplane-mode heal (steady)"
        },
        "hint": {
          "zh": "飞行续命",
          "en": "Airplane heal"
        }
      }
    ]
  },
  {
    "id": 42,
    "axis": "TF",
    "category": {
      "zh": "人生",
      "en": "Life"
    },
    "topic": "life",
    "tags": [
      "life",
      "tf",
      "humor",
      "layer3"
    ],
    "kicker": {
      "zh": "🌱 人生 · 理智或心软 · TF",
      "en": "🌱 Life · Logic or Soft Heart · TF"
    },
    "text": {
      "zh": "家庭会议情绪先于事实，顺便保住人设。朋友圈已准备好截图。面对「情绪会议」，你会？",
      "en": "Family meeting puts feelings first, and protect the persona. Moments is ready to screenshot. Facing \"feel meeting\", you:"
    },
    "quote": {
      "zh": "金句：幽默是高级防御，行动是最终补丁。",
      "en": "Quote: Humor is defense; action is the patch."
    },
    "options": [
      {
        "value": "T",
        "label": {
          "zh": "把「家庭会议情绪先于事实，顺便保住人设」拆成可判定的标准",
          "en": "Split \"Family meeting puts feelings…\" into decidable criteria"
        },
        "hint": {
          "zh": "判定标准",
          "en": "Criteria"
        }
      },
      {
        "value": "F",
        "label": {
          "zh": "问一句你现在最需要什么，再碰「家庭会议情绪先于事实，顺便保住人设」（笑一点）",
          "en": "Ask what they need most, then touch \"Family meeting puts feelings…\" (funnier)"
        },
        "hint": {
          "zh": "需要优先",
          "en": "Need first"
        }
      },
      {
        "value": "T",
        "label": {
          "zh": "对事不对人，直接指出「家庭会议情绪先于事实，顺便保住人设」的结构性问题",
          "en": "Name structural issues in \"Family meeting puts feelings…\""
        },
        "hint": {
          "zh": "对事不对人",
          "en": "Issue focus"
        }
      },
      {
        "value": "F",
        "label": {
          "zh": "先肯定难处，再协商「家庭会议情绪先于事实，顺便保住人设」的边界（笑一点）",
          "en": "Affirm the hard part, then negotiate \"Family meeting puts feelings…\" (funnier)"
        },
        "hint": {
          "zh": "先肯定",
          "en": "Affirm first"
        }
      }
    ]
  },
  {
    "id": 43,
    "axis": "JP",
    "category": {
      "zh": "恋爱",
      "en": "Love"
    },
    "topic": "love",
    "tags": [
      "love",
      "jp",
      "humor",
      "layer1"
    ],
    "kicker": {
      "zh": "💘 恋爱 · 计划或浪 · JP",
      "en": "💘 Love · Plan or Flow · JP"
    },
    "text": {
      "zh": "旅行恋爱想自由行还是跟团，在不社死的前提下。现场空气突然凝固。面对「自由或跟团」，你会？",
      "en": "Love trip: free roam or tour group, without full cringe death. the air freezes on the spot. Facing \"free or tour\", you:"
    },
    "quote": {
      "zh": "金句：温柔不是可欺，是有边界的力量。",
      "en": "Quote: Gentleness is power with borders."
    },
    "options": [
      {
        "value": "J",
        "label": {
          "zh": "把「旅行恋爱想自由行还是跟团，在不社死的…」的关键路径先铺好",
          "en": "Pave the critical path of \"Love trip: free roam or tour…\" first"
        },
        "hint": {
          "zh": "关键路径",
          "en": "Critical path"
        }
      },
      {
        "value": "P",
        "label": {
          "zh": "保持可转向，不把「旅行恋爱想自由行还是跟团，在不社死的…」焊死（稳一点）",
          "en": "Stay steerable; don't weld \"Love trip: free roam or tour…\" shut (steady)"
        },
        "hint": {
          "zh": "可转向",
          "en": "Steerable"
        }
      },
      {
        "value": "J",
        "label": {
          "zh": "每日回顾一次「旅行恋爱想自由行还是跟团，在不社死的…」进度",
          "en": "Daily review progress of \"Love trip: free roam or tour…\""
        },
        "hint": {
          "zh": "每日回顾",
          "en": "Daily review"
        }
      },
      {
        "value": "P",
        "label": {
          "zh": "灵感来时先做，排期稍后对齐「旅行恋爱想自由行还是跟团，在不社死的…」（稳一点）",
          "en": "Do it when inspired; align schedule of \"Love trip: free roam or tour…\" later (steady)"
        },
        "hint": {
          "zh": "灵感先做",
          "en": "Inspired first"
        }
      }
    ]
  },
  {
    "id": 44,
    "axis": "TF",
    "category": {
      "zh": "职场",
      "en": "Work"
    },
    "topic": "work",
    "tags": [
      "work",
      "tf",
      "humor",
      "layer2"
    ],
    "kicker": {
      "zh": "💼 职场 · 理智或心软 · TF",
      "en": "💼 Work · Logic or Soft Heart · TF"
    },
    "text": {
      "zh": "客户情绪崩溃你在线，还得给未来自己擦屁股。旁白开始阴阳怪气。面对「客户崩溃」，你会？",
      "en": "Client melts down while you're live, and clean up for future-you. the narrator gets snarky. Facing \"client melt\", you:"
    },
    "quote": {
      "zh": "金句：今天的离谱，是明天的谈资。",
      "en": "Quote: Today's chaos is tomorrow's story fuel."
    },
    "options": [
      {
        "value": "T",
        "label": {
          "zh": "先讲清规则与后果，再处理「客户情绪崩溃你在线，还得给未来自己擦…」（酷一点）",
          "en": "Clarify rules/consequences before \"Client melts down while you'…\" (cooler)"
        },
        "hint": {
          "zh": "规则后果",
          "en": "Rules first"
        }
      },
      {
        "value": "F",
        "label": {
          "zh": "先接住情绪，再一起看「客户情绪崩溃你在线，还得给未来自己擦…」",
          "en": "Hold feelings first, then face \"Client melts down while you'…\""
        },
        "hint": {
          "zh": "接住情绪",
          "en": "Hold feelings"
        }
      },
      {
        "value": "T",
        "label": {
          "zh": "用利弊表评估「客户情绪崩溃你在线，还得给未来自己擦…」，少靠气氛投票（酷一点）",
          "en": "Pros/cons table for \"Client melts down while you'…\", less vibe voting (cooler)"
        },
        "hint": {
          "zh": "利弊表",
          "en": "Pros/cons"
        }
      },
      {
        "value": "F",
        "label": {
          "zh": "优先关系不破，再优化「客户情绪崩溃你在线，还得给未来自己擦…」的方案",
          "en": "Protect relationship first, then optimize \"Client melts down while you'…\""
        },
        "hint": {
          "zh": "关系优先",
          "en": "Relation first"
        }
      }
    ]
  },
  {
    "id": 45,
    "axis": "TF",
    "category": {
      "zh": "游戏",
      "en": "Games"
    },
    "topic": "game",
    "tags": [
      "game",
      "tf",
      "humor",
      "layer3"
    ],
    "kicker": {
      "zh": "🎮 游戏 · 理智或心软 · TF",
      "en": "🎮 Games · Logic or Soft Heart · TF"
    },
    "text": {
      "zh": "队友失误要不要公开复盘，用最小社交成本。时间只给你八秒决策。面对「公开复盘」，你会？",
      "en": "Publicly review a teammate's mistake?, at minimum social cost. you only get eight seconds. Facing \"public review\", you:"
    },
    "quote": {
      "zh": "金句：已读不回也是一种边界艺术。",
      "en": "Quote: Seen-no-reply is boundary art."
    },
    "options": [
      {
        "value": "T",
        "label": {
          "zh": "给「队友失误要不要公开复盘，用最小社交成…」一个可复查的结论",
          "en": "Give \"Publicly review a teammate's…\" a reviewable conclusion"
        },
        "hint": {
          "zh": "可复查",
          "en": "Reviewable"
        }
      },
      {
        "value": "F",
        "label": {
          "zh": "让每个人被听见，再收束「队友失误要不要公开复盘，用最小社交成…」（笑一点）",
          "en": "Make everyone heard, then close \"Publicly review a teammate's…\" (funnier)"
        },
        "hint": {
          "zh": "被听见",
          "en": "Be heard"
        }
      },
      {
        "value": "T",
        "label": {
          "zh": "如果证据不足，就暂缓「队友失误要不要公开复盘，用最小社交成…」的拍板",
          "en": "If evidence weak, pause decision on \"Publicly review a teammate's…\""
        },
        "hint": {
          "zh": "证据暂缓",
          "en": "Evidence pause"
        }
      },
      {
        "value": "F",
        "label": {
          "zh": "用更软的表达推进「队友失误要不要公开复盘，用最小社交成…」，避免二次伤害（笑一点）",
          "en": "Softer wording on \"Publicly review a teammate's…\" to avoid re-hurt (funnier)"
        },
        "hint": {
          "zh": "软表达",
          "en": "Soft wording"
        }
      }
    ]
  },
  {
    "id": 46,
    "axis": "JP",
    "category": {
      "zh": "搞笑",
      "en": "Funny"
    },
    "topic": "funny",
    "tags": [
      "funny",
      "jp",
      "humor",
      "layer1"
    ],
    "kicker": {
      "zh": "😂 搞笑 · 计划或浪 · JP",
      "en": "😂 Funny · Plan or Flow · JP"
    },
    "text": {
      "zh": "整活灵感来了但DDL也来了，还得给未来自己擦屁股。理智和本能开始开会。面对「整活VS DDL」，你会？",
      "en": "Bit idea arrives with a deadline, and clean up for future-you. reason and instinct open a meeting. Facing \"bit vs DDL\", you:"
    },
    "quote": {
      "zh": "金句：认真生活，也认真开玩笑。",
      "en": "Quote: Live seriously, joke seriously."
    },
    "options": [
      {
        "value": "J",
        "label": {
          "zh": "把「整活灵感来了但DDL也来了，还得给未…」的关键路径先铺好",
          "en": "Pave the critical path of \"Bit idea arrives with a dead…\" first"
        },
        "hint": {
          "zh": "关键路径",
          "en": "Critical path"
        }
      },
      {
        "value": "P",
        "label": {
          "zh": "保持可转向，不把「整活灵感来了但DDL也来了，还得给未…」焊死（稳一点）",
          "en": "Stay steerable; don't weld \"Bit idea arrives with a dead…\" shut (steady)"
        },
        "hint": {
          "zh": "可转向",
          "en": "Steerable"
        }
      },
      {
        "value": "J",
        "label": {
          "zh": "每日回顾一次「整活灵感来了但DDL也来了，还得给未…」进度",
          "en": "Daily review progress of \"Bit idea arrives with a dead…\""
        },
        "hint": {
          "zh": "每日回顾",
          "en": "Daily review"
        }
      },
      {
        "value": "P",
        "label": {
          "zh": "灵感来时先做，排期稍后对齐「整活灵感来了但DDL也来了，还得给未…」（稳一点）",
          "en": "Do it when inspired; align schedule of \"Bit idea arrives with a dead…\" later (steady)"
        },
        "hint": {
          "zh": "灵感先做",
          "en": "Inspired first"
        }
      }
    ]
  },
  {
    "id": 47,
    "axis": "EI",
    "category": {
      "zh": "学习",
      "en": "Study"
    },
    "topic": "study",
    "tags": [
      "study",
      "ei",
      "humor",
      "layer3"
    ],
    "kicker": {
      "zh": "📚 学习 · 社死或社牛 · EI",
      "en": "📚 Study · Cringe or Charge · EI"
    },
    "text": {
      "zh": "老师点名提问你走神了，最好让场面软着陆。旁白开始阴阳怪气。面对「点名走神」，你会？",
      "en": "Teacher cold-calls while you zone out, preferably soft-landing the scene. the narrator gets snarky. Facing \"cold-call\", you:"
    },
    "quote": {
      "zh": "金句：你不是工具人，你是有保修期的主角。",
      "en": "Quote: You're a hero with warranty, not a tool."
    },
    "options": [
      {
        "value": "E",
        "label": {
          "zh": "主动自我介绍，把「老师点名提问你走神了，最好让场面软着…」变成你的舞台任务",
          "en": "Self-intro and make \"Teacher cold-calls while you…\" your stage quest"
        },
        "hint": {
          "zh": "舞台任务",
          "en": "Stage quest"
        }
      },
      {
        "value": "I",
        "label": {
          "zh": "站到边缘位，用最小互动处理「老师点名提问你走神了，最好让场面软着…」（笑一点）",
          "en": "Stay edge-side and mini-interact through \"Teacher cold-calls while you…\" (funnier)"
        },
        "hint": {
          "zh": "边缘位",
          "en": "Edge seat"
        }
      },
      {
        "value": "E",
        "label": {
          "zh": "先抛一个轻松问题，带着「老师点名提问你走神了，最好让场面软着…」往前走",
          "en": "Ask a light question and move \"Teacher cold-calls while you…\" forward"
        },
        "hint": {
          "zh": "轻松提问",
          "en": "Light ask"
        }
      },
      {
        "value": "I",
        "label": {
          "zh": "回短句保底，不把「老师点名提问你走神了，最好让场面软着…」扩成大型晚会（笑一点）",
          "en": "Short replies only; don't expand \"Teacher cold-calls while you…\" into a gala (funnier)"
        },
        "hint": {
          "zh": "短句保底",
          "en": "Short-reply"
        }
      }
    ]
  },
  {
    "id": 48,
    "axis": "EI",
    "category": {
      "zh": "出行",
      "en": "Travel"
    },
    "topic": "travel",
    "tags": [
      "travel",
      "ei",
      "humor",
      "layer3"
    ],
    "kicker": {
      "zh": "🚇 出行 · 社死或社牛 · EI",
      "en": "🚇 Travel · Cringe or Charge · EI"
    },
    "text": {
      "zh": "火车对面开始搭话，顺便保住人设。你的人设补丁还没装完。面对「火车搭话」，你会？",
      "en": "Train seatmate starts chatting, and protect the persona. your persona patch is unfinished. Facing \"train chat\", you:"
    },
    "quote": {
      "zh": "金句：别把热闹当亲密，别把沉默当冷漠。",
      "en": "Quote: Noise isn't intimacy; silence isn't coldness."
    },
    "options": [
      {
        "value": "E",
        "label": {
          "zh": "用自嘲开场，先拿下「火车对面开始搭话，顺便保住人设」的主动权",
          "en": "Self-roast first and seize initiative on \"Train seatmate starts chatti…\""
        },
        "hint": {
          "zh": "自嘲抢权",
          "en": "Roast initiative"
        }
      },
      {
        "value": "I",
        "label": {
          "zh": "保持在线但低频，像旁白一样处理「火车对面开始搭话，顺便保住人设」（笑一点）",
          "en": "Stay online low-freq, narrate through \"Train seatmate starts chatti…\" (funnier)"
        },
        "hint": {
          "zh": "旁白模式",
          "en": "Narrator mode"
        }
      },
      {
        "value": "E",
        "label": {
          "zh": "快速组话题链，不让「火车对面开始搭话，顺便保住人设」停在死寂",
          "en": "Chain topics fast so \"Train seatmate starts chatti…\" never dies silent"
        },
        "hint": {
          "zh": "话题链",
          "en": "Topic chain"
        }
      },
      {
        "value": "I",
        "label": {
          "zh": "只回应必要信息，把「火车对面开始搭话，顺便保住人设」当成可跳过剧情（笑一点）",
          "en": "Only required replies; treat \"Train seatmate starts chatti…\" as skippable (funnier)"
        },
        "hint": {
          "zh": "跳过剧情",
          "en": "Skip scene"
        }
      }
    ]
  }
];

const CATEGORIES = [{"id":"love","zh":"恋爱","en":"Love","emoji":"💘"},{"id":"study","zh":"学习","en":"Study","emoji":"📚"},{"id":"work","zh":"职场","en":"Work","emoji":"💼"},{"id":"life","zh":"人生","en":"Life","emoji":"🌱"},{"id":"funny","zh":"搞笑","en":"Funny","emoji":"😂"},{"id":"anime","zh":"动漫","en":"Anime","emoji":"🎌"},{"id":"game","zh":"游戏","en":"Games","emoji":"🎮"},{"id":"family","zh":"家庭","en":"Family","emoji":"🏠"},{"id":"digital","zh":"社媒","en":"Social","emoji":"📱"},{"id":"travel","zh":"出行","en":"Travel","emoji":"🚇"},{"id":"food","zh":"饮食","en":"Food","emoji":"🍜"},{"id":"money","zh":"金钱","en":"Money","emoji":"💸"},{"id":"dead","zh":"社死","en":"Cringe","emoji":"😰"},{"id":"fish","zh":"摸鱼","en":"Slacking","emoji":"🐟"},{"id":"drama","zh":"追剧","en":"Drama","emoji":"📺"},{"id":"eat","zh":"干饭","en":"Feast","emoji":"🥟"},{"id":"sport","zh":"运动","en":"Sport","emoji":"🏃"},{"id":"pet","zh":"宠物","en":"Pets","emoji":"🐱"},{"id":"night","zh":"深夜","en":"Night","emoji":"🌙"},{"id":"friend","zh":"友情","en":"Friends","emoji":"🤝"}];

const TYPES = {
  "INTJ": {
    "code": "INTJ",
    "name": {
      "zh": "战略架构师",
      "en": "Strategy Architect"
    },
    "english": "Mastermind",
    "energy": {
      "zh": "内倾直觉",
      "en": "Introverted Intuition"
    },
    "sensing": {
      "zh": "直觉型 (N)",
      "en": "Intuitive (N)"
    },
    "thinking": {
      "zh": "思维型 (T)",
      "en": "Thinking (T)"
    },
    "planning": {
      "zh": "判断型 (J)",
      "en": "Judging (J)"
    },
    "analysis": {
      "zh": "你擅长把混乱收成主线，用长期视角做选择。独立、高效，对低质量重复几乎零耐心。",
      "en": "You compress chaos into a mainline and choose with long horizons. Independent, efficient, allergic to low-quality repetition."
    },
    "snark": {
      "zh": "嘴上说随便，内心已经写完三种结局和风险附录。",
      "en": "You say “whatever,” while finishing three endings and a risk appendix."
    },
    "fantasy": {
      "zh": "时空蓝图法师",
      "en": "Timeline Blueprint Mage"
    },
    "animal": {
      "zh": "猫头鹰策划官",
      "en": "Owl Strategist"
    },
    "emoji": "🔮",
    "traits": {
      "zh": [
        "长远规划",
        "系统思维",
        "独立决策",
        "冷静军师，内",
        "反差萌"
      ],
      "en": [
        "long-range planning",
        "systems thinking",
        "independent decisions",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "战略拆解",
        "高效取舍",
        "抗干扰",
        "关键时刻能一针见血"
      ],
      "en": [
        "strategy breakdown",
        "efficient tradeoffs",
        "noise resistance",
        "Cuts to the point in crisis"
      ]
    },
    "watchouts": {
      "zh": [
        "对情绪信号不敏感",
        "容易显得冷",
        "日常可能像人形防火墙"
      ],
      "en": [
        "miss emotional signals",
        "can read as cold",
        "Can feel like a human firewall daily"
      ]
    },
    "growth": {
      "zh": "把“为什么”讲给人听，合作会顺很多。",
      "en": "Say the why out loud—collaboration gets smoother."
    },
    "slogan": {
      "zh": "我不是冷，我只是在加载全局。",
      "en": "Not cold—just loading the full map."
    },
    "vibe": {
      "zh": "冷静军师，内心有张长期作战地图",
      "en": "Cool strategist with a long campaign map"
    },
    "philosophy": {
      "zh": "先把世界看穿，再决定要不要手下留情。",
      "en": "See through the world first, then choose mercy."
    },
    "loveStyle": {
      "zh": "慢热但专一，喜欢用行动代替情话。",
      "en": "Slow-burn loyal; actions over sweet talk."
    },
    "workStyle": {
      "zh": "目标拆解狂魔，讨厌无效会议。",
      "en": "Goal-decomposer; allergic to useless meetings."
    },
    "socialBuff": {
      "zh": "关键时刻能一针见血",
      "en": "Cuts to the point in crisis"
    },
    "socialDebuff": {
      "zh": "日常可能像人形防火墙",
      "en": "Can feel like a human firewall daily"
    },
    "meme": {
      "zh": "我不是高冷，我是电量管理系统严格。",
      "en": "Not cold—strict battery management."
    },
    "bestScene": {
      "zh": "复杂项目、长期布局、独立攻坚",
      "en": "Complex projects, long games, solo raids"
    },
    "worstScene": {
      "zh": "突然团建、即兴尬聊、无意义加班",
      "en": "Surprise bonding, improv small talk, pointless OT"
    }
  },
  "INTP": {
    "code": "INTP",
    "name": {
      "zh": "逻辑探索者",
      "en": "Logic Explorer"
    },
    "english": "Logician",
    "energy": {
      "zh": "内倾直觉",
      "en": "Introverted Intuition"
    },
    "sensing": {
      "zh": "直觉型 (N)",
      "en": "Intuitive (N)"
    },
    "thinking": {
      "zh": "思维型 (T)",
      "en": "Thinking (T)"
    },
    "planning": {
      "zh": "知觉型 (P)",
      "en": "Perceiving (P)"
    },
    "analysis": {
      "zh": "你靠好奇心驱动，喜欢拆原理、挑战假设。自由思考是氧气，落地时需要一点外部结构。",
      "en": "Curiosity-driven; you dismantle principles and challenge assumptions. Free thought is oxygen; shipping needs structure."
    },
    "snark": {
      "zh": "思考链路：展开→卡住→再展开→忘吃饭→突然顿悟。",
      "en": "Thought chain: expand → freeze → expand → forget lunch → enlightenment."
    },
    "fantasy": {
      "zh": "原理拆解炼金师",
      "en": "Principle Alchemy Scholar"
    },
    "animal": {
      "zh": "狐狸实验员",
      "en": "Fox Labmate"
    },
    "emoji": "🧪",
    "traits": {
      "zh": [
        "好奇拆解",
        "概念灵活",
        "独立思考",
        "思维实验室常",
        "反差萌"
      ],
      "en": [
        "curious deconstruction",
        "flexible concepts",
        "independent thought",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "洞察本质",
        "创新假设",
        "冷静分析",
        "能把混乱讨论理出结构"
      ],
      "en": [
        "essence insight",
        "novel hypotheses",
        "calm analysis",
        "Structures chaotic talks"
      ]
    },
    "watchouts": {
      "zh": [
        "拖延落地",
        "社交电量不稳",
        "聊着聊着进入平行宇宙"
      ],
      "en": [
        "shipping delay",
        "uneven social battery",
        "Drifts into a parallel universe mid-chat"
      ]
    },
    "growth": {
      "zh": "给灵感设一个最小可交付版本。",
      "en": "Give inspiration a minimum shippable version."
    },
    "slogan": {
      "zh": "我想通了，但还没写进文档。",
      "en": "I got it—just not in the doc yet."
    },
    "vibe": {
      "zh": "思维实验室常驻研究员",
      "en": "Resident of the idea lab"
    },
    "philosophy": {
      "zh": "问题比答案有趣，过程比结论诚实。",
      "en": "Questions beat answers; process is more honest than conclusions."
    },
    "loveStyle": {
      "zh": "用分享怪知识表达喜欢。",
      "en": "Shows love by sharing weird knowledge."
    },
    "workStyle": {
      "zh": "拆概念、建模型、讨厌拍脑袋。",
      "en": "Breaks concepts, builds models, hates gut-only calls."
    },
    "socialBuff": {
      "zh": "能把混乱讨论理出结构",
      "en": "Structures chaotic talks"
    },
    "socialDebuff": {
      "zh": "聊着聊着进入平行宇宙",
      "en": "Drifts into a parallel universe mid-chat"
    },
    "meme": {
      "zh": "我不是迟钝，我在后台渲染。",
      "en": "Not slow—rendering in the background."
    },
    "bestScene": {
      "zh": "研究、写作、系统优化",
      "en": "Research, writing, systems"
    },
    "worstScene": {
      "zh": "强行社交、频繁打断、空洞KPI",
      "en": "Forced socializing, constant interrupts, empty KPIs"
    }
  },
  "ENTJ": {
    "code": "ENTJ",
    "name": {
      "zh": "决断指挥官",
      "en": "Decisive Commander"
    },
    "english": "Commander",
    "energy": {
      "zh": "外倾思维",
      "en": "Extraverted Thinking"
    },
    "sensing": {
      "zh": "直觉型 (N)",
      "en": "Intuitive (N)"
    },
    "thinking": {
      "zh": "思维型 (T)",
      "en": "Thinking (T)"
    },
    "planning": {
      "zh": "判断型 (J)",
      "en": "Judging (J)"
    },
    "analysis": {
      "zh": "你天然会定目标、分资源、推执行。高标准不是压力，是默认设置。别急着贴标签，先观察你在压力下的默认动作。",
      "en": "You set goals, allocate resources, and push execution by default. High standards are factory settings."
    },
    "snark": {
      "zh": "你的待办列表比别人的人生规划还像正式文件。",
      "en": "Your todo list looks more official than most life plans."
    },
    "fantasy": {
      "zh": "远征军团统帅",
      "en": "Expedition Legion Marshal"
    },
    "animal": {
      "zh": "雄狮项目经理",
      "en": "Lion PM"
    },
    "emoji": "⚡",
    "traits": {
      "zh": [
        "目标导向",
        "组织推动",
        "高压执行",
        "进度条本人，",
        "反差萌"
      ],
      "en": [
        "goal-driven",
        "org push",
        "high-pressure execution",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "决策速度",
        "资源调度",
        "结果负责",
        "能带队冲锋"
      ],
      "en": [
        "decision speed",
        "resource allocation",
        "result ownership",
        "Leads the charge"
      ]
    },
    "watchouts": {
      "zh": [
        "忽略节奏差异",
        "表达过硬",
        "有时像人形催更器"
      ],
      "en": [
        "miss pace differences",
        "over-hard delivery",
        "Can feel like a human reminder bot"
      ]
    },
    "growth": {
      "zh": "在推进度前先同步人的状态。",
      "en": "Sync people’s state before pushing pace."
    },
    "slogan": {
      "zh": "目标不是梦想，是排期。",
      "en": "A goal isn’t a dream—it’s a schedule."
    },
    "vibe": {
      "zh": "进度条本人，走路带风带DDL",
      "en": "A walking progress bar with deadlines"
    },
    "philosophy": {
      "zh": "方向对了，努力才不是自我感动。",
      "en": "Effort only counts when direction is right."
    },
    "loveStyle": {
      "zh": "强势但护短，喜欢共同升级。",
      "en": "Bold and protective; loves leveling up together."
    },
    "workStyle": {
      "zh": "决策快、标准高、执行猛。",
      "en": "Fast decisions, high bar, hard execution."
    },
    "socialBuff": {
      "zh": "能带队冲锋",
      "en": "Leads the charge"
    },
    "socialDebuff": {
      "zh": "有时像人形催更器",
      "en": "Can feel like a human reminder bot"
    },
    "meme": {
      "zh": "不是我凶，是时间在凶。",
      "en": "I’m not fierce—time is."
    },
    "bestScene": {
      "zh": "管理、创业、关键推进",
      "en": "Management, startups, crisis pushes"
    },
    "worstScene": {
      "zh": "无目标闲聊、低效扯皮",
      "en": "Aimless chat, low-efficiency drama"
    }
  },
  "ENTP": {
    "code": "ENTP",
    "name": {
      "zh": "灵感辩论家",
      "en": "Idea Debater"
    },
    "english": "Debater",
    "energy": {
      "zh": "外倾直觉",
      "en": "Extraverted Intuition"
    },
    "sensing": {
      "zh": "直觉型 (N)",
      "en": "Intuitive (N)"
    },
    "thinking": {
      "zh": "思维型 (T)",
      "en": "Thinking (T)"
    },
    "planning": {
      "zh": "知觉型 (P)",
      "en": "Perceiving (P)"
    },
    "analysis": {
      "zh": "你点子密度高，擅长在对立里挖新路。变化是燃料，无聊是终极BOSS。别急着贴标签，先观察你在压力下的默认动作。",
      "en": "High idea density; you dig new paths from opposition. Change is fuel; boredom is final boss."
    },
    "snark": {
      "zh": "你不是抬杠，你是在给现实做压力测试。",
      "en": "Not arguing—stress-testing reality."
    },
    "fantasy": {
      "zh": "混沌创意发明家",
      "en": "Chaos Idea Inventor"
    },
    "animal": {
      "zh": "灵狐段子手",
      "en": "Spirit Fox Comic"
    },
    "emoji": "🎨",
    "traits": {
      "zh": [
        "脑暴连发",
        "辩论快感",
        "机会嗅觉",
        "辩论场加速器",
        "反差萌"
      ],
      "en": [
        "brainstorm bursts",
        "debate joy",
        "opportunity radar",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "创意连接",
        "快速试错",
        "现场应变",
        "把冷场变成脱口秀"
      ],
      "en": [
        "idea linking",
        "fast experiments",
        "live adaptability",
        "Turns silence into a talk show"
      ]
    },
    "watchouts": {
      "zh": [
        "项目过多",
        "收尾不稳",
        "有时抬杠像呼吸"
      ],
      "en": [
        "too many projects",
        "weak closing",
        "Sometimes argues like breathing"
      ]
    },
    "growth": {
      "zh": "每个点子配一个“完成定义”。",
      "en": "Give every idea a definition of done."
    },
    "slogan": {
      "zh": "我反对，是为了更好的版本。",
      "en": "I object for a better version."
    },
    "vibe": {
      "zh": "辩论场加速器，点子批发商",
      "en": "Debate accelerator and idea wholesaler"
    },
    "philosophy": {
      "zh": "先把可能性展开，再谈谁对谁错。",
      "en": "Expand possibilities before verdicts."
    },
    "loveStyle": {
      "zh": "互怼是调情，无聊是分手预警。",
      "en": "Sparring is flirting; boredom is a breakup alert."
    },
    "workStyle": {
      "zh": "破局、提案、临场反应拉满。",
      "en": "Breaks deadlocks, pitches, improvises hard."
    },
    "socialBuff": {
      "zh": "把冷场变成脱口秀",
      "en": "Turns silence into a talk show"
    },
    "socialDebuff": {
      "zh": "有时抬杠像呼吸",
      "en": "Sometimes argues like breathing"
    },
    "meme": {
      "zh": "我不是抬杠，我是在压力测试逻辑。",
      "en": "Not arguing—stress-testing logic."
    },
    "bestScene": {
      "zh": "创意提案、谈判、创新实验",
      "en": "Creative pitches, negotiation, experiments"
    },
    "worstScene": {
      "zh": "死板流程、重复劳动、禁止提问",
      "en": "Rigid process, repetition, no questions"
    }
  },
  "INFJ": {
    "code": "INFJ",
    "name": {
      "zh": "洞察引路人",
      "en": "Insight Guide"
    },
    "english": "Advocate",
    "energy": {
      "zh": "内倾直觉",
      "en": "Introverted Intuition"
    },
    "sensing": {
      "zh": "直觉型 (N)",
      "en": "Intuitive (N)"
    },
    "thinking": {
      "zh": "情感型 (F)",
      "en": "Feeling (F)"
    },
    "planning": {
      "zh": "判断型 (J)",
      "en": "Judging (J)"
    },
    "analysis": {
      "zh": "你能听见没说出口的部分，并把它们织成方向。深度连接比热闹更重要。别急着贴标签，先观察你在压力下的默认动作。",
      "en": "You hear the unsaid and weave it into direction. Depth beats noise."
    },
    "snark": {
      "zh": "表面温柔，内心已经把剧情推到终章还写了旁白。",
      "en": "Soft face, internal director’s cut already at the finale."
    },
    "fantasy": {
      "zh": "星轨预言顾问",
      "en": "Star-Path Oracle Advisor"
    },
    "animal": {
      "zh": "月鹿倾听者",
      "en": "Moon Deer Listener"
    },
    "emoji": "🌙",
    "traits": {
      "zh": [
        "深度共情",
        "意义导向",
        "远见",
        "温柔雷达，擅",
        "反差萌"
      ],
      "en": [
        "deep empathy",
        "meaning-led",
        "foresight",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "洞察人心",
        "长期陪伴",
        "价值导航",
        "给人被理解的安全感"
      ],
      "en": [
        "people insight",
        "long-term support",
        "value navigation",
        "Makes people feel understood"
      ]
    },
    "watchouts": {
      "zh": [
        "过度内耗",
        "边界模糊",
        "容易默默耗尽电量"
      ],
      "en": [
        "over-rumination",
        "blurry boundaries",
        "Quietly drains battery"
      ]
    },
    "growth": {
      "zh": "把感受说出口，也给自己留白。",
      "en": "Say feelings out loud—and leave white space for yourself."
    },
    "slogan": {
      "zh": "我看见了，所以我在意。",
      "en": "I see it, so I care."
    },
    "vibe": {
      "zh": "温柔雷达，擅长听懂潜台词",
      "en": "Gentle radar for subtext"
    },
    "philosophy": {
      "zh": "看见人心，不等于要替人扛下全部风雨。",
      "en": "Seeing hearts doesn’t mean carrying every storm."
    },
    "loveStyle": {
      "zh": "深度连接党，讨厌敷衍式陪伴。",
      "en": "Deep-bond type; hates half-present company."
    },
    "workStyle": {
      "zh": "意义驱动，擅长长期育人与规划。",
      "en": "Meaning-driven; long-term mentoring and planning."
    },
    "socialBuff": {
      "zh": "给人被理解的安全感",
      "en": "Makes people feel understood"
    },
    "socialDebuff": {
      "zh": "容易默默耗尽电量",
      "en": "Quietly drains battery"
    },
    "meme": {
      "zh": "我看起来平静，其实内心在开战略会。",
      "en": "I look calm; inside is a strategy meeting."
    },
    "bestScene": {
      "zh": "咨询、创作、组织文化",
      "en": "Counseling, creative work, culture"
    },
    "worstScene": {
      "zh": "虚伪应酬、价值错位的环境",
      "en": "Fake socializing, misaligned values"
    }
  },
  "INFP": {
    "code": "INFP",
    "name": {
      "zh": "理想诗人",
      "en": "Ideal Poet"
    },
    "english": "Mediator",
    "energy": {
      "zh": "内倾情感",
      "en": "Introverted Feeling"
    },
    "sensing": {
      "zh": "直觉型 (N)",
      "en": "Intuitive (N)"
    },
    "thinking": {
      "zh": "情感型 (F)",
      "en": "Feeling (F)"
    },
    "planning": {
      "zh": "知觉型 (P)",
      "en": "Perceiving (P)"
    },
    "analysis": {
      "zh": "你以价值感导航，对真诚极度敏感。世界粗糙时，你会用想象给它包一层软壳。别急着贴标签，先观察你在压力下的默认动作。",
      "en": "You navigate by values and are allergic to fake. When the world is rough, imagination becomes soft armor."
    },
    "snark": {
      "zh": "外表云淡风轻，收藏夹里全是没写完的人生剧本。",
      "en": "Calm exterior; drafts folder full of unfinished life scripts."
    },
    "fantasy": {
      "zh": "梦境叙事旅人",
      "en": "Dream Narrative Wanderer"
    },
    "animal": {
      "zh": "猫咪诗人",
      "en": "Poet Cat"
    },
    "emoji": "🌸",
    "traits": {
      "zh": [
        "价值敏感",
        "想象丰富",
        "温和坚持",
        "理想主义旅人",
        "反差萌"
      ],
      "en": [
        "value-sensitive",
        "rich imagination",
        "gentle persistence",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "真诚表达",
        "创意共情",
        "独特审美",
        "能把人的柔软接住"
      ],
      "en": [
        "sincere expression",
        "creative empathy",
        "unique taste",
        "Catches people’s soft spots safely"
      ]
    },
    "watchouts": {
      "zh": [
        "逃避冲突",
        "行动犹豫",
        "冲突来时可能原地蒸发"
      ],
      "en": [
        "conflict avoidance",
        "action hesitation",
        "May evaporate during conflict"
      ]
    },
    "growth": {
      "zh": "把理想拆成今天能做的一小步。",
      "en": "Split ideals into one small step today."
    },
    "slogan": {
      "zh": "世界可以吵，我的真心不降噪。",
      "en": "The world can be loud; my sincerity stays unmuted."
    },
    "vibe": {
      "zh": "理想主义旅人，口袋里装着小宇宙",
      "en": "Idealist traveler with a pocket universe"
    },
    "philosophy": {
      "zh": "世界可以吵，内心得有自己的灯。",
      "en": "World can be loud; keep a lamp inside."
    },
    "loveStyle": {
      "zh": "细腻真挚，需要被认真对待。",
      "en": "Tender and sincere; needs real care."
    },
    "workStyle": {
      "zh": "价值对齐才有动力，适合创作表达。",
      "en": "Needs value alignment; thrives in expression."
    },
    "socialBuff": {
      "zh": "能把人的柔软接住",
      "en": "Catches people’s soft spots safely"
    },
    "socialDebuff": {
      "zh": "冲突来时可能原地蒸发",
      "en": "May evaporate during conflict"
    },
    "meme": {
      "zh": "我不是玻璃心，我是高精度情绪传感器。",
      "en": "Not fragile—high-precision emotion sensor."
    },
    "bestScene": {
      "zh": "写作、设计、心理支持、独立创作",
      "en": "Writing, design, support, indie creating"
    },
    "worstScene": {
      "zh": "冷血竞争、价值羞辱、无意义打卡",
      "en": "Cold competition, value shaming, empty check-ins"
    }
  },
  "ENFJ": {
    "code": "ENFJ",
    "name": {
      "zh": "热血组织者",
      "en": "Warm Organizer"
    },
    "english": "Protagonist",
    "energy": {
      "zh": "外倾情感",
      "en": "Extraverted Feeling"
    },
    "sensing": {
      "zh": "直觉型 (N)",
      "en": "Intuitive (N)"
    },
    "thinking": {
      "zh": "情感型 (F)",
      "en": "Feeling (F)"
    },
    "planning": {
      "zh": "判断型 (J)",
      "en": "Judging (J)"
    },
    "analysis": {
      "zh": "你天然会把人聚起来，给方向也给温度。责任心强，有时会忘了给自己留电量。别急着贴标签，先观察你在压力下的默认动作。",
      "en": "You gather people, give direction and warmth. High responsibility; sometimes forget your own battery."
    },
    "snark": {
      "zh": "你是人形群公告：关心所有人，唯独漏掉自己。",
      "en": "Human group announcement: care for all, skip self."
    },
    "fantasy": {
      "zh": "同盟篝火主持",
      "en": "Alliance Bonfire Host"
    },
    "animal": {
      "zh": "金毛啦啦队",
      "en": "Golden Retriever MC"
    },
    "emoji": "🔥",
    "traits": {
      "zh": [
        "带动氛围",
        "责任担当",
        "人际敏感",
        "人群充电器，",
        "反差萌"
      ],
      "en": [
        "vibe leading",
        "responsibility",
        "people sensitivity",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "激励他人",
        "协调冲突",
        "组织成长",
        "气氛组组长本组"
      ],
      "en": [
        "motivate others",
        "mediate conflict",
        "grow groups",
        "Head of vibe operations"
      ]
    },
    "watchouts": {
      "zh": [
        "过度付出",
        "自我忽略",
        "太想照顾所有人"
      ],
      "en": [
        "overgiving",
        "self-neglect",
        "Tries to care for everyone"
      ]
    },
    "growth": {
      "zh": "把“我也需要休息”写进日程。",
      "en": "Put “I also need rest” on the calendar."
    },
    "slogan": {
      "zh": "大家先来，我垫后——但我也要充电。",
      "en": "You first, I cover—then I recharge too."
    },
    "vibe": {
      "zh": "人群充电器，天生场控位",
      "en": "Crowd charger and natural host"
    },
    "philosophy": {
      "zh": "成就别人，不等于牺牲自己。",
      "en": "Lifting others shouldn’t erase you."
    },
    "loveStyle": {
      "zh": "热烈负责，喜欢共同成长剧本。",
      "en": "Warm and responsible; co-growth storyline."
    },
    "workStyle": {
      "zh": "协调、激励、把团队捏成一股绳。",
      "en": "Coordinates, motivates, binds teams."
    },
    "socialBuff": {
      "zh": "气氛组组长本组",
      "en": "Head of vibe operations"
    },
    "socialDebuff": {
      "zh": "太想照顾所有人",
      "en": "Tries to care for everyone"
    },
    "meme": {
      "zh": "我不是好说话，我是默认开启助人模式。",
      "en": "Not soft—help mode is on by default."
    },
    "bestScene": {
      "zh": "教育、社群、管理、公关",
      "en": "Education, community, management, PR"
    },
    "worstScene": {
      "zh": "孤立无援、价值被忽视",
      "en": "Isolation, ignored values"
    }
  },
  "ENFP": {
    "code": "ENFP",
    "name": {
      "zh": "火花冒险家",
      "en": "Spark Adventurer"
    },
    "english": "Campaigner",
    "energy": {
      "zh": "外倾直觉",
      "en": "Extraverted Intuition"
    },
    "sensing": {
      "zh": "直觉型 (N)",
      "en": "Intuitive (N)"
    },
    "thinking": {
      "zh": "情感型 (F)",
      "en": "Feeling (F)"
    },
    "planning": {
      "zh": "知觉型 (P)",
      "en": "Perceiving (P)"
    },
    "analysis": {
      "zh": "你是走动的灵感弹幕，连接人与点子的速度很快。热情是超能力，也需要落地锚点。",
      "en": "A walking inspiration barrage; you connect people and ideas fast. Passion is a superpower that needs anchors."
    },
    "snark": {
      "zh": "同时开了 12 个兴趣标签页，还都觉得自己会回去看。",
      "en": "12 interest tabs open, all convinced you’ll return."
    },
    "fantasy": {
      "zh": "彩虹传送门导游",
      "en": "Rainbow Portal Guide"
    },
    "animal": {
      "zh": "鹦鹉派对官",
      "en": "Party Parrot"
    },
    "emoji": "✨",
    "traits": {
      "zh": [
        "热情连接",
        "创意发散",
        "即兴表达",
        "行走的灵感弹",
        "反差萌"
      ],
      "en": [
        "warm connection",
        "idea divergence",
        "improv expression",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "点燃气氛",
        "跨界串联",
        "快速共情",
        "三句话让场面活过来"
      ],
      "en": [
        "spark rooms",
        "cross-link people",
        "fast empathy",
        "Revives rooms in three lines"
      ]
    },
    "watchouts": {
      "zh": [
        "专注易散",
        "承诺过载",
        "兴趣标签页开太多"
      ],
      "en": [
        "focus scatter",
        "promise overload",
        "Too many interest tabs"
      ]
    },
    "growth": {
      "zh": "兴趣可以多，完成要排队。",
      "en": "Many interests are fine—completion needs a queue."
    },
    "slogan": {
      "zh": "我不是三分钟热度，我是多线程人生。",
      "en": "Not short attention—multithreaded life."
    },
    "vibe": {
      "zh": "行走的灵感弹幕，热度常年在线",
      "en": "Walking inspiration barrage, always hot"
    },
    "philosophy": {
      "zh": "热情可贵，完成更勇敢。",
      "en": "Passion is precious; finishing is braver."
    },
    "loveStyle": {
      "zh": "浪漫即兴，需要自由也需要回应。",
      "en": "Romantic improv; needs freedom and response."
    },
    "workStyle": {
      "zh": "创意连接器，适合打开新局面。",
      "en": "Creative connector; opens new fronts."
    },
    "socialBuff": {
      "zh": "三句话让场面活过来",
      "en": "Revives rooms in three lines"
    },
    "socialDebuff": {
      "zh": "兴趣标签页开太多",
      "en": "Too many interest tabs"
    },
    "meme": {
      "zh": "我不是三分钟热度，我是多线程人生。",
      "en": "Not short heat—multithreaded life."
    },
    "bestScene": {
      "zh": "内容、活动、跨界合作",
      "en": "Content, events, cross-collab"
    },
    "worstScene": {
      "zh": "枯燥流水线、长期压抑表达",
      "en": "Dull pipelines, suppressed expression"
    }
  },
  "ISTJ": {
    "code": "ISTJ",
    "name": {
      "zh": "可靠执行官",
      "en": "Reliable Executor"
    },
    "english": "Logistician",
    "energy": {
      "zh": "内倾实感",
      "en": "Introverted Sensing"
    },
    "sensing": {
      "zh": "实感型 (S)",
      "en": "Sensing (S)"
    },
    "thinking": {
      "zh": "思维型 (T)",
      "en": "Thinking (T)"
    },
    "planning": {
      "zh": "判断型 (J)",
      "en": "Judging (J)"
    },
    "analysis": {
      "zh": "你靠规则、记忆和流程把事情做成。承诺很重，靠谱是你的默认皮肤。别急着贴标签，先观察你在压力下的默认动作。",
      "en": "Rules, memory, and process make things real. Promises are heavy; reliability is default skin."
    },
    "snark": {
      "zh": "别人靠灵感，你靠备份、清单和准时到场。",
      "en": "Others run on inspiration; you run on backups, lists, and on-time arrival."
    },
    "fantasy": {
      "zh": "古城档案守护者",
      "en": "Archive Guardian"
    },
    "animal": {
      "zh": "獾式审计员",
      "en": "Badger Auditor"
    },
    "emoji": "📋",
    "traits": {
      "zh": [
        "稳定执行",
        "细节记忆",
        "责任清晰",
        "秩序守护者，",
        "反差萌"
      ],
      "en": [
        "stable execution",
        "detail memory",
        "clear duty",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "可靠交付",
        "流程优化",
        "风险预防",
        "关键时最能托底"
      ],
      "en": [
        "reliable delivery",
        "process polish",
        "risk prevention",
        "Best foundation in crisis"
      ]
    },
    "watchouts": {
      "zh": [
        "变化适应慢",
        "表达偏硬",
        "变化太快会皱眉"
      ],
      "en": [
        "slow change adapt",
        "stiff expression",
        "Frowns at rapid change"
      ]
    },
    "growth": {
      "zh": "允许 10% 的弹性，世界不会塌。",
      "en": "Allow 10% flex—the world won’t collapse."
    },
    "slogan": {
      "zh": "我说到，就会做到。",
      "en": "If I say it, I do it."
    },
    "vibe": {
      "zh": "秩序守护者，靠谱本靠谱",
      "en": "Order guardian, reliability incarnate"
    },
    "philosophy": {
      "zh": "把小事做对，大事才站得住。",
      "en": "Get small things right so big things stand."
    },
    "loveStyle": {
      "zh": "稳定付出，用陪伴代替表演。",
      "en": "Stable care; presence over performance."
    },
    "workStyle": {
      "zh": "流程清晰、责任到人、结果可追。",
      "en": "Clear process, ownership, traceable results."
    },
    "socialBuff": {
      "zh": "关键时最能托底",
      "en": "Best foundation in crisis"
    },
    "socialDebuff": {
      "zh": "变化太快会皱眉",
      "en": "Frowns at rapid change"
    },
    "meme": {
      "zh": "我不是古板，我是防翻车系统。",
      "en": "Not rigid—anti-crash system."
    },
    "bestScene": {
      "zh": "审计、运营、质量管理、行政",
      "en": "Audit, ops, QA, admin"
    },
    "worstScene": {
      "zh": "毫无规则的混乱局",
      "en": "Rule-free chaos"
    }
  },
  "ISFJ": {
    "code": "ISFJ",
    "name": {
      "zh": "温柔守护者",
      "en": "Gentle Guardian"
    },
    "english": "Defender",
    "energy": {
      "zh": "内倾实感",
      "en": "Introverted Sensing"
    },
    "sensing": {
      "zh": "实感型 (S)",
      "en": "Sensing (S)"
    },
    "thinking": {
      "zh": "情感型 (F)",
      "en": "Feeling (F)"
    },
    "planning": {
      "zh": "判断型 (J)",
      "en": "Judging (J)"
    },
    "analysis": {
      "zh": "你记得别人容易忽略的细节，用稳定照顾维持秩序。安静，但关键度很高。别急着贴标签，先观察你在压力下的默认动作。",
      "en": "You remember details others miss and keep order through steady care. Quiet, high loyalty."
    },
    "snark": {
      "zh": "你是团队的隐形后勤，直到你请假大家才发现世界塌了。",
      "en": "Invisible logistics—until you take leave and the world collapses."
    },
    "fantasy": {
      "zh": "暖灯药剂师",
      "en": "Warm-Lamp Apothecary"
    },
    "animal": {
      "zh": "企鹅护理员",
      "en": "Penguin Care"
    },
    "emoji": "🛡️",
    "traits": {
      "zh": [
        "细心照顾",
        "忠诚稳定",
        "默默支持",
        "温柔后勤部，",
        "反差萌"
      ],
      "en": [
        "careful support",
        "loyal stability",
        "quiet backing",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "关系维护",
        "实操靠谱",
        "体贴入微",
        "让人感到被妥善安放"
      ],
      "en": [
        "bond maintenance",
        "practical reliability",
        "micro care",
        "Makes people feel safely placed"
      ]
    },
    "watchouts": {
      "zh": [
        "不擅长拒绝",
        "情绪积压",
        "不说出口的委屈会堆积"
      ],
      "en": [
        "hard to refuse",
        "emotion backlog",
        "Unspoken hurt stacks up"
      ]
    },
    "growth": {
      "zh": "学会说“这次我帮不到”，也是爱。",
      "en": "Saying “I can’t this time” is also love."
    },
    "slogan": {
      "zh": "我记得你提过的小事。",
      "en": "I remember the small thing you mentioned."
    },
    "vibe": {
      "zh": "温柔后勤部，默默把一切安好",
      "en": "Gentle logistics, quietly fixing everything"
    },
    "philosophy": {
      "zh": "照顾别人之前，先把自己的灯加油。",
      "en": "Refuel your lamp before lighting others."
    },
    "loveStyle": {
      "zh": "细水长流，记得你随口提过的小事。",
      "en": "Long-flow care; remembers small mentions."
    },
    "workStyle": {
      "zh": "支持型高手，细节与责任拉满。",
      "en": "Support expert; details and duty maxed."
    },
    "socialBuff": {
      "zh": "让人感到被妥善安放",
      "en": "Makes people feel safely placed"
    },
    "socialDebuff": {
      "zh": "不说出口的委屈会堆积",
      "en": "Unspoken hurt stacks up"
    },
    "meme": {
      "zh": "我不是好欺负，我只是先忍了三秒。",
      "en": "Not weak—I just waited three seconds."
    },
    "bestScene": {
      "zh": "护理、客户成功、教育支持",
      "en": "Care, CS, education support"
    },
    "worstScene": {
      "zh": "被持续索取且不被看见",
      "en": "Constant taking without being seen"
    }
  },
  "ESTJ": {
    "code": "ESTJ",
    "name": {
      "zh": "现场指挥官",
      "en": "Field Commander"
    },
    "english": "Executive",
    "energy": {
      "zh": "外倾思维",
      "en": "Extraverted Thinking"
    },
    "sensing": {
      "zh": "实感型 (S)",
      "en": "Sensing (S)"
    },
    "thinking": {
      "zh": "思维型 (T)",
      "en": "Thinking (T)"
    },
    "planning": {
      "zh": "判断型 (J)",
      "en": "Judging (J)"
    },
    "analysis": {
      "zh": "你擅长把目标变成可执行动作，并推动大家按节奏完成。结果导向，效率优先。别急着贴标签，先观察你在压力下的默认动作。",
      "en": "You turn goals into executable moves and push the tempo. Results first, efficiency always."
    },
    "snark": {
      "zh": "你的人生BGM是进度条提示音。",
      "en": "Your life BGM is a progress-bar ping."
    },
    "fantasy": {
      "zh": "城邦秩序执政官",
      "en": "City Order Consul"
    },
    "animal": {
      "zh": "鹰式督导",
      "en": "Eagle Supervisor"
    },
    "emoji": "🏛️",
    "traits": {
      "zh": [
        "现场推动",
        "标准清晰",
        "结果负责",
        "现场指挥官，",
        "反差萌"
      ],
      "en": [
        "field drive",
        "clear standards",
        "result ownership",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "组织落地",
        "效率提升",
        "秩序建立",
        "能把一盘散沙拧成绳"
      ],
      "en": [
        "org landing",
        "efficiency lift",
        "order building",
        "Turns loose sand into rope"
      ]
    },
    "watchouts": {
      "zh": [
        "弹性不足",
        "听感偏强势",
        "语气可能像通告"
      ],
      "en": [
        "low flexibility",
        "can sound forceful",
        "Tone can sound like an announcement"
      ]
    },
    "growth": {
      "zh": "在发指令前先问一句“你卡在哪”。",
      "en": "Before orders, ask “where are you stuck?”"
    },
    "slogan": {
      "zh": "别聊风花雪月，先把进度对齐。",
      "en": "Skip poetry—align the progress first."
    },
    "vibe": {
      "zh": "现场指挥官，效率强迫症友好",
      "en": "On-site commander, efficiency-friendly"
    },
    "philosophy": {
      "zh": "规则不是束缚，是少踩坑的护栏。",
      "en": "Rules aren’t cages—they’re guardrails."
    },
    "loveStyle": {
      "zh": "直接明确，承诺说到做到。",
      "en": "Direct and clear; promises kept."
    },
    "workStyle": {
      "zh": "目标、分工、复盘，一条龙。",
      "en": "Goals, roles, reviews—full pipeline."
    },
    "socialBuff": {
      "zh": "能把一盘散沙拧成绳",
      "en": "Turns loose sand into rope"
    },
    "socialDebuff": {
      "zh": "语气可能像通告",
      "en": "Tone can sound like an announcement"
    },
    "meme": {
      "zh": "不是我管太多，是放养会出事。",
      "en": "Not controlling—free-range causes incidents."
    },
    "bestScene": {
      "zh": "管理、项目交付、运营统筹",
      "en": "Management, delivery, ops"
    },
    "worstScene": {
      "zh": "无纪律团队、模糊责任",
      "en": "Undisciplined teams, blurry ownership"
    }
  },
  "ESFJ": {
    "code": "ESFJ",
    "name": {
      "zh": "氛围主理人",
      "en": "Atmosphere Host"
    },
    "english": "Consul",
    "energy": {
      "zh": "外倾情感",
      "en": "Extraverted Feeling"
    },
    "sensing": {
      "zh": "实感型 (S)",
      "en": "Sensing (S)"
    },
    "thinking": {
      "zh": "情感型 (F)",
      "en": "Feeling (F)"
    },
    "planning": {
      "zh": "判断型 (J)",
      "en": "Judging (J)"
    },
    "analysis": {
      "zh": "你对关系场极其敏感，会主动把局盘热、把人照顾好。和谐是你的KPI。别急着贴标签，先观察你在压力下的默认动作。",
      "en": "Highly sensitive to relational fields; you warm rooms and care for people. Harmony is your KPI."
    },
    "snark": {
      "zh": "聚餐座位表在你脑子里比公司架构图还清楚。",
      "en": "Seating charts live clearer in your head than org charts."
    },
    "fantasy": {
      "zh": "节日宴席大总管",
      "en": "Festival Banquet Steward"
    },
    "animal": {
      "zh": "柯基接待官",
      "en": "Corgi Concierge"
    },
    "emoji": "🎀",
    "traits": {
      "zh": [
        "关系经营",
        "服务意识",
        "现场温度",
        "人际关系润滑",
        "反差萌"
      ],
      "en": [
        "relationship ops",
        "service sense",
        "room warmth",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "凝聚力",
        "细节招待",
        "冲突缓和",
        "谁尴尬都会被你救"
      ],
      "en": [
        "cohesion",
        "detail hospitality",
        "conflict softener",
        "Saves anyone from awkwardness"
      ]
    },
    "watchouts": {
      "zh": [
        "过度在意评价",
        "难做恶人",
        "太在意评价会内耗"
      ],
      "en": [
        "overcare about opinions",
        "hard to play bad cop",
        "Overcares about opinions"
      ]
    },
    "growth": {
      "zh": "和谐很重要，但你的边界也是和谐的一部分。",
      "en": "Harmony matters—and your boundary is part of it."
    },
    "slogan": {
      "zh": "来，我给你留了最好的位置。",
      "en": "Come on—I saved you the best seat."
    },
    "vibe": {
      "zh": "人际关系润滑剂，气氛稳定器",
      "en": "Social lubricant and vibe stabilizer"
    },
    "philosophy": {
      "zh": "被需要很好，被尊重更好。",
      "en": "Being needed is nice; being respected is better."
    },
    "loveStyle": {
      "zh": "用心经营仪式感与日常照顾。",
      "en": "Builds rituals and daily care."
    },
    "workStyle": {
      "zh": "协调资源、照顾体验、维护关系。",
      "en": "Coordinates resources, UX, relationships."
    },
    "socialBuff": {
      "zh": "谁尴尬都会被你救",
      "en": "Saves anyone from awkwardness"
    },
    "socialDebuff": {
      "zh": "太在意评价会内耗",
      "en": "Overcares about opinions"
    },
    "meme": {
      "zh": "我不是爱操心，我是预装了关怀系统。",
      "en": "Not nosy—care system preinstalled."
    },
    "bestScene": {
      "zh": "社群、HR、客户关系、活动",
      "en": "Community, HR, CR, events"
    },
    "worstScene": {
      "zh": "冷漠竞争、孤立任务",
      "en": "Cold rivalry, isolated tasks"
    }
  },
  "ISTP": {
    "code": "ISTP",
    "name": {
      "zh": "冷静技师",
      "en": "Cool Technician"
    },
    "english": "Virtuoso",
    "energy": {
      "zh": "内倾思维",
      "en": "Introverted Thinking"
    },
    "sensing": {
      "zh": "实感型 (S)",
      "en": "Sensing (S)"
    },
    "thinking": {
      "zh": "思维型 (T)",
      "en": "Thinking (T)"
    },
    "planning": {
      "zh": "知觉型 (P)",
      "en": "Perceiving (P)"
    },
    "analysis": {
      "zh": "你用动手和观察理解世界，危机时反而更稳。少说多做，自由空间是刚需。别急着贴标签，先观察你在压力下的默认动作。",
      "en": "You learn by doing and observing; calmer in crisis. Less talk, more craft; freedom is non-negotiable."
    },
    "snark": {
      "zh": "表面上在发呆，其实已经把故障点定位到第三个螺丝。",
      "en": "Looks zoned out; already pinned the fault to screw #3."
    },
    "fantasy": {
      "zh": "机械灵巧侠",
      "en": "Mech Dexterity Ranger"
    },
    "animal": {
      "zh": "猫科维修工",
      "en": "Cat Mechanic"
    },
    "emoji": "🛠️",
    "traits": {
      "zh": [
        "动手实操",
        "冷静拆解",
        "自由节奏",
        "冷静修理工，",
        "反差萌"
      ],
      "en": [
        "hands-on craft",
        "calm teardown",
        "free tempo",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "故障定位",
        "临场反应",
        "工具思维",
        "关键现场最稳的那个人"
      ],
      "en": [
        "fault locating",
        "live response",
        "tool thinking",
        "Steadiest person on-site"
      ]
    },
    "watchouts": {
      "zh": [
        "表达偏少",
        "长期规划弱",
        "情绪沟通可能像说明书"
      ],
      "en": [
        "low verbal share",
        "weaker long plans",
        "Emotion talk may sound like a manual"
      ]
    },
    "growth": {
      "zh": "偶尔把你的判断说出来，别人会更信你。",
      "en": "Say your judgment out loud sometimes—people trust you more."
    },
    "slogan": {
      "zh": "别吵，让我听听机器怎么说。",
      "en": "Quiet—let me hear what the machine says."
    },
    "vibe": {
      "zh": "冷静修理工，问题来了先动手",
      "en": "Cool fixer; hands first when problems arrive"
    },
    "philosophy": {
      "zh": "少说多做，世界会诚实反馈。",
      "en": "Less talk, more do—the world replies honestly."
    },
    "loveStyle": {
      "zh": "用帮忙和行动表达喜欢，不靠演讲。",
      "en": "Loves by helping and doing, not speeching."
    },
    "workStyle": {
      "zh": "实操强、应变快、讨厌空谈。",
      "en": "Hands-on, adaptive, anti-empty-talk."
    },
    "socialBuff": {
      "zh": "关键现场最稳的那个人",
      "en": "Steadiest person on-site"
    },
    "socialDebuff": {
      "zh": "情绪沟通可能像说明书",
      "en": "Emotion talk may sound like a manual"
    },
    "meme": {
      "zh": "我不是冷漠，我在看哪里能拧紧。",
      "en": "Not cold—scanning what to tighten."
    },
    "bestScene": {
      "zh": "工程、技术排查、现场处理",
      "en": "Engineering, debugging, field work"
    },
    "worstScene": {
      "zh": "漫长会议、情绪拉扯",
      "en": "Endless meetings, emotional tug-of-war"
    }
  },
  "ISFP": {
    "code": "ISFP",
    "name": {
      "zh": "感官艺术家",
      "en": "Sensory Artist"
    },
    "english": "Adventurer",
    "energy": {
      "zh": "内倾情感",
      "en": "Introverted Feeling"
    },
    "sensing": {
      "zh": "实感型 (S)",
      "en": "Sensing (S)"
    },
    "thinking": {
      "zh": "情感型 (F)",
      "en": "Feeling (F)"
    },
    "planning": {
      "zh": "知觉型 (P)",
      "en": "Perceiving (P)"
    },
    "analysis": {
      "zh": "你通过美、节奏和当下体验认识自己。不喜欢被框住，真诚比表演重要。别急着贴标签，先观察你在压力下的默认动作。",
      "en": "You know yourself through beauty, rhythm, and present experience. Hate cages; sincerity > performance."
    },
    "snark": {
      "zh": "别人卷KPI，你在卷日落角度和耳机歌单。",
      "en": "Others grind KPIs; you grind sunset angles and playlists."
    },
    "fantasy": {
      "zh": "风色采集成长者",
      "en": "Wind-Color Forager"
    },
    "animal": {
      "zh": "小熊猫美学官",
      "en": "Red Panda Aesthete"
    },
    "emoji": "🎧",
    "traits": {
      "zh": [
        "审美敏锐",
        "当下感受",
        "温和自由",
        "美学流浪者，",
        "反差萌"
      ],
      "en": [
        "aesthetic radar",
        "present feel",
        "gentle freedom",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "风格表达",
        "氛围营造",
        "真诚陪伴",
        "给人松弛的真实感"
      ],
      "en": [
        "style expression",
        "vibe crafting",
        "sincere company",
        "Gives relaxed realness"
      ]
    },
    "watchouts": {
      "zh": [
        "回避冲突",
        "规划不稳定",
        "压力大时容易缩回去"
      ],
      "en": [
        "avoid conflict",
        "unstable planning",
        "Retreats under heavy pressure"
      ]
    },
    "growth": {
      "zh": "把喜欢的事做成可重复的小习惯。",
      "en": "Turn what you love into small repeatable habits."
    },
    "slogan": {
      "zh": "这刻好看，就值得认真过。",
      "en": "If this moment is beautiful, it’s worth living fully."
    },
    "vibe": {
      "zh": "美学流浪者，安静但有主见",
      "en": "Aesthetic wanderer, quiet with spine"
    },
    "philosophy": {
      "zh": "美不是奢侈，是活着的证据。",
      "en": "Beauty isn’t luxury—it’s proof of living."
    },
    "loveStyle": {
      "zh": "温柔陪伴，用感受确认关系。",
      "en": "Gentle presence; feels the bond."
    },
    "workStyle": {
      "zh": "手感与审美驱动，适合创作落地。",
      "en": "Craft and taste driven; makes beauty real."
    },
    "socialBuff": {
      "zh": "给人松弛的真实感",
      "en": "Gives relaxed realness"
    },
    "socialDebuff": {
      "zh": "压力大时容易缩回去",
      "en": "Retreats under heavy pressure"
    },
    "meme": {
      "zh": "我不是摆烂，我在保护灵感湿度。",
      "en": "Not flopping—protecting inspiration humidity."
    },
    "bestScene": {
      "zh": "设计、艺术、体验、手工",
      "en": "Design, art, experience, craft"
    },
    "worstScene": {
      "zh": "粗暴管理、审美被踩",
      "en": "Harsh management, taste stomped"
    }
  },
  "ESTP": {
    "code": "ESTP",
    "name": {
      "zh": "现场玩家",
      "en": "Field Player"
    },
    "english": "Entrepreneur",
    "energy": {
      "zh": "外倾实感",
      "en": "Extraverted Sensing"
    },
    "sensing": {
      "zh": "实感型 (S)",
      "en": "Sensing (S)"
    },
    "thinking": {
      "zh": "思维型 (T)",
      "en": "Thinking (T)"
    },
    "planning": {
      "zh": "知觉型 (P)",
      "en": "Perceiving (P)"
    },
    "analysis": {
      "zh": "你反应快、敢试错，擅长把机会从现场里捞出来。行动优先，理论后补。别急着贴标签，先观察你在压力下的默认动作。",
      "en": "Fast reactions, bold experiments; you scoop opportunity from the field. Action first, theory later."
    },
    "snark": {
      "zh": "计划还在加载，人已经到现场了。",
      "en": "Plan still loading; you’re already on site."
    },
    "fantasy": {
      "zh": "风暴特技领航员",
      "en": "Storm Stunt Navigator"
    },
    "animal": {
      "zh": "猎豹冲锋员",
      "en": "Cheetah Striker"
    },
    "emoji": "🏎️",
    "traits": {
      "zh": [
        "行动派",
        "机会嗅觉",
        "临场博弈",
        "现场冲锋队，",
        "反差萌"
      ],
      "en": [
        "action bias",
        "opportunity nose",
        "live game sense",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "快速成交",
        "危机处理",
        "现场领导",
        "带动全场行动力"
      ],
      "en": [
        "fast close",
        "crisis handling",
        "on-site lead",
        "Boosts group action"
      ]
    },
    "watchouts": {
      "zh": [
        "耐心不足",
        "细节遗漏",
        "耐心库存有时告急"
      ],
      "en": [
        "low patience",
        "detail misses",
        "Patience inventory can hit zero"
      ]
    },
    "growth": {
      "zh": "冲之前花 60 秒看风险清单。",
      "en": "Spend 60 seconds on a risk list before charging."
    },
    "slogan": {
      "zh": "别讨论了，先试一枪。",
      "en": "Stop debating—fire a test shot."
    },
    "vibe": {
      "zh": "现场冲锋队，刺激是燃料",
      "en": "Field striker; thrills are fuel"
    },
    "philosophy": {
      "zh": "机会不等人，犹豫会过期。",
      "en": "Chance won’t wait; hesitation expires."
    },
    "loveStyle": {
      "zh": "热烈直接，一起玩才是恋爱。",
      "en": "Bold and direct; play is love language."
    },
    "workStyle": {
      "zh": "抢跑、试错、临场决策。",
      "en": "Sprints, tests, live decisions."
    },
    "socialBuff": {
      "zh": "带动全场行动力",
      "en": "Boosts group action"
    },
    "socialDebuff": {
      "zh": "耐心库存有时告急",
      "en": "Patience inventory can hit zero"
    },
    "meme": {
      "zh": "我不是莽，我是小步快跑版勇敢。",
      "en": "Not reckless—brave in small sprints."
    },
    "bestScene": {
      "zh": "销售、赛事、应急、商务前线",
      "en": "Sales, sports, emergency, frontline biz"
    },
    "worstScene": {
      "zh": "漫长审批、纯理论空转",
      "en": "Long approvals, pure theory loops"
    }
  },
  "ESFP": {
    "code": "ESFP",
    "name": {
      "zh": "现场明星",
      "en": "Live Star"
    },
    "english": "Entertainer",
    "energy": {
      "zh": "外倾实感",
      "en": "Extraverted Sensing"
    },
    "sensing": {
      "zh": "实感型 (S)",
      "en": "Sensing (S)"
    },
    "thinking": {
      "zh": "情感型 (F)",
      "en": "Feeling (F)"
    },
    "planning": {
      "zh": "知觉型 (P)",
      "en": "Perceiving (P)"
    },
    "analysis": {
      "zh": "你把当下过成舞台，感染力强，擅长让人放松。快乐是策略，也是天赋。别急着贴标签，先观察你在压力下的默认动作。",
      "en": "You turn the present into a stage; strong presence, great at easing people. Joy is both strategy and gift."
    },
    "snark": {
      "zh": "你一进门，局的音量自动上调两格。",
      "en": "You enter; the room volume auto-raises two notches."
    },
    "fantasy": {
      "zh": "星光派对领唱",
      "en": "Starlight Party Lead"
    },
    "animal": {
      "zh": "海豚气氛组",
      "en": "Dolphin Vibe Crew"
    },
    "emoji": "🎤",
    "traits": {
      "zh": [
        "现场魅力",
        "快乐传导",
        "即兴互动",
        "现场开心果，",
        "反差萌"
      ],
      "en": [
        "live charm",
        "joy transmission",
        "improv interaction",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "带动情绪",
        "社交润滑",
        "体验设计",
        "谁郁闷都能被你点亮"
      ],
      "en": [
        "mood lifting",
        "social lube",
        "experience design",
        "Lights up anyone gloomy"
      ]
    },
    "watchouts": {
      "zh": [
        "长期规划弱",
        "易被即时刺激带走",
        "长期枯燥会掉血"
      ],
      "en": [
        "weak long plans",
        "pulled by instant stimuli",
        "Long dullness drains HP"
      ]
    },
    "growth": {
      "zh": "给快乐加一个明天也能复用的结构。",
      "en": "Add a structure so joy can reuse tomorrow."
    },
    "slogan": {
      "zh": "人生短，先把这局玩好看。",
      "en": "Life’s short—make this round look good."
    },
    "vibe": {
      "zh": "现场开心果，快乐传染源",
      "en": "Live-room joy source"
    },
    "philosophy": {
      "zh": "认真生活，也认真快乐。",
      "en": "Live earnestly—and joyfully."
    },
    "loveStyle": {
      "zh": "浪漫具体，喜欢制造共同回忆。",
      "en": "Concrete romance; builds shared memories."
    },
    "workStyle": {
      "zh": "表现力强，适合面对人的舞台。",
      "en": "Expressive; thrives on human stages."
    },
    "socialBuff": {
      "zh": "谁郁闷都能被你点亮",
      "en": "Lights up anyone gloomy"
    },
    "socialDebuff": {
      "zh": "长期枯燥会掉血",
      "en": "Long dullness drains HP"
    },
    "meme": {
      "zh": "我不是吵，我是给沉闷世界加BGM。",
      "en": "Not loud—adding BGM to a dull world."
    },
    "bestScene": {
      "zh": "表演、主持、服务体验、达人",
      "en": "Performance, hosting, service, creator"
    },
    "worstScene": {
      "zh": "孤立重复、情绪压抑环境",
      "en": "Isolated repetition, suppressed mood"
    }
  }
};

const CODEX = [
  {
    "id": "INTJ",
    "kind": "core",
    "code": "INTJ",
    "name": {
      "zh": "战略架构师",
      "en": "Strategy Architect"
    },
    "english": "Mastermind",
    "emoji": "🔮",
    "animal": {
      "zh": "猫头鹰策划官",
      "en": "Owl Strategist"
    },
    "fantasy": {
      "zh": "时空蓝图法师",
      "en": "Timeline Blueprint Mage"
    },
    "vibe": {
      "zh": "冷静军师，内心有张长期作战地图",
      "en": "Cool strategist with a long campaign map"
    },
    "philosophy": {
      "zh": "先把世界看穿，再决定要不要手下留情。",
      "en": "See through the world first, then choose mercy."
    },
    "analysis": {
      "zh": "你擅长把混乱收成主线，用长期视角做选择。独立、高效，对低质量重复几乎零耐心。",
      "en": "You compress chaos into a mainline and choose with long horizons. Independent, efficient, allergic to low-quality repetition."
    },
    "snark": {
      "zh": "嘴上说随便，内心已经写完三种结局和风险附录。",
      "en": "You say “whatever,” while finishing three endings and a risk appendix."
    },
    "traits": {
      "zh": [
        "长远规划",
        "系统思维",
        "独立决策",
        "冷静军师，内",
        "反差萌"
      ],
      "en": [
        "long-range planning",
        "systems thinking",
        "independent decisions",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "战略拆解",
        "高效取舍",
        "抗干扰",
        "关键时刻能一针见血"
      ],
      "en": [
        "strategy breakdown",
        "efficient tradeoffs",
        "noise resistance",
        "Cuts to the point in crisis"
      ]
    },
    "watchouts": {
      "zh": [
        "对情绪信号不敏感",
        "容易显得冷",
        "日常可能像人形防火墙"
      ],
      "en": [
        "miss emotional signals",
        "can read as cold",
        "Can feel like a human firewall daily"
      ]
    },
    "growth": {
      "zh": "把“为什么”讲给人听，合作会顺很多。",
      "en": "Say the why out loud—collaboration gets smoother."
    },
    "slogan": {
      "zh": "我不是冷，我只是在加载全局。",
      "en": "Not cold—just loading the full map."
    },
    "meme": {
      "zh": "我不是高冷，我是电量管理系统严格。",
      "en": "Not cold—strict battery management."
    },
    "loveStyle": {
      "zh": "慢热但专一，喜欢用行动代替情话。",
      "en": "Slow-burn loyal; actions over sweet talk."
    },
    "workStyle": {
      "zh": "目标拆解狂魔，讨厌无效会议。",
      "en": "Goal-decomposer; allergic to useless meetings."
    },
    "socialBuff": {
      "zh": "关键时刻能一针见血",
      "en": "Cuts to the point in crisis"
    },
    "socialDebuff": {
      "zh": "日常可能像人形防火墙",
      "en": "Can feel like a human firewall daily"
    },
    "bestScene": {
      "zh": "复杂项目、长期布局、独立攻坚",
      "en": "Complex projects, long games, solo raids"
    },
    "worstScene": {
      "zh": "突然团建、即兴尬聊、无意义加班",
      "en": "Surprise bonding, improv small talk, pointless OT"
    }
  },
  {
    "id": "INTP",
    "kind": "core",
    "code": "INTP",
    "name": {
      "zh": "逻辑探索者",
      "en": "Logic Explorer"
    },
    "english": "Logician",
    "emoji": "🧪",
    "animal": {
      "zh": "狐狸实验员",
      "en": "Fox Labmate"
    },
    "fantasy": {
      "zh": "原理拆解炼金师",
      "en": "Principle Alchemy Scholar"
    },
    "vibe": {
      "zh": "思维实验室常驻研究员",
      "en": "Resident of the idea lab"
    },
    "philosophy": {
      "zh": "问题比答案有趣，过程比结论诚实。",
      "en": "Questions beat answers; process is more honest than conclusions."
    },
    "analysis": {
      "zh": "你靠好奇心驱动，喜欢拆原理、挑战假设。自由思考是氧气，落地时需要一点外部结构。",
      "en": "Curiosity-driven; you dismantle principles and challenge assumptions. Free thought is oxygen; shipping needs structure."
    },
    "snark": {
      "zh": "思考链路：展开→卡住→再展开→忘吃饭→突然顿悟。",
      "en": "Thought chain: expand → freeze → expand → forget lunch → enlightenment."
    },
    "traits": {
      "zh": [
        "好奇拆解",
        "概念灵活",
        "独立思考",
        "思维实验室常",
        "反差萌"
      ],
      "en": [
        "curious deconstruction",
        "flexible concepts",
        "independent thought",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "洞察本质",
        "创新假设",
        "冷静分析",
        "能把混乱讨论理出结构"
      ],
      "en": [
        "essence insight",
        "novel hypotheses",
        "calm analysis",
        "Structures chaotic talks"
      ]
    },
    "watchouts": {
      "zh": [
        "拖延落地",
        "社交电量不稳",
        "聊着聊着进入平行宇宙"
      ],
      "en": [
        "shipping delay",
        "uneven social battery",
        "Drifts into a parallel universe mid-chat"
      ]
    },
    "growth": {
      "zh": "给灵感设一个最小可交付版本。",
      "en": "Give inspiration a minimum shippable version."
    },
    "slogan": {
      "zh": "我想通了，但还没写进文档。",
      "en": "I got it—just not in the doc yet."
    },
    "meme": {
      "zh": "我不是迟钝，我在后台渲染。",
      "en": "Not slow—rendering in the background."
    },
    "loveStyle": {
      "zh": "用分享怪知识表达喜欢。",
      "en": "Shows love by sharing weird knowledge."
    },
    "workStyle": {
      "zh": "拆概念、建模型、讨厌拍脑袋。",
      "en": "Breaks concepts, builds models, hates gut-only calls."
    },
    "socialBuff": {
      "zh": "能把混乱讨论理出结构",
      "en": "Structures chaotic talks"
    },
    "socialDebuff": {
      "zh": "聊着聊着进入平行宇宙",
      "en": "Drifts into a parallel universe mid-chat"
    },
    "bestScene": {
      "zh": "研究、写作、系统优化",
      "en": "Research, writing, systems"
    },
    "worstScene": {
      "zh": "强行社交、频繁打断、空洞KPI",
      "en": "Forced socializing, constant interrupts, empty KPIs"
    }
  },
  {
    "id": "ENTJ",
    "kind": "core",
    "code": "ENTJ",
    "name": {
      "zh": "决断指挥官",
      "en": "Decisive Commander"
    },
    "english": "Commander",
    "emoji": "⚡",
    "animal": {
      "zh": "雄狮项目经理",
      "en": "Lion PM"
    },
    "fantasy": {
      "zh": "远征军团统帅",
      "en": "Expedition Legion Marshal"
    },
    "vibe": {
      "zh": "进度条本人，走路带风带DDL",
      "en": "A walking progress bar with deadlines"
    },
    "philosophy": {
      "zh": "方向对了，努力才不是自我感动。",
      "en": "Effort only counts when direction is right."
    },
    "analysis": {
      "zh": "你天然会定目标、分资源、推执行。高标准不是压力，是默认设置。别急着贴标签，先观察你在压力下的默认动作。",
      "en": "You set goals, allocate resources, and push execution by default. High standards are factory settings."
    },
    "snark": {
      "zh": "你的待办列表比别人的人生规划还像正式文件。",
      "en": "Your todo list looks more official than most life plans."
    },
    "traits": {
      "zh": [
        "目标导向",
        "组织推动",
        "高压执行",
        "进度条本人，",
        "反差萌"
      ],
      "en": [
        "goal-driven",
        "org push",
        "high-pressure execution",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "决策速度",
        "资源调度",
        "结果负责",
        "能带队冲锋"
      ],
      "en": [
        "decision speed",
        "resource allocation",
        "result ownership",
        "Leads the charge"
      ]
    },
    "watchouts": {
      "zh": [
        "忽略节奏差异",
        "表达过硬",
        "有时像人形催更器"
      ],
      "en": [
        "miss pace differences",
        "over-hard delivery",
        "Can feel like a human reminder bot"
      ]
    },
    "growth": {
      "zh": "在推进度前先同步人的状态。",
      "en": "Sync people’s state before pushing pace."
    },
    "slogan": {
      "zh": "目标不是梦想，是排期。",
      "en": "A goal isn’t a dream—it’s a schedule."
    },
    "meme": {
      "zh": "不是我凶，是时间在凶。",
      "en": "I’m not fierce—time is."
    },
    "loveStyle": {
      "zh": "强势但护短，喜欢共同升级。",
      "en": "Bold and protective; loves leveling up together."
    },
    "workStyle": {
      "zh": "决策快、标准高、执行猛。",
      "en": "Fast decisions, high bar, hard execution."
    },
    "socialBuff": {
      "zh": "能带队冲锋",
      "en": "Leads the charge"
    },
    "socialDebuff": {
      "zh": "有时像人形催更器",
      "en": "Can feel like a human reminder bot"
    },
    "bestScene": {
      "zh": "管理、创业、关键推进",
      "en": "Management, startups, crisis pushes"
    },
    "worstScene": {
      "zh": "无目标闲聊、低效扯皮",
      "en": "Aimless chat, low-efficiency drama"
    }
  },
  {
    "id": "ENTP",
    "kind": "core",
    "code": "ENTP",
    "name": {
      "zh": "灵感辩论家",
      "en": "Idea Debater"
    },
    "english": "Debater",
    "emoji": "🎨",
    "animal": {
      "zh": "灵狐段子手",
      "en": "Spirit Fox Comic"
    },
    "fantasy": {
      "zh": "混沌创意发明家",
      "en": "Chaos Idea Inventor"
    },
    "vibe": {
      "zh": "辩论场加速器，点子批发商",
      "en": "Debate accelerator and idea wholesaler"
    },
    "philosophy": {
      "zh": "先把可能性展开，再谈谁对谁错。",
      "en": "Expand possibilities before verdicts."
    },
    "analysis": {
      "zh": "你点子密度高，擅长在对立里挖新路。变化是燃料，无聊是终极BOSS。别急着贴标签，先观察你在压力下的默认动作。",
      "en": "High idea density; you dig new paths from opposition. Change is fuel; boredom is final boss."
    },
    "snark": {
      "zh": "你不是抬杠，你是在给现实做压力测试。",
      "en": "Not arguing—stress-testing reality."
    },
    "traits": {
      "zh": [
        "脑暴连发",
        "辩论快感",
        "机会嗅觉",
        "辩论场加速器",
        "反差萌"
      ],
      "en": [
        "brainstorm bursts",
        "debate joy",
        "opportunity radar",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "创意连接",
        "快速试错",
        "现场应变",
        "把冷场变成脱口秀"
      ],
      "en": [
        "idea linking",
        "fast experiments",
        "live adaptability",
        "Turns silence into a talk show"
      ]
    },
    "watchouts": {
      "zh": [
        "项目过多",
        "收尾不稳",
        "有时抬杠像呼吸"
      ],
      "en": [
        "too many projects",
        "weak closing",
        "Sometimes argues like breathing"
      ]
    },
    "growth": {
      "zh": "每个点子配一个“完成定义”。",
      "en": "Give every idea a definition of done."
    },
    "slogan": {
      "zh": "我反对，是为了更好的版本。",
      "en": "I object for a better version."
    },
    "meme": {
      "zh": "我不是抬杠，我是在压力测试逻辑。",
      "en": "Not arguing—stress-testing logic."
    },
    "loveStyle": {
      "zh": "互怼是调情，无聊是分手预警。",
      "en": "Sparring is flirting; boredom is a breakup alert."
    },
    "workStyle": {
      "zh": "破局、提案、临场反应拉满。",
      "en": "Breaks deadlocks, pitches, improvises hard."
    },
    "socialBuff": {
      "zh": "把冷场变成脱口秀",
      "en": "Turns silence into a talk show"
    },
    "socialDebuff": {
      "zh": "有时抬杠像呼吸",
      "en": "Sometimes argues like breathing"
    },
    "bestScene": {
      "zh": "创意提案、谈判、创新实验",
      "en": "Creative pitches, negotiation, experiments"
    },
    "worstScene": {
      "zh": "死板流程、重复劳动、禁止提问",
      "en": "Rigid process, repetition, no questions"
    }
  },
  {
    "id": "INFJ",
    "kind": "core",
    "code": "INFJ",
    "name": {
      "zh": "洞察引路人",
      "en": "Insight Guide"
    },
    "english": "Advocate",
    "emoji": "🌙",
    "animal": {
      "zh": "月鹿倾听者",
      "en": "Moon Deer Listener"
    },
    "fantasy": {
      "zh": "星轨预言顾问",
      "en": "Star-Path Oracle Advisor"
    },
    "vibe": {
      "zh": "温柔雷达，擅长听懂潜台词",
      "en": "Gentle radar for subtext"
    },
    "philosophy": {
      "zh": "看见人心，不等于要替人扛下全部风雨。",
      "en": "Seeing hearts doesn’t mean carrying every storm."
    },
    "analysis": {
      "zh": "你能听见没说出口的部分，并把它们织成方向。深度连接比热闹更重要。别急着贴标签，先观察你在压力下的默认动作。",
      "en": "You hear the unsaid and weave it into direction. Depth beats noise."
    },
    "snark": {
      "zh": "表面温柔，内心已经把剧情推到终章还写了旁白。",
      "en": "Soft face, internal director’s cut already at the finale."
    },
    "traits": {
      "zh": [
        "深度共情",
        "意义导向",
        "远见",
        "温柔雷达，擅",
        "反差萌"
      ],
      "en": [
        "deep empathy",
        "meaning-led",
        "foresight",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "洞察人心",
        "长期陪伴",
        "价值导航",
        "给人被理解的安全感"
      ],
      "en": [
        "people insight",
        "long-term support",
        "value navigation",
        "Makes people feel understood"
      ]
    },
    "watchouts": {
      "zh": [
        "过度内耗",
        "边界模糊",
        "容易默默耗尽电量"
      ],
      "en": [
        "over-rumination",
        "blurry boundaries",
        "Quietly drains battery"
      ]
    },
    "growth": {
      "zh": "把感受说出口，也给自己留白。",
      "en": "Say feelings out loud—and leave white space for yourself."
    },
    "slogan": {
      "zh": "我看见了，所以我在意。",
      "en": "I see it, so I care."
    },
    "meme": {
      "zh": "我看起来平静，其实内心在开战略会。",
      "en": "I look calm; inside is a strategy meeting."
    },
    "loveStyle": {
      "zh": "深度连接党，讨厌敷衍式陪伴。",
      "en": "Deep-bond type; hates half-present company."
    },
    "workStyle": {
      "zh": "意义驱动，擅长长期育人与规划。",
      "en": "Meaning-driven; long-term mentoring and planning."
    },
    "socialBuff": {
      "zh": "给人被理解的安全感",
      "en": "Makes people feel understood"
    },
    "socialDebuff": {
      "zh": "容易默默耗尽电量",
      "en": "Quietly drains battery"
    },
    "bestScene": {
      "zh": "咨询、创作、组织文化",
      "en": "Counseling, creative work, culture"
    },
    "worstScene": {
      "zh": "虚伪应酬、价值错位的环境",
      "en": "Fake socializing, misaligned values"
    }
  },
  {
    "id": "INFP",
    "kind": "core",
    "code": "INFP",
    "name": {
      "zh": "理想诗人",
      "en": "Ideal Poet"
    },
    "english": "Mediator",
    "emoji": "🌸",
    "animal": {
      "zh": "猫咪诗人",
      "en": "Poet Cat"
    },
    "fantasy": {
      "zh": "梦境叙事旅人",
      "en": "Dream Narrative Wanderer"
    },
    "vibe": {
      "zh": "理想主义旅人，口袋里装着小宇宙",
      "en": "Idealist traveler with a pocket universe"
    },
    "philosophy": {
      "zh": "世界可以吵，内心得有自己的灯。",
      "en": "World can be loud; keep a lamp inside."
    },
    "analysis": {
      "zh": "你以价值感导航，对真诚极度敏感。世界粗糙时，你会用想象给它包一层软壳。别急着贴标签，先观察你在压力下的默认动作。",
      "en": "You navigate by values and are allergic to fake. When the world is rough, imagination becomes soft armor."
    },
    "snark": {
      "zh": "外表云淡风轻，收藏夹里全是没写完的人生剧本。",
      "en": "Calm exterior; drafts folder full of unfinished life scripts."
    },
    "traits": {
      "zh": [
        "价值敏感",
        "想象丰富",
        "温和坚持",
        "理想主义旅人",
        "反差萌"
      ],
      "en": [
        "value-sensitive",
        "rich imagination",
        "gentle persistence",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "真诚表达",
        "创意共情",
        "独特审美",
        "能把人的柔软接住"
      ],
      "en": [
        "sincere expression",
        "creative empathy",
        "unique taste",
        "Catches people’s soft spots safely"
      ]
    },
    "watchouts": {
      "zh": [
        "逃避冲突",
        "行动犹豫",
        "冲突来时可能原地蒸发"
      ],
      "en": [
        "conflict avoidance",
        "action hesitation",
        "May evaporate during conflict"
      ]
    },
    "growth": {
      "zh": "把理想拆成今天能做的一小步。",
      "en": "Split ideals into one small step today."
    },
    "slogan": {
      "zh": "世界可以吵，我的真心不降噪。",
      "en": "The world can be loud; my sincerity stays unmuted."
    },
    "meme": {
      "zh": "我不是玻璃心，我是高精度情绪传感器。",
      "en": "Not fragile—high-precision emotion sensor."
    },
    "loveStyle": {
      "zh": "细腻真挚，需要被认真对待。",
      "en": "Tender and sincere; needs real care."
    },
    "workStyle": {
      "zh": "价值对齐才有动力，适合创作表达。",
      "en": "Needs value alignment; thrives in expression."
    },
    "socialBuff": {
      "zh": "能把人的柔软接住",
      "en": "Catches people’s soft spots safely"
    },
    "socialDebuff": {
      "zh": "冲突来时可能原地蒸发",
      "en": "May evaporate during conflict"
    },
    "bestScene": {
      "zh": "写作、设计、心理支持、独立创作",
      "en": "Writing, design, support, indie creating"
    },
    "worstScene": {
      "zh": "冷血竞争、价值羞辱、无意义打卡",
      "en": "Cold competition, value shaming, empty check-ins"
    }
  },
  {
    "id": "ENFJ",
    "kind": "core",
    "code": "ENFJ",
    "name": {
      "zh": "热血组织者",
      "en": "Warm Organizer"
    },
    "english": "Protagonist",
    "emoji": "🔥",
    "animal": {
      "zh": "金毛啦啦队",
      "en": "Golden Retriever MC"
    },
    "fantasy": {
      "zh": "同盟篝火主持",
      "en": "Alliance Bonfire Host"
    },
    "vibe": {
      "zh": "人群充电器，天生场控位",
      "en": "Crowd charger and natural host"
    },
    "philosophy": {
      "zh": "成就别人，不等于牺牲自己。",
      "en": "Lifting others shouldn’t erase you."
    },
    "analysis": {
      "zh": "你天然会把人聚起来，给方向也给温度。责任心强，有时会忘了给自己留电量。别急着贴标签，先观察你在压力下的默认动作。",
      "en": "You gather people, give direction and warmth. High responsibility; sometimes forget your own battery."
    },
    "snark": {
      "zh": "你是人形群公告：关心所有人，唯独漏掉自己。",
      "en": "Human group announcement: care for all, skip self."
    },
    "traits": {
      "zh": [
        "带动氛围",
        "责任担当",
        "人际敏感",
        "人群充电器，",
        "反差萌"
      ],
      "en": [
        "vibe leading",
        "responsibility",
        "people sensitivity",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "激励他人",
        "协调冲突",
        "组织成长",
        "气氛组组长本组"
      ],
      "en": [
        "motivate others",
        "mediate conflict",
        "grow groups",
        "Head of vibe operations"
      ]
    },
    "watchouts": {
      "zh": [
        "过度付出",
        "自我忽略",
        "太想照顾所有人"
      ],
      "en": [
        "overgiving",
        "self-neglect",
        "Tries to care for everyone"
      ]
    },
    "growth": {
      "zh": "把“我也需要休息”写进日程。",
      "en": "Put “I also need rest” on the calendar."
    },
    "slogan": {
      "zh": "大家先来，我垫后——但我也要充电。",
      "en": "You first, I cover—then I recharge too."
    },
    "meme": {
      "zh": "我不是好说话，我是默认开启助人模式。",
      "en": "Not soft—help mode is on by default."
    },
    "loveStyle": {
      "zh": "热烈负责，喜欢共同成长剧本。",
      "en": "Warm and responsible; co-growth storyline."
    },
    "workStyle": {
      "zh": "协调、激励、把团队捏成一股绳。",
      "en": "Coordinates, motivates, binds teams."
    },
    "socialBuff": {
      "zh": "气氛组组长本组",
      "en": "Head of vibe operations"
    },
    "socialDebuff": {
      "zh": "太想照顾所有人",
      "en": "Tries to care for everyone"
    },
    "bestScene": {
      "zh": "教育、社群、管理、公关",
      "en": "Education, community, management, PR"
    },
    "worstScene": {
      "zh": "孤立无援、价值被忽视",
      "en": "Isolation, ignored values"
    }
  },
  {
    "id": "ENFP",
    "kind": "core",
    "code": "ENFP",
    "name": {
      "zh": "火花冒险家",
      "en": "Spark Adventurer"
    },
    "english": "Campaigner",
    "emoji": "✨",
    "animal": {
      "zh": "鹦鹉派对官",
      "en": "Party Parrot"
    },
    "fantasy": {
      "zh": "彩虹传送门导游",
      "en": "Rainbow Portal Guide"
    },
    "vibe": {
      "zh": "行走的灵感弹幕，热度常年在线",
      "en": "Walking inspiration barrage, always hot"
    },
    "philosophy": {
      "zh": "热情可贵，完成更勇敢。",
      "en": "Passion is precious; finishing is braver."
    },
    "analysis": {
      "zh": "你是走动的灵感弹幕，连接人与点子的速度很快。热情是超能力，也需要落地锚点。",
      "en": "A walking inspiration barrage; you connect people and ideas fast. Passion is a superpower that needs anchors."
    },
    "snark": {
      "zh": "同时开了 12 个兴趣标签页，还都觉得自己会回去看。",
      "en": "12 interest tabs open, all convinced you’ll return."
    },
    "traits": {
      "zh": [
        "热情连接",
        "创意发散",
        "即兴表达",
        "行走的灵感弹",
        "反差萌"
      ],
      "en": [
        "warm connection",
        "idea divergence",
        "improv expression",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "点燃气氛",
        "跨界串联",
        "快速共情",
        "三句话让场面活过来"
      ],
      "en": [
        "spark rooms",
        "cross-link people",
        "fast empathy",
        "Revives rooms in three lines"
      ]
    },
    "watchouts": {
      "zh": [
        "专注易散",
        "承诺过载",
        "兴趣标签页开太多"
      ],
      "en": [
        "focus scatter",
        "promise overload",
        "Too many interest tabs"
      ]
    },
    "growth": {
      "zh": "兴趣可以多，完成要排队。",
      "en": "Many interests are fine—completion needs a queue."
    },
    "slogan": {
      "zh": "我不是三分钟热度，我是多线程人生。",
      "en": "Not short attention—multithreaded life."
    },
    "meme": {
      "zh": "我不是三分钟热度，我是多线程人生。",
      "en": "Not short heat—multithreaded life."
    },
    "loveStyle": {
      "zh": "浪漫即兴，需要自由也需要回应。",
      "en": "Romantic improv; needs freedom and response."
    },
    "workStyle": {
      "zh": "创意连接器，适合打开新局面。",
      "en": "Creative connector; opens new fronts."
    },
    "socialBuff": {
      "zh": "三句话让场面活过来",
      "en": "Revives rooms in three lines"
    },
    "socialDebuff": {
      "zh": "兴趣标签页开太多",
      "en": "Too many interest tabs"
    },
    "bestScene": {
      "zh": "内容、活动、跨界合作",
      "en": "Content, events, cross-collab"
    },
    "worstScene": {
      "zh": "枯燥流水线、长期压抑表达",
      "en": "Dull pipelines, suppressed expression"
    }
  },
  {
    "id": "ISTJ",
    "kind": "core",
    "code": "ISTJ",
    "name": {
      "zh": "可靠执行官",
      "en": "Reliable Executor"
    },
    "english": "Logistician",
    "emoji": "📋",
    "animal": {
      "zh": "獾式审计员",
      "en": "Badger Auditor"
    },
    "fantasy": {
      "zh": "古城档案守护者",
      "en": "Archive Guardian"
    },
    "vibe": {
      "zh": "秩序守护者，靠谱本靠谱",
      "en": "Order guardian, reliability incarnate"
    },
    "philosophy": {
      "zh": "把小事做对，大事才站得住。",
      "en": "Get small things right so big things stand."
    },
    "analysis": {
      "zh": "你靠规则、记忆和流程把事情做成。承诺很重，靠谱是你的默认皮肤。别急着贴标签，先观察你在压力下的默认动作。",
      "en": "Rules, memory, and process make things real. Promises are heavy; reliability is default skin."
    },
    "snark": {
      "zh": "别人靠灵感，你靠备份、清单和准时到场。",
      "en": "Others run on inspiration; you run on backups, lists, and on-time arrival."
    },
    "traits": {
      "zh": [
        "稳定执行",
        "细节记忆",
        "责任清晰",
        "秩序守护者，",
        "反差萌"
      ],
      "en": [
        "stable execution",
        "detail memory",
        "clear duty",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "可靠交付",
        "流程优化",
        "风险预防",
        "关键时最能托底"
      ],
      "en": [
        "reliable delivery",
        "process polish",
        "risk prevention",
        "Best foundation in crisis"
      ]
    },
    "watchouts": {
      "zh": [
        "变化适应慢",
        "表达偏硬",
        "变化太快会皱眉"
      ],
      "en": [
        "slow change adapt",
        "stiff expression",
        "Frowns at rapid change"
      ]
    },
    "growth": {
      "zh": "允许 10% 的弹性，世界不会塌。",
      "en": "Allow 10% flex—the world won’t collapse."
    },
    "slogan": {
      "zh": "我说到，就会做到。",
      "en": "If I say it, I do it."
    },
    "meme": {
      "zh": "我不是古板，我是防翻车系统。",
      "en": "Not rigid—anti-crash system."
    },
    "loveStyle": {
      "zh": "稳定付出，用陪伴代替表演。",
      "en": "Stable care; presence over performance."
    },
    "workStyle": {
      "zh": "流程清晰、责任到人、结果可追。",
      "en": "Clear process, ownership, traceable results."
    },
    "socialBuff": {
      "zh": "关键时最能托底",
      "en": "Best foundation in crisis"
    },
    "socialDebuff": {
      "zh": "变化太快会皱眉",
      "en": "Frowns at rapid change"
    },
    "bestScene": {
      "zh": "审计、运营、质量管理、行政",
      "en": "Audit, ops, QA, admin"
    },
    "worstScene": {
      "zh": "毫无规则的混乱局",
      "en": "Rule-free chaos"
    }
  },
  {
    "id": "ISFJ",
    "kind": "core",
    "code": "ISFJ",
    "name": {
      "zh": "温柔守护者",
      "en": "Gentle Guardian"
    },
    "english": "Defender",
    "emoji": "🛡️",
    "animal": {
      "zh": "企鹅护理员",
      "en": "Penguin Care"
    },
    "fantasy": {
      "zh": "暖灯药剂师",
      "en": "Warm-Lamp Apothecary"
    },
    "vibe": {
      "zh": "温柔后勤部，默默把一切安好",
      "en": "Gentle logistics, quietly fixing everything"
    },
    "philosophy": {
      "zh": "照顾别人之前，先把自己的灯加油。",
      "en": "Refuel your lamp before lighting others."
    },
    "analysis": {
      "zh": "你记得别人容易忽略的细节，用稳定照顾维持秩序。安静，但关键度很高。别急着贴标签，先观察你在压力下的默认动作。",
      "en": "You remember details others miss and keep order through steady care. Quiet, high loyalty."
    },
    "snark": {
      "zh": "你是团队的隐形后勤，直到你请假大家才发现世界塌了。",
      "en": "Invisible logistics—until you take leave and the world collapses."
    },
    "traits": {
      "zh": [
        "细心照顾",
        "忠诚稳定",
        "默默支持",
        "温柔后勤部，",
        "反差萌"
      ],
      "en": [
        "careful support",
        "loyal stability",
        "quiet backing",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "关系维护",
        "实操靠谱",
        "体贴入微",
        "让人感到被妥善安放"
      ],
      "en": [
        "bond maintenance",
        "practical reliability",
        "micro care",
        "Makes people feel safely placed"
      ]
    },
    "watchouts": {
      "zh": [
        "不擅长拒绝",
        "情绪积压",
        "不说出口的委屈会堆积"
      ],
      "en": [
        "hard to refuse",
        "emotion backlog",
        "Unspoken hurt stacks up"
      ]
    },
    "growth": {
      "zh": "学会说“这次我帮不到”，也是爱。",
      "en": "Saying “I can’t this time” is also love."
    },
    "slogan": {
      "zh": "我记得你提过的小事。",
      "en": "I remember the small thing you mentioned."
    },
    "meme": {
      "zh": "我不是好欺负，我只是先忍了三秒。",
      "en": "Not weak—I just waited three seconds."
    },
    "loveStyle": {
      "zh": "细水长流，记得你随口提过的小事。",
      "en": "Long-flow care; remembers small mentions."
    },
    "workStyle": {
      "zh": "支持型高手，细节与责任拉满。",
      "en": "Support expert; details and duty maxed."
    },
    "socialBuff": {
      "zh": "让人感到被妥善安放",
      "en": "Makes people feel safely placed"
    },
    "socialDebuff": {
      "zh": "不说出口的委屈会堆积",
      "en": "Unspoken hurt stacks up"
    },
    "bestScene": {
      "zh": "护理、客户成功、教育支持",
      "en": "Care, CS, education support"
    },
    "worstScene": {
      "zh": "被持续索取且不被看见",
      "en": "Constant taking without being seen"
    }
  },
  {
    "id": "ESTJ",
    "kind": "core",
    "code": "ESTJ",
    "name": {
      "zh": "现场指挥官",
      "en": "Field Commander"
    },
    "english": "Executive",
    "emoji": "🏛️",
    "animal": {
      "zh": "鹰式督导",
      "en": "Eagle Supervisor"
    },
    "fantasy": {
      "zh": "城邦秩序执政官",
      "en": "City Order Consul"
    },
    "vibe": {
      "zh": "现场指挥官，效率强迫症友好",
      "en": "On-site commander, efficiency-friendly"
    },
    "philosophy": {
      "zh": "规则不是束缚，是少踩坑的护栏。",
      "en": "Rules aren’t cages—they’re guardrails."
    },
    "analysis": {
      "zh": "你擅长把目标变成可执行动作，并推动大家按节奏完成。结果导向，效率优先。别急着贴标签，先观察你在压力下的默认动作。",
      "en": "You turn goals into executable moves and push the tempo. Results first, efficiency always."
    },
    "snark": {
      "zh": "你的人生BGM是进度条提示音。",
      "en": "Your life BGM is a progress-bar ping."
    },
    "traits": {
      "zh": [
        "现场推动",
        "标准清晰",
        "结果负责",
        "现场指挥官，",
        "反差萌"
      ],
      "en": [
        "field drive",
        "clear standards",
        "result ownership",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "组织落地",
        "效率提升",
        "秩序建立",
        "能把一盘散沙拧成绳"
      ],
      "en": [
        "org landing",
        "efficiency lift",
        "order building",
        "Turns loose sand into rope"
      ]
    },
    "watchouts": {
      "zh": [
        "弹性不足",
        "听感偏强势",
        "语气可能像通告"
      ],
      "en": [
        "low flexibility",
        "can sound forceful",
        "Tone can sound like an announcement"
      ]
    },
    "growth": {
      "zh": "在发指令前先问一句“你卡在哪”。",
      "en": "Before orders, ask “where are you stuck?”"
    },
    "slogan": {
      "zh": "别聊风花雪月，先把进度对齐。",
      "en": "Skip poetry—align the progress first."
    },
    "meme": {
      "zh": "不是我管太多，是放养会出事。",
      "en": "Not controlling—free-range causes incidents."
    },
    "loveStyle": {
      "zh": "直接明确，承诺说到做到。",
      "en": "Direct and clear; promises kept."
    },
    "workStyle": {
      "zh": "目标、分工、复盘，一条龙。",
      "en": "Goals, roles, reviews—full pipeline."
    },
    "socialBuff": {
      "zh": "能把一盘散沙拧成绳",
      "en": "Turns loose sand into rope"
    },
    "socialDebuff": {
      "zh": "语气可能像通告",
      "en": "Tone can sound like an announcement"
    },
    "bestScene": {
      "zh": "管理、项目交付、运营统筹",
      "en": "Management, delivery, ops"
    },
    "worstScene": {
      "zh": "无纪律团队、模糊责任",
      "en": "Undisciplined teams, blurry ownership"
    }
  },
  {
    "id": "ESFJ",
    "kind": "core",
    "code": "ESFJ",
    "name": {
      "zh": "氛围主理人",
      "en": "Atmosphere Host"
    },
    "english": "Consul",
    "emoji": "🎀",
    "animal": {
      "zh": "柯基接待官",
      "en": "Corgi Concierge"
    },
    "fantasy": {
      "zh": "节日宴席大总管",
      "en": "Festival Banquet Steward"
    },
    "vibe": {
      "zh": "人际关系润滑剂，气氛稳定器",
      "en": "Social lubricant and vibe stabilizer"
    },
    "philosophy": {
      "zh": "被需要很好，被尊重更好。",
      "en": "Being needed is nice; being respected is better."
    },
    "analysis": {
      "zh": "你对关系场极其敏感，会主动把局盘热、把人照顾好。和谐是你的KPI。别急着贴标签，先观察你在压力下的默认动作。",
      "en": "Highly sensitive to relational fields; you warm rooms and care for people. Harmony is your KPI."
    },
    "snark": {
      "zh": "聚餐座位表在你脑子里比公司架构图还清楚。",
      "en": "Seating charts live clearer in your head than org charts."
    },
    "traits": {
      "zh": [
        "关系经营",
        "服务意识",
        "现场温度",
        "人际关系润滑",
        "反差萌"
      ],
      "en": [
        "relationship ops",
        "service sense",
        "room warmth",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "凝聚力",
        "细节招待",
        "冲突缓和",
        "谁尴尬都会被你救"
      ],
      "en": [
        "cohesion",
        "detail hospitality",
        "conflict softener",
        "Saves anyone from awkwardness"
      ]
    },
    "watchouts": {
      "zh": [
        "过度在意评价",
        "难做恶人",
        "太在意评价会内耗"
      ],
      "en": [
        "overcare about opinions",
        "hard to play bad cop",
        "Overcares about opinions"
      ]
    },
    "growth": {
      "zh": "和谐很重要，但你的边界也是和谐的一部分。",
      "en": "Harmony matters—and your boundary is part of it."
    },
    "slogan": {
      "zh": "来，我给你留了最好的位置。",
      "en": "Come on—I saved you the best seat."
    },
    "meme": {
      "zh": "我不是爱操心，我是预装了关怀系统。",
      "en": "Not nosy—care system preinstalled."
    },
    "loveStyle": {
      "zh": "用心经营仪式感与日常照顾。",
      "en": "Builds rituals and daily care."
    },
    "workStyle": {
      "zh": "协调资源、照顾体验、维护关系。",
      "en": "Coordinates resources, UX, relationships."
    },
    "socialBuff": {
      "zh": "谁尴尬都会被你救",
      "en": "Saves anyone from awkwardness"
    },
    "socialDebuff": {
      "zh": "太在意评价会内耗",
      "en": "Overcares about opinions"
    },
    "bestScene": {
      "zh": "社群、HR、客户关系、活动",
      "en": "Community, HR, CR, events"
    },
    "worstScene": {
      "zh": "冷漠竞争、孤立任务",
      "en": "Cold rivalry, isolated tasks"
    }
  },
  {
    "id": "ISTP",
    "kind": "core",
    "code": "ISTP",
    "name": {
      "zh": "冷静技师",
      "en": "Cool Technician"
    },
    "english": "Virtuoso",
    "emoji": "🛠️",
    "animal": {
      "zh": "猫科维修工",
      "en": "Cat Mechanic"
    },
    "fantasy": {
      "zh": "机械灵巧侠",
      "en": "Mech Dexterity Ranger"
    },
    "vibe": {
      "zh": "冷静修理工，问题来了先动手",
      "en": "Cool fixer; hands first when problems arrive"
    },
    "philosophy": {
      "zh": "少说多做，世界会诚实反馈。",
      "en": "Less talk, more do—the world replies honestly."
    },
    "analysis": {
      "zh": "你用动手和观察理解世界，危机时反而更稳。少说多做，自由空间是刚需。别急着贴标签，先观察你在压力下的默认动作。",
      "en": "You learn by doing and observing; calmer in crisis. Less talk, more craft; freedom is non-negotiable."
    },
    "snark": {
      "zh": "表面上在发呆，其实已经把故障点定位到第三个螺丝。",
      "en": "Looks zoned out; already pinned the fault to screw #3."
    },
    "traits": {
      "zh": [
        "动手实操",
        "冷静拆解",
        "自由节奏",
        "冷静修理工，",
        "反差萌"
      ],
      "en": [
        "hands-on craft",
        "calm teardown",
        "free tempo",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "故障定位",
        "临场反应",
        "工具思维",
        "关键现场最稳的那个人"
      ],
      "en": [
        "fault locating",
        "live response",
        "tool thinking",
        "Steadiest person on-site"
      ]
    },
    "watchouts": {
      "zh": [
        "表达偏少",
        "长期规划弱",
        "情绪沟通可能像说明书"
      ],
      "en": [
        "low verbal share",
        "weaker long plans",
        "Emotion talk may sound like a manual"
      ]
    },
    "growth": {
      "zh": "偶尔把你的判断说出来，别人会更信你。",
      "en": "Say your judgment out loud sometimes—people trust you more."
    },
    "slogan": {
      "zh": "别吵，让我听听机器怎么说。",
      "en": "Quiet—let me hear what the machine says."
    },
    "meme": {
      "zh": "我不是冷漠，我在看哪里能拧紧。",
      "en": "Not cold—scanning what to tighten."
    },
    "loveStyle": {
      "zh": "用帮忙和行动表达喜欢，不靠演讲。",
      "en": "Loves by helping and doing, not speeching."
    },
    "workStyle": {
      "zh": "实操强、应变快、讨厌空谈。",
      "en": "Hands-on, adaptive, anti-empty-talk."
    },
    "socialBuff": {
      "zh": "关键现场最稳的那个人",
      "en": "Steadiest person on-site"
    },
    "socialDebuff": {
      "zh": "情绪沟通可能像说明书",
      "en": "Emotion talk may sound like a manual"
    },
    "bestScene": {
      "zh": "工程、技术排查、现场处理",
      "en": "Engineering, debugging, field work"
    },
    "worstScene": {
      "zh": "漫长会议、情绪拉扯",
      "en": "Endless meetings, emotional tug-of-war"
    }
  },
  {
    "id": "ISFP",
    "kind": "core",
    "code": "ISFP",
    "name": {
      "zh": "感官艺术家",
      "en": "Sensory Artist"
    },
    "english": "Adventurer",
    "emoji": "🎧",
    "animal": {
      "zh": "小熊猫美学官",
      "en": "Red Panda Aesthete"
    },
    "fantasy": {
      "zh": "风色采集成长者",
      "en": "Wind-Color Forager"
    },
    "vibe": {
      "zh": "美学流浪者，安静但有主见",
      "en": "Aesthetic wanderer, quiet with spine"
    },
    "philosophy": {
      "zh": "美不是奢侈，是活着的证据。",
      "en": "Beauty isn’t luxury—it’s proof of living."
    },
    "analysis": {
      "zh": "你通过美、节奏和当下体验认识自己。不喜欢被框住，真诚比表演重要。别急着贴标签，先观察你在压力下的默认动作。",
      "en": "You know yourself through beauty, rhythm, and present experience. Hate cages; sincerity > performance."
    },
    "snark": {
      "zh": "别人卷KPI，你在卷日落角度和耳机歌单。",
      "en": "Others grind KPIs; you grind sunset angles and playlists."
    },
    "traits": {
      "zh": [
        "审美敏锐",
        "当下感受",
        "温和自由",
        "美学流浪者，",
        "反差萌"
      ],
      "en": [
        "aesthetic radar",
        "present feel",
        "gentle freedom",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "风格表达",
        "氛围营造",
        "真诚陪伴",
        "给人松弛的真实感"
      ],
      "en": [
        "style expression",
        "vibe crafting",
        "sincere company",
        "Gives relaxed realness"
      ]
    },
    "watchouts": {
      "zh": [
        "回避冲突",
        "规划不稳定",
        "压力大时容易缩回去"
      ],
      "en": [
        "avoid conflict",
        "unstable planning",
        "Retreats under heavy pressure"
      ]
    },
    "growth": {
      "zh": "把喜欢的事做成可重复的小习惯。",
      "en": "Turn what you love into small repeatable habits."
    },
    "slogan": {
      "zh": "这刻好看，就值得认真过。",
      "en": "If this moment is beautiful, it’s worth living fully."
    },
    "meme": {
      "zh": "我不是摆烂，我在保护灵感湿度。",
      "en": "Not flopping—protecting inspiration humidity."
    },
    "loveStyle": {
      "zh": "温柔陪伴，用感受确认关系。",
      "en": "Gentle presence; feels the bond."
    },
    "workStyle": {
      "zh": "手感与审美驱动，适合创作落地。",
      "en": "Craft and taste driven; makes beauty real."
    },
    "socialBuff": {
      "zh": "给人松弛的真实感",
      "en": "Gives relaxed realness"
    },
    "socialDebuff": {
      "zh": "压力大时容易缩回去",
      "en": "Retreats under heavy pressure"
    },
    "bestScene": {
      "zh": "设计、艺术、体验、手工",
      "en": "Design, art, experience, craft"
    },
    "worstScene": {
      "zh": "粗暴管理、审美被踩",
      "en": "Harsh management, taste stomped"
    }
  },
  {
    "id": "ESTP",
    "kind": "core",
    "code": "ESTP",
    "name": {
      "zh": "现场玩家",
      "en": "Field Player"
    },
    "english": "Entrepreneur",
    "emoji": "🏎️",
    "animal": {
      "zh": "猎豹冲锋员",
      "en": "Cheetah Striker"
    },
    "fantasy": {
      "zh": "风暴特技领航员",
      "en": "Storm Stunt Navigator"
    },
    "vibe": {
      "zh": "现场冲锋队，刺激是燃料",
      "en": "Field striker; thrills are fuel"
    },
    "philosophy": {
      "zh": "机会不等人，犹豫会过期。",
      "en": "Chance won’t wait; hesitation expires."
    },
    "analysis": {
      "zh": "你反应快、敢试错，擅长把机会从现场里捞出来。行动优先，理论后补。别急着贴标签，先观察你在压力下的默认动作。",
      "en": "Fast reactions, bold experiments; you scoop opportunity from the field. Action first, theory later."
    },
    "snark": {
      "zh": "计划还在加载，人已经到现场了。",
      "en": "Plan still loading; you’re already on site."
    },
    "traits": {
      "zh": [
        "行动派",
        "机会嗅觉",
        "临场博弈",
        "现场冲锋队，",
        "反差萌"
      ],
      "en": [
        "action bias",
        "opportunity nose",
        "live game sense",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "快速成交",
        "危机处理",
        "现场领导",
        "带动全场行动力"
      ],
      "en": [
        "fast close",
        "crisis handling",
        "on-site lead",
        "Boosts group action"
      ]
    },
    "watchouts": {
      "zh": [
        "耐心不足",
        "细节遗漏",
        "耐心库存有时告急"
      ],
      "en": [
        "low patience",
        "detail misses",
        "Patience inventory can hit zero"
      ]
    },
    "growth": {
      "zh": "冲之前花 60 秒看风险清单。",
      "en": "Spend 60 seconds on a risk list before charging."
    },
    "slogan": {
      "zh": "别讨论了，先试一枪。",
      "en": "Stop debating—fire a test shot."
    },
    "meme": {
      "zh": "我不是莽，我是小步快跑版勇敢。",
      "en": "Not reckless—brave in small sprints."
    },
    "loveStyle": {
      "zh": "热烈直接，一起玩才是恋爱。",
      "en": "Bold and direct; play is love language."
    },
    "workStyle": {
      "zh": "抢跑、试错、临场决策。",
      "en": "Sprints, tests, live decisions."
    },
    "socialBuff": {
      "zh": "带动全场行动力",
      "en": "Boosts group action"
    },
    "socialDebuff": {
      "zh": "耐心库存有时告急",
      "en": "Patience inventory can hit zero"
    },
    "bestScene": {
      "zh": "销售、赛事、应急、商务前线",
      "en": "Sales, sports, emergency, frontline biz"
    },
    "worstScene": {
      "zh": "漫长审批、纯理论空转",
      "en": "Long approvals, pure theory loops"
    }
  },
  {
    "id": "ESFP",
    "kind": "core",
    "code": "ESFP",
    "name": {
      "zh": "现场明星",
      "en": "Live Star"
    },
    "english": "Entertainer",
    "emoji": "🎤",
    "animal": {
      "zh": "海豚气氛组",
      "en": "Dolphin Vibe Crew"
    },
    "fantasy": {
      "zh": "星光派对领唱",
      "en": "Starlight Party Lead"
    },
    "vibe": {
      "zh": "现场开心果，快乐传染源",
      "en": "Live-room joy source"
    },
    "philosophy": {
      "zh": "认真生活，也认真快乐。",
      "en": "Live earnestly—and joyfully."
    },
    "analysis": {
      "zh": "你把当下过成舞台，感染力强，擅长让人放松。快乐是策略，也是天赋。别急着贴标签，先观察你在压力下的默认动作。",
      "en": "You turn the present into a stage; strong presence, great at easing people. Joy is both strategy and gift."
    },
    "snark": {
      "zh": "你一进门，局的音量自动上调两格。",
      "en": "You enter; the room volume auto-raises two notches."
    },
    "traits": {
      "zh": [
        "现场魅力",
        "快乐传导",
        "即兴互动",
        "现场开心果，",
        "反差萌"
      ],
      "en": [
        "live charm",
        "joy transmission",
        "improv interaction",
        "human sample",
        "contrast charm"
      ]
    },
    "strengths": {
      "zh": [
        "带动情绪",
        "社交润滑",
        "体验设计",
        "谁郁闷都能被你点亮"
      ],
      "en": [
        "mood lifting",
        "social lube",
        "experience design",
        "Lights up anyone gloomy"
      ]
    },
    "watchouts": {
      "zh": [
        "长期规划弱",
        "易被即时刺激带走",
        "长期枯燥会掉血"
      ],
      "en": [
        "weak long plans",
        "pulled by instant stimuli",
        "Long dullness drains HP"
      ]
    },
    "growth": {
      "zh": "给快乐加一个明天也能复用的结构。",
      "en": "Add a structure so joy can reuse tomorrow."
    },
    "slogan": {
      "zh": "人生短，先把这局玩好看。",
      "en": "Life’s short—make this round look good."
    },
    "meme": {
      "zh": "我不是吵，我是给沉闷世界加BGM。",
      "en": "Not loud—adding BGM to a dull world."
    },
    "loveStyle": {
      "zh": "浪漫具体，喜欢制造共同回忆。",
      "en": "Concrete romance; builds shared memories."
    },
    "workStyle": {
      "zh": "表现力强，适合面对人的舞台。",
      "en": "Expressive; thrives on human stages."
    },
    "socialBuff": {
      "zh": "谁郁闷都能被你点亮",
      "en": "Lights up anyone gloomy"
    },
    "socialDebuff": {
      "zh": "长期枯燥会掉血",
      "en": "Long dullness drains HP"
    },
    "bestScene": {
      "zh": "表演、主持、服务体验、达人",
      "en": "Performance, hosting, service, creator"
    },
    "worstScene": {
      "zh": "孤立重复、情绪压抑环境",
      "en": "Isolated repetition, suppressed mood"
    }
  },
  {
    "id": "X01",
    "kind": "extended",
    "code": "INTJ",
    "name": {
      "zh": "INTJ-夜航",
      "en": "Night Pilot INTJ"
    },
    "english": "Night Pilot INTJ",
    "emoji": "🧠",
    "animal": {
      "zh": "战略夜猫",
      "en": "战略夜猫"
    },
    "fantasy": {
      "zh": "战略夜猫职业形态",
      "en": "战略夜猫 career form"
    },
    "vibe": {
      "zh": "把世界当可优化系统，凌晨最清醒",
      "en": "把世界当可优化系统，凌晨最清醒"
    },
    "philosophy": {
      "zh": "效率是温柔的一种形式",
      "en": "效率是温柔的一种形式"
    },
    "analysis": {
      "zh": "把世界当可优化系统，凌晨最清醒。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "把世界当可优化系统，凌晨最清醒. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是冷，你是在省电给真正重要的事。",
      "en": "你不是冷，你是在省电给真正重要的事。"
    },
    "traits": {
      "zh": [
        "战略夜猫",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "战略夜猫",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "效率是温柔的一种形式",
      "en": "效率是温柔的一种形式"
    },
    "meme": {
      "zh": "你不是冷，你是在省电给真正重要的事。",
      "en": "你不是冷，你是在省电给真正重要的事。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X02",
    "kind": "extended",
    "code": "INTP",
    "name": {
      "zh": "INTP-实验室",
      "en": "Lab Ghost INTP"
    },
    "english": "Lab Ghost INTP",
    "emoji": "🔬",
    "animal": {
      "zh": "思维深潜",
      "en": "思维深潜"
    },
    "fantasy": {
      "zh": "思维深潜职业形态",
      "en": "思维深潜 career form"
    },
    "vibe": {
      "zh": "问题比答案有趣，结论可以再等等",
      "en": "问题比答案有趣，结论可以再等等"
    },
    "philosophy": {
      "zh": "好奇心是最高级的忠诚",
      "en": "好奇心是最高级的忠诚"
    },
    "analysis": {
      "zh": "问题比答案有趣，结论可以再等等。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "问题比答案有趣，结论可以再等等. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是拖延，你是在等脑内模型编译完成。",
      "en": "你不是拖延，你是在等脑内模型编译完成。"
    },
    "traits": {
      "zh": [
        "思维深潜",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "思维深潜",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "好奇心是最高级的忠诚",
      "en": "好奇心是最高级的忠诚"
    },
    "meme": {
      "zh": "你不是拖延，你是在等脑内模型编译完成。",
      "en": "你不是拖延，你是在等脑内模型编译完成。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X03",
    "kind": "extended",
    "code": "ENTJ",
    "name": {
      "zh": "ENTJ-冲锋",
      "en": "Charge ENTJ"
    },
    "english": "Charge ENTJ",
    "emoji": "⚔️",
    "animal": {
      "zh": "目标激光",
      "en": "目标激光"
    },
    "fantasy": {
      "zh": "目标激光职业形态",
      "en": "目标激光 career form"
    },
    "vibe": {
      "zh": "先定胜局，再谈感受分包",
      "en": "先定胜局，再谈感受分包"
    },
    "philosophy": {
      "zh": "领导力是扛结果不是抢话筒",
      "en": "领导力是扛结果不是抢话筒"
    },
    "analysis": {
      "zh": "先定胜局，再谈感受分包。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "先定胜局，再谈感受分包. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是强势，你只是对模糊过敏。",
      "en": "你不是强势，你只是对模糊过敏。"
    },
    "traits": {
      "zh": [
        "目标激光",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "目标激光",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "领导力是扛结果不是抢话筒",
      "en": "领导力是扛结果不是抢话筒"
    },
    "meme": {
      "zh": "你不是强势，你只是对模糊过敏。",
      "en": "你不是强势，你只是对模糊过敏。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X04",
    "kind": "extended",
    "code": "ENTP",
    "name": {
      "zh": "ENTP-整活",
      "en": "Bit Engine ENTP"
    },
    "english": "Bit Engine ENTP",
    "emoji": "🎭",
    "animal": {
      "zh": "灵感摔跤手",
      "en": "灵感摔跤手"
    },
    "fantasy": {
      "zh": "灵感摔跤手职业形态",
      "en": "灵感摔跤手 career form"
    },
    "vibe": {
      "zh": "把规则当玩具，把辩论当暖身",
      "en": "把规则当玩具，把辩论当暖身"
    },
    "philosophy": {
      "zh": "有趣是生产力的入场券",
      "en": "有趣是生产力的入场券"
    },
    "analysis": {
      "zh": "把规则当玩具，把辩论当暖身。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "把规则当玩具，把辩论当暖身. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是抬杠，你是在压力测试现实。",
      "en": "你不是抬杠，你是在压力测试现实。"
    },
    "traits": {
      "zh": [
        "灵感摔跤手",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "灵感摔跤手",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "有趣是生产力的入场券",
      "en": "有趣是生产力的入场券"
    },
    "meme": {
      "zh": "你不是抬杠，你是在压力测试现实。",
      "en": "你不是抬杠，你是在压力测试现实。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X05",
    "kind": "extended",
    "code": "INFJ",
    "name": {
      "zh": "INFJ-灯塔",
      "en": "Lighthouse INFJ"
    },
    "english": "Lighthouse INFJ",
    "emoji": "🕊️",
    "animal": {
      "zh": "深层导航",
      "en": "深层导航"
    },
    "fantasy": {
      "zh": "深层导航职业形态",
      "en": "深层导航 career form"
    },
    "vibe": {
      "zh": "看见人心，也守住边界",
      "en": "看见人心，也守住边界"
    },
    "philosophy": {
      "zh": "温柔需要脊梁",
      "en": "温柔需要脊梁"
    },
    "analysis": {
      "zh": "看见人心，也守住边界。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "看见人心，也守住边界. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是敏感，你是高清接收器。",
      "en": "你不是敏感，你是高清接收器。"
    },
    "traits": {
      "zh": [
        "深层导航",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "深层导航",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "温柔需要脊梁",
      "en": "温柔需要脊梁"
    },
    "meme": {
      "zh": "你不是敏感，你是高清接收器。",
      "en": "你不是敏感，你是高清接收器。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X06",
    "kind": "extended",
    "code": "INFP",
    "name": {
      "zh": "INFP-诗核",
      "en": "Poem Core INFP"
    },
    "english": "Poem Core INFP",
    "emoji": "🌙",
    "animal": {
      "zh": "价值守护",
      "en": "价值守护"
    },
    "fantasy": {
      "zh": "价值守护职业形态",
      "en": "价值守护 career form"
    },
    "vibe": {
      "zh": "世界吵闹，你坚持自己的滤镜",
      "en": "世界吵闹，你坚持自己的滤镜"
    },
    "philosophy": {
      "zh": "真实比讨好更浪漫",
      "en": "真实比讨好更浪漫"
    },
    "analysis": {
      "zh": "世界吵闹，你坚持自己的滤镜。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "世界吵闹，你坚持自己的滤镜. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是玻璃心，你是高精度情感镜头。",
      "en": "你不是玻璃心，你是高精度情感镜头。"
    },
    "traits": {
      "zh": [
        "价值守护",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "价值守护",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "真实比讨好更浪漫",
      "en": "真实比讨好更浪漫"
    },
    "meme": {
      "zh": "你不是玻璃心，你是高精度情感镜头。",
      "en": "你不是玻璃心，你是高精度情感镜头。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X07",
    "kind": "extended",
    "code": "ENFJ",
    "name": {
      "zh": "ENFJ-篝火",
      "en": "Bonfire ENFJ"
    },
    "english": "Bonfire ENFJ",
    "emoji": "🔥",
    "animal": {
      "zh": "气氛总控",
      "en": "气氛总控"
    },
    "fantasy": {
      "zh": "气氛总控职业形态",
      "en": "气氛总控 career form"
    },
    "vibe": {
      "zh": "把人点亮，也别把自己烧干",
      "en": "把人点亮，也别把自己烧干"
    },
    "philosophy": {
      "zh": "照顾别人前先加油",
      "en": "照顾别人前先加油"
    },
    "analysis": {
      "zh": "把人点亮，也别把自己烧干。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "把人点亮，也别把自己烧干. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是好说话，你是默认开启救援模式。",
      "en": "你不是好说话，你是默认开启救援模式。"
    },
    "traits": {
      "zh": [
        "气氛总控",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "气氛总控",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "照顾别人前先加油",
      "en": "照顾别人前先加油"
    },
    "meme": {
      "zh": "你不是好说话，你是默认开启救援模式。",
      "en": "你不是好说话，你是默认开启救援模式。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X08",
    "kind": "extended",
    "code": "ENFP",
    "name": {
      "zh": "ENFP-烟花",
      "en": "Firework ENFP"
    },
    "english": "Firework ENFP",
    "emoji": "✨",
    "animal": {
      "zh": "热情弹幕",
      "en": "热情弹幕"
    },
    "fantasy": {
      "zh": "热情弹幕职业形态",
      "en": "热情弹幕 career form"
    },
    "vibe": {
      "zh": "连接一切，再学会收口",
      "en": "连接一切，再学会收口"
    },
    "philosophy": {
      "zh": "热情可贵，完成更勇敢",
      "en": "热情可贵，完成更勇敢"
    },
    "analysis": {
      "zh": "连接一切，再学会收口。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "连接一切，再学会收口. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是三分钟热度，你是多线程人生。",
      "en": "你不是三分钟热度，你是多线程人生。"
    },
    "traits": {
      "zh": [
        "热情弹幕",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "热情弹幕",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "热情可贵，完成更勇敢",
      "en": "热情可贵，完成更勇敢"
    },
    "meme": {
      "zh": "你不是三分钟热度，你是多线程人生。",
      "en": "你不是三分钟热度，你是多线程人生。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X09",
    "kind": "extended",
    "code": "ISTJ",
    "name": {
      "zh": "ISTJ-城墙",
      "en": "Wall ISTJ"
    },
    "english": "Wall ISTJ",
    "emoji": "🧱",
    "animal": {
      "zh": "秩序工匠",
      "en": "秩序工匠"
    },
    "fantasy": {
      "zh": "秩序工匠职业形态",
      "en": "秩序工匠 career form"
    },
    "vibe": {
      "zh": "靠谱是最长情的浪漫",
      "en": "靠谱是最长情的浪漫"
    },
    "philosophy": {
      "zh": "稳定是高级能力",
      "en": "稳定是高级能力"
    },
    "analysis": {
      "zh": "靠谱是最长情的浪漫。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "靠谱是最长情的浪漫. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是死板，你是防崩溃补丁。",
      "en": "你不是死板，你是防崩溃补丁。"
    },
    "traits": {
      "zh": [
        "秩序工匠",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "秩序工匠",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "稳定是高级能力",
      "en": "稳定是高级能力"
    },
    "meme": {
      "zh": "你不是死板，你是防崩溃补丁。",
      "en": "你不是死板，你是防崩溃补丁。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X10",
    "kind": "extended",
    "code": "ISFJ",
    "name": {
      "zh": "ISFJ-暖库",
      "en": "Warm Vault ISFJ"
    },
    "english": "Warm Vault ISFJ",
    "emoji": "🫖",
    "animal": {
      "zh": "默默补给",
      "en": "默默补给"
    },
    "fantasy": {
      "zh": "默默补给职业形态",
      "en": "默默补给 career form"
    },
    "vibe": {
      "zh": "记得所有细节，也记得休息",
      "en": "记得所有细节，也记得休息"
    },
    "philosophy": {
      "zh": "被需要不是义务",
      "en": "被需要不是义务"
    },
    "analysis": {
      "zh": "记得所有细节，也记得休息。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "记得所有细节，也记得休息. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是老好人，你是有边界的补给站。",
      "en": "你不是老好人，你是有边界的补给站。"
    },
    "traits": {
      "zh": [
        "默默补给",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "默默补给",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "被需要不是义务",
      "en": "被需要不是义务"
    },
    "meme": {
      "zh": "你不是老好人，你是有边界的补给站。",
      "en": "你不是老好人，你是有边界的补给站。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X11",
    "kind": "extended",
    "code": "ESTJ",
    "name": {
      "zh": "ESTJ-调度",
      "en": "Dispatch ESTJ"
    },
    "english": "Dispatch ESTJ",
    "emoji": "📋",
    "animal": {
      "zh": "现场指挥官",
      "en": "现场指挥官"
    },
    "fantasy": {
      "zh": "现场指挥官职业形态",
      "en": "现场指挥官 career form"
    },
    "vibe": {
      "zh": "流程救场，结果说话",
      "en": "流程救场，结果说话"
    },
    "philosophy": {
      "zh": "清晰是对团队的尊重",
      "en": "清晰是对团队的尊重"
    },
    "analysis": {
      "zh": "流程救场，结果说话。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "流程救场，结果说话. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是控制欲，你是怕混乱吞人。",
      "en": "你不是控制欲，你是怕混乱吞人。"
    },
    "traits": {
      "zh": [
        "现场指挥官",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "现场指挥官",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "清晰是对团队的尊重",
      "en": "清晰是对团队的尊重"
    },
    "meme": {
      "zh": "你不是控制欲，你是怕混乱吞人。",
      "en": "你不是控制欲，你是怕混乱吞人。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X12",
    "kind": "extended",
    "code": "ESFJ",
    "name": {
      "zh": "ESFJ-管家",
      "en": "House Captain ESFJ"
    },
    "english": "House Captain ESFJ",
    "emoji": "🎀",
    "animal": {
      "zh": "关系维护员",
      "en": "关系维护员"
    },
    "fantasy": {
      "zh": "关系维护员职业形态",
      "en": "关系维护员 career form"
    },
    "vibe": {
      "zh": "场面和人心都要照顾",
      "en": "场面和人心都要照顾"
    },
    "philosophy": {
      "zh": "和谐不是和稀泥",
      "en": "和谐不是和稀泥"
    },
    "analysis": {
      "zh": "场面和人心都要照顾。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "场面和人心都要照顾. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是爱操心，你是默认打开群体雷达。",
      "en": "你不是爱操心，你是默认打开群体雷达。"
    },
    "traits": {
      "zh": [
        "关系维护员",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "关系维护员",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "和谐不是和稀泥",
      "en": "和谐不是和稀泥"
    },
    "meme": {
      "zh": "你不是爱操心，你是默认打开群体雷达。",
      "en": "你不是爱操心，你是默认打开群体雷达。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X13",
    "kind": "extended",
    "code": "ISTP",
    "name": {
      "zh": "ISTP-拆解",
      "en": "Tear-down ISTP"
    },
    "english": "Tear-down ISTP",
    "emoji": "🛠️",
    "animal": {
      "zh": "冷静技师",
      "en": "冷静技师"
    },
    "fantasy": {
      "zh": "冷静技师职业形态",
      "en": "冷静技师 career form"
    },
    "vibe": {
      "zh": "少说话，多修好",
      "en": "少说话，多修好"
    },
    "philosophy": {
      "zh": "能力是最好的解释",
      "en": "能力是最好的解释"
    },
    "analysis": {
      "zh": "少说话，多修好。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "少说话，多修好. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是冷淡，你是在动手而不是开发布会。",
      "en": "你不是冷淡，你是在动手而不是开发布会。"
    },
    "traits": {
      "zh": [
        "冷静技师",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "冷静技师",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "能力是最好的解释",
      "en": "能力是最好的解释"
    },
    "meme": {
      "zh": "你不是冷淡，你是在动手而不是开发布会。",
      "en": "你不是冷淡，你是在动手而不是开发布会。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X14",
    "kind": "extended",
    "code": "ISFP",
    "name": {
      "zh": "ISFP-滤镜",
      "en": "Filter ISFP"
    },
    "english": "Filter ISFP",
    "emoji": "🎨",
    "animal": {
      "zh": "审美游侠",
      "en": "审美游侠"
    },
    "fantasy": {
      "zh": "审美游侠职业形态",
      "en": "审美游侠 career form"
    },
    "vibe": {
      "zh": "用感受校准世界",
      "en": "用感受校准世界"
    },
    "philosophy": {
      "zh": "美是活着的证据",
      "en": "美是活着的证据"
    },
    "analysis": {
      "zh": "用感受校准世界。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "用感受校准世界. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是矫情，你是在保护感官预算。",
      "en": "你不是矫情，你是在保护感官预算。"
    },
    "traits": {
      "zh": [
        "审美游侠",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "审美游侠",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "美是活着的证据",
      "en": "美是活着的证据"
    },
    "meme": {
      "zh": "你不是矫情，你是在保护感官预算。",
      "en": "你不是矫情，你是在保护感官预算。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X15",
    "kind": "extended",
    "code": "ESTP",
    "name": {
      "zh": "ESTP-现开",
      "en": "Live Wire ESTP"
    },
    "english": "Live Wire ESTP",
    "emoji": "⚡",
    "animal": {
      "zh": "现场玩家",
      "en": "现场玩家"
    },
    "fantasy": {
      "zh": "现场玩家职业形态",
      "en": "现场玩家 career form"
    },
    "vibe": {
      "zh": "先冲再调，临场最强",
      "en": "先冲再调，临场最强"
    },
    "philosophy": {
      "zh": "行动是最快的思考",
      "en": "行动是最快的思考"
    },
    "analysis": {
      "zh": "先冲再调，临场最强。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "先冲再调，临场最强. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是莽，你是低延迟决策。",
      "en": "你不是莽，你是低延迟决策。"
    },
    "traits": {
      "zh": [
        "现场玩家",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "现场玩家",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "行动是最快的思考",
      "en": "行动是最快的思考"
    },
    "meme": {
      "zh": "你不是莽，你是低延迟决策。",
      "en": "你不是莽，你是低延迟决策。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X16",
    "kind": "extended",
    "code": "ESFP",
    "name": {
      "zh": "ESFP-舞台",
      "en": "Stage ESFP"
    },
    "english": "Stage ESFP",
    "emoji": "🎤",
    "animal": {
      "zh": "快乐广播",
      "en": "快乐广播"
    },
    "fantasy": {
      "zh": "快乐广播职业形态",
      "en": "快乐广播 career form"
    },
    "vibe": {
      "zh": "把瞬间过成电影",
      "en": "把瞬间过成电影"
    },
    "philosophy": {
      "zh": "快乐也需要管理",
      "en": "快乐也需要管理"
    },
    "analysis": {
      "zh": "把瞬间过成电影。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "把瞬间过成电影. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是吵，你是把气氛从待机唤醒。",
      "en": "你不是吵，你是把气氛从待机唤醒。"
    },
    "traits": {
      "zh": [
        "快乐广播",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "快乐广播",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "快乐也需要管理",
      "en": "快乐也需要管理"
    },
    "meme": {
      "zh": "你不是吵，你是把气氛从待机唤醒。",
      "en": "你不是吵，你是把气氛从待机唤醒。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X17",
    "kind": "extended",
    "code": "EXT",
    "name": {
      "zh": "社死幸存者",
      "en": "Cringe Survivor"
    },
    "english": "Cringe Survivor",
    "emoji": "🙈",
    "animal": {
      "zh": "尴尬转化器",
      "en": "尴尬转化器"
    },
    "fantasy": {
      "zh": "尴尬转化器职业形态",
      "en": "尴尬转化器 career form"
    },
    "vibe": {
      "zh": "把社死炼成谈资",
      "en": "把社死炼成谈资"
    },
    "philosophy": {
      "zh": "尴尬训练影分身",
      "en": "尴尬训练影分身"
    },
    "analysis": {
      "zh": "把社死炼成谈资。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "把社死炼成谈资. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是社恐，你是有经验的翻车老司机。",
      "en": "你不是社恐，你是有经验的翻车老司机。"
    },
    "traits": {
      "zh": [
        "尴尬转化器",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "尴尬转化器",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "尴尬训练影分身",
      "en": "尴尬训练影分身"
    },
    "meme": {
      "zh": "你不是社恐，你是有经验的翻车老司机。",
      "en": "你不是社恐，你是有经验的翻车老司机。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X18",
    "kind": "extended",
    "code": "EXT",
    "name": {
      "zh": "DDL法师",
      "en": "Deadline Mage"
    },
    "english": "Deadline Mage",
    "emoji": "⏰",
    "animal": {
      "zh": "截止炼金",
      "en": "截止炼金"
    },
    "fantasy": {
      "zh": "截止炼金职业形态",
      "en": "截止炼金 career form"
    },
    "vibe": {
      "zh": "压力一来灵感上班",
      "en": "压力一来灵感上班"
    },
    "philosophy": {
      "zh": "完成比完美更成人",
      "en": "完成比完美更成人"
    },
    "analysis": {
      "zh": "压力一来灵感上班。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "压力一来灵感上班. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是懒，你是靠最后五分钟超频。",
      "en": "你不是懒，你是靠最后五分钟超频。"
    },
    "traits": {
      "zh": [
        "截止炼金",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "截止炼金",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "完成比完美更成人",
      "en": "完成比完美更成人"
    },
    "meme": {
      "zh": "你不是懒，你是靠最后五分钟超频。",
      "en": "你不是懒，你是靠最后五分钟超频。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X19",
    "kind": "extended",
    "code": "EXT",
    "name": {
      "zh": "已读不回仙人",
      "en": "Seen-No-Reply Immortal"
    },
    "english": "Seen-No-Reply Immortal",
    "emoji": "📵",
    "animal": {
      "zh": "边界修行",
      "en": "边界修行"
    },
    "fantasy": {
      "zh": "边界修行职业形态",
      "en": "边界修行 career form"
    },
    "vibe": {
      "zh": "沉默也是回复",
      "en": "沉默也是回复"
    },
    "philosophy": {
      "zh": "已读不回是边界艺术",
      "en": "已读不回是边界艺术"
    },
    "analysis": {
      "zh": "沉默也是回复。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "沉默也是回复. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是高冷，你是在做电量管理。",
      "en": "你不是高冷，你是在做电量管理。"
    },
    "traits": {
      "zh": [
        "边界修行",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "边界修行",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "已读不回是边界艺术",
      "en": "已读不回是边界艺术"
    },
    "meme": {
      "zh": "你不是高冷，你是在做电量管理。",
      "en": "你不是高冷，你是在做电量管理。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X20",
    "kind": "extended",
    "code": "EXT",
    "name": {
      "zh": "表情包外交官",
      "en": "Sticker Diplomat"
    },
    "english": "Sticker Diplomat",
    "emoji": "🐸",
    "animal": {
      "zh": "幽默谈判",
      "en": "幽默谈判"
    },
    "fantasy": {
      "zh": "幽默谈判职业形态",
      "en": "幽默谈判 career form"
    },
    "vibe": {
      "zh": "用梗卸压，用态度成交",
      "en": "用梗卸压，用态度成交"
    },
    "philosophy": {
      "zh": "幽默是高级防御",
      "en": "幽默是高级防御"
    },
    "analysis": {
      "zh": "用梗卸压，用态度成交。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "用梗卸压，用态度成交. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是不正经，你是用笑完成沟通。",
      "en": "你不是不正经，你是用笑完成沟通。"
    },
    "traits": {
      "zh": [
        "幽默谈判",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "幽默谈判",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "幽默是高级防御",
      "en": "幽默是高级防御"
    },
    "meme": {
      "zh": "你不是不正经，你是用笑完成沟通。",
      "en": "你不是不正经，你是用笑完成沟通。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X21",
    "kind": "extended",
    "code": "EXT",
    "name": {
      "zh": "群聊政治家",
      "en": "Groupchat Politician"
    },
    "english": "Groupchat Politician",
    "emoji": "🗳️",
    "animal": {
      "zh": "舆论导航",
      "en": "舆论导航"
    },
    "fantasy": {
      "zh": "舆论导航职业形态",
      "en": "舆论导航 career form"
    },
    "vibe": {
      "zh": "读空气比读消息快",
      "en": "读空气比读消息快"
    },
    "philosophy": {
      "zh": "热闹不等于亲密",
      "en": "热闹不等于亲密"
    },
    "analysis": {
      "zh": "读空气比读消息快。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "读空气比读消息快. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是戏多，你是群聊版本的雷达站。",
      "en": "你不是戏多，你是群聊版本的雷达站。"
    },
    "traits": {
      "zh": [
        "舆论导航",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "舆论导航",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "热闹不等于亲密",
      "en": "热闹不等于亲密"
    },
    "meme": {
      "zh": "你不是戏多，你是群聊版本的雷达站。",
      "en": "你不是戏多，你是群聊版本的雷达站。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X22",
    "kind": "extended",
    "code": "EXT",
    "name": {
      "zh": "低电量隐士",
      "en": "Low-Battery Hermit"
    },
    "english": "Low-Battery Hermit",
    "emoji": "🔋",
    "animal": {
      "zh": "回血专家",
      "en": "回血专家"
    },
    "fantasy": {
      "zh": "回血专家职业形态",
      "en": "回血专家 career form"
    },
    "vibe": {
      "zh": "社交有额度，独处是充电桩",
      "en": "社交有额度，独处是充电桩"
    },
    "philosophy": {
      "zh": "低电量别做高难度人格运算",
      "en": "低电量别做高难度人格运算"
    },
    "analysis": {
      "zh": "社交有额度，独处是充电桩。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "社交有额度，独处是充电桩. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是不合群，你是在防止关机。",
      "en": "你不是不合群，你是在防止关机。"
    },
    "traits": {
      "zh": [
        "回血专家",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "回血专家",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "低电量别做高难度人格运算",
      "en": "低电量别做高难度人格运算"
    },
    "meme": {
      "zh": "你不是不合群，你是在防止关机。",
      "en": "你不是不合群，你是在防止关机。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X23",
    "kind": "extended",
    "code": "EXT",
    "name": {
      "zh": "清单修道士",
      "en": "Checklist Monk"
    },
    "english": "Checklist Monk",
    "emoji": "✅",
    "animal": {
      "zh": "闭环信徒",
      "en": "闭环信徒"
    },
    "fantasy": {
      "zh": "闭环信徒职业形态",
      "en": "闭环信徒 career form"
    },
    "vibe": {
      "zh": "勾完一项就多一点自由",
      "en": "勾完一项就多一点自由"
    },
    "philosophy": {
      "zh": "秩序是安全感",
      "en": "秩序是安全感"
    },
    "analysis": {
      "zh": "勾完一项就多一点自由。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "勾完一项就多一点自由. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是强迫症，你是反混乱工程师。",
      "en": "你不是强迫症，你是反混乱工程师。"
    },
    "traits": {
      "zh": [
        "闭环信徒",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "闭环信徒",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "秩序是安全感",
      "en": "秩序是安全感"
    },
    "meme": {
      "zh": "你不是强迫症，你是反混乱工程师。",
      "en": "你不是强迫症，你是反混乱工程师。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X24",
    "kind": "extended",
    "code": "EXT",
    "name": {
      "zh": "灵感流浪者",
      "en": "Idea Nomad"
    },
    "english": "Idea Nomad",
    "emoji": "🌀",
    "animal": {
      "zh": "点子游牧",
      "en": "点子游牧"
    },
    "fantasy": {
      "zh": "点子游牧职业形态",
      "en": "点子游牧 career form"
    },
    "vibe": {
      "zh": "点子很多，落地要地图",
      "en": "点子很多，落地要地图"
    },
    "philosophy": {
      "zh": "灵感要配施工队",
      "en": "灵感要配施工队"
    },
    "analysis": {
      "zh": "点子很多，落地要地图。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "点子很多，落地要地图. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是善变，你是版本迭代太勤。",
      "en": "你不是善变，你是版本迭代太勤。"
    },
    "traits": {
      "zh": [
        "点子游牧",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "点子游牧",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "灵感要配施工队",
      "en": "灵感要配施工队"
    },
    "meme": {
      "zh": "你不是善变，你是版本迭代太勤。",
      "en": "你不是善变，你是版本迭代太勤。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X25",
    "kind": "extended",
    "code": "EXT",
    "name": {
      "zh": "共情海绵",
      "en": "Empathy Sponge"
    },
    "english": "Empathy Sponge",
    "emoji": "🧽",
    "animal": {
      "zh": "情绪吸收",
      "en": "情绪吸收"
    },
    "fantasy": {
      "zh": "情绪吸收职业形态",
      "en": "情绪吸收 career form"
    },
    "vibe": {
      "zh": "别人的雨会淋到你",
      "en": "别人的雨会淋到你"
    },
    "philosophy": {
      "zh": "看见不等于替扛",
      "en": "看见不等于替扛"
    },
    "analysis": {
      "zh": "别人的雨会淋到你。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "别人的雨会淋到你. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是软弱，你是默认开了情绪蓝牙。",
      "en": "你不是软弱，你是默认开了情绪蓝牙。"
    },
    "traits": {
      "zh": [
        "情绪吸收",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "情绪吸收",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "看见不等于替扛",
      "en": "看见不等于替扛"
    },
    "meme": {
      "zh": "你不是软弱，你是默认开了情绪蓝牙。",
      "en": "你不是软弱，你是默认开了情绪蓝牙。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X26",
    "kind": "extended",
    "code": "EXT",
    "name": {
      "zh": "逻辑手术刀",
      "en": "Logic Scalpel"
    },
    "english": "Logic Scalpel",
    "emoji": "🗡️",
    "animal": {
      "zh": "问题解剖",
      "en": "问题解剖"
    },
    "fantasy": {
      "zh": "问题解剖职业形态",
      "en": "问题解剖 career form"
    },
    "vibe": {
      "zh": "先分清事实和情绪",
      "en": "先分清事实和情绪"
    },
    "philosophy": {
      "zh": "清晰是温柔",
      "en": "清晰是温柔"
    },
    "analysis": {
      "zh": "先分清事实和情绪。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "先分清事实和情绪. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是冷血，你是先止血再拥抱。",
      "en": "你不是冷血，你是先止血再拥抱。"
    },
    "traits": {
      "zh": [
        "问题解剖",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "问题解剖",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "清晰是温柔",
      "en": "清晰是温柔"
    },
    "meme": {
      "zh": "你不是冷血，你是先止血再拥抱。",
      "en": "你不是冷血，你是先止血再拥抱。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X27",
    "kind": "extended",
    "code": "EXT",
    "name": {
      "zh": "即兴冲浪手",
      "en": "Improv Surfer"
    },
    "english": "Improv Surfer",
    "emoji": "🌊",
    "animal": {
      "zh": "状态玩家",
      "en": "状态玩家"
    },
    "fantasy": {
      "zh": "状态玩家职业形态",
      "en": "状态玩家 career form"
    },
    "vibe": {
      "zh": "计划可改，窗口先冲",
      "en": "计划可改，窗口先冲"
    },
    "philosophy": {
      "zh": "弹性是智慧",
      "en": "弹性是智慧"
    },
    "analysis": {
      "zh": "计划可改，窗口先冲。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "计划可改，窗口先冲. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是随意，你是高适配系统。",
      "en": "你不是随意，你是高适配系统。"
    },
    "traits": {
      "zh": [
        "状态玩家",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "状态玩家",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "弹性是智慧",
      "en": "弹性是智慧"
    },
    "meme": {
      "zh": "你不是随意，你是高适配系统。",
      "en": "你不是随意，你是高适配系统。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X28",
    "kind": "extended",
    "code": "EXT",
    "name": {
      "zh": "边界建筑师",
      "en": "Boundary Architect"
    },
    "english": "Boundary Architect",
    "emoji": "🚧",
    "animal": {
      "zh": "关系工程",
      "en": "关系工程"
    },
    "fantasy": {
      "zh": "关系工程职业形态",
      "en": "关系工程 career form"
    },
    "vibe": {
      "zh": "门上有锁也有钥匙",
      "en": "门上有锁也有钥匙"
    },
    "philosophy": {
      "zh": "会说不才会好好说好",
      "en": "会说不才会好好说好"
    },
    "analysis": {
      "zh": "门上有锁也有钥匙。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "门上有锁也有钥匙. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是难相处，你是防过载设计。",
      "en": "你不是难相处，你是防过载设计。"
    },
    "traits": {
      "zh": [
        "关系工程",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "关系工程",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "会说不才会好好说好",
      "en": "会说不才会好好说好"
    },
    "meme": {
      "zh": "你不是难相处，你是防过载设计。",
      "en": "你不是难相处，你是防过载设计。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X29",
    "kind": "extended",
    "code": "EXT",
    "name": {
      "zh": "复盘哲学家",
      "en": "Review Philosopher"
    },
    "english": "Review Philosopher",
    "emoji": "📜",
    "animal": {
      "zh": "事后清明",
      "en": "事后清明"
    },
    "fantasy": {
      "zh": "事后清明职业形态",
      "en": "事后清明 career form"
    },
    "vibe": {
      "zh": "把翻车写成说明书",
      "en": "把翻车写成说明书"
    },
    "philosophy": {
      "zh": "失败是样本不是判决",
      "en": "失败是样本不是判决"
    },
    "analysis": {
      "zh": "把翻车写成说明书。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "把翻车写成说明书. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是爱后悔，你是在升级固件。",
      "en": "你不是爱后悔，你是在升级固件。"
    },
    "traits": {
      "zh": [
        "事后清明",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "事后清明",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "失败是样本不是判决",
      "en": "失败是样本不是判决"
    },
    "meme": {
      "zh": "你不是爱后悔，你是在升级固件。",
      "en": "你不是爱后悔，你是在升级固件。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X30",
    "kind": "extended",
    "code": "EXT",
    "name": {
      "zh": "快乐工程师",
      "en": "Joy Engineer"
    },
    "english": "Joy Engineer",
    "emoji": "🎉",
    "animal": {
      "zh": "快乐施工",
      "en": "快乐施工"
    },
    "fantasy": {
      "zh": "快乐施工职业形态",
      "en": "快乐施工 career form"
    },
    "vibe": {
      "zh": "把好玩做成可持续",
      "en": "把好玩做成可持续"
    },
    "philosophy": {
      "zh": "有趣要配靠谱",
      "en": "有趣要配靠谱"
    },
    "analysis": {
      "zh": "把好玩做成可持续。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "把好玩做成可持续. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是只想玩，你是在给生活装加速器。",
      "en": "你不是只想玩，你是在给生活装加速器。"
    },
    "traits": {
      "zh": [
        "快乐施工",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "快乐施工",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "有趣要配靠谱",
      "en": "有趣要配靠谱"
    },
    "meme": {
      "zh": "你不是只想玩，你是在给生活装加速器。",
      "en": "你不是只想玩，你是在给生活装加速器。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X31",
    "kind": "extended",
    "code": "EXT",
    "name": {
      "zh": "夜猫思想家",
      "en": "Night Owl Thinker"
    },
    "english": "Night Owl Thinker",
    "emoji": "🦉",
    "animal": {
      "zh": "凌晨清醒",
      "en": "凌晨清醒"
    },
    "fantasy": {
      "zh": "凌晨清醒职业形态",
      "en": "凌晨清醒 career form"
    },
    "vibe": {
      "zh": "白天待机，夜晚编译",
      "en": "白天待机，夜晚编译"
    },
    "philosophy": {
      "zh": "节奏比期待重要",
      "en": "节奏比期待重要"
    },
    "analysis": {
      "zh": "白天待机，夜晚编译。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "白天待机，夜晚编译. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是颠倒，你是时区不同。",
      "en": "你不是颠倒，你是时区不同。"
    },
    "traits": {
      "zh": [
        "凌晨清醒",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "凌晨清醒",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "节奏比期待重要",
      "en": "节奏比期待重要"
    },
    "meme": {
      "zh": "你不是颠倒，你是时区不同。",
      "en": "你不是颠倒，你是时区不同。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X32",
    "kind": "extended",
    "code": "EXT",
    "name": {
      "zh": "人间观察员",
      "en": "Human Observer"
    },
    "english": "Human Observer",
    "emoji": "👀",
    "animal": {
      "zh": "现场田野",
      "en": "现场田野"
    },
    "fantasy": {
      "zh": "现场田野职业形态",
      "en": "现场田野 career form"
    },
    "vibe": {
      "zh": "先看懂再出手",
      "en": "先看懂再出手"
    },
    "philosophy": {
      "zh": "观察是参与的前奏",
      "en": "观察是参与的前奏"
    },
    "analysis": {
      "zh": "先看懂再出手。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "先看懂再出手. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是局外人，你是在加载地图。",
      "en": "你不是局外人，你是在加载地图。"
    },
    "traits": {
      "zh": [
        "现场田野",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "现场田野",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "观察是参与的前奏",
      "en": "观察是参与的前奏"
    },
    "meme": {
      "zh": "你不是局外人，你是在加载地图。",
      "en": "你不是局外人，你是在加载地图。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X33",
    "kind": "extended",
    "code": "EXT",
    "name": {
      "zh": "温和硬核党",
      "en": "Softcore Hardcore"
    },
    "english": "Softcore Hardcore",
    "emoji": "🧊",
    "animal": {
      "zh": "柔中带钢",
      "en": "柔中带钢"
    },
    "fantasy": {
      "zh": "柔中带钢职业形态",
      "en": "柔中带钢 career form"
    },
    "vibe": {
      "zh": "语气软，底线硬",
      "en": "语气软，底线硬"
    },
    "philosophy": {
      "zh": "温柔需要脊梁",
      "en": "温柔需要脊梁"
    },
    "analysis": {
      "zh": "语气软，底线硬。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "语气软，底线硬. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是好欺负，你是礼帽下藏盔甲。",
      "en": "你不是好欺负，你是礼帽下藏盔甲。"
    },
    "traits": {
      "zh": [
        "柔中带钢",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "柔中带钢",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "温柔需要脊梁",
      "en": "温柔需要脊梁"
    },
    "meme": {
      "zh": "你不是好欺负，你是礼帽下藏盔甲。",
      "en": "你不是好欺负，你是礼帽下藏盔甲。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  },
  {
    "id": "X34",
    "kind": "extended",
    "code": "EXT",
    "name": {
      "zh": "补丁人生家",
      "en": "Patch-Note Human"
    },
    "english": "Patch-Note Human",
    "emoji": "🧩",
    "animal": {
      "zh": "迭代选手",
      "en": "迭代选手"
    },
    "fantasy": {
      "zh": "迭代选手职业形态",
      "en": "迭代选手 career form"
    },
    "vibe": {
      "zh": "每天发一小版更稳的自己",
      "en": "每天发一小版更稳的自己"
    },
    "philosophy": {
      "zh": "丑一点也能跑",
      "en": "丑一点也能跑"
    },
    "analysis": {
      "zh": "每天发一小版更稳的自己。这是增强图鉴扩展卡，帮你对照生活形态。",
      "en": "每天发一小版更稳的自己. Extended codex card for life-form mapping."
    },
    "snark": {
      "zh": "你不是反复横跳，你是持续发布。",
      "en": "你不是反复横跳，你是持续发布。"
    },
    "traits": {
      "zh": [
        "迭代选手",
        "搞笑有哲理",
        "生活可对照"
      ],
      "en": [
        "迭代选手",
        "funny+wise",
        "life mirror"
      ]
    },
    "strengths": {
      "zh": [
        "识别自己",
        "讲出人话",
        "能笑也能改"
      ],
      "en": [
        "self-spot",
        "plain talk",
        "laugh and fix"
      ]
    },
    "watchouts": {
      "zh": [
        "别标签锁死",
        "别只拿来玩梗"
      ],
      "en": [
        "don't lock labels",
        "don't meme-only"
      ]
    },
    "growth": {
      "zh": "把好笑的自我认知，转成明天可执行的一小步。",
      "en": "Turn funny self-awareness into one doable step tomorrow."
    },
    "slogan": {
      "zh": "丑一点也能跑",
      "en": "丑一点也能跑"
    },
    "meme": {
      "zh": "你不是反复横跳，你是持续发布。",
      "en": "你不是反复横跳，你是持续发布。"
    },
    "loveStyle": {
      "zh": "先理解节奏，再谈亲密配方。",
      "en": "Understand tempo before intimacy recipes."
    },
    "workStyle": {
      "zh": "发挥形态优势，补上短板流程。",
      "en": "Use form strengths; patch process gaps."
    },
    "socialBuff": {
      "zh": "让同类秒懂，让异类少误会。",
      "en": "Same-types get you; others misread less."
    },
    "socialDebuff": {
      "zh": "被贴标签时记得抗议一下。",
      "en": "Protest when over-labeled."
    },
    "bestScene": {
      "zh": "需要自嘲和清醒同时在场时。",
      "en": "When self-roast and clarity are both needed."
    },
    "worstScene": {
      "zh": "被逼表演单一人设时。",
      "en": "When forced into one persona."
    }
  }
];

const CAREERS = {
  "INTJ": [
    {
      "zh": "产品战略 / 系统架构",
      "en": "Product strategy / systems architecture"
    },
    {
      "zh": "研究分析 / 投资研究",
      "en": "Research analysis / investment research"
    },
    {
      "zh": "复杂项目负责人",
      "en": "Complex program lead"
    }
  ],
  "INTP": [
    {
      "zh": "研发工程 / 算法",
      "en": "R&D engineering / algorithms"
    },
    {
      "zh": "数据分析 / 科学探索",
      "en": "Data analysis / scientific exploration"
    },
    {
      "zh": "独立创作者（硬核向）",
      "en": "Independent creator (deep-tech)"
    }
  ],
  "ENTJ": [
    {
      "zh": "管理培训 / 业务负责人",
      "en": "Management track / business owner"
    },
    {
      "zh": "创业操盘 / 咨询",
      "en": "Startup operator / consulting"
    },
    {
      "zh": "运营增长负责人",
      "en": "Growth operations lead"
    }
  ],
  "ENTP": [
    {
      "zh": "创新业务 / BD",
      "en": "New business / BD"
    },
    {
      "zh": "内容策略 / 产品探索",
      "en": "Content strategy / product discovery"
    },
    {
      "zh": "媒体与辩论型表达",
      "en": "Media & debate-driven roles"
    }
  ],
  "INFJ": [
    {
      "zh": "咨询辅导 / 用户研究",
      "en": "Coaching / user research"
    },
    {
      "zh": "品牌叙事 / 教育设计",
      "en": "Brand narrative / learning design"
    },
    {
      "zh": "非营利与社会创新",
      "en": "Nonprofit & social innovation"
    }
  ],
  "INFP": [
    {
      "zh": "写作编辑 / 设计",
      "en": "Writing/editing / design"
    },
    {
      "zh": "心理相关支持工作",
      "en": "Psychology-adjacent support"
    },
    {
      "zh": "独立艺术与内容",
      "en": "Indie art & content"
    }
  ],
  "ENFJ": [
    {
      "zh": "团队管理 / HRBP",
      "en": "People management / HRBP"
    },
    {
      "zh": "教师培训 / 社区运营",
      "en": "Teaching/training / community ops"
    },
    {
      "zh": "客户成功",
      "en": "Customer success"
    }
  ],
  "ENFP": [
    {
      "zh": "市场创意 / 品牌活动",
      "en": "Marketing creative / brand events"
    },
    {
      "zh": "内容与播客主持",
      "en": "Content & podcast hosting"
    },
    {
      "zh": "跨界项目连接者",
      "en": "Cross-team connector"
    }
  ],
  "ISTJ": [
    {
      "zh": "财务审计 / 质量管控",
      "en": "Finance audit / quality control"
    },
    {
      "zh": "运营流程 / 法务合规",
      "en": "Ops process / legal compliance"
    },
    {
      "zh": "项目管理执行",
      "en": "Project execution"
    }
  ],
  "ISFJ": [
    {
      "zh": "医疗护理 / 行政支持",
      "en": "Healthcare / admin support"
    },
    {
      "zh": "客户服务管理",
      "en": "Customer service management"
    },
    {
      "zh": "教育教务",
      "en": "Academic administration"
    }
  ],
  "ESTJ": [
    {
      "zh": "运营管理 / 供应链",
      "en": "Operations / supply chain"
    },
    {
      "zh": "销售管理 / 现场督导",
      "en": "Sales management / field supervision"
    },
    {
      "zh": "公共事务执行",
      "en": "Public affairs execution"
    }
  ],
  "ESFJ": [
    {
      "zh": "活动策划 / 接待管理",
      "en": "Event planning / hospitality"
    },
    {
      "zh": "社群与会员运营",
      "en": "Community & membership ops"
    },
    {
      "zh": "医疗与教育服务窗口",
      "en": "Service-facing education/health roles"
    }
  ],
  "ISTP": [
    {
      "zh": "工程技术 / 运维",
      "en": "Engineering / ops tech"
    },
    {
      "zh": "应急处理 / 技工专家",
      "en": "Incident response / craft specialist"
    },
    {
      "zh": "产品硬件测试",
      "en": "Hardware product testing"
    }
  ],
  "ISFP": [
    {
      "zh": "视觉设计 / 摄影",
      "en": "Visual design / photography"
    },
    {
      "zh": "手作与体验设计",
      "en": "Craft & experience design"
    },
    {
      "zh": "生活方式内容",
      "en": "Lifestyle content"
    }
  ],
  "ESTP": [
    {
      "zh": "销售前线 / 商务谈判",
      "en": "Frontline sales / negotiation"
    },
    {
      "zh": "体育与现场活动",
      "en": "Sports & live events"
    },
    {
      "zh": "创业实操与拓客",
      "en": "Hands-on startup hustle"
    }
  ],
  "ESFP": [
    {
      "zh": "表演主持 / 直播",
      "en": "Performance / hosting / livestream"
    },
    {
      "zh": "旅游与体验零售",
      "en": "Travel & experiential retail"
    },
    {
      "zh": "公关与品牌现场",
      "en": "PR & on-site brand work"
    }
  ]
};

const MATCHES = {
  "INTJ": {
    "best": [
      "ENFP",
      "ENTP",
      "INFJ"
    ],
    "conflict": [
      "ESFP",
      "ISFP"
    ]
  },
  "INTP": {
    "best": [
      "ENTJ",
      "ENFJ",
      "INTJ"
    ],
    "conflict": [
      "ESFJ",
      "ISFJ"
    ]
  },
  "ENTJ": {
    "best": [
      "INTP",
      "INFP",
      "ENTP"
    ],
    "conflict": [
      "ISFP",
      "ESFP"
    ]
  },
  "ENTP": {
    "best": [
      "INFJ",
      "INTJ",
      "ENFJ"
    ],
    "conflict": [
      "ISFJ",
      "ISTJ"
    ]
  },
  "INFJ": {
    "best": [
      "ENFP",
      "ENTP",
      "INTJ"
    ],
    "conflict": [
      "ESTP",
      "ESFP"
    ]
  },
  "INFP": {
    "best": [
      "ENFJ",
      "ENTJ",
      "INFJ"
    ],
    "conflict": [
      "ESTJ",
      "ESFJ"
    ]
  },
  "ENFJ": {
    "best": [
      "INFP",
      "ISFP",
      "INFJ"
    ],
    "conflict": [
      "ISTP",
      "INTP"
    ]
  },
  "ENFP": {
    "best": [
      "INFJ",
      "INTJ",
      "ENFJ"
    ],
    "conflict": [
      "ISTJ",
      "ESTJ"
    ]
  },
  "ISTJ": {
    "best": [
      "ESFJ",
      "ESTJ",
      "INTJ"
    ],
    "conflict": [
      "ENFP",
      "ENTP"
    ]
  },
  "ISFJ": {
    "best": [
      "ESFP",
      "ESTJ",
      "ISFP"
    ],
    "conflict": [
      "ENTP",
      "ENTJ"
    ]
  },
  "ESTJ": {
    "best": [
      "ISFJ",
      "ISTJ",
      "ESFJ"
    ],
    "conflict": [
      "INFP",
      "ENFP"
    ]
  },
  "ESFJ": {
    "best": [
      "ISFJ",
      "ISTJ",
      "ESFP"
    ],
    "conflict": [
      "INTP",
      "INTJ"
    ]
  },
  "ISTP": {
    "best": [
      "ESTP",
      "ISFP",
      "ISTJ"
    ],
    "conflict": [
      "ENFJ",
      "ESFJ"
    ]
  },
  "ISFP": {
    "best": [
      "ESFP",
      "ENFJ",
      "ISFJ"
    ],
    "conflict": [
      "ENTJ",
      "ESTJ"
    ]
  },
  "ESTP": {
    "best": [
      "ISTP",
      "ESFP",
      "ENTP"
    ],
    "conflict": [
      "INFJ",
      "INFP"
    ]
  },
  "ESFP": {
    "best": [
      "ISFP",
      "ESFJ",
      "ESTP"
    ],
    "conflict": [
      "INTJ",
      "ISTJ"
    ]
  }
};

const UI_TEXT = {
  "zh": {
    "brandTitle": "精神状态速测台",
    "brandSub": "5万+题库 · 分类/随机48题 · 图鉴49+",
    "homeTitle": "选题库副本，抽取你的人格掉落",
    "homeLead": "题库 50000+，覆盖恋爱/学习/职场/人生/搞笑/动漫/游戏/社死/摸鱼/追剧/干饭/运动/宠物/深夜/友情等。可按分类测，也可全随机。每题四选项情景绑定，金句又损又有哲理。",
    "startBtn": "开始快问快答",
    "previewTypes": "先看增强图鉴",
    "nickTitle": "给自己起个节目名",
    "nickLead": "会出现在结果和海报上。不填就叫“匿名选手”。",
    "nickPlaceholder": "例如：已读不回仙人、DDL魔法师",
    "nickSubmit": "进入答题",
    "nickBack": "回首页",
    "analysisTip": "认真分析",
    "snarkTip": "人间锐评",
    "matchHint": "最合拍 3 · 高摩擦 2",
    "careersTitle": "适合去哪搬砖",
    "matchesTitle": "恋爱 / 社交匹配",
    "fantasyTitle": "幻想职业",
    "animalTitle": "动物搭子",
    "backHomeFromTypes": "回首页",
    "homeDisclaimer": "娱乐向自我探索，有参考性但不构成专业心理评估。手机也能顺畅作答。",
    "soundOn": "音效开",
    "soundOff": "音效关",
    "about": "关于",
    "restart": "重测",
    "prev": "上一题",
    "homeFromQuiz": "回首页",
    "progress": "第 {cur} / {total} 题",
    "copyShare": "复制分享文案",
    "nativeShare": "系统分享",
    "retry": "再来一次",
    "generatePoster": "生成海报",
    "downloadSquare": "下载 1:1",
    "downloadTall": "下载 9:16",
    "close": "关闭",
    "copied": "已复制",
    "typesTitle": "增强图鉴（49+）",
    "typesLead": "16 型核心卡 + 扩展生活形态卡。气质、哲理、恋爱、工作、社交 buff/debuff、名场面、口头禅。",
    "feature1Title": "5万+且选项不串题",
    "feature1Text": "题干、选项、金句按情景生成，逻辑对齐，避免复制粘贴选项。",
    "feature2Title": "分类测或随机测",
    "feature2Text": "恋爱、学习、职场、社死、摸鱼、追剧…想测什么点什么；也可一键随机。",
    "feature3Title": "图鉴+投稿+手机可玩",
    "feature3Text": "图鉴49+，答完可投稿；微信/QQ内直接作答。",
    "aboutTitle": "关于精神状态速测台",
    "aboutBody": "前端娱乐向人格测试 + 本地投稿。5万+题库，分类/随机48题。选项情景绑定。微信/QQ可直接作答。有趣有参考，不构成专业评估。",
    "researcher": "场控小喇叭",
    "researcherLine": "我是小喇叭。每题送你一句金句：好笑是入口，哲理是售后。",
    "traitsTitle": "关键词",
    "strengthsTitle": "优势雷达",
    "watchoutsTitle": "注意点",
    "growthTitle": "成长建议",
    "sloganTitle": "口头禅",
    "codexOpen": "看完整图鉴卡",
    "referenceNote": "结果是四维偏好统计：好玩、可参考，但别当判决书。",
    "quoteLabel": "本场金句",
    "sharePanelTitle": "公开分享",
    "sharePanelLead": "把链接发到微信/QQ，任何人点开就能直接测完、看结果。",
    "copyPublicLink": "复制公开链接",
    "shareLocalHint": "本地预览中。部署完成后这里会显示可公开访问的链接。",
    "shareReadyHint": "复制后发给微信/QQ 好友，点开即可作答。",
    "codexVibe": "气质",
    "codexPhilosophy": "哲理",
    "codexLove": "恋爱风格",
    "codexWork": "工作风格",
    "codexBuff": "社交增益",
    "codexDebuff": "社交减益",
    "codexBest": "名场面",
    "codexWorst": "避雷场",
    "codexMeme": "口头禅",
    "bankMeta": "题库 {bank} 题 · 本局 {n} 题 · {mode}",
    "nativePublicShare": "发给微信/QQ",
    "nativePublicShare": "Share to WeChat/QQ",
    "shareInAppHint": "当前就在微信/QQ 里，直接开始测就行。",
    "shareInAppHint": "You are already in WeChat/QQ — just start the quiz.",
    "shareInviteText": "来测一测你的精神状态，点开就能玩。",
    "shareInviteText": "Try this mood quiz — tap to play.",
    "contributeTitle": "给题库投稿一题",
    "contributeLead": "答完也能贡献段子。题目会去重并自动进入用户题库。",
    "contributeAxis": "维度",
    "contributeText": "题干",
    "contributeQuote": "金句",
    "contributeOptA": "选项A",
    "contributeOptB": "选项B",
    "contributeOptC": "选项C",
    "contributeOptD": "选项D",
    "contributeSubmit": "提交到题库",
    "contributeOk": "已收录，题库已更新",
    "contributeDup": "这题太眼熟了，已去重跳过",
    "contributeFail": "提交失败，已先保存在本机",
    "contributeHint": "四选项需分别对应维度两端（如 EI 用 E/I）",
    "inAppTitle": "微信/QQ 点开即可作答",
    "inAppLead": "链接发出去就能测，当前页直接完成作答、看结果、投稿。",
    "codexCount": "图鉴 {n} 张",
        "categoryTitle": "选择测试内容",
    "categoryLead": "点分类只抽该类题；点“随机混合”从全库均衡抽取。分类更多，场景更活。",
    "categoryAll": "随机混合",
    "categoryPicked": "已选：{name}",
    "modeAll": "随机混合",
    "modeCat": "分类：{name}",
    "startLoading": "题库加载中…",
    "bankLoading": "正在加载 5万+ 题库…"
  },
  "en": {
    "brandTitle": "Mood Stage Quiz",
    "brandSub": "50k+ bank · category/random 48 · codex 49+",
    "homeTitle": "Pick a dungeon, loot your type",
    "homeLead": "50,000+ prompts across love/study/work/life/funny/anime/games/cringe/slacking/drama/feast/sport/pets/night/friends. Category or full random. Scene-bound options; sharp funny quotes.",
    "startBtn": "Start rapid quiz",
    "previewTypes": "Open enhanced codex",
    "nickTitle": "Pick a stage name",
    "nickLead": "Shows on results and posters. Blank = Anonymous Player.",
    "nickPlaceholder": "e.g. Read-but-silent immortal",
    "nickSubmit": "Enter quiz",
    "nickBack": "Home",
    "analysisTip": "Serious Analysis",
    "snarkTip": "Snark Mode",
    "matchHint": "Best 3 · Friction 2",
    "careersTitle": "Career directions",
    "matchesTitle": "Love / social match",
    "fantasyTitle": "Fantasy job",
    "animalTitle": "Animal buddy",
    "backHomeFromTypes": "Home",
    "homeDisclaimer": "Fun self-exploration with practical reference—not a clinical assessment. Mobile-friendly.",
    "soundOn": "Sound On",
    "soundOff": "Sound Off",
    "about": "About",
    "restart": "Retest",
    "prev": "Prev",
    "homeFromQuiz": "Home",
    "progress": "Q {cur} / {total}",
    "copyShare": "Copy share text",
    "nativeShare": "Share",
    "retry": "Again",
    "generatePoster": "Make posters",
    "downloadSquare": "Download 1:1",
    "downloadTall": "Download 9:16",
    "close": "Close",
    "copied": "Copied",
    "typesTitle": "Enhanced Codex (49+)",
    "typesLead": "16 core cards + extended life-form cards with vibe, philosophy, love/work, buffs/debuffs, scenes, catchphrases.",
    "feature1Title": "50k+ non-copied options",
    "feature1Text": "Stem, options, quotes generated per scene with axis logic.",
    "feature2Title": "Category or random",
    "feature2Text": "Love, study, work, cringe, slacking, drama… or one-tap random.",
    "feature3Title": "Codex + contribute + mobile",
    "feature3Text": "49+ codex cards, post-run contribute; works in WeChat/QQ.",
    "aboutTitle": "About Mood Stage Quiz",
    "aboutBody": "Front-end fun quiz + local contribute. 50k+ bank, category/random 48. Scene-bound options. Works in WeChat/QQ. Entertaining, not clinical.",
    "researcher": "Stage Horn",
    "researcherLine": "I’m Horn. One quote per question: humor first, philosophy as after-sales.",
    "traitsTitle": "Keywords",
    "strengthsTitle": "Strengths",
    "watchoutsTitle": "Watchouts",
    "growthTitle": "Growth tip",
    "sloganTitle": "Catchphrase",
    "codexOpen": "Open full codex card",
    "referenceNote": "Result is four-axis preference stats: fun and useful, not a verdict.",
    "quoteLabel": "Quote of the question",
    "sharePanelTitle": "Public share",
    "sharePanelLead": "Send this link in WeChat/QQ. Anyone can open it and finish the quiz.",
    "copyPublicLink": "Copy public link",
    "shareLocalHint": "Local preview. The public link appears here after deploy.",
    "shareReadyHint": "Copy and send in WeChat/QQ — tap to play.",
    "codexVibe": "Vibe",
    "codexPhilosophy": "Philosophy",
    "codexLove": "Love style",
    "codexWork": "Work style",
    "codexBuff": "Social buff",
    "codexDebuff": "Social debuff",
    "codexBest": "Best scene",
    "codexWorst": "Avoid scene",
    "codexMeme": "Catchphrase",
    "bankMeta": "Bank {bank} · run {n} · {mode}",
    "contributeTitle": "Contribute a question",
    "contributeLead": "Add a funny prompt after your result. Dedupe + auto bank update.",
    "contributeAxis": "Axis",
    "contributeText": "Prompt",
    "contributeQuote": "Quote",
    "contributeOptA": "Option A",
    "contributeOptB": "Option B",
    "contributeOptC": "Option C",
    "contributeOptD": "Option D",
    "contributeSubmit": "Submit to bank",
    "contributeOk": "Accepted. Bank updated.",
    "contributeDup": "Looks familiar; deduped.",
    "contributeFail": "Submit failed; saved locally first.",
    "contributeHint": "Four options should map to both poles (e.g. E/I for EI).",
    "inAppTitle": "Open in WeChat/QQ to play",
    "inAppLead": "Share the link and play in place — finish, view results, contribute.",
    "codexCount": "Codex {n} cards",
        "categoryTitle": "Choose test focus",
    "categoryLead": "Pick a category for focused draws, or Random Mix for balanced full-bank sampling.",
    "categoryAll": "Random mix",
    "categoryPicked": "Selected: {name}",
    "modeAll": "Random mix",
    "modeCat": "Category: {name}",
    "startLoading": "Loading bank…",
    "bankLoading": "Loading 50k+ bank…"
  }
};

window.QUESTION_BANK = QUESTION_BANK;
window.QUESTIONS = QUESTIONS;
window.CATEGORIES = CATEGORIES;
window.TYPES = TYPES;
window.CODEX = CODEX;
window.CAREERS = CAREERS;
window.MATCHES = MATCHES;
window.UI_TEXT = UI_TEXT;
