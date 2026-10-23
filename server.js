/**
 * ══════════════════════════════════════════════════════════
 * PREMAVASAM &bull; Production-Grade Web Server & REST API
 * Modern Responsive UI &bull; Native node:http + node:sqlite
 * Port: 3000 (or process.env.PORT) &bull; Zero External DB Dependencies
 * ══════════════════════════════════════════════════════════
 */

const http = require('http');
const fs   = require('fs');
const path = require('path');
const url  = require('url');
const db   = require('./db.js');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// ── 1. ROUTE MAPPINGS (CLEAN URLs, ADMIN & LEGACY ALIASES) ───
const ROUTE_MAP = {
  // Clean URLs
  '/':                       'index.html',
  '/index.html':             'index.html',
  '/home':                   'index.html',
  '/about':                  'about.html',
  '/whoweare':               'whoweare.html',
  '/projects':               'projects.html',
  '/achievements':           'achievements.html',
  '/activities':             'activities.html',
  '/gallery':                'gallery.html',
  '/howhelp':                'howhelp.html',
  '/sponsormeals':           'sponsormeals.html',
  '/sharecare':              'sharecare.html',
  '/volunteers':             'volunteers.html',
  '/press':                  'press.html',
  '/contact':                'contact.html',
  '/admin':                  'admin.html',
  '/admin.html':             'admin.html',
  '/admin/login':            'admin.html',
  '/admin/dashboard':        'admin.html',
  '/manifest.json':          'manifest.json',
  '/sw.js':                  'sw.js',
  '/css/styles.css':         'css/styles.css',
  '/js/app.js':              'js/app.js',

  // Legacy Drupal Aliases
  '/content/about-us':       'about.html',
  '/content/who-we-are':     'whoweare.html',
  '/content/our-projects':   'projects.html',
  '/content/achievements':   'achievements.html',
  '/content/activities':     'activities.html',
  '/content/gallery':        'gallery.html',
  '/content/how-can-you-help': 'howhelp.html',
  '/content/sponsor-meals':  'sponsormeals.html',
  '/content/share-and-care': 'sharecare.html',
  '/content/volunteers':     'volunteers.html',
  '/content/press-release':  'press.html',
  '/node/1':                 'index.html'
};

