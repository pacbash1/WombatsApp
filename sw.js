const CACHE = 'wombats-v1';
const ASSETS = ['/WombatsApp/', '/WombatsApp/index.html'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  if (e.request.url.includes('archive.org')) return;
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
