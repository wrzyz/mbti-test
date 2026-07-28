const fs = require("fs");
const path = require("path");
const appPath = path.join(__dirname, "app.js");
let s = fs.readFileSync(appPath, "utf8");

function replaceOnce(oldText, newText, label) {
  if (!s.includes(oldText)) {
    console.warn("skip", label);
    return false;
  }
  s = s.replace(oldText, newText);
  console.log("ok", label);
  return true;
}

replaceOnce(
  `  sound: true,
  choiceLocked: false
};`,
  `  sound: true,
  choiceLocked: false,
  topic: "all"
};`,
  "state.topic"
);

replaceOnce(
  `function sampleQuestions(count) {
  const source = mergedBank();
  const perAxis = Math.max(1, Math.floor(count / 4));
  const axes = AXES.slice();
  const picked = [];
  axes.forEach((axis) => {
    const pool = source.filter((q) => q.axis === axis);
    shuffleInPlace(pool);
    picked.push.apply(picked, pool.slice(0, Math.min(perAxis, pool.length)));
  });
  if (picked.length < count) {
    const pickedIds = new Set(picked.map((q) => q.id));
    const remain = source.filter((q) => !pickedIds.has(q.id));
    shuffleInPlace(remain);
    picked.push.apply(picked, remain.slice(0, count - picked.length));
  }
  shuffleInPlace(picked);
  return picked.slice(0, count).map((q, i) => Object.assign({}, q, { id: i + 1 }));
}`,
  `function topicLabel(topic) {
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

function sampleQuestions(count) {
  let source = mergedBank();
  if (state.topic && state.topic !== "all") {
    const filtered = source.filter((q) => q.topic === state.topic || (q.tags && q.tags.indexOf(state.topic) >= 0));
    if (filtered.length >= Math.min(count, 20)) source = filtered;
  }
  const perAxis = Math.max(1, Math.floor(count / 4));
  const axes = AXES.slice();
  const picked = [];
  axes.forEach((axis) => {
    const pool = source.filter((q) => q.axis === axis);
    shuffleInPlace(pool);
    picked.push.apply(picked, pool.slice(0, Math.min(perAxis, pool.length)));
  });
  if (picked.length < count) {
    const pickedIds = new Set(picked.map((q) => String(q.id) + "|" + normalizeKey(q)));
    const remain = source.filter((q) => !pickedIds.has(String(q.id) + "|" + normalizeKey(q)));
    shuffleInPlace(remain);
    picked.push.apply(picked, remain.slice(0, count - picked.length));
  }
  const seen = new Set();
  const unique = [];
  for (const q of picked) {
    const key = normalizeKey(q);
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(q);
  }
  if (unique.length < count) {
    const more = mergedBank().filter((q) => !seen.has(normalizeKey(q)));
    shuffleInPlace(more);
    for (const q of more) {
      if (unique.length >= count) break;
      unique.push(q);
      seen.add(normalizeKey(q));
    }
  }
  shuffleInPlace(unique);
  return unique.slice(0, count).map((q, i) => Object.assign({}, q, { id: i + 1 }));
}`,
  "sampleQuestions"
);

replaceOnce(
  `function updateBankMeta() {
  const bank = bankSize();
  const run = sessionQuestions.length || RUN_SIZE;
  const text = ui("bankMeta", { bank: bank, n: run });
  if (els.bankMeta) els.bankMeta.textContent = text;
  if (els.quizBankMeta) els.quizBankMeta.textContent = text;
  if (els.bankChip) els.bankChip.textContent = bank >= 1000 ? bank + "+" : String(bank || "48");
}`,
  `function updateBankMeta() {
  const bank = bankSize();
  const run = sessionQuestions.length || RUN_SIZE;
  const text = ui("bankMeta", { bank: bank, n: run, mode: modeLabel() });
  if (els.bankMeta) els.bankMeta.textContent = text;
  if (els.quizBankMeta) els.quizBankMeta.textContent = text;
  if (els.bankChip) els.bankChip.textContent = bank >= 10000 ? "1万+" : bank >= 1000 ? bank + "+" : String(bank || "48");
  if (els.categoryPicked) els.categoryPicked.textContent = ui("categoryPicked", { name: topicLabel(state.topic) });
}`,
  "updateBankMeta"
);

