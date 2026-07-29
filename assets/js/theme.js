const themeToggleBtn = document.getElementById("theme-toggle");
const iconSun = document.getElementById("icon-sun");
const iconMoon = document.getElementById("icon-moon");

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
    iconSun.style.display = "none";
    iconMoon.style.display = "inline";
    themeToggleBtn.setAttribute("aria-label", "Activar modo claro");
  } else {
    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");
    iconSun.style.display = "inline";
    iconMoon.style.display = "none";
    themeToggleBtn.setAttribute("aria-label", "Activar modo oscuro");
  }
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = prefersDark ? "dark" : "light";
  applyTheme(initialTheme);
}

themeToggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark-mode");
  const newTheme = isDark ? "light" : "dark";
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
});

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-links");
  const links = document.querySelectorAll(".nav-links a");
  const header = document.querySelector(".navbar");

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    nav.classList.toggle("active");
  });

  links.forEach(link => {
    link.addEventListener("click", () => {
      toggle.classList.remove("active");
      nav.classList.remove("active");
    });
  });

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
      document.body.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
      document.body.classList.remove("scrolled");
    }
  };

  handleScroll();

  window.addEventListener("scroll", handleScroll);

  const currentPath = window.location.pathname
    .replace(/\/index\.html$/, "/")
    .replace(/\/$/, "");

  links.forEach(link => {
    const linkPath = link.getAttribute("href").replace(/\/$/, "");
    if (currentPath.endsWith(linkPath)) {
      link.classList.add("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const currentYear = new Date().getFullYear();
  document.querySelectorAll("[data-current-year]").forEach(el => {
    el.textContent = currentYear;
  });
});

const translateBtn = document.getElementById("translate-btn");
if (translateBtn) {
  const currentUrl = window.location.href;
  translateBtn.href = `https://translate.google.com/translate?sl=es&tl=auto&u=${encodeURIComponent(currentUrl)}`;
}