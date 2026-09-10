// ==========================================================================
// Tanushri Dwivedi — Portfolio
// Theme toggle, mobile nav, and contact form handling
// ==========================================================================

(function () {
  'use strict';

  /* ---------- Theme toggle (persisted to localStorage) ---------- */

  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const THEME_KEY = 'td-portfolio-theme';

  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      themeToggle.setAttribute('aria-pressed', 'true');
      themeToggle.setAttribute('aria-label', 'Switch to dark theme');
    } else {
      root.removeAttribute('data-theme');
      themeToggle.setAttribute('aria-pressed', 'false');
      themeToggle.setAttribute('aria-label', 'Switch to light theme');
    }
  }

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  applyTheme(getPreferredTheme());

  themeToggle.addEventListener('click', function () {
    const isLight = root.getAttribute('data-theme') === 'light';
    const next = isLight ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });

  /* ---------- Mobile hamburger menu ---------- */

  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');

  function closeNav() {
    mainNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
  }

  function toggleNav() {
    const isOpen = mainNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  }

  hamburger.addEventListener('click', toggleNav);

  // Close the mobile menu after a nav link is used, and on outside click.
  mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('click', function (event) {
    const clickedInsideNav = mainNav.contains(event.target) || hamburger.contains(event.target);
    if (!clickedInsideNav && mainNav.classList.contains('open')) closeNav();
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 720) closeNav();
  });

  /* ---------- Contact form (no backend — front-end acknowledgement only) ---------- */

  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      formStatus.textContent = 'Please fill in every field before sending.';
      formStatus.style.color = 'var(--indigo)';
      return;
    }

    const name = document.getElementById('fullName').value.trim();
    formStatus.textContent = 'Thanks, ' + name.split(' ')[0] + '! Your message has been noted — I\u2019ll get back to you soon.';
    formStatus.style.color = 'var(--olive)';
    contactForm.reset();
  });

  /* ---------- Sticky header shadow on scroll ---------- */

  const header = document.querySelector('.site-header');
  let lastScroll = 0;

  window.addEventListener('scroll', function () {
    const y = window.scrollY;
    header.style.boxShadow = y > 8 ? '0 8px 24px -18px rgba(0,0,0,0.6)' : 'none';
    lastScroll = y;
  }, { passive: true });

})();
