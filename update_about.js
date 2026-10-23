const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

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

function getWhoWeAreContent() {
  return `
  <!-- ══ PAGE HERO ═══════════════════════════════════════════ -->
  <section class="page-hero">
    <div class="page-hero-inner">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a> <span>/</span> <strong>About Us &bull; Who We Are</strong>
      </nav>
      <span class="hero-tag">A HOME WHERE LOVE RESIDES &bull; EST. JUNE 2, 1999</span>
      <h1 class="page-title">Who We Are &bull; About Prema Vasam</h1>
      <p class="page-lead">A sanctuary for mentally and physically challenged and less fortunate children &mdash; welcoming every child with love, so that they can serve, not be served.</p>
    </div>
  </section>

  <section class="section">
    <div class="section-inner">

      <!-- 1. HEARTY WELCOME TO PREMA VASAM WITH ORIGINAL splgroup.jpg -->
      <article class="reveal" style="background:var(--bg-card); border-radius:var(--r-2xl); border:1px solid var(--border-soft); box-shadow:var(--sh-sm); overflow:hidden; margin-bottom:48px;">
        <div style="padding:48px 44px 36px;">
          <span class="section-label">ORIGINAL SANCTUARY</span>
          <h2 style="font-family:'Lora',serif; font-size:2.2rem; color:var(--txt); margin-bottom:20px;">Hearty Welcome to Prema Vasam</h2>
          
          <div style="border-radius:var(--r-xl); overflow:hidden; margin-bottom:28px; box-shadow:var(--sh-md); border:2px solid var(--border);">
            <img src="/images/splgroup.jpg" alt="Special Children Group at Prema Vasam" style="width:100%; max-height:480px; object-fit:cover;">
            <div style="padding:10px 18px; background:var(--bg-soft); font-size:.82rem; color:var(--txt-mid); text-align:center; font-weight:600; border-top:1px solid var(--border-soft);">
              📷 <em>Special Children of Prema Vasam &bull; Gerugambakkam Campus</em>
            </div>
          </div>

          <p style="font-size:1.1rem; line-height:1.85; color:var(--txt); margin-bottom:16px;">
            <strong>PREMA VASAM</strong> is a home for the Mentally &amp; Physically Challenged and Less Fortunate Children. It is the only home of its kind that caters to the needs of a large number of special children along with the less fortunate school-going children.
          </p>
          <p style="font-size:1.02rem; line-height:1.85; color:var(--txt-mid); margin-bottom:16px;">
            It aims to work with these special children and their families irrespective of <strong>caste, creed, religion and financial background</strong>. As the name Prema Vasam means, it is a <strong>place of love or where love resides</strong>. Prema Vasam provides residential care to the children who are differently abled, mentally challenged and less fortunate. It renders relentless service to these children to realize their potentials and to enable them to serve others.
          </p>
          <p style="font-size:1.02rem; line-height:1.85; color:var(--txt-mid); margin-bottom:24px;">
            It is registered under Charitable Trust Act, <strong>Registration No. 419 of 1999</strong>. Further it is a non profitable organization.
          </p>

          <div class="badge-trust-strip">
            <div class="trust-pill">📜 Registered Charitable Trust Act: No. 419 of 1999</div>
            <div class="trust-pill">🤝 100% Non-Profit Organization</div>
            <div class="trust-pill">👶 Home for 200+ Children (132 Special Children)</div>
            <div class="trust-pill">🌍 FCRA Approved for Foreign Contributions</div>
          </div>
        </div>
      </article>

      <!-- 2. THE INCEPTION & INDRA'S STORY (ADJUSTED FACE FRAMING) -->
      <article class="reveal delay-1" style="background:var(--bg-card); border-radius:var(--r-2xl); border:1px solid var(--border-soft); box-shadow:var(--sh-sm); overflow:hidden; margin-bottom:48px;">
        <div style="display:grid; grid-template-columns:380px 1fr;">
          <div style="background:var(--bg-warm); padding:36px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; border-right:1px solid var(--border-soft);">
            <div style="width:280px; height:320px; border-radius:var(--r-xl); overflow:hidden; box-shadow:var(--sh-md); border:4px solid var(--brand-pale); margin-bottom:16px; background:#fff;">
              <!-- Indra face is centered at 68% X, 12% Y -->
              <img src="/images/indra.jpg" alt="Indra - Director of Prem Illam" class="img-indra" style="width:100%; height:100%;">
            </div>
            <h3 style="font-family:'Lora',serif; font-size:1.4rem; color:var(--txt); margin-bottom:4px;">Indra</h3>
            <span style="font-size:.82rem; font-weight:700; color:var(--brand-deep); text-transform:uppercase; letter-spacing:.08em;">Director &bull; Prem Illam</span>
            <p style="font-size:.82rem; color:var(--txt-muted); margin-top:8px;">MCA (Anna University 1st Class), Special Educator</p>
          </div>
          <div style="padding:48px 44px; display:flex; flex-direction:column; justify-content:center;">
            <span class="section-label">FOUNDED JUNE 2, 1999</span>
            <h2 style="font-family:'Lora',serif; font-size:1.85rem; color:var(--txt); margin-bottom:16px;">The Inception</h2>
            <p style="font-size:1.02rem; line-height:1.85; color:var(--txt); margin-bottom:14px;">
              <strong>Mr. Selvyn Roy</strong>, is the administrator of Prema Vasam. He has found Prema Vasam on <strong>2nd of June 1999</strong> when he decided to educate Indra, a 14 year old differently abled girl. Indra was totally depressed and extremely low in spirit due to her inability to go to school like the children of her age.
            </p>
            <p style="font-size:.98rem; line-height:1.85; color:var(--txt-mid); margin-bottom:14px;">
              She joined in eighth standard, later she scored <strong>420/500 marks</strong> in her SSLC board exam. She became an outstanding student in Under Graduation in her college at St. Joseph's College.
            </p>
            <p style="font-size:.98rem; line-height:1.85; color:var(--txt-mid); margin-bottom:16px;">
              Now Indra has completed her masters from the prestigious <strong>Anna University in first class</strong> with passion for these special children she has done <strong>Special Education</strong> too. Indra now serves these children as the Director of <strong>Prem Illam</strong> happily, As our goal goes, <em>&ldquo;To Serve... Not to be served...&rdquo;</em> is achieved successfully.
            </p>
            <div class="quote-mini">
              &ldquo;As our goal goes: &lsquo;To Serve... Not to be served...&rsquo; is achieved successfully.&rdquo;
            </div>
          </div>
        </div>
      </article>

      <!-- 3. MR. SELVYN ROY'S CLINICAL BACKGROUND -->
      <article class="reveal delay-1" style="background:var(--bg-card); border-radius:var(--r-2xl); border:1px solid var(--border-soft); box-shadow:var(--sh-sm); overflow:hidden; margin-bottom:48px;">
        <div style="display:grid; grid-template-columns:1fr 380px;">
          <div style="padding:48px 44px; display:flex; flex-direction:column; justify-content:center;">
            <span class="section-label">FOUNDER &amp; CLINICAL PSYCHOLOGIST</span>
            <h2 style="font-family:'Lora',serif; font-size:1.85rem; color:var(--txt); margin-bottom:16px;">Mr. Selvyn Roy</h2>
            <p style="font-size:1.02rem; line-height:1.85; color:var(--txt); margin-bottom:14px;">
              Mr. Selvyn Roy is a <strong>clinical psychologist by profession</strong> with a post graduate degree in his field of specialization holds post graduate diploma in psychological counseling and guidance.
            </p>
            <p style="font-size:.98rem; line-height:1.85; color:var(--txt-mid); margin-bottom:14px;">
              He began his career in an Institution called <strong>MITHRA</strong> for the rehabilitation of Mentally and Physically Challenged Children as a Clinical Psychologist &ndash; cum Special Educator. Then he served in a Special School called <strong>Clark School for the children of Deaf and Dumb</strong> with mentally challenged children as a Special Educator, and voluntarily rendered his service to special children at <strong>Prithipura Infant Home in Sri Lanka</strong>.
            </p>
            <p style="font-size:.98rem; line-height:1.85; color:var(--txt-mid);">
              He found numerous misconceptions prevailing about the Physically and Mentally Challenged children in the existing society. But he realized the extraordinary talents and human dignity of those special children. The thought that if they get special care and specialized education, they will prove themselves as <strong>architects of a new society</strong>, influenced him to start PREMA VASAM. Today, Prema Vasam is a home for more than 200 children including 132 special Children.
            </p>
          </div>
          <div style="background:var(--bg-warm); padding:36px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; border-left:1px solid var(--border-soft);">
            <div style="width:280px; height:320px; border-radius:var(--r-xl); overflow:hidden; box-shadow:var(--sh-md); border:3px solid var(--brand); margin-bottom:16px; background:#fff;">
              <img src="/images/selvyn_roy.jpg" alt="Mr. Selvyn Roy with children" class="img-selvyn" style="width:100%; height:100%;">
            </div>
            <h3 style="font-family:'Lora',serif; font-size:1.35rem; color:var(--txt); margin-bottom:4px;">Mr. Selvyn Roy</h3>
            <span style="font-size:.82rem; font-weight:700; color:var(--brand-deep); text-transform:uppercase; letter-spacing:.08em;">Founder &bull; Administrator</span>
            <p style="font-size:.82rem; color:var(--txt-muted); margin-top:8px;">P.G. Clinical Psychology &bull; Guidance Counseling</p>
          </div>
        </div>
      </article>

      <!-- 4. PRECIOUS GIFT PREM -->
      <article class="reveal delay-2" style="background:linear-gradient(135deg, var(--bg-warm) 0%, #FAF0DC 100%); border-radius:var(--r-2xl); border:2px solid var(--border); box-shadow:var(--sh-sm); overflow:hidden; margin-bottom:48px;">
        <div style="display:grid; grid-template-columns:380px 1fr;">
          <div style="padding:36px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
            <div style="width:280px; height:300px; border-radius:var(--r-xl); overflow:hidden; box-shadow:var(--sh-md); border:4px solid var(--brand); margin-bottom:16px; background:#fff;">
              <img src="/images/baby_prem.jpg" alt="Baby Prem (Appa)" class="img-prem" style="width:100%; height:100%;">
            </div>
            <h3 style="font-family:'Lora',serif; font-size:1.4rem; color:var(--txt); margin-bottom:4px;">Baby Prem (&ldquo;Appa&rdquo;)</h3>
            <span style="font-size:.82rem; font-weight:700; color:var(--brand-deep); text-transform:uppercase; letter-spacing:.08em;">The Precious Gift</span>
          </div>
          <div style="padding:48px 44px; display:flex; flex-direction:column; justify-content:center;">
            <span class="section-label" style="color:var(--brand-deep)">HOW OUR HOME GOT ITS NAME</span>
            <h2 style="font-family:'Lora',serif; font-size:1.85rem; color:var(--txt); margin-bottom:16px;">Precious Gift Prem</h2>
            <p style="font-size:1.02rem; line-height:1.85; color:var(--txt); margin-bottom:14px;">
              An abandoned boy was found by Selvyn Roy in a dying stage near Aminjikarai on <strong>May 14th 1999</strong> at Chennai city. He did not know who gave him the strength and courage to pick him up in a dying stage.
            </p>
            <p style="font-size:.98rem; line-height:1.85; color:var(--txt-mid); margin-bottom:14px;">
              Though he is a severely mentally and physically challenged boy, he is very cheerful. Though he is a bed ridden boy, fully needs our care and support in return he gives a very beautiful smile. Often he proves himself that he is a precious gift to Prema Vasam.
            </p>
            <div class="quote-mini" style="background:#fff; margin-top:8px;">
              &ldquo;Since we did not know his name, we named him <strong>Prem</strong>. Later where Prem lives has become <strong>PREMA VASAM</strong>. Our home was named after his name.&rdquo;
            </div>
          </div>
        </div>
      </article>

      <!-- 5. MISS MUMTAJ (ADJUSTED FACE FRAMING) -->
      <article class="reveal delay-2" style="background:var(--bg-card); border-radius:var(--r-2xl); border:1px solid var(--border-soft); box-shadow:var(--sh-sm); overflow:hidden; margin-bottom:48px;">
        <div style="display:grid; grid-template-columns:1fr 380px;">
          <div style="padding:48px 44px; display:flex; flex-direction:column; justify-content:center;">
            <span class="section-label">PILLAR OF DAILY REHABILITATION</span>
            <h2 style="font-family:'Lora',serif; font-size:1.85rem; color:var(--txt); margin-bottom:16px;">Miss Mumtaj &bull; Co-ordinator</h2>
            <p style="font-size:1.02rem; line-height:1.85; color:var(--txt); margin-bottom:14px;">
              <strong>Miss Mumtaj</strong> is the coordinator of Prema Vasam. She is also a qualified <strong>Multi Rehabilitational Worker</strong>.
            </p>
            <p style="font-size:.98rem; line-height:1.85; color:var(--txt-mid); margin-bottom:14px;">
              She is working tirelessly for children of Prema Vasam since 2000, a year after Selvyn started the home, and it is her efforts that keep the programs at Prema Vasam running smoothly.
            </p>
            <p style="font-size:.98rem; line-height:1.85; color:var(--txt-mid);">
              She oversees all functions, such as communications, accounts and auditing, and all office work. Furthermore, when any of the children are sick, she instructs the nurses, as she knows each of the special children's medical conditions.
            </p>
          </div>
          <div style="background:var(--bg-soft); padding:36px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; border-left:1px solid var(--border-soft);">
            <div style="width:280px; height:340px; border-radius:var(--r-xl); overflow:hidden; box-shadow:var(--sh-md); border:3px solid var(--brand); margin-bottom:16px; background:#fff;">
              <!-- Mumtaj face starts at top 6% of the 752x1200 portrait -->
              <img src="/images/mumtaj.jpg" alt="Miss Mumtaj" class="img-mumtaj" style="width:100%; height:100%;">
            </div>
            <h3 style="font-family:'Lora',serif; font-size:1.35rem; color:var(--txt); margin-bottom:4px;">Miss Mumtaj</h3>
            <span style="font-size:.82rem; font-weight:700; color:var(--brand-deep); text-transform:uppercase; letter-spacing:.08em;">Operations Coordinator</span>
            <p style="font-size:.82rem; color:var(--txt-muted); margin-top:8px;">Serving since 2000 &bull; Multi Rehabilitational Worker</p>
          </div>
        </div>
      </article>

      <!-- 6. THREE LEADERSHIP PILLARS (WITH ADJUSTED SQUARE/PORTRAIT FRAMING) -->
      <div style="margin-bottom:48px;" class="reveal">
        <div class="section-header centered">
          <span class="section-label">OUR PILLARS</span>
          <h2 class="section-title">Leadership &bull; At a Glance</h2>
        </div>
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:24px; margin-top:28px;">
          <div class="card" style="text-align:center; padding:28px 20px;">
            <div style="width:160px; height:180px; border-radius:var(--r-xl); overflow:hidden; margin:0 auto 16px; border:3px solid var(--brand-pale); box-shadow:var(--sh-sm); background:#fff;">
              <img src="/images/selvyn_roy.jpg" alt="Mr. Selvyn Roy" class="img-selvyn" style="width:100%; height:100%;">
            </div>
            <h3 style="font-size:1.25rem; margin-bottom:4px;">Mr. Selvyn Roy</h3>
            <span style="font-size:.78rem; color:var(--brand-deep); font-weight:700; text-transform:uppercase; letter-spacing:.06em;">Founder &bull; Administrator</span>
            <p style="font-size:.85rem; color:var(--txt-mid); margin-top:10px; line-height:1.6;">Clinical psychologist by profession, dedicating his life to special children since 1999.</p>
          </div>

          <div class="card" style="text-align:center; padding:28px 20px;">
            <div style="width:160px; height:180px; border-radius:var(--r-xl); overflow:hidden; margin:0 auto 16px; border:3px solid var(--brand-pale); box-shadow:var(--sh-sm); background:#fff;">
              <img src="/images/indra.jpg" alt="Indra" class="img-indra" style="width:100%; height:100%;">
            </div>
            <h3 style="font-size:1.25rem; margin-bottom:4px;">Indra</h3>
            <span style="font-size:.78rem; color:var(--brand-deep); font-weight:700; text-transform:uppercase; letter-spacing:.06em;">Director &bull; Prem Illam</span>
            <p style="font-size:.85rem; color:var(--txt-mid); margin-top:10px; line-height:1.6;">First child educated by Selvyn Roy. Anna University MCA First Class &amp; Special Educator.</p>
          </div>

          <div class="card" style="text-align:center; padding:28px 20px;">
            <div style="width:160px; height:180px; border-radius:var(--r-xl); overflow:hidden; margin:0 auto 16px; border:3px solid var(--brand-pale); box-shadow:var(--sh-sm); background:#fff;">
              <img src="/images/mumtaj.jpg" alt="Miss Mumtaj" class="img-mumtaj" style="width:100%; height:100%;">
            </div>
            <h3 style="font-size:1.25rem; margin-bottom:4px;">Miss Mumtaj</h3>
            <span style="font-size:.78rem; color:var(--brand-deep); font-weight:700; text-transform:uppercase; letter-spacing:.06em;">Co-ordinator &bull; Operations</span>
            <p style="font-size:.85rem; color:var(--txt-mid); margin-top:10px; line-height:1.6;">Multi-Rehabilitational Worker serving tirelessly since 2000, managing healthcare and administration.</p>
          </div>
        </div>
      </div>

      <!-- 7. EXTENDED BRANCHES LINKS -->
      <div class="reveal" style="background:var(--bg-warm); border-radius:var(--r-2xl); padding:44px; border:1px solid var(--border); text-align:center;">
        <span class="section-label">CONTINUING THE MISSION</span>
        <h2 style="font-family:'Lora',serif; font-size:1.8rem; color:var(--txt); margin-bottom:12px;">Discover More About Our Family</h2>
        <p style="font-size:.95rem; color:var(--txt-mid); max-width:600px; margin:0 auto 24px;">Explore our extended homes across Tamil Nadu, clinical therapies, or sponsor a meal for 200 children.</p>
        <div style="display:flex; gap:14px; justify-content:center; flex-wrap:wrap;">
          <a href="/projects" class="btn btn-primary">Our Extended Projects (Prem Niketan &amp; Prem Illam) &rarr;</a>
          <a href="/achievements" class="btn btn-outline">Our Achievements &amp; Dreams &rarr;</a>
          <a href="/activities" class="btn btn-navy">Therapies &amp; Daily Life &rarr;</a>
        </div>
      </div>

    </div>
  </section>
  `;
}

const whoWeAreHtmlContent = wrapPage({
  title: 'About Us &bull; Who We Are',
  active: 'about',
  description: 'Who We Are at Prema Vasam - Founder Selvyn Roy, Indra, Baby Prem, Miss Mumtaj, and our history since 1999.',
  content: getWhoWeAreContent()
});

fs.writeFileSync(path.join(ROOT, 'about.html'), whoWeAreHtmlContent, 'utf8');
fs.writeFileSync(path.join(ROOT, 'whoweare.html'), whoWeAreHtmlContent, 'utf8');

console.log('✅ Updated about.html and whoweare.html with precise face alignment coordinates for Indra and Mumtaj!');
