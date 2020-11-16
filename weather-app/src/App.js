import React, { useState } from "react";

const api = {
  key: "b2fae032f63ea701ff8c1771379c3846",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  // https://rapidapi.com/blog/how-to-use-an-api-with-react/?utm_source=google&utm_medium=cpc&utm_campaign=DSA&gclid=CjwKCAiAtK79BRAIEiwA4OskBqiZms-CcbVJTNzOpvQ7vOSstiAdpnCHemwuNB5p2PP1jfWcAFmtphoChLYQAvD_BwE

  const search = (evt) => {
    if (evt.key === "Enter") {
      // https://forum.freecodecamp.org/t/api-key-not-working/45473/8
      // https://openweathermap.org/current
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
    // https://stackoverflow.com/questions/43744312/react-js-get-current-date
  };
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
    {/* <h1>WEATHER-APP</h1> */}
     
      <main>
        <h1>WeatherApp</h1>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
          
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
              {/* <h3 style={{textAlign:"center",color:"red",fontWeight:"bold",fontSize:"40px"}}>CODE NÀY RẤT NHIỀU TIỀN NÈ,LẤY HÔNG? </h3> */}
               {/* <h3 style={{color:"red"}}><i class="fas fa-heart"></i></h3> */}
                {weather.name},{weather.sys.country}
              </div>
              <div className="date">
                {dateBuilder(new Date())}
                {/* How to get datetime dd/mm/yyyy in react */}
              </div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}⁰C</div>
              <div className="weather">{weather.weather[0].main} </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
