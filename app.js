const STORAGE_KEY = "mood-stage-quiz-result-v6";
const RUN_SIZE = 60;
const AXES = ["EI", "SN", "TF", "JP"];

const state = {
  language: "zh",
  name: "",
  answers: [],
  index: 0,
  result: null,
  sound: true,
  choiceLocked: false,
  topic: "all",
  bankReady: false,
  bankLoading: false
};

let els = {};
let audioCtx = null;
let sessionQuestions = [];
let contributedQuestions = [];
const CONTRIB_LOCAL_KEY = "mood-stage-user-bank-v1";
const CONTRIB_QUEUE_KEY = "mood-stage-contrib-queue-v1";


function extractHookText(text) {
  const raw = t(text) || String(text || "");
  const m = raw.match(/「([^」]{1,16})」/);
  return m ? m[1] : raw.slice(0, 10) || "这题";
}

function cleanSpoken(s) {
  return String(s || "")
    .replace(/[（(]针对：.*?[）)]/g, "")
    .replace(/[（(](?:笑一点|保人设|低消耗|可复盘|软着陆|轻一点|酷一点)[）)]/g, "")
    .replace(/[·•]\d+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const REACTION_LINES = {
  E: [
    "社牛启动：不说话会憋死星人上线。",
    "你选了开口——社交KPI已+1。",
    "主动型人格，尴尬追不上你。",
    "先开口的人，通常已经赢了。",
    "E人呼吸：不说话会死，说完了还是没活。",
    "你张嘴的瞬间，空气开始流动了。",
    "热闹是他们的，但也是你搞起来的。",
    "外向不是病，是超能力（带冷却的那种）。"
  ],
  I: [
    "I人保命技：少说话，多活着。",
    "你选择了沉默——电量🔋+10%。",
    "内向不是社恐，是战略性省电。",
    "你说得少，但你想得多（很多）。",
    "I人内心弹幕：行了行了让我静静。",
    "沉默是今晚的康桥，也是你的舒适区。",
    "不急着说话的人，往往说出来的更有料。",
    "先观察再出手，这是I人的生存智慧。"
  ],
  S: [
    "务实派：先看到路再迈腿。",
    "细节控请收下我的膝盖。",
    "落地党：PPT再好看不如一个实操。",
    "你选了具体——抽象派已阵亡。",
    "S人信条：摸得到的东西才叫真实。",
    "先问清楚再动，少走八十个弯路。",
    "脚踏实地这东西，你有，很多人没有。",
    "细节决定成败？你决定细节。"
  ],
  N: [
    "脑洞星人：先想一百种可能再说。",
    "格局打开——哦不，是直接掀开天花板。",
    "想象力是你的人生加速器。",
    "先抓大方向的人，通常先吃到螃蟹。",
    "N人日常：脑子里已经演完80集了。",
    "细节可以补，方向必须对——你懂。",
    "抽象思维满分，现实接口记得留一个。",
    "你活在更大的图景里，也挺好。"
  ],
  T: [
    "理中客本客：先讲逻辑再谈感情。",
    "对事不对人——成年人的顶级修养。",
    "冷静是你的超能力，但也别冻到别人。",
    "理智在线，情绪排队中（后面还很长的队）。",
    "T人发言：道理我都懂，但是……你说得对。",
    "先分清楚事实和情绪，你已经是赢家了。",
    "逻辑清晰的人，吵架都自带占优。",
    "冷静分析中，请勿打扰（但也不要完全勿扰）。"
  ],
  F: [
    "心软之神：先把人哄好再说事。",
    "你选了共情，这个世界的温度+1℃。",
    "感情牌打得好，事情更好谈。",
    "先照顾感受——人际关系大师就是你。",
    "F人日常：我没事……其实有事但不想说。",
    "你认为人和人之间，温度比对错重要。",
    "心软不是弱点，是你还有温度的证据。",
    "你先把情绪接住了，后面的事再说。"
  ],
  J: [
    "J人狂喜：终于有人列计划了！",
    "计划通——你让混乱世界有了秩序。",
    "截止日期才是第一生产力，你懂的。",
    "先排优先级的人，人生不会太乱。",
    "J人内心：不列计划会死星人认证。",
    "有条理不是强迫症，是高效生存术。",
    "定了就做，做了就完——你的信条。",
    "世界很乱，但你的待办清单不乱。"
  ],
  P: [
    "随性玩家：计划是什么？能吃吗？",
    "弹性生存大师——走一步看三步自由人。",
    "先动再说，完美是慢慢长出来的。",
    "你给生活留了呼吸的空间。",
    "P人信条：deadline是第一生产力（真的）。",
    "灵活变通是你的超能力。",
    "先干了再说，错了再改——行动派本派。",
    "计划赶不上变化？你就是变化本人。"
  ]
};

const ROAST_LINES = [
  "系统鉴定：你是那种会让自己过得还行的人。",
  "这选项一出，你的人格画像又清晰了一点。",
  "记录在案：精神状态基本稳定，略带波动。",
  "本AI表示：这个选择很你。",
  "好的，存档了——继续下一题。",
  "你选这个，我不意外（真的不意外）。",
  "性格标签更新中……请稍候。",
  "这个问题你犹豫了？有意思。",
  "短评：活得挺真实，虽然偶尔也想逃。",
  "本系统建议你把这个选择发朋友圈。",
  "这一题，你暴露了1%的内心世界。",
  "哈，选这个的人通常都挺有意思。",
  "人格拼图又+1块。",
  "你对生活的态度：尽力但不勉强。",
  "如果人生有弹幕，你现在应该被刷屏了。",
  "好的，你的人格数据采集进度已更新。",
  "这题没有标准答案，但你的答案很精彩。",
  "系统提示：你已经成功完成了又一轮自我审视。",
  "你的选择很合理——至少在你自己看来。",
  "继续继续，后面还有更搞的。"
];


function buildChoiceReaction(q, value) {
  const pool = REACTION_LINES[value] || ROAST_LINES;
  const base = pool[(state.index + String(value || "").charCodeAt(0)) % pool.length];
  const extra = ROAST_LINES[(state.index * 3 + String(t(q && q.text)).length) % ROAST_LINES.length];
  const pureQuote = String(t(q && q.quote) || "")
    .replace(/^金句[:：]\s*/, "")
    .replace(/^Quote[:：]\s*/i, "");
  if (state.index % 2 === 0) {
    return { badge: "即时吐槽", line: base, quote: pureQuote || extra };
  }
  return { badge: "本手金句", line: pureQuote || extra, quote: base };
}

function showChoiceReaction(payload) {
  if (!els.choiceReaction) return;
  if (els.reactionBadge) els.reactionBadge.textContent = payload.badge || ui("reactionBadge");
  if (els.reactionLine) els.reactionLine.textContent = payload.line || "";
  if (els.reactionQuote) els.reactionQuote.textContent = payload.quote || "";
  els.choiceReaction.hidden = false;
  els.choiceReaction.classList.remove("show");
  void els.choiceReaction.offsetWidth;
  els.choiceReaction.classList.add("show");
}

function hideChoiceReaction() {
  if (!els.choiceReaction) return;
  els.choiceReaction.classList.remove("show");
  els.choiceReaction.hidden = true;
}

function extractHook(text) {
  const m = String(text || "").match(/「([^」]{1,16})」/);
  return m ? m[1] : String(text || "").slice(0, 10) || "这场面";
}

function expandOne(row, fallbackId) {
  if (!row) return null;
  if (!Array.isArray(row)) return row;
  const topic = row[2] || "life";
  const options = Array.isArray(row[9])
    ? row[9].map((o) => {
        const labelZh = cleanSpoken(o[1]);
        const hintZh = cleanSpoken(o[3] || o[0]).slice(0, 8);
        return {
          value: o[0],
          label: { zh: labelZh, en: o[2] || labelZh },
          hint: { zh: hintZh, en: o[4] || hintZh }
        };
      })
    : [];
  return {
    id: row[0] || fallbackId || 0,
    axis: row[1],
    topic: topic,
    tags: [topic, String(row[1] || "").toLowerCase(), "humor"],
    category: { zh: topic, en: topic },
    text: { zh: cleanSpoken(row[3]), en: row[4] || row[3] },
    quote: { zh: row[5], en: row[6] || row[5] },
    kicker: { zh: row[7], en: row[8] || row[7] },
    options: options
  };
}

function rawBank() {
  if (typeof window !== "undefined" && Array.isArray(window.QUESTION_BANK) && window.QUESTION_BANK.length) {
    return window.QUESTION_BANK;
  }
  if (typeof QUESTION_BANK !== "undefined" && Array.isArray(QUESTION_BANK) && QUESTION_BANK.length) {
    return QUESTION_BANK;
  }
  return Array.isArray(QUESTIONS) ? QUESTIONS : [];
}

function baseBank() {
  // Keep compact rows in memory; expand only when sampling a run.
  return rawBank();
}

function rowAxis(q) {
  return Array.isArray(q) ? q[1] : q && q.axis;
}

function rowTopic(q) {
  if (Array.isArray(q)) return q[2];
  if (!q) return "";
  if (q.topic) return q.topic;
  if (q.tags && q.tags.length) return q.tags[0];
  return "";
}

function rowId(q, idx) {
  if (Array.isArray(q)) return q[0] || idx;
  return (q && q.id) || idx;
}

function setBankStatus(ready, loading) {
  state.bankReady = !!ready;
  state.bankLoading = !!loading;
  if (els.startBtn) {
    els.startBtn.disabled = !state.bankReady;
    els.startBtn.textContent = state.bankReady ? ui("startBtn") : ui("startLoading");
  }
  if (els.bankMeta && !state.bankReady) {
    els.bankMeta.textContent = ui("bankLoading");
  }
}

async function fetchBankJson(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("bank http " + res.status + " @ " + url);
  const rows = await res.json();
  if (!Array.isArray(rows) || !rows.length) throw new Error("empty bank @ " + url);
  return rows;
}

async function loadFullBank() {
  const existing = rawBank();
  // Embedded public bank is enough to start immediately.
  if (existing.length >= 48) {
    setBankStatus(true, false);
    updateBankMeta();
    renderCategories();
  } else {
    setBankStatus(false, true);
  }

  // Optional remote expansion; never block the UI if network is bad.
  const candidates = ["./bank.json", "./bank.public.json", "./bank.mini.json", "./bank.full.json"];
  for (const url of candidates) {
    try {
      const rows = await fetchBankJson(url);
      if (!Array.isArray(rows) || rows.length <= existing.length) continue;
      if (typeof window !== "undefined") window.QUESTION_BANK = rows;
      setBankStatus(true, false);
      updateBankMeta();
      renderCategories();
      return rows;
    } catch (err) {
      // keep trying / fall back
    }
  }

  if (existing.length) {
    setBankStatus(true, false);
    updateBankMeta();
    return existing;
  }
  setBankStatus(true, false);
  updateBankMeta();
  return rawBank();
}

function normalizeKey(q) {
  if (!q) return "";
  if (Array.isArray(q)) {
    return String(q[1] || "") + "|" + String(q[3] || "").replace(/\s+/g, "").toLowerCase();
  }
  const text = q.text ? q.text.zh || q.text.en || q.text : "";
  return String(q.axis || "") + "|" + String(text).replace(/\s+/g, "").toLowerCase();
}

function mergedBank() {
  const base = baseBank();
  if (!contributedQuestions.length) return base;
  // Only scan base keys when user contributions exist.
  const map = new Map();
  base.forEach((q) => map.set(normalizeKey(q), q));
  contributedQuestions.forEach((q) => {
    const key = normalizeKey(q);
    if (!map.has(key)) map.set(key, q);
  });
  return Array.from(map.values());
}

function bankSize() {
  // Avoid building a giant merged array just for counting.
  return rawBank().length + contributedQuestions.length;
}

function topicCounts() {
  const counts = Object.create(null);
  rawBank().forEach((q) => {
    const topic = rowTopic(q) || "life";
    counts[topic] = (counts[topic] || 0) + 1;
  });
  contributedQuestions.forEach((q) => {
    const topic = rowTopic(q) || "life";
    counts[topic] = (counts[topic] || 0) + 1;
  });
  return counts;
}

function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

function topicLabel(topic) {
  if (!topic || topic === "all") return ui("categoryAll");
  const list = typeof CATEGORIES !== "undefined" && Array.isArray(CATEGORIES) ? CATEGORIES : [];
  const hit = list.find((c) => c.id === topic);
  if (!hit) return topic;
  return (hit.emoji ? hit.emoji + " " : "") + t(hit);
}

function modeLabel() {
  if (!state.topic || state.topic === "all") return ui("modeAll");
  return ui("modeCat", { name: topicLabel(state.topic) });
}

function sampleFromPool(pool, want, seen, picked) {
  if (!pool.length || want <= 0) return;
  // Random index sampling avoids full-array shuffle on 50k rows.
  const trials = Math.min(pool.length * 4, Math.max(want * 40, 200));
  let guard = 0;
  while (want > 0 && guard < trials) {
    guard += 1;
    const q = pool[(Math.random() * pool.length) | 0];
    const key = normalizeKey(q);
    if (seen.has(key)) continue;
    seen.add(key);
    picked.push(q);
    want -= 1;
  }
  if (want <= 0) return;
  // Fallback linear pass if random hits too many collisions.
  for (let i = 0; i < pool.length && want > 0; i += 1) {
    const q = pool[i];
    const key = normalizeKey(q);
    if (seen.has(key)) continue;
    seen.add(key);
    picked.push(q);
    want -= 1;
  }
}

function sampleQuestions(count) {
  const source = mergedBank();
  let working = source;
  if (state.topic && state.topic !== "all") {
    const filtered = source.filter((q) => rowTopic(q) === state.topic);
    if (filtered.length >= Math.min(count, 20)) working = filtered;
  }
  const perAxis = Math.max(1, Math.floor(count / 4));
  const picked = [];
  const seen = new Set();
  const byAxis = { EI: [], SN: [], TF: [], JP: [] };
  for (let i = 0; i < working.length; i += 1) {
    const axis = rowAxis(working[i]);
    if (byAxis[axis]) byAxis[axis].push(working[i]);
  }
  AXES.forEach((axis) => {
    sampleFromPool(byAxis[axis] || [], perAxis, seen, picked);
  });
  if (picked.length < count) sampleFromPool(working, count - picked.length, seen, picked);
  if (picked.length < count && working !== source) sampleFromPool(source, count - picked.length, seen, picked);
  shuffleInPlace(picked);
  return picked.slice(0, count).map((q, i) => {
    const full = expandOne(q, i + 1) || q;
    return Object.assign({}, full, { id: i + 1 });
  });
}

function activeQuestions() {
  return sessionQuestions.length ? sessionQuestions : QUESTIONS;
}

function updateBankMeta() {
  const bank = bankSize();
  const run = sessionQuestions.length || RUN_SIZE;
  const text = ui("bankMeta", { bank: bank, n: run, mode: modeLabel() });
  if (els.bankMeta) els.bankMeta.textContent = text;
  if (els.quizBankMeta) els.quizBankMeta.textContent = text;
  if (els.bankChip) {
    els.bankChip.textContent =
      bank >= 50000 ? "5万+" : bank >= 10000 ? "1万+" : bank >= 1000 ? bank + "+" : String(bank || "48");
  }
  if (els.categoryPicked) els.categoryPicked.textContent = ui("categoryPicked", { name: topicLabel(state.topic) });
}

function t(value) {
  if (value && typeof value === "object" && ("zh" in value || "en" in value)) {
    return value[state.language] || value.zh || value.en || "";
  }
  return value == null ? "" : String(value);
}

function ui(key, vars) {
  let text = (UI_TEXT[state.language] && UI_TEXT[state.language][key]) || key;
  if (vars) {
    Object.keys(vars).forEach((k) => {
      text = text.replace(new RegExp("\\{" + k + "\\}", "g"), String(vars[k]));
    });
  }
  return text;
}

function initElements() {
  els = {
    homeView: document.getElementById("homeView"),
    nicknameView: document.getElementById("nicknameView"),
    quizView: document.getElementById("quizView"),
    resultView: document.getElementById("resultView"),
    typesView: document.getElementById("typesView"),
    startBtn: document.getElementById("startBtn"),
    previewTypesBtn: document.getElementById("previewTypesBtn"),
    langBtn: document.getElementById("langBtn"),
    aboutBtn: document.getElementById("aboutBtn"),
    restartTopBtn: document.getElementById("restartTopBtn"),
    progressLabel: document.getElementById("progressLabel"),
    progressPercent: document.getElementById("progressPercent"),
    progressFill: document.getElementById("progressFill"),
    axisChips: document.getElementById("axisChips"),
    questionKicker: document.getElementById("questionKicker"),
    questionText: document.getElementById("questionText"),
    questionQuote: document.getElementById("questionQuote"),
    choiceReaction: document.getElementById("choiceReaction"),
    reactionBadge: document.getElementById("reactionBadge"),
    reactionLine: document.getElementById("reactionLine"),
    reactionQuote: document.getElementById("reactionQuote"),
    options: document.getElementById("options"),
    prevBtn: document.getElementById("prevBtn"),
    homeFromQuizBtn: document.getElementById("homeFromQuizBtn"),
    nicknameForm: document.getElementById("nicknameForm"),
    nicknameInput: document.getElementById("nicknameInput"),
    nickBackBtn: document.getElementById("nickBackBtn"),
    typeBadge: document.getElementById("typeBadge"),
    typeTitle: document.getElementById("typeTitle"),
    typeTagline: document.getElementById("typeTagline"),
    typeSummary: document.getElementById("typeSummary"),
    analysisTip: document.getElementById("analysisTip"),
    snarkTip: document.getElementById("snarkTip"),
    fantasyJob: document.getElementById("fantasyJob"),
    animalCompanion: document.getElementById("animalCompanion"),
    dimensionGrid: document.getElementById("dimensionGrid"),
    careersGrid: document.getElementById("careersGrid"),
    matchesGrid: document.getElementById("matchesGrid"),
    matchHint: document.getElementById("matchHint"),
    shareText: document.getElementById("shareText"),
    copyShareBtn: document.getElementById("copyShareBtn"),
    nativeShareBtn: document.getElementById("nativeShareBtn"),
    retryBtn: document.getElementById("retryBtn"),
    copyFeedback: document.getElementById("copyFeedback"),
    typesGrid: document.getElementById("typesGrid"),
    typesCount: document.getElementById("typesCount"),
    backHomeFromTypesBtn: document.getElementById("backHomeFromTypesBtn"),
    contributeForm: document.getElementById("contributeForm"),
    contributeAxis: document.getElementById("contributeAxis"),
    contributeTopic: document.getElementById("contributeTopic"),
    contributeText: document.getElementById("contributeText"),
    contributeQuote: document.getElementById("contributeQuote"),
    contributeOptA: document.getElementById("contributeOptA"),
    contributeOptB: document.getElementById("contributeOptB"),
    contributeOptC: document.getElementById("contributeOptC"),
    contributeOptD: document.getElementById("contributeOptD"),
    contributeSubmitBtn: document.getElementById("contributeSubmitBtn"),
    contributeFeedback: document.getElementById("contributeFeedback"),
    contributeTitle: document.getElementById("contributeTitle"),
    contributeLead: document.getElementById("contributeLead"),
    contributeHint: document.getElementById("contributeHint"),
    sharePanel: document.getElementById("sharePanel"),
    sharePanelTitle: document.getElementById("sharePanelTitle"),
    sharePanelLead: document.getElementById("sharePanelLead"),
    sharePanelHint: document.getElementById("sharePanelHint"),
    publicLinkText: document.getElementById("publicLinkText"),
    copyPublicLinkBtn: document.getElementById("copyPublicLinkBtn"),
    nativePublicShareBtn: document.getElementById("nativePublicShareBtn"),
    generatePosterBtn: document.getElementById("generatePosterBtn"),
    posterModal: document.getElementById("posterModal"),
    posterSquare: document.getElementById("posterSquare"),
    posterTall: document.getElementById("posterTall"),
    downloadSquareBtn: document.getElementById("downloadSquareBtn"),
    downloadTallBtn: document.getElementById("downloadTallBtn"),
    aboutModal: document.getElementById("aboutModal"),
    soundBtn: document.getElementById("soundBtn"),
    brandTitle: document.getElementById("brandTitle"),
    brandSub: document.getElementById("brandSub"),
    homeTitle: document.getElementById("homeTitle"),
    homeLead: document.getElementById("homeLead"),
    homeDisclaimer: document.getElementById("homeDisclaimer"),
    nickTitle: document.getElementById("nickTitle"),
    nickLead: document.getElementById("nickLead"),
    nickSubmitBtn: document.getElementById("nickSubmitBtn"),
    feature1Title: document.getElementById("feature1Title"),
    feature1Text: document.getElementById("feature1Text"),
    feature2Title: document.getElementById("feature2Title"),
    feature2Text: document.getElementById("feature2Text"),
    feature3Title: document.getElementById("feature3Title"),
    feature3Text: document.getElementById("feature3Text"),
    analysisTitle: document.getElementById("analysisTitle"),
    snarkTitle: document.getElementById("snarkTitle"),
    careersTitle: document.getElementById("careersTitle"),
    matchesTitle: document.getElementById("matchesTitle"),
    fantasyTitle: document.getElementById("fantasyTitle"),
    animalTitle: document.getElementById("animalTitle"),
    traitsTitle: document.getElementById("traitsTitle"),
    strengthsTitle: document.getElementById("strengthsTitle"),
    watchoutsTitle: document.getElementById("watchoutsTitle"),
    growthTitle: document.getElementById("growthTitle"),
    traitsList: document.getElementById("traitsList"),
    strengthsList: document.getElementById("strengthsList"),
    watchoutsList: document.getElementById("watchoutsList"),
    growthTip: document.getElementById("growthTip"),
    sloganLine: document.getElementById("sloganLine"),
    referenceNote: document.getElementById("referenceNote"),
    typesTitle: document.getElementById("typesTitle"),
    typesLead: document.getElementById("typesLead"),
    aboutTitle: document.getElementById("aboutTitle"),
    aboutBody: document.getElementById("aboutBody"),
    researcherLabel: document.getElementById("researcherLabel"),
    researcherLine: document.getElementById("researcherLine"),
    quizCard: document.getElementById("quizCard"),
    quoteLabel: document.getElementById("quoteLabel"),
    
    bankMeta: document.getElementById("bankMeta"),
    categoryGrid: document.getElementById("categoryGrid"),
    categoryTitle: document.getElementById("categoryTitle"),
    categoryLead: document.getElementById("categoryLead"),
    categoryPicked: document.getElementById("categoryPicked"),
    quizBankMeta: document.getElementById("quizBankMeta"),
    bankChip: document.getElementById("bankChip")
  };
}

function localizedList(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === "object") {
    const arr = value[state.language] || value.zh || value.en || [];
    return Array.isArray(arr) ? arr : [];
  }
  return [];
}

function showView(view) {
  [els.homeView, els.nicknameView, els.quizView, els.resultView, els.typesView].forEach((node) => {
    if (node) node.classList.remove("active");
  });
  if (view) view.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function refreshLabels() {
  const L = state.language;
  document.documentElement.lang = L === "zh" ? "zh-CN" : "en";

  if (els.brandTitle) els.brandTitle.textContent = ui("brandTitle");
  if (els.brandSub) els.brandSub.textContent = ui("brandSub");
  if (els.homeTitle) els.homeTitle.textContent = ui("homeTitle");
  if (els.homeLead) els.homeLead.textContent = ui("homeLead");
  if (els.categoryTitle) els.categoryTitle.textContent = ui("categoryTitle");
  if (els.categoryLead) els.categoryLead.textContent = ui("categoryLead");
  updateBankMeta();
  fillContributeTopics();
  if (els.startBtn) {
    els.startBtn.disabled = !state.bankReady;
    els.startBtn.textContent = state.bankReady ? ui("startBtn") : ui("startLoading");
  }
  if (els.previewTypesBtn) els.previewTypesBtn.textContent = ui("previewTypes");
  if (els.homeDisclaimer) els.homeDisclaimer.textContent = ui("homeDisclaimer");
  if (els.nickTitle) els.nickTitle.textContent = ui("nickTitle");
  if (els.nickLead) els.nickLead.textContent = ui("nickLead");
  if (els.nicknameInput) els.nicknameInput.placeholder = ui("nickPlaceholder");
  if (els.nickSubmitBtn) els.nickSubmitBtn.textContent = ui("nickSubmit");
  if (els.nickBackBtn) els.nickBackBtn.textContent = ui("nickBack");
  if (els.feature1Title) els.feature1Title.textContent = ui("feature1Title");
  if (els.feature1Text) els.feature1Text.textContent = ui("feature1Text");
  if (els.feature2Title) els.feature2Title.textContent = ui("feature2Title");
  if (els.feature2Text) els.feature2Text.textContent = ui("feature2Text");
  if (els.feature3Title) els.feature3Title.textContent = ui("feature3Title");
  if (els.feature3Text) els.feature3Text.textContent = ui("feature3Text");
  if (els.analysisTitle) els.analysisTitle.textContent = ui("analysisTip");
  if (els.snarkTitle) els.snarkTitle.textContent = ui("snarkTip");
  if (els.careersTitle) els.careersTitle.textContent = ui("careersTitle");
  if (els.matchesTitle) els.matchesTitle.textContent = ui("matchesTitle");
  if (els.fantasyTitle) els.fantasyTitle.textContent = ui("fantasyTitle");
  if (els.animalTitle) els.animalTitle.textContent = ui("animalTitle");
  if (els.traitsTitle) els.traitsTitle.textContent = ui("traitsTitle");
  if (els.strengthsTitle) els.strengthsTitle.textContent = ui("strengthsTitle");
  if (els.watchoutsTitle) els.watchoutsTitle.textContent = ui("watchoutsTitle");
  if (els.growthTitle) els.growthTitle.textContent = ui("growthTitle");
  if (els.referenceNote) els.referenceNote.textContent = ui("referenceNote");
  if (els.matchHint) els.matchHint.textContent = ui("matchHint");
  if (els.backHomeFromTypesBtn) els.backHomeFromTypesBtn.textContent = ui("backHomeFromTypes");
  if (els.typesTitle) els.typesTitle.textContent = ui("typesTitle");
  if (els.typesLead) els.typesLead.textContent = ui("typesLead");
  if (els.typesCount) {
    const n = typeof CODEX !== "undefined" && Array.isArray(CODEX) ? CODEX.length : Object.keys(TYPES).length;
    els.typesCount.textContent = ui("codexCount", { n: n });
  }
  if (els.contributeTitle) els.contributeTitle.textContent = ui("contributeTitle");
  if (els.contributeLead) els.contributeLead.textContent = ui("contributeLead");
  if (els.contributeHint) els.contributeHint.textContent = ui("contributeHint");
  if (els.contributeSubmitBtn) els.contributeSubmitBtn.textContent = ui("contributeSubmit");
  if (els.inAppTitle) els.inAppTitle.textContent = ui("inAppTitle");
  if (els.inAppLead) els.inAppLead.textContent = ui("inAppLead");
  document.querySelectorAll("[data-i18n-axis]").forEach((node) => {
    node.textContent = ui("contributeAxis");
  });
  document.querySelectorAll("[data-i18n-text]").forEach((node) => {
    node.textContent = ui("contributeText");
  });
  document.querySelectorAll("[data-i18n-quote]").forEach((node) => {
    node.textContent = ui("contributeQuote");
  });
  document.querySelectorAll("[data-i18n-a]").forEach((node) => {
    node.textContent = ui("contributeOptA");
  });
  document.querySelectorAll("[data-i18n-b]").forEach((node) => {
    node.textContent = ui("contributeOptB");
  });
  document.querySelectorAll("[data-i18n-c]").forEach((node) => {
    node.textContent = ui("contributeOptC");
  });
  document.querySelectorAll("[data-i18n-d]").forEach((node) => {
    node.textContent = ui("contributeOptD");
  });
  if (els.aboutTitle) els.aboutTitle.textContent = ui("aboutTitle");
  if (els.aboutBody) els.aboutBody.textContent = ui("aboutBody");
  if (els.researcherLabel) els.researcherLabel.textContent = ui("researcher");
  if (els.researcherLine) els.researcherLine.textContent = ui("researcherLine");
  if (els.aboutBtn) els.aboutBtn.textContent = ui("about");
  if (els.restartTopBtn) els.restartTopBtn.textContent = ui("restart");
  if (els.prevBtn) els.prevBtn.textContent = ui("prev");
  if (els.homeFromQuizBtn) els.homeFromQuizBtn.textContent = ui("homeFromQuiz");
  if (els.copyShareBtn) els.copyShareBtn.textContent = ui("copyShare");
  if (els.nativeShareBtn) els.nativeShareBtn.textContent = ui("nativeShare");
  if (els.retryBtn) els.retryBtn.textContent = ui("retry");
  if (els.generatePosterBtn) els.generatePosterBtn.textContent = ui("generatePoster");
  if (els.downloadSquareBtn) els.downloadSquareBtn.textContent = ui("downloadSquare");
  if (els.downloadTallBtn) els.downloadTallBtn.textContent = ui("downloadTall");
  if (els.copyFeedback) els.copyFeedback.textContent = ui("copied");
  if (els.soundBtn) els.soundBtn.textContent = state.sound ? ui("soundOn") : ui("soundOff");
  if (els.langBtn) els.langBtn.textContent = L === "zh" ? "English" : "中文";

  document.querySelectorAll("[data-close-label]").forEach((node) => {
    node.textContent = ui("close");
  });

  if (els.quoteLabel) els.quoteLabel.textContent = ui("quoteLabel");
  if (els.sharePanelTitle) els.sharePanelTitle.textContent = ui("sharePanelTitle");
  if (els.sharePanelLead) els.sharePanelLead.textContent = ui("sharePanelLead");
  if (els.copyPublicLinkBtn) els.copyPublicLinkBtn.textContent = ui("copyPublicLink");
  if (els.nativePublicShareBtn) els.nativePublicShareBtn.textContent = ui("nativePublicShare");
  updatePublicShare();
  renderCategories();
  updateBankMeta();

  if (els.quizView && els.quizView.classList.contains("active") && activeQuestions()[state.index]) {
    renderQuestion();
  }
  if (state.result) {
    renderResult(state.result, false);
  }
  renderTypes();
}

function ensureAudio() {
  if (!audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx) audioCtx = new Ctx();
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playSound(kind) {
  if (!state.sound) return;
  const ctx = ensureAudio();
  if (!ctx) return;

  try {
    if (kind === "complete") {
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.value = freq;
        gain.gain.value = 0.0001;
        osc.connect(gain);
        gain.connect(ctx.destination);
        const start = ctx.currentTime + i * 0.08;
        gain.gain.exponentialRampToValueAtTime(0.05, start + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.18);
        osc.start(start);
        osc.stop(start + 0.2);
      });
      return;
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = kind === "flip" ? "square" : "sine";
    osc.frequency.value = kind === "flip" ? 520 : 760;
    gain.gain.value = 0.0001;
    const now = ctx.currentTime;
    gain.gain.exponentialRampToValueAtTime(0.05, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + (kind === "flip" ? 0.12 : 0.07));
    osc.start(now);
    osc.stop(now + 0.14);
  } catch (err) {
    // ignore audio failures
  }
}

function renderCategories() {
  if (!els.categoryGrid) return;
  const cats = typeof CATEGORIES !== "undefined" && Array.isArray(CATEGORIES) ? CATEGORIES : [];
  const items = [{ id: "all", zh: ui("categoryAll"), en: ui("categoryAll"), emoji: "🎲" }].concat(cats);
  const counts = topicCounts();
  const total = bankSize();
  els.categoryGrid.innerHTML = items
    .map((cat) => {
      const active = (state.topic || "all") === cat.id;
      const name = cat.id === "all" ? ui("categoryAll") : t(cat);
      const count = cat.id === "all" ? total : counts[cat.id] || 0;
      return (
        '<button type="button" class="category-chip' +
        (active ? " active" : "") +
        '" data-topic="' +
        cat.id +
        '"><span class="cat-emoji">' +
        (cat.emoji || "✨") +
        '</span><span class="cat-name">' +
        name +
        '</span><small class="cat-count">' +
        count +
        "</small></button>"
      );
    })
    .join("");
}

function setTopic(topic) {
  state.topic = topic || "all";
  renderCategories();
  updateBankMeta();
  playSound("select");
}

function goNickname() {
  if (!state.bankReady) {
    if (els.bankMeta) els.bankMeta.textContent = ui("bankLoading");
    loadFullBank().then(() => {
      if (state.bankReady) goNickname();
    });
    return;
  }
  playSound("flip");
  showView(els.nicknameView);
  if (els.nicknameInput) {
    window.setTimeout(() => els.nicknameInput.focus(), 50);
  }
}

function startQuiz() {
  sessionQuestions = sampleQuestions(RUN_SIZE);
  state.answers = new Array(sessionQuestions.length).fill(null);
  state.index = 0;
  state.result = null;
  state.choiceLocked = false;
  localStorage.removeItem(STORAGE_KEY);
  if (els.restartTopBtn) els.restartTopBtn.hidden = false;
  updateBankMeta();
  renderQuestion();
  showView(els.quizView);
  playSound("flip");
}

function tallyAxes(answers) {
  const base = {
    EI: { E: 0, I: 0, total: 0 },
    SN: { S: 0, N: 0, total: 0 },
    TF: { T: 0, F: 0, total: 0 },
    JP: { J: 0, P: 0, total: 0 }
  };
  answers.forEach((value, i) => {
    if (!value) return;
    const axis = activeQuestions()[i].axis;
    base[axis][value] += 1;
    base[axis].total += 1;
  });
  return base;
}

function calcResult(answers) {
  const counts = tallyAxes(answers);
  const pick = (axis, a, b) => (counts[axis][a] >= counts[axis][b] ? a : b);
  const code = pick("EI", "E", "I") + pick("SN", "S", "N") + pick("TF", "T", "F") + pick("JP", "J", "P");
  const percentOf = (axis, letter) => {
    const total = Math.max(counts[axis].total, 1);
    return Math.round((counts[axis][letter] / total) * 100);
  };
  const dims = [
    {
      axis: "EI",
      left: "E",
      right: "I",
      leftP: percentOf("EI", "E"),
      rightP: percentOf("EI", "I"),
      chosen: code[0],
      leftLabel: { zh: "E 外向", en: "E Extravert" },
      rightLabel: { zh: "I 内向", en: "I Introvert" }
    },
    {
      axis: "SN",
      left: "S",
      right: "N",
      leftP: percentOf("SN", "S"),
      rightP: percentOf("SN", "N"),
      chosen: code[1],
      leftLabel: { zh: "S 实感", en: "S Sensing" },
      rightLabel: { zh: "N 直觉", en: "N Intuition" }
    },
    {
      axis: "TF",
      left: "T",
      right: "F",
      leftP: percentOf("TF", "T"),
      rightP: percentOf("TF", "F"),
      chosen: code[2],
      leftLabel: { zh: "T 思考", en: "T Thinking" },
      rightLabel: { zh: "F 情感", en: "F Feeling" }
    },
    {
      axis: "JP",
      left: "J",
      right: "P",
      leftP: percentOf("JP", "J"),
      rightP: percentOf("JP", "P"),
      chosen: code[3],
      leftLabel: { zh: "J 判断", en: "J Judging" },
      rightLabel: { zh: "P 知觉", en: "P Perceiving" }
    }
  ];
  return { code, dims, name: state.name || (state.language === "zh" ? "匿名选手" : "Anonymous Player") };
}

function renderQuestion(animated) {
  var qc = els.quizCard;
  if (animated && qc) {
    qc.classList.add("q-exit");
    var tmr = setTimeout(function() {
      qc.classList.remove("q-exit");
      qc.classList.add("q-enter");
      _rq();
      setTimeout(function() { qc.classList.remove("q-enter"); }, 350);
    }, 280);
  } else {
    _rq();
  }
  function _rq() {

  hideChoiceReaction();
  const list = activeQuestions();
  const q = list[state.index];
  if (!q) return;
  const total = list.length;
  const cur = state.index + 1;
  const pct = Math.round((cur / total) * 100);

  if (els.progressLabel) els.progressLabel.textContent = ui("progress", { cur, total });
  if (els.progressPercent) els.progressPercent.textContent = pct + "%";
  if (els.progressFill) els.progressFill.style.width = pct + "%";
  if (els.questionKicker) els.questionKicker.textContent = t(q.kicker);
  if (els.questionText) els.questionText.textContent = t(q.text);
  if (els.quoteLabel) els.quoteLabel.textContent = ui("quoteLabel");
  if (els.questionQuote) {
    const rawQuote = t(q.quote) || "";
    els.questionQuote.textContent = rawQuote
      .replace(/^金句[:：]\s*/, "")
      .replace(/^Quote[:：]\s*/i, "");
  }
  if (els.prevBtn) els.prevBtn.disabled = state.index === 0;

  const counts = tallyAxes(state.answers);
  if (els.axisChips) {
    els.axisChips.innerHTML = AXES
      .map((axis) => {
        const pair = counts[axis];
        const maxAxis = list.filter((item) => item.axis === axis).length;
        return '<span class="axis-chip"><strong>' + axis + "</strong>" + pair.total + "/" + maxAxis + "</span>";
      })
      .join("");
  }

  if (els.options) {
    els.options.innerHTML = q.options
      .map((option, i) => {
        const selected = state.answers[state.index] === option.value;
        return (
          '<button type="button" class="option-btn' +
          (selected ? " selected" : "") +
          '" data-value="' +
          option.value +
          '"><span>' +
          String.fromCharCode(65 + i) +
          ". " +
          t(option.label) +
          "</span><small>" +
          t(option.hint) +
          "</small></button>"
        );
      })
      .join("");
  }

  if (els.quizCard) {
    els.quizCard.classList.remove("flip-anim");
    void els.quizCard.offsetWidth;
    els.quizCard.classList.add("flip-anim");
  }
}

function onChoice(value) {
  if (state.choiceLocked) return;
  state.choiceLocked = true;
  state.answers[state.index] = value;
  playSound("select");
  const q = activeQuestions()[state.index];
  if (els.options) {
    Array.from(els.options.querySelectorAll(".option-btn")).forEach((btn) => {
      btn.classList.toggle("selected", btn.getAttribute("data-value") === value);
    });
  }
  const reaction = buildChoiceReaction(q, value);
  showChoiceReaction(reaction);
  if (els.questionQuote && reaction.quote) els.questionQuote.textContent = reaction.quote;
  if (els.quoteLabel) els.quoteLabel.textContent = reaction.badge || ui("quoteLabel");
  window.setTimeout(() => {
    if (state.index < activeQuestions().length - 1) {
      state.index += 1;
      renderQuestion(true);
      playSound("flip");
    } else {
      const result = calcResult(state.answers);
      renderResult(result, true);
    }
    state.choiceLocked = false;
  }, 2000);
}

  }
function renderResult(res, playComplete) {
  const info = TYPES[res.code];
  if (!info) return;
  state.result = res;
  if (els.restartTopBtn) els.restartTopBtn.hidden = false;

  const displayName = res.name || state.name || (state.language === "zh" ? "匿名选手" : "Anonymous Player");
  state.name = displayName;

  if (els.typeBadge) els.typeBadge.textContent = res.code;
  if (els.typeTitle) els.typeTitle.textContent = res.code + " · " + t(info.name);
  if (els.typeTagline) {
    els.typeTagline.innerHTML =
      info.english +
      ' <small style="font-size:0.75em;color:var(--muted);">' +
      info.emoji +
      " · " +
      t(info.fantasy) +
      "</small>";
  }
  if (els.analysisTip) els.analysisTip.textContent = t(info.analysis);
  if (els.snarkTip) els.snarkTip.textContent = t(info.snark);
  if (els.fantasyJob) els.fantasyJob.textContent = t(info.fantasy);
  if (els.animalCompanion) els.animalCompanion.textContent = info.emoji + " " + t(info.animal);
  if (els.typeSummary) {
    const philosophy = t(info.philosophy);
    const base =
      t(info.energy) + " | " + t(info.sensing) + " | " + t(info.thinking) + " | " + t(info.planning);
    els.typeSummary.textContent = philosophy ? base + " · " + philosophy : base;
  }

  const listHtml = (items) =>
    localizedList(items)
      .map((item) => '<span class="mini-chip">' + t(item) + "</span>")
      .join("");
  if (els.traitsList) els.traitsList.innerHTML = listHtml(info.traits);
  if (els.strengthsList) els.strengthsList.innerHTML = listHtml(info.strengths);
  if (els.watchoutsList) els.watchoutsList.innerHTML = listHtml(info.watchouts);
  if (els.growthTip) els.growthTip.textContent = t(info.growth);
  if (els.sloganLine) els.sloganLine.textContent = t(info.slogan);
  if (els.referenceNote) els.referenceNote.textContent = ui("referenceNote");

  if (els.dimensionGrid) {
    els.dimensionGrid.innerHTML = res.dims
      .map((d) => {
        const mainP = d.chosen === d.left ? d.leftP : d.rightP;
        const mainL = d.chosen === d.left ? t(d.leftLabel) : t(d.rightLabel);
        return (
          '<div class="dimension-item"><div class="dimension-top"><strong>' +
          mainL +
          " " +
          mainP +
          '%</strong></div><div class="bar"><span style="width:' +
          mainP +
          '%"></span></div><div class="dimension-top"><span>' +
          t(d.leftLabel) +
          " " +
          d.leftP +
          "%</span><span>" +
          t(d.rightLabel) +
          " " +
          d.rightP +
          "%</span></div></div>"
        );
      })
      .join("");
  }

  const careers = CAREERS[res.code] || [];
  if (els.careersGrid) {
    els.careersGrid.innerHTML = careers
      .map((c) => '<article class="type-tile"><div class="code">' + info.emoji + "</div><strong>" + t(c) + "</strong></article>")
      .join("");
  }

  const match = MATCHES[res.code] || { best: [], conflict: [] };
  if (els.matchesGrid) {
    const bestHtml = match.best.slice(0, 3).map((code) => {
      const item = TYPES[code];
      return (
        '<article class="type-tile"><div class="code">' +
        code +
        "</div><strong>" +
        t(item.name) +
        "</strong><p>✅ " +
        (state.language === "zh" ? "最合拍" : "Best fit") +
        " · " +
        t(item.animal) +
        "</p></article>"
      );
    });
    const conflictHtml = match.conflict.slice(0, 2).map((code) => {
      const item = TYPES[code];
      return (
        '<article class="type-tile"><div class="code">' +
        code +
        "</div><strong>" +
        t(item.name) +
        "</strong><p>⚠️ " +
        (state.language === "zh" ? "高摩擦" : "High friction") +
        " · " +
        t(item.animal) +
        "</p></article>"
      );
    });
    els.matchesGrid.innerHTML = bestHtml.concat(conflictHtml).join("");
  }

  if (els.shareText) {
    els.shareText.value =
      (state.language === "zh" ? "我的速测台结果：" : "My Mood Stage result: ") +
      res.code +
      " " +
      t(info.name) +
      " (" +
      info.english +
      ")\n" +
      (state.language === "zh" ? "昵称：" : "Name: ") +
      displayName +
      "\n" +
      (state.language === "zh" ? "幻想职业：" : "Fantasy job: ") +
      t(info.fantasy) +
      "\n" +
      (state.language === "zh" ? "动物伙伴：" : "Companion: ") +
      t(info.animal) +
      " " +
      info.emoji +
      "\n" +
      t(info.snark);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(res));
  showView(els.resultView);
  if (playComplete) playSound("complete");
}

function lineBlock(labelKey, value) {
  const text = t(value);
  if (!text) return "";
  return '<p class="codex-line"><b>' + ui(labelKey) + "</b> " + text + "</p>";
}

function codexEntries() {
  if (typeof CODEX !== "undefined" && Array.isArray(CODEX) && CODEX.length) return CODEX;
  return Object.keys(TYPES).map((code) => Object.assign({ id: code, code: code, kind: "core" }, TYPES[code]));
}

function renderTypes() {
  if (!els.typesGrid) return;
  const entries = codexEntries();
  if (els.typesCount) els.typesCount.textContent = ui("codexCount", { n: entries.length });
  els.typesGrid.innerHTML = entries
    .map((info) => {
      const code = info.code || info.id || "";
      const traits = localizedList(info.traits).map((item) => t(item)).join(" · ");
      const strengths = localizedList(info.strengths).map((item) => t(item)).join(" / ");
      const watchouts = localizedList(info.watchouts).map((item) => t(item)).join(" / ");
      const kind = info.kind === "extended" ? '<span class="mini sky">EXT</span>' : '<span class="mini lime">CORE</span>';
      return (
        '<article class="type-tile rich">' +
        '<div class="codex-head">' +
        '<div class="code">' +
        code +
        '</div><div class="codex-title"><strong>' +
        (info.emoji || "✨") +
        " " +
        t(info.name) +
        "</strong>" +
        kind +
        '<p class="type-en">' +
        (info.english || "") +
        (info.animal ? " · " + t(info.animal) : "") +
        (info.fantasy ? " · " + t(info.fantasy) : "") +
        "</p></div></div>" +
        lineBlock("codexVibe", info.vibe) +
        lineBlock("codexPhilosophy", info.philosophy) +
        (traits
          ? '<p class="codex-line"><b>' + ui("traitsTitle") + "</b> " + traits + "</p>"
          : "") +
        (strengths
          ? '<p class="codex-line"><b>' + ui("strengthsTitle") + "</b> " + strengths + "</p>"
          : "") +
        (watchouts
          ? '<p class="codex-line"><b>' + ui("watchoutsTitle") + "</b> " + watchouts + "</p>"
          : "") +
        lineBlock("codexLove", info.loveStyle) +
        lineBlock("codexWork", info.workStyle) +
        lineBlock("codexBuff", info.socialBuff) +
        lineBlock("codexDebuff", info.socialDebuff) +
        lineBlock("codexBest", info.bestScene) +
        lineBlock("codexWorst", info.worstScene) +
        lineBlock("growthTitle", info.growth) +
        '<p class="slogan">' +
        ui("codexMeme") +
        "：" +
        t(info.meme || info.slogan) +
        "</p>" +
        (info.snark ? '<p class="codex-snark">' + t(info.snark) + "</p>" : "") +
        "</article>"
      );
    })
    .join("");
}

function isInAppBrowser() {
  const ua = navigator.userAgent || "";
  return /MicroMessenger|QQ\//i.test(ua) || /\bQQ\b/i.test(ua);
}

function publicShareUrl() {
  const configured = String(window.PUBLIC_SHARE_URL || "").trim();
  if (configured) return configured.replace(/\/?$/, "/");
  const href = window.location.href.split("#")[0].split("?")[0];
  const host = window.location.hostname || "";
  if (host && host !== "localhost" && host !== "127.0.0.1") {
    return href.endsWith("/") || href.endsWith(".html") ? href.replace(/index\.html$/, "") : href.replace(/\/?$/, "/");
  }
  // Local preview fallback: still show a stable public-style placeholder until deployed URL is known.
  return href;
}

function updatePublicShare() {
  if (!els.publicLinkText && !els.sharePanelHint) return;
  const url = publicShareUrl();
  if (els.publicLinkText) els.publicLinkText.textContent = url;
  if (els.sharePanelHint) {
    const host = window.location.hostname || "";
    const local = !host || host === "localhost" || host === "127.0.0.1";
    const configured = !!(window.PUBLIC_SHARE_URL && String(window.PUBLIC_SHARE_URL).trim());
    if (local && !configured) {
      els.sharePanelHint.textContent = ui("shareLocalHint");
    } else if (isInAppBrowser()) {
      els.sharePanelHint.textContent = ui("shareInAppHint");
    } else {
      els.sharePanelHint.textContent = ui("shareReadyHint");
    }
  }
}

async function copyPublicLink() {
  const link = (els.publicLinkText && els.publicLinkText.textContent) || publicShareUrl();
  try {
    await navigator.clipboard.writeText(link);
  } catch (err) {
    // ignore clipboard failures
  }
  if (els.sharePanelHint) {
    els.sharePanelHint.textContent = ui("copied") + " · " + link;
  }
  playSound("select");
}

async function nativePublicShare() {
  const link = publicShareUrl();
  const title = ui("brandTitle") || "精神状态速测台";
  const text = ui("shareInviteText") || "来测一测你的精神状态";
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url: link });
      playSound("select");
      return;
    } catch (err) {
      // fall through to copy
    }
  }
  await copyPublicLink();
}

