const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

function readSavedTheme(): string | null {
  try {
    return localStorage.getItem("guga-theme");
  } catch {
    return null;
  }
}

function saveTheme(theme: string): void {
  try {
    localStorage.setItem("guga-theme", theme);
  } catch {
    /* localStorage may be unavailable */
  }
}

function paintTheme(theme: string): void {
  root.dataset.theme = theme;

  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "切换到浅色模式" : "切换到深色模式"
    );
    themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }

  if (themeMeta) {
    themeMeta.setAttribute("content", theme === "dark" ? "#101a20" : "#f6f7f2");
  }
}

paintTheme(root.dataset.theme || (prefersDark.matches ? "dark" : "light"));

themeToggle?.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  paintTheme(next);
  saveTheme(next);
});

function syncSystemTheme(event: MediaQueryListEvent): void {
  if (!readSavedTheme()) {
    paintTheme(event.matches ? "dark" : "light");
  }
}

prefersDark.addEventListener("change", syncSystemTheme);
