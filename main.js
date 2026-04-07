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

// ── Language / i18n ──────────────────────────
const translations = {
  nl: {
    'nav.about': 'Over mij', 'nav.services': 'Diensten',
    'hero.tag': 'Ethisch Hacker & Security Trainer',
    'hero.sub': 'Ik laat zien hoe kwetsbaar jouw digitale wereld is<br>\u2014 <em>voordat een ander dat doet.</em>',
    'hero.cta1': 'Bekijk mijn werk', 'hero.cta2': 'Boek een lezing',
    'about.badge': 'Beschikbaar voor lezingen',
    'about.meta.location': 'Basis',
    'about.meta.focus': 'Focus', 'about.meta.focus.val': 'WiFi \u00b7 IoT \u00b7 Domeinen',
    'about.meta.languages': 'Talen',
    'about.label': 'Over mij',
    'about.heading': 'Ik hack om te <span class="text-accent">beschermen</span>',
    'about.lead': 'Met \u20AC70 aan hardware en een laptop onderschepte ik in 20 minuten de inloggegevens van tientallen willekeurige caf\u00e9bezoekers in Amsterdam \u2014 en liet dit zien in De Correspondent. Het artikel werd het meest gelezen stuk dat ze ooit publiceerden.',
    'about.body1': 'Ik zoek kwetsbaarheden in netwerken, systemen en domeinen en leg die bloot via concrete demonstraties. Niet met theorie\u00ebn, maar live: voor bedrijven, op conferenties en in de media. Altijd met \u00e9\u00e9n doel \u2014 het beter maken.',
    'about.body2': 'Van verlopen politiedomeinen die vertrouwelijke e-mail doorstuurden tot onbeveiligde IoT-apparaten van willekeurige Nederlanders: ik meld het, ik laat het zien, en als het kan geef ik ook de oplossing mee.',
    'stats.s1': 'Om tientallen bezoekers in een caf\u00e9 te hacken',
    'stats.s2': 'Aan apparatuur genoeg om een heel netwerk af te luisteren',
    'stats.s3': 'Politie-e-mail ontvangen via verlopen domeinnamen', 'stats.s3.sfx': 'mnd',
    'media.label': 'In de media',
    'media.heading': 'Onderzoeken die <span class="text-accent">Nederland wakker</span> schudden',
    'bento.dc1.title': 'Dit geef je allemaal prijs als je inlogt op een openbaar wifinetwerk',
    'bento.dc1.desc': 'Het meest gelezen artikel van De Correspondent ooit. In 20 minuten onderschepte ik inloggegevens van tientallen caf\u00e9bezoekers in Amsterdam. Overgenomen door Quartz, Matter en media in tientallen landen.',
    'bento.dc1.t3': 'Internationaal', 'bento.read.long': 'Lees artikel \u2192', 'bento.read': 'Lees \u2192', 'bento.watch': 'Bekijk \u2192',
    'bento.nos.title': 'Hacker kreeg e-mail voor politie binnen',
    'bento.nos.desc': 'Via verlopen domeinnamen ontving ik anderhalf jaar lang vertrouwelijke politie-e-mails \u2014 arrestatiebevelen en jeugdzorgdossiers.',
    'bento.tag.police': 'Politie', 'bento.tag.parliament': 'Kamervragen',
    'bento.bnr1.title': 'Politiegeheimen liggen op straat',
    'bento.bnr1.desc': 'Twee jaar na mijn waarschuwing nog steeds kwetsbaar. Leidde tot Kamervragen.',
    'bento.tc.desc': 'Engelse vertaling. Aanleiding voor security-campagnes wereldwijd.',
    'bento.brandpunt.title': 'Betrapt door wifi',
    'bento.brandpunt.desc': 'Live televisiedemonstratie voor KRO Brandpunt: in real-time data onderscheppen van voorbijgangers via een nep-netwerk.',
    'bento.bnr2.title': 'Politie vraagt domeinnamen terug van hacker',
    'bento.bnr2.desc': 'Na publicatie nam de politie contact op. Ik gaf ze terug \u2014 gratis. Het doel was bereikt.',
    'bento.dc2.title': 'Zo begluur en bestuur je Nederland vanachter je laptop',
    'bento.dc2.desc': 'Via Shodan vond ik duizenden onbeveiligde Nederlandse beveiligingscamera\u2019s, NAS-servers vol paspoorten en contracten, en industri\u00eble systemen die ik bewust niet heb aangeraakt. \u201cIk vind het letterlijk levensgevaarlijk.\u201d',
    'speaking.label': 'Optredens & Lezingen',
    'speaking.heading': 'Cybersecurity die <span class="text-accent">blijft hangen</span>',
    'speaking.r1.title': 'Keynotes & Conferenties',
    'speaking.r1.desc': 'Spreker op o.a. <strong>Conversion Hotel 2017</strong>. Live demonstraties met WiFi Pineapple \u2014 data van mensen in de zaal, real-time op het scherm. Het publiek verlaat de zaal anders dan het binnenkwam.',
    'speaking.r2.desc': 'Live optredens bij <strong>RTL Nieuws</strong>, <strong>KRO Brandpunt</strong> en <strong>BNR Nieuwsradio</strong>. Beschikbaar voor studio-optredens, live demonstraties en toelichting bij actuele security-incidenten.',
    'speaking.r3.title': 'Security Awareness Training',
    'speaking.r3.desc': 'Praktische sessies voor teams en organisaties. Geen droge theorie \u2014 maar een \u20AC70-apparaatje, een laptop en de live data van de mensen in de zaal. Dat maakt indruk.',
    'speaking.r4.desc': 'Ethische hacking voor netwerken, applicaties en infrastructuur. Concreet rapport, heldere aanbevelingen, geen jargon.',
    'speaking.quote': '\u201cWat mensen niet zien,<br>vinden ze niet zo eng.<br><span class="text-accent">Daarom laat ik het zien.</span>\u201d',
    'contact.heading': 'Laten we <span class="text-accent">praten</span>',
    'contact.intro': 'Een lezing, een demonstratie, een pentest \u2014 of heb je een tip over een beveiligingslek?',
    'contact.ci1.title': 'Lezing / Keynote', 'contact.ci1.desc': 'Live hack-demonstraties voor elk publiek',
    'contact.ci2.title': 'Pentest / Security Audit', 'contact.ci2.desc': 'Ik zoek de zwakke plekken v\u00f3\u00f3r anderen dat doen',
    'contact.ci3.title': 'Media & Pers', 'contact.ci3.desc': 'Beschikbaar voor interviews en achtergrond',
    'form.name': 'Naam', 'form.name.ph': 'Jouw naam',
    'form.email': 'E-mail', 'form.email.ph': 'jouw@email.nl',
    'form.subject': 'Ik wil graag\u2026',
    'form.opt0': 'Selecteer een onderwerp', 'form.opt1': 'Een lezing of keynote boeken',
    'form.opt2': 'Een bedrijfstraining aanvragen', 'form.opt3': 'Een penetration test bespreken',
    'form.opt4': 'Een media-interview plannen', 'form.opt5': 'Een beveiligingslek melden', 'form.opt6': 'Iets anders',
    'form.message': 'Bericht', 'form.message.ph': 'Vertel me meer\u2026',
    'form.submit': 'Versturen', 'form.sending': 'Verzenden\u2026', 'form.sent': 'Verzonden',
    'form.success': '// Bericht ontvangen. Ik neem zo snel mogelijk contact op.',
    'form.fallback': '// E-mailclient geopend als fallback.',
    'footer.tagline': 'Ethisch Hacker & Security Trainer',
  },
  en: {
    'nav.about': 'About', 'nav.services': 'Services',
    'hero.tag': 'Ethical Hacker & Security Trainer',
    'hero.sub': 'I show how vulnerable your digital world is<br>\u2014 <em>before someone else does.</em>',
    'hero.cta1': 'See my work', 'hero.cta2': 'Book a talk',
    'about.badge': 'Available for speaking',
    'about.meta.location': 'Location',
    'about.meta.focus': 'Focus', 'about.meta.focus.val': 'WiFi \u00b7 IoT \u00b7 Domains',
    'about.meta.languages': 'Languages',
    'about.label': 'About',
    'about.heading': 'I hack to <span class="text-accent">protect</span>',
    'about.lead': 'With \u20AC70 in hardware and a laptop, I intercepted the login credentials of dozens of random caf\u00e9 visitors in Amsterdam in 20 minutes \u2014 and demonstrated this in De Correspondent. The article became the most-read piece they ever published.',
    'about.body1': 'I find vulnerabilities in networks, systems and domains and expose them through concrete demonstrations. Not with theories, but live: for companies, at conferences, and in the media. Always with one goal \u2014 making things better.',
    'about.body2': 'From expired police domains forwarding confidential emails to unsecured IoT devices belonging to random Dutch citizens: I report it, I show it, and when possible I include the solution.',
    'stats.s1': 'To intercept login credentials of dozens of caf\u00e9 visitors',
    'stats.s2': 'Worth of equipment to eavesdrop on an entire network',
    'stats.s3': 'Police emails received via expired domain names', 'stats.s3.sfx': 'mo',
    'media.label': 'In the media',
    'media.heading': 'Investigations that <span class="text-accent">shook the Netherlands</span>',
    'bento.dc1.title': 'What you reveal when logging on to a public WiFi network',
    'bento.dc1.desc': 'The most-read article De Correspondent ever published. In 20 minutes I intercepted login credentials from dozens of caf\u00e9 visitors in Amsterdam. Picked up by Quartz, Matter, and media in dozens of countries.',
    'bento.dc1.t3': 'International', 'bento.read.long': 'Read article \u2192', 'bento.read': 'Read \u2192', 'bento.watch': 'Watch \u2192',
    'bento.nos.title': 'Hacker intercepted confidential police emails',
    'bento.nos.desc': 'Via expired domain names I received confidential police emails for 18 months \u2014 arrest warrants and youth care files.',
    'bento.tag.police': 'Police', 'bento.tag.parliament': 'Parliament',
    'bento.bnr1.title': 'Police secrets out in the open',
    'bento.bnr1.desc': 'Still vulnerable two years after my warning. Led to parliamentary questions.',
    'bento.tc.desc': 'English translation. Prompted security awareness campaigns worldwide.',
    'bento.brandpunt.title': 'Caught by WiFi',
    'bento.brandpunt.desc': 'Live TV demonstration for KRO Brandpunt: intercepting data from passers-by via a rogue network in real-time.',
    'bento.bnr2.title': 'Police reclaims domain names from hacker',
    'bento.bnr2.desc': 'After publication the police got in touch. I gave them back \u2014 for free. The goal was achieved.',
    'bento.dc2.title': 'How to spy on and control the Netherlands from your laptop',
    'bento.dc2.desc': 'Via Shodan I found thousands of unsecured Dutch security cameras, NAS servers full of passports and contracts, and industrial systems I deliberately left untouched. \u201cI find it literally life-threatening.\u201d',
    'speaking.label': 'Speaking & Events',
    'speaking.heading': 'Cybersecurity that <span class="text-accent">sticks</span>',
    'speaking.r1.title': 'Keynotes & Conferences',
    'speaking.r1.desc': 'Speaker at events including <strong>Conversion Hotel 2017</strong>. Live demonstrations with a WiFi Pineapple \u2014 intercepting data from people in the audience in real-time. The audience leaves differently than they arrived.',
    'speaking.r2.desc': 'Live appearances on <strong>RTL News</strong>, <strong>KRO Brandpunt</strong> and <strong>BNR Newsradio</strong>. Available for studio appearances, live demonstrations and commentary on current security incidents.',
    'speaking.r3.title': 'Security Awareness Training',
    'speaking.r3.desc': 'Practical sessions for teams and organizations. No dry theory \u2014 just a \u20AC70 device, a laptop, and the live data of the people in the room. That makes an impression.',
    'speaking.r4.desc': 'Ethical hacking for networks, applications and infrastructure. Concrete report, clear recommendations, no jargon.',
    'speaking.quote': '\u201cWhat people can\u2019t see,<br>they don\u2019t fear.<br><span class="text-accent">That\u2019s why I show it.</span>\u201d',
    'contact.heading': 'Let\u2019s <span class="text-accent">talk</span>',
    'contact.intro': 'A keynote, a demonstration, a pentest \u2014 or do you have a tip about a security vulnerability?',
    'contact.ci1.title': 'Keynote / Speaking', 'contact.ci1.desc': 'Live hack demonstrations for any audience',
    'contact.ci2.title': 'Pentest / Security Audit', 'contact.ci2.desc': 'I find the weak spots before others do',
    'contact.ci3.title': 'Media & Press', 'contact.ci3.desc': 'Available for interviews and background',
    'form.name': 'Name', 'form.name.ph': 'Your name',
    'form.email': 'Email', 'form.email.ph': 'your@email.com',
    'form.subject': "I'd like to\u2026",
    'form.opt0': 'Select a topic', 'form.opt1': 'Book a keynote or speaking engagement',
    'form.opt2': 'Request a security awareness training', 'form.opt3': 'Discuss a penetration test',
    'form.opt4': 'Schedule a media interview', 'form.opt5': 'Report a security vulnerability', 'form.opt6': 'Something else',
    'form.message': 'Message', 'form.message.ph': 'Tell me more\u2026',
    'form.submit': 'Send', 'form.sending': 'Sending\u2026', 'form.sent': 'Sent',
    'form.success': '// Message received. I\'ll be in touch shortly.',
    'form.fallback': '// Email client opened as fallback.',
    'footer.tagline': 'Ethical Hacker & Security Trainer',
  }
};

