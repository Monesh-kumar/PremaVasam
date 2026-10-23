/**
 * ══════════════════════════════════════════════════════════
 * PREMAVASAM &bull; PWA Service Worker (Mobile & Offline Support)
 * ══════════════════════════════════════════════════════════
 */

const CACHE_NAME = 'premavasam-v1.1';
const CORE_ASSETS = [
  '/',
  '/css/main.css',
  '/js/main.js',
  '/manifest.json',
  '/sponsormeals',
  '/howhelp',
  '/gallery',
  '/contact'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch(err => {
        console.warn('PWA: Non-fatal caching warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Network-first for dynamic API routes
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(req).catch(() => new Response(JSON.stringify({ ok: false, error: 'Offline' }), {
        headers: { 'Content-Type': 'application/json' }
      }))
    );
    return;
  }

  // Stale-while-revalidate for static pages and assets
  event.respondWith(
    caches.match(req).then((cached) => {
      const networked = fetch(req).then((resp) => {
        if (resp && resp.status === 200 && req.method === 'GET') {
          const respClone = resp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, respClone));
        }
        return resp;
      }).catch(() => cached);

      return cached || networked;
    })
  );
});
