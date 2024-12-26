import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar/Navbar";
import City from "./WeatherContainer/City";
import CurrentWeather from "./WeatherContainer/CurrentWeather";
import Styles from "./App.module.css";

function App() {
  const [cityNameFromNavbar, SetCityNameFromNavbar] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cityName, setCityName] = useState("");
  const apiKey = process.env.REACT_APP_API_KEY;

  const receiveFromNavbar = (childrenData) => {
    SetCityNameFromNavbar(childrenData);
    console.log("Data received from Navbar:", childrenData);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const response = await axios.get(
          // `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=${apiKey}`
          `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`
        );
        const cityName = response.data.name;
        setCityName(cityName);
        SetCityNameFromNavbar(cityName);
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }, []);

  return (
    <div className={`${Styles.container} ${isDarkMode ? Styles.dark : ""}`}>
      <Navbar
        sendToApp={receiveFromNavbar}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        apiKey={apiKey} // Pass apiKey as a prop to Navbar component
      />
      <div className={Styles.weatherContainer}>
        <City
          city={cityNameFromNavbar ? cityNameFromNavbar : cityName}
          isDarkMode={isDarkMode}
        />
        <CurrentWeather
          city={cityNameFromNavbar ? cityNameFromNavbar : cityName}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
}

export default App;
