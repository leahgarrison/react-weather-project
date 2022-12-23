import React, { useEffect, useState } from "react";
import "./index.css"
import Header from "./Components/Header.js"
import InputCity from "./Components/InputCity.js"
import ShowWeather from "./Components/ShowWeather.js";
import axios from "axios";
const API_KEY = process.env.REACT_APP_WEATHER_KEY;


const App = () => {
    const [inputCity, setInputCity] = useState("Seattle");
    const [cityName, setCityName] = useState("Seattle");
    const [weatherData, setWeatherData] = useState({})
    const [country, setCountry] = useState('');
    const [error, setError] = useState({isError: false, message: ""});
    // default
    const [dynamicColor, setDynamicColor]= useState('blue')
    async function getLatAndLon() {
        try {
            const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
            const response = await axios.get(url);
            if (response.data.cod === "404") {
                setError({isError:true, message:response.data.message});
                return
            } else if (response.data.length === 0) {
                setError({isError:true, message: 'city not found, empty array returned'});
                return
            }
            
            const {lat, lon, country} = response.data[0];
            return {lat, lon, country};
        } catch (error) {
            setError({isError:true, message: `${error} error getting lat and lon`})
        }


    }

    async function getWeather(lat, lon) {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
        try {
            const weatherData = await axios.get(url);
            const data = weatherData.data
            if (data.cod === "404") {
                setError({isError: true, message: `error, web page not found`});
                return;
            } else if (data.cod === "400") {
                setError({isError: true, message: data.message})
            }
            if (!('main' in data && 'temp' in data.main)) {
                setError({isError: true, message: `error: missing temperature`});
                return;
            }
            setWeatherData(data)
            setDynamicColor(getColorCode(weatherData.data.main.temp))
        } catch(error) {
            setError({isError: true, message: `error: ${error} getting weather data in second call`})
        }
    }

    function getColorCode(temperatureFahrenheit) {
        if (temperatureFahrenheit < 50) {
            return 'blue';
        } else if (temperatureFahrenheit < 86) {
            return 'green'
        } else {
            return 'red';
        }
    }
       

    useEffect(() => {
        async function run() {
            const result = await getLatAndLon();
            if (result) {
                const {lat, lon, country} = result;
                setCountry(country)
                await getWeather(lat, lon);
               
            } else {
                setWeatherData({})
            }
        }
        run();
    }, [cityName])

    //  Input element handler
    const inputHandler = (e) => {
        setInputCity(e.target.value);
    };

    //  Search button
    const submitHandler = (e) => {
        e.preventDefault();
        setError(false);
        setCityName(inputCity);
    };

    return (
        <div className={dynamicColor} id="weather-container">
            <Header />
            <InputCity
                city={inputCity}
                onInputHandler={inputHandler}
                onSubmitHandler={submitHandler}
            />
            <ShowWeather weatherData={weatherData} country={country} errorMessage={error.message}/>
        </div>
    )
}

export default App