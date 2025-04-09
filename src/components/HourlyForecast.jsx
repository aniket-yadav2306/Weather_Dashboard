import { useState, useEffect } from 'react';
import './HourlyForecast.css';

const HourlyForecast = ({ city, apiKey }) => {
  const [hourlyData, setHourlyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('temp');

  useEffect(() => {
    const fetchHourlyForecast = async () => {
      if (!city || !apiKey) return;

      try {
        setLoading(true);
        setError(null);

        // First, get coordinates for the city
        const geoResponse = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
        );

        if (!geoResponse.ok) {
          throw new Error('Failed to fetch city coordinates');
        }

        const geoData = await geoResponse.json();
        
        if (!geoData.length) {
          throw new Error('City not found');
        }

        const { lat, lon } = geoData[0];

        // Now fetch hourly forecast using coordinates
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );

        if (!forecastResponse.ok) {
          throw new Error('Failed to fetch hourly forecast data');
        }

        const forecastData = await forecastResponse.json();
        
        // Process the data to get the next 24 hours (8 entries as each is 3 hours apart)
        const next24Hours = forecastData.list.slice(0, 8);
        setHourlyData(next24Hours);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHourlyForecast();
  }, [city, apiKey]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const getMetricValue = (item) => {
    switch (selectedMetric) {
      case 'temp':
        return Math.round(item.main.temp);
      case 'humidity':
        return item.main.humidity;
      case 'wind':
        return Math.round(item.wind.speed * 3.6); // Convert m/s to km/h
      default:
        return Math.round(item.main.temp);
    }
  };

  const getMetricUnit = () => {
    switch (selectedMetric) {
      case 'temp':
        return '°C';
      case 'humidity':
        return '%';
      case 'wind':
        return 'km/h';
      default:
        return '°C';
    }
  };

  const getMetricIcon = () => {
    switch (selectedMetric) {
      case 'temp':
        return '🌡️';
      case 'humidity':
        return '💧';
      case 'wind':
        return '💨';
      default:
        return '🌡️';
    }
  };

  if (loading) {
    return (
      <div className="hourly-forecast card">
        <h3>Hourly Forecast</h3>
        <div className="hourly-loading">Loading hourly forecast...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hourly-forecast card">
        <h3>Hourly Forecast</h3>
        <div className="hourly-error">Error loading forecast: {error}</div>
      </div>
    );
  }

  if (!hourlyData) return null;

  // Find the maximum value for scaling the graph
  const maxValue = Math.max(...hourlyData.map(item => getMetricValue(item)));
  const minValue = Math.min(...hourlyData.map(item => getMetricValue(item)));
  // Add 10% padding to max value for better visualization
  const graphMax = maxValue + (maxValue - minValue) * 0.1;
  const graphMin = Math.max(0, minValue - (maxValue - minValue) * 0.1);

  return (
    <div className="hourly-forecast card">
      <div className="hourly-header">
        <h3>Hourly Forecast</h3>
        <div className="metric-selector">
          <button 
            className={`metric-button ${selectedMetric === 'temp' ? 'active' : ''}`}
            onClick={() => setSelectedMetric('temp')}
          >
            Temperature
          </button>
          <button 
            className={`metric-button ${selectedMetric === 'humidity' ? 'active' : ''}`}
            onClick={() => setSelectedMetric('humidity')}
          >
            Humidity
          </button>
          <button 
            className={`metric-button ${selectedMetric === 'wind' ? 'active' : ''}`}
            onClick={() => setSelectedMetric('wind')}
          >
            Wind
          </button>
        </div>
      </div>

      <div className="hourly-graph-container">
        <div className="hourly-graph">
          {hourlyData.map((item, index) => {
            const value = getMetricValue(item);
            // Calculate height percentage based on min and max values
            const heightPercentage = graphMax === graphMin 
              ? 50 
              : ((value - graphMin) / (graphMax - graphMin)) * 100;
            
            return (
              <div key={index} className="graph-column">
                <div className="graph-value">
                  {value}{getMetricUnit()}
                </div>
                <div className="graph-bar-container">
                  <div 
                    className="graph-bar"
                    style={{ height: `${heightPercentage}%` }}
                  ></div>
                </div>
                <div className="graph-time">{formatTime(item.dt)}</div>
                <div className="graph-date">{formatDate(item.dt)}</div>
                <div className="graph-icon">
                  <img 
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} 
                    alt={item.weather[0].description}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="metric-info">
        <span className="metric-icon">{getMetricIcon()}</span>
        <span className="metric-name">
          {selectedMetric === 'temp' && 'Temperature (°C)'}
          {selectedMetric === 'humidity' && 'Humidity (%)'}
          {selectedMetric === 'wind' && 'Wind Speed (km/h)'}
        </span>
      </div>
    </div>
  );
};

export default HourlyForecast;