// public/service-worker.js
// Same content as src/service-worker.js
const CACHE_NAME = 'agriculture-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/img/favicon.png',
  '/assets/img/logo192.png',
  '/assets/img/logo512.png',
  '/assets/css/main.css',
  '/assets/vendor/bootstrap/css/bootstrap.min.css',
  '/assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
  '/assets/vendor/aos/aos.js',
  '/assets/vendor/swiper/swiper-bundle.min.js',
  '/assets/vendor/glightbox/js/glightbox.min.js',
  '/assets/js/main.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
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

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});