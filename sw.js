const CACHE_NAME = 'prof-informatique-v2';
const URLS_TO_CACHE = [
  // App shell
  '/',
  '/index.html',
  '/vite.svg',
  '/index.css',
  '/index.tsx',

  // Styling
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Tajawal:wght@400;500;700&display=swap',

  // Core JS Dependencies from importmap
  'https://aistudiocdn.com/react@^19.2.0',
  'https://aistudiocdn.com/react-dom@^19.2.0/client',
  'https://aistudiocdn.com/recharts@^3.3.0',
  'https://aistudiocdn.com/lodash@^4.17.21',
  '@google/genai'
];

// Install a service worker
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and pre-caching core assets');
        // Use addAll with a catch to prevent a single failed asset from breaking the entire install
        return cache.addAll(URLS_TO_CACHE).catch(err => {
          console.error('Failed to cache one or more resources during install:', err);
        });
      })
  );
});

// Activate the service worker and remove old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Use a "stale-while-revalidate" strategy for fetching assets.
self.addEventListener('fetch', event => {
    // We only want to cache GET requests.
    if (event.request.method !== 'GET') {
        return;
    }

    const url = new URL(event.request.url);

    // Don't cache chrome-extension requests
    if (url.protocol === 'chrome-extension:') {
        return;
    }

    event.respondWith(
        caches.open(CACHE_NAME).then(cache => {
            return cache.match(event.request).then(response => {
                const fetchPromise = fetch(event.request).then(networkResponse => {
                    // If we get a valid response, we update the cache.
                    // This includes opaque responses (from no-cors requests to third-party CDNs)
                    if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                }).catch(err => {
                    console.error('Fetch failed; user is likely offline.', err);
                    // This error will propagate only if there's no cached response.
                });

                // Return the cached response if it exists, otherwise wait for the network.
                return response || fetchPromise;
            });
        })
    );
});
