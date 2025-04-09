import { useState, useEffect } from 'react';
import './ForecastSection.css';
import ForecastCard from './ForecastCard';

const ForecastSection = ({ city, apiKey }) => {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      if (!city || !apiKey) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch forecast data');
        }
        
        const data = await response.json();
        
        // Process the forecast data to get one forecast per day
        const dailyForecasts = processForecastData(data.list);
        setForecastData(dailyForecasts);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchForecast();
  }, [city, apiKey]);
  
  // Function to process forecast data to get one forecast per day
  const processForecastData = (forecastList) => {
    const dailyData = {};
    
    forecastList.forEach(forecast => {
      const date = new Date(forecast.dt * 1000);
      const day = date.toLocaleDateString('en-US', { weekday: 'long' });
      
      // Only keep one forecast per day (noon forecast)
      const hour = date.getHours();
      
      if (!dailyData[day] || Math.abs(hour - 12) < Math.abs(dailyData[day].hour - 12)) {
        dailyData[day] = {
          ...forecast,
          hour
        };
      }
    });
    
    return Object.values(dailyData).slice(0, 5); // Return up to 5 days
  };
  
  if (loading) return <div className="forecast-loading">Loading forecast...</div>;
  if (error) return null; // Don't show errors in the forecast section
  if (!forecastData || forecastData.length === 0) return null;

  return (
    <div className="forecast-section card">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-container">
        {forecastData.map((forecast, index) => (
          <ForecastCard key={index} forecast={forecast} />
        ))}
      </div>
    </div>
  );
};

export default ForecastSection;