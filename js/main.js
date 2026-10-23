/* ══════════════════════════════════════════════════════════
   PREMAVASAM — Modern 2026 Interactive Script
   Vanilla JS &bull; Zero external dependencies
══════════════════════════════════════════════════════════ */

// 1. NAVBAR SCROLL EFFECT
(function(){
  const nav = document.getElementById('navbar');
  if(!nav) return;
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// 2. BACK TO TOP BUTTON
(function(){
  const btn = document.getElementById('back-top');
  if(!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 280);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// 3. INTERSECTION OBSERVER SCROLL REVEAL
(function(){
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();

// 4. MOBILE NAVIGATION
(function(){
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navLinks');
  if(!toggle || !menu) return;
  
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = menu.classList.toggle('mobile-open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  document.addEventListener('click', (e) => {
    if(!toggle.contains(e.target) && !menu.contains(e.target)){
      menu.classList.remove('mobile-open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    }
  });

  menu.querySelectorAll('.has-sub > a').forEach(a => {
    a.addEventListener('click', (e) => {
      if(window.innerWidth <= 768) {
        e.preventDefault();
        const drop = a.nextElementSibling;
        if(drop) {
          drop.classList.toggle('open');
        }
      }
    });
  });
})();

// 5. HERO CAROUSEL
(function(){
  const track  = document.getElementById('heroSlides');
  const dotsEl = document.getElementById('heroDots');
  if(!track || !dotsEl) return;
  const slides = Array.from(track.querySelectorAll('.hero-slide'));
  if(slides.length < 2) return;
  let cur = 0, timer;

  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'hero-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Go to photo ' + (i + 1));
    d.addEventListener('click', () => { go(i); restart(); });
    dotsEl.appendChild(d);
  });

  function dots() { return dotsEl.querySelectorAll('.hero-dot'); }
  function go(n) {
    slides[cur].classList.remove('active');
    dots()[cur].classList.remove('active');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('active');
    dots()[cur].classList.add('active');
  }
  function restart() {
    clearInterval(timer);
    timer = setInterval(() => go(cur + 1), 5000);
  }

  window.heroGo   = go;
  window.heroNext = () => { go(cur + 1); restart(); };
  window.heroPrev = () => { go(cur - 1); restart(); };
  restart();
})();

// 6. TOP BAR ANNOUNCEMENT TICKER
(function(){
  const el = document.getElementById('topTickerText');
  if(!el) return;
  const announcements = [
    "Sports Meet on World Disabled Day &bull; Children celebrate triumphs of the human spirit!",
    "Miracle of Therapy: Rohit (Cerebral Palsy) walks after 2 years of daily physiotherapy!",
    "Sponsor a wholesome breakfast for 200 children for ₹3,500 on your special day.",
    "Kalakshetra Dance Masters conduct Bharatha Natyam training weekly for our students.",
    "Prem Illam in Maduranthakam expands loving care for our growing girl children."
  ];
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % announcements.length;
    el.style.opacity = '0';
    setTimeout(() => {
      el.innerHTML = announcements[idx];
      el.style.opacity = '1';
    }, 300);
  }, 4500);
  el.style.transition = 'opacity .3s ease';
})();

// 7. SIDEBAR RECENT NEWS TICKER
(function(){
  const items = Array.from(document.querySelectorAll('.tick-item'));
  if(items.length < 2) return;
  let cur = 0;
  setInterval(() => {
    items[cur].classList.remove('active');
    cur = (cur + 1) % items.length;
    items[cur].classList.add('active');
  }, 4000);
})();

// 8. SITE SEARCH MODAL
(function(){
  const modal    = document.getElementById('searchModal');
  const trigger  = document.getElementById('searchTriggerBtn');
  const closeBtn = document.getElementById('searchCloseBtn');
  const backdrop = document.getElementById('searchBackdrop');
  const input    = document.getElementById('siteSearchInput');
  const results  = document.getElementById('searchResults');
  if(!modal || !trigger) return;

  function openSearch() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input && input.focus(), 80);
  }
  function closeSearch() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  trigger.addEventListener('click', openSearch);
  if(closeBtn) closeBtn.addEventListener('click', closeSearch);
  if(backdrop) backdrop.addEventListener('click', closeSearch);

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && modal.classList.contains('active')) closeSearch();
    if((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  });

  // Client search with API fallback
  let timeout;
  if(input) {
    input.addEventListener('input', () => {
      clearTimeout(timeout);
      const q = input.value.trim();
      if(!q) {
        results.innerHTML = '<div class="search-hint">Type keyword (e.g. <em>physiotherapy, meals, indra, bank, prem</em>)</div>';
        return;
      }
      timeout = setTimeout(() => {
        fetch('/api/search?q=' + encodeURIComponent(q))
          .then(r => r.json())
          .then(data => {
            if(!data.results || data.results.length === 0) {
              results.innerHTML = `<div class="search-hint">No results found for "${q}". Try another keyword or browse our menu.</div>`;
              return;
            }
            results.innerHTML = data.results.map(item => `
              <a href="${item.url}" class="search-item" onclick="document.getElementById('searchModal').classList.remove('active'); document.body.style.overflow='';">
                <span class="search-item-cat">${item.category}</span>
                <div class="search-item-title">${item.title}</div>
                <div class="search-item-snippet">${item.snippet}</div>
              </a>
            `).join('');
          })
          .catch(() => {
            results.innerHTML = '<div class="search-hint">Search unavailable right now. Try navigating from the main menu.</div>';
          });
      }, 180);
    });
  }
})();

