const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

// Common Header / Navbar HTML (2026 modern light warm aesthetic)
function getNav(activePage = '') {
  const isActive = (p) => activePage === p ? 'active' : '';
  return `
<!-- â•â• TOP ANNOUNCEMENT TICKER â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• -->
<div class="top-bar">
  <div class="top-bar-inner">
    <div class="top-badge">ðŸ’› A Home of Love Since 1999</div>
    <div class="top-ticker" aria-live="polite">
      <span class="ticker-dot"></span>
      <span class="ticker-text" id="topTickerText">Sports Meet on World Disabled Day &bull; Rohit (Cerebral Palsy) walks after 2 years of physiotherapy!</span>
    </div>
    <div class="top-contact-quick">
      <a href="tel:+919677238998">ðŸ“ž +91 96772 38998</a>
      <span class="sep">&bull;</span>
      <a href="mailto:premavasam1999@gmail.com">âœ‰ï¸ premavasam1999@gmail.com</a>
    </div>
  </div>
</div>

<!-- â•â• NAVBAR â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• -->
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
          <li><a href="/whoweare" class="${isActive('whoweare')}">Who We Are</a></li>
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
          <li><a href="/sponsormeals" class="${isActive('sponsormeals')}">ðŸ² Sponsor Meals</a></li>
          <li><a href="/sharecare" class="${isActive('sharecare')}">ðŸŽ Share &amp; Care</a></li>
          <li><a href="/howhelp" class="${isActive('howhelp')}">ðŸ’³ Bank &amp; NRI Transfer</a></li>
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

<!-- â•â• SEARCH MODAL â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• -->
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
<!-- â•â• FOOTER â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• -->
<footer id="footer">
  <div class="footer-warm-banner">
    <div class="footer-warm-inner">
      <div class="footer-warm-text">
        <span class="f-eyebrow">â™¥ MAKE A DIRECT IMPACT TODAY</span>
        <h3>Every child who knocks on our door is embraced with tender love.</h3>
        <p>No contribution is too small. Together, we can provide physiotherapy, warm nutrition, education, and eternal dignity.</p>
      </div>
      <div class="footer-warm-actions">
        <a href="/sponsormeals" class="btn btn-primary">ðŸ² Sponsor a Meal Today</a>
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
        <span>ðŸ“œ Registered Charitable Trust Act: <strong>No. 419 of 1999</strong></span>
        <span>ðŸ‡®ðŸ‡³ 100% Non-Profit Organization &bull; FCRA Approved</span>
      </div>
    </div>

    <div class="footer-col">
      <h4>Our Mission</h4>
      <ul>
        <li><a href="/whoweare">Who We Are &bull; Inception</a></li>
        <li><a href="/about">About Prema Vasam</a></li>
        <li><a href="/projects">Our Projects &bull; Prem Niketan &amp; Prem Illam</a></li>
        <li><a href="/achievements">Milestones &amp; Dreams</a></li>
        <li><a href="/activities">Therapies &amp; Education</a></li>
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
        <span class="f-icon">ðŸ“</span>
        <span>Thiru V.K.A. Road, Gerugambakkam, Chennai &ndash; 600 128, Tamil Nadu, India</span>
      </div>
      <div class="f-contact-item">
        <span class="f-icon">ðŸ“ž</span>
        <span><a href="tel:+919677238998">+91 96772 38998</a> (9 AM &ndash; 8 PM)<br>044-23820771 &bull; 044-23820330</span>
      </div>
      <div class="f-contact-item">
        <span class="f-icon">âœ‰ï¸</span>
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

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 1. ABOUT US PAGE (with original photos & full content)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const aboutHtml = wrapPage({
  title: 'About Us',
  active: 'about',
  description: 'Learn about Premavasam, our origins, leadership, projects, and vision for special children.',
  content: `
  <section class="page-hero">
    <div class="page-hero-inner">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a> <span>/</span> <strong>About Us</strong>
      </nav>
      <span class="hero-tag">A HOME WHERE LOVE RESIDES</span>
      <h1 class="page-title">About Premavasam</h1>
      <p class="page-lead">Founded on June 2, 1999, Premavasam is dedicated to creating a nurturing sanctuary where every child, regardless of disability or background, is empowered to realize their divine potential.</p>
    </div>
  </section>

  <section class="section">
    <div class="section-inner">
      <!-- HERO SHOWCASE WITH ORIGINAL PHOTO -->
      <div class="about-feature-box reveal" style="background:var(--bg-card); border-radius:var(--r-2xl); border:1px solid var(--border-soft); box-shadow:var(--sh-sm); overflow:hidden; display:grid; grid-template-columns:1fr 440px; margin-bottom:48px;">
        <div style="padding:48px 44px;">
          <span class="section-label">ORIGINAL SANCTUARY</span>
          <h2 style="font-family:'Lora',serif; font-size:2rem; margin-bottom:16px;">Where Every Child Truly Belongs</h2>
          <p style="font-size:1.05rem; line-height:1.85; color:var(--txt); margin-bottom:14px;">
            <strong>PREMA VASAM</strong> is a home for the Mentally &amp; Physically Challenged and Less Fortunate Children. It is the only home of its kind that caters to the needs of a large number of special children along with the less fortunate school-going children.
          </p>
          <p style="font-size:.95rem; line-height:1.8; color:var(--txt-mid); margin-bottom:20px;">
            It aims to work with these special children and their families irrespective of caste, creed, religion and financial background. As the name <em>Prema Vasam</em> means, it is a <strong>place of love or where love resides</strong>. Prema Vasam provides residential care to the children who are differently abled, mentally challenged and less fortunate.
          </p>
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <a href="/whoweare" class="btn btn-primary btn-sm">Read Full Founder Story &rarr;</a>
            <a href="/achievements" class="btn btn-outline btn-sm">Milestones &amp; Dreams &rarr;</a>
          </div>
        </div>
        <div style="position:relative; min-height:360px; background:var(--bg-warm);">
          <img src="/images/splgroup.jpg" alt="Special Children Group at Prema Vasam" style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover;">
          <div style="position:absolute; bottom:12px; right:12px; background:rgba(44,24,16,.75); color:#fff; font-size:.75rem; padding:4px 10px; border-radius:var(--r-full); backdrop-filter:blur(4px);">
            ðŸ“· Children of Prema Vasam
          </div>
        </div>
      </div>

      <div class="section-header centered reveal">
        <span class="section-label">KEY CHAPTERS</span>
        <h2 class="section-title">Explore Our Chapters of Service</h2>
        <p class="section-sub">From our 1999 founding story to expanded branches across Tamil Nadu.</p>
      </div>

      <div class="about-grid">
        <a href="/whoweare" class="about-card-big reveal">
          <div class="about-card-badge">WHO WE ARE</div>
          <div class="about-card-icon">ðŸ’›</div>
          <h3>Who We Are &bull; The Inception</h3>
          <p>Read how Mr. Selvyn Roy founded Prema Vasam in 1999, the touching story of baby Prem who gave our home its name, and our coordinator Miss Mumtaj.</p>
          <span class="card-action">Read Founder &amp; Inception Story &rarr;</span>
        </a>

        <a href="/projects" class="about-card-big reveal delay-1">
          <div class="about-card-badge">EXPANSION</div>
          <div class="about-card-icon">ðŸ¡</div>
          <h3>Our Projects &bull; Homes for Girls &amp; Boys</h3>
          <p>Discover Prem Niketan (est. 2011) and Prem Illam in Maduranthakam (est. 2017) led by Indra, offering safe spaces for girl children and older boys.</p>
          <span class="card-action">Explore Extended Homes &rarr;</span>
        </a>

        <a href="/achievements" class="about-card-big reveal delay-2">
          <div class="about-card-badge">MILESTONES</div>
          <div class="about-card-icon">ðŸ†</div>
          <h3>Achievements &amp; Dreams</h3>
          <p>From thatch roof to concrete buildings, children walking after years of therapy, education milestones, and our dream for a neonatal adoption center.</p>
          <span class="card-action">See Achievements &rarr;</span>
        </a>
      </div>

      <!-- LEADERSHIP GALLERY -->
      <div style="margin-top:54px;" class="reveal">
        <div class="section-header centered">
          <span class="section-label">OUR PILLARS</span>
          <h2 class="section-title">The People Behind Prema Vasam</h2>
        </div>
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:24px; margin-top:28px;">
          <div class="card" style="text-align:center; padding:28px 20px;">
            <img src="/images/selvyn_roy.jpg" alt="Mr. Selvyn Roy with children" style="width:140px; height:140px; border-radius:50%; object-fit:cover; margin:0 auto 16px; border:3px solid var(--brand-pale);">
            <h3 style="font-size:1.25rem; margin-bottom:4px;">Mr. Selvyn Roy</h3>
            <span style="font-size:.8rem; color:var(--brand-deep); font-weight:700; text-transform:uppercase; letter-spacing:.06em;">Founder &bull; Administrator</span>
            <p style="font-size:.85rem; color:var(--txt-mid); margin-top:10px; line-height:1.6;">Clinical psychologist by profession with postgraduate counseling credentials, dedicating his entire life to special children since 1999.</p>
          </div>
          <div class="card" style="text-align:center; padding:28px 20px;">
            <img src="/images/indra.jpg" alt="Indra - Director of Prem Illam" style="width:140px; height:140px; border-radius:50%; object-fit:cover; margin:0 auto 16px; border:3px solid var(--brand-pale);">
            <h3 style="font-size:1.25rem; margin-bottom:4px;">Indra</h3>
            <span style="font-size:.8rem; color:var(--brand-deep); font-weight:700; text-transform:uppercase; letter-spacing:.06em;">Director &bull; Prem Illam</span>
            <p style="font-size:.85rem; color:var(--txt-mid); margin-top:10px; line-height:1.6;">The very first child educated by Selvyn Roy. Completed MCA from Anna University with 1st Class and now directs our home for girl children.</p>
          </div>
          <div class="card" style="text-align:center; padding:28px 20px;">
            <img src="/images/mumtaj.jpg" alt="Miss Mumtaj - Coordinator" style="width:140px; height:140px; border-radius:50%; object-fit:cover; margin:0 auto 16px; border:3px solid var(--brand-pale);">
            <h3 style="font-size:1.25rem; margin-bottom:4px;">Miss Mumtaj</h3>
            <span style="font-size:.8rem; color:var(--brand-deep); font-weight:700; text-transform:uppercase; letter-spacing:.06em;">Co-ordinator &bull; Operations</span>
            <p style="font-size:.85rem; color:var(--txt-mid); margin-top:10px; line-height:1.6;">Multi-Rehabilitational Worker serving tirelessly since 2000, managing day-to-day healthcare, nurses, and office administration.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
`});

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 2. WHO WE ARE PAGE (with original photos embedded)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const whoweareHtml = wrapPage({
  title: 'Who We Are',
  active: 'whoweare',
  description: 'The story of Prema Vasam, founder Selvyn Roy, Indra, baby Prem, and Miss Mumtaj.',
  content: `
  <section class="page-hero">
    <div class="page-hero-inner">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a> <span>/</span> <a href="/about">About Us</a> <span>/</span> <strong>Who We Are</strong>
      </nav>
      <span class="hero-tag">OUR ORIGINS &amp; LEADERSHIP</span>
      <h1 class="page-title">Who We Are</h1>
      <p class="page-lead">A home where love resides &mdash; welcoming differently-abled and less-fortunate children into one caring family since 1999.</p>
    </div>
  </section>

  <section class="section">
    <div class="section-inner">
      <div class="content-story reveal">
        <div class="story-header">
          <span class="section-label">HEARTY WELCOME</span>
          <h2>Hearty Welcome to Prema Vasam</h2>
        </div>
        <div class="story-body">
          <p class="lead-p">
            <strong>PREMA VASAM</strong> is a home for the Mentally &amp; Physically Challenged and Less Fortunate Children. It is the only home of its kind that caters to the needs of a large number of special children along with the less fortunate school-going children.
          </p>
          <p>
            It aims to work with these special children and their families irrespective of caste, creed, religion and financial background. As the name Prema Vasam means, it is a <strong>place of love or where love resides</strong>. Prema Vasam provides residential care to the children who are differently abled, mentally challenged and less fortunate. It renders relentless service to these children to realize their potentials and to enable them to serve others.
          </p>
          <div class="badge-trust-strip">
            <div class="trust-pill">ðŸ“œ Registered under Charitable Trust Act &bull; No. 419 of 1999</div>
            <div class="trust-pill">ðŸ¤ 100% Non-Profit Organization</div>
            <div class="trust-pill">ðŸ‘¶ Home for 200+ Children (132 Special Children)</div>
          </div>
        </div>
      </div>

      <!-- INCEPTION & SELVYN ROY WITH PHOTO -->
      <div class="story-split reveal delay-1" style="margin-top: 48px;">
        <div class="story-card warm-card">
          <div style="margin-bottom:20px; border-radius:var(--r-md); overflow:hidden; max-height:240px;">
            <img src="/images/selvyn_roy.jpg" alt="Mr. Selvyn Roy with special children" style="width:100%; height:240px; object-fit:cover;">
          </div>
          <span class="section-label">FOUNDED JUNE 2, 1999</span>
          <h3>The Inception &bull; Mr. Selvyn Roy</h3>
          <p>
            <strong>Mr. Selvyn Roy</strong>, administrator of Prema Vasam, founded the home on <strong>2nd of June 1999</strong> when he decided to educate Indra, a 14-year-old differently abled girl. Indra was totally depressed and extremely low in spirit due to her inability to go to school like children of her age.
          </p>
          <p>
            She joined in eighth standard and later scored <strong>420/500 marks in her SSLC board exam</strong>. She became an outstanding student in Under Graduation at St. Joseph's College, and completed her <strong>Master's Degree in Computer Application from prestigious Anna University with First Class</strong>! With passion for special children, she also completed Special Education, and now joyfully serves as the <strong>Director of Prem Illam</strong>.
          </p>
          <p>
            Mr. Selvyn Roy is a clinical psychologist by profession holding post-graduate diplomas in counseling. He began at MITHRA, Clark School for Deaf and Dumb, and Prithipura Infant Home in Sri Lanka. Recognizing the extraordinary talents and human dignity of special children, he founded PREMA VASAM to prove they can be architects of a new society.
          </p>
        </div>

        <!-- BABY PREM WITH PHOTO -->
        <div class="story-card brand-card">
          <div style="margin-bottom:20px; border-radius:var(--r-md); overflow:hidden; max-height:240px;">
            <img src="/images/baby_prem.jpg" alt="Baby Prem (Appa)" style="width:100%; height:240px; object-fit:cover;">
          </div>
          <span class="section-label" style="color:var(--brand-deep)">PRECIOUS GIFT</span>
          <h3>Baby Prem &bull; How We Got Our Name</h3>
          <p>
            On <strong>May 14th, 1999</strong>, Selvyn Roy found an abandoned, dying baby boy near Aminjikarai in Chennai. He did not know who gave him the strength and courage to pick him up in that dying stage.
          </p>
          <p>
            Though severely mentally and physically challenged and bedridden, he was extraordinarily cheerful. In return for care and support, he gave an unforgettable, heavenly smile. He proved himself to be a truly precious gift.
          </p>
          <div class="quote-mini">
            &ldquo;Since we did not know his name, we named him <strong>Prem</strong>. Later, where Prem lived became <strong>PREMA VASAM</strong>. Our entire home was named after his name.&rdquo;
          </div>
        </div>
      </div>

      <!-- MISS MUMTAJ WITH PHOTO -->
      <div class="coordinator-card reveal delay-2" style="margin-top: 48px;">
        <div class="coord-inner">
          <img src="/images/mumtaj.jpg" alt="Miss Mumtaj - Coordinator" style="width:120px; height:120px; border-radius:var(--r-lg); object-fit:cover; border:2px solid var(--brand); flex-shrink:0;">
          <div class="coord-details">
            <span class="section-label">HEARTBEAT OF OPERATIONS</span>
            <h3>Miss Mumtaj &bull; Co-ordinator</h3>
            <p>
              Miss Mumtaj is a qualified <strong>Multi-Rehabilitational Worker</strong>. She has been working tirelessly for the children of Prema Vasam since 2000 &mdash; just a year after Selvyn started the home &mdash; and it is her efforts that keep every single program at Prema Vasam running smoothly.
            </p>
            <p>
              She oversees all functions, such as communications, accounts, auditing, and office administration. Furthermore, when any of the children are sick, she instructs the nurses, knowing each special child's medical condition intimately.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
`});

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 3. ACTIVITIES PAGE (with original therapy photos)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const activitiesHtml = wrapPage({
  title: 'Activities & Care',
  active: 'activities',
  description: 'Daily physiotherapy, occupational therapy, special education, play therapy, and Kalakshetra dance at Prema Vasam.',
  content: `
  <section class="page-hero">
    <div class="page-hero-inner">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a> <span>/</span> <strong>Activities</strong>
      </nav>
      <span class="hero-tag">REHABILITATION &amp; HEALING</span>
      <h1 class="page-title">Our Daily Activities &amp; Therapies</h1>
      <p class="page-lead">A comprehensive holistic approach blending clinical therapy, special education, expressive arts, and sports to nourish body, mind, and spirit.</p>
    </div>
  </section>

  <section class="section">
    <div class="section-inner">
      <div class="therapy-sections">

        <!-- 1. PHYSIOTHERAPY -->
        <div class="therapy-card reveal">
          <div class="therapy-head">
            <span class="therapy-num">01</span>
            <div class="therapy-title-wrap">
              <span class="section-label">DAILY &bull; 9:30 AM TO 3:30 PM</span>
              <h2>Physiotherapy &bull; Clinical Rehabilitation</h2>
            </div>
            <div class="therapy-icon-box">ðŸ¦½</div>
          </div>
          <div class="therapy-body">
            <div style="display:grid; grid-template-columns:1fr 340px; gap:28px; margin-bottom:20px;">
              <div>
                <p class="therapy-lead">
                  A team of physiotherapists headed by <strong>Mr. Robinson</strong> gives physiotherapy to our children affected by cerebral palsy, autistic, and mentally challenged children every day from 9:30 AM to 3:30 PM.
                </p>
                <p style="font-size:.92rem; color:var(--txt-mid); line-height:1.75;">
                  They provide therapeutic exercises such as electrical stimulation, muscular stimulation, TENS to remove pain, contracture removing, stretching exercises, strengthening exercises and so on. We have electrical stimulator machines called Electro Care, parallel bars, static cycles, physioballs, and walkers.
                </p>
              </div>
              <div style="border-radius:var(--r-md); overflow:hidden;">
                <img src="/images/physio_team.jpg" alt="Physiotherapy Team with Mr. Robinson" style="width:100%; height:220px; object-fit:cover;">
                <span style="display:block; text-align:center; font-size:.75rem; color:var(--txt-muted); padding:4px;">Mr. Robinson &amp; Physio Team</span>
              </div>
            </div>

            <div class="quote-box-warm">
              <strong>Remarkable Milestones:</strong>
              <p>&ldquo;Regular physiotherapy results in remarkable improvement and development among our children. To cite a few examples: Rohit, a bedridden child suffering from cerebral palsy, is able to walk after two years of physiotherapy! Some of our physically challenged children &mdash; Meenakshi, Senthil Kumari, John, and Rithvik &mdash; are able to walk without support.&rdquo;</p>
            </div>
          </div>
        </div>

        <!-- 2. OCCUPATIONAL THERAPY -->
        <div class="therapy-card reveal delay-1" style="margin-top: 36px;">
          <div class="therapy-head">
            <span class="therapy-num">02</span>
            <div class="therapy-title-wrap">
              <span class="section-label">SENSORY &amp; TONE NORMALIZATION</span>
              <h2>Occupational Therapy</h2>
            </div>
            <div class="therapy-icon-box">ðŸ§©</div>
          </div>
          <div class="therapy-body">
            <div style="display:grid; grid-template-columns:1fr 340px; gap:28px;">
              <div>
                <p class="therapy-lead">
                  Sometimes our children do stay idle, and some of the children are bedridden &mdash; there is a compulsory need for occupational therapy.
                </p>
                <p style="font-size:.92rem; color:var(--txt-mid); line-height:1.75;">
                  We have fur toys, musical toys, standing frames, CP chairs, and building blocks to enhance occupational therapy for our children. In occupational therapy we give exercises to normalize tone, stretching, and positioning; to relieve tightness, maintained stretch is given. Milestones are achieved through different positioning and providing sensations of objects for grasping.
                </p>
                <p style="font-size:.92rem; color:var(--txt-mid); line-height:1.75; margin-top:8px;">
                  Of course, occupational therapy plays an important role in the lives of our special children. It makes them active; it gives a satisfying feeling to our special children because they could do something.
                </p>
              </div>
              <div style="border-radius:var(--r-md); overflow:hidden;">
                <img src="/images/occupational.jpg" alt="Occupational Therapy session" style="width:100%; height:220px; object-fit:cover;">
                <span style="display:block; text-align:center; font-size:.75rem; color:var(--txt-muted); padding:4px;">Sensory Stimulation &amp; Toys</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. SPECIAL EDUCATION -->
        <div class="therapy-card reveal delay-1" style="margin-top: 36px;">
          <div class="therapy-head">
            <span class="therapy-num">03</span>
            <div class="therapy-title-wrap">
              <span class="section-label">IQ-ADAPTED CURRICULUM</span>
              <h2>Special Education &amp; Activities of Daily Living (ADL)</h2>
            </div>
            <div class="therapy-icon-box">ðŸ“š</div>
          </div>
          <div class="therapy-body">
            <div style="display:grid; grid-template-columns:1fr 340px; gap:28px;">
              <div>
                <p class="therapy-lead">
                  Special children do have learning disabilities and are slow learners. Hence based on their IQ testing, they are categorized and provided with colorful toys, coloring books, clay, puzzles, matching cards, simple vocabulary, color concepts, shapes, simple arithmetic, and simplified academic skills.
                </p>
                <p style="font-size:.92rem; color:var(--txt-mid); line-height:1.75;">
                  Whereas for the trainable group, we teach ADL (Activities of Daily Living) to reach our main goal &mdash; to make them <strong>&ldquo;independent&rdquo;</strong>. We play music and songs as part of special education. Some of our children have made significant improvements: writing their names, reciting rhymes, naming objects, and excelling in self-care.
                </p>
              </div>
              <div style="border-radius:var(--r-md); overflow:hidden;">
                <img src="/images/special_ed.jpg" alt="Special Education class" style="width:100%; height:220px; object-fit:cover;">
                <span style="display:block; text-align:center; font-size:.75rem; color:var(--txt-muted); padding:4px;">Special Education Class</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. PLAY THERAPY & SCHOOL INTEGRATION -->
        <div class="therapy-card reveal delay-2" style="margin-top: 36px;">
          <div class="therapy-head">
            <span class="therapy-num">04</span>
            <div class="therapy-title-wrap">
              <span class="section-label">SPORTS, DANCE &amp; SCHOOL COACHING</span>
              <h2>Play Therapy, Kalakshetra Dance &amp; School Coaching</h2>
            </div>
            <div class="therapy-icon-box">ðŸŽ­</div>
          </div>
          <div class="therapy-body">
            <p class="therapy-lead">
              Integration of normal children with special children in life activities plays an important and therapeutic role in the lives of our special children. Though our normal children are enrolled in our neighborhood schools, they also receive coaching and educational counseling.
            </p>
            <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; margin:24px 0;">
              <div style="border-radius:var(--r-sm); overflow:hidden;">
                <img src="/images/play_therapy.jpg" alt="Play therapy" style="width:100%; height:160px; object-fit:cover;">
                <span style="display:block; text-align:center; font-size:.72rem; color:var(--txt-muted); padding:4px;">Play Therapy &amp; Games</span>
              </div>
              <div style="border-radius:var(--r-sm); overflow:hidden;">
                <img src="/images/dance1.jpg" alt="Kalakshetra Dance" style="width:100%; height:160px; object-fit:cover;">
                <span style="display:block; text-align:center; font-size:.72rem; color:var(--txt-muted); padding:4px;">Bharatha Natyam</span>
              </div>
              <div style="border-radius:var(--r-sm); overflow:hidden;">
                <img src="/images/achieve2_music.jpg" alt="Drums & Music" style="width:100%; height:160px; object-fit:cover;">
                <span style="display:block; text-align:center; font-size:.72rem; color:var(--txt-muted); padding:4px;">Drums &amp; Singing</span>
              </div>
            </div>
            <ul class="check-list">
              <li>Dance Masters come from world-renowned <strong>Kalakshetra</strong> to teach classical Bharatha Natyam</li>
              <li>Singing, dancing, drawing, painting, and playing drums as extra-curricular activities</li>
              <li>Monthly picnics or outings to zoos and parks to add joy and happiness to their lives</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </section>
`});

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 4. ACHIEVEMENTS PAGE (with original achievement photos)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const achievementsHtml = wrapPage({
  title: 'Achievements & Dreams',
  active: 'achievements',
  description: 'Our concrete milestones, miracles of therapy, and future dreams for neonatal child care.',
  content: `
  <section class="page-hero">
    <div class="page-hero-inner">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a> <span>/</span> <a href="/about">About Us</a> <span>/</span> <strong>Achievements</strong>
      </nav>
      <span class="hero-tag">CELEBRATING MILESTONES</span>
      <h1 class="page-title">Achievements &amp; Dreams</h1>
      <p class="page-lead">From fragile thatch roots to triumphant graduations &mdash; witness how patience, science, and boundless love create daily miracles.</p>
    </div>
  </section>

  <section class="section">
    <div class="section-inner">
      <!-- ACHIEVEMENTS HERO SHOWCASE WITH PHOTO -->
      <div style="background:var(--bg-card); border-radius:var(--r-2xl); border:1px solid var(--border-soft); box-shadow:var(--sh-sm); overflow:hidden; display:grid; grid-template-columns:380px 1fr; margin-bottom:48px;">
        <div style="position:relative; min-height:280px; background:var(--bg-warm);">
          <img src="/images/achieve_building.jpg" alt="Building of Prema Vasam" style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover;">
        </div>
        <div style="padding:40px 44px;">
          <span class="section-label">PERMANENT SANCTUARY</span>
          <h2 style="font-family:'Lora',serif; font-size:1.8rem; margin-bottom:12px;">From Thatched Roof to Concrete Haven</h2>
          <p style="font-size:.95rem; color:var(--txt-mid); line-height:1.8;">
            Amidst the various difficulties that we faced, we tried our best to provide balanced diet, clean water and healthy hygienic atmosphere to our differently abled and mentally challenged children. We did succeed in putting up a solid concrete building for our children and moving into it from the old thatched roof.
          </p>
        </div>
      </div>

      <div class="achieve-grid">
        <div class="achieve-card reveal">
          <div class="achieve-num">01</div>
          <h3>Unique Integrated Living</h3>
          <p>Prema Vasam is the only home that takes care of a large number of special children along with normal children. This integration develops sensitivity among normal children to attend to the needs of the mentally challenged and differently abled.</p>
        </div>

        <div class="achieve-card reveal delay-1">
          <div class="achieve-num">02</div>
          <h3>Bedridden Children Now Walking</h3>
          <p>Constant individual care, regular physiotherapy, occupational therapy, and special education have enabled a good number of mentally challenged children to talk and walk independently.</p>
        </div>

        <div class="achieve-card reveal delay-2">
          <div class="achieve-num">03</div>
          <h3>Mothers Living &amp; Serving</h3>
          <p>The mothers of a number of differently abled and mentally challenged children live along with their children in our home and render their whole-hearted service to all the inmates with tender loving care.</p>
        </div>

        <div class="achieve-card reveal">
          <div class="achieve-num">04</div>
          <h3>Indra's Educational Triumph</h3>
          <p>Indra, the first child affected by Polio with scoliosis, completed SSLC with 84%, graduated from St. Joseph's College, earned an MCA from Anna University in first class, and completed Special Education to lead Prem Illam.</p>
        </div>

        <div class="achieve-card reveal delay-1">
          <div class="achieve-num">05</div>
          <h3>Manjampadi Boys Home</h3>
          <p>A Boys home established at Manjampadi in Arakonam houses 30 adolescent boys post-8th standard, granting them continuous secondary coaching and vocational readiness.</p>
        </div>

        <div class="achieve-card reveal delay-2">
          <div class="achieve-num">06</div>
          <h3>Expert Clinical Care Team</h3>
          <p>A team of good qualified physiotherapists, occupational therapists, and teachers trained in special education cater to the needs of our children, rejoicing at each child's progress.</p>
        </div>
      </div>

      <!-- PHOTO GALLERY OF MATERNAL CARE & PRAVEENA -->
      <div style="margin-top:48px;" class="reveal">
        <div class="section-header centered">
          <span class="section-label">AUTHENTIC MOMENTS</span>
          <h2 class="section-title">Individual Maternal Care &amp; Milestones</h2>
        </div>
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:20px; margin-top:24px;">
          <div class="card" style="overflow:hidden;">
            <img src="/images/individual_care1.jpg" alt="Maternal individual care" style="width:100%; height:220px; object-fit:cover;">
            <div style="padding:14px; text-align:center; font-size:.82rem; font-weight:600; color:var(--txt-mid);">Tender Individual Care</div>
          </div>
          <div class="card" style="overflow:hidden;">
            <img src="/images/individual_care4.jpg" alt="Mother caring for child" style="width:100%; height:220px; object-fit:cover;">
            <div style="padding:14px; text-align:center; font-size:.82rem; font-weight:600; color:var(--txt-mid);">Motherly Affection &amp; Feeding</div>
          </div>
          <div class="card" style="overflow:hidden;">
            <img src="/images/achieve_praveena.jpg" alt="Praveena milestone" style="width:100%; height:220px; object-fit:cover;">
            <div style="padding:14px; text-align:center; font-size:.82rem; font-weight:600; color:var(--txt-mid);">Celebrating Child Milestones</div>
          </div>
        </div>
      </div>

      <!-- DREAMS BANNER -->
      <div class="dream-banner reveal delay-2" style="margin-top: 64px;">
        <div class="dream-header">
          <span class="hero-tag" style="background:rgba(255,255,255,.2); color:#fff; border-color:rgba(255,255,255,.4);">THE ROAD AHEAD</span>
          <h2>Our Cherished Dreams</h2>
          <p>We are actively striving to expand our sanctuary with three critical goals:</p>
        </div>
        <div class="dream-cards">
          <div class="dream-item">
            <span class="dream-icon">ðŸ‘¶</span>
            <h4>Child Adoption Center</h4>
            <p>Establishment of a specialized Adoption Center to shelter, protect, and give precious life to abandoned neonatal babies.</p>
          </div>
          <div class="dream-item">
            <span class="dream-icon">ðŸ«</span>
            <h4>Dedicated Inclusive School</h4>
            <p>Building our own full-fledged school building for our children and underprivileged neighborhood kids with customized sensory amenities.</p>
          </div>
          <div class="dream-item">
            <span class="dream-icon">ðŸŒ±</span>
            <h4>Self-Sustaining Programs</h4>
            <p>Developing cottage industries, organic farming, and skill-workshops to attain financial self-sufficiency for the future.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
`});

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 5. INDEX (HOME) PAGE (with local hero banners & photos)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const indexHtml = wrapPage({
  title: 'Home',
  active: 'home',
  description: 'Premavasam is a home for mentally & physically challenged and less fortunate children in Chennai, India. Founded in 1999.',
  content: `
<!-- â•â• HERO â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• -->
<section id="hero" aria-label="Premavasam children photo slideshow">
  <div class="hero-slides" id="heroSlides">
    <div class="hero-slide active"><img src="/images/img_1163.jpg" alt="Children at Premavasam" loading="eager"></div>
    <div class="hero-slide"><img src="/images/banner_1.jpg" alt="Premavasam banner" loading="lazy"></div>
    <div class="hero-slide"><img src="/images/img_1207.jpg" alt="Activities" loading="lazy"></div>
    <div class="hero-slide"><img src="/images/img_9718.jpg" alt="Celebration" loading="lazy"></div>
    <div class="hero-slide"><img src="/images/img_9729.jpg" alt="Children at play" loading="lazy"></div>
    <div class="hero-slide"><img src="/images/swathidiwali.png" alt="Diwali" loading="lazy"></div>
    <div class="hero-slide"><img src="/images/design_6.png" alt="Event" loading="lazy"></div>
    <div class="hero-slide"><img src="/images/design_7.png" alt="Event" loading="lazy"></div>
    <div class="hero-slide"><img src="/images/design.png" alt="Event" loading="lazy"></div>
    <div class="hero-slide"><img src="/images/event_banner.jpg" alt="Event" loading="lazy"></div>
  </div>
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">A Home Where Love Resides &bull; Est. 1999</div>
    <h1 class="hero-title">Every Child Deserves<br>to be <span class="accent">Loved &amp; Nurtured</span></h1>
    <p class="hero-sub">Providing residential care, clinical physiotherapy, special education, and lifelong dignity to 200+ mentally challenged and less fortunate children in Chennai.</p>
    <div class="hero-btns">
      <a href="/sponsormeals" class="btn btn-primary">ðŸ² Sponsor a Meal</a>
      <a href="/whoweare" class="btn btn-ghost-light">Discover Our Story &rarr;</a>
    </div>
  </div>
  <button class="hero-prev" onclick="heroPrev()" aria-label="Previous photo">&#8249;</button>
  <button class="hero-next" onclick="heroNext()" aria-label="Next photo">&#8250;</button>
  <div class="hero-dots" id="heroDots"></div>
  <div class="hero-scroll" aria-hidden="true">Scroll to Explore</div>
</section>

<!-- â•â• STATS IMPACT STRIP â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• -->
<div class="warm-strip">
  <div class="warm-strip-inner">
    <div class="stat-tile reveal">
      <div class="stat-icon">ðŸ¡</div>
      <div class="stat-label"><strong>200+</strong><span>Children Under Care</span></div>
    </div>
    <div class="stat-tile reveal delay-1">
      <div class="stat-icon">â­</div>
      <div class="stat-label"><strong>132</strong><span>Special Needs Children</span></div>
    </div>
    <div class="stat-tile reveal delay-2">
      <div class="stat-icon">ðŸ“…</div>
      <div class="stat-label"><strong>27 Years</strong><span>Founded June 2, 1999</span></div>
    </div>
    <div class="stat-tile reveal delay-3">
      <div class="stat-icon">ðŸ’›</div>
      <div class="stat-label"><strong>100%</strong><span>Non-Profit Charitable Trust</span></div>
    </div>
  </div>
</div>

<!-- â•â• MAIN BODY (PAGE WRAP) â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• -->
<div class="page-wrap">

  <!-- LEFT SIDEBAR -->
  <aside id="sidebar">

    <div class="widget reveal">
      <div class="widget-head">ðŸ” Search Site</div>
      <div class="widget-body">
        <form onsubmit="event.preventDefault(); const q = this.q.value; if(q){ document.getElementById('searchTriggerBtn').click(); const inp = document.getElementById('siteSearchInput'); if(inp){ inp.value=q; inp.dispatchEvent(new Event('input')); } }" role="search" style="display:flex;gap:0;border-radius:8px;overflow:hidden;border:1.5px solid var(--border);background:var(--bg-soft)">
          <input type="text" name="q" placeholder="Enter keywordâ€¦" aria-label="Search" style="flex:1;padding:9px 12px;border:none;background:transparent;font-size:.875rem;color:var(--txt);outline:none">
          <button type="submit" style="padding:9px 14px;background:var(--brand);color:white;font-weight:700;font-size:.8rem">Go</button>
        </form>
      </div>
    </div>

    <div class="widget reveal delay-1">
      <div class="widget-head">ðŸ¤ Shoulder Us</div>
      <div class="widget-body">
        <ul style="display:flex;flex-direction:column">
          <li style="border-bottom:1px solid var(--border-soft)"><a href="/sponsormeals" style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;font-size:.9rem;color:var(--txt-mid);font-weight:500">ðŸ² Sponsor Meals <span style="color:var(--brand)">â†’</span></a></li>
          <li style="border-bottom:1px solid var(--border-soft)"><a href="/sharecare" style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;font-size:.9rem;color:var(--txt-mid);font-weight:500">ðŸŽ Share &amp; Care <span style="color:var(--brand)">â†’</span></a></li>
          <li style="border-bottom:1px solid var(--border-soft)"><a href="/howhelp" style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;font-size:.9rem;color:var(--txt-mid);font-weight:500">ðŸ’³ Bank &amp; NRI Transfer <span style="color:var(--brand)">â†’</span></a></li>
          <li><a href="/contact" style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;font-size:.9rem;color:var(--txt-mid);font-weight:500">ðŸ“ž Contact Us <span style="color:var(--brand)">â†’</span></a></li>
        </ul>
      </div>
    </div>

    <div class="widget reveal delay-2">
      <div class="widget-head">ðŸ“° Recent News</div>
      <div class="widget-body">
        <div style="position:relative;min-height:100px">
          <div class="tick-item active" style="position:absolute;inset:0;opacity:0;transition:opacity .6s ease;display:flex;flex-direction:column;gap:8px">
            <span style="font-size:.7rem;font-weight:700;color:var(--brand-deep);text-transform:uppercase;letter-spacing:.06em">Latest Update</span>
            <p style="font-size:.88rem;color:var(--txt);font-weight:600;line-height:1.5">Sports Meet on World Disabled Day</p>
            <p style="font-size:.8rem;color:var(--txt-muted);line-height:1.4">Celebrating our special children's athletic spirit &amp; milestones.</p>
            <a href="/activities" style="font-size:.8rem;font-weight:700;color:var(--navy)">Read more &rarr;</a>
          </div>
          <div class="tick-item" style="position:absolute;inset:0;opacity:0;transition:opacity .6s ease;display:flex;flex-direction:column;gap:8px">
            <span style="font-size:.7rem;font-weight:700;color:var(--brand-deep);text-transform:uppercase;letter-spacing:.06em">Community</span>
            <p style="font-size:.88rem;color:var(--txt);font-weight:600;line-height:1.5">Pongal &amp; Festival Celebrations</p>
            <p style="font-size:.8rem;color:var(--txt-muted);line-height:1.4">Traditional pot cooking, sweets distribution &amp; cultural songs.</p>
            <a href="/activities" style="font-size:.8rem;font-weight:700;color:var(--navy)">Read more &rarr;</a>
          </div>
        </div>
      </div>
    </div>

    <div class="widget reveal delay-3" style="background:linear-gradient(135deg,var(--brand),var(--brand-deep));border:none">
      <div style="padding:24px;text-align:center">
        <div style="font-size:2.2rem;margin-bottom:10px">ðŸ’›</div>
        <h4 style="font-family:'Lora',serif;color:var(--txt-inv);margin-bottom:8px;font-size:1.1rem">Make a Contribution</h4>
        <p style="font-size:.82rem;color:rgba(255,251,245,.82);margin-bottom:16px;line-height:1.6">No contribution is too small. Every rupee directly supports food, physiotherapy and loving care.</p>
        <a href="/howhelp" class="btn btn-ghost-light btn-sm" style="width:100%;justify-content:center;background:rgba(255,255,255,.18)">View Bank Details &rarr;</a>
      </div>
    </div>

  </aside>

  <!-- MAIN COLUMN -->
  <main id="main-content" tabindex="-1">

    <!-- WELCOME MISSION CARD -->
    <article class="reveal" style="background:var(--bg-card);border-radius:var(--r-xl);border:1px solid var(--border-soft);box-shadow:var(--sh-sm);overflow:hidden">
      <div style="display:grid;grid-template-columns:1fr 400px">
        <div style="padding:44px 40px 36px">
          <div class="section-label">OUR MISSION &bull; LOVE IS ALL</div>
          <h2 style="font-family:'Lora',serif;font-size:2rem;color:var(--txt);margin-bottom:18px;line-height:1.28">A sanctuary where every child <em style="color:var(--brand-deep);font-style:normal">truly belongs</em></h2>
          <p style="color:var(--txt-mid);line-height:1.85;margin-bottom:14px;font-size:.97rem">
            Regardless of religion, gender, disability, culture, or language &mdash; <strong>LOVE</strong> is the universal connector that all humans seek and deserve to experience. Being connected with, and truly loving others &mdash; no matter whether that love is returned &mdash; gives our lives meaning and a sense of belonging.
          </p>
          <p style="color:var(--txt-mid);line-height:1.85;margin-bottom:14px;font-size:.97rem">
            Love provides security. Love assists health and well-being. Love generates happiness and joy. Love is all.
          </p>
          <p style="color:var(--txt-mid);line-height:1.85;font-size:.97rem">
            Our home loves all children who come to our door &mdash; each and every one, no matter their disability or past trauma. We nurture what each individual child can contribute to our world through love &mdash; so that they can <strong>serve, not be served.</strong>
          </p>
          <div style="display:flex;gap:12px;margin-top:24px;flex-wrap:wrap">
            <a href="/whoweare" class="btn btn-primary btn-sm">Read Our Inception &rarr;</a>
            <a href="/activities" class="btn btn-outline btn-sm">Daily Therapies &rarr;</a>
          </div>
        </div>
        <div style="position:relative;overflow:hidden;min-height:340px;background:var(--bg-warm)">
          <img src="/images/front_page_web.jpg"
               alt="Children smiling at Premavasam"
               style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center"
               loading="lazy">
        </div>
      </div>
    </article>

    <!-- ACTIVITIES BENTO -->
    <section style="margin-top:40px">
      <div class="section-header reveal">
        <span class="section-label">HOLISTIC CARE</span>
        <h2 class="section-title">Therapies &amp; Daily Life at Prema Vasam</h2>
        <p class="section-sub">We combine medical expertise, compassionate therapy, and cultural education to foster self-reliance.</p>
      </div>

      <div class="bento" style="margin-top:24px">

        <div class="act-card reveal bento-xl" style="background:linear-gradient(135deg,var(--bg-warm),var(--brand-pale));display:flex;gap:24px;align-items:flex-start">
          <div>
            <div class="act-icon" style="background:rgba(193,127,36,.18)">ðŸ¦½</div>
            <h3>Clinical Physiotherapy</h3>
            <p>Headed by Mr. Robinson, our team administers daily therapeutic exercises from 9:30 AM to 3:30 PM. Treatments include electrical stimulation with Electro Care machines, contracture removal, parallel bar gait training, and muscle stimulation. Children like Rohit, once bedridden with cerebral palsy, are now able to walk!</p>
            <a href="/activities" class="card-link">View Physio Program &rarr;</a>
          </div>
        </div>

        <div class="act-card reveal delay-1">
          <div class="act-icon" style="background:rgba(74,124,89,.15)">ðŸ§©</div>
          <h3>Occupational Therapy</h3>
          <p>Using fur toys, standing frames, CP chairs, and building blocks to relieve stiffness, normalize muscle tone, and achieve motor milestones.</p>
        </div>

        <div class="act-card reveal delay-2">
          <div class="act-icon" style="background:rgba(74,100,151,.15)">ðŸ“š</div>
          <h3>Special Education &amp; ADL</h3>
          <p>IQ-adapted learning with coloring books, puzzles, and clay. Trainable groups learn Activities of Daily Living (ADL) to become self-reliant.</p>
        </div>

        <div class="act-card reveal delay-1">
          <div class="act-icon" style="background:rgba(193,127,36,.15)">âš½</div>
          <h3>Play Therapy &amp; Sports</h3>
          <p>Structured games, running, and physical drills that build balance, coordination, team joy, and confidence for our special children.</p>
        </div>

        <div class="act-card reveal delay-2">
          <div class="act-icon" style="background:rgba(155,62,62,.15)">ðŸŽ­</div>
          <h3>Kalakshetra Classical Dance</h3>
          <p>Dance Masters from world-famous Kalakshetra teach Bharatha Natyam. School children also enjoy drumming, singing, drawing, and monthly outings.</p>
        </div>

        <div class="act-card reveal bento-wide" style="background:linear-gradient(135deg,var(--navy-pale),#E6EDF8)">
          <div class="act-icon" style="background:rgba(55,79,123,.15)">ðŸŽ“</div>
          <h3>Inclusive School Coaching</h3>
          <p>Normal children and special children live and grow together, building mutual empathy. School children attend neighborhood schools and receive special coaching and counseling.</p>
          <a href="/activities" class="card-link">See Full Activities &rarr;</a>
        </div>

      </div>
    </section>

    <!-- SPONSOR A MEAL HIGHLIGHT -->
    <section style="margin-top:48px" class="reveal">
      <div style="background:var(--bg-card);border:1.5px solid var(--border);border-radius:var(--r-xl);padding:36px;box-shadow:var(--sh-sm)">
        <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px;margin-bottom:24px;border-bottom:1px solid var(--border-soft);padding-bottom:16px">
          <div>
            <span class="section-label">FEED OUR CHILDREN</span>
            <h3 style="font-family:'Lora',serif;font-size:1.6rem;color:var(--txt)">Sponsor a Meal on Your Special Day</h3>
            <p style="font-size:.9rem;color:var(--txt-mid)">Celebrate birthdays, weddings, or anniversaries by feeding all 200 children with a fresh, hot feast.</p>
          </div>
          <a href="/sponsormeals" class="btn btn-outline btn-sm">Full Meal Tariff &rarr;</a>
        </div>

        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px">
          <div style="background:var(--bg-soft);padding:18px;border-radius:var(--r-md);text-align:center;border:1px solid var(--border-soft)">
            <span style="font-size:1.8rem;display:block;margin-bottom:4px">ðŸŒ…</span>
            <strong style="font-size:.95rem;display:block">Breakfast</strong>
            <span style="font-size:.78rem;color:var(--txt-muted)">Idli, Vada, Sambar</span>
            <div style="font-family:'Lora',serif;font-size:1.2rem;font-weight:700;color:var(--brand-deep);margin-top:6px">â‚¹3,500</div>
          </div>
          <div style="background:var(--brand-pale);padding:18px;border-radius:var(--r-md);text-align:center;border:1.5px solid var(--brand-light)">
            <span style="font-size:1.8rem;display:block;margin-bottom:4px">â˜€ï¸</span>
            <strong style="font-size:.95rem;display:block">Full Lunch</strong>
            <span style="font-size:.78rem;color:var(--txt-muted)">Festive Veg Feast</span>
            <div style="font-family:'Lora',serif;font-size:1.2rem;font-weight:700;color:var(--brand-deep);margin-top:6px">â‚¹5,000</div>
          </div>
          <div style="background:var(--bg-soft);padding:18px;border-radius:var(--r-md);text-align:center;border:1px solid var(--border-soft)">
            <span style="font-size:1.8rem;display:block;margin-bottom:4px">ðŸŒ™</span>
            <strong style="font-size:.95rem;display:block">Warm Dinner</strong>
            <span style="font-size:.78rem;color:var(--txt-muted)">Tiffin &amp; Chappathi</span>
            <div style="font-family:'Lora',serif;font-size:1.2rem;font-weight:700;color:var(--brand-deep);margin-top:6px">â‚¹5,000</div>
          </div>
          <div style="background:var(--bg-soft);padding:18px;border-radius:var(--r-md);text-align:center;border:1px solid var(--border-soft)">
            <span style="font-size:1.8rem;display:block;margin-bottom:4px">ðŸ¦</span>
            <strong style="font-size:.95rem;display:block">Ice-Cream Treat</strong>
            <span style="font-size:.78rem;color:var(--txt-muted)">Cups for 200 kids</span>
            <div style="font-family:'Lora',serif;font-size:1.2rem;font-weight:700;color:var(--brand-deep);margin-top:6px">â‚¹4,500</div>
          </div>
        </div>
      </div>
    </section>

    <!-- QUOTE BLOCK -->
    <div class="quote-block reveal" style="margin-top:40px">
      <blockquote>
        &ldquo;The motto of Prema Vasam is &lsquo;to serve... not to be served...&rsquo; but my time here has shown that you can be served by those who you are also serving. The love that I have felt from my Prema Vasam family has enriched my life more than words can describe.&rdquo;
        <cite>&mdash; Rachel Head, Volunteer from UK</cite>
      </blockquote>
    </div>

    <!-- VIDEO STORY -->
    <div class="reveal" style="background:var(--bg-card);border-radius:var(--r-xl);border:1px solid var(--border-soft);box-shadow:var(--sh-sm);overflow:hidden;margin-top:40px">
      <div style="padding:28px 36px 20px;display:flex;align-items:center;gap:14px">
        <div style="width:48px;height:48px;background:var(--brand);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.1rem;color:white;flex-shrink:0;box-shadow:var(--sh-brand)">â–¶</div>
        <div>
          <h3 style="font-family:'Lora',serif;font-size:1.3rem;color:var(--txt)">Watch Our Journey &bull; Documentary Story</h3>
          <p style="font-size:.85rem;color:var(--txt-muted);margin-top:2px">Experience the heartwarming daily life, clinical therapies, and smiles of our children.</p>
        </div>
      </div>
      <div style="position:relative;padding-bottom:56.25%;background:var(--txt)">
        <iframe src="https://www.youtube.com/embed/bN3EokxgQBI"
          title="Premavasam â€” Our Story" allowfullscreen loading="lazy"
          style="position:absolute;inset:0;width:100%;height:100%;border:none">
        </iframe>
      </div>
    </div>

    <!-- CTA BANNER -->
    <div class="reveal" style="background:linear-gradient(135deg,var(--brand-pale) 0%,var(--bg-warm) 100%);border:2px solid var(--brand);border-radius:var(--r-xl);padding:44px 48px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;margin-top:40px;position:relative;overflow:hidden">
      <div>
        <div style="font-size:.75rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--brand-deep);margin-bottom:8px">BECOME A BLESSING TODAY</div>
        <h3 style="font-family:'Lora',serif;font-size:1.65rem;color:var(--txt);margin-bottom:8px">Join Our Family in Spreading Love</h3>
        <p style="font-size:.92rem;color:var(--txt-mid);max-width:440px">Every act of kindness &mdash; sponsoring a breakfast, sharing groceries, or sending a kind thought &mdash; directly uplifts a child's world.</p>
      </div>
      <div style="display:flex;gap:12px;flex-wrap:wrap;position:relative;z-index:1">
        <a href="/howhelp" class="btn btn-primary">Donate Online</a>
        <a href="/contact" class="btn btn-outline">Visit Our Home</a>
      </div>
    </div>

  </main>
</div>
`});

// Write all pages
const pages = {
  'index.html': indexHtml,
  'about.html': aboutHtml,
  'whoweare.html': whoweareHtml,
  'activities.html': activitiesHtml,
  'achievements.html': achievementsHtml
};

Object.entries(pages).forEach(([filename, html]) => {
  fs.writeFileSync(path.join(ROOT, filename), html, 'utf8');
  console.log(`âœ… Rebuilt with local images: ${filename} (${html.length} bytes)`);
});

