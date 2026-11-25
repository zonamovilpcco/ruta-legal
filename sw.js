// Service worker de Ruta Legal: deja la app abrir sin internet (pantalla de la bici y reglas).
// El mapa, las ciclorrutas y las rutas siempre necesitan internet.
var CACHE = "ruta-legal-v4";
var BASE = ["./", "index.html", "manifest.webmanifest", "reglas/colombia.json", "icon-192.png", "icon-512.png", "bici-marcador.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(BASE); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.clients.claim(); })
  );
});

function guardar(req, res) {
  if (res && (res.ok || res.type === "opaque")) {
    var copia = res.clone();
    caches.open(CACHE).then(function (c) { c.put(req, copia); });
  }
  return res;
}

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);

  // Archivos propios: primero la red (así ves siempre la versión nueva), y sin internet el caché.
  if (url.origin === self.location.origin) {
    e.respondWith(
      fetch(req).then(function (res) { return guardar(req, res); }).catch(function () {
        return caches.match(req, { ignoreSearch: true }).then(function (hit) {
          return hit || (req.mode === "navigate" ? caches.match("index.html") : Response.error());
        });
      })
    );
    return;
  }

  // Leaflet, MapLibre y las fuentes: primero el caché.
  var libreria = (url.hostname === "cdnjs.cloudflare.com" && url.pathname.indexOf("/leaflet/") !== -1) ||
    ((url.hostname === "unpkg.com" || url.hostname === "cdn.jsdelivr.net") && url.pathname.indexOf("maplibre-gl") !== -1);
  var fuente = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (libreria || fuente) {
    e.respondWith(
      caches.match(req).then(function (hit) {
        return hit || fetch(req).then(function (res) { return guardar(req, res); });
      })
    );
  }
  // Todo lo demás (teselas del mapa, Overpass, Valhalla) va directo a la red.
});
