// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyDPa-tjXGAfUXQ5U4pldGoi0Ef9uAjz-rQ",
  authDomain: "saa-dev-c7f05.firebaseapp.com",
  projectId: "saa-dev-c7f05",
  storageBucket: "saa-dev-c7f05.appspot.com",
  messagingSenderId: "672120543698",
  appId: "1:672120543698:web:f7ec0d1a3d2399ca9e900b",
  measurementId: "G-5XY0MYS733"
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

self.addEventListener('push', function(event) {
  if (event.data) {
    const data = event.data.json();
    const notificationTitle = data.data.Title;
    const notificationOptions = {
      body: data.data.Body,
    };
    console.log('cek event', event.data.json());

    event.waitUntil(self.registration.showNotification(notificationTitle, notificationOptions));
  }
});

self.addEventListener('notificationclick', function(event) {
  console.log('Notification click received.');

  const clickActionData = event.notification.title.toLowerCase().replace(/\s+/g, '-');
  console.log('clickActionData:', clickActionData);

  if (typeof clickActionData === 'string') {
    const clickActionUrl = `/latest-news/${clickActionData}`;
    console.log('clickActionUrl:', clickActionUrl);

    event.waitUntil(clients.openWindow(clickActionUrl));
  } else {
    console.error('Invalid clickActionData:', clickActionData);
  }
});

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
});

// self.addEventListener('notificationclick', function (event) {
//   var url_action = '/about-us/latest-news';

//   if (event.notification.data && event.notification.data.url) {
//     url_action = event.notification.data.url;
//   }

//   event.notification.close();
//   event.waitUntil(self.clients.openWindow(url_action));
// });

// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     '[firebase-messaging-sw.js] Received background message ',
//     payload
//   );

//   // Customize notification here
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.images,
//     data: {
//       url: `/about-us/latest-news/${payload.notification.title.toLowerCase().replace(/\s+/g, '-')}`
//     }
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

