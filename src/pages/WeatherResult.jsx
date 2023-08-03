import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function WeatherResult() {
  const location = useLocation().search.split('=')[1];
  const [weatherData, setWeatherData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (location) {
      fetchWeatherData(location);
    }
  }, [location]);

  const fetchWeatherData = async (location) => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Weather Information</h1>
      {weatherData ? (
        <>
          <p>Location: {weatherData.name}, {weatherData.sys.country}</p>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          {/* Add more weather data as needed */}
        </>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleGoBack}>Back</button>
    </div>
  );
}

export default WeatherResult;
