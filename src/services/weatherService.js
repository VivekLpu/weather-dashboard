import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_API_URL;


export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Error: ${error.response.data.message}`);
    } else if (error.request) {
      throw new Error("No response from the server. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};