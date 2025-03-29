import React from "react";

function WeatherCard({ data }) {
  return (
    <div className="mt-6 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg text-center w-80">
      <h2 className="text-2xl font-bold">{data.name}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt={data.weather[0].description}
        className="mx-auto"
      />
      <p className="text-xl">{data.weather[0].description}</p>
      <p className="text-3xl font-bold">{data.main.temp}°C</p>
      <div className="flex justify-around mt-4">
        <p> Humidity: {data.main.humidity}%</p>
        <p> Wind: {data.wind.speed} km/h</p>
      </div>
    </div>
  );
}

export default WeatherCard;
