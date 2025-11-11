const CACHE_NAME = 'prof-informatique-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/vite.svg',
  '/index.css'
];

// Install a service worker
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching static assets');
        return cache.addAll(URLS_TO_CACHE);
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

    event.respondWith(
        caches.open(CACHE_NAME).then(cache => {
            return cache.match(event.request).then(response => {
                const fetchPromise = fetch(event.request).then(networkResponse => {
                    // If we get a valid response, we update the cache.
                    if (networkResponse && networkResponse.status === 200) {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                }).catch(err => {
                    console.error('Fetch failed; user is likely offline.', err);
                    // If fetch fails and we have a cached response, the user won't see this error.
                    // If fetch fails and we don't have a cached response, this error will propagate.
                });

                // Return the cached response if it exists, otherwise wait for the network.
                return response || fetchPromise;
            });
        })
    );
});
