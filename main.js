/* ============================================
   CHOP BAR — script.js
   ============================================ */

// ── NAV: Sticky scroll behaviour ──────────────
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });


// ── MOBILE MENU ────────────────────────────────
const navBurger   = document.getElementById('navBurger');
const mobileMenu  = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
const mobileLinks = document.querySelectorAll('.mobile-link');

navBurger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
});

function closeMenu() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

mobileClose.addEventListener('click', closeMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMenu));


// ── MENU TABS ──────────────────────────────────
const tabs   = document.querySelectorAll('.menu__tab');
const panels = document.querySelectorAll('.menu__panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // deactivate all
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));

    // activate clicked
    tab.classList.add('active');
    const targetId = 'tab-' + tab.dataset.tab;
    document.getElementById(targetId).classList.add('active');
  });
});


// ── SCROLL REVEAL ──────────────────────────────
// Add .reveal class to elements we want to animate
const revealTargets = [
  '.about__img-wrap',
  '.about__content',
  '.dish-card',
  '.gallery__item',
  '.catering__card',
  '.review-card',
  '.reserve__info',
  '.reserve__form-wrap',
  '.menu__header',
  '.gallery__header',
  '.catering__content',
  '.reviews__header',
  '.footer__brand',
  '.footer__nav',
  '.footer__contact',
];

revealTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger cards in grids
    if (
      el.classList.contains('dish-card') ||
      el.classList.contains('gallery__item') ||
      el.classList.contains('catering__card') ||
      el.classList.contains('review-card')
    ) {
      el.style.transitionDelay = `${i * 0.07}s`;
    }
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// ── RESERVATION FORM ───────────────────────────
const reserveForm    = document.getElementById('reserveForm');
const reserveSuccess = document.getElementById('reserveSuccess');

// Set minimum date to today
const dateInput = document.getElementById('date');
if (dateInput) {
  const today = new Date();
  const yyyy  = today.getFullYear();
  const mm    = String(today.getMonth() + 1).padStart(2, '0');
  const dd    = String(today.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}

reserveForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Simulate submission (no real backend)
  const btn = reserveForm.querySelector('button[type="submit"]');
  btn.textContent = 'Confirming…';
  btn.disabled = true;

  setTimeout(() => {
    reserveForm.style.display = 'none';
    reserveSuccess.classList.add('visible');
  }, 1200);
});


// ── SMOOTH SCROLL for nav links ────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const offset = 80; // nav height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


// ── ACTIVE NAV LINK highlight on scroll ────────
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinksAll = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinksAll.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--cream)'
            : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));
