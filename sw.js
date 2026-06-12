/* Service worker : le jeu fonctionne même sans internet.
   Stratégie « réseau d'abord » : les mises à jour arrivent dès qu'on est
   connecté, et le cache prend le relais hors ligne. */

const CACHE = "gfaa-v1";
const FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "css/style.css",
  "js/config.js",
  "js/dictee.js",
  "js/questions.js",
  "js/questions-extra.js",
  "js/levels.js",
  "js/profiles.js",
  "js/audio.js",
  "js/quiz.js",
  "js/engine.js",
  "js/main.js",
  "icons/icon-180.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
