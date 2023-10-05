import { useEffect, useState } from "react";
import axios from "axios";
import Styles from "./City.module.css";

const City = () => {
  const [timezone, setTimezone] = useState(null);
  const [cityName, setCityName] = useState("");
  const city = "kolkata";
  const key = "33bd0feecf4efe92b32cc9fecffc8689";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
        );
        setTimezone(response.data.timezone);
        setCityName(response.data.name);
        console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once on mount

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
  if (localTime !== null) {
    console.log("Local Time in Kolkata:", localTime);
  }
  return (
    <div className={Styles.cityContainer}>
      <p>{cityName}</p>
      <h1>{localTime !== null ? localTime.toLocaleTimeString() : null}</h1>
      <p>{localTime !== null ? localTime.toLocaleDateString() : null}</p>
    </div>
  );
};

export default City;
