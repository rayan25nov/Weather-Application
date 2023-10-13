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
  const apiKey = process.env.REACT_APP_LOCATION_KEY;

  const receiveFromNavbar = (childrenData) => {
    SetCityNameFromNavbar(childrenData);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=${apiKey}`
        );
        const cityName = response.data.results[0].components.city;
        setCityName(cityName);
        SetCityNameFromNavbar(cityName);
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }, []);

  const modifiedCityName = cityNameFromNavbar ? cityNameFromNavbar : cityName;
  const cityToSearch = modifiedCityName.toLowerCase().includes("city")
    ? modifiedCityName.replace(" city", "")
    : modifiedCityName;

  return (
    <div className={`${Styles.container} ${isDarkMode ? Styles.dark : ""}`}>
      <Navbar
        sendToApp={receiveFromNavbar}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        apiKey={apiKey}
      />
      <div className={Styles.weatherContainer}>
        <City
          city={cityNameFromNavbar ? cityNameFromNavbar : cityToSearch}
          isDarkMode={isDarkMode}
        />
        <CurrentWeather city={cityToSearch} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}

export default App;
