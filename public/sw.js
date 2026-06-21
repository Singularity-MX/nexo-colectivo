// public/sw.js

const CACHE_NAME = 'nexo-ar-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/textures/earth.png',
  '/textures/earth_clouds.png',
  '/textures/k218.png',
  '/textures/kepler.png',
  '/textures/proxima.png',
  '/textures/trappist.png',
  '/targets/nexo.mind',
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cacheando recursos AR...');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activar y limpiar cachés viejas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Estrategia: Cache First, luego Network
self.addEventListener('fetch', (event) => {
  // Solo cachear texturas y assets del proyecto
  if (event.request.url.includes('/textures/') || 
      event.request.url.includes('/targets/')) {
    
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            // Devolver del caché inmediatamente
            console.log('✅ Servido desde caché:', event.request.url);
            
            // Actualizar caché en segundo plano
            fetch(event.request)
              .then((response) => {
                if (response.ok) {
                  caches.open(CACHE_NAME)
                    .then((cache) => cache.put(event.request, response));
                }
              })
              .catch(() => {});
            
            return cachedResponse;
          }
          
          // Si no está en caché, descargar y cachear
          return fetch(event.request)
            .then((response) => {
              if (!response.ok) return response;
              
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => cache.put(event.request, responseToCache));
              
              return response;
            });
        })
    );
  }
});

// Manejar mensajes
self.addEventListener('message', (event) => {
  if (event.data === 'clearCache') {
    caches.delete(CACHE_NAME)
      .then(() => {
        event.ports[0].postMessage({ success: true });
      });
  }
  
  if (event.data === 'getCacheInfo') {
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.keys();
      })
      .then((keys) => {
        event.ports[0].postMessage({
          count: keys.length,
          urls: keys.map(k => k.url)
        });
      });
  }
});