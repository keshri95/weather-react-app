import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Divider } from "../comonents/Divider";

function WeatherForm() {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/weather?location=${encodeURIComponent(location)}`);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          try {
            const apiKey = import.meta.env.VITE_API_KEY;
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
            const response = await axios.get(apiUrl);
            const locationName = `${response.data.name}, ${response.data.sys.country}`;
            navigate(`/weather?location=${encodeURIComponent(locationName)}`);
          } catch (error) {
            console.error("Error fetching weather data:", error);
          }
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <React.Fragment>
      <main className="container ">
        <div className="card border-primary ">
          <div className="card-header header-no-bg">
            <p className="h1 m-2 text-cyan">Weather App</p>
          </div>
          <div className="card-body text-primary m-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  value={location}
                  className="form-control"
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter city name"
                />
              </div>
            </form>

            <div>
              <Divider>or</Divider>
            </div>

            <div className="d-grid gap-2 col-12 mx-auto mt-3">
              <button className="btn btn-cyan" onClick={handleCurrentLocation}>
                Get Device Location
              </button>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}

export default WeatherForm;
