let now = new Date();
let dayTime = document.querySelector(".dayTime");
let hours = now.getHours();
let minutes = now.getMinutes();
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
let day = days[now.getDay()];
dayTime.innerHTML = `${day} ${now.toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
})}`;
let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function displayWeatherConditions(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector("#temperature-value").innerHTML = Math.round(
    response.data.main.temp
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

searchCity("Cleveland");
