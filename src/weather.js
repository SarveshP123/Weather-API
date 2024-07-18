import React, { useState } from 'react';
import axios from 'axios';
import './weather.css';
import { Button } from 'react-bootstrap';

function DynamicWeatherAPI() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const handleWeather = () => {
        if (!city) {
            setError('Please enter a city');
            setWeather(null);
            return;
        }

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1efd599987fe916b69134f1dc1513eec&units=metric`)
            .then(response => {
                setWeather(response.data);
                setError('');
            })
            .catch(err => {
                setError('Error fetching weather data');
                setWeather(null);
            });
    };

    return (
        <div className="weather-container">
            <h1 className='heading'> Weather Checking Website</h1>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
            />
            <Button variant='' onClick={handleWeather}>Check Weather</Button>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {weather && (
                <div className="weather-info">
                    <h2>Country: {weather.sys.country}</h2>
                    <p>City: {weather.name}</p>
                    <p>Temperature: {weather.main.temp} °C</p>
                    <p>Weather: {weather.weather[0].description}</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                </div>
            )}
        </div>
    );
}

export default DynamicWeatherAPI;
