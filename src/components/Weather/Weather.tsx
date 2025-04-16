import React, { useEffect, useState } from "react";
import { weatherCodeMap } from "./weatherCodeMap";
import "../../styles/Weather.scss";

interface WeatherData {
    temperature: number;
    weathercode: number;
  }
  
const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=42.03726&longitude=-88.2810994&temperature_unit=fahrenheit&current=temperature_2m,weather_code"
        );
        const data = await response.json();
        setWeather({
          temperature: data.current.temperature_2m,
          weathercode: data.current.weather_code,
        });
      } catch (error) {
        console.error("Failed to fetch weather", error);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="weather-widget">
      {weather ? (
        <>
          <div className="weather-main">
            <span className="weather-emoji">
              {weatherCodeMap[weather.weathercode]?.emoji || "🌡️"}
            </span>
            <span className="weather-temp">
              {Math.round(weather.temperature)}°F
            </span>
          </div>
          <div className="weather-label">
            {weatherCodeMap[weather.weathercode]?.label || "Unknown weather"}
          </div>
        </>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};

export default Weather;
