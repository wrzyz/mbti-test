# 精神状态速测台 · Mood Stage Quiz

纯前端搞笑人格测试：
- 题库 **50000+**（≥5万），每次 **48** 题四选一
- 支持 **分类测试**（恋爱/学习/职场/人生/搞笑/动漫/游戏/家庭/社媒/出行/饮食/金钱/社死/摸鱼/追剧/干饭/运动/宠物/深夜/友情）与 **随机混合**
- 题干、选项、金句按情景绑定生成，选项集不串题复制
- 中英双语、昵称、翻题动画、可静音音效
- 认真分析 / 人间锐评 / 职业建议 / 恋爱匹配
- 增强图鉴 **50** 张
- 答完可投稿，服务端自动去重写入 `user-bank.json`
- 1:1 与 9:16 海报
- 微信 / QQ 内置浏览器可直接作答
- 手机可访问（同一 Wi-Fi）

## 启动

```bash
cd D:\chatgpt\mbti-test
set PORT=8090
npm start
```

- 本机：http://127.0.0.1:8090/
- 手机同 Wi-Fi：看终端 `PHONE_LAN`（当前常见为 http://192.168.2.6:8090/）
- 不要用 8000（通常是别的服务）

## 投稿接口

- `GET /user-bank.json`
- `POST /api/contribute`

## 生成题库

```bash
node _build_50k.js
```

## 文件

- `index.html` / `styles.css` / `app.js` / `data.js` / `bank.json` / `server.js`
- `data.js`：类型图鉴、文案、48题种子（小文件，秒开）
- `bank.json`：50000+ 题压缩题库（异步加载，答题时只展开本局48题）

## 验证

```bash
node _smoke_async.js
node _verify_category.js
```
- `user-bank.json` 用户投稿
- `_build_50k.js` 5万+分类题库生成器

## 说明

娱乐向自我探索，有参考性，不构成专业心理评估。
