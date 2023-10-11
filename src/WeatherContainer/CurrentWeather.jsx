import React, { useEffect, useState } from "react";
import axios from "axios";
import SunriseImage from "../assets/sunrise.png";
import SunsetImage from "../assets/sunset.png";
import humidityImage from "../assets/humidity.png";
import pressureImage from "../assets/pressure.png";
import windSpeedImage from "../assets/wind-speed.png";
import VisibilityImage from "../assets/visibility.png";
import Styles from "./CurrentWeather.module.css";

const CurrentWeather = (props) => {
  const [weatherData, setWeatherData] = useState({
    temperature: "",
    feelsLike: "",
    sunrise: "",
    sunset: "",
    weatherDescription: "",
    icon: "",
    humidity: "",
    pressure: "",
    windSpeed: "",
    visibility: "",
  });
  const city = props.city;
  const apiKey = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    const fetchData = async () => {
      if (props.city || city) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${
              props.city ? props.city : city
            }&appid=${apiKey}&units=metric`
          );
          // Rest of the code to set weatherData
          setWeatherData({
            temperature: response.data.main.temp,
            feelsLike: response.data.main.feels_like,
            sunrise: response.data.sys.sunrise,
            sunset: response.data.sys.sunset,
            weatherDescription: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            humidity: response.data.main.humidity,
            pressure: response.data.main.pressure,
            windSpeed: response.data.wind.speed,
            visibility: response.data.visibility,
          });
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchData();
  }, [props.city, city]);

  const formatUnixTimestamp = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert from seconds to milliseconds

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Use 12-hour format with AM/PM
    });
  };

  const sunriseTime = formatUnixTimestamp(weatherData.sunrise);
  const sunsetTime = formatUnixTimestamp(weatherData.sunset);

  if (!weatherData.temperature) {
    return <p>Loading...</p>;
  } else {
    return (
      <div
        className={`${Styles.container} ${props.isDarkMode ? Styles.dark : ""}`}
      >
        <div className={Styles.leftSection}>
          <h2>{weatherData.temperature} &deg;C</h2>
          <p>Feels like: {weatherData.feelsLike} &deg;C</p>
          <div className={Styles.sunriseContainer}>
            <img src={SunriseImage} alt="sunrise" />
            <div className={Styles.sunrise}>
              <p>Sunrise</p>
              <p>{sunriseTime}</p>
            </div>
          </div>
          <div className={Styles.sunsetContainer}>
            <img src={SunsetImage} alt="sunset" />
            <div className={Styles.sunset}>
              <p>Sunset</p>
              <p>{sunsetTime}</p>
            </div>
          </div>
        </div>
        <div className={Styles.middleSection}>
          {weatherData.icon && (
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.icon}@4x.png`}
              alt="weather icon"
            />
          )}

          <p>{weatherData.weatherDescription.toUpperCase()}</p>
        </div>
        <div className={Styles.rightSection}>
          <div className={Styles.left}>
            <img src={humidityImage} alt="humidity icon" />
            <p>{weatherData.humidity}</p>
            <p className={Styles.firstPara}>Humidity</p>
            <img src={pressureImage} alt="pressure icon" />
            <p>{weatherData.pressure}</p>
            <p>Pressure</p>
          </div>
          <div className={Styles.right}>
            <img src={windSpeedImage} alt="wind speed icon" />
            <p>{weatherData.windSpeed}</p>
            <p className={Styles.firstPara}>Wind Speed</p>
            <img src={VisibilityImage} alt="visibiltiy" />
            <p>{weatherData.visibility}</p>
            <p>Visibility</p>
          </div>
        </div>
      </div>
    );
  }
};

export default CurrentWeather;
