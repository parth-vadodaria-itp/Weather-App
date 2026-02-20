import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

const DayForecast = ({ userCoordinates }) => {
  const [daysForcast, setDaysForecast] = useState([])

  const containerRef = useRef()
  const scrollLeft = () => {
    const cardWidth =
      containerRef.current.children[0].offsetWidth +
      parseInt(window.getComputedStyle(containerRef.current).gap)
    containerRef.current.scrollBy({
      left: -cardWidth,
      behavior: 'smooth',
    })
  }
  const scrollRight = () => {
    const cardWidth =
      containerRef.current.children[0].offsetWidth +
      parseInt(window.getComputedStyle(containerRef.current).gap)
    containerRef.current.scrollBy({
      left: cardWidth,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    if (userCoordinates !== null) {
      const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
      const url =
        baseUrl +
        `/weather-forecast?lat=${userCoordinates.lat}&lon=${userCoordinates.lon}`
      axios
        .get(url)
        .then((res) => {
          if (res.data.code === 200) {
            setDaysForecast(res.data.forecastList)
          } else alert('Something went wrong! Try again later.')
        })
        .catch((err) => {
          alert('Something went wrong! Try again later.')
          console.log(err)
        })
    }
  })

  return (
    <>
      <div className="text-xl text-white p-1 px-4 flex justify-end gap-1 [&_button]:bg-violet-800 [&_button]:rounded-full [&_button]:cursor-pointer [&_button]:px-2">
        <button onClick={scrollLeft}>
          <i className="ri-arrow-left-fill"></i>
        </button>
        <button onClick={scrollRight}>
          <i className="ri-arrow-right-fill"></i>
        </button>
      </div>
      <div
        className="w-[99vw] h-[40vh] m-auto px-1 flex items-center gap-4 overflow-hidden"
        ref={containerRef}
      >
        {daysForcast.map((forecast) => (
          <div className="aspect-7/8 md:aspect-6/7 h-3/4 md:h-9/10 p-2 bg-linear-to-br from-blue-200 to-violet-400 rounded-2xl grid grid-rows-2 place-items-center">
            <div className="flex flex-col gap-1.5 items-center">
              <img
                src={forecast.icon_url}
                alt="Visual weather condition"
                className="text-sm md:text-xl lg:text-base"
              />
              <div className="flex gap-1 md:gap-4 lg:gap-1.5">
                <div className="w-fit rounded-full bg-violet-800 px-1 md:px-2.5 lg:px-1 py-0.5 md:py-1 lg:py-0.5 text-xs md:text-lg lg:text-sm text-white self-center">
                  {forecast.date}
                </div>
                <div className="w-fit rounded-full bg-violet-500 px-1 md:px-2.5 lg:px-1 py-0.5 md:py-1 lg:py-0.5 text-xs md:text-lg lg:text-sm text-white self-center">
                  {forecast.time}
                </div>
              </div>
            </div>
            <div className="self-center flex flex-col gap-1 md:gap-7 lg:gap-2 items-center mt-2 text-blue-950">
              <div className="text-2xl md:text-6xl lg:text-3xl font-bold">
                {forecast.temp}
                <sup>&deg;C</sup>
              </div>
              <div className="text-base font-medium md:text-3xl lg:text-base">
                {forecast.temp_min}
                <sup>&deg;C</sup> - {forecast.temp_max}
                <sup>&deg;C</sup>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default DayForecast
