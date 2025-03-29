import React, { useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; 

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState([]);

  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    setError(null);

    try {
      // Fetching Current Weather Data here
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(weatherResponse.data);

      // Fetching 5-Day Forecast Data here
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      // Extracting one forecast per day here
      const dailyForecast = {};
      forecastResponse.data.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0]; 
        if (!dailyForecast[date]) {
          dailyForecast[date] = item;
        }
      });

      setForecastData(Object.values(dailyForecast));

      // Updating search history till 5 searches
      setHistory((prevHistory) => {
        const updatedHistory = [
          cityName,
          ...prevHistory.filter((c) => c !== cityName),
        ];
        return updatedHistory.slice(0, 5);
      });
    } catch (err) {
      setError("City not found. Please try again.");
      setWeatherData(null);
      setForecastData([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-6 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* header */}
      <div className="w-full flex flex-col items-center py-4 relative">
        <h1 className="text-3xl font-bold mb-4">Weather Dashboard</h1>

        {/*implementing dark mode toggle button here*/}
        <button
  onClick={toggleTheme}
  className={`w-12 h-6 flex items-center justify-center rounded-full transition-all duration-300 
    ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
>
  {darkMode ? '🌙' : '☀️'}
</button>

      </div>

      {/* implementation of search */}
      <div className="flex gap-2 mt-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white w-full"
        />
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => {
            fetchWeather(city);
            setCity(""); 
          }}
        >
          Search
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded"
          onClick={() => fetchWeather(weatherData?.name)}
        >
          Refresh
        </button>
      </div>

      {/* For error handling and loading */}
      {loading && <div className="mt-4 text-lg">Loading...</div>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* For displaying weather */}
      {weatherData && (
        <div className="mt-6 p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-800 text-black dark:text-white w-full max-w-md text-center">
          <h2 className="text-2xl font-bold">{weatherData.name}</h2>

          {/* For weather icon */}
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt="Weather Icon"
            className="w-20 h-20 mx-auto mt-2"
          />

          <p className="text-lg">{weatherData.weather[0].description}</p>
          <p className="text-xl font-semibold">{weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} km/h</p>
        </div>
      )}

      {/* Displaying 5 day forecast here */}
      {forecastData.length > 0 && (
        <div className="mt-6 w-full max-w-2xl">
          <h3 className="text-lg font-bold text-center dark:text-white">
            5-Day Forecast
          </h3>
          <div className="flex justify-center gap-4 mt-4 overflow-x-auto">
            {forecastData.map((day, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg bg-gray-200 dark:bg-gray-700 text-black dark:text-white shadow-lg"
              >
                <p className="font-semibold">
                  {new Date(day.dt_txt).toDateString()}
                </p>
                <img
                  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt="Weather Icon"
                  className="w-16 h-16 mx-auto"
                />
                <p className="text-lg font-semibold">{day.main.temp}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/*Implementing Search History now*/}
      {history.length > 0 && (
        <div className="mt-6 w-full max-w-md">
          <h3 className="text-lg font-bold">Recent Searches</h3>
          <ul className="mt-2">
            {history.map((city, index) => (
              <li
                key={index}
                className="cursor-pointer text-blue-500 hover:underline"
                onClick={() => fetchWeather(city)}
              >
                {city}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
