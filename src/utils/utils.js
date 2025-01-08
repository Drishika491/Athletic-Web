const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY_HERE';

export const loadGoogleMaps = (callback) => {
  if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
    callback();
  } else {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
    script.defer = true;
    script.async = true;
    window.initMap = callback;
    document.body.appendChild(script);
  }
};
