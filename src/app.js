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
/*async function searchCity(city) {
    let apiUrl = 
}*/
