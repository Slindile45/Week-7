function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let dateTimeElement = document.querySelector("#date-time");
  let date = new Date(response.data.time * 1000);
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" alt="">`;
  cityElement.innerHTML = response.data.city;
  dateTimeElement.innerHTML = formateDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
}

function searchCity(city) {
  let apiKey = "33949tfa196efed4510bo9b38e1b5809";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function formateDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function displayForecast() {
    let forecast = document.querySelector("#forecast");

    let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
    let forecastHtml = "";

    days.forEach(function (day) {
        forecastHtml = forecastHtml + 
        `<div class="weather-forecast-day">
                    <div class="weather-forecast-date">${day}</div>
                    <div class="weather-forecast-icon">🌞</div>
                    <div class="weather-forecast-temperatures">
                        <div class="weather-forecast-temperature">
                        <strong>28°c</strong>
                    </div>
                    <div class="weather-forecast-temperature">14°c</div>
                </div>
                </div>`;

    });

    forecastElement.innerHTML = forecastHtml;

}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

displayForecast();