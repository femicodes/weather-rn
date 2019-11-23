import { API_KEY } from './key';

export const fetchWeather = async (lat = 25, lon = 25) => {
  try {
    const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`);
    return data.json();
  } catch (error) {
    return error;
  }
};
