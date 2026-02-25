import React, { useEffect, useMemo, useState } from 'react';

const CITIES = [
  { label: 'Manila', latitude: 14.5995, longitude: 120.9842 },
  { label: 'Cebu City', latitude: 10.3157, longitude: 123.8854 },
  { label: 'Davao City', latitude: 7.1907, longitude: 125.4553 },
  { label: 'Baguio', latitude: 16.4023, longitude: 120.596 },
  { label: 'Tagum City', latitude: 7.4478, longitude: 125.8078 },
  { label: 'Mawab', latitude: 7.4667, longitude: 125.9833 },
];

const WEATHER_CODE_MAP = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Light rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  71: 'Light snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  80: 'Rain showers',
  81: 'Moderate showers',
  82: 'Violent showers',
  95: 'Thunderstorm',
};

const WeatherPanel = ({ compact = false }) => {
  const [city, setCity] = useState(CITIES[0]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchWeather = async () => {
      setLoading(true);
      setError('');

      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error('Unable to fetch weather right now.');
        }

        const data = await response.json();
        const current = data?.current;
        const daily = data?.daily;

        setWeather({
          temperature: current?.temperature_2m,
          humidity: current?.relative_humidity_2m,
          wind: current?.wind_speed_10m,
          weatherCode: current?.weather_code,
          max: daily?.temperature_2m_max?.[0],
          min: daily?.temperature_2m_min?.[0],
          updatedAt: current?.time,
        });
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError('Live weather unavailable. Showing sample data.');
          setWeather({
            temperature: 29,
            humidity: 73,
            wind: 10,
            weatherCode: 2,
            max: 31,
            min: 24,
            updatedAt: new Date().toISOString(),
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();

    return () => controller.abort();
  }, [city]);

  const weatherLabel = useMemo(
    () => WEATHER_CODE_MAP[weather?.weatherCode] || 'Weather update',
    [weather?.weatherCode],
  );

  return (
    <section className={`widget-shell weather-module ${compact ? 'compact' : ''}`}>
      <div className="module-head">
        <h2>Campus Weather</h2>
        <p>Live weather updates for your selected city.</p>
      </div>

      <div className="weather-toolbar">
        <label htmlFor="city-select" className="weather-label">
          City
        </label>
        <select
          id="city-select"
          className="filter-select"
          value={city.label}
          onChange={(event) => {
            const selectedCity = CITIES.find((item) => item.label === event.target.value);
            if (selectedCity) {
              setCity(selectedCity);
            }
          }}
        >
          {CITIES.map((item) => (
            <option key={item.label} value={item.label}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className="weather-grid">
        <article className="weather-main-card">
          {loading ? (
            <p className="weather-loading">Loading weather...</p>
          ) : (
            <>
              <p className="weather-city">{city.label}</p>
              <h3>{weather?.temperature} C</h3>
              <p className="weather-desc">{weatherLabel}</p>
              <p className="weather-updated">Updated: {weather?.updatedAt?.replace('T', ' ') || 'N/A'}</p>
            </>
          )}
        </article>

        <article className="weather-stat-card">
          <h4>Today Range</h4>
          <p>
            {weather?.min} C - {weather?.max} C
          </p>
        </article>

        <article className="weather-stat-card">
          <h4>Humidity</h4>
          <p>{weather?.humidity}%</p>
        </article>

        <article className="weather-stat-card">
          <h4>Wind Speed</h4>
          <p>{weather?.wind} km/h</p>
        </article>
      </div>

      {error && <p className="weather-note">{error}</p>}
    </section>
  );
};

export default WeatherPanel;
