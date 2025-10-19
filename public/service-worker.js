// Service Worker for offline-first caching of emergency protocols and critical guidelines
const CACHE_NAME = 'spinalsync-critical-v2';
const STATIC_URLS = [
  '/emergency',
  '/emergency/autonomic-dysreflexia',
  '/guidelines/bladder',
  '/guidelines/bowel',
  '/guidelines/skin',
  '/guidelines/pain',
  // Add more static critical URLs as needed
];
const CRITICAL_PREFIXES = ['/emergency/', '/guidelines/'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_URLS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  const matchesStatic = STATIC_URLS.includes(requestUrl.pathname);
  const matchesPrefix = CRITICAL_PREFIXES.some((prefix) =>
    requestUrl.pathname.startsWith(prefix)
  );

  if (!matchesStatic && !matchesPrefix) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return networkResponse;
        })
        .catch(() => cachedResponse);
    })
  );
});
