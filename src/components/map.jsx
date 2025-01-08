import React, { useEffect, useState } from 'react';
import { loadGoogleMaps } from '../utils/utils';
import './App.css';

function Map() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    loadGoogleMaps(() => {
      const mapOptions = {
        center: { lat: -6.21462, lng: 106.84513 },
        zoom: 13,
      };
      const mapElement = document.getElementById('map');
      const newMap = new window.google.maps.Map(mapElement, mapOptions);
      setMap(newMap);
    });
  }, []);

  return (
    <div id="map" className="h-screen w-full"></div>
  );
}

export default Map;
