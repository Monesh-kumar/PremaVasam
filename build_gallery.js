const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

const GALLERY_DATA = [
  // Happy Schooling
  {
    src: '/images/gallery/school_1.jpg',
    category: 'school',
    catLabel: 'Happy Schooling',
    title: 'Classroom Learning with Smiles',
    desc: 'Students engaged in classroom coaching and reading activities with specialized attention.'
  },
  {
    src: '/images/gallery/school_2.jpg',
    category: 'school',
    catLabel: 'Happy Schooling',
    title: 'Creative Art & Education Sessions',
    desc: 'Expressive learning, drawings and colorful notebooks encouraging independent expression.'
  },
  {
    src: '/images/gallery/school_3.jpg',
    category: 'school',
    catLabel: 'Happy Schooling',
    title: 'Collaborative Group Study',
    desc: 'Children working side-by-side, sharing learning materials and building supportive friendships.'
  },
  {
    src: '/images/gallery/school_4.jpg',
    category: 'school',
    catLabel: 'Happy Schooling',
    title: 'Sensory Teaching & Skill Development',
    desc: 'Hands-on educational tools customized for children with varied developmental milestones.'
  },
  {
    src: '/images/gallery/school_5.jpg',
    category: 'school',
    catLabel: 'Happy Schooling',
    title: 'Focused Coaching & Guidance',
    desc: 'Devoted special educators guiding individual students through reading, writing and numbers.'
  },

  // Diwali 2024
  {
    src: '/images/gallery/diwali_1.jpg',
    category: 'diwali',
    catLabel: 'Diwali 2024',
    title: 'Festival of Lights & Smiles',
    desc: 'Children celebrating Diwali with bright festive traditional attires and sparkling joy.'
  },
  {
    src: '/images/gallery/diwali_2.jpg',
    category: 'diwali',
    catLabel: 'Diwali 2024',
    title: 'Sweet Distributions & Festivities',
    desc: 'Sharing sweets and savoring delicious traditional snacks on auspicious Diwali evening.'
  },
  {
    src: '/images/gallery/diwali_3.jpg',
    category: 'diwali',
    catLabel: 'Diwali 2024',
    title: 'Joyful Gathering in New Clothes',
    desc: 'Generous donors provided brand-new festive clothing for all children to celebrate in dignity.'
  },
  {
    src: '/images/gallery/diwali_4.jpg',
    category: 'diwali',
    catLabel: 'Diwali 2024',
    title: 'Lighting Diyas & Lamps',
    desc: 'Tender hands lighting traditional oil lamps across our Gerugambakkam campus courtyard.'
  },
  {
    src: '/images/gallery/diwali_5.jpg',
    category: 'diwali',
    catLabel: 'Diwali 2024',
    title: 'Evening Celebration & Music',
    desc: 'Children and staff gathered together in unity, laughter and devotional singing.'
  },
  {
    src: '/images/gallery/diwali_6.jpg',
    category: 'diwali',
    catLabel: 'Diwali 2024',
    title: 'Diwali Sparkles & Memories',
    desc: 'Memorable candid moments of joy, illuminating every corner of Prema Vasam.'
  },

  // Sports Meet 2023
  {
    src: '/images/gallery/sports_1.jpg',
    category: 'sports',
    catLabel: 'Sports Meet',
    title: 'World Disabled Day 2023 &bull; Opening Ceremony',
    desc: 'Annual sports meet kick-off celebrating athletic resilience, team spirit and determination.'
  },
  {
    src: '/images/gallery/sports_2.jpg',
    category: 'sports',
    catLabel: 'Sports Meet',
    title: 'Track Events & Running Drills',
    desc: 'Children with cerebral palsy and challenges giving their absolute best on the running track.'
  },
  {
    src: '/images/gallery/sports_3.jpg',
    category: 'sports',
    catLabel: 'Sports Meet',
    title: 'Wheelchair & Adaptive Races',
    desc: 'Encouraging every child to race, cross the finish line, and rejoice in active movement.'
  },
  {
    src: '/images/gallery/sports_4.jpg',
    category: 'sports',
    catLabel: 'Sports Meet',
    title: 'Team Games & Cheering Squad',
    desc: 'Volunteers, staff, and classmates cheering vigorously for their triumphant peers.'
  },
  {
    src: '/images/gallery/sports_5.jpg',
    category: 'sports',
    catLabel: 'Sports Meet',
    title: 'Medal & Trophy Ceremony',
    desc: 'Every participant awarded medals and certificates celebrating their human courage.'
  },
  {
    src: '/images/gallery/sports_6.jpg',
    category: 'sports',
    catLabel: 'Sports Meet',
    title: 'Triumphant Group Celebration',
    desc: 'Proud smiles, holding their medals high with unmatched enthusiasm and self-belief.'
  },

  // Our Beautiful Children
  {
    src: '/images/gallery/children_1.jpg',
    category: 'children',
    catLabel: 'Our Children',
    title: 'Radiant Morning Smiles',
    desc: 'Daily life at Prema Vasam begins with tender greetings, prayers and affectionate care.'
  },
  {
    src: '/images/gallery/children_2.jpg',
    category: 'children',
    catLabel: 'Our Children',
    title: 'Courtyard Laughter & Play',
    desc: 'Safe, protected open grounds where special children play freely without judgment.'
  },
  {
    src: '/images/gallery/children_3.jpg',
    category: 'children',
    catLabel: 'Our Children',
    title: 'Tender Companionship',
    desc: 'Children forming lifelong brotherly and sisterly bonds, helping one another every day.'
  },
  {
    src: '/images/gallery/children_4.jpg',
    category: 'children',
    catLabel: 'Our Children',
    title: 'Moments of Wonder & Joy',
    desc: 'Candid smiles proving that love and acceptance are the greatest healers of all trauma.'
  },
  {
    src: '/images/gallery/children_5.jpg',
    category: 'children',
    catLabel: 'Our Children',
    title: 'Embraced by Love',
    desc: 'Every single child who enters Prema Vasam finds a permanent home in our hearts.'
  }
];

