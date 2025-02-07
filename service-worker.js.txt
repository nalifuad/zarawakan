if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')  // Points to the root location
    .then(function(registration) {
      console.log('Service Worker registered with scope: ', registration.scope);
    })
    .catch(function(error) {
      console.log('Service Worker registration failed: ', error);
    });
}
