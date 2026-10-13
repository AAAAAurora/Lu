(() => {
  const root = document.documentElement;
  const storageKey = "site-theme";

  function applyTheme(theme, persist = false) {
    const nextTheme = theme === "light" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    if (persist) {
      try {
        localStorage.setItem(storageKey, nextTheme);
      } catch {
        // Theme switching still works when browser storage is unavailable.
      }
    }
  }

  try {
    applyTheme(localStorage.getItem(storageKey));
  } catch {
    applyTheme("dark");
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("theme-toggle")?.addEventListener("click", () => {
      applyTheme(root.dataset.theme === "light" ? "dark" : "light", true);
    });
  }, { once: true });

  window.addEventListener("storage", (event) => {
    if (event.key === storageKey || event.key === null) {
      applyTheme(event.newValue);
    }
  });
})();
