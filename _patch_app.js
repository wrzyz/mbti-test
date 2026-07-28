const fs = require("fs");
const path = require("path");
const appPath = path.join(__dirname, "app.js");
let s = fs.readFileSync(appPath, "utf8");

function mustReplace(oldText, newText, label) {
  if (!s.includes(oldText)) {
    console.error("missing block:", label);
    process.exit(1);
  }
  s = s.replace(oldText, newText);
}

mustReplace(
  `let els = {};
let audioCtx = null;
let sessionQuestions = [];

function bankSize() {
  if (typeof QUESTION_BANK !== "undefined" && Array.isArray(QUESTION_BANK) && QUESTION_BANK.length) {
    return QUESTION_BANK.length;
  }
  return Array.isArray(QUESTIONS) ? QUESTIONS.length : 0;
}`,
  `let els = {};
let audioCtx = null;
let sessionQuestions = [];
let contributedQuestions = [];
const CONTRIB_LOCAL_KEY = "mood-stage-user-bank-v1";
const CONTRIB_QUEUE_KEY = "mood-stage-contrib-queue-v1";

function baseBank() {
  if (typeof QUESTION_BANK !== "undefined" && Array.isArray(QUESTION_BANK) && QUESTION_BANK.length) {
    return QUESTION_BANK;
  }
  return Array.isArray(QUESTIONS) ? QUESTIONS : [];
}

function normalizeKey(q) {
  const text = q && q.text ? (q.text.zh || q.text.en || q.text) : "";
  return String(q && q.axis ? q.axis : "") + "|" + String(text).replace(/\\s+/g, "").toLowerCase();
}

function mergedBank() {
  const base = baseBank();
  const map = new Map();
  base.forEach((q) => map.set(normalizeKey(q), q));
  contributedQuestions.forEach((q) => {
    const key = normalizeKey(q);
    if (!map.has(key)) map.set(key, q);
  });
  return Array.from(map.values());
}

function bankSize() {
  return mergedBank().length;
}`,
  "bank helpers"
);

mustReplace(
  `function sampleQuestions(count) {
  const source =
    typeof QUESTION_BANK !== "undefined" && Array.isArray(QUESTION_BANK) && QUESTION_BANK.length
      ? QUESTION_BANK
      : QUESTIONS;`,
  `function sampleQuestions(count) {
  const source = mergedBank();`,
  "sampleQuestions source"
);

mustReplace(
  `    typesGrid: document.getElementById("typesGrid"),
    backHomeFromTypesBtn: document.getElementById("backHomeFromTypesBtn"),`,
  `    typesGrid: document.getElementById("typesGrid"),
    typesCount: document.getElementById("typesCount"),
    backHomeFromTypesBtn: document.getElementById("backHomeFromTypesBtn"),
    contributeForm: document.getElementById("contributeForm"),
    contributeAxis: document.getElementById("contributeAxis"),
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
    inAppBanner: document.getElementById("inAppBanner"),
    inAppTitle: document.getElementById("inAppTitle"),
    inAppLead: document.getElementById("inAppLead"),
    openSystemBrowserBtn: document.getElementById("openSystemBrowserBtn"),`,
  "elements"
);

mustReplace(
  `  if (els.typesTitle) els.typesTitle.textContent = ui("typesTitle");
  if (els.typesLead) els.typesLead.textContent = ui("typesLead");
  if (els.aboutTitle) els.aboutTitle.textContent = ui("aboutTitle");
  if (els.aboutBody) els.aboutBody.textContent = ui("aboutBody");`,
  `  if (els.typesTitle) els.typesTitle.textContent = ui("typesTitle");
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
  if (els.openSystemBrowserBtn) els.openSystemBrowserBtn.textContent = ui("openInBrowser");
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
  if (els.aboutBody) els.aboutBody.textContent = ui("aboutBody");`,
  "labels"
);

mustReplace(
  `function renderTypes() {
  if (!els.typesGrid) return;
  els.typesGrid.innerHTML = Object.keys(TYPES)
    .map((code) => {
      const info = TYPES[code];
      const traits = localizedList(info.traits).map((item) => t(item)).join(" · ");
      const strengths = localizedList(info.strengths).map((item) => t(item)).join(" / ");
      const watchouts = localizedList(info.watchouts).map((item) => t(item)).join(" / ");
      return (
        '<article class="type-tile rich">' +
        '<div class="codex-head">' +
        '<div class="code">' +
        code +
        '</div><div class="codex-title"><strong>' +
        info.emoji +
        " " +
        t(info.name) +
        '</strong><p class="type-en">' +
        info.english +
        " · " +
        t(info.animal) +
        " · " +
        t(info.fantasy) +
        "</p></div></div>" +
        lineBlock("codexVibe", info.vibe) +
        lineBlock("codexPhilosophy", info.philosophy) +
        '<p class="codex-line"><b>' +
        ui("traitsTitle") +
        "</b> " +
        traits +
        "</p>" +
        '<p class="codex-line"><b>' +
        ui("strengthsTitle") +
        "</b> " +
        strengths +
        "</p>" +
        '<p class="codex-line"><b>' +
        ui("watchoutsTitle") +
        "</b> " +
        watchouts +
        "</p>" +
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
        '<p class="codex-snark">' +
        t(info.snark) +
        "</p></article>"
      );
    })
    .join("");
}`,
  `function codexEntries() {
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
  return /MicroMessenger|QQ\\//i.test(ua) || /\\bQQ\\b/i.test(ua);
}

function setupInAppBanner() {
  if (!els.inAppBanner) return;
  const inApp = isInAppBrowser();
  els.inAppBanner.hidden = !inApp;
  if (els.openSystemBrowserBtn) {
    els.openSystemBrowserBtn.hidden = !inApp;
  }
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

function buildContributePayload() {
  const axis = ((els.contributeAxis && els.contributeAxis.value) || "EI").toUpperCase();
  const poles = axisPoles(axis);
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
}`,
  "renderTypes+contribute"
);

mustReplace(
  `  if (els.copyPhoneLinkBtn) {`,
  `  if (els.contributeForm) {
    els.contributeForm.addEventListener("submit", submitContribution);
  }
  if (els.openSystemBrowserBtn) {
    els.openSystemBrowserBtn.addEventListener("click", () => {
      const url = window.location.href;
      // Best-effort only; webviews may ignore. App remains playable in-place.
      window.open(url, "_blank");
      try {
        navigator.clipboard.writeText(url);
      } catch (err) {}
    });
  }
  if (els.copyPhoneLinkBtn) {`,
  "bind contribute"
);

mustReplace(
  `function boot() {
  initElements();
  bindEvents();
  refreshLabels();
  restoreResult();
  updatePhoneAccess();
  updateBankMeta();
}`,
  `function boot() {
  initElements();
  bindEvents();
  refreshLabels();
  setupInAppBanner();
  restoreResult();
  updatePhoneAccess();
  updateBankMeta();
  loadUserBank().then(() => {
    updateBankMeta();
    renderTypes();
  });
}`,
  "boot"
);

fs.writeFileSync(appPath, s);
console.log("app patched", appPath);
