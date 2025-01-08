import React, { useEffect } from 'react';
import { getMessaging, onMessage } from 'firebase/messaging';
import axios from 'axios';
import { config, configTokenFirebase } from '../service/api';
import { BASE_URL } from '../service/config';
function PushNotification({ lastArticle, setLastArticle }) {
  useEffect(() => {
    // meminta izin untuk menampilkan notifikasi
    Notification.requestPermission();

    // mendapatkan instance messaging dari Firebase
    const messaging = getMessaging();

    // mendapatkan token untuk push notification
    messaging
      .getToken({
        vapidKey: 'BKagOny0KF_2pCJQ3m....moL0ewzQ8rZu', // tambahkan VAPID key di sini
      })
      .then(async (token) => {
        // kirim token ke server dengan Axios
        axios.post(BASE_URL+'Api/Firebase/AddToken', { 
            headers: await configTokenFirebase(),
            token,
         });
      });

    // menampilkan push notification ketika ada pesan masuk
    onMessage(async (payload) => {
      console.log('Message received. ', payload);
      const { title, body } = payload.notification;

      // membandingkan artikel terakhir dengan artikel baru
      axios.get(BASE_URL+'Api/Article/GetLastArticle' ,{
        headers: await config()
      })
        .then(response => {
          const newArticle = response.data;
          if (JSON.stringify(newArticle) !== JSON.stringify(lastArticle)) {
            new Notification(title, { body });
            setLastArticle(newArticle);
          }
        })
        .catch(error => {
          console.log(error);
        });
    });
  }, []);

  return null;
}

export default PushNotification;
