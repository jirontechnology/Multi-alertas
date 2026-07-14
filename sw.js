const CACHE = 'jiron-alertas-v2';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

self.addEventListener('message', e => {
  if (e.data?.type === 'NOTIFY') {
    const p = e.data.payload;
    e.waitUntil(self.registration.showNotification(p.title, {
      body: p.body,
      icon: p.icon || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTIiIGZpbGw9IiMwODA4MTAiLz48dGV4dCB4PSIzMiIgeT0iNDQiIGZvbnQtc2l6ZT0iMzIiIHRleHQtYW5jaG9yPSJtaWRkbGUiPvCfjI08L3RleHQ+PC9zdmc+',
      vibrate: p.vibrate || [200,100,200],
      tag: p.tag || 'alerta',
      renotify: true,
      requireInteraction: p.important || false,
      silent: false,
      data: p.data || {}
    }));
  }
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({type:'window', includeUncontrolled:true}).then(list => {
    for (const c of list) if ('focus' in c) return c.focus();
    return clients.openWindow(self.location.origin);
  }));
});