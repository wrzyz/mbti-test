// WeChat / QQ mobile compatibility helpers
function fixWeChatEnv() {
  // Keep inputs at 16px to avoid iOS/WeChat focus zoom.
  window.setTimeout(() => {
    document.querySelectorAll("input, textarea").forEach((input) => {
      input.style.fontSize = "16px";
    });
  }, 100);

  // Reduce accidental double-tap zoom in in-app browsers.
  let lastTouchEnd = 0;
  document.addEventListener(
    "touchend",
    (event) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) event.preventDefault();
      lastTouchEnd = now;
    },
    { passive: false }
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", fixWeChatEnv);
} else {
  fixWeChatEnv();
}
