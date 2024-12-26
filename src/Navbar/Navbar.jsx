import cities from "cities-list";
import React, { useState } from "react";
import axios from "axios";
import ToggleButton from "./ToggleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationCrosshairs,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Styles from "./Navbar.module.css";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const Navbar = (props) => {
  const [city, setCity] = useState("");
  const [filteredCities, setFilteredCities] = useState([]); // State to hold filtered city names
  const apiKey = process.env.REACT_APP_API_KEY;

  const sendToApp = (selectedCity) => {
    // make selected city first character to upper case because city names in cities-list are in title case

    if (
      !selectedCity ||
      !cityNames.some(
        (city) => city.toLowerCase() === selectedCity.toLowerCase()
      )
    ) {
      toast.error("City not found. Please select a valid city."); // Show error toast if city not found
      return;
    }
    props.sendToApp(selectedCity || city);
    setCity("");
    setFilteredCities([]); // Clear suggestions after selecting a city
  };

  const cityNames = Object.keys(cities); // Extract city names from cities-list

  const handleCityInput = (e) => {
    const userInput = e.target.value;
    setCity(userInput);

    if (userInput.trim() === "") {
      setFilteredCities([]);
      return;
    }

    // Filter city names based on user input
    const suggestions = cityNames.filter((name) =>
      name.toLowerCase().startsWith(userInput.toLowerCase())
    );

    setFilteredCities(suggestions);
  };

  const fetchCurrentLocationData = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`
        );
        const cityName = response.data.name;
        sendToApp(cityName);
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
          onChange={handleCityInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendToApp(city);
            }
          }}
        />
        <button className={Styles.searchButton} onClick={() => sendToApp(city)}>
          Search
        </button>
        {filteredCities.length > 0 && (
          <ul className={Styles.suggestionsList}>
            {filteredCities.map((name, index) => (
              <li
                key={index}
                onClick={() => sendToApp(name)}
                className={Styles.suggestionItem}
              >
                {name}
              </li>
            ))}
          </ul>
        )}
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

      {/* ToastContainer for displaying toasts */}
      <ToastContainer />
    </div>
  );
};

export default Navbar;
