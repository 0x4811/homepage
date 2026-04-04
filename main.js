/* =============================================
   WOUTER SLOTBOOM — main.js
   ============================================= */

// ── Custom Cursor ────────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

(function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
})();

// ── Navbar ───────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Hamburger / Mobile Menu ──────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('active', open);
  hamburger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

mobileMenu.querySelectorAll('.mm-link').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  });
});

// ── Scroll Reveal ────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.05}s`;
  revealObserver.observe(el);
});

// ── Count-up Stats ───────────────────────────
function countUp(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1400;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      countUp(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-target]').forEach(el => {
  statObserver.observe(el);
});

// ── Avatar ring spin (CSS @property fallback) ─
// Animate conic-gradient ring via JS for browsers without @property support
(function spinRing() {
  const avatar = document.querySelector('.avatar-inner');
  if (!avatar) return;
  let angle = 0;
  function tick() {
    angle = (angle + 0.3) % 360;
    avatar.style.backgroundImage =
      `linear-gradient(var(--bg2), var(--bg2)),
       conic-gradient(from ${angle}deg, var(--accent) 0deg, var(--accent2) 120deg, var(--accent3) 240deg, var(--accent) 360deg)`;
    requestAnimationFrame(tick);
  }
  // Only run if conic-gradient background is supported
  if (CSS.supports('background', 'conic-gradient(red, blue)')) tick();
})();

// ── Contact Form ─────────────────────────────
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('.btn-submit');
  const text = btn.querySelector('.btn-text');
  const icon = btn.querySelector('.btn-icon');
  text.textContent = 'Verzonden';
  icon.textContent = '✓';
  btn.disabled = true;
  formNote.textContent = '// Bericht ontvangen. Ik neem zo snel mogelijk contact op.';
  form.reset();
  setTimeout(() => {
    text.textContent = 'Versturen';
    icon.textContent = '→';
    btn.disabled = false;
    formNote.textContent = '';
  }, 5000);
});