function getNav(activePage = '') {
  const isActive = (p) => activePage === p ? 'active' : '';
  return `
<!-- ══ TOP ANNOUNCEMENT TICKER ═════════════════════════════ -->
<div class="top-bar">
  <div class="top-bar-inner">
    <div class="top-badge">💛 A Home of Love Since 1999</div>
    <div class="top-ticker" aria-live="polite">
      <span class="ticker-dot"></span>
      <span class="ticker-text" id="topTickerText">Sports Meet on World Disabled Day &bull; Rohit (Cerebral Palsy) walks after 2 years of physiotherapy!</span>
    </div>
    <div class="top-contact-quick">
      <a href="tel:+919677238998">📞 +91 96772 38998</a>
      <span class="sep">&bull;</span>
      <a href="mailto:premavasam1999@gmail.com">✉️ premavasam1999@gmail.com</a>
    </div>
  </div>
</div>

<!-- ══ NAVBAR ══════════════════════════════════════════════ -->
<header id="navbar">
  <div class="nav-wrap">
    <a href="/" class="nav-logo" aria-label="Premavasam Home">
      <img class="logo-img" src="/images/logo.png" alt="Premavasam Logo">
      <div class="logo-brand">
        <span class="logo-name">PREMAVASAM</span>
        <span class="logo-sub">Where Love Resides &bull; Est. 1999</span>
      </div>
    </a>

    <div class="nav-spacer"></div>

    <ul class="nav-links" id="navLinks" role="menubar">
      <li><a href="/" class="${isActive('home')}" role="menuitem">Home</a></li>
      
      <li class="has-sub">
        <a href="/about" class="${isActive('about')}" role="menuitem">About Us</a>
        <ul class="nav-drop" role="menu">
          <li><a href="/about" class="${isActive('about')}">Who We Are</a></li>
          <li><a href="/projects" class="${isActive('projects')}">Our Projects</a></li>
          <li><a href="/achievements" class="${isActive('achievements')}">Achievements</a></li>
        </ul>
      </li>

      <li><a href="/activities" class="${isActive('activities')}" role="menuitem">Activities</a></li>

      <li><a href="/gallery" class="${isActive('gallery')}" role="menuitem">Gallery</a></li>

      <li class="has-sub">
        <a href="/volunteers" class="${isActive('echo')}" role="menuitem">Echo</a>
        <ul class="nav-drop" role="menu">
          <li><a href="/volunteers" class="${isActive('volunteers')}">Volunteers' Love</a></li>
          <li><a href="/press" class="${isActive('press')}">Press &amp; Media</a></li>
        </ul>
      </li>

      <li class="has-sub">
        <a href="/sponsormeals" class="${isActive('shoulder')}" role="menuitem">Shoulder Us</a>
        <ul class="nav-drop" role="menu">
          <li><a href="/sponsormeals" class="${isActive('sponsormeals')}">🍲 Sponsor Meals</a></li>
          <li><a href="/sharecare" class="${isActive('sharecare')}">🎁 Share &amp; Care</a></li>
          <li><a href="/howhelp" class="${isActive('howhelp')}">💳 Bank &amp; NRI Transfer</a></li>
        </ul>
      </li>

      <li><a href="/contact" class="${isActive('contact')}" role="menuitem">Contact</a></li>
    </ul>

    <div class="nav-actions">
      <button class="search-trigger" id="searchTriggerBtn" title="Search Premavasam" aria-label="Open search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      </button>
      <a href="/howhelp" class="nav-cta">
        <span>Donate Now</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
      </a>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>

<!-- ══ SEARCH MODAL ════════════════════════════════════════ -->
<div class="search-modal" id="searchModal" role="dialog" aria-modal="true" aria-label="Search site">
  <div class="search-modal-backdrop" id="searchBackdrop"></div>
  <div class="search-modal-card">
    <div class="search-input-wrap">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      <input type="search" id="siteSearchInput" placeholder="Search activities, donations, history, projects..." autocomplete="off">
      <button id="searchCloseBtn" class="search-close-btn" aria-label="Close search">&times;</button>
    </div>
    <div id="searchResults" class="search-results-list">
      <div class="search-hint">Type keyword (e.g. <em>physiotherapy, meals, indra, bank, prem</em>)</div>
    </div>
  </div>
</div>
`;
}

