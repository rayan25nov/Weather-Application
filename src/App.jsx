import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar/Navbar";
import City from "./WeatherContainer/City";
import CurrentWeather from "./WeatherContainer/CurrentWeather";
import Styles from "./App.module.css";

function App() {
  const [cityNameFromNavbar, SetCityNameFromNavbar] = useState("");
  const [cityName, setCityName] = useState("");
  const apiKey = process.env.REACT_APP_LOCATION_KEY;

  const receiveCityNameFromNavbar = (childData) => {
    SetCityNameFromNavbar(childData);
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

  return (
    <div className={Styles.container}>
      <Navbar
        sendCityNameToApp={receiveCityNameFromNavbar}
        apiKey={apiKey} // Pass apiKey as a prop to Navbar component
      />
      <div className={Styles.weatherContainer}>
        <City city={cityNameFromNavbar ? cityNameFromNavbar : cityName} />
        <CurrentWeather
          city={cityNameFromNavbar ? cityNameFromNavbar : cityName}
        />
      </div>
    </div>
  );
}

export default App;