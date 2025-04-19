const CACHE_NAME = "card-v1"; // Название кэша (можно менять при обновлениях)

const FILES = [ // Файлы, которые будут сохранены в кэш при установке
  "/PWA_Galimova/",
  "/PWA_Galimova/index.html",
  "/PWA_Galimova/styles.css",
  "/PWA_Galimova/App.js",
  "/PWA_Galimova/manifest.json",
  "/PWA_Galimova/offline.html",
  "/PWA_Galimova/images/photo.png",
  "/PWA_Galimova/images/2025041909058.png",
  "/PWA_Galimova/icons/android-launchericon-192-192.png",
  "/PWA_Galimova/icons/android-launchericon-512-512.png"
];

// Установка сервис-воркера
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(FILES))
  );
  self.skipWaiting(); // Сразу активировать новый воркер
});

// Активация (очистка старого кэша)
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Обработка запросов от страницы
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request) // Пытаемся найти файл в кэше
      .then(r => r || fetch(e.request)) // Если нет — пробуем загрузить из интернета
      .catch(() => caches.match("/offline.html")) // Если совсем не удалось — показать offline.html
  );
});
