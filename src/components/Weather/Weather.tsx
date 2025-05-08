import React, { useEffect, useState } from "react";
import { weatherCodeMap } from "./weatherCodeMap";
import "../../styles/Weather.scss";

interface WeatherData {
  temperature: number;
  weathercode: number;
}

const WeatherEmoji: React.FC<{ weather: WeatherData }> = ({ weather }) => (
  <span className="weather-emoji">
    {weatherCodeMap[weather.weathercode]?.emoji || "🌡️"}
  </span>
);

const WeatherTemperature: React.FC<{ weather: WeatherData }> = ({ weather }) => (
  <span className="weather-temp">
    {Math.round(weather.temperature)}°F
  </span>
);

const WeatherLabel: React.FC<{ weather: WeatherData }> = ({ weather }) => (
  <div className="weather-label">
    {weatherCodeMap[weather.weathercode]?.label || "Unknown weather"}
  </div>
);

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

  if (!weather) {
    return (
      <div className="weather-widget">
        <p>Loading weather...</p>
      </div>
    );
  }

  return (
    <div className="weather-widget">
      <div className="weather-main">
        <WeatherEmoji weather={weather} />
        <WeatherTemperature weather={weather} />
      </div>
      <WeatherLabel weather={weather} />
    </div>
  );
};

export default Weather;