function getFooter() {
  return `
<!-- ══ FOOTER ══════════════════════════════════════════════ -->
<footer id="footer">
  <div class="footer-warm-banner">
    <div class="footer-warm-inner">
      <div class="footer-warm-text">
        <span class="f-eyebrow">♥ MAKE A DIRECT IMPACT TODAY</span>
        <h3>Every child who knocks on our door is embraced with tender love.</h3>
        <p>No contribution is too small. Together, we can provide physiotherapy, warm nutrition, education, and eternal dignity.</p>
      </div>
      <div class="footer-warm-actions">
        <a href="/sponsormeals" class="btn btn-primary">🍲 Sponsor a Meal Today</a>
        <a href="/howhelp" class="btn btn-outline-light">Bank &amp; NRI Details</a>
      </div>
    </div>
  </div>

  <div class="footer-grid">
    <div class="footer-brand-col">
      <a href="/" class="f-logo-link">
        <img src="/images/logo.png" alt="Premavasam">
        <div>
          <h4>PREMAVASAM</h4>
          <span>A Home Where Love Resides</span>
        </div>
      </a>
      <p class="f-mission">
        A registered charitable residential home caring for 200+ mentally challenged, differently-abled, and less-fortunate children in Chennai.
      </p>
      <div class="f-reg-info">
        <span>📜 Registered Charitable Trust Act: <strong>No. 419 of 1999</strong></span>
        <span>🇮🇳 100% Non-Profit Organization &bull; FCRA Approved</span>
      </div>
    </div>

    <div class="footer-col">
      <h4>Our Mission</h4>
      <ul>
        <li><a href="/about">About Prema Vasam &bull; Who We Are</a></li>
        <li><a href="/projects">Our Projects &bull; Prem Niketan &amp; Prem Illam</a></li>
        <li><a href="/achievements">Milestones &amp; Dreams</a></li>
        <li><a href="/activities">Therapies &amp; Education</a></li>
        <li><a href="/gallery">Photo Gallery &amp; Albums</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>Shoulder Us</h4>
      <ul>
        <li><a href="/sponsormeals">Sponsor Daily Meals (Breakfast / Lunch / Dinner)</a></li>
        <li><a href="/sharecare">Share &amp; Care (Provisions &amp; Clothing)</a></li>
        <li><a href="/howhelp">Bank Transfer &bull; Bank of Baroda</a></li>
        <li><a href="/howhelp#nri">NRI Donors &bull; SBI FCRA Account</a></li>
        <li><a href="/volunteers">Volunteer Experience Stories</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>Contact &amp; Location</h4>
      <div class="f-contact-item">
        <span class="f-icon">📍</span>
        <span>Thiru V.K.A. Road, Gerugambakkam, Chennai &ndash; 600 128, Tamil Nadu, India</span>
      </div>
      <div class="f-contact-item">
        <span class="f-icon">📞</span>
        <span><a href="tel:+919677238998">+91 96772 38998</a> (9 AM &ndash; 8 PM)<br>044-23820771 &bull; 044-23820330</span>
      </div>
      <div class="f-contact-item">
        <span class="f-icon">✉️</span>
        <span><a href="mailto:premavasam1999@gmail.com">premavasam1999@gmail.com</a></span>
      </div>
    </div>
  </div>

  <div class="footer-bottom">
    <div class="footer-bottom-inner">
      <p>&copy; 1999&ndash;2026 <strong>Premavasam Charitable Trust</strong>. All rights reserved. &bull; "To serve, not to be served."</p>
      <div class="footer-legal">
        <span>Designed with Light Warm UI &bull; Hosted Locally with 100% Original Images</span>
      </div>
    </div>
  </div>
</footer>

<button id="back-top" aria-label="Back to top of page" title="Scroll to top">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
</button>

<script src="/js/main.js"></script>
`;
}

