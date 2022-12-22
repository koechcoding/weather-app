import React from "react";

interface WeatherDataProps {
    city: string;
    temperature: number;
    description: string;
}

const WeatherData: React.FC<WeatherDataProps> = ({ city, temperature, description }) => {
    return(
        <div>
            <h1>Weather in {city}:</h1>
            <p>Temperature: {temperature}</p>
            <p>Description: {description}</p>
        </div>
    );
};

export default WeatherData;