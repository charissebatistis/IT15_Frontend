/**
 * Weather API Service
 * Uses OpenWeatherMap or similar API
 * Store your API key in .env as VITE_WEATHER_API_KEY
 */

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'demo';
const WEATHER_API_URL = 'https://api.open-meteo.com/v1';

/**
 * Get weather for a location (uses free Open-Meteo API - no key needed)
 * @param {number} latitude 
 * @param {number} longitude 
 * @returns {Promise} Weather data
 */
export const getWeatherByCoordinates = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `${WEATHER_API_URL}/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&hourly=temperature_2m,weather_code,precipitation&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
    );

    if (!response.ok) {
      throw new Error('Weather API Error');
    }

    const data = await response.json();
    return transformWeatherData(data);
  } catch (error) {
    console.error('Weather fetch error:', error);
    throw error;
  }
};

/**
 * Get weather by city name using geocoding
 * @param {string} city 
 * @returns {Promise} Weather data
 */
export const getWeatherByCity = async (city) => {
  try {
    // First, get coordinates from city name
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );

    if (!geoResponse.ok) {
      throw new Error('Geocoding API Error');
    }

    const geoData = await geoResponse.json();
    
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error('City not found');
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // Then get weather for those coordinates
    const weatherData = await getWeatherByCoordinates(latitude, longitude);
    weatherData.location = `${name}, ${country}`;

    return weatherData;
  } catch (error) {
    console.error('Weather by city error:', error);
    throw error;
  }
};

/**
 * Transform weather API response to convenient format
 */
const transformWeatherData = (data) => {
  const current = data.current;
  const daily = data.daily;

  // Get current weather description
  const weatherCode = current.weather_code;
  const weatherDescription = getWeatherDescription(weatherCode);

  // Format daily forecast
  const forecast = daily.time.slice(0, 5).map((date, index) => ({
    date,
    maxTemp: daily.temperature_2m_max[index],
    minTemp: daily.temperature_2m_min[index],
    weatherCode: daily.weather_code[index],
    weather: getWeatherDescription(daily.weather_code[index]),
    precipitation: daily.precipitation_sum[index],
  }));

  return {
    current: {
      temperature: Math.round(current.temperature_2m),
      weatherCode: weatherCode,
      weather: weatherDescription,
      humidity: current.relative_humidity_2m,
      windSpeed: Math.round(current.wind_speed_10m),
      timestamp: new Date(),
    },
    forecast,
  };
};

/**
 * Get human-readable weather description from WMO code
 */
const getWeatherDescription = (code) => {
  const descriptions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Frost fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with hail',
    99: 'Thunderstorm with heavy hail',
  };

  return descriptions[code] || 'Unknown';
};

/**
 * Get weather icon based on code
 */
export const getWeatherIcon = (weatherCode) => {
  if (weatherCode === 0 || weatherCode === 1) return '☀️';
  if (weatherCode === 2 || weatherCode === 3) return '☁️';
  if (weatherCode >= 45 && weatherCode <= 48) return '🌫️';
  if (weatherCode >= 51 && weatherCode <= 67) return '🌧️';
  if (weatherCode >= 71 && weatherCode <= 86) return '🌨️';
  if (weatherCode >= 95 && weatherCode <= 99) return '⛈️';
  return '🌤️';
};
