import { ProjectData } from '../types';

export interface EnvData {
  city: string;
  country: string;
  temp: number;
  condition: string; // z.B. "Clear sky", "Rain"
  ip: string;
  isp: string;
}

// WMO Weather interpretation codes (Open-Meteo)
const getWeatherString = (code: number): string => {
  if (code === 0) return "CLEAR_SKY";
  if (code >= 1 && code <= 3) return "PARTLY_CLOUDY";
  if (code >= 45 && code <= 48) return "FOG_DETECTED";
  if (code >= 51 && code <= 67) return "RAIN_PRECIPITATION";
  if (code >= 71 && code <= 77) return "SNOW_FALL";
  if (code >= 95) return "THUNDERSTORM_ALERT";
  return "ATMOSPHERIC_ANOMALY";
};

export const fetchEnvironmentData = async (): Promise<EnvData | null> => {
  try {
    // 1. Fetch Location via IP (ipapi.co ist zuverlässig und liefert JSON)
    const locResponse = await fetch('https://ipapi.co/json/');
    if (!locResponse.ok) throw new Error('Location access denied');
    const locData = await locResponse.json();

    // 2. Fetch Weather via Open-Meteo (No Key needed, Lat/Lon based)
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${locData.latitude}&longitude=${locData.longitude}&current_weather=true`;
    const weatherResponse = await fetch(weatherUrl);
    if (!weatherResponse.ok) throw new Error('Weather satellite offline');
    const weatherData = await weatherResponse.json();

    return {
      city: locData.city.toUpperCase(),
      country: locData.country_code,
      ip: locData.ip,
      isp: locData.org.toUpperCase(),
      temp: weatherData.current_weather.temperature,
      condition: getWeatherString(weatherData.current_weather.weathercode)
    };

  } catch (error) {
    console.warn("Environment Subsystem Warning:", error);
    return null;
  }
};
