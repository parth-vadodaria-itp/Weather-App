const WeatherData = () => {
    return (
        <div className="relative w-[99vw] h-[40vh] m-auto">
            <img src="src/assets/images/weather_data_bg.jpg" alt="" className="w-full h-full object-cover rounded-2xl z-0"/>
            <div className="absolute top-0 z-10 w-full h-full grid grid-cols-2 text-white place-items-center">
                <div className="">
                    <span className="text-xl md:text-4xl font-semibold">San Francisco</span>
                </div>
                <div className="aspect-3/4 md:aspect-4/5 h-3/5 md:h-4/5 p-2 bg-linear-to-br from-green-400 via-pink-400/60 to-violet-800/60 rounded-2xl grid grid-rows-2 place-items-center">
                    <i class="ri-sun-cloudy-fill text-6xl md:text-9xl lg:text-7xl"></i>
                    <div className="self-start flex flex-col gap-1 md:gap-7 lg:gap-2 items-center mt-2">
                        <div className="text-2xl md:text-6xl lg:text-4xl font-semibold">23<sup>&deg;C</sup></div>
                        <div className="text-base md:text-3xl lg:text-lg">23<sup>&deg;C</sup> - 31<sup>&deg;C</sup></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default WeatherData;