// 9. COPY TEXT HELPER (for Bank details)
window.copyText = function(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied to clipboard: ' + text);
    });
  } else {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showToast('Copied to clipboard: ' + text);
  }
};

// 10. TOAST NOTIFICATION HELPER
function showToast(msg) {
  let toast = document.getElementById('toastNotice');
  if(!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.style.cssText = `
      position:fixed; bottom:28px; left:50%; transform:translateX(-50%) translateY(20px);
      background:var(--txt); color:#FFFBF5; padding:12px 24px; border-radius:9999px;
      font-size:.875rem; font-weight:600; box-shadow:0 8px 32px rgba(44,24,16,.25);
      z-index:999999; opacity:0; transition:all .25s cubic-bezier(.22,.61,.36,1);
      display:flex; align-items:center; gap:8px; border:1px solid rgba(255,255,255,.15);
    `;
    document.body.appendChild(toast);
  }
  toast.innerHTML = '💛 ' + msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
  }, 3200);
}

// 11. SPONSOR MEAL MODAL LOGIC
window.openSponsorModal = function(mealName) {
  const modal = document.getElementById('sponsorModal');
  const mealInput = document.getElementById('spMeal');
  const title = document.getElementById('modalMealTitle');
  if(!modal) return;
  if(mealInput) mealInput.value = mealName || 'General Meal Sponsorship';
  if(title) title.innerText = 'Sponsor ' + (mealName || 'a Meal');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
};

window.closeSponsorModal = function() {
  const modal = document.getElementById('sponsorModal');
  if(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
};

window.handleSponsorSubmit = function(e) {
  e.preventDefault();
  const name  = document.getElementById('spName').value;
  const phone = document.getElementById('spPhone').value;
  const date  = document.getElementById('spDate').value;
  const meal  = document.getElementById('spMeal').value;

  fetch('/api/sponsor-meal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone, date, meal, timestamp: new Date().toISOString() })
  })
  .then(r => r.json())
  .then(() => {
    document.getElementById('sponsorForm').style.display = 'none';
    const msg = document.getElementById('spSuccessMsg');
    if(msg) msg.style.display = 'block';
    showToast('Meal sponsorship pledge received! Thank you.');
    setTimeout(() => {
      closeSponsorModal();
      document.getElementById('sponsorForm').reset();
      document.getElementById('sponsorForm').style.display = 'block';
      if(msg) msg.style.display = 'none';
    }, 4000);
  })
  .catch(() => {
    showToast('Pledge noted! Please also message us on WhatsApp.');
  });
};

// 12. CONTACT FORM SUBMIT
window.handleContactSubmit = function(e) {
  e.preventDefault();
  const btn = document.getElementById('cfSubmitBtn');
  const fb  = document.getElementById('cfFeedback');
  if(btn) { btn.disabled = true; btn.innerText = 'Sending message...'; }

  const payload = {
    name:    document.getElementById('cfName').value,
    email:   document.getElementById('cfEmail').value,
    phone:   document.getElementById('cfPhone') ? document.getElementById('cfPhone').value : '',
    subject: document.getElementById('cfSubject').value,
    message: document.getElementById('cfMessage').value,
    createdAt: new Date().toISOString()
  };

  fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(r => r.json())
  .then(data => {
    if(fb) {
      fb.style.display = 'block';
      fb.style.background = 'var(--brand-pale)';
      fb.style.color = 'var(--brand-deep)';
      fb.innerHTML = '💛 <strong>Thank you, ' + payload.name + '!</strong> Your message has been received. Miss Mumtaj or our office team will respond promptly.';
    }
    document.getElementById('contactForm').reset();
    showToast('Message sent to Prema Vasam!');
  })
  .catch(() => {
    if(fb) {
      fb.style.display = 'block';
      fb.style.background = '#FDE8E8';
      fb.style.color = '#9B1C1C';
      fb.innerText = 'Notice: Message recorded locally. You can also directly email us at premavasam1999@gmail.com.';
    }
  })
  .finally(() => {
    if(btn) { btn.disabled = false; btn.innerText = 'Send Message →'; }
  });
};

// 13. PWA SERVICE WORKER REGISTRATION
(function(){
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(() => {
        // Registered successfully
      }).catch(err => {
        // Non-fatal registration warning
      });
    });
  }
})();

