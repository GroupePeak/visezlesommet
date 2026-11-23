// visezlesommet.ca : retrait du service worker de l'ancien site, remplacé le 23 novembre 2026.
// Ce fichier porte le nom de l'ancien script pour que les navigateurs qui l'avaient inscrit le remplacent par celui-ci.
// Il ne traite aucune requête : il se désinscrit, vide les caches laissées par l'ancien site, puis recharge les pages ouvertes.
// NE PAS SUPPRIMER ni renommer ce fichier : un visiteur de l'ancien site peut revenir des mois plus tard.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (event) {
  event.waitUntil((async function () {
    try { await self.registration.unregister(); } catch (e) {}
    try { var cles = await caches.keys(); await Promise.all(cles.map(function (c) { return caches.delete(c); })); } catch (e) {}
    try {
      var fenetres = await self.clients.matchAll({ type: 'window' });
      await Promise.all(fenetres.map(function (f) {
        try { return f.navigate(f.url).catch(function () {}); } catch (e) { return null; }
      }));
    } catch (e) {}
  })());
});
