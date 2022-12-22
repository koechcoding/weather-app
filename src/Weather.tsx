import React from "react";
import axios from "axios";
import WeatherForm from "./WeatherForm";
import WeatherData from "./WeatherData";
import debounce from "lodash.debounce";

const API_KEY = process.env.API_KEY;
const API_ENDPOINT = `https://api.openweather?appid=${API_KEY}`;

const Weather: React.FC =()=>{
    const [city, setCity] = React.useState("");
    const [temperature, setTemperature] = React.useState(0);
    const [description, setDescription] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const fetchWeatherData = useCallback(async (city: string) =>{
        setLoading(true);
        try{
            const response = await axios.get(`${API_ENDPOINT}&q=${city}`);
            const data = response.data;
            const { main, weather } = data;
            setCity(city);
            setTemperature(main.temp);
            setDescription(weather[0].description);
        } catch(err){
            setError(err.message);
        }
        setLoading(false);
    }, []);

    const debouncedFetchWeatherData = useMemo(()=> debounce(fetchWeatherData, 500), [
        fetchWeatherData,
    ]);

    return (
        <div>
            <h1>Weather App</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <WeatherForm onSubmit={debouncedFetchWeatherData} />
            {city && <WeatherData city={city} temperature={temperature} description={description} />}
        </div>
    );
};

export default Weather;