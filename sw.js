if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        console.log('[JT] Service Worker registrado con éxito en el alcance:', registration.scope);
      })
      .catch(error => {
        // Esto nos desglosará el TypeError para ver el mensaje interno real
        console.error('[JT] Error detallado al registrar:', error.message, error.stack);
      });
  });
} else {
  console.warn('[JT] Los Service Workers no están soportados en este navegador.');
}