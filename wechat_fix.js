
// 增强微信/QQ环境检测与适配
function fixWeChatEnv() {
  const ua = navigator.userAgent.toLowerCase();
  const isWeChat = /micromessenger/i.test(ua);
  const isQQBrowser = /qqbrowser|mqagent|qq|quark/i.test(ua);
  
  // 在微信/QQ中隐藏部分UI元素以减少干扰
  if (isWeChat || isQQBrowser) {
    const banner = document.getElementById("inAppBanner");
    if (banner) {
      banner.hidden = false;  // 明确显示提示
      const inAppTitle = document.getElementById("inAppTitle");
      if (inAppTitle) inAppTitle.textContent = "微信/QQ内可直接作答";
    }
  }
  
  // 修复微信中某些输入框聚焦问题
  setTimeout(() => {
    const inputs = document.querySelectorAll("input, textarea");
    inputs.forEach(input => {
      input.style.fontSize = "16px";  // 防止微信自动调整字体
    });
  }, 100);
  
  // 防止双击缩放
  let lastTouchEnd = 0;
  document.addEventListener("touchend", function(event) {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", fixWeChatEnv);
} else {
  fixWeChatEnv();
}