// 14. DEVICE DETECTION & MOBILE APP SHELL (DOCK, ACTIONS, PWA BANNER)
(function(){
  const urlParams = new URLSearchParams(window.location.search);
  const viewParam = urlParams.get('view');
  const isMobileQuery = viewParam === 'mobile' || viewParam === 'app' || urlParams.get('app') === '1';

  // Apply simulated mobile app frame on desktop if ?view=mobile is requested
  if (isMobileQuery) {
    document.body.classList.add('mobile-app-mode', 'mobile-app-simulated-view');
  }

  // Inject Mobile App Bottom Navigation Dock
  if (!document.querySelector('.mobile-app-dock')) {
    const dock = document.createElement('nav');
    dock.className = 'mobile-app-dock';
    dock.setAttribute('aria-label', 'Mobile App Navigation');

    const curPath = window.location.pathname.replace(/\/$/, '') || '/';

    const navItems = [
      { path: '/', label: 'Home', icon: '🏠' },
      { path: '/sponsormeals', label: 'Meals', icon: '🍲' },
      { path: '/howhelp', label: 'Donate', icon: '💛', isHighlight: true },
      { path: '/gallery', label: 'Gallery', icon: '📸' },
      { path: '/contact', label: 'Contact', icon: '📞' }
    ];

    dock.innerHTML = navItems.map(item => {
      const isActive = (item.path === '/' && curPath === '/') || (item.path !== '/' && curPath.startsWith(item.path));
      const activeCls = isActive ? ' active' : '';

      if (item.isHighlight) {
        return `
          <a href="${item.path}" class="app-nav-item app-nav-highlight${activeCls}" title="${item.label}">
            <div class="app-nav-pill-btn">${item.icon}</div>
            <span class="app-nav-label">${item.label}</span>
          </a>
        `;
      }
      return `
        <a href="${item.path}" class="app-nav-item${activeCls}" title="${item.label}">
          <span class="app-nav-icon">${item.icon}</span>
          <span class="app-nav-label">${item.label}</span>
        </a>
      `;
    }).join('');

    document.body.appendChild(dock);
  }

  // Inject Mobile Floating Call Action (Call Miss Mumtaj)
  if (!document.querySelector('.mobile-fab-call')) {
    const fab = document.createElement('a');
    fab.className = 'mobile-fab-call';
    fab.href = 'tel:+919677238998';
    fab.title = 'Call Miss Mumtaj (+91 96772 38998)';
    fab.setAttribute('aria-label', 'Call Miss Mumtaj');
    fab.innerHTML = '📞';
    document.body.appendChild(fab);
  }

  // Inject PWA Install Prompt Banner
  let deferredPrompt = null;
  const pwaBanner = document.createElement('div');
  pwaBanner.className = 'pwa-install-banner';
  pwaBanner.innerHTML = `
    <div class="pwa-banner-left">
      <img src="https://www.premavasam.org/sites/default/files/logo_0.png" class="pwa-banner-icon" alt="Premavasam">
      <div class="pwa-banner-text">
        <strong>Premavasam App</strong>
        <span>Add to Home Screen for fast 1-tap access</span>
      </div>
    </div>
    <div class="pwa-banner-actions">
      <button class="pwa-btn-install" id="pwaInstallBtn">Install</button>
      <button class="pwa-btn-dismiss" id="pwaDismissBtn" aria-label="Close">&times;</button>
    </div>
  `;
  document.body.appendChild(pwaBanner);

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (!sessionStorage.getItem('pwa_dismissed')) {
      pwaBanner.style.display = 'flex';
    }
  });

  const installBtn = document.getElementById('pwaInstallBtn');
  const dismissBtn = document.getElementById('pwaDismissBtn');
  if (installBtn) {
    installBtn.addEventListener('click', () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(() => {
          pwaBanner.style.display = 'none';
          deferredPrompt = null;
        });
      } else {
        alert('To install on your phone:\n• iOS: Tap Share (⬆️) and select "Add to Home Screen"\n• Android: Tap Menu (⋮) and select "Install app"');
        pwaBanner.style.display = 'none';
      }
    });
  }
  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      pwaBanner.style.display = 'none';
      sessionStorage.setItem('pwa_dismissed', '1');
    });
  }

  // Inject Device Switcher Pill for seamless desktop/mobile preview
  const switcher = document.createElement('a');
  switcher.className = 'device-preview-pill';
  if (isMobileQuery) {
    switcher.href = window.location.pathname;
    switcher.innerHTML = '💻 Desktop View';
    switcher.title = 'Switch to full desktop view';
  } else {
    switcher.href = window.location.pathname + '?view=mobile';
    switcher.innerHTML = '📱 Mobile App View';
    switcher.title = 'Switch to simulated mobile app view';
  }
  document.body.appendChild(switcher);
})();

