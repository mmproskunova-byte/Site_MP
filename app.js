/* =========================================================
   Сайт-портфолио Марина Проскунова
   Небольшой скрипт: контакты, мобильное меню, лёгкое
   появление блоков. Без фреймворков и сборки.
   ========================================================= */

/* =======================================================
   КОНТАКТЫ — меняйте значения ТОЛЬКО ЗДЕСЬ.
   Они подставляются во все кнопки и ссылки на странице.
   ======================================================= */
const TELEGRAM_URL = "https://t.me/marinaprosk7";   // ник в Telegram без @
const EMAIL        = "mmproskunova@gmail.com";      // адрес почты для публикации
/* ======================================================= */

(function () {
  "use strict";

  /* --- Контакты во всех элементах с data-contact --- */
  document.querySelectorAll('[data-contact="telegram"]').forEach(function (el) {
    el.setAttribute("href", TELEGRAM_URL);
  });

  document.querySelectorAll('[data-contact="email"]').forEach(function (el) {
    el.setAttribute("href", "mailto:" + EMAIL);
  });

  /* --- Год в подвале --- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* --- Мобильное меню --- */
  const burger = document.querySelector(".burger");
  const nav = document.getElementById("site-nav");

  function closeMenu() {
    if (!burger || !nav) return;
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Открыть меню");
    nav.classList.remove("is-open");
  }

  if (burger && nav) {
    burger.addEventListener("click", function () {
      const open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      burger.setAttribute("aria-label", open ? "Открыть меню" : "Закрыть меню");
      nav.classList.toggle("is-open", !open);
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 960) closeMenu();
    });
  }

  /* --- Тень у шапки при прокрутке --- */
  const header = document.querySelector(".header");
  if (header) {
    const onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* --- Появление блоков при прокрутке --- */
  const reveals = document.querySelectorAll(".reveal");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    reveals.forEach(function (el) { observer.observe(el); });
  }

  /* --- Один открытый вопрос в FAQ за раз --- --- */
  const faqItems = document.querySelectorAll(".faq__item");
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });
})();
