const staticCacheName = 'site-static-v60';
const dynamicCacheName = 'site-dynamic-v60';
const assets = [
    '/',
    '/index.html',
    '/pages/fallback.html',
    '/js/app.js',
    '/js/script.js',
    '/css/styles.css',
    '/css/loginForm.css',
    '/img/icons/icon-48x48.png',
    'https://kit.fontawesome.com/e72ace8b45.js',
    'https://ka-f.fontawesome.com'
];

const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        })
    })
};

// listening for service worker
self.addEventListener('install', evt => {
    //console.log('service worker has been installed');
    // evt.waitUntil(
    //     caches.open(staticCacheName).then(cache => {
    //         console.log('caching assests');
    //         cache.addAll(assets);
    //     })
    // )
});

// listening for active service worker
self.addEventListener('activate', evt => {
    //console.log('service worker has been activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            )
        })
    )
});

// fetch event
self.addEventListener('fetch', evt => {
    //console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes;
                })
            });
        }).catch(() => {
            if (evt.request.url.indexOf('.html') > -1) {
                return caches.match('/pages/fallback.html');
            }
        })
    );
});