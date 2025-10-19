// Service Worker for offline-first caching of emergency protocols and critical guidelines
const CACHE_NAME = 'spinalsync-critical-v1';
const CRITICAL_URLS = [
  '/emergency',
  '/emergency/autonomic-dysreflexia',
  '/emergency/[id]',
  '/guidelines/bladder',
  '/guidelines/bowel',
  '/guidelines/skin',
  '/guidelines/pain',
  // Add more critical guideline URLs as needed
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CRITICAL_URLS);
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
  if (CRITICAL_URLS.some((url) => event.request.url.includes(url))) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((fetchRes) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, fetchRes.clone());
            return fetchRes;
          });
        });
      })
    );
  }
});
