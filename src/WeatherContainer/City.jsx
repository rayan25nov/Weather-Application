import { useEffect, useState } from "react";
import axios from "axios";
import Styles from "./City.module.css";

const City = (props) => {
  const [timezone, setTimezone] = useState(null);
  const city = props.city;
  const apiKey = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    const fetchData = async () => {
      if (city) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
          );
          setTimezone(response.data.timezone);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchData();
  }, [city]);

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
  if (!timezone) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className={Styles.cityContainer}>
        <p>{city}</p>
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
  }
};

export default City;
