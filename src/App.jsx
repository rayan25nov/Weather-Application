import Navbar from "./Navbar/Navbar";
import City from "./WeatherContainer/City";
import CurrentWeather from "./WeatherContainer/CurrentWeather";
import DailyForecast from "./WeatherContainer/DailyForecast";
import HourlyForecast from "./WeatherContainer/HourlyForecast";
import Styles from "./App.module.css";

function App() {
  return (
    <div>
      <Navbar />
      <div className={Styles.weatherContainer}>
        <City />
        <CurrentWeather />
        <DailyForecast />
        <HourlyForecast />
      </div>
    </div>
  );
}

export default App;
