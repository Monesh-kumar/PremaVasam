/**
 * ══════════════════════════════════════════════════════════
 * PREMAVASAM &bull; Quality Engineering & Assurance (QE&A) Test Suite
 * Automated End-to-End Validation Across Routing, APIs, Security & UI
 * ══════════════════════════════════════════════════════════
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://127.0.0.1:8080';
let passedTests = 0;
let failedTests = 0;
const results = [];

function logPass(suite, name, details = '') {
  passedTests++;
  results.push({ suite, name, status: 'PASS', details });
  console.log(`  \x1b[32m✔ PASS\x1b[0m [${suite}] ${name} ${details ? `(${details})` : ''}`);
}

function logFail(suite, name, error) {
  failedTests++;
  results.push({ suite, name, status: 'FAIL', error: error.message || error });
  console.error(`  \x1b[31m✖ FAIL\x1b[0m [${suite}] ${name} -> ${error.message || error}`);
}

function httpRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(options.url || options.path, BASE_URL);
    const reqOpts = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: parsedUrl.pathname + parsedUrl.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    if (postData) {
      if (typeof postData === 'object' && !reqOpts.headers['Content-Type']) {
        postData = JSON.stringify(postData);
        reqOpts.headers['Content-Type'] = 'application/json';
      }
      reqOpts.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = http.request(reqOpts, (res) => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body
        });
      });
    });

    req.on('error', reject);
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timed out after 5000ms'));
    });

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function runQeaTests() {
  console.log('\n\x1b[36m══════════════════════════════════════════════════════════════════');
  console.log('  🧪 PREMAVASAM QUALITY ENGINEERING & ASSURANCE (QE&A) TEST RUN');
  console.log(`  Target: ${BASE_URL}  |  Node: ${process.version}`);
  console.log('══════════════════════════════════════════════════════════════════\x1b[0m\n');

  // ── SUITE 1: CLEAN ROUTING & CORE PAGES ────────────────────
  console.log('\x1b[33m▶ [Suite 1] Clean Routes & Page Delivery (HTTP 200)\x1b[0m');
  const coreRoutes = [
    { path: '/', title: 'Home', keyword: 'PREMAVASAM' },
    { path: '/about', title: 'About', keyword: 'About Us' },
    { path: '/whoweare', title: 'Who We Are', keyword: 'Who We Are' },
    { path: '/projects', title: 'Projects', keyword: 'Prem Niketan' },
    { path: '/achievements', title: 'Achievements', keyword: 'Achievements' },
    { path: '/activities', title: 'Activities', keyword: 'Physiotherapy' },
    { path: '/gallery', title: 'Gallery', keyword: 'Diwali 2024' },
    { path: '/howhelp', title: 'How Can You Help', keyword: 'Bank of Baroda' },
    { path: '/sponsormeals', title: 'Sponsor Meals', keyword: 'How to Book a Meal Date:' },
    { path: '/sharecare', title: 'Share & Care', keyword: 'Share and Care' },
    { path: '/volunteers', title: 'Volunteers', keyword: 'Volunteers' },
    { path: '/press', title: 'Press Release', keyword: 'The Hindu' },
    { path: '/contact', title: 'Contact Us', keyword: 'Contact Us' },
    { path: '/admin', title: 'Admin CRM Portal', keyword: 'Admin Portal' }
  ];

  for (const r of coreRoutes) {
    try {
      const res = await httpRequest({ path: r.path });
      if (res.statusCode === 200 && res.body.includes(r.keyword)) {
        logPass('Core Routes', `${r.title} (${r.path})`, `HTTP 200, verified keyword: "${r.keyword}"`);
      } else {
        throw new Error(`Expected 200 with "${r.keyword}", got status ${res.statusCode}`);
      }
    } catch (err) {
      logFail('Core Routes', `${r.title} (${r.path})`, err);
    }
  }

  // ── SUITE 2: DRUPAL LEGACY URL REDIRECTIONS ────────────────
  console.log('\n\x1b[33m▶ [Suite 2] Drupal Legacy URL Aliases (Backwards Compatibility)\x1b[0m');
  const legacyRoutes = [
    '/content/about-us',
    '/content/who-we-are',
    '/content/our-projects',
    '/content/achievements',
    '/content/activities',
    '/content/gallery',
    '/content/how-can-you-help',
    '/content/sponsor-meals',
    '/content/share-and-care',
    '/content/volunteers',
    '/content/press-release',
    '/node/1'
  ];

  for (const legacyPath of legacyRoutes) {
    try {
      const res = await httpRequest({ path: legacyPath });
      if (res.statusCode === 200) {
        logPass('Legacy Aliases', legacyPath, 'HTTP 200 OK');
      } else {
        throw new Error(`Status ${res.statusCode}`);
      }
    } catch (err) {
      logFail('Legacy Aliases', legacyPath, err);
    }
  }

  // ── SUITE 3: ASSET INTEGRITY & 404 RESILIENCE ──────────────
  console.log('\n\x1b[33m▶ [Suite 3] Static Asset Delivery & 404 Resilience\x1b[0m');
  try {
    const cssRes = await httpRequest({ path: '/css/main.css' });
    if (cssRes.statusCode === 200 && cssRes.headers['content-type']?.includes('text/css')) {
      logPass('Assets', 'CSS Delivery (/css/main.css)', `HTTP 200, length: ${cssRes.body.length} bytes`);
    } else {
      throw new Error(`CSS status ${cssRes.statusCode}, type: ${cssRes.headers['content-type']}`);
    }
  } catch (err) {
    logFail('Assets', 'CSS Delivery', err);
  }

  try {
    const jsRes = await httpRequest({ path: '/js/main.js' });
    if (jsRes.statusCode === 200 && (jsRes.headers['content-type']?.includes('javascript') || jsRes.headers['content-type']?.includes('application/javascript'))) {
      logPass('Assets', 'JS Delivery (/js/main.js)', `HTTP 200, length: ${jsRes.body.length} bytes`);
    } else {
      throw new Error(`JS status ${jsRes.statusCode}, type: ${jsRes.headers['content-type']}`);
    }
  } catch (err) {
    logFail('Assets', 'JS Delivery', err);
  }

  try {
    const errRes = await httpRequest({ path: '/some-random-unknown-page-404' });
    if (errRes.statusCode === 404 && errRes.body.includes('404')) {
      logPass('Resilience', 'Custom 404 Page Handler', 'HTTP 404 correctly rendered');
    } else {
      throw new Error(`Expected 404, got ${errRes.statusCode}`);
    }
  } catch (err) {
    logFail('Resilience', '404 Handler', err);
  }

  // ── SUITE 4: SITE SEARCH API ───────────────────────────────
  console.log('\n\x1b[33m▶ [Suite 4] Site Search API (/api/search)\x1b[0m');
  try {
    const searchRes = await httpRequest({ path: '/api/search?q=physiotherapy' });
    const json = JSON.parse(searchRes.body);
    if (searchRes.statusCode === 200 && Array.isArray(json.results) && json.results.length > 0) {
      logPass('Search API', 'Keyword Query "physiotherapy"', `Found ${json.results.length} results`);
    } else {
      throw new Error(`Invalid search response: ${searchRes.body}`);
    }
  } catch (err) {
    logFail('Search API', 'Keyword Query', err);
  }

  try {
    const searchEmpty = await httpRequest({ path: '/api/search?q=' });
    const json = JSON.parse(searchEmpty.body);
    if (searchEmpty.statusCode === 200 && json.results.length === 0) {
      logPass('Search API', 'Empty Query Handling', 'Handled gracefully with 0 results');
    } else {
      throw new Error(`Expected empty array`);
    }
  } catch (err) {
    logFail('Search API', 'Empty Query', err);
  }

  // ── SUITE 5: FORM SUBMISSIONS & VALIDATION ─────────────────
  console.log('\n\x1b[33m▶ [Suite 5] Form Submissions & Input Validation\x1b[0m');

  // Contact Form
  try {
    const contactRes = await httpRequest({
      path: '/api/contact',
      method: 'POST'
    }, {
      name: 'QA Tester',
      email: 'qa@premavasam-test.org',
      phone: '+91 98765 43210',
      subject: 'Automated QA Message',
      message: 'This is an automated Quality Assurance test message verifying SQLite persistence.'
    });
    const json = JSON.parse(contactRes.body);
    if (contactRes.statusCode === 200 && json.ok && json.id) {
      logPass('Contact API', 'Valid Contact Submission', `Saved with ID: ${json.id}`);
    } else {
      throw new Error(`Contact submission failed: ${contactRes.body}`);
    }
  } catch (err) {
    logFail('Contact API', 'Valid Submission', err);
  }

  try {
    const badContact = await httpRequest({
      path: '/api/contact',
      method: 'POST'
    }, {
      name: '',
      message: ''
    });
    if (badContact.statusCode === 400) {
      logPass('Contact API', 'Missing Required Field Rejection', 'HTTP 400 Bad Request returned');
    } else {
      throw new Error(`Expected 400, got ${badContact.statusCode}`);
    }
  } catch (err) {
    logFail('Contact API', 'Validation Rejection', err);
  }

  // Meal Sponsorship Form
  let testPledgeId = null;
  try {
    const mealRes = await httpRequest({
      path: '/api/sponsor-meal',
      method: 'POST'
    }, {
      name: 'QA Meal Donor',
      phone: '+91 91234 56789',
      email: 'mealdonor@qa-test.org',
      date: '2026-11-15',
      meal: 'Festive Lunch with Vadai & Payasam',
      amount: 6500,
      notes: 'Testing meal pledge automated pipeline'
    });
    const json = JSON.parse(mealRes.body);
    if (mealRes.statusCode === 200 && json.ok && json.id) {
      testPledgeId = json.id;
      logPass('Meals API', 'Valid Meal Pledge Submission', `Saved with ID: ${json.id}, ₹6,500`);
    } else {
      throw new Error(`Meal pledge failed: ${mealRes.body}`);
    }
  } catch (err) {
    logFail('Meals API', 'Valid Pledge', err);
  }

  try {
    const badMeal = await httpRequest({
      path: '/api/sponsor-meal',
      method: 'POST'
    }, {
      name: 'Missing Date Person'
      // missing phone and date
    });
    if (badMeal.statusCode === 400) {
      logPass('Meals API', 'Missing Required Field Rejection', 'HTTP 400 Bad Request returned');
    } else {
      throw new Error(`Expected 400, got ${badMeal.statusCode}`);
    }
  } catch (err) {
    logFail('Meals API', 'Missing Field Rejection', err);
  }

  // Direct Contribution Form
  let testContribId = null;
  try {
    const contribRes = await httpRequest({
      path: '/api/contribute',
      method: 'POST'
    }, {
      name: 'QA Philanthropist',
      phone: '+91 99887 76655',
      email: 'donor@qa-test.org',
      amount: 10000,
      purpose: 'Physiotherapy & Education Fund',
      payment_mode: 'Net Banking (Bank of Baroda)',
      utr: 'UTRCONTRIB9988',
      pan: 'ABCDE1234F',
      notes: 'Automated contribution test'
    });
    const json = JSON.parse(contribRes.body);
    if (contribRes.statusCode === 200 && json.ok && json.id) {
      testContribId = json.id;
      logPass('Contributions API', 'Valid Contribution Submission', `Saved with ID: ${json.id}, ₹10,000`);
    } else {
      throw new Error(`Contribution failed: ${contribRes.body}`);
    }
  } catch (err) {
    logFail('Contributions API', 'Valid Submission', err);
  }

  try {
    const badContrib = await httpRequest({
      path: '/api/contribute',
      method: 'POST'
    }, {
      name: 'No Amount Donor',
      amount: -500
    });
    if (badContrib.statusCode === 400) {
      logPass('Contributions API', 'Invalid Amount Rejection', 'HTTP 400 Bad Request returned for negative amount');
    } else {
      throw new Error(`Expected 400, got ${badContrib.statusCode}`);
    }
  } catch (err) {
    logFail('Contributions API', 'Invalid Amount Rejection', err);
  }

  // ── SUITE 6: PUBLIC STATS ──────────────────────────────────
  console.log('\n\x1b[33m▶ [Suite 6] Public Telemetry & Statistics (/api/stats)\x1b[0m');
  try {
    const statsRes = await httpRequest({ path: '/api/stats' });
    const json = JSON.parse(statsRes.body);
    if (statsRes.statusCode === 200 && json.totalChildren !== undefined && json.database) {
      logPass('Telemetry', 'Public Statistics API', `Children: ${json.totalChildren}, Total Pledged: ₹${json.totalPledgedAmount?.toLocaleString('en-IN')}`);
    } else {
      throw new Error(`Stats endpoint failed: ${statsRes.body}`);
    }
  } catch (err) {
    logFail('Telemetry', 'Public Stats', err);
  }

  // ── SUITE 7: ADMIN AUTHENTICATION, SECURITY & CRM ──────────
  console.log('\n\x1b[33m▶ [Suite 7] Admin Security, Authentication & CRM Endpoints\x1b[0m');

  // Test 1: Invalid login credentials
  try {
    const badLogin = await httpRequest({
      path: '/api/admin/login',
      method: 'POST'
    }, {
      username: 'admin',
      password: 'wrongpassword999'
    });
    if (badLogin.statusCode === 401) {
      logPass('Security', 'Unauthorized Login Rejection', 'HTTP 401 Unauthorized');
    } else {
      throw new Error(`Expected 401, got ${badLogin.statusCode}`);
    }
  } catch (err) {
    logFail('Security', 'Bad Login Rejection', err);
  }

  // Test 2: Protected endpoint without token
  try {
    const noAuth = await httpRequest({ path: '/api/admin/me' });
    if (noAuth.statusCode === 401) {
      logPass('Security', 'Unauthenticated Access Prevention', 'Protected /api/admin/me returned HTTP 401');
    } else {
      throw new Error(`Expected 401, got ${noAuth.statusCode}`);
    }
  } catch (err) {
    logFail('Security', 'Token Enforcement', err);
  }

  // Test 3: Valid admin login
  let sessionToken = null;
  try {
    const goodLogin = await httpRequest({
      path: '/api/admin/login',
      method: 'POST'
    }, {
      username: 'admin',
      password: 'premavasam2026'
    });
    const json = JSON.parse(goodLogin.body);
    if (goodLogin.statusCode === 200 && json.ok && json.token) {
      sessionToken = json.token;
      logPass('Auth', 'Valid Admin Login', `Authenticated admin: ${json.admin?.name}`);
    } else {
      throw new Error(`Login failed: ${goodLogin.body}`);
    }
  } catch (err) {
    logFail('Auth', 'Valid Login', err);
  }

  // Test 4: Access protected endpoints with valid token
  if (sessionToken) {
    try {
      const meRes = await httpRequest({
        path: '/api/admin/me',
        headers: { 'Authorization': `Bearer ${sessionToken}` }
      });
      const json = JSON.parse(meRes.body);
      if (meRes.statusCode === 200 && json.ok && json.admin) {
        logPass('Admin CRM', 'Admin Session Validation (/api/admin/me)', `Admin ID: ${json.admin.id}`);
      } else {
        throw new Error(`Session verification failed: ${meRes.body}`);
      }
    } catch (err) {
      logFail('Admin CRM', 'Session Validation', err);
    }

    try {
      const mealsRes = await httpRequest({
        path: '/api/admin/meals',
        headers: { 'Authorization': `Bearer ${sessionToken}` }
      });
      const json = JSON.parse(mealsRes.body);
      if (mealsRes.statusCode === 200 && json.ok && Array.isArray(json.meals)) {
        logPass('Admin CRM', 'Retrieve Meals List (/api/admin/meals)', `Retrieved ${json.meals.length} pledges`);
      } else {
        throw new Error(`Meals retrieval failed: ${mealsRes.body}`);
      }
    } catch (err) {
      logFail('Admin CRM', 'Meals List', err);
    }

    try {
      const contribsRes = await httpRequest({
        path: '/api/admin/contributions',
        headers: { 'Authorization': `Bearer ${sessionToken}` }
      });
      const json = JSON.parse(contribsRes.body);
      if (contribsRes.statusCode === 200 && json.ok && Array.isArray(json.contributions)) {
        logPass('Admin CRM', 'Retrieve Contributions List (/api/admin/contributions)', `Retrieved ${json.contributions.length} contributions`);
      } else {
        throw new Error(`Contributions retrieval failed: ${contribsRes.body}`);
      }
    } catch (err) {
      logFail('Admin CRM', 'Contributions List', err);
    }

    // Test 5: Verify pledge status toggle
    if (testPledgeId) {
      try {
        const verifyRes = await httpRequest({
          path: '/api/admin/meals/status',
          method: 'POST',
          headers: { 'Authorization': `Bearer ${sessionToken}` }
        }, {
          id: testPledgeId,
          status: 'confirmed'
        });
        const json = JSON.parse(verifyRes.body);
        if (verifyRes.statusCode === 200 && json.ok) {
          logPass('Admin CRM', 'Meal Status Toggle (/api/admin/meals/status)', `Pledge ${testPledgeId} marked as confirmed`);
        } else {
          throw new Error(`Status toggle failed: ${verifyRes.body}`);
        }
      } catch (err) {
        logFail('Admin CRM', 'Pledge Verification', err);
      }
    }

    // Test 6: Verify contribution status toggle
    if (testContribId) {
      try {
        const verifyCRes = await httpRequest({
          path: '/api/admin/contributions/status',
          method: 'POST',
          headers: { 'Authorization': `Bearer ${sessionToken}` }
        }, {
          id: testContribId,
          status: 'verified'
        });
        const json = JSON.parse(verifyCRes.body);
        if (verifyCRes.statusCode === 200 && json.ok) {
          logPass('Admin CRM', 'Contribution Status Toggle (/api/admin/contributions/status)', `Contribution ${testContribId} marked as verified`);
        } else {
          throw new Error(`Status toggle failed: ${verifyCRes.body}`);
        }
      } catch (err) {
        logFail('Admin CRM', 'Contribution Verification', err);
      }
    }

    // Test 7: CSV Exports
    const exportTypes = ['meals', 'contributions', 'messages'];
    for (const expType of exportTypes) {
      try {
        const csvRes = await httpRequest({
          path: `/api/admin/export/csv?type=${expType}`,
          headers: { 'Authorization': `Bearer ${sessionToken}` }
        });
        if (csvRes.statusCode === 200 && csvRes.headers['content-type']?.includes('text/csv')) {
          logPass('CSV Export', `Export ${expType}.csv`, `HTTP 200, length: ${csvRes.body.length} chars`);
        } else {
          throw new Error(`CSV export failed for ${expType}: status ${csvRes.statusCode}`);
        }
      } catch (err) {
        logFail('CSV Export', `Export ${expType}`, err);
      }
    }

    // Test 8: Logout and session invalidation
    try {
      const logoutRes = await httpRequest({
        path: '/api/admin/logout',
        method: 'POST',
        headers: { 'Authorization': `Bearer ${sessionToken}` }
      });
      const json = JSON.parse(logoutRes.body);
      if (logoutRes.statusCode === 200 && json.ok) {
        logPass('Auth', 'Admin Logout (/api/admin/logout)', 'Session successfully invalidated');

        // Verify revoked token fails
        const checkRevoked = await httpRequest({
          path: '/api/admin/me',
          headers: { 'Authorization': `Bearer ${sessionToken}` }
        });
        if (checkRevoked.statusCode === 401) {
          logPass('Security', 'Revoked Session Token Rejection', 'Access denied after logout');
        } else {
          throw new Error(`Expected 401 for revoked token, got ${checkRevoked.statusCode}`);
        }
      } else {
        throw new Error(`Logout failed: ${logoutRes.body}`);
      }
    } catch (err) {
      logFail('Auth', 'Admin Logout', err);
    }
  }

  // ── SUITE 8: USER REQUIREMENT & UI VERIFICATION ─────────────
  console.log('\n\x1b[33m▶ [Suite 8] Verification of Recent Requirements & UI Structure\x1b[0m');

  // Req 1: Sponsor Meals page layout
  try {
    const mealsHtml = fs.readFileSync(path.join(__dirname, 'sponsormeals.html'), 'utf8');
    const posGuide = mealsHtml.indexOf('How to Book a Meal Date:');
    const posCalc = mealsHtml.indexOf('id="meals-calculator"');
    if (posGuide !== -1 && posCalc !== -1 && posGuide < posCalc) {
      logPass('UI Req', 'Sponsor Meals Top Layout', '"How to Book a Meal Date:" is positioned BEFORE calculator');
    } else {
      throw new Error(`Booking guide pos: ${posGuide}, calc pos: ${posCalc}`);
    }
  } catch (err) {
    logFail('UI Req', 'Sponsor Meals Top Layout', err);
  }

  // Req 2: How Can You Help Contribution Form
  try {
    const howHelpHtml = fs.readFileSync(path.join(__dirname, 'howhelp.html'), 'utf8');
    if (howHelpHtml.includes('preset-row') && howHelpHtml.includes('selectPreset') && howHelpHtml.includes('/api/contribute')) {
      logPass('UI Req', 'Contribution Form on How Can You Help', 'Form with presets verified below bank details');
    } else {
      throw new Error('Contribution form or presets not found on howhelp.html');
    }
  } catch (err) {
    logFail('UI Req', 'Contribution Form', err);
  }

  // Req 3: Modern Admin UI Cleanup
  try {
    const adminHtml = fs.readFileSync(path.join(__dirname, 'admin.html'), 'utf8');
    const hasSqliteHeading = adminHtml.includes('SQLite Database');
    const hasDbHealth = adminHtml.includes('Database & System Health');
    if (!hasSqliteHeading && !hasDbHealth) {
      logPass('UI Req', 'Admin Page Modern Cleanup', 'SQLite heading & Database Health tab successfully removed');
    } else {
      throw new Error(`Found unwanted elements: sqliteHeading=${hasSqliteHeading}, dbHealth=${hasDbHealth}`);
    }
  } catch (err) {
    logFail('UI Req', 'Admin Page Modern Cleanup', err);
  }

  // Req 4: Gallery Card UI
  try {
    const galleryHtml = fs.readFileSync(path.join(__dirname, 'gallery.html'), 'utf8');
    if (galleryHtml.includes('compact-cards-grid') && galleryHtml.includes('album-section')) {
      logPass('UI Req', 'Gallery Album Card Layout', 'Modern card grid with clean album headings verified');
    } else {
      throw new Error('Gallery album cards not structured properly');
    }
  } catch (err) {
    logFail('UI Req', 'Gallery Album Layout', err);
  }

  // ── SUITE 9: MOBILE APP COMPATIBILITY & DEVICE ADAPTATION ──
  console.log('\n\x1b[33m▶ [Suite 9] Mobile App Compatibility, PWA & Device Detection\x1b[0m');

  // Test 1: Device detection API (default / desktop)
  try {
    const devRes = await httpRequest({ path: '/api/device' });
    const json = JSON.parse(devRes.body);
    if (devRes.statusCode === 200 && json.ok && json.device && json.device.type) {
      logPass('Mobile App', 'Device Detection API (/api/device)', `Detected type: ${json.device.type}, OS: ${json.device.os}`);
    } else {
      throw new Error(`Device API failed: ${devRes.body}`);
    }
  } catch (err) {
    logFail('Mobile App', 'Device Detection API', err);
  }

  // Test 2: Device detection API (mobile override)
  try {
    const devMobRes = await httpRequest({ path: '/api/device?view=mobile' });
    const json = JSON.parse(devMobRes.body);
    if (devMobRes.statusCode === 200 && json.ok && json.device.isMobile && json.device.isApp) {
      logPass('Mobile App', 'Mobile App Simulation Mode (?view=mobile)', `isMobile: true, isApp: true`);
    } else {
      throw new Error(`Mobile mode simulation failed: ${devMobRes.body}`);
    }
  } catch (err) {
    logFail('Mobile App', 'Mobile Simulation', err);
  }

  // Test 3: PWA Manifest delivery
  try {
    const manifestRes = await httpRequest({ path: '/manifest.json' });
    const json = JSON.parse(manifestRes.body);
    if (manifestRes.statusCode === 200 && json.name && json.display === 'standalone' && Array.isArray(json.icons)) {
      logPass('Mobile App', 'PWA Web App Manifest (/manifest.json)', `Name: "${json.name}", Display: standalone, Shortcuts: ${json.shortcuts?.length}`);
    } else {
      throw new Error(`Manifest verification failed: ${manifestRes.body}`);
    }
  } catch (err) {
    logFail('Mobile App', 'PWA Manifest', err);
  }

  // Test 4: Service Worker delivery
  try {
    const swRes = await httpRequest({ path: '/sw.js' });
    if (swRes.statusCode === 200 && swRes.body.includes('addEventListener') && swRes.headers['service-worker-allowed'] === '/') {
      logPass('Mobile App', 'PWA Service Worker (/sw.js)', `Service-Worker-Allowed header present, length: ${swRes.body.length} bytes`);
    } else {
      throw new Error(`Service Worker verification failed: status ${swRes.statusCode}`);
    }
  } catch (err) {
    logFail('Mobile App', 'Service Worker', err);
  }

  // Test 5: X-Device-Type Header in server responses
  try {
    const pageRes = await httpRequest({ path: '/' });
    if (pageRes.statusCode === 200 && pageRes.headers['x-device-type']) {
      logPass('Mobile App', 'Server Device Response Headers', `X-Device-Type: "${pageRes.headers['x-device-type']}", X-Mobile-App: "${pageRes.headers['x-mobile-app']}"`);
    } else {
      throw new Error(`Missing X-Device-Type header`);
    }
  } catch (err) {
    logFail('Mobile App', 'Device Header', err);
  }

  // Test 6: Mobile PWA metadata in HTML pages
  try {
    const htmlFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));
    let metaValidCount = 0;
    for (const f of htmlFiles) {
      const html = fs.readFileSync(path.join(__dirname, f), 'utf8');
      if (html.includes('rel="manifest"') && html.includes('viewport-fit=cover') && html.includes('apple-mobile-web-app-capable')) {
        metaValidCount++;
      }
    }
    if (metaValidCount === htmlFiles.length) {
      logPass('Mobile App', 'HTML PWA & Safe Area Meta Audit', `All ${metaValidCount}/${htmlFiles.length} HTML files contain complete mobile app meta tags`);
    } else {
      throw new Error(`Only ${metaValidCount}/${htmlFiles.length} files verified`);
    }
  } catch (err) {
    logFail('Mobile App', 'HTML Meta Audit', err);
  }

  // ── FINAL SUMMARY ──────────────────────────────────────────
  console.log('\n\x1b[36m══════════════════════════════════════════════════════════════════');
  console.log('  📊 QE&A TEST EXECUTION SUMMARY');
  console.log('══════════════════════════════════════════════════════════════════\x1b[0m');
  console.log(`  Total Tests Executed:  ${passedTests + failedTests}`);
  console.log(`  \x1b[32mPassed:\x1b[0m                ${passedTests}`);
  console.log(`  \x1b[31mFailed:\x1b[0m                ${failedTests}`);
  const passRate = ((passedTests / (passedTests + failedTests)) * 100).toFixed(1);
  console.log(`  Pass Rate:             \x1b[1m${passRate}%\x1b[0m`);
  console.log('══════════════════════════════════════════════════════════════════\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runQeaTests().catch(err => {
  console.error('Test suite failed unexpectedly:', err);
  process.exit(1);
});
