// Prefer fresh app navigation; fall back offline. Cache only this conference.
// Notes remain in localStorage and never enter network requests.
const CACHE_NAME = 'haicis2026-guide-v3';
const SCOPE = new URL('./', self.location.href).pathname;
const PRECACHE_URLS = ['./', './index.html', './search.js', './favicon.svg?v=2', './share-qr.svg'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys
    .filter(key => key.startsWith('haicis2026-guide-') && key !== CACHE_NAME)
    .map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || !url.pathname.startsWith(SCOPE)) return;
  // Ignore URL query strings when navigating; test/share URLs work offline too.
  const isShell = request.mode === 'navigate' && [SCOPE, SCOPE + 'index.html'].includes(url.pathname);
  const key = isShell ? new URL('index.html', self.location.href).href : request;
  const refresh = caches.open(CACHE_NAME).then(async cache => {
    const response = await fetch(request);
    if (response.ok) await cache.put(key, response.clone());
    return response;
  });
  event.waitUntil(refresh.catch(() => {}));
  event.respondWith(caches.open(CACHE_NAME).then(async cache => {
    const cached = await cache.match(key);
    if (isShell) return refresh.catch(() => cached || Response.error());
    return cached || refresh.catch(() => Response.error());
  }));
});
