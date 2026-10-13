(() => {
  const root = document.documentElement;
  const storageKey = "site-theme";

  function applyTheme(theme, persist = false) {
    const nextTheme = theme === "light" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    document.querySelectorAll("[data-set-theme]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.setTheme === nextTheme));
    });
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
    applyTheme(root.dataset.theme);
    document.querySelectorAll("[data-set-theme]").forEach((button) => {
      button.addEventListener("click", () => applyTheme(button.dataset.setTheme, true));
    });
  }, { once: true });

  window.addEventListener("storage", (event) => {
    if (event.key === storageKey || event.key === null) {
      applyTheme(event.newValue);
    }
  });
})();
