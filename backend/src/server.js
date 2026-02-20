import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { fetchWeather, fetchWeatherForecast } from "./utils/weatherData.js";

const app = express();
dotenv.config();

const port = process.env.PORT || 3001;
const test="unnecessary data";

app.use(cors());

/**
 * Here async await is used, why?
 * First async await is used when promise is the response to a function or api-call.
 * await is used when we want the execution to be sequential.
 * let's see the example below:
 *    * We had to use async await in fetchWeather() because fetch(url) returns a promise.
 *    * We had to use async await because fetchWeather() is returning a promise. i.e. async function returns a promise.
 *    * await causes the event loop to stop/wait for the promise and returns the data in response.
 *    * Now we use that data to return the desired data in desired format.
 *
 * Now think of a hypothetical scenario where you also need to return the 5 day forcast with it.
 * In this case:
 *    * You will do something like this: const [weatherData, fiveDayForecast] = await Promise.all([fetchWeather, fetchFiveDayForcast]);
 *    * Now question is why? why not await fetchWeather(); await fetchForecast();?
 *    *     * Because that will lead to sequential execution and take more time.
 *    *     * While in the case of Promise.all, execution will stop, but that will be for that function and fetchWeather() and fetchForecast() would be executing in parallel.
 */
app.get("/weather-data", async (req, res) => {
  const { lat, lon } = req.query;
  const response = await fetchWeather(lat, lon);
  if (response.code !== 200) res.send(response);
  else {
    const responseMsg = response.msg;
    const weatherData = {
      city: responseMsg.name,
      temp: Math.round(responseMsg.main.temp),
      temp_min: Math.round(responseMsg.main.temp_min),
      temp_max: Math.round(responseMsg.main.temp_max),
      icon_url: `https://openweathermap.org/img/wn/${responseMsg.weather[0].icon}@2x.png`,
    };
    res.send({ code: 200, weatherData });
  }
});
app.get("/weather-forecast", async (req, res) => {
  const { lat, lon } = req.query;
  const response = await fetchWeatherForecast(lat, lon);
  if (response.code !== 200) res.send(response);
  else {
    let forecastList = response.msg.list;
    forecastList = forecastList.map((forecast) => ({
      date: new Date(forecast.dt_txt).toLocaleDateString("en-US", {
        year: "2-digit",
        month: "short",
        day: "2-digit",
      }),
      time: new Date(forecast.dt_txt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      temp: Math.round(forecast.main.temp),
      temp_min: Math.round(forecast.main.temp_min),
      temp_max: Math.round(forecast.main.temp_max),
      icon_url: `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`,
    }));
    res.send({ code: 200, forecastList });
  }
});

app.listen(port, () => {
  console.log("App is listening on port:" + port);
});
