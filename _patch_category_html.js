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
  `  <meta name="description" content="2000+题库搞笑人格测试：每次随机48题四选一，图鉴49+，金句、认真分析、人间锐评、职业/恋爱匹配、投稿更新题库。微信/QQ内可直接作答。" />`,
  `  <meta name="description" content="1万+分类题库搞笑人格测试：恋爱/学习/职场/人生/动漫等可选，也可随机48题；选项与题目绑定，金句丰富；图鉴49+；微信/QQ内可直接作答。" />`,
  "desc"
);

must(
  `            <div class="pill-row">
              <span class="mini lime">HOT</span>
              <span class="mini sky" id="bankChip">1000+</span>
              <span class="mini coral">A/B/C/D</span>
            </div>
            <h1 id="homeTitle">从上千道离谱题里，抽中你的人间副本</h1>
            <p class="lead" id="homeLead">题库 1000+ 情景，覆盖社死、群聊、恋爱、通勤、游戏、团建、夜猫子等。每次测试从题库均衡抽取 48 题，选项够损，金句好笑也扎心。</p>
            <p class="bank-meta" id="bankMeta">题库加载中…</p>

            <div class="host-box">
              <div class="host-avatar">📢</div>
              <div>
                <strong id="researcherLabel">场控小喇叭</strong>
                <p id="researcherLine">我是小喇叭。今天不讲大道理，只负责把你的选项翻译成人话。</p>
              </div>
            </div>

            <div class="action-row">
              <button type="button" class="primary" id="startBtn">开始快问快答</button>
              <button type="button" class="secondary" id="previewTypesBtn">先看增强图鉴</button>
            </div>`,
  `            <div class="pill-row">
              <span class="mini lime">HOT</span>
              <span class="mini sky" id="bankChip">1万+</span>
              <span class="mini coral">A/B/C/D</span>
              <span class="mini violet">分类/随机</span>
            </div>
            <h1 id="homeTitle">选题库副本，抽取你的人格掉落</h1>
            <p class="lead" id="homeLead">题库 10000+，覆盖恋爱/学习/职场/人生/搞笑/动漫/游戏等。可按分类测，也可全随机。每题四选项与情景绑定，金句又损又有哲理。</p>
            <p class="bank-meta" id="bankMeta">题库加载中…</p>

            <div class="category-panel">
              <div class="section-row compact">
                <div>
                  <h2 id="categoryTitle" class="section-title tight">选择测试内容</h2>
                  <p id="categoryLead" class="lead compact">点分类只抽该类题；点“随机混合”从全库均衡抽取。</p>
                </div>
                <p id="categoryPicked" class="bank-meta compact">已选：随机混合</p>
              </div>
              <div class="category-grid" id="categoryGrid" role="listbox" aria-label="categories"></div>
            </div>

            <div class="host-box">
              <div class="host-avatar">📢</div>
              <div>
                <strong id="researcherLabel">场控小喇叭</strong>
                <p id="researcherLine">我是小喇叭。今天不讲大道理，只负责把你的选项翻译成人话。</p>
              </div>
            </div>

            <div class="action-row">
              <button type="button" class="primary" id="startBtn">开始快问快答</button>
              <button type="button" class="secondary" id="previewTypesBtn">先看增强图鉴</button>
            </div>`,
  "home category"
);

fs.writeFileSync(p, s);
console.log("html category patched");
