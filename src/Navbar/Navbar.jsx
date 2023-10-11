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

  const sendToApp = () => {
    // Call the functions passed as props to send data to the parent
    props.sendToApp(city); // Assuming you have a prop named "sendCityToApp"
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
        sendToApp(cityName); // Send current location data to the parent
      } catch (error) {
        console.error("Error:", error);
      }
    });
  };

  return (
    <div className={`${Styles.navbar} ${props.isDarkMode ? Styles.dark : ""}`}>
      <ToggleButton
        isDarkMode={props.isDarkMode}
        setIsDarkMode={props.setIsDarkMode}
      />
      <div className={Styles.searchBar}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={Styles.searchIcon}
        />
        <input
          type="text"
          placeholder="Search for your preferred city..."
          name="city name"
          className={Styles.searchInput}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendToApp();
            }
          }}
        />
        <button className={Styles.searchButton} onClick={sendToApp}>
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
