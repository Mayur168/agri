// src/service-worker.js
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

// Install event: Cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event: Serve from cache or fetch from network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response if found, else fetch from network
      return response || fetch(event.request).catch(() => {
        // Optional: Return a fallback page for HTML navigation
        return caches.match('/index.html');
      });
    })
  );
});

// Activate event: Clean up old caches
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