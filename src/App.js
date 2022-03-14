import './App.css';
import React, { useEffect, useState } from "react";
import Weather from './components/weather';

export default function App() {

  const [apiGeo, setApiGeo] = useState({});
  const [apiWeather, setApiWeather] = useState({});
  const [apiPolution, setApiPolution] = useState({});
  const [getState, setGetState] = useState('hanoi');
  const [state, setState] = useState('hanoi');
  const apiGeocodingURL = `${process.env.REACT_APP_API_URL}/geo/1.0/direct?q=${state}&appid=${process.env.REACT_APP_API_KEY}`;
  let apiOneTimeURL = '';
  let apiAirPolutionURL = '';

  useEffect(() => {
    fetch(apiGeocodingURL)
      .then((res) => res.json())
      .then((data) => {
        if(data) {
          setApiGeo(data);
          apiOneTimeURL = `${process.env.REACT_APP_API_URL}/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&appid=${process.env.REACT_APP_API_KEY}`;
          apiAirPolutionURL = `${process.env.REACT_APP_API_URL}/data/2.5/air_pollution?lat=${data[0].lat}&lon=${data[0].lon}&appid=${process.env.REACT_APP_API_KEY}`;
          return fetch(apiOneTimeURL);
        }
      })
      .then((res) => res.json())
      .then((data) => {
        if(data) {
          setApiWeather(data);
          return fetch(apiAirPolutionURL);
        }
      })
      .then((res) => res.json())
      .then((data) => {
        if(data) setApiPolution(data);
      })
      .catch(err => {
        console.error('Request failed', err)
      });
  }, [apiGeocodingURL]);

  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setState(getState);
    return false;
  };
  
  return (
    <div className="container">
      <div id="searchbox" className="mt-3 mx-auto" style={{ width: '60vw' }}>
      <form onSubmit={submitHandler}>
      <input
        type="search"
        id="location-name"
        className="form-control"
        onChange={inputHandler}
        value={getState}
      />
      </form>
      </div>
      <div id="weather-module" className="card mt-3 mx-auto" style={{ width: '60vw' }}>
        {(typeof apiGeo[0] != 'undefined' && typeof apiWeather.current != 'undefined' && typeof apiPolution.list != 'undefined') ? (
          <Weather geoData={apiGeo} weatherData={apiWeather} polutionData={apiPolution}/>
        ): (
          <div className='text-center'>
            <svg className="m-5" width="152" height="106" viewBox="0 0 152 106" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M57.4366 29.248C59.5542 25.8004 61.3107 22.1306 63.7895 19.041C75.9275 3.91725 91.7451 -2.42856 110.687 1.96659C129.628 6.36174 141.226 18.8743 145.514 37.9087C147.057 44.81 146.628 51.7114 144.761 58.514C144.473 59.5572 144.578 60.2918 145.258 61.1715C151.629 69.4525 153.228 78.5946 149.295 88.3016C145.443 97.8049 138.102 103.286 128.017 105.055C126.643 105.266 125.254 105.36 123.865 105.336C91.9663 105.348 60.0677 105.348 28.1691 105.336C15.0526 105.32 4.28215 96.6721 1.31249 83.9126C-1.74669 70.7457 5.98613 56.9214 18.8896 52.591C20.0966 52.1867 20.6554 51.7052 20.8499 50.3317C22.9212 35.9086 37.1768 25.5319 51.596 27.9085C53.6211 28.2418 55.5967 28.819 57.4366 29.248ZM75.8256 97.9345C91.7728 97.9345 107.72 97.9932 123.674 97.9129C132.388 97.8697 138.735 93.7925 142.325 85.8756C145.684 78.4527 143.949 70.221 137.979 64.1592C136.435 62.5851 136.188 60.9492 136.886 58.9615C139.448 51.6682 139.825 44.2205 137.688 36.816C133.53 22.4207 124.174 12.8773 109.619 9.28464C94.9771 5.67037 82.2959 9.92046 71.8959 20.8065C67.9662 24.9208 65.299 29.819 63.5858 35.245C62.9159 37.3685 61.6503 38.5321 59.9308 38.4025C58.9584 38.3253 57.9613 37.8685 57.0816 37.3901C44.1688 30.3962 28.1907 39.5198 27.8758 54.0942C27.8048 57.3134 27.0176 58.2455 23.8628 58.8659C13.1356 60.9708 6.1127 71.8291 8.58844 82.4496C10.7493 91.7091 18.5933 97.916 28.3049 97.9376C44.1348 97.9623 59.9802 97.9345 75.8256 97.9345Z" fill="#555555"/>
            <path d="M86.2379 60.0943C91.5166 55.4645 96.6533 50.9521 101.805 46.4551C103.256 45.1866 104.729 44.9921 106.204 45.7884C107.553 46.5199 108.458 48.0261 108.057 49.5169C107.769 50.5378 107.205 51.4596 106.427 52.1805C101.843 56.3133 97.1658 60.3535 92.5353 64.4277C92.0784 64.8258 91.6401 65.2456 91.1493 65.6993C95.7797 70.9679 100.321 76.1378 104.846 81.3261C106.081 82.7367 106.223 84.2861 105.377 85.7398C104.605 87.067 103.062 87.9281 101.589 87.4868C100.579 87.157 99.673 86.5698 98.9593 85.783C94.9678 81.3508 91.0628 76.8322 87.1269 72.3538C86.6238 71.7797 86.1082 71.2179 85.5371 70.579L72.2416 82.2367C71.4699 82.9157 70.6981 83.6071 69.9202 84.2676C68.1236 85.7707 65.9843 85.6812 64.5582 84.0608C63.132 82.4404 63.3234 80.2366 65.0397 78.7088C69.6979 74.5853 74.3901 70.4957 79.07 66.3938C79.567 65.9555 80.0547 65.511 80.6412 64.9863L73.3838 56.7053C71.2816 54.3071 69.167 51.9213 67.0802 49.5107C65.4503 47.6311 65.4842 45.5199 67.1296 44.0322C68.7749 42.5445 71.0253 42.7976 72.6861 44.6896C76.4913 49.0107 80.2924 53.339 84.0894 57.6745C84.7716 58.443 85.4538 59.2084 86.2379 60.0943Z" fill="#555555"/>
            </svg>
            <p className="mb-5">We could not find weather information for the location above</p>
          </div>
        )}
      </div>
    </div>
  );
}