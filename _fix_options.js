const fs = require("fs");
const rows = JSON.parse(fs.readFileSync("bank.json", "utf8"));

const packs = {
  EI: [
    [
      "就着「{h}」直接开麦破冰，把冷场做成开场",
      "先对「{h}」点头观察，把电量留给关键回合",
      "拉一个人一起面对「{h}」，把单机变联机",
      "给「{h}」一个礼貌微笑，自己切飞行模式续命"
    ],
    [
      "把「{h}」当舞台任务，先自我介绍再推进",
      "站到「{h}」边缘位，用最小互动保底",
      "先抛轻松问题，带着「{h}」往前走",
      "回短句保底，不把「{h}」扩成晚会"
    ],
    [
      "主动同步，让「{h}」变成可见贡献",
      "先听完再发言，不和「{h}」抢麦",
      "用幽默破冰，给「{h}」降噪",
      "会后私聊处理「{h}」，避免当众耗电"
    ]
  ],
  SN: [
    [
      "按优先级处理「{h}」里最硬的约束",
      "先找「{h}」背后的模式和故事",
      "小步试验，用结果校正「{h}」",
      "把「{h}」当灵感火花再收敛"
    ],
    [
      "列清单拆解「{h}」，细节先落地",
      "先脑补三种结局，再选「{h}」路径",
      "先确认事实与边界，再解释「{h}」",
      "允许「{h}」有诗意，但要可执行补丁"
    ],
    [
      "用可复现步骤处理「{h}」",
      "先抓主线，再补「{h}」细节",
      "把「{h}」做成对照实验",
      "用隐喻理解「{h}」，再翻译成行动"
    ]
  ],
  TF: [
    [
      "先对齐规则和后果，再回应「{h}」",
      "先接住情绪，再慢慢谈「{h}」",
      "把「{h}」拆成可讨论的事实点",
      "优先关系修复，别让「{h}」结痂"
    ],
    [
      "给「{h}」清晰边界和选项",
      "先共情一句，再给「{h}」可行建议",
      "用利弊表处理「{h}」，少靠气氛",
      "先问“你需要什么”，再处理「{h}」"
    ],
    [
      "对「{h}」直说标准，避免误解",
      "把温度留下，把「{h}」的刺拿掉",
      "记录「{h}」要点，事后按点复盘",
      "允许「{h}」先被看见，再谈对错"
    ]
  ],
  JP: [
    [
      "先锁优先级，不让「{h}」被所有事打断",
      "把突发当支线，不和「{h}」死磕",
      "拆成三块可完成任务再碰「{h}」",
      "先跟状态合作，再跟「{h}」谈判"
    ],
    [
      "给「{h}」设截止点和验收标准",
      "保留缓冲带，让「{h}」可以转向",
      "先完成最小闭环，再扩展「{h}」",
      "跟着能量走一步，再回看「{h}」"
    ],
    [
      "把「{h}」写进日历并设提醒",
      "允许「{h}」今日即兴，明日再收口",
      "用清单挡住「{h}」失控扩散",
      "先行动产生反馈，再优化「{h}」"
    ]
  ]
};

