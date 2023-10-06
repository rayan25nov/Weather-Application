import Navbar from "./Navbar/Navbar";
import City from "./WeatherContainer/City";
import CurrentWeather from "./WeatherContainer/CurrentWeather";
import Styles from "./App.module.css";

function App() {
  return (
    <div>
      <Navbar />
      <div className={Styles.weatherContainer}>
        <City />
        <CurrentWeather />
      </div>
    </div>
  );
}

export default App;
