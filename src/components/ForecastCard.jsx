import React from 'react';
import './ForecastCard.css';

function ForecastCard({ forecast }) {
  const { dt, main, weather } = forecast;
  const date = new Date(dt * 1000);
  
  // Get day name
  const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
  
  // Format date as "Apr 10"
  const dayDate = date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric'
  });

  // Get weather condition icon and color
  const getWeatherColor = (condition) => {
    const conditions = {
      'Clear': '#FFD700',
      'Clouds': '#B0C4DE',
      'Rain': '#4682B4',
      'Drizzle': '#87CEEB',
      'Thunderstorm': '#483D8B',
      'Snow': '#F0F8FF',
      'Mist': '#708090',
      'Smoke': '#696969',
      'Haze': '#D3D3D3',
      'Dust': '#CD853F',
      'Fog': '#778899',
      'Sand': '#F4A460',
      'Ash': '#A9A9A9',
      'Squall': '#2F4F4F',
      'Tornado': '#800000'
    };
    
    return conditions[condition] || '#3498db';
  };
  
  const weatherColor = getWeatherColor(weather[0].main);

  return (
    <div className="forecast-card">
      <div className="forecast-day-container">
        <div className="forecast-day">{dayName}</div>
        <div className="forecast-date">{dayDate}</div>
      </div>
      
      <div className="forecast-icon-container">
        <img 
          src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`} 
          alt={weather[0].description} 
          className="forecast-icon"
        />
      </div>
      
      <div className="forecast-temp-container">
        <div className="forecast-temp">{Math.round(main.temp)}°</div>
        <div className="forecast-feels">
          <span className="forecast-hi">H:{Math.round(main.temp_max)}°</span>
          <span className="forecast-lo">L:{Math.round(main.temp_min)}°</span>
        </div>
      </div>
      
      <div 
        className="forecast-desc"
        style={{ backgroundColor: `${weatherColor}20` }}
      >
        <span>{weather[0].main}</span>
      </div>
      
      <div className="forecast-details">
        <div className="forecast-detail-item">
          <span className="detail-icon">💧</span>
          <span>{main.humidity}%</span>
        </div>
        <div className="forecast-detail-item">
          <span className="detail-icon">🌬️</span>
          <span>{(forecast.wind.speed * 3.6).toFixed(1)} km/h</span>
        </div>
      </div>
    </div>
  );
}

export default ForecastCard;