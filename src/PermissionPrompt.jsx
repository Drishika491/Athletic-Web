import React, { useEffect, useState } from 'react';

function PermissionPrompt() {
  const [permission, setPermission] = useState('default');

  useEffect(() => {
    if ('safari' in window && 'pushNotification' in window.safari) {
      const permissionData = window.safari.pushNotification.permission('web.com.hakovo.saa');
      setPermission(permissionData.permission);
    }
  }, []);

  const handlePermissionRequest = () => {
    if (permission === 'default') {
      window.safari.pushNotification.requestPermission(
        'https://saa-web.hakovo.com',
        'web.com.hakovo.saa',
        {},
        function (deviceToken) {
          console.log('Device token:', deviceToken);
          // Kirim device token ini ke server Anda
          setPermission('granted');
        }
      );
    }
  };

  return (
    <div>
      {permission === 'default' && (
        <button onClick={handlePermissionRequest}>Request Permission</button>
      )}
      {permission === 'granted' && <p>Anda telah memberikan izin untuk notifikasi.</p>}
      {permission === 'denied' && <p>Anda telah menolak izin notifikasi.</p>}
    </div>
  );
}

export default PermissionPrompt;


