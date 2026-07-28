const fs = require("fs");
const path = require("path");
const p = path.join(__dirname, "index.html");
let s = fs.readFileSync(p, "utf8");

function must(oldText, newText, label) {
  if (!s.includes(oldText)) {
    console.error("missing", label);
    process.exit(1);
  }
  s = s.replace(oldText, newText);
}

must(
  `  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>精神状态速测台 · Mood Stage Quiz</title>
  <meta name="description" content="千题题库搞笑人格测试：每次随机48题四选一，每题金句、认真分析、人间锐评、职业匹配、恋爱匹配、增强图鉴、海报分享。" />`,
  `  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>精神状态速测台 · Mood Stage Quiz</title>
  <meta name="description" content="2000+题库搞笑人格测试：每次随机48题四选一，图鉴49+，金句、认真分析、人间锐评、职业/恋爱匹配、投稿更新题库。微信/QQ内可直接作答。" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
  <meta itemprop="name" content="精神状态速测台" />
  <meta itemprop="description" content="2000+题库搞笑人格测试，微信/QQ内直接玩。" />
  <meta property="og:title" content="精神状态速测台 · Mood Stage Quiz" />
  <meta property="og:description" content="2000+题库 · 每次48题 · 图鉴49+ · 可投稿" />
  <meta property="og:type" content="website" />`,
  "meta"
);

must(
  `    <header class="topbar">`,
  `    <div class="inapp-banner" id="inAppBanner" hidden>
      <div>
        <strong id="inAppTitle">微信/QQ 内可直接作答</strong>
        <p id="inAppLead">不用跳外部浏览器，当前页就能测完、看结果、投稿。</p>
      </div>
      <button type="button" class="pill" id="openSystemBrowserBtn" hidden>可选系统浏览器</button>
    </div>
    <header class="topbar">`,
  "banner"
);

must(
  `            <p class="copy-feedback" id="copyFeedback" hidden>已复制</p>
          </div>
        </div>
      </section>

      <section id="typesView" class="view">
        <div class="stage-card">
          <div class="section-row">
            <div>
              <h2 id="typesTitle">16 型增强图鉴（加量版）</h2>
              <p id="typesLead" class="lead">气质、哲理、恋爱、工作、社交增益/减益、名场面、避雷场、口头禅。重测会换题，人格地图还在。</p>
            </div>
            <button type="button" class="secondary" id="backHomeFromTypesBtn">回首页</button>
          </div>
          <div class="tile-grid types" id="typesGrid"></div>
        </div>
      </section>`,
  `            <p class="copy-feedback" id="copyFeedback" hidden>已复制</p>
          </div>

          <section class="contribute-panel" aria-label="contribute">
            <h3 id="contributeTitle">给题库投稿一题</h3>
            <p class="lead compact" id="contributeLead">答完也能贡献段子。题目会去重并自动进入用户题库。</p>
            <form id="contributeForm" class="contribute-form">
              <label>
                <span data-i18n-axis>维度</span>
                <select id="contributeAxis">
                  <option value="EI">EI</option>
                  <option value="SN">SN</option>
                  <option value="TF">TF</option>
                  <option value="JP">JP</option>
                </select>
              </label>
              <label>
                <span data-i18n-text>题干</span>
                <textarea id="contributeText" rows="3" maxlength="240" required placeholder="例如：群红包来了，手速和人设同时崩，你会？"></textarea>
              </label>
              <label>
                <span data-i18n-quote>金句</span>
                <input id="contributeQuote" type="text" maxlength="120" placeholder="完成比完美更像成年人。" />
              </label>
              <div class="contribute-options">
                <label>
                  <span data-i18n-a>选项A</span>
                  <input id="contributeOptA" type="text" maxlength="80" required />
                </label>
                <label>
                  <span data-i18n-b>选项B</span>
                  <input id="contributeOptB" type="text" maxlength="80" required />
                </label>
                <label>
                  <span data-i18n-c>选项C</span>
                  <input id="contributeOptC" type="text" maxlength="80" required />
                </label>
                <label>
                  <span data-i18n-d>选项D</span>
                  <input id="contributeOptD" type="text" maxlength="80" required />
                </label>
              </div>
              <p class="hint" id="contributeHint">四选项需分别对应维度两端（如 EI 用 E/I）</p>
              <button type="submit" class="primary" id="contributeSubmitBtn">提交到题库</button>
              <p class="copy-feedback" id="contributeFeedback" hidden></p>
            </form>
          </section>
        </div>
      </section>

      <section id="typesView" class="view">
        <div class="stage-card">
          <div class="section-row">
            <div>
              <h2 id="typesTitle">增强图鉴（49+）</h2>
              <p id="typesLead" class="lead">16 型核心卡 + 扩展生活形态卡。气质、哲理、恋爱、工作、社交 buff/debuff、名场面、口头禅。</p>
              <p class="bank-meta compact" id="typesCount">图鉴 50 张</p>
            </div>
            <button type="button" class="secondary" id="backHomeFromTypesBtn">回首页</button>
          </div>
          <div class="tile-grid types" id="typesGrid"></div>
        </div>
      </section>`,
  "contribute+types"
);

fs.writeFileSync(p, s);
console.log("html patched");
