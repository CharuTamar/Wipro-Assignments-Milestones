import { useState, useEffect } from "react";
// import { fetchWeatherData } from "./services/fetchapi";
import { fetchWeatherData } from "./services/axiosapi";

function App() {
    const [weather, setWeather] = useState([]);

    useEffect(() => {
        fetchWeatherData().then((data) => setWeather(data));
    }, []);

    return (
        <div>
            <h1>Weather Forecast</h1>
            <ul>
                {weather.map((item, index) => (
                    <li key={index}>
                        {item.date} - {item.summary} ({item.temperatureC}°C)
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;