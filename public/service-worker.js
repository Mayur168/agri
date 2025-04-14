const CACHE_NAME = 'agriculture-pwa-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/vendor/bootstrap/css/bootstrap.min.css',
  '/assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
  '/assets/css/main.css',
  '/assets/js/main.js',
  '/assets/img/favicon.png',
  '/assets/img/logo192.png',
  '/assets/img/logo512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        return caches.match('/index.html');
      });
    })
  );
});