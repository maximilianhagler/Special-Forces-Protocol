const CACHE = 'sfp-v1';
const URLS = [
  '/',
  '/index.html',
  'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;800;900&family=Share+Tech+Mono&display=swap',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/recharts@2.12.7/umd/Recharts.js',
  'https://unpkg.com/@babel/standalone/babel.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      return Promise.allSettled(URLS.map(url => cache.add(url).catch(() => {})));
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => new Response('Offline', {status: 503})))
  );
});
