const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = new Map(
  [...document.querySelectorAll(".nav a")]
    .map((link) => {
      const url = new URL(link.getAttribute("href"), window.location.href);
      return [url.hash.slice(1), link];
    })
    .filter(([id]) => id)
);
const languageButtons = [...document.querySelectorAll("[data-set-lang]")];

function setLanguage(language) {
  const nextLanguage = language === "en" ? "en" : "zh";
  const titleKey = nextLanguage === "en" ? "titleEn" : "titleZh";
  const fallbackTitle =
    nextLanguage === "en" ? "Danqi Lu | Homepage" : "卢丹琪 | 个人主页";

  document.body.dataset.lang = nextLanguage;
  document.documentElement.lang = nextLanguage === "en" ? "en" : "zh-CN";
  document.title = document.body.dataset[titleKey] || fallbackTitle;
  localStorage.setItem("site-language", nextLanguage);

  languageButtons.forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.setLang === nextLanguage)
    );
  });
}

function updateActiveNav() {
  const hashId = window.location.hash.slice(1);
  if (navLinks.has(hashId)) {
    navLinks.forEach((link) => link.classList.remove("is-active"));
    navLinks.get(hashId)?.classList.add("is-active");
    return;
  }

  const headerOffset = 160;
  const current = sections
    .filter((section) => section.getBoundingClientRect().top <= headerOffset)
    .at(-1);

  navLinks.forEach((link) => link.classList.remove("is-active"));

  if (current) {
    navLinks.get(current.id)?.classList.add("is-active");
  }
}

updateActiveNav();
window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("hashchange", updateActiveNav);

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.setLang));
});

setLanguage(localStorage.getItem("site-language") || "zh");
