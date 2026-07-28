const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

const root = __dirname;
const port = Number(process.env.PORT || 8091);
const host = process.env.HOST || "0.0.0.0";
const userBankPath = path.join(root, "user-bank.json");
const AXES = {
  EI: ["E", "I"],
  SN: ["S", "N"],
  TF: ["T", "F"],
  JP: ["J", "P"]
};

function typeOf(file) {
  if (file.endsWith(".html")) return "text/html; charset=utf-8";
  if (file.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (file.endsWith(".css")) return "text/css; charset=utf-8";
  if (file.endsWith(".png")) return "image/png";
  if (file.endsWith(".svg")) return "image/svg+xml";
  if (file.endsWith(".json")) return "application/json; charset=utf-8";
  return "application/octet-stream";
}

function lanUrls() {
  const nets = os.networkInterfaces();
  const urls = [];
  Object.keys(nets).forEach((name) => {
    (nets[name] || []).forEach((net) => {
      const family = net && (net.family === "IPv4" || net.family === 4);
      if (net && family && !net.internal) {
        urls.push("http://" + net.address + ":" + port + "/");
      }
    });
  });
  return urls.slice().sort((a, b) => {
    const score = (u) => (u.includes("169.254.") ? 1 : 0);
    return score(a) - score(b);
  });
}

function sendJson(res, code, payload) {
  res.writeHead(code, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > 200000) {
        reject(new Error("payload too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function ensureUserBank() {
  if (!fs.existsSync(userBankPath)) {
    fs.writeFileSync(userBankPath, JSON.stringify({ questions: [] }, null, 2), "utf8");
  }
}

function loadUserBank() {
  ensureUserBank();
  try {
    const raw = JSON.parse(fs.readFileSync(userBankPath, "utf8"));
    const questions = Array.isArray(raw.questions) ? raw.questions : [];
    return { questions: questions };
  } catch (err) {
    return { questions: [] };
  }
}

function saveUserBank(bank) {
  fs.writeFileSync(userBankPath, JSON.stringify(bank, null, 2), "utf8");
}

function normText(value) {
  if (value && typeof value === "object") {
    return String(value.zh || value.en || "")
      .replace(/\s+/g, "")
      .toLowerCase();
  }
  return String(value || "")
    .replace(/\s+/g, "")
    .toLowerCase();
}

function bi(value) {
  if (value && typeof value === "object") {
    return {
      zh: String(value.zh || value.en || "").trim(),
      en: String(value.en || value.zh || "").trim()
    };
  }
  const text = String(value || "").trim();
  return { zh: text, en: text };
}

function validateQuestion(input) {
  if (!input || typeof input !== "object") return { ok: false, error: "invalid body" };
  const axis = String(input.axis || "").toUpperCase();
  if (!AXES[axis]) return { ok: false, error: "axis must be EI/SN/TF/JP" };
  const text = bi(input.text);
  if (!text.zh || text.zh.length < 6) return { ok: false, error: "text too short" };
  const quote = bi(input.quote || { zh: "金句：完成比完美更像成年人。", en: "Quote: Done looks more adult than perfect." });
  const optionsIn = Array.isArray(input.options) ? input.options : [];
  if (optionsIn.length !== 4) return { ok: false, error: "need 4 options" };
  const poles = AXES[axis];
  const options = optionsIn.map((opt, idx) => {
    const value = String((opt && opt.value) || poles[idx % 2]).toUpperCase();
    const label = bi(opt && (opt.label || opt.text));
    return {
      value: poles.includes(value) ? value : poles[idx % 2],
      label: label,
      hint: bi((opt && opt.hint) || { zh: value, en: value })
    };
  });
  if (options.some((o) => !o.label.zh)) return { ok: false, error: "option labels required" };
  const values = options.map((o) => o.value);
  if (!poles.every((p) => values.includes(p))) {
    return { ok: false, error: "options must cover both poles" };
  }
  const category = bi(input.category || { zh: "用户投稿", en: "User Submit" });
  const question = {
    id: "U" + Date.now().toString(36) + Math.floor(Math.random() * 1000),
    axis: axis,
    category: category,
    topic: String(input.topic || (Array.isArray(input.tags) && input.tags[0]) || "funny"),
    tags: Array.isArray(input.tags) && input.tags.length ? input.tags.slice(0, 6) : [String(input.topic || "funny"), "user", "funny"],
    kicker: {
      zh: category.zh + " · 用户投稿 · " + axis,
      en: category.en + " · User · " + axis
    },
    text: text,
    quote: {
      zh: quote.zh.startsWith("金句") ? quote.zh : "金句：" + quote.zh,
      en: quote.en.startsWith("Quote") ? quote.en : "Quote: " + quote.en
    },
    options: options,
    source: "user",
    createdAt: new Date().toISOString()
  };
  return { ok: true, question: question };
}

const server = http.createServer(async (req, res) => {
  try {
    const method = (req.method || "GET").toUpperCase();
    let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    if (urlPath === "/") urlPath = "/index.html";

    if (method === "OPTIONS") {
      res.writeHead(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      });
      res.end();
      return;
    }

    if (urlPath === "/lan.json") {
      sendJson(res, 200, { port: port, urls: lanUrls() });
      return;
    }

    if (urlPath === "/user-bank.json" && method === "GET") {
      sendJson(res, 200, loadUserBank());
      return;
    }

    if (urlPath === "/api/contribute" && method === "POST") {
      const raw = await readBody(req);
      let body;
      try {
        body = JSON.parse(raw || "{}");
      } catch (err) {
        sendJson(res, 400, { ok: false, error: "invalid json" });
        return;
      }
      const checked = validateQuestion(body);
      if (!checked.ok) {
        sendJson(res, 400, { ok: false, error: checked.error });
        return;
      }
      const bank = loadUserBank();
      const key = checked.question.axis + "|" + normText(checked.question.text);
      const dup = bank.questions.some((q) => q.axis + "|" + normText(q.text) === key);
      if (dup) {
        sendJson(res, 200, { ok: true, status: "duplicate", size: bank.questions.length });
        return;
      }
      bank.questions.push(checked.question);
      saveUserBank(bank);
      sendJson(res, 200, {
        ok: true,
        status: "added",
        question: checked.question,
        size: bank.questions.length
      });
      return;
    }

    if (method !== "GET" && method !== "HEAD") {
      res.writeHead(405);
      res.end("method not allowed");
      return;
    }

    const safe = path.normalize(urlPath).replace(/^([.][.][/\\])+/, "");
    const filePath = path.join(root, safe);
    if (!filePath.startsWith(root)) {
      res.writeHead(403);
      res.end("forbidden");
      return;
    }
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.writeHead(404);
      res.end("not found");
      return;
    }
    let data = fs.readFileSync(filePath);
    if (filePath.endsWith("index.html")) {
      const urls = lanUrls();
      const inject =
        "<script>window.LAB_LAN_URLS=" +
        JSON.stringify(urls) +
        ";window.LAB_PHONE_URL=" +
        JSON.stringify(urls[0] || "") +
        ";</script>";
      data = Buffer.from(String(data).replace("</head>", inject + "</head>"));
    }
    res.writeHead(200, {
      "Content-Type": typeOf(filePath),
      "Cache-Control": "no-store"
    });
    res.end(data);
  } catch (err) {
    res.writeHead(500);
    res.end(String(err && err.message ? err.message : err));
  }
});

ensureUserBank();
server.listen(port, host, () => {
  console.log("LAB_SERVER http://127.0.0.1:" + port + "/");
  const urls = lanUrls();
  if (urls.length) urls.forEach((url) => console.log("PHONE_LAN " + url));
  else console.log("PHONE_LAN (no external IPv4 found; check Wi-Fi)");
});
