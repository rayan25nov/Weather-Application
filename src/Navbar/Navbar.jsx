import React from "react";
import ToggleButton from "./ToggleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationCrosshairs,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Styles from "./Navbar.module.css";

const Navbar = () => {
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
        />
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
