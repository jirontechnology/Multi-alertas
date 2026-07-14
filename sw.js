// sw.js - Service Worker Básico
self.addEventListener('install', (event) => {
    console.log('[SW] Instalado correctamente.');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('[SW] Activado y listo.');
    return self.clients.claim();
});

// Escuchar notificaciones en segundo plano
self.addEventListener('push', (event) => {
    let data = { title: "Alerta Nueva", body: "Actividad detectada." };
    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            data.body = event.data.text();
        }
    }

    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: "./icono.png",
            vibrate: [300, 100, 300]
        })
    );
});