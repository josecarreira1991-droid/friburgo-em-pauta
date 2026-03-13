// Service Worker — Push Notifications
self.addEventListener("push", function(event) {
  var data = event.data ? event.data.json() : {};
  var title = data.title || "Marcos Medeiros AO VIVO";
  var options = {
    body: data.body || "TV do Povo esta ao vivo agora! Assista ja.",
    icon: "/images/marcos-perfil.jpg",
    badge: "/images/marcos-perfil.jpg",
    image: data.image || "/images/marcos-perfil.jpg",
    vibrate: [200, 100, 200, 100, 200],
    tag: data.tag || "live-notification",
    renotify: true,
    requireInteraction: true,
    actions: [
      { action: "watch", title: "Assistir Agora" },
      { action: "later", title: "Depois" }
    ],
    data: { url: data.url || "/tv" }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function(event) {
  event.notification.close();
  if (event.action === "later") return;
  var url = event.notification.data && event.notification.data.url ? event.notification.data.url : "/tv";
  event.waitUntil(clients.openWindow(url));
});

self.addEventListener("install", function() { self.skipWaiting(); });
self.addEventListener("activate", function() { self.clients.claim(); });