function loadLocalContributions() {
  try {
    const raw = localStorage.getItem(CONTRIB_LOCAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

function saveLocalContributions(list) {
  try {
    localStorage.setItem(CONTRIB_LOCAL_KEY, JSON.stringify(list || []));
  } catch (err) {
    // ignore quota
  }
}

function queueContribution(payload) {
  try {
    const raw = localStorage.getItem(CONTRIB_QUEUE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    const arr = Array.isArray(list) ? list : [];
    arr.push(payload);
    localStorage.setItem(CONTRIB_QUEUE_KEY, JSON.stringify(arr.slice(-30)));
  } catch (err) {
    // ignore
  }
}

function mergeContributionList(list) {
  const map = new Map();
  contributedQuestions.concat(list || []).forEach((q) => {
    if (!q) return;
    map.set(normalizeKey(q), q);
  });
  contributedQuestions = Array.from(map.values());
  saveLocalContributions(contributedQuestions);
  updateBankMeta();
}

async function loadUserBank() {
  mergeContributionList(loadLocalContributions());
  try {
    const res = await fetch("./user-bank.json", { cache: "no-store" });
    if (!res.ok) return;
    const data = await res.json();
    if (data && Array.isArray(data.questions)) mergeContributionList(data.questions);
  } catch (err) {
    // offline / file mode
  }
}

function axisPoles(axis) {
  if (axis === "EI") return ["E", "I"];
  if (axis === "SN") return ["S", "N"];
  if (axis === "TF") return ["T", "F"];
  return ["J", "P"];
}

function fillContributeTopics() {
  if (!els.contributeTopic) return;
  const cats = typeof CATEGORIES !== "undefined" && Array.isArray(CATEGORIES) ? CATEGORIES : [];
  const current = els.contributeTopic.value || "funny";
  els.contributeTopic.innerHTML = cats
    .map((c) => '<option value="' + c.id + '">' + (c.emoji ? c.emoji + " " : "") + t(c) + "</option>")
    .join("");
  if (cats.some((c) => c.id === current)) els.contributeTopic.value = current;
  else if (cats.length) els.contributeTopic.value = cats[0].id;
}

function buildContributePayload() {
  const axis = ((els.contributeAxis && els.contributeAxis.value) || "EI").toUpperCase();
  const poles = axisPoles(axis);
  const topic = ((els.contributeTopic && els.contributeTopic.value) || "funny").trim() || "funny";
  const cat = (typeof CATEGORIES !== "undefined" && Array.isArray(CATEGORIES) ? CATEGORIES : []).find((c) => c.id === topic);
  const labels = [
    els.contributeOptA && els.contributeOptA.value,
    els.contributeOptB && els.contributeOptB.value,
    els.contributeOptC && els.contributeOptC.value,
    els.contributeOptD && els.contributeOptD.value
  ].map((v) => String(v || "").trim());
  if (labels.some((x) => !x)) return null;
  const text = String((els.contributeText && els.contributeText.value) || "").trim();
  if (text.length < 6) return null;
  const quote = String((els.contributeQuote && els.contributeQuote.value) || "").trim();
  return {
    axis: axis,
    topic: topic,
    tags: [topic, "user", "funny"],
    category: cat ? { zh: cat.zh, en: cat.en } : { zh: "用户投稿", en: "User Submit" },
    text: { zh: text, en: text },
    quote: quote
      ? { zh: quote, en: quote }
      : { zh: "完成比完美更像成年人。", en: "Done looks more adult than perfect." },
    options: labels.map((label, idx) => ({
      value: poles[idx % 2],
      label: { zh: label, en: label },
      hint: { zh: poles[idx % 2], en: poles[idx % 2] }
    }))
  };
}

async function submitContribution(event) {
  if (event) event.preventDefault();
  if (!els.contributeFeedback) return;
  const payload = buildContributePayload();
  if (!payload) {
    els.contributeFeedback.hidden = false;
    els.contributeFeedback.textContent = ui("contributeHint");
    return;
  }
  els.contributeFeedback.hidden = false;
  els.contributeFeedback.textContent = "...";
  try {
    const res = await fetch("/api/contribute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data && data.ok && data.status === "duplicate") {
      els.contributeFeedback.textContent = ui("contributeDup");
      return;
    }
    if (data && data.ok) {
      if (data.question) mergeContributionList([data.question]);
      else {
        mergeContributionList([
          Object.assign({}, payload, {
            id: "local-" + Date.now(),
            source: "user"
          })
        ]);
      }
      els.contributeFeedback.textContent = ui("contributeOk") + " · " + bankSize();
      if (els.contributeForm) els.contributeForm.reset();
      playSound("complete");
      return;
    }
    throw new Error((data && data.error) || "fail");
  } catch (err) {
    const localQ = Object.assign({}, payload, {
      id: "local-" + Date.now(),
      source: "user-local",
      createdAt: new Date().toISOString()
    });
    mergeContributionList([localQ]);
    queueContribution(payload);
    els.contributeFeedback.textContent = ui("contributeFail") + " · " + bankSize();
  }
}
function aboutToggle(open) {
  if (els.aboutModal) els.aboutModal.hidden = !open;
}

function posterToggle(open) {
  if (els.posterModal) els.posterModal.hidden = !open;
}

function drawPosterCanvas(ratio) {
  const res = state.result;
  if (!res) return null;
  const info = TYPES[res.code];
  const isSquare = ratio === "square";
  const width = isSquare ? 1080 : 1080;
  const height = isSquare ? 1080 : 1920;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#ff6b57");
  gradient.addColorStop(0.45, "#b8f25a");
  gradient.addColorStop(1, "#62d0ff");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.beginPath();
  ctx.arc(width * 0.18, height * 0.18, 180, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(width * 0.85, height * 0.28, 220, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#101828";
  ctx.textAlign = "center";
  ctx.font = "bold 42px Noto Sans SC, sans-serif";
  ctx.fillText(ui("brandTitle"), width / 2, isSquare ? 120 : 180);

  ctx.font = "120px serif";
  ctx.fillText(info.emoji, width / 2, isSquare ? 320 : 430);

  ctx.font = "bold 96px Noto Sans SC, sans-serif";
  ctx.fillText(res.code, width / 2, isSquare ? 460 : 600);

  ctx.font = "bold 54px Noto Sans SC, sans-serif";
  ctx.fillText(t(info.name), width / 2, isSquare ? 540 : 700);

  ctx.font = "36px Noto Sans SC, sans-serif";
  ctx.fillStyle = "rgba(16,24,40,0.75)";
  ctx.fillText(info.english + " · " + t(info.fantasy), width / 2, isSquare ? 610 : 780);

  ctx.fillStyle = "#101828";
  ctx.font = "34px Noto Sans SC, sans-serif";
  const name = res.name || state.name || (state.language === "zh" ? "匿名选手" : "Anonymous Player");
  ctx.fillText(name + " · " + t(info.animal), width / 2, isSquare ? 700 : 900);

  const snark = t(info.snark);
  ctx.font = "30px Noto Sans SC, sans-serif";
  wrapText(ctx, snark, width / 2, isSquare ? 800 : 1080, width - 160, 44);

  ctx.font = "26px Noto Sans SC, sans-serif";
  ctx.fillStyle = "rgba(16,24,40,0.7)";
  ctx.fillText(ui("brandTitle"), width / 2, height - 80);

  return canvas;
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const chars = String(text).split("");
  let line = "";
  let cursorY = y;
  for (let i = 0; i < chars.length; i += 1) {
    const test = line + chars[i];
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, cursorY);
      line = chars[i];
      cursorY += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, cursorY);
}

function renderPosterPreviews() {
  const square = drawPosterCanvas("square");
  const tall = drawPosterCanvas("tall");
  if (square && els.posterSquare) {
    els.posterSquare.innerHTML = "";
    square.style.width = "100%";
    square.style.height = "auto";
    square.style.borderRadius = "16px";
    els.posterSquare.appendChild(square);
  }
  if (tall && els.posterTall) {
    els.posterTall.innerHTML = "";
    tall.style.width = "100%";
    tall.style.height = "auto";
    tall.style.borderRadius = "16px";
    els.posterTall.appendChild(tall);
  }
}

function downloadPoster(ratio) {
  const canvas = drawPosterCanvas(ratio);
  if (!canvas || !state.result) return;
  const link = document.createElement("a");
  link.download = state.result.code + "-" + (state.name || "player") + "-" + ratio + ".png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function restoreResult() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.code && TYPES[parsed.code]) {
        state.name = parsed.name || "";
        renderResult(parsed, false);
        return;
      }
    }
  } catch (err) {
    // ignore corrupt storage
  }
  showView(els.homeView);
}

function bindEvents() {
  els.startBtn.addEventListener("click", goNickname);
  if (els.categoryGrid) {
    els.categoryGrid.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-topic]");
      if (btn) setTopic(btn.getAttribute("data-topic"));
    });
  }
  els.previewTypesBtn.addEventListener("click", () => {
    renderTypes();
    showView(els.typesView);
    playSound("flip");
  });
  els.backHomeFromTypesBtn.addEventListener("click", () => showView(els.homeView));
  els.langBtn.addEventListener("click", () => {
    state.language = state.language === "zh" ? "en" : "zh";
    refreshLabels();
    playSound("select");
  });
  els.aboutBtn.addEventListener("click", () => aboutToggle(true));
  els.aboutModal.querySelectorAll("[data-close-modal]").forEach((node) => {
    node.addEventListener("click", () => aboutToggle(false));
  });
  els.prevBtn.addEventListener("click", () => {
    if (state.index > 0) {
      state.index -= 1;
      renderQuestion();
      playSound("flip");
    }
  });
  els.homeFromQuizBtn.addEventListener("click", () => showView(els.homeView));
  els.options.addEventListener("click", (event) => {
    const btn = event.target.closest(".option-btn");
    if (btn) onChoice(btn.dataset.value);
  });
  els.retryBtn.addEventListener("click", goNickname);
  els.restartTopBtn.addEventListener("click", goNickname);
  els.copyShareBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(els.shareText.value);
      els.copyFeedback.hidden = false;
      window.setTimeout(() => {
        els.copyFeedback.hidden = true;
      }, 1500);
    } catch (err) {
      els.shareText.select();
      document.execCommand("copy");
      els.copyFeedback.hidden = false;
      window.setTimeout(() => {
        els.copyFeedback.hidden = true;
      }, 1500);
    }
  });
  els.nativeShareBtn.addEventListener("click", async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: ui("brandTitle"), text: els.shareText.value });
        return;
      } catch (err) {
        // fall through to copy
      }
    }
    els.copyShareBtn.click();
  });
  els.generatePosterBtn.addEventListener("click", () => {
    renderPosterPreviews();
    posterToggle(true);
  });
  els.downloadSquareBtn.addEventListener("click", () => downloadPoster("square"));
  els.downloadTallBtn.addEventListener("click", () => downloadPoster("tall"));
  els.posterModal.querySelectorAll("[data-close-poster]").forEach((node) => {
    node.addEventListener("click", () => posterToggle(false));
  });
  els.soundBtn.addEventListener("click", () => {
    state.sound = !state.sound;
    refreshLabels();
    if (state.sound) playSound("select");
  });
  els.nicknameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.name = (els.nicknameInput.value || "").trim() || (state.language === "zh" ? "匿名选手" : "Anonymous Player");
    startQuiz();
  });
  if (els.nickBackBtn) {
    els.nickBackBtn.addEventListener("click", () => showView(els.homeView));
  }
  if (els.contributeForm) {
    els.contributeForm.addEventListener("submit", submitContribution);
  }
  if (els.copyPublicLinkBtn) {
    els.copyPublicLinkBtn.addEventListener("click", copyPublicLink);
  }
  if (els.nativePublicShareBtn) {
    els.nativePublicShareBtn.addEventListener("click", nativePublicShare);
  }
}

function boot() {
  initElements();
  bindEvents();
  refreshLabels();
  renderCategories();
  restoreResult();
  updatePublicShare();
  updateBankMeta();
  setBankStatus(false, true);
  Promise.all([loadFullBank(), loadUserBank()]).then(() => {
    setBankStatus(true, false);
    updateBankMeta();
    renderCategories();
    renderTypes();
    refreshLabels();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
