import React, { useEffect, useState } from 'react';

const WEATHER_CODE_MAP = {
  0: '☀️',
  1: '🌤️',
  2: '⛅',
  3: '☁️',
  45: '🌫️',
  48: '🌫️',
  51: '🌦️',
  53: '🌧️',
  55: '🌧️',
  61: '🌧️',
  63: '🌧️',
  65: '⛈️',
  71: '🌨️',
  73: '🌨️',
  75: '🌨️',
  80: '🌦️',
  81: '🌧️',
  82: '⛈️',
  95: '⛈️',
};

const WEATHER_LABELS = {
  0: 'Clear',
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

const ForecastDisplay = ({ city = { latitude: 14.5995, longitude: 120.9842, label: 'Manila' } }) => {
  const [forecast, setForecast] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        setError('');

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Unable to fetch forecast');
        }

        const data = await response.json();
        
        // Set current weather
        if (data?.current) {
          setCurrentWeather({
            temperature: Math.round(data.current.temperature_2m),
            humidity: data.current.relative_humidity_2m,
            windSpeed: Math.round(data.current.wind_speed_10m),
            weatherCode: data.current.weather_code,
            icon: WEATHER_CODE_MAP[data.current.weather_code] || '🌤️',
            condition: WEATHER_LABELS[data.current.weather_code] || 'Unknown',
          });
        }

        const daily = data?.daily;

        if (daily && daily.time) {
          const forecastData = daily.time.slice(0, 5).map((date, index) => {
            const dateObj = new Date(date);
            const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
            const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            return {
              date: `${dayName}, ${dateStr}`,
              tempMax: Math.round(daily.temperature_2m_max[index]),
              tempMin: Math.round(daily.temperature_2m_min[index]),
              weatherCode: daily.weather_code[index],
              icon: WEATHER_CODE_MAP[daily.weather_code[index]] || '🌤️',
              condition: WEATHER_LABELS[daily.weather_code[index]] || 'Unknown',
              precipitation: daily.precipitation_sum[index] || 0,
            };
          });

          setForecast(forecastData);
        }
      } catch (err) {
        console.error('Failed to fetch forecast:', err);
        setError('Unable to load forecast. Showing sample data.');
        // Sample current weather
        setCurrentWeather({
          temperature: 31,
          humidity: 72,
          windSpeed: 12,
          icon: '☁️',
          condition: 'Partly cloudy',
        });
        // Sample data fallback
        setForecast([
          { date: 'Tomorrow', tempMax: 32, tempMin: 25, condition: 'Partly cloudy', icon: '⛅', precipitation: 0 },
          { date: 'Wed, Mar 15', tempMax: 31, tempMin: 24, condition: 'Cloudy', icon: '☁️', precipitation: 2 },
          { date: 'Thu, Mar 16', tempMax: 28, tempMin: 23, condition: 'Light rain', icon: '🌧️', precipitation: 5 },
          { date: 'Fri, Mar 17', tempMax: 30, tempMin: 22, condition: 'Sunny', icon: '☀️', precipitation: 0 },
          { date: 'Sat, Mar 18', tempMax: 33, tempMin: 25, condition: 'Partly cloudy', icon: '⛅', precipitation: 1 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city]);

  if (loading) {
    return <div className="forecast-display loading">Loading forecast...</div>;
  }

  return (
    <section className="forecast-display">
      <div className="forecast-header">
        <h3>Weather Overview</h3>
        <p>Current conditions & 5-day forecast</p>
      </div>

      {error && <p className="forecast-error">{error}</p>}

      {currentWeather && (
        <div className="current-weather">
          <div className="current-main">
            <span className="current-icon">{currentWeather.icon}</span>
            <div className="current-info">
              <p className="current-temp">{currentWeather.temperature}°C</p>
              <p className="current-condition">{currentWeather.condition}</p>
            </div>
          </div>
          <div className="current-details">
            <div className="detail-item">
              <span className="detail-label">Humidity</span>
              <span className="detail-value">{currentWeather.humidity}%</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Wind</span>
              <span className="detail-value">{currentWeather.windSpeed} km/h</span>
            </div>
          </div>
        </div>
      )}

      <div className="forecast-section">
        <p className="forecast-label">5-Day Forecast</p>

      <div className="forecast-grid">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-card">
            <p className="forecast-date">{day.date}</p>
            <span className="forecast-icon">{day.icon}</span>
            <div className="forecast-temps">
              <span className="max">{day.tempMax}°</span>
              <span className="min">{day.tempMin}°</span>
            </div>
            <p className="forecast-weather">{day.condition}</p>
            {day.precipitation > 0 && (
              <p className="forecast-precip">💧 {day.precipitation.toFixed(1)}mm</p>
            )}
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default ForecastDisplay;
