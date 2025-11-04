// listening for service worker
self.addEventListener('install', evt => {
    console.log('service worker has been installed');
})

// listening for active service worker
self.addEventListener('activate', evt => {
    console.log('service worker has been activated');
})