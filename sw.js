const staticCacheName = 'site-static';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/script.js',
    '/css/styles.css',
    '/img/icons/icon-48x48.png',
    'https://kit.fontawesome.com/e72ace8b45.js',
    'https://fonts.googleapis.com/css?family=Pridi',
    'https://fonts.googleapis.com/css?family=Poppins'
];

// listening for service worker
self.addEventListener('install', evt => {
    //console.log('service worker has been installed');
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching assests');
            cache.addAll(assets);
        })
    )
});

// listening for active service worker
self.addEventListener('activate', evt => {
    //console.log('service worker has been activated');
});

// fetch event
self.addEventListener('fetch', evt => {
    //console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    )
});