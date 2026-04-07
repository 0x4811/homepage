/* =============================================
   WOUTER SLOTBOOM — main.js
   ============================================= */

// ── Dark / Light Mode ────────────────────────
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const stored = localStorage.getItem('theme');

// Apply saved or system preference
if (stored === 'light' || (!stored && window.matchMedia('(prefers-color-scheme: light)').matches)) {
  html.classList.add('light');
}

themeBtn.addEventListener('click', () => {
  html.classList.toggle('light');
  localStorage.setItem('theme', html.classList.contains('light') ? 'light' : 'dark');
});

// ── Hero Name Stagger ─────────────────────────
(function staggerHeroName() {
  const lines = document.querySelectorAll('.hero-name .line');
  let globalIndex = 0;
  const BASE_DELAY = 0.06; // seconds per character
  const LINE_OFFSET = 0.1; // extra delay between lines

  lines.forEach((line, li) => {
    if (line.classList.contains('accent-line')) {
      // Animate accent-line as ONE block — do NOT split into chars,
      // otherwise background-clip:text on the parent stops working.
      const span = document.createElement('span');
      span.className = 'hero-char';
      span.textContent = line.textContent;
      span.style.animationDelay = `${0.1 + li * LINE_OFFSET}s`;
      line.textContent = '';
      line.appendChild(span);
    } else {
      const text = line.textContent;
      line.textContent = '';
      [...text].forEach((char, ci) => {
        const span = document.createElement('span');
        span.className = 'hero-char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${0.1 + li * LINE_OFFSET + ci * BASE_DELAY}s`;
        line.appendChild(span);
      });
    }
  });
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
  entries.forEach(entry => {
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

// ── Avatar ring spin ─────────────────────────
(function spinRing() {
  const avatar = document.querySelector('.avatar-inner');
  if (!avatar || !CSS.supports('background', 'conic-gradient(red, blue)')) return;
  let angle = 0;
  function tick() {
    angle = (angle + 0.3) % 360;
    avatar.style.backgroundImage =
      `linear-gradient(var(--bg2), var(--bg2)),
       conic-gradient(from ${angle}deg, var(--accent) 0deg, var(--accent2) 120deg, var(--accent3) 240deg, var(--accent) 360deg)`;
    requestAnimationFrame(tick);
  }
  tick();
})();

// ── Contact Form → Cloudflare Worker ─────────
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const btn  = form.querySelector('.btn-submit');
  const text = btn.querySelector('.btn-text');
  const icon = btn.querySelector('.btn-icon');

  btn.disabled = true;
  text.textContent = 'Verzenden…';

  const data = {
    name:    form.name.value.trim(),
    email:   form.email.value.trim(),
    subject: form.subject.value,
    message: form.message.value.trim()
  };

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      text.textContent = 'Verzonden';
      icon.textContent = '✓';
      formNote.textContent = '// Bericht ontvangen. Ik neem zo snel mogelijk contact op.';
      formNote.style.color = 'var(--accent)';
      form.reset();
    } else {
      throw new Error('server');
    }
  } catch {
    // Fallback: open mailto
    const mailto = `mailto:contact@wouterslotboom.nl?subject=${encodeURIComponent(data.subject || 'Contactformulier')}&body=${encodeURIComponent(`Naam: ${data.name}\n\n${data.message}`)}`;
    window.location.href = mailto;
    formNote.textContent = '// E-mailclient geopend als fallback.';
    formNote.style.color = 'var(--accent2)';
    text.textContent = 'Versturen';
    icon.textContent = '→';
    btn.disabled = false;
  }

  setTimeout(() => {
    if (text.textContent === 'Verzonden') {
      text.textContent = 'Versturen';
      icon.textContent = '→';
      btn.disabled = false;
      formNote.textContent = '';
    }
  }, 6000);
});
