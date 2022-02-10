function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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
  return `${day} ${date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })}`;
}
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Fri", "Sat", "Sun", "Mon", "Tues"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col">
            <div class="weather-forecast-day">${day}</div>
            <img
              src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
              alt="partly cloudy"
            />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max">33°</span>
              <span class="weather-forecast-temperature-min">20°</span>
            </div>
          </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayWeatherConditions(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;

  fahrenheitTemperature = response.data.main.temp;

  document.querySelector("#temperature-value").innerHTML = Math.round(
    fahrenheitTemperature
  );

  document.querySelector("#humidity-value").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind-value").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feels-like-value").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector(".dayTime").innerHTML = formatDate(
    response.data.dt * 1000
  );
  let iconElement = document
    .querySelector("#main-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function searchCity(city) {
  let apiKey = "124f39a2ff23ede6ec7ae29df4cc507f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherConditions);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "124f39a2ff23ede6ec7ae29df4cc507f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherConditions);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector(".btn-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  let temperatureElement = document.querySelector("#temperature-value");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-value");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

displayForecast();

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

searchCity("Cleveland");
