import './App.css'
import DayForecast from './components/DayForecast'
import Navbar from './components/Navbar'
import WeatherData from './components/WeatherData'

function App() {
  return (
    <>
      <Navbar />
      <WeatherData />
      <DayForecast/>
    </>
  )
}

export default App
