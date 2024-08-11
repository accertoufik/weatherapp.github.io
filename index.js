let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_datetime");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

//the additional info sections
let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");

const getCountryName = (code) => {
  return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
};

//date and time format options

const getDateTime = (dt) => {
    const curDate = new Date(dt * 1000);

    const options = {
        weekday : "long",
        year : "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    }

    const formatter = new Intl.DateTimeFormat('en-US', options);

    //console.log(formatter);
    

    return formatter.format(curDate);
    

}

let city = "kolkata";

//search functionality
citySearch.addEventListener('submit', (e) => {
    e.preventDefault();

    let cityName = document.querySelector(".city_name");
    // console.log(cityName.value);
    
    city = cityName.value;
    getWeatherData();
    cityName.value = "";
})



const getWeatherData = async () => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=eb55bbba02d13ab8ad2d54e0df1fc7a3`;
  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();
    // console.log(data);

    const { main, name, weather, wind, sys, dt } = data;

    //city name setter
    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;

    //date and time setter
    dateTime.innerHTML = getDateTime(dt);

    //weather forecast setter
    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src = "http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`

    w_temperature.innerHTML = `${Math.floor(main.temp-273.15)}&#176C`;
    w_maxTem.innerHTML = `max: ${Math.floor(main.temp_max-273.15)}&#176C`;
    w_minTem.innerHTML = `min: ${Math.floor(main.temp_min-273.15)}&#176C`;
    
    //additional info starts here

    w_feelsLike.innerHTML = `${Math.floor(main.feels_like-273.15)}&#176C`;
    w_humidity.innerHTML = `${main.humidity}%`;
    w_pressure.innerHTML = `${main.pressure}hpa`;
    w_wind.innerHTML = `${wind.speed} kmph`;

    
  } catch (error) {
    console.log(error);
  }
};

document.body.addEventListener("load", 
    getWeatherData());



