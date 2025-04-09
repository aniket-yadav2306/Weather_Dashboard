// Replace this with your own API key from OpenWeatherMap
const API_KEY = '5f55c71bd20f822fc97311facbf53cbd';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function fetchWeatherData(city) {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found. Please check the spelling and try again.');
      }
      throw new Error('An error occurred while fetching weather data.');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export async function fetchForecastData(city) {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found. Please check the spelling and try again.');
      }
      throw new Error('An error occurred while fetching forecast data.');
    }
    
    const data = await response.json();
    
    // Process the forecast data to get one forecast per day
    // Typically the API returns forecast data in 3-hour increments
    // We'll take one forecast per day at a consistent time (noon)
    const forecastMap = new Map();
    
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const day = date.getDate();
      
      // If we don't have this day yet, or if this is closer to noon than what we have
      const hour = date.getHours();
      const currentEntry = forecastMap.get(day);
      
      if (!currentEntry || Math.abs(hour - 12) < Math.abs(new Date(currentEntry.dt * 1000).getHours() - 12)) {
        forecastMap.set(day, item);
      }
    });
    
    // Convert map to array and take only the first 5 days
    return Array.from(forecastMap.values()).slice(0, 5);
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
}