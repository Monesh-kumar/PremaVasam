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
  '/campuses':               'projects.html',
  '/achievements':           'achievements.html',
  '/activities':             'activities.html',
  '/therapies':              'activities.html',
  '/gallery':                'gallery.html',
  '/howhelp':                'howhelp.html',
  '/donate':                 'howhelp.html',
  '/sponsormeals':           'sponsormeals.html',
  '/sharecare':              'sharecare.html',
  '/wishlist':               'sharecare.html',
  '/volunteers':             'volunteers.html',
  '/volunteer':              'volunteers.html',
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
  const host = req.headers.host || 'localhost';
  let query = {};
  try {
    const urlObj = new URL(req.url, `http://${host}`);
    query = Object.fromEntries(urlObj.searchParams.entries());
  } catch (_) {}

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

// ── 3C. CYBERSECURITY: RATE LIMITING & INPUT SANITIZATION ────
const rateLimitStores = {
  login: new Map(),
  forms: new Map()
};

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || '127.0.0.1';
}

function checkRateLimit(req, type, maxAttempts, windowMs) {
  const ip = getClientIp(req);
  const now = Date.now();
  const store = rateLimitStores[type];

  // Purge expired keys periodically
  if (store.size > 2000) {
    for (const [k, v] of store.entries()) {
      if (now > v.resetTime) store.delete(k);
    }
  }

  const record = store.get(ip) || { count: 0, resetTime: now + windowMs };
  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + windowMs;
  }

  record.count += 1;
  store.set(ip, record);

  if (record.count > maxAttempts) {
    const retryAfter = Math.max(1, Math.ceil((record.resetTime - now) / 1000));
    return { limited: true, retryAfter };
  }
  return { limited: false, remaining: maxAttempts - record.count };
}

function resetRateLimit(req, type) {
  const ip = getClientIp(req);
  rateLimitStores[type].delete(ip);
}

function sanitizeInput(val, maxLen = 1000) {
  if (val === null || val === undefined) return '';
  const str = String(val).trim();
  return str.slice(0, maxLen).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
}

function sendJson(res, statusCode, payload, extraHeaders = {}) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    ...extraHeaders
  });
  res.end(body);
}

