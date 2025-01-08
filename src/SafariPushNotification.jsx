import React, { useEffect } from 'react';
import { BASE_URL_ } from './service/config';
const SafariPushNotification = () => {
  const handleAllowPush = (e) => {
    e.preventDefault();

    if ('safari' in window && 'pushNotification' in window.safari) {
      const permissionData = window.safari.pushNotification.permission('web.com.hakovo.saa');
      checkRemotePermission(permissionData);
    }
  };

  const checkRemotePermission = (permissionData) => {
    if (permissionData.permission === 'default') {
      window.safari.pushNotification.requestPermission(
        BASE_URL_,
        'web.com.hakovo.saa',
        {},
        checkRemotePermission
      );
    } else if (permissionData.permission === 'denied') {
      console.log('The user said no.');
    } else if (permissionData.permission === 'granted') {
      console.log("The user said yes, with token: " + permissionData.deviceToken);
    }
  };

  return (
    <div>
      <button id="allow_push" onClick={handleAllowPush}>
        Allow Push
      </button>
    </div>
  );
};

export default SafariPushNotification;
