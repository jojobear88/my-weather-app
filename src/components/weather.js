import React from "react";
import './styles.css';
import $ from 'jquery';

const kelvinToFarenheit = (k) => {
  return (k - 273.15).toFixed(0);
};

const degToCompass = (num) => {
  let val = Math.floor((num / 22.5) + 0.5);
  let arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return arr[(val % 16)];
}

const polutionText = (aqi) => {
  let arr = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
  return arr[aqi-1];
}

const timestampToDay = (dt) => {
  let date = new Date(dt * 1000);
  let day = date.getDay();
  let arr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return arr[day];
}

const CardExampleCard = ({geoData, weatherData, polutionData}) => (
  <div class="card-body">
  <p className="h2">
    <strong>{geoData[0].name}, {geoData[0].country}</strong>
  </p>
  <p className='h5 text-capitalize'>{timestampToDay(weatherData.current.dt)} 9AM . {weatherData.current.weather[0].description}</p>
  <div class="row">
    <div className='col-6'>
      <div className='d-flex align-items-center'>
        <img
          src={`http://openweathermap.org/img/w/${weatherData.current.weather[0].icon}.png`}
          alt="weather status icon"
          className="weather-icon mr-2"
        />

        <p className="weather-temp mr-2">
          <span className="kelvin">{kelvinToFarenheit(weatherData.current.temp)}</span>
          <span className='d-none farenheit'>{weatherData.current.temp}</span>
          <span>&deg;</span>
        </p>

        <div className='weather-symbol mb-4'>
          <span id="btnFarenheit" className='inactive' onClick={function() {
            $("#btnFarenheit").removeClass('inactive');
            $("#btnKelvin").addClass("inactive");
            $(".farenheit").removeClass("d-none");
            $(".kelvin").addClass("d-none");
          }}>F</span>
          <span> / </span>
          <span id="btnKelvin" onClick={function() {
            $("#btnKelvin").removeClass('inactive');
            $("#btnFarenheit").addClass("inactive");
            $(".kelvin").removeClass("d-none");
            $(".farenheit").addClass("d-none");
          }}>C</span>
        </div>
      </div>
    </div>
    <div className='col-6'>
      <p className="m-0">Humidity: {weatherData.current.humidity}%</p>
      <p className="m-0">Wind: {weatherData.current.wind_speed} KPH {degToCompass(weatherData.current.wind_deg)}</p>
      <p className="m-0">Air Quality: {polutionText(polutionData.list[0].main.aqi)}</p>
    </div>
  </div>
  <div className="row">
    {weatherData.daily.map((historyData) => 
    <div className="history-col text-center">
      <p className="history-date mt-3">{timestampToDay(historyData.dt)}</p>
      <img
        src={`http://openweathermap.org/img/w/${historyData.weather[0].icon}.png`}
        alt="weather status icon"
        className="weather-sm-icon mr-2"
      />
      <p className="history-temp-max kelvin">{kelvinToFarenheit(historyData.temp.max)}&deg;</p>
      <p className="history-temp-min kelvin">{kelvinToFarenheit(historyData.temp.min)}&deg;</p>
      <p className="history-temp-max d-none farenheit">{historyData.temp.max}&deg;</p>
      <p className="history-temp-min d-none farenheit">{historyData.temp.min}&deg;</p>
    </div>
    )}
  </div>
  </div>
)

export default CardExampleCard;