// NotificationComponent.js
import React, { useEffect, useState } from 'react';

const NotificationComponent = () => {
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    setNotificationPermission(Notification.permission);
    setupPushNotification();
  }, []);

  const setupPushNotification = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('../public/firebase-messaging-sw');
        const subscription = await registration.pushManager.getSubscription();

        if (subscription) {
          setSubscription(subscription);

          // Tampilkan device token (push subscription endpoint) di konsol
          console.log('Device Token:', subscription.endpoint);
        }
      } catch (error) {
        console.error('Error registering service worker:', error);
      }
    }
  };

  const handlePermissionRequest = async () => {
    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);

      if (permission === 'granted') {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: 'BJs6PcS_xRM5muSsEYWcGEqtlCwxHk5hbjGyH53xHZLRez5sR_Cnen1OwB3AS0gS4MqnQPXiRQgBXAUFPIbZ1JQ', // Ganti dengan public key dari server Anda
        });

        setSubscription(subscription);
        console.log('Device Token:', subscription.endpoint);

        // Kirimkan subscription ke server untuk digunakan dalam mengirimkan push notification
        // axios.post('/api/subscribe', subscription);
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  return (
    <div>
      <p>Notification Permission: {notificationPermission}</p>
      {notificationPermission === 'default' && (
        <button onClick={handlePermissionRequest}>Allow Notifications</button>
      )}
    </div>
  );
};

export default NotificationComponent;
