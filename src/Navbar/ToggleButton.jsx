import React, { useState } from "react";
import Styles from "./ToggleButton.module.css";

function ToggleButton() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={Styles.toggleButton}>
      <label>
        <input type="checkbox" checked={isDarkMode} onChange={toggleMode} />
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </label>
    </div>
  );
}

export default ToggleButton;
