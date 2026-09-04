// Shared behavior across every page: nav, settings (name/logo/hero/socials),
// scroll effects, auth modal, mobile menu.

let SETTINGS = null;

async function loadSettings() {
  try {
    const res = await fetch('/api/settings');
    SETTINGS = await res.json();
  } catch (e) {
    SETTINGS = {};
  }
  applySettings();
}

function applySettings() {
  if (!SETTINGS) return;
  document.querySelectorAll('[data-site-name]').forEach(el => el.textContent = SETTINGS.site_name || 'Blaugrana Daily');
  document.querySelectorAll('[data-tagline]').forEach(el => el.textContent = SETTINGS.tagline || '');
  document.querySelectorAll('[data-contact-email]').forEach(el => { el.textContent = SETTINGS.contact_email || ''; el.href = 'mailto:' + (SETTINGS.contact_email || ''); });
  document.querySelectorAll('[data-contact-phone]').forEach(el => { el.textContent = SETTINGS.contact_phone || ''; el.href = 'tel:' + (SETTINGS.contact_phone || ''); });
  document.querySelectorAll('[data-facebook-url]').forEach(el => el.href = SETTINGS.facebook_url || '#');
  document.querySelectorAll('[data-tiktok-url]').forEach(el => el.href = SETTINGS.tiktok_url || '#');
  document.querySelectorAll('[data-instagram-url]').forEach(el => el.href = SETTINGS.instagram_url || '#');
  document.querySelectorAll('[data-twitter-url]').forEach(el => el.href = SETTINGS.twitter_url || '#');
  document.querySelectorAll('[data-youtube-url]').forEach(el => el.href = SETTINGS.youtube_url || '#');

  const logoEls = document.querySelectorAll('[data-logo]');
  logoEls.forEach(el => {
    if (SETTINGS.logo_url) {
      el.innerHTML = `<img src="${SETTINGS.logo_url}" alt="logo"> <span data-site-name>${SETTINGS.site_name || 'Blaugrana Daily'}</span>`;
    }
  });

  const heroMedia = document.querySelector('[data-hero-media]');
  if (heroMedia && SETTINGS.hero_media_url) {
    if (SETTINGS.hero_media_type === 'video') {
      heroMedia.innerHTML = `<video autoplay muted loop playsinline src="${SETTINGS.hero_media_url}"></video>`;
    } else {
      heroMedia.innerHTML = `<img src="${SETTINGS.hero_media_url}" alt="">`;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadSettings();

  const toTop = document.querySelector('.to-top');
  const progressBar = document.querySelector('.progress-bar');

  function updateToTop() {
    if (!toTop) return;
    if (window.scrollY > 500) toTop.classList.add('show');
    else toTop.classList.remove('show');
  }
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  function updateProgressBar() {
    if (!progressBar) return;
    const article = document.querySelector('.article-body');
    if (!article) return;
    const total = article.offsetHeight - window.innerHeight * 0.6;
    const scrolled = window.scrollY - article.offsetTop + window.innerHeight * 0.6;
    progressBar.style.width = Math.min(100, Math.max(0, (scrolled / total) * 100)) + '%';
  }

  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (nav) {
      if (window.scrollY > 30) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    }
    updateProgressBar();
    updateToTop();
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.textContent = links.classList.contains('open') ? '✕' : '☰';
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.textContent = '☰';
    }));
  }

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  document.querySelectorAll('form[data-demo-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = form.parentElement.querySelector('.form-success') || form.nextElementSibling;
      if (success && success.classList.contains('form-success')) success.classList.add('show');
      form.reset();
    });
  });

  initAuthWidget();

  const footerForm = document.getElementById('footer-newsletter-form');
  if (footerForm) {
    footerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('footer-newsletter-email').value;
      const btn = footerForm.querySelector('button');
      const original = btn.textContent;
      try {
        const res = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
        btn.textContent = res.ok ? "You're in!" : 'Try again';
      } catch (e) {
        btn.textContent = 'Try again';
      }
      footerForm.reset();
      setTimeout(() => { btn.textContent = original; }, 2500);
    });
  }
});

// ===== Reader sign-up / login widget =====
function initAuthWidget() {
  const authArea = document.getElementById('auth-area');
  if (!authArea) return;

  async function refresh() {
    const res = await fetch('/api/me-user');
    const data = await res.json();
    if (data.loggedIn) {
      authArea.innerHTML = `<span class="nav-greeting" style="font-size:.85rem; color:var(--paper-dim);">Hi, ${data.name}</span> <a href="profile.html" class="nav-btn">Profile</a> <button class="nav-btn" id="logout-user-btn">Log out</button>`;
      document.getElementById('logout-user-btn').addEventListener('click', async () => {
        await fetch('/api/logout-user', { method: 'POST' });
        refresh();
      });
    } else {
      authArea.innerHTML = `<button class="nav-btn primary" id="open-auth-modal">Sign up / Log in</button>`;
      document.getElementById('open-auth-modal').addEventListener('click', () => {
        document.getElementById('auth-modal').classList.add('show');
      });
    }
  }
  refresh();
  window.refreshAuthWidget = refresh;

  const modal = document.getElementById('auth-modal');
  if (!modal) return;
  modal.querySelectorAll('.modal-close, .modal-overlay').forEach(el => {
    el.addEventListener('click', (e) => { if (e.target === el || e.target.classList.contains('modal-close')) modal.classList.remove('show'); });
  });

  const loginForm = document.getElementById('login-form-modal');
  const signupForm = document.getElementById('signup-form-modal');
  const showSignup = document.getElementById('show-signup');
  const showLogin = document.getElementById('show-login');
  if (showSignup) showSignup.addEventListener('click', () => { loginForm.style.display = 'none'; signupForm.style.display = 'flex'; });
  if (showLogin) showLogin.addEventListener('click', () => { signupForm.style.display = 'none'; loginForm.style.display = 'flex'; });

  if (loginForm) loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email-modal').value;
    const password = document.getElementById('login-password-modal').value;
    const res = await fetch('/api/login-user', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    const data = await res.json();
    const err = document.getElementById('login-error-modal');
    if (res.ok) { modal.classList.remove('show'); refresh(); } else { err.textContent = data.error; err.style.display = 'block'; }
  });

  if (signupForm) signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('name', document.getElementById('signup-name-modal').value);
    fd.append('username', document.getElementById('signup-username-modal').value);
    fd.append('email', document.getElementById('signup-email-modal').value);
    fd.append('password', document.getElementById('signup-password-modal').value);
    const fileInput = document.getElementById('signup-avatar-modal');
    if (fileInput.files[0]) fd.append('avatar', fileInput.files[0]);

    const res = await fetch('/api/signup', { method: 'POST', body: fd });
    const data = await res.json();
    const err = document.getElementById('signup-error-modal');
    if (res.ok) { modal.classList.remove('show'); refresh(); } else { err.textContent = data.error; err.style.display = 'block'; }
  });
}
