import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

const port = process.env.PORT || 3001;

app.use(cors());

app.get("/weather-data", async (req, res) => {
  const { lat, lon } = req.query;
  const api_key = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`;

  const response = await fetch(url);
  console.log(response);
  if(!response.ok) res.send({code: 500, msg: "Internal Server Error"});

  const city = await response.json();
  const weatherData = {
    city: city.name,
    temp: Math.round(city.main.temp),
    temp_min: Math.round(city.main.temp_min),
    temp_max: Math.round(city.main.temp_max),
    icon_url: `https://openweathermap.org/img/wn/${city.weather[0].icon}%402x.png`,
  };
  res.send({code: 200, weatherData});
  // console.log(city);
});

app.listen(port, () => {
  console.log("App is listening on port:" + port);
});
