# Weather Dashboard  

A modern and responsive weather dashboard built with React.js and Tailwind CSS. Users can search for any city to view real-time weather updates including temperature, humidity, wind speed and a 5-day forecast.  

##  Live Demo  
🔗 [Weather Dashboard](https://viveklpu.github.io/weather-dashboard/)  

## Tech Stack  
- **Frontend**: React.js (Vite)  
- **State Management**: React Hooks (useState, useEffect)  
- **Styling**: Tailwind CSS  
- **Animations**: Framer Motion  
- **API**: OpenWeatherMap API  

## Features  
✅ **Search any city** and view real-time weather data  
✅ **5-day forecast** with temperature trends  
✅ **Dark mode / Light mode toggle**  
✅ **Recent search history** (last 5 searches)  
✅ **Refresh button** to fetch the latest data  
✅ **Loading and error handling**  

## Setup Instructions  

### 1.Clone the Repository  
git clone https://github.com/viveklpu/weather-dashboard.git
cd weather-dashboard

### 2. Install Dependencies
npm install

### 3.Get API Key
Go to OpenWeatherMap API
Sign up and generate a free API key
Create a .env file in the root directory and add:
VITE_API_KEY="your_api_key"

### 4.Run the App Locally
npm run dev
App will be available at http://localhost:5173/

### API Integration Details
Current Weather API:
https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric
Data Provided: City name, temperature, humidity, wind speed, weather conditions
Rate Limits: Free tier allows 60 requests per minute

### 5-Day Forecast API
https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric
Data Provided: Forecast every 3 hours for the next 5 days




