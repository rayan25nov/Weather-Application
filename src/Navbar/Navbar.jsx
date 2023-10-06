import React, { useState } from "react";
import ToggleButton from "./ToggleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationCrosshairs,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Styles from "./Navbar.module.css";

const Navbar = (props) => {
  const [city, setCity] = useState("");
  const sendDataToParent = () => {
    // Call the function passed as a prop to send data to the parent
    props.sendDataToParent(city);
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
          className={Styles.searchInput}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // Prevent the default behavior of the Enter key (e.g., form submission)
              e.preventDefault();
              // Call the function to send data when Enter is pressed
              sendDataToParent();
            }
          }}
        />
        <button className={Styles.searchButton} onClick={sendDataToParent}>
          Search
        </button>
      </div>
      <div className={Styles.locationContainer}>
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
