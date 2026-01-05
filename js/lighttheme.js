document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const orb = document.getElementById("emoji-orb");
  const themeImages = document.querySelectorAll(".theme-img");

  function setTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Emoji váltás
    if (orb) {
      orb.textContent = theme === "dark" ? "🌙" : "🌞";
    }

    // KÉPEK VÁLTÁSA
    themeImages.forEach(img => {
      const newSrc =
        theme === "dark"
          ? img.dataset.dark
          : img.dataset.light;

      if (newSrc) {
        img.src = newSrc;
      }
    });
  }

  function toggleTheme() {
    const current = html.getAttribute("data-theme") || "light";
    setTheme(current === "dark" ? "light" : "dark");
  }

  if (toggle) {
    toggle.addEventListener("click", toggleTheme);
    toggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleTheme();
      }
    });
  }

  // Kezdő theme beállítása
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }
});