// ── 2. SITE SEARCH INDEX (FOR /api/search) ──────────────────
const SEARCH_INDEX = [
  {
    title: 'Physiotherapy & Clinical Rehabilitation',
    category: 'Therapy & Care',
    url: '/activities',
    keywords: 'physiotherapy robinson cerebral palsy electro care machine paralyzed walking rohit meenakshi exercise contracture',
    snippet: 'Daily physiotherapy 9:30 AM–3:30 PM for cerebral palsy and autistic children. Children once bedridden now walk!'
  },
  {
    title: 'Occupational Therapy',
    category: 'Therapy & Care',
    url: '/activities',
    keywords: 'occupational sensory toys standing frame cp chair milestones grasping muscle tone cognitive',
    snippet: 'Using fur toys, standing frames and CP chairs to normalize tone, relieve tightness, and cultivate milestone achievements.'
  },
  {
    title: 'Special Education & Daily Living (ADL)',
    category: 'Therapy & Care',
    url: '/activities',
    keywords: 'special education adl slow learners iq testing clay coloring puzzles independent daily living',
    snippet: 'IQ-adapted learning with coloring books, puzzles, clay, arithmetic and Activities of Daily Living for independent living.'
  },
  {
    title: 'Kalakshetra Bharatha Natyam & Cultural Arts',
    category: 'Therapy & Care',
    url: '/activities',
    keywords: 'dance kalakshetra bharatha natyam singing music drawing painting drums picnic outing',
    snippet: 'Classical Bharatha Natyam taught by Kalakshetra dance gurus, plus painting, drumming, and monthly picnics.'
  },
  {
    title: 'Sponsor Daily Meals (Breakfast, Lunch, Dinner)',
    category: 'Donations & Meals',
    url: '/sponsormeals',
    keywords: 'sponsor meals breakfast lunch dinner ice cream payasam vadai birthday anniversary 3500 5000 6500 9000 menu food',
    snippet: 'Tariff per day: Breakfast (₹3,500), Veg Lunch with Vadai & Payasam (₹6,500), Dinner (₹5,000), Ice Cream treat (₹4,500).'
  },
  {
    title: 'Bank Transfer & NRI Remittance (FCRA)',
    category: 'Donations & Banking',
    url: '/howhelp',
    keywords: 'bank of baroda sbi fcra account nri donate transfer kovoor ifsc barb0kovoor sbin0000691 swift sbininbb104 20460100001458',
    snippet: 'Domestic Bank of Baroda account 20460100001458 (BARB0KOVOOR) and NRI SBI FCRA account 40172248120 (SBIN0000691).'
  },
  {
    title: 'Who We Are & The Inception Story',
    category: 'About Us',
    url: '/whoweare',
    keywords: 'who we are selvyn roy inception 1999 prem baby indra polio mumtaj coordinator psychologist trust history',
    snippet: 'Founded June 2, 1999 by Mr. Selvyn Roy after educating Indra. Named after dying baby Prem rescued in Aminjikarai.'
  },
  {
    title: 'Extended Projects &bull; Prem Niketan & Prem Illam',
    category: 'About Us',
    url: '/projects',
    keywords: 'projects prem niketan boys arakonam prem illam maduranthakam girls special home school',
    snippet: 'Prem Niketan started 2011 for older boys in Arakonam; Prem Illam established 2017 for girl children in Maduranthakam.'
  },
  {
    title: 'Achievements & Milestones',
    category: 'About Us',
    url: '/achievements',
    keywords: 'achievements awards indra university first class bca mca anna university concrete building mothers serving',
    snippet: 'Indra scored 84% in 10th and completed MCA First Class at Anna University. Over 200 children nurtured with love.'
  },
  {
    title: 'Volunteers Love & Experiences',
    category: 'Echo',
    url: '/volunteers',
    keywords: 'volunteers charlotte pia rachel katrin testimonials overseas international experience reviews',
    snippet: 'Stories from international volunteers: Charlotte De Val, Pia Zefferer, Rachel Head, and Katrin Schlöglhofer.'
  },
  {
    title: 'Press & Media Coverage',
    category: 'Echo',
    url: '/press',
    keywords: 'press media the hindu express dina thanthi daily thanthi junior vikatan city express news articles',
    snippet: 'Featured in The Hindu, Indian Express, Daily Thanthi, Junior Vikatan, and Times of India.'
  },
  {
    title: 'Contact Us & Location',
    category: 'Contact',
    url: '/contact',
    keywords: 'contact phone email address location gerugambakkam chennai selvyn roy mumtaj 9677238998 directions map',
    snippet: 'Prema Vasam, Thiru V.K.A. Road, Gerugambakkam, Chennai 600128. Tel: +91 96772 38998, 044-23820771.'
  },
  {
    title: 'Photo Gallery & Albums',
    category: 'Gallery',
    url: '/gallery',
    keywords: 'gallery photos happy schooling diwali 2024 sports meet our beautiful children memories albums',
    snippet: 'Authentic photos covering Diwali celebrations, Happy Schooling classes, World Disabled Day sports meet, and daily joy.'
  }
];

// ── 3. MIME TYPES ───────────────────────────────────────────
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.webp': 'image/webp',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.mp4':  'video/mp4'
};

