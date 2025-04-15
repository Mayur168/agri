// src/registerServiceWorker.js
export function register() {
    // Register the service worker in both development and production
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        // For development, ensure the service worker is registered
        navigator.serviceWorker
          .register(swUrl)
          .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
  
            // Handle updates
            registration.onupdatefound = () => {
              const installingWorker = registration.installing;
              if (installingWorker) {
                installingWorker.onstatechange = () => {
                  if (installingWorker.state === 'installed') {
                    if (navigator.serviceWorker.controller) {
                      console.log('New content is available; please refresh.');
                    } else {
                      console.log('Content is cached for offline use.');
                    }
                  }
                };
              }
            };
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error);
          });
      });
    }
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.unregister();
        })
        .catch((error) => {
          console.error('Service Worker unregistration failed:', error);
        });
    }
  }