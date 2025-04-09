import { useState, useEffect } from 'react';
import './WeatherCard.css';

const WeatherCard = ({ weatherData, onRefresh }) => {
  const [animateCard, setAnimateCard] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState('day');
  
  useEffect(() => {
    // Add animation class when weather data changes
    setAnimateCard(true);
    const timer = setTimeout(() => setAnimateCard(false), 500);
    
    // Determine time of day based on current hour
    const hour = new Date().getHours();
    setTimeOfDay(hour >= 6 && hour < 20 ? 'day' : 'night');
    
    return () => clearTimeout(timer);
  }, [weatherData]);

  if (!weatherData) return null;
  
  const {
    name,
    sys: { country, sunrise, sunset },
    main: { temp, feels_like, humidity, pressure },
    weather,
    wind: { speed },
    visibility,
    dt
  } = weatherData;

  const weatherIcon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  
  // Convert wind speed from m/s to km/h
  const windSpeedKmh = (speed * 3.6).toFixed(1);
  
  // Format time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Get current time
  const currentTime = formatTime(dt);
  const sunriseTime = formatTime(sunrise);
  const sunsetTime = formatTime(sunset);
  
  // Format visibility
  const visibilityKm = (visibility / 1000).toFixed(1);
  
  // Get weather background class
  const getWeatherClass = () => {
    const main = weather[0].main.toLowerCase();
    if (main.includes('clear')) return 'clear-effect';
    if (main.includes('cloud')) return 'clouds-effect';
    if (main.includes('rain')) return 'rain-effect';
    if (main.includes('snow')) return 'snow-effect';
    if (main.includes('thunder')) return 'thunderstorm-effect';
    if (main.includes('mist') || main.includes('fog')) return 'mist-effect';
    return '';
  };

  return (
    <div className={`weather-card card ${animateCard ? 'fade-in' : ''} ${timeOfDay}-mode`}>
      <div className="weather-header">
        <div>
          <h2><span className="location-pin">📍</span>{name}, {country}</h2>
          <p className="weather-description">{weather[0].description}</p>
          <p className="current-time">Updated: {currentTime}</p>
        </div>
        <button className="refresh-button" onClick={onRefresh} aria-label="Refresh weather data">
          ↻
        </button>
      </div>
      
      <div className="weather-content">
        <div className="weather-main">
          <img 
            src={weatherIcon} 
            alt={weather[0].description}
            className="weather-icon"
          />
          <div className="temperature">
            {Math.round(temp)}
            <span className="feels-like">Feels like: {Math.round(feels_like)}°C</span>
          </div>
        </div>
        
        <div className="weather-details">
          <div className="detail-item">
            <span className="detail-label"><i className="weather-icon-small">💧</i>Humidity:</span>
            <span className="detail-value">{humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label"><i className="weather-icon-small">💨</i>Wind:</span>
            <span className="detail-value">{windSpeedKmh} km/h</span>
          </div>
          <div className="detail-item">
            <span className="detail-label"><i className="weather-icon-small">👁️</i>Visibility:</span>
            <span className="detail-value">{visibilityKm} km</span>
          </div>
          <div className="detail-item">
            <span className="detail-label"><i className="weather-icon-small">🔄</i>Pressure:</span>
            <span className="detail-value">{pressure} hPa</span>
          </div>
        </div>
      </div>
      
      <div className="weather-indicators">
        <div className="indicator-item">
          <span className="indicator-icon">🌅</span>
          <span className="indicator-label">Sunrise</span>
          <span className="indicator-value">{sunriseTime}</span>
        </div>
        <div className="indicator-item">
          <span className="indicator-icon">🌇</span>
          <span className="indicator-label">Sunset</span>
          <span className="indicator-value">{sunsetTime}</span>
        </div>
        <div className="weather-condition-badge">
          <span className="condition-icon">{getWeatherEmoji(weather[0].main)}</span>
          <span className="condition-text">{weather[0].main}</span>
        </div>
      </div>
      
      <div className={`weather-background ${getWeatherClass()}`}></div>
    </div>
  );
};

// Helper function to get weather emoji
function getWeatherEmoji(condition) {
  const conditions = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Smoke': '🌫️',
    'Haze': '🌫️',
    'Dust': '🌫️',
    'Fog': '🌫️',
    'Sand': '🌫️',
    'Ash': '🌫️',
    'Squall': '💨',
    'Tornado': '🌪️'
  };
  
  return conditions[condition] || '🌡️';
}

export default WeatherCard;