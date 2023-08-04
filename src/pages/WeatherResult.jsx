import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { BsThermometerSun } from "react-icons/bs";
import { MdOutlineLocationOn } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";

function WeatherResult() {
  const location = useLocation().search.split("=")[1];
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
      console.log(response);
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <React.Fragment>
      <main className="container mt-4">
        <div className="card-container d-flex justify-content-center">
          <div className="card mb-3">
            <div className="card-header d-flex gap-3 align-items-center">
              <span
                className="cursor-pointer"
                title="Go Back"
                onClick={handleGoBack}
              >
                <BiArrowBack color="rgb(71, 198, 236)" size={30} />
              </span>
              <p className="h1 m-3 text-cyan">Weather App</p>
            </div>
            <div className="card-body">
              {weatherData ? (
                <div className="text-center">
                  <img
                    src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                    alt={weatherData.weather[0].main}
                    className="weather-img"
                  />
                  <p className="h1">{weatherData.main.temp} °C</p>
                  <p className="fs-5">{weatherData.weather[0].main}</p>
                  <p>
                    <MdOutlineLocationOn size={30} /> {weatherData.name},
                    {weatherData.sys.country}
                  </p>
                </div>
              ) : (
                <p>Loading....</p>
              )}
            </div>

            <div className="card-footer">
              {weatherData ? (
                <div className="row align-items-center">
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <BsThermometerSun size={30} color="rgb(71, 198, 236)" />
                      <div className="ms-2">
                        <p className="fs-5 mb-0">
                          {weatherData.main.feels_like} °C
                        </p>
                        <p className="mb-0">Feels like</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 border-start">
                    <div className="d-flex align-items-center">
                      <WiHumidity size={30} color="rgb(71, 198, 236)" />
                      <div className="ms-2">
                        <p className="fs-5 mb-0">
                          {weatherData.main.humidity}%
                        </p>
                        <p className="mb-0">Humidity</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Loading.....</p>
              )}
            </div>
          </div>
        </div>
      </main>

    </React.Fragment>
  );
}

export default WeatherResult;