// ── 3B. DEVICE DETECTION (MOBILE APP, TABLET, DESKTOP) ───────
function detectDevice(req) {
  const ua = (req.headers['user-agent'] || '').toLowerCase();
  const chMobile = req.headers['sec-ch-ua-mobile'];
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;

  if (query.view === 'mobile' || query.app === '1' || query.view === 'app') {
    return {
      type: 'mobile',
      isMobile: true,
      isTablet: false,
      isApp: true,
      mode: 'mobile-app-simulated',
      os: 'Simulated Mobile App',
      browser: 'Mobile WebApp'
    };
  }
  if (query.view === 'desktop') {
    return {
      type: 'desktop',
      isMobile: false,
      isTablet: false,
      isApp: false,
      mode: 'desktop-simulated',
      os: 'Desktop',
      browser: 'Desktop Browser'
    };
  }

  const isAndroid = /android/i.test(ua);
  const isIOS = /iphone|ipad|ipod/i.test(ua);
  const isIPad = isIPadCheck(ua, isIOS, req);
  const isTablet = isIPad || (/android/i.test(ua) && !/mobile/i.test(ua)) || /tablet|playbook|silk/i.test(ua);
  const isMobile = chMobile === '?1' || (!isTablet && (isAndroid || /iphone|ipod|blackberry|iemobile|opera mini|mobile/i.test(ua)));

  const isWebView = /(wv|\.0\.0\.0|mobile.*safari.*version\/|version\/.*safari)/i.test(ua) && (isAndroid || isIOS);
  const isStandalone = req.headers['sec-fetch-dest'] === 'document' && req.headers['sec-ch-ua-platform'] === 'Android';
  const isApp = isWebView || isStandalone || Boolean(query.app);

  return {
    type: isTablet ? 'tablet' : (isMobile ? 'mobile' : 'desktop'),
    isMobile: isMobile || isTablet,
    isTablet: Boolean(isTablet),
    isApp: Boolean(isApp),
    mode: isMobile ? 'mobile-app' : (isTablet ? 'tablet-app' : 'desktop-view'),
    os: isAndroid ? 'Android' : (isIOS ? 'iOS' : (/windows/i.test(ua) ? 'Windows' : (/mac/i.test(ua) ? 'macOS' : 'Linux'))),
    browser: /chrome|crios/i.test(ua) ? 'Chrome' : (/safari/i.test(ua) ? 'Safari' : (/firefox/i.test(ua) ? 'Firefox' : (/edge/i.test(ua) ? 'Edge' : 'Browser')))
  };
}

function isIPadCheck(ua, isIOS, req) {
  return /ipad/i.test(ua) || (isIOS && /macintosh/i.test(ua) && Boolean(req.headers['sec-ch-ua-platform']));
}

// ── 4. HELPER: PARSE JSON BODY ──────────────────────────────
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 2e6) { // 2MB limit
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        resolve({});
      }
    });
  });
}

// ── 5. HELPER: SERVE STATIC FILE ────────────────────────────
function serveFile(res, filePath, statusCode = 200, req = null) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      serve404(res, filePath);
      return;
    }
    const ext  = path.extname(filePath).toLowerCase();
    const mime = MIME_TYPES[ext] || 'application/octet-stream';
    const device = req ? detectDevice(req) : { type: 'unknown', isApp: false };

    const headers = {
      'Content-Type': mime,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Device-Type': device.type,
      'X-Mobile-App': device.isApp ? 'true' : 'false'
    };

    if (filePath.endsWith('sw.js')) {
      headers['Service-Worker-Allowed'] = '/';
      headers['Cache-Control'] = 'no-cache';
    }

    res.writeHead(statusCode, headers);
    res.end(data);
  });
}

function serve404(res, attemptedPath) {
  const file404 = path.join(ROOT, '404.html');
  fs.readFile(file404, (err, data) => {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    if (err) {
      res.end(`<!DOCTYPE html><html><body style="font-family:sans-serif;padding:60px;text-align:center;background:#FEF9F2">
        <h1 style="color:#C17F24;font-size:3rem">404 &bull; Page Not Found</h1>
        <p style="color:#5C4A38;font-size:1.1rem">The requested page could not be located on the server.</p>
        <p><a href="/" style="color:#C17F24;font-weight:bold;text-decoration:none;">&larr; Return to Premavasam Home</a></p>
      </body></html>`);
    } else {
      res.end(data);
    }
  });
}

