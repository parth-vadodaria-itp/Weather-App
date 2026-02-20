import { useEffect, useState } from 'react'
import './App.css'
import DayForecast from './components/DayForecast'
import Navbar from './components/Navbar'
import WeatherData from './components/WeatherData'
import Lottie from 'lottie-react'
import loadingAnimation from './assets/animations/loading.json'

function App() {
  const [userCoordinates, setUserCoordinates] = useState(null)
  const [loading, setLoading] = useState(true)

  const getLocation = () => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(success, error)
    else {
      alert('Geolocation is not supported by the browser.')
    }
  }

  const success = (position) => {
    setUserCoordinates({
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    })
    setLoading(false)
  }

  const error = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert('User denied the request for geolocation.')
        break
      case error.PERMISSION_UNAVAILABLE:
        alert('Location information is unavailable.')
        break
      case error.TIMEOUT:
        alert('The request to get user location timed out.')
        break
      case error.UNKNOWN_ERROR:
        alert('An unknown error occurred.')
        break
      default:
        alert('Something went wrong! Try again later.')
    }
  }

  useEffect(() => getLocation())

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="h-[90vh] object-contain">
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      ) : (
        <>
          <WeatherData userCoordinates={userCoordinates} />
          <DayForecast userCoordinates={userCoordinates} />
        </>
      )}
    </>
  )
}

export default App
