import React, { useState } from 'react';
import './App.css';

function App() {

  const apiKey = '3d6b4cdcba3904c6eb8d4f3d4666f216';
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");
  //cloud with rain emoji 🌧

  const getWeather = (event) => {
    if (event.key === "Enter") {
      console.log(city)
      //fetch -requisição / then: resposta ao sucesso da requisição/ response.json transforma o tipo response
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`).then(
          response => response.json(),
        ).then (
          data => {
            setWeatherData(data)
            setCity ("")

            console.log(data)
          }
        ).catch(err => {
          console.log('TA DANDO ERRO AQUI !!!!')
        })
      }
    }


  return (
    <div className="container">
      <div className="logo-bg">
        <p className="logo">☁️</p>
      </div>
      <h1 className="title"> Weather_App </h1>

      <input 
        className="input" 
        placeholder="Digite a cidade..." 
        onChange={e => setCity(e.target.value)}
        value={city}
        onKeyPress={getWeather}
        />

        {typeof weatherData.main === 'undefined' ? (
          <div>
            <p className="welcome">Bem vindo ao Weather_App. Digite o nome de uma cidade e nós jogamos o clima :) </p>
          </div>
        ): (
          <div className="weatherData">
            <p className="city">{weatherData.name}</p>
            <p className="temp">{Math.round(weatherData.main.temp - 273)}°C</p>
            <p className="weather">{weatherData.weather[0].main}</p>
          </div>
        )}

        {weatherData.cod === "404" ? (
          <p className="notFound">Não conheço essa cidade não 🤔</p>
        ): (
          <>
          </>
        )}

    </div>
  );
}

export default App;