// ── 6. MAIN HTTP SERVER ─────────────────────────────────────
const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  let pathname = decodeURIComponent(parsed.pathname).replace(/\/+$/, '') || '/';

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // ── BACKEND API: /api/search ───────────────────────────────
  if (pathname === '/api/search' && req.method === 'GET') {
    const q = (parsed.query.q || '').trim().toLowerCase();
    if (!q) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ query: '', results: [] }));
      return;
    }

    const matches = SEARCH_INDEX.filter(item => {
      const haystack = (item.title + ' ' + item.keywords + ' ' + item.snippet + ' ' + item.category).toLowerCase();
      return haystack.includes(q);
    });

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ query: q, total: matches.length, results: matches }));
    return;
  }

  // Helper: Auth check for Admin APIs
  function authenticateAdmin(request) {
    let token = null;
    const authHeader = request.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7).trim();
    } else if (parsed.query && parsed.query.token) {
      token = parsed.query.token;
    } else {
      const cookie = request.headers['cookie'];
      if (cookie) {
        const m = cookie.match(/premavasam_admin_session=([^;]+)/);
        if (m) token = decodeURIComponent(m[1]);
      }
    }
    if (!token) return null;
    return db.getSession(token);
  }

  // ════════════════════════════════════════════════════════════
  // ── PROTECTED ADMIN ROUTES (BEARER TOKEN AUTHENTICATION) ───
  // ════════════════════════════════════════════════════════════

  // 1. POST /api/admin/login
  if (pathname === '/api/admin/login' && req.method === 'POST') {
    try {
      const data = await parseJsonBody(req);
      const username = (data.username || '').trim();
      const password = data.password || '';

      const admin = db.verifyAdmin(username, password);
      if (!admin) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'Invalid username or password' }));
        return;
      }

      const session = db.createSession(admin.id);
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Set-Cookie': `premavasam_admin_session=${encodeURIComponent(session.token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 86400}`
      });
      res.end(JSON.stringify({ ok: true, token: session.token, admin }));
      return;
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: err.message }));
      return;
    }
  }

  // 2. POST /api/admin/logout
  if (pathname === '/api/admin/logout' && req.method === 'POST') {
    const session = authenticateAdmin(req);
    if (session) {
      db.deleteSession(session.token);
    }
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Set-Cookie': 'premavasam_admin_session=; Path=/; HttpOnly; Max-Age=0'
    });
    res.end(JSON.stringify({ ok: true, message: 'Logged out successfully' }));
    return;
  }

  // 3. GET /api/admin/verify (or /api/admin/me)
  if ((pathname === '/api/admin/verify' || pathname === '/api/admin/me') && req.method === 'GET') {
    const session = authenticateAdmin(req);
    if (!session) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: 'Unauthorized' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      ok: true,
      admin: { id: session.admin_id, username: session.username, name: session.name, role: session.role }
    }));
    return;
  }

  // 4. GET /api/admin/dashboard-stats
  if (pathname === '/api/admin/dashboard-stats' && req.method === 'GET') {
    const session = authenticateAdmin(req);
    if (!session) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: 'Unauthorized' }));
      return;
    }
    const stats = db.getDashboardStats();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, stats }));
    return;
  }

  // 5. GET/PUT /api/admin/meals
  if (pathname === '/api/admin/meals') {
    const session = authenticateAdmin(req);
    if (!session) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: 'Unauthorized' }));
      return;
    }

    if (req.method === 'GET') {
      const meals = db.getAllMealBookings();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, meals }));
      return;
    }

    if (req.method === 'PUT' || (req.method === 'POST' && pathname.endsWith('/status'))) {
      const data = await parseJsonBody(req);
      db.updateMealBookingStatus(data.id, data.payment_status || data.status || 'confirmed');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, message: 'Meal booking status updated successfully' }));
      return;
    }

    if (req.method === 'DELETE' || (req.method === 'POST' && pathname.endsWith('/delete'))) {
      const data = await parseJsonBody(req);
      const id = data.id || parsed.query.id;
      db.deleteMealBooking(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, message: 'Meal booking deleted' }));
      return;
    }
  }

  // Legacy sub-routes for meals
  if (pathname === '/api/admin/meals/status' && req.method === 'POST') {
    const session = authenticateAdmin(req);
    if (!session) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: 'Unauthorized' }));
      return;
    }
    const data = await parseJsonBody(req);
    db.updateMealBookingStatus(data.id, data.status || 'confirmed');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }
  if (pathname === '/api/admin/meals/delete' && req.method === 'POST') {
    const session = authenticateAdmin(req);
    if (!session) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: 'Unauthorized' }));
      return;
    }
    const data = await parseJsonBody(req);
    db.deleteMealBooking(data.id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  // 6. GET/PUT /api/admin/donations (and legacy /api/admin/contributions)
  if (pathname === '/api/admin/donations' || pathname === '/api/admin/contributions') {
    const session = authenticateAdmin(req);
    if (!session) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: 'Unauthorized' }));
      return;
    }

    if (req.method === 'GET') {
      const donations = db.getAllDonations();
      const contributions = db.getAllContributions();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, donations, contributions }));
      return;
    }

    if (req.method === 'PUT') {
      const data = await parseJsonBody(req);
      db.updateDonationReceiptStatus(data.id, data.receipt_status || data.status || 'issued');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, message: 'Donation receipt status updated' }));
      return;
    }

    if (req.method === 'DELETE') {
      const data = await parseJsonBody(req);
      const id = data.id || parsed.query.id;
      db.deleteDonation(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, message: 'Donation record deleted' }));
      return;
    }
  }

  // Legacy status/delete for contributions
  if (pathname === '/api/admin/contributions/status' && req.method === 'POST') {
    const session = authenticateAdmin(req);
    if (!session) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: 'Unauthorized' }));
      return;
    }
    const data = await parseJsonBody(req);
    db.updateDonationReceiptStatus(data.id, data.status === 'verified' || data.status === 'confirmed' ? 'issued' : 'pending');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }
  if (pathname === '/api/admin/contributions/delete' && req.method === 'POST') {
    const session = authenticateAdmin(req);
    if (!session) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: 'Unauthorized' }));
      return;
    }
    const data = await parseJsonBody(req);
    db.deleteDonation(data.id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  // 7. GET/PUT /api/admin/volunteers
  if (pathname === '/api/admin/volunteers') {
    const session = authenticateAdmin(req);
    if (!session) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: 'Unauthorized' }));
      return;
    }

    if (req.method === 'GET') {
      const volunteers = db.getAllVolunteers();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, volunteers }));
      return;
    }

    if (req.method === 'PUT') {
      const data = await parseJsonBody(req);
      db.updateVolunteerStatus(data.id, data.status || 'contacted');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, message: 'Volunteer status updated' }));
      return;
    }

    if (req.method === 'DELETE') {
      const data = await parseJsonBody(req);
      const id = data.id || parsed.query.id;
      db.deleteVolunteer(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, message: 'Volunteer deleted' }));
      return;
    }
  }

  // 8. GET/PUT/DELETE /api/admin/contacts (and legacy /api/admin/messages)
  if (pathname === '/api/admin/contacts' || pathname === '/api/admin/messages') {
    const session = authenticateAdmin(req);
    if (!session) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: 'Unauthorized' }));
      return;
    }

    if (req.method === 'GET') {
      const contacts = db.getAllContacts();
      const messages = db.getAllMessages();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, contacts, messages }));
      return;
    }

    if (req.method === 'PUT') {
      const data = await parseJsonBody(req);
      db.markContactRead(data.id, data.is_read !== undefined ? data.is_read : 1);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, message: 'Contact marked as read' }));
      return;
    }

    if (req.method === 'DELETE') {
      const data = await parseJsonBody(req);
      const id = data.id || parsed.query.id;
      db.deleteContact(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, message: 'Contact deleted' }));
      return;
    }
  }

  // Legacy status/delete for messages
  if (pathname === '/api/admin/messages/status' && req.method === 'POST') {
    const session = authenticateAdmin(req);
    if (!session) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: 'Unauthorized' }));
      return;
    }
    const data = await parseJsonBody(req);
    db.updateMessageStatus(data.id, data.status || 'read');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }
  if (pathname === '/api/admin/messages/delete' && req.method === 'POST') {
    const session = authenticateAdmin(req);
    if (!session) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: 'Unauthorized' }));
      return;
    }
    const data = await parseJsonBody(req);
    db.deleteContact(data.id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  // 9. GET /api/admin/export-csv (and /api/admin/export/csv)
  if ((pathname === '/api/admin/export-csv' || pathname === '/api/admin/export/csv') && req.method === 'GET') {
    const session = authenticateAdmin(req);
    if (!session) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: 'Unauthorized' }));
      return;
    }

    const type = (parsed.query && parsed.query.type) || 'meals';
    const escapeCsv = v => (v === null || v === undefined) ? '""' : `"${String(v).replace(/"/g, '""')}"`;

    if (type === 'donations' || type === 'contributions') {
      const donations = db.getAllDonations();
      const headers = ['Donation ID', 'Status / 80G', 'Donor Name', 'Email Address', 'Phone Number', 'PAN Number', 'Amount (INR)', 'Payment Mode', 'Reference / UTR', 'Notes', 'Date Recorded'];
      const rows = donations.map(d => [
        escapeCsv(d.id),
        escapeCsv(d.receipt_status || 'pending'),
        escapeCsv(d.donor_name),
        escapeCsv(d.donor_email || ''),
        escapeCsv(d.donor_phone || ''),
        escapeCsv(d.pan_number || ''),
        escapeCsv(d.amount || 0),
        escapeCsv(d.transfer_type || 'Bank Transfer'),
        escapeCsv(d.reference_number || ''),
        escapeCsv(d.notes || ''),
        escapeCsv(d.created_at || '')
      ].join(','));
      const csv = '\uFEFF' + [headers.map(h => `"${h}"`).join(','), ...rows].join('\r\n');
      const filename = `premavasam_donations_${new Date().toISOString().slice(0, 10)}.csv`;
      res.writeHead(200, {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`
      });
      res.end(csv);
      return;
    }

    if (type === 'volunteers') {
      const volunteers = db.getAllVolunteers();
      const headers = ['Volunteer ID', 'Full Name', 'Phone', 'Email', 'Specialist Skills', 'Status', 'Message', 'Application Date'];
      const rows = volunteers.map(v => [
        escapeCsv(v.id),
        escapeCsv(v.full_name),
        escapeCsv(v.phone),
        escapeCsv(v.email),
        escapeCsv(v.skills || ''),
        escapeCsv(v.status || 'new'),
        escapeCsv(v.message || ''),
        escapeCsv(v.created_at || '')
      ].join(','));
      const csv = '\uFEFF' + [headers.map(h => `"${h}"`).join(','), ...rows].join('\r\n');
      const filename = `premavasam_volunteers_${new Date().toISOString().slice(0, 10)}.csv`;
      res.writeHead(200, {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`
      });
      res.end(csv);
      return;
    }

    if (type === 'contacts' || type === 'messages') {
      const contacts = db.getAllContacts();
      const headers = ['Message ID', 'Read Status', 'Sender Name', 'Email Address', 'Subject', 'Message Details', 'Date'];
      const rows = contacts.map(c => [
        escapeCsv(c.id),
        escapeCsv(c.is_read ? 'Read' : 'Unread'),
        escapeCsv(c.name),
        escapeCsv(c.email),
        escapeCsv(c.subject || ''),
        escapeCsv(c.message),
        escapeCsv(c.created_at || '')
      ].join(','));
      const csv = '\uFEFF' + [headers.map(h => `"${h}"`).join(','), ...rows].join('\r\n');
      const filename = `premavasam_contacts_${new Date().toISOString().slice(0, 10)}.csv`;
      res.writeHead(200, {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`
      });
      res.end(csv);
      return;
    }

    // Default: Meals Bookings CSV
    const meals = db.getAllMealBookings();
    const headers = ['Booking ID', 'Payment Status', 'Sponsor Name', 'Phone Number', 'Email Address', 'Meal Date', 'Occasion', 'Selected Menu / Items', 'Total Amount (INR)', 'Notes', 'Booked At'];
    const rows = meals.map(m => [
      escapeCsv(m.id),
      escapeCsv(m.payment_status || 'pending'),
      escapeCsv(m.sponsor_name),
      escapeCsv(m.sponsor_phone),
      escapeCsv(m.sponsor_email || ''),
      escapeCsv(m.sponsor_date),
      escapeCsv(m.occasion || ''),
      escapeCsv(m.selected_items || ''),
      escapeCsv(m.total_amount || 0),
      escapeCsv(m.notes || ''),
      escapeCsv(m.created_at || '')
    ].join(','));
    const csv = '\uFEFF' + [headers.map(h => `"${h}"`).join(','), ...rows].join('\r\n');
    const filename = `premavasam_meals_bookings_${new Date().toISOString().slice(0, 10)}.csv`;
    res.writeHead(200, {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`
    });
    res.end(csv);
    return;
  }

  // ════════════════════════════════════════════════════════════
  // ── PUBLIC BACKEND ROUTES ──────────────────────────────────
  // ════════════════════════════════════════════════════════════

  // 1. POST /api/meals/book (and legacy /api/sponsor-meal)
  if ((pathname === '/api/meals/book' || pathname === '/api/sponsor-meal') && req.method === 'POST') {
    try {
      const data = await parseJsonBody(req);
      const name = (data.sponsor_name || data.name || '').trim();
      const phone = (data.sponsor_phone || data.phone || '').trim();
      const date = (data.sponsor_date || data.meal_date || data.date || '').trim();

      if (!name || !phone || !date) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'Sponsor name, phone, and date are required fields' }));
        return;
      }

      const booking = db.insertMealBooking({
        sponsor_name: name,
        sponsor_phone: phone,
        sponsor_email: (data.sponsor_email || data.email || '').trim(),
        sponsor_date: date,
        occasion: (data.occasion || 'Special Occasion').trim(),
        selected_items: (data.selected_items || data.meal_type || data.meal || 'Lunch Feast').trim(),
        total_amount: data.total_amount !== undefined ? data.total_amount : (data.amount || 0),
        notes: (data.notes || '').trim()
      });

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        ok: true,
        id: booking.id,
        booking,
        message: 'Meal reservation recorded with heartfelt gratitude. Official confirmation will be shared promptly.'
      }));
      return;
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: err.message }));
      return;
    }
  }

  // 2. POST /api/donations/record (and legacy /api/contribute, /api/donate)
  if ((pathname === '/api/donations/record' || pathname === '/api/contribute' || pathname === '/api/donate') && req.method === 'POST') {
    try {
      const data = await parseJsonBody(req);
      const name = (data.donor_name || data.name || '').trim();
      const numAmount = parseFloat(data.amount);

      if (!name || isNaN(numAmount) || numAmount <= 0) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'Donor name and a valid donation amount are required' }));
        return;
      }

      const donation = db.insertDonation({
        donor_name: name,
        donor_email: (data.donor_email || data.email || '').trim(),
        donor_phone: (data.donor_phone || data.phone || '').trim(),
        pan_number: (data.pan_number || data.pan || '').trim().toUpperCase(),
        amount: numAmount,
        transfer_type: (data.transfer_type || data.payment_mode || 'Bank Transfer').trim(),
        reference_number: (data.reference_number || data.transaction_ref || data.utr || '').trim(),
        notes: (data.notes || data.purpose || '').trim()
      });

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        ok: true,
        id: donation.id,
        amount: donation.amount,
        donation,
        message: 'Donation recorded successfully. An 80G tax receipt will be issued to your email.'
      }));
      return;
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: err.message }));
      return;
    }
  }

  // 3. POST /api/volunteers/apply
  if (pathname === '/api/volunteers/apply' && req.method === 'POST') {
    try {
      const data = await parseJsonBody(req);
      const name = (data.full_name || data.name || '').trim();
      const phone = (data.phone || '').trim();
      const email = (data.email || '').trim();

      if (!name || !phone || !email) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'Full name, phone, and email are required for volunteer applications' }));
        return;
      }

      const volunteer = db.insertVolunteer({
        full_name: name,
        phone,
        email,
        skills: (data.skills || '').trim(),
        message: (data.message || '').trim()
      });

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        ok: true,
        id: volunteer.id,
        volunteer,
        message: 'Thank you for stepping forward to serve! Miss Mumtaj will reach out to schedule an orientation.'
      }));
      return;
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: err.message }));
      return;
    }
  }

  // 4. POST /api/contacts/send (and legacy /api/contact)
  if ((pathname === '/api/contacts/send' || pathname === '/api/contact') && req.method === 'POST') {
    try {
      const data = await parseJsonBody(req);
      const name = (data.name || '').trim();
      const email = (data.email || '').trim();
      const message = (data.message || '').trim();

      if (!name || !message) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'Name and message are required fields' }));
        return;
      }

      const contact = db.insertContact({
        name,
        email: email || 'donor@premavasam.org',
        subject: (data.subject || 'General Inquiry').trim(),
        message
      });

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        ok: true,
        id: contact.id,
        contact,
        message: 'Your inquiry has been received. Our office team will respond promptly.'
      }));
      return;
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: err.message }));
      return;
    }
  }

  // Public Telemetry Stats
  if (pathname === '/api/stats' && req.method === 'GET') {
    const stats = db.getStats();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(stats));
    return;
  }

  // Device Telemetry API
  if (pathname === '/api/device' && req.method === 'GET') {
    const device = detectDevice(req);
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'X-Device-Type': device.type,
      'X-Mobile-App': device.isApp ? 'true' : 'false'
    });
    res.end(JSON.stringify({ ok: true, device }));
    return;
  }

  // ── 7. ROUTE RESOLUTION FOR STATIC ASSETS & PAGES ───────────
  let resolvedFile = null;

  if (ROUTE_MAP[pathname]) {
    resolvedFile = path.join(ROOT, ROUTE_MAP[pathname]);
  } else {
    const safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '');
    const candidate = path.join(ROOT, safePath);

    if (fs.existsSync(candidate)) {
      if (fs.statSync(candidate).isDirectory()) {
        const indexCandidate = path.join(candidate, 'index.html');
        if (fs.existsSync(indexCandidate)) resolvedFile = indexCandidate;
      } else {
        resolvedFile = candidate;
      }
    } else {
      const htmlCandidate = candidate + '.html';
      if (fs.existsSync(htmlCandidate)) {
        resolvedFile = htmlCandidate;
      }
    }
  }

  if (resolvedFile && fs.existsSync(resolvedFile)) {
    serveFile(res, resolvedFile, 200, req);
  } else {
    serve404(res, pathname);
  }
});

// ── 8. START SERVER ──────────────────────────────────────────
server.listen(PORT, HOST, () => {
  console.log(`\n\x1b[33m💛 PREMAVASAM LIVE SERVER RUNNING ON http://localhost:${PORT} [Host: ${HOST}]\x1b[0m`);
  console.log(`🔒 Admin Portal: http://localhost:${PORT}/admin.html`);
});

server.on('error', err => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Port ${PORT} already in use.\n`);
  } else {
    console.error('Server error:', err);
  }
  process.exit(1);
});
