// 1. Registrar el Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log('Service Worker registrado con éxito', reg))
    .catch(err => console.error('Error al registrar el SW', err));
}

// 2. Función para pedir permiso (asociada a un botón)
function solicitarPermisoNotificaciones() {
  if (!('Notification' in window)) {
    alert('Este navegador no soporta notificaciones.');
    return;
  }

  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('¡Permiso concedido!');
      // Aquí ya puedes mostrar una notificación de prueba
      mostrarNotificacionDePrueba();
    } else {
      console.warn('Permiso denegado');
    }
  });
}