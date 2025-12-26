const CACHE_NAME = "routine-cache-v2";
const ASSETS = [
  "./",
  "index.html",
  "style.css",
  "routine.js",
  "notify.js",
  "graph.js",
  "app.js",
  "confetti.js",
  "manifest.json"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});

