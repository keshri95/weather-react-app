import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WeatherForm() {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();


 const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/weather?location=${encodeURIComponent(location)}`);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          console.log({latitude, longitude})


          // TODO: Implement reverse geocoding to get location name based on latitude and longitude
          // For brevity, we'll assume the location name is available and directly redirect to /weather.
          navigate(`/weather?location=CurrentLocation`);
          console.log({latitude, longitude})

        },
        (error) => {
          console.log(error)
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <h1>Weather Application</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
      </form>
      <button onClick={handleCurrentLocation}>Get Current Location Weather</button>
    </div>
  );
}

export default WeatherForm;
