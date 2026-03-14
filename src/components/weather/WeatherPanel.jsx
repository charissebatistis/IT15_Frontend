import React, { useState } from 'react';
import ForecastDisplay from './ForecastDisplay';

const CITIES = [
  { label: 'Manila', latitude: 14.5995, longitude: 120.9842 },
  { label: 'Cebu City', latitude: 10.3157, longitude: 123.8854 },
  { label: 'Davao City', latitude: 7.1907, longitude: 125.4553 },
  { label: 'Baguio', latitude: 16.4023, longitude: 120.596 },
  { label: 'Tagum City', latitude: 7.4478, longitude: 125.8078 },
  { label: 'Mawab', latitude: 7.4667, longitude: 125.9833 },
];

const WeatherPanel = () => {
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);

  return (
    <div className="weather-panel-container">
      <div className="weather-city-selector">
        <label htmlFor="city-select">City: </label>
        <select
          id="city-select"
          value={selectedCity.label}
          onChange={(e) => {
            const city = CITIES.find((c) => c.label === e.target.value);
            setSelectedCity(city);
          }}
          className="city-dropdown"
        >
          {CITIES.map((city) => (
            <option key={city.label} value={city.label}>
              {city.label}
            </option>
          ))}
        </select>
      </div>

      <ForecastDisplay city={selectedCity} />
    </div>
  );
};

export default WeatherPanel;
