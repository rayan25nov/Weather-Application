import { useState } from "react";
import Navbar from "./Navbar/Navbar";
import City from "./WeatherContainer/City";
import CurrentWeather from "./WeatherContainer/CurrentWeather";
import Styles from "./App.module.css";

function App() {
  const [dataFromChild, setDataFromChild] = useState("");

  // Function to receive data from the child
  const receiveDataFromChild = (childData) => {
    setDataFromChild(childData);
  };
  console.log(dataFromChild);
  return (
    <div className={Styles.container}>
      <Navbar sendDataToParent={receiveDataFromChild} />
      <div className={Styles.weatherContainer}>
        <City city={dataFromChild} />
        <CurrentWeather city={dataFromChild} />
      </div>
    </div>
  );
}

export default App;