// ── 4. HELPER: PARSE JSON BODY (WITH PAYLOAD SIZE DEFENSE) ─────
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 5e5) { // 500KB security limit against DoS memory attacks
        req.destroy();
        reject(new Error('Payload exceeds security limit'));
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

// ── 5. HELPER: SERVE STATIC FILE WITH CYBER-DEFENSE HEADERS ───
function serveFile(res, filePath, statusCode = 200, req = null) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      serve404(res, filePath);
      return;
    }
    const ext  = path.extname(filePath).toLowerCase();
    const mime = MIME_TYPES[ext] || 'application/octet-stream';
    const device = req ? detectDevice(req) : { type: 'unknown', isApp: false };
    const isHtml = ext === '.html';

    const headers = {
      'Content-Type': mime,
      'Cache-Control': isHtml ? 'no-cache, no-store, must-revalidate' : 'public, max-age=86400',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'X-Device-Type': device.type,
      'X-Mobile-App': device.isApp ? 'true' : 'false'
    };

    if (isHtml) {
      headers['Content-Security-Policy'] = 
        "default-src 'self' 'unsafe-inline' https: http: data:; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://unpkg.com; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
        "font-src 'self' https://fonts.gstatic.com data:; " +
        "img-src 'self' data: https: http:; " +
        "connect-src 'self' https: http:; " +
        "frame-src 'self' https://www.google.com https://maps.google.com;";
    }

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
    const headers = {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    };
    res.writeHead(404, headers);
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
  const host = req.headers.host || 'localhost:3000';
  let urlObj;
  try {
    urlObj = new URL(req.url, `http://${host}`);
  } catch (err) {
    sendJson(res, 400, { ok: false, error: 'Malformed request URL' });
    return;
  }
  const query = Object.fromEntries(urlObj.searchParams.entries());
  let pathname = decodeURIComponent(urlObj.pathname).replace(/\/+$/, '') || '/';
  const parsed = { pathname: urlObj.pathname, query, searchParams: urlObj.searchParams };

  // CORS Hardening
  const isPublicApi = pathname.startsWith('/api/meals/book') ||
                      pathname.startsWith('/api/donations/record') ||
                      pathname.startsWith('/api/volunteers/apply') ||
                      pathname.startsWith('/api/contacts/send') ||
                      pathname.startsWith('/api/contact') ||
                      pathname.startsWith('/api/sponsor-meal') ||
                      pathname.startsWith('/api/contribute') ||
                      pathname.startsWith('/api/donate') ||
                      pathname === '/api/stats' ||
                      pathname === '/api/device' ||
                      pathname === '/api/search';

  if (isPublicApi) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  } else {
    const origin = req.headers.origin;
    if (origin && (origin.includes(host) || origin === 'null')) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // ── BACKEND API: /api/search ───────────────────────────────
  if (pathname === '/api/search' && req.method === 'GET') {
    const q = sanitizeInput(parsed.query.q || '', 100).toLowerCase();
    if (!q) {
      sendJson(res, 200, { query: '', results: [] });
      return;
    }

    const matches = SEARCH_INDEX.filter(item => {
      const haystack = (item.title + ' ' + item.keywords + ' ' + item.snippet + ' ' + item.category).toLowerCase();
      return haystack.includes(q);
    });

    sendJson(res, 200, { query: q, total: matches.length, results: matches });
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
    const rateCheck = checkRateLimit(req, 'login', 15, 15 * 60 * 1000);
    if (rateCheck.limited) {
      sendJson(res, 429, {
        ok: false,
        error: `Too many login attempts. Please wait ${rateCheck.retryAfter} seconds before trying again.`
      }, { 'Retry-After': String(rateCheck.retryAfter) });
      return;
    }

    try {
      const data = await parseJsonBody(req);
      const username = sanitizeInput(data.username, 100);
      const password = String(data.password || '').slice(0, 200);

      const admin = db.verifyAdmin(username, password);
      if (!admin) {
        sendJson(res, 401, { ok: false, error: 'Invalid username or password' });
        return;
      }

      resetRateLimit(req, 'login');
      const session = db.createSession(admin.id);
      sendJson(res, 200, { ok: true, token: session.token, admin }, {
        'Set-Cookie': `premavasam_admin_session=${encodeURIComponent(session.token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 86400}`
      });
      return;
    } catch (err) {
      sendJson(res, 400, { ok: false, error: err.message });
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
  // ── PUBLIC BACKEND ROUTES (RATE-LIMITED & SANITIZED) ───────
  // ════════════════════════════════════════════════════════════

  // 1. POST /api/meals/book (and legacy /api/sponsor-meal)
  if ((pathname === '/api/meals/book' || pathname === '/api/sponsor-meal') && req.method === 'POST') {
    const rateCheck = checkRateLimit(req, 'forms', 30, 5 * 60 * 1000);
    if (rateCheck.limited) {
      sendJson(res, 429, {
        ok: false,
        error: `Submission rate limit exceeded. Please wait ${rateCheck.retryAfter} seconds before trying again.`
      }, { 'Retry-After': String(rateCheck.retryAfter) });
      return;
    }

    try {
      const data = await parseJsonBody(req);
      const name = sanitizeInput(data.sponsor_name || data.name, 150);
      const phone = sanitizeInput(data.sponsor_phone || data.phone, 35);
      const date = sanitizeInput(data.sponsor_date || data.meal_date || data.date, 30);

      if (!name || !phone || !date) {
        sendJson(res, 400, { ok: false, error: 'Sponsor name, phone, and date are required fields' });
        return;
      }

      const booking = db.insertMealBooking({
        sponsor_name: name,
        sponsor_phone: phone,
        sponsor_email: sanitizeInput(data.sponsor_email || data.email, 100),
        sponsor_date: date,
        occasion: sanitizeInput(data.occasion || 'Special Occasion', 200),
        selected_items: sanitizeInput(data.selected_items || data.meal_type || data.meal || 'Lunch Feast', 300),
        total_amount: Number(data.total_amount !== undefined ? data.total_amount : (data.amount || 0)) || 0,
        notes: sanitizeInput(data.notes, 1000)
      });

      sendJson(res, 200, {
        ok: true,
        id: booking.id,
        booking,
        message: 'Meal reservation recorded with heartfelt gratitude. Official confirmation will be shared promptly.'
      });
      return;
    } catch (err) {
      sendJson(res, 400, { ok: false, error: err.message });
      return;
    }
  }

  // 2. POST /api/donations/record (and legacy /api/contribute, /api/donate)
  if ((pathname === '/api/donations/record' || pathname === '/api/contribute' || pathname === '/api/donate') && req.method === 'POST') {
    const rateCheck = checkRateLimit(req, 'forms', 30, 5 * 60 * 1000);
    if (rateCheck.limited) {
      sendJson(res, 429, {
        ok: false,
        error: `Submission rate limit exceeded. Please wait ${rateCheck.retryAfter} seconds before trying again.`
      }, { 'Retry-After': String(rateCheck.retryAfter) });
      return;
    }

    try {
      const data = await parseJsonBody(req);
      const name = sanitizeInput(data.donor_name || data.name, 150);
      const numAmount = parseFloat(data.amount);

      if (!name || isNaN(numAmount) || numAmount <= 0) {
        sendJson(res, 400, { ok: false, error: 'Donor name and a valid donation amount are required' });
        return;
      }

      const donation = db.insertDonation({
        donor_name: name,
        donor_email: sanitizeInput(data.donor_email || data.email, 100),
        donor_phone: sanitizeInput(data.donor_phone || data.phone, 35),
        pan_number: sanitizeInput(data.pan_number || data.pan, 15).toUpperCase(),
        amount: numAmount,
        transfer_type: sanitizeInput(data.transfer_type || data.payment_mode || 'Bank Transfer', 100),
        reference_number: sanitizeInput(data.reference_number || data.transaction_ref || data.utr, 100),
        notes: sanitizeInput(data.notes || data.purpose, 1000)
      });

      sendJson(res, 200, {
        ok: true,
        id: donation.id,
        amount: donation.amount,
        donation,
        message: 'Donation recorded successfully. An 80G tax receipt will be issued to your email.'
      });
      return;
    } catch (err) {
      sendJson(res, 400, { ok: false, error: err.message });
      return;
    }
  }

  // 3. POST /api/volunteers/apply
  if (pathname === '/api/volunteers/apply' && req.method === 'POST') {
    const rateCheck = checkRateLimit(req, 'forms', 30, 5 * 60 * 1000);
    if (rateCheck.limited) {
      sendJson(res, 429, {
        ok: false,
        error: `Submission rate limit exceeded. Please wait ${rateCheck.retryAfter} seconds before trying again.`
      }, { 'Retry-After': String(rateCheck.retryAfter) });
      return;
    }

    try {
      const data = await parseJsonBody(req);
      const name = sanitizeInput(data.full_name || data.name, 150);
      const phone = sanitizeInput(data.phone, 35);
      const email = sanitizeInput(data.email, 100);

      if (!name || !phone || !email) {
        sendJson(res, 400, { ok: false, error: 'Full name, phone, and email are required for volunteer applications' });
        return;
      }

      const volunteer = db.insertVolunteer({
        full_name: name,
        phone,
        email,
        skills: sanitizeInput(data.skills, 300),
        message: sanitizeInput(data.message, 2000)
      });

      sendJson(res, 200, {
        ok: true,
        id: volunteer.id,
        volunteer,
        message: 'Thank you for stepping forward to serve! Miss Mumtaj will reach out to schedule an orientation.'
      });
      return;
    } catch (err) {
      sendJson(res, 400, { ok: false, error: err.message });
      return;
    }
  }

  // 4. POST /api/contacts/send (and legacy /api/contact)
  if ((pathname === '/api/contacts/send' || pathname === '/api/contact') && req.method === 'POST') {
    const rateCheck = checkRateLimit(req, 'forms', 30, 5 * 60 * 1000);
    if (rateCheck.limited) {
      sendJson(res, 429, {
        ok: false,
        error: `Submission rate limit exceeded. Please wait ${rateCheck.retryAfter} seconds before trying again.`
      }, { 'Retry-After': String(rateCheck.retryAfter) });
      return;
    }

    try {
      const data = await parseJsonBody(req);
      const name = sanitizeInput(data.name, 150);
      const email = sanitizeInput(data.email, 100);
      const message = sanitizeInput(data.message, 3000);

      if (!name || !message) {
        sendJson(res, 400, { ok: false, error: 'Name and message are required fields' });
        return;
      }

      const contact = db.insertContact({
        name,
        email: email || 'donor@premavasam.org',
        subject: sanitizeInput(data.subject || 'General Inquiry', 200),
        message
      });

      sendJson(res, 200, {
        ok: true,
        id: contact.id,
        contact,
        message: 'Your inquiry has been received. Our office team will respond promptly.'
      });
      return;
    } catch (err) {
      sendJson(res, 400, { ok: false, error: err.message });
      return;
    }
  }

  // Public Telemetry Stats
  if (pathname === '/api/stats' && req.method === 'GET') {
    const stats = db.getStats();
    sendJson(res, 200, stats);
    return;
  }

  // Device Telemetry API
  if (pathname === '/api/device' && req.method === 'GET') {
    const device = detectDevice(req);
    sendJson(res, 200, { ok: true, device }, {
      'X-Device-Type': device.type,
      'X-Mobile-App': device.isApp ? 'true' : 'false'
    });
    return;
  }

  // ── 7. ROUTE RESOLUTION FOR STATIC ASSETS & PAGES (WITH CYBER-DEFENSE) ─
  let resolvedFile = null;

  // STRICT CYBERSECURITY CHECK 1: Disallow access to databases, config, source code, hidden files
  const lowerPath = pathname.toLowerCase();
  const isForbidden =
    lowerPath.startsWith('/data') ||
    lowerPath.includes('.db') ||
    lowerPath.includes('.sqlite') ||
    lowerPath.includes('.wal') ||
    lowerPath.includes('.shm') ||
    lowerPath.includes('.git') ||
    lowerPath.includes('.env') ||
    lowerPath.includes('node_modules') ||
    lowerPath.endsWith('.yaml') ||
    lowerPath.endsWith('.yml') ||
    lowerPath.includes('procfile') ||
    lowerPath.includes('package.json') ||
    lowerPath.includes('package-lock.json') ||
    (lowerPath.endsWith('.json') && pathname !== '/manifest.json') ||
    (lowerPath.endsWith('.js') && !lowerPath.startsWith('/js/') && pathname !== '/sw.js');

  if (isForbidden) {
    serve404(res, pathname);
    return;
  }

  if (ROUTE_MAP[pathname]) {
    resolvedFile = path.join(ROOT, ROUTE_MAP[pathname]);
  } else {
    // Sanitize path against directory traversal
    const safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '');
    const candidate = path.resolve(ROOT, '.' + safePath);

    // STRICT CYBERSECURITY CHECK 2: Must be within ROOT directory
    if (!candidate.startsWith(ROOT)) {
      serve404(res, pathname);
      return;
    }

    // STRICT CYBERSECURITY CHECK 3: Must be inside allowed public directories or files
    const relativeToRoot = path.relative(ROOT, candidate);
    const allowedPrefixes = ['images', 'css', 'js', 'fonts', 'icons'];
    const firstSegment = relativeToRoot.split(path.sep)[0];

    const isExplicitlyAllowed = 
      allowedPrefixes.includes(firstSegment) || 
      candidate.endsWith('.html') || 
      candidate.endsWith('manifest.json') || 
      candidate.endsWith('sw.js');

    if (!isExplicitlyAllowed) {
      serve404(res, pathname);
      return;
    }

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
    // Final verification: ensure resolvedFile does not point to data directory or server code
    const resolvedLower = resolvedFile.toLowerCase();
    if (resolvedLower.startsWith(DATA_DIR.toLowerCase()) || 
        resolvedLower.includes('.db') || 
        resolvedLower === path.join(ROOT, 'server.js').toLowerCase() || 
        resolvedLower === path.join(ROOT, 'db.js').toLowerCase()) {
      serve404(res, pathname);
      return;
    }
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
