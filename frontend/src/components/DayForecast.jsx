import { useRef, useState } from "react";

const DayForecast = () => {
    const [daysForcast,setDaysForecast]=useState([]);

    const containerRef=useRef();
    const scrollLeft=() => {
        const cardWidth=containerRef.current.children[0].offsetWidth+parseInt(window.getComputedStyle(containerRef.current).gap);
        containerRef.current.scrollBy({
            left: -cardWidth,
            behavior: "smooth"
        })
    }
    const scrollRight=() => {
        const cardWidth=containerRef.current.children[0].offsetWidth+parseInt(window.getComputedStyle(containerRef.current).gap);
        containerRef.current.scrollBy({
            left: cardWidth,
            behavior: "smooth"
        })
    }

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
        <div className="w-[99vw] h-[40vh] m-auto px-4 flex items-center gap-10 overflow-hidden" ref={containerRef}>
            {daysForcast.map(forecast => (
                <div className="aspect-3/4 md:aspect-4/5 h-3/5 md:h-4/5 p-2 bg-gray-100 rounded-2xl grid grid-rows-2 place-items-center">
                    <div className="flex flex-col gap-1.5 items-center">
                        <img src="" alt="Visual weather condition" className="text-sm md:text-xl lg:text-base"/>
                        <div className="w-fit rounded-full bg-violet-400 px-2 py-0.5 text-sm text-white self-center">
                            {forecast.time}
                        </div>
                    </div>
                    <div className="self-start flex flex-col gap-1 md:gap-7 lg:gap-2 items-center mt-2 text-blue-900">
                        <div className="text-2xl md:text-6xl lg:text-3xl font-bold">
                            {forecast.temp}<sup>&deg;C</sup>
                        </div>
                        <div className="text-base font-medium md:text-3xl lg:text-base">
                            {forecast.temp_min}<sup>&deg;C</sup> - {forecast.temp_max}<sup>&deg;C</sup>
                        </div>
                    </div>
                </div>
            ))}
            
        </div>
        </>
    );
}
 
export default DayForecast;