replaceOnce(
  `    bankMeta: document.getElementById("bankMeta"),`,
  `    bankMeta: document.getElementById("bankMeta"),
    categoryGrid: document.getElementById("categoryGrid"),
    categoryTitle: document.getElementById("categoryTitle"),
    categoryLead: document.getElementById("categoryLead"),
    categoryPicked: document.getElementById("categoryPicked"),`,
  "elements"
);

replaceOnce(
  `  if (els.homeLead) els.homeLead.textContent = ui("homeLead");
  updateBankMeta();
  if (els.startBtn) els.startBtn.textContent = ui("startBtn");
  if (els.previewTypesBtn) els.previewTypesBtn.textContent = ui("previewTypes");
  if (els.homeDisclaimer) els.homeDisclaimer.textContent = ui("homeDisclaimer");`,
  `  if (els.homeLead) els.homeLead.textContent = ui("homeLead");
  if (els.categoryTitle) els.categoryTitle.textContent = ui("categoryTitle");
  if (els.categoryLead) els.categoryLead.textContent = ui("categoryLead");
  updateBankMeta();
  if (els.startBtn) els.startBtn.textContent = ui("startBtn");
  if (els.previewTypesBtn) els.previewTypesBtn.textContent = ui("previewTypes");
  if (els.homeDisclaimer) els.homeDisclaimer.textContent = ui("homeDisclaimer");`,
  "labels"
);

replaceOnce(
  `function goNickname() {
  playSound("flip");
  showView(els.nicknameView);
  if (els.nicknameInput) {
    window.setTimeout(() => els.nicknameInput.focus(), 50);
  }
}`,
  `function renderCategories() {
  if (!els.categoryGrid) return;
  const cats = typeof CATEGORIES !== "undefined" && Array.isArray(CATEGORIES) ? CATEGORIES : [];
  const items = [{ id: "all", zh: ui("categoryAll"), en: ui("categoryAll"), emoji: "🎲" }].concat(cats);
  els.categoryGrid.innerHTML = items
    .map((cat) => {
      const active = (state.topic || "all") === cat.id;
      const name = cat.id === "all" ? ui("categoryAll") : t(cat);
      const count =
        cat.id === "all"
          ? bankSize()
          : mergedBank().filter((q) => q.topic === cat.id).length;
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
  playSound("flip");
  showView(els.nicknameView);
  if (els.nicknameInput) {
    window.setTimeout(() => els.nicknameInput.focus(), 50);
  }
}`,
  "categories+goNickname"
);

replaceOnce(
  `  updatePhoneAccess();

  if (els.quizView && els.quizView.classList.contains("active") && activeQuestions()[state.index]) {
    renderQuestion();
  }
  if (state.result) {
    renderResult(state.result, false);
  }
  renderTypes();
}`,
  `  updatePhoneAccess();
  renderCategories();
  updateBankMeta();

  if (els.quizView && els.quizView.classList.contains("active") && activeQuestions()[state.index]) {
    renderQuestion();
  }
  if (state.result) {
    renderResult(state.result, false);
  }
  renderTypes();
}`,
  "refresh end"
);

replaceOnce(
  `  els.startBtn.addEventListener("click", goNickname);
  els.previewTypesBtn.addEventListener("click", () => {
    renderTypes();
    showView(els.typesView);
    playSound("flip");
  });`,
  `  els.startBtn.addEventListener("click", goNickname);
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
  });`,
  "bind"
);

replaceOnce(
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
  `function boot() {
  initElements();
  bindEvents();
  refreshLabels();
  setupInAppBanner();
  renderCategories();
  restoreResult();
  updatePhoneAccess();
  updateBankMeta();
  loadUserBank().then(() => {
    updateBankMeta();
    renderCategories();
    renderTypes();
  });
}`,
  "boot"
);

fs.writeFileSync(appPath, s);
console.log("done");
