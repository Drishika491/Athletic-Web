import axios from "axios";
import firebase from "firebase/app";
import "firebase/messaging";
import { configTokenFirebase } from "./service/api";
import run from "./service/hmac";
import { BASE_URL } from "./service/config";
// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyDPa-tjXGAfUXQ5U4pldGoi0Ef9uAjz-rQ",
    authDomain: "saa-dev-c7f05.firebaseapp.com",
    projectId: "saa-dev-c7f05",
    storageBucket: "saa-dev-c7f05.appspot.com",
    messagingSenderId: "672120543698",
    appId: "1:672120543698:web:f7ec0d1a3d2399ca9e900b",
    measurementId: "G-5XY0MYS733"
};

function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

      // Initialize Firebase Cloud Messaging and get a reference to the service
      const messaging = firebase.messaging();

      // Add the public key generated from the console here.
      messaging.getToken({vapidKey: "BJs6PcS_xRM5muSsEYWcGEqtlCwxHk5hbjGyH53xHZLRez5sR_Cnen1OwB3AS0gS4MqnQPXiRQgBXAUFPIbZ1JQ"}).then((token)=>{
        if(token){
          console.log('token is: ', token)
        }
        else{
          console.log('token doesnt exist');
        }
      });
    }
    else{
      console.log('faild get token')
    }
  })
};

// let intervalId = null;

// function requestPermission() {
//   console.log('Requesting permission...'); 

//   // Check if notification permission is already granted on page reload
//   if (Notification.permission === 'granted') {
//     console.log('Notification permission granted.');
//     clearInterval(intervalId);
//     localStorage.removeItem('xauth');
//     run('GET')
//       .then((result) => {
//         // Lakukan sesuatu dengan hasil yang diterima dari fungsi run
//       })
//       .catch((error) => {
//         // Lakukan sesuatu jika terjadi kesalahan pada fungsi run
//       });
//   } else {
//     Notification.requestPermission().then((permission) => {
//       if (permission === 'denied' && window.safari !== undefined) {
//         alert('You have denied permission for notifications. Please update your browser settings to enable notifications.');
//       } else if (permission === 'default' && window.safari !== undefined) {
//         alert('Please click allow to receive notifications.');
//       }
//       if (permission === 'granted') {
//         console.log('Notification permission granted.');
//         intervalId = setInterval(() => {
//           localStorage.removeItem('xauth');
//           // getCookie('xauth');
//           run('POST')
//             .then((result) => {
//               // Lakukan sesuatu dengan hasil yang diterima dari fungsi run
//             })
//             .catch((error) => {
//               // Lakukan sesuatu jika terjadi kesalahan pada fungsi run
//             });
//         }, 1000);

//         if (window.safari === undefined) {
//           // Initialize Firebase
//           firebase.initializeApp(firebaseConfig);

//           // Initialize Firebase Cloud Messaging and get a reference to the service
//           const messaging = firebase.messaging();

//           // Add the public key generated from the console here.
//           messaging.getToken({vapidKey: "BJs6PcS_xRM5muSsEYWcGEqtlCwxHk5hbjGyH53xHZLRez5sR_Cnen1OwB3AS0gS4MqnQPXiRQgBXAUFPIbZ1JQ"}).then(async (currentToken) => {
//             if (currentToken) {
//               console.log('token is', currentToken);
//               if (Notification.permission === "default") {
//                 Notification.requestPermission().then(permission => {
//                   if (permission === "granted") {
//                     console.log("Notification permission granted.");
//                   }            
//                 });
//               }

//               // Request to add token to server
//               const clientId = navigator.platform + '-' + navigator.language + '-' + window.devicePixelRatio + '-' + screen.width + 'x' + screen.height;
//               const data = { ClientID: clientId, Token: currentToken };
//               console.log('cek body', data)
//               axios.post(BASE_URL+'/Api/Firebase/AddToken', data ,{
//                 headers: {
//                   'Content-Type': 'application/json',
//                   ...await configTokenFirebase()
//                 }
//               })
//                 .then((response) => {
//                   console.log(response.data);
//                   clearInterval(intervalId);
//                   localStorage.removeItem('xauth');
//                   run('GET')
//                     .then((result) => {
//                       // Lakukan sesuatu dengan hasil yang diterima dari fungsi run
//                     })
//                     .catch((error) => {
//                       // Lakukan sesuatu jika terjadi kesalahan pada fungsi run
//                     });
//                 })
//                 .catch((error) => {
//                   console.log(error);
//                 });
//             } else {
//               console.log('token doesnt exist');
//             }
//           });
//         }
//       } else
//       {
//         console.log('failed to get permission');
//       }
//     })
//   }
// }

requestPermission();