function wrapPage({ title, active, description, content }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Premavasam &bull; A Home of Love</title>
  <meta name="description" content="${description || 'Premavasam is a home for mentally & physically challenged and less fortunate children in Chennai, India.'}">
  <link rel="shortcut icon" href="/images/logo.png" type="image/png">
  <link rel="stylesheet" href="/css/main.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">
</head>
<body>
<a href="#main" class="skip-link">Skip to main content</a>

${getNav(active)}

<main id="main" tabindex="-1">
${content}
</main>

${getFooter()}
</body>
</html>`;
}

// Generate the Gallery Page HTML
const galleryCardsHtml = GALLERY_DATA.map((item, idx) => `
  <div class="gallery-item reveal" data-category="${item.category}" onclick="openLightbox(${idx})">
    <div class="gallery-img-wrap">
      <img src="${item.src}" alt="${item.title}" loading="lazy">
      <div class="gallery-overlay">
        <span class="gallery-zoom-icon">🔍</span>
      </div>
      <span class="gallery-tag">${item.catLabel}</span>
    </div>
    <div class="gallery-info">
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    </div>
  </div>
`).join('\n');

const galleryHtml = wrapPage({
  title: 'Gallery &bull; Moments of Joy',
  active: 'gallery',
  description: 'Photo gallery of Happy Schooling, Diwali celebrations, World Disabled Day Sports Meet, and our beautiful children at Prema Vasam.',
  content: `
  <!-- ══ PAGE HERO ═══════════════════════════════════════════ -->
  <section class="page-hero">
    <div class="page-hero-inner">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a> <span>/</span> <strong>Gallery</strong>
      </nav>
      <span class="hero-tag">22 AUTHENTIC MOMENTS &bull; LIFE AT PREMA VASAM</span>
      <h1 class="page-title">Moments of Love &amp; Joy</h1>
      <p class="page-lead">Capturing celebrations, educational breakthroughs, annual sports meets, and the pure radiant smiles of our children.</p>
    </div>
  </section>

  <section class="section">
    <div class="section-inner">

      <!-- FILTER TABS -->
      <div class="gallery-filter-tabs reveal">
        <button class="filter-tab active" onclick="filterGallery('all', this)">🌟 All Moments (22)</button>
        <button class="filter-tab" onclick="filterGallery('school', this)">🎒 Happy Schooling (5)</button>
        <button class="filter-tab" onclick="filterGallery('diwali', this)">🪔 Diwali 2024 (6)</button>
        <button class="filter-tab" onclick="filterGallery('sports', this)">🏆 Sports Meet 2023 (6)</button>
        <button class="filter-tab" onclick="filterGallery('children', this)">💛 Our Children (5)</button>
      </div>

      <!-- GALLERY MASONRY/GRID -->
      <div class="gallery-grid" id="galleryGrid">
        ${galleryCardsHtml}
      </div>

    </div>
  </section>

  <!-- ══ LIGHTBOX MODAL ══════════════════════════════════════ -->
  <div class="lightbox-modal" id="lightboxModal" style="display:none;" role="dialog" aria-modal="true" aria-label="Photo Lightbox">
    <div class="lightbox-backdrop" onclick="closeLightbox()"></div>
    <div class="lightbox-content">
      <button class="lightbox-close" onclick="closeLightbox()" aria-label="Close Lightbox">&times;</button>
      <button class="lightbox-nav lightbox-prev" onclick="navLightbox(-1)" aria-label="Previous image">&#8249;</button>
      <button class="lightbox-nav lightbox-next" onclick="navLightbox(1)" aria-label="Next image">&#8250;</button>
      
      <div class="lightbox-img-box">
        <img id="lightboxImg" src="" alt="Enlarged photo">
      </div>
      <div class="lightbox-caption">
        <span class="lightbox-cat" id="lightboxCat"></span>
        <h3 id="lightboxTitle"></h3>
        <p id="lightboxDesc"></p>
        <span class="lightbox-counter" id="lightboxCounter"></span>
      </div>
    </div>
  </div>

  <script>
    const GALLERY_ITEMS = ${JSON.stringify(GALLERY_DATA)};
    let curLightboxIdx = 0;

    function filterGallery(category, btn) {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');

      const items = document.querySelectorAll('.gallery-item');
      items.forEach(it => {
        if (category === 'all' || it.getAttribute('data-category') === category) {
          it.style.display = 'flex';
          setTimeout(() => it.classList.add('in'), 50);
        } else {
          it.style.display = 'none';
        }
      });
    }

    // Auto filter if URL parameter exists (e.g. ?cat=school)
    (function(){
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('cat');
      if (cat) {
        const targetBtn = document.querySelector(\`.filter-tab[onclick*="'\${cat}'"]\`);
        if (targetBtn) targetBtn.click();
      }
    })();

    function openLightbox(idx) {
      curLightboxIdx = idx;
      updateLightbox();
      document.getElementById('lightboxModal').style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      document.getElementById('lightboxModal').style.display = 'none';
      document.body.style.overflow = '';
    }

    function navLightbox(direction) {
      curLightboxIdx = (curLightboxIdx + direction + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
      updateLightbox();
    }

    function updateLightbox() {
      const item = GALLERY_ITEMS[curLightboxIdx];
      document.getElementById('lightboxImg').src = item.src;
      document.getElementById('lightboxCat').innerText = item.catLabel;
      document.getElementById('lightboxTitle').innerText = item.title;
      document.getElementById('lightboxDesc').innerText = item.desc;
      document.getElementById('lightboxCounter').innerText = (curLightboxIdx + 1) + ' / ' + GALLERY_ITEMS.length;
    }

    document.addEventListener('keydown', (e) => {
      const modal = document.getElementById('lightboxModal');
      if (modal && modal.style.display === 'flex') {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navLightbox(-1);
        if (e.key === 'ArrowRight') navLightbox(1);
      }
    });
  </script>
`});

fs.writeFileSync(path.join(ROOT, 'gallery.html'), galleryHtml, 'utf8');
console.log('✅ Generated gallery.html with all 22 downloaded original photos!');