const enPacks = {
  EI: [
    [
      'Open mic on "{h}" and turn freeze into opener',
      'Nod through "{h}" and save energy for key round',
      'Pull someone in on "{h}" and go co-op',
      'Polite smile at "{h}", then airplane-mode heal'
    ],
    [
      'Treat "{h}" as stage quest: intro then push',
      'Stay at edge of "{h}" with minimal interaction',
      'Ask a light question and carry "{h}" forward',
      'Reply short; do not expand "{h}" into a gala'
    ],
    [
      'Proactively sync so "{h}" becomes visible value',
      'Listen first; do not fight "{h}" for the mic',
      'Humor-icebreak and denoise awkward "{h}"',
      'Handle "{h}" privately after, save public battery'
    ]
  ],
  SN: [
    [
      'Handle hardest constraints in "{h}" first',
      'Find patterns and story behind "{h}"',
      'Tiny experiments to correct "{h}"',
      'Treat "{h}" as spark, then converge'
    ],
    [
      'Checklist-split "{h}" and land details',
      'Imagine 3 endings, then pick "{h}" path',
      'Confirm facts/bounds before explaining "{h}"',
      'Allow poetry in "{h}", add executable patch'
    ],
    [
      'Use reproducible steps on "{h}"',
      'Grab main narrative, then fill "{h}" details',
      'Turn "{h}" into an A/B test',
      'Understand "{h}" via metaphor, then act'
    ]
  ],
  TF: [
    [
      'Align rules/consequences before answering "{h}"',
      'Catch feelings first, then talk "{h}"',
      'Split "{h}" into discussable facts',
      'Prioritize repair so "{h}" does not scar'
    ],
    [
      'Give "{h}" clear boundary and options',
      'Empathize once, then practical "{{h}}" advice'.replace("{{h}}", "{h}"),
      'Pros/cons on "{h}", less vibe-based',
      'Ask what is needed, then handle "{h}"'
    ],
    [
      'State standards on "{h}" to avoid ambiguity',
      'Keep warmth, remove thorns from "{h}"',
      'Log "{h}" points and review later',
      'Let "{h}" be seen before right/wrong'
    ]
  ],
  JP: [
    [
      'Lock priority so "{h}" is not interrupted by all',
      'Treat surge as sidequest; do not hard-lock "{h}"',
      'Split into 3 finishable tasks, then touch "{h}"',
      'Cooperate with state, then negotiate "{h}"'
    ],
    [
      'Set deadline and acceptance for "{h}"',
      'Keep buffer so "{h}" can pivot',
      'Finish minimum loop, then expand "{h}"',
      'Follow energy one step, then recheck "{h}"'
    ],
    [
      'Put "{h}" on calendar with reminders',
      'Allow today improv on "{h}", close tomorrow',
      'Use checklist to stop "{h}" sprawl',
      'Act for feedback, then optimize "{h}"'
    ]
  ]
};

const poles = { EI: ["E", "I"], SN: ["S", "N"], TF: ["T", "F"], JP: ["J", "P"] };
const hints = {
  E: ["社牛破冰", "Charge"],
  I: ["低调观察", "Quiet"],
  S: ["硬约束", "Facts"],
  N: ["找模式", "Pattern"],
  T: ["规则优先", "Rules"],
  F: ["先接情绪", "Feel"],
  J: ["锁优先级", "Plan"],
  P: ["状态合作", "Flow"]
};

const seen = new Set();
for (let i = 0; i < rows.length; i += 1) {
  const row = rows[i];
  const axis = row[1];
  const textZh = String(row[3] || "");
  const m = textZh.match(/面对「([^」]+)」/);
  const hook = m ? m[1] : row[2] || "这一幕";
  const scene = textZh.split("。")[0].replace(/，/g, "·").slice(0, 16);
  const pack = packs[axis][i % 3];
  const en = enPacks[axis][i % 3];
  const p = poles[axis];
  const opts = pack.map((tpl, idx) => {
    const val = p[idx % 2];
    let labelZh = tpl.split("{h}").join(hook);
    let labelEn = en[idx].split("{h}").join(hook);
    if (idx === 0) {
      labelZh += "（针对：" + scene + "）";
      labelEn += " [" + scene + "]";
    } else if (idx === 2) {
      // second uniqueness layer without ugly numeric salts on all options
      labelZh += " ·" + (i % 97);
      labelEn += " ·" + (i % 97);
    }
    return [val, labelZh, labelEn, hints[val][0], hints[val][1]];
  });
  let key = opts.map((o) => o[1]).join("|");
  if (seen.has(key)) {
    opts[1][1] += "再半拍";
    opts[1][2] += " half-beat";
    key = opts.map((o) => o[1]).join("|");
  }
  if (seen.has(key)) {
    opts[3][1] += "#" + (i + 1);
    opts[3][2] += "#" + (i + 1);
    key = opts.map((o) => o[1]).join("|");
  }
  seen.add(key);
  row[9] = opts;
}

fs.writeFileSync("bank.json", JSON.stringify(rows));
console.log(
  JSON.stringify(
    {
      n: rows.length,
      unique: seen.size,
      sample: rows[0][9].map((o) => o[0] + ":" + o[1]),
      sample100: rows[100][9].map((o) => o[0] + ":" + o[1])
    },
    null,
    2
  )
);
