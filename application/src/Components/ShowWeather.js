import React from "react";
export default function ShowWeather({weatherData, country, errorMessage}) {
    if (errorMessage) {
        return (
            <div className="error showWeather">
                <div id="error">Error, try entering a valid city. error message: {errorMessage}</div>
            </div>
        )
    } else if (Object.keys(weatherData).length === 0) {
        return (
            <div className="showWeather">
                <div id="loading-weather-data">Loading</div>
            </div>
        )
    }
    const city = weatherData.name;
    const {temp, pressure, humidity} = weatherData.main;
    const cloudCoverage = weatherData.clouds.all;
    const {visibility} = weatherData;

    return (
        <section className="showWeather weather_main">
            <h2 className="weather_heading">Weather Data for {city}, {country}</h2>
            <h3 className="temp">Temperature in Farenheit: {temp} degrees</h3>
            <div className="weatherData">
                <p id="pressure">Pressure: {pressure} atm</p>
                <p>Visiblity: {visibility} km</p>
            </div>
            <div className="weatherData">
                <p>Humidity: {humidity} % </p>
                <p>Cloud Coverage: {cloudCoverage} % </p>
            </div>
        </section>
      
   
    
    )

}