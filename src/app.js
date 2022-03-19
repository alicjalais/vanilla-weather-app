let searchInput = document.querySelector("#search-input");
let cityForm = document.querySelector("#search-form");
let mainCity = document.querySelector(".main-city");
let temperatureElement = document.querySelector(".temp-container");
let dateContainer = document.querySelector(".date-container");

function showDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[new Date().getDay()];
  let hour = new Date().getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = new Date().getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let newDate = `${day}, ${hour}:${minutes}`;

  dateContainer.innerHTML = newDate;
}
showDate();

let apiKey = "855c2de2be25508191312e2bfc361fa5";
let city = "Budapest";

async function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  let response = await axios.get(apiUrl);

  console.log(response);
}
function searchCity(event) {
  //event.preventDefault();
  console.log(event);
  searchCity(searchInput.value);
}
cityForm.addEventListener("submit", searchCity);
