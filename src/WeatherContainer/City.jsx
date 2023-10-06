import { useEffect, useState } from "react";
import axios from "axios";
import Styles from "./City.module.css";

const City = (props) => {
  const [timezone, setTimezone] = useState(null);
  const [cityName, setCityName] = useState("");
  const city = props.city ? props.city : "kolkata";
  const apiKey = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        setTimezone(response.data.timezone);
        setCityName(response.data.name);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [city]); // Empty dependency array to run once on mount

  const calculateLocalTime = () => {
    if (timezone !== null) {
      const utcTime = new Date();
      const offset = utcTime.getTimezoneOffset() * 60000;
      const localTime = utcTime.getTime() + offset + timezone * 1000;
      const localDate = new Date(localTime);
      return localDate;
    }
    return null;
  };

  const localTime = calculateLocalTime();
  return (
    <div className={Styles.cityContainer}>
      <p>{cityName}</p>
      <h1>
        {localTime !== null
          ? localTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true, // Use 12-hour format with AM/PM
            })
          : null}
      </h1>
      <p>{localTime !== null ? localTime.toLocaleDateString() : null}</p>
    </div>
  );
};

export default City;
