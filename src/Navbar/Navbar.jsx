import React, { useState } from "react";
import axios from "axios";
import ToggleButton from "./ToggleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationCrosshairs,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Styles from "./Navbar.module.css";

const Navbar = (props) => {
  const [city, setCity] = useState("");
  const apiKey = process.env.REACT_APP_LOCATION_KEY;

  const sendCityNameToApp = () => {
    // Call the function passed as a prop to send data to the parent
    props.sendCityNameToApp(city);
    setCity("");
  };

  const fetchCurrentLocationData = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=${apiKey}`
        );
        const cityName = response.data.results[0].components.city;
        setCity(cityName);
        sendCityNameToApp(cityName); // Send current location data to the parent
      } catch (error) {
        console.error("Error:", error);
      }
    });
  };

  return (
    <div className={Styles.navbar}>
      <ToggleButton />
      <div className={Styles.searchBar}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={Styles.searchIcon}
        />
        <input
          type="text"
          placeholder="Search for your preferred city..."
          name="city name"
          autocomplete="city name"
          className={Styles.searchInput}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendCityNameToApp();
            }
          }}
        />
        <button className={Styles.searchButton} onClick={sendCityNameToApp}>
          Search
        </button>
      </div>
      <div
        className={Styles.locationContainer}
        onClick={fetchCurrentLocationData}
      >
        <FontAwesomeIcon
          icon={faLocationCrosshairs}
          className={Styles.locationIcon}
        />
        <p className={Styles.locationText}>Current Location</p>
      </div>
    </div>
  );
};

export default Navbar;
