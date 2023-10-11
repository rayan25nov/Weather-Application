import React from "react";
import Styles from "./ToggleButton.module.css";

function ToggleButton({ isDarkMode, setIsDarkMode }) {
  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${Styles.toggleButton} ${isDarkMode ? Styles.dark : ""}`}>
      <label>
        <input type="checkbox" checked={isDarkMode} onChange={toggleMode} />
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </label>
    </div>
  );
}

export default ToggleButton;
