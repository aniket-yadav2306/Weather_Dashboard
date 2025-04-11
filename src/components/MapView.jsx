import { useState, useEffect } from 'react';
import './MapView.css';

const MapView = ({ lat, lon, city }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  
  useEffect(() => {
    if (lat && lon) {
      setMapLoaded(true);
    }
  }, [lat, lon]);

  if (!lat || !lon) {
    return null;
  }

  return (
    <div className="map-view card">
      <h3 className="map-title">Location Map</h3>
      <div className="map-container">
        {mapLoaded ? (
          <iframe
            title="Weather Location Map"
            className="weather-map"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${lon-0.02}%2C${lat-0.02}%2C${lon+0.02}%2C${lat+0.02}&layer=mapnik&marker=${lat}%2C${lon}`}
            allowFullScreen
          ></iframe>
        ) : (
          <div className="map-loading">Loading map...</div>
        )}
      </div>
      <div className="map-footer">
        <span className="map-coordinates">
          <span className="coordinate-label">Lat:</span> {lat.toFixed(4)}°, 
          <span className="coordinate-label">Lon:</span> {lon.toFixed(4)}°
        </span>
        <a 
          href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=14/${lat}/${lon}`}
          target="_blank"
          rel="noopener noreferrer"
          className="map-link"
        >
          View Larger Map
        </a>
      </div>
    </div>
  );
};

export default MapView;