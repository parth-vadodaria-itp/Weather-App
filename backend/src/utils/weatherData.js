const fetchWeather = async (lat, lon) => {
  const api_key = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`;

  const response = await fetch(url);
  if (!response.ok) return { code: 500, msg: "Internal Server Error" };

  const msg = await response.json();
  return { code: 200, msg };
};

const fetchWeatherForecast = async (lat, lon) => {
  const api_key = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=8&appid=${api_key}`;

  const response = await fetch(url);
  if (!response.ok) return { code: 500, msg: "Internal Server Error" };

  const msg = await response.json();
  return { code: 200, msg };
};

export { fetchWeather, fetchWeatherForecast };