let currentLang = localStorage.getItem('lang') || 'nl';

function applyLang(lang) {
  const t = translations[lang];
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = t[el.dataset.i18n];
    if (v !== undefined) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const v = t[el.dataset.i18nHtml];
    if (v !== undefined) el.innerHTML = v;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const v = t[el.dataset.i18nPlaceholder];
    if (v !== undefined) el.placeholder = v;
  });
  document.querySelectorAll('.lang-opt').forEach(o => {
    o.classList.toggle('active', o.dataset.lang === lang);
  });
}

applyLang(currentLang);

document.getElementById('langToggle').addEventListener('click', () => {
  currentLang = currentLang === 'nl' ? 'en' : 'nl';
  localStorage.setItem('lang', currentLang);
  applyLang(currentLang);
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


// ── Contact Form → Cloudflare Worker ─────────
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const btn  = form.querySelector('.btn-submit');
  const text = btn.querySelector('.btn-text');
  const icon = btn.querySelector('.btn-icon');

  btn.disabled = true;
  text.textContent = translations[currentLang]['form.sending'];

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
      text.textContent = translations[currentLang]['form.sent'];
      icon.textContent = '✓';
      formNote.textContent = translations[currentLang]['form.success'];
      formNote.style.color = 'var(--accent)';
      form.reset();
    } else {
      throw new Error('server');
    }
  } catch {
    // Fallback: open mailto
    const mailto = `mailto:contact@wouterslotboom.nl?subject=${encodeURIComponent(data.subject || 'Contactformulier')}&body=${encodeURIComponent(`Naam: ${data.name}\n\n${data.message}`)}`;
    window.location.href = mailto;
    formNote.textContent = translations[currentLang]['form.fallback'];
    formNote.style.color = 'var(--accent2)';
    text.textContent = translations[currentLang]['form.submit'];
    icon.textContent = '→';
    btn.disabled = false;
  }

  setTimeout(() => {
    if (text.textContent === 'Verzonden') {
      text.textContent = translations[currentLang]['form.submit'];
      icon.textContent = '→';
      btn.disabled = false;
      formNote.textContent = '';
    }
  }, 6000);
});
