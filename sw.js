importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:"AIzaSyAxifeD5tvV3A4s4SE6d5-P-HyI1Pf0h8s",
  authDomain:"portal-altos-santa-izabel.firebaseapp.com",
  projectId:"portal-altos-santa-izabel",
  storageBucket:"portal-altos-santa-izabel.firebasestorage.app",
  messagingSenderId:"314879065622",
  appId:"1:314879065622:web:76be1b38e018a0cbed3f37"
});

var messaging = firebase.messaging();
messaging.onBackgroundMessage(function(payload){
  var title = (payload.notification && payload.notification.title) || 'Portal Altos Santa Izabel';
  var options = {
    body: (payload.notification && payload.notification.body) || '',
    icon: './icon-192.png'
  };
  self.registration.showNotification(title, options);
});

const APP_VERSION = '1.18.0';
const CACHE = 'portal-asi-v'+APP_VERSION;
const ASSETS = ['./index.html','./manifest.json'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(k => k !== CACHE).map(k => caches.delete(k))
  )));
  self.clients.claim();
});
self.addEventListener('fetch', e => e.respondWith(
  fetch(e.request).catch(() => caches.match(e.request))
));
