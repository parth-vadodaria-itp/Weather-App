import { useState, useEffect } from "react"
import axios from "axios"

const WeatherData = () => {

    const [weatherData, setWeatherData]=useState(null);

    const getLocation=() => {
        if(navigator.geolocation) navigator.geolocation.getCurrentPosition(success, error);
        else{
            alert("Geolocation is not supported by the browser.")
        }
    }
    
    const success = (position) => {
        const baseUrl=import.meta.env.VITE_BACKEND_BASE_URL;
        axios.get(baseUrl+`/weather-data?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
            .then((res) => {
                if(res.code===200){
                    setWeatherData(res.weatherData);
                }
                else alert("Something went wrong! Try again later.")
            })
            .catch((err) => {
                alert("Something went wrong! Try again later.")
                console.log(err);
            })
    }

    useEffect(() => {
        getLocation();
    },[])

  return (
    <div className="relative w-[99vw] h-[40vh] m-auto">
      <img
        src="src/assets/images/weather_data_bg.jpg"
        alt=""
        className="w-full h-full object-cover rounded-2xl z-0"
      />
      <div className="absolute top-0 z-10 w-full h-full grid grid-cols-2 text-white place-items-center">
        <div className="">
          <span className="text-xl md:text-4xl font-semibold">
            {weatherData.city}
          </span>
        </div>
        <div className="aspect-3/4 md:aspect-4/5 h-3/5 md:h-4/5 p-2 bg-linear-to-br from-green-400 via-pink-400/60 to-violet-800/60 rounded-2xl grid grid-rows-2 place-items-center">
          <img src={weatherData.icon_url} alt="Visual weather condition" className="text-6xl md:text-9xl lg:text-7xl"/>
          <div className="self-start flex flex-col gap-1 md:gap-7 lg:gap-2 items-center mt-2">
            <div className="text-2xl md:text-6xl lg:text-4xl font-semibold">
              {weatherData.temp}<sup>&deg;C</sup>
            </div>
            <div className="text-base md:text-3xl lg:text-lg">
              {weatherData.temp_min}<sup>&deg;C</sup> - {weatherData.temp_max}<sup>&deg;C</sup>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherData
