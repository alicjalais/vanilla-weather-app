let searchInput = document.querySelector("#search-input");
let cityForm = document.querySelector("#search-form");
let mainCity = document.querySelector(".main-city");
let temperatureElement = document.querySelector(".temp-container");
let dateContainer = document.querySelector(".date-container");
let searchButton = document.querySelector(".btn-outline-success");
let descContainer = document.querySelector(".weather-desc");
let weatherContainer = document.querySelector(".weather-forecast.row");
let apiKey = "855c2de2be25508191312e2bfc361fa5";

document
  .querySelector(".switch input")
  .addEventListener("change", function (e) {
    if (e.target.checked) {
      document.getElementById("temp-unit-switch").innerText = "°F";
      localStorage.setItem("temp", "°F");
    } else {
      document.getElementById("temp-unit-switch").innerText = "°C";
      localStorage.setItem("temp", "°C");
    }
  });

if (localStorage.getItem("temp") !== null) {
  document.getElementById("temp-unit-switch").innerText =
    localStorage.getItem("temp");
  if (localStorage.getItem("temp") === "°F") {
    document.querySelector(".switch input").checked = true;
  }
} else {
  document.getElementById("temp-unit-switch").innerText = "°C";
  localStorage.setItem("temp", "°C");
}

async function showDate() {
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
  let apiLink = `https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=${apiKey}&units=${
    localStorage.getItem("temp") === "°C" || !localStorage.getItem("temp")
      ? "metric"
      : "imperial"
  }`;
  let valasz = await axios.get(apiLink);

  for (let index = 0; index < valasz.data.list.length; index += 8) {
    let dayIndex = new Date(valasz.data.list[index].dt_txt).getDay();
    weatherContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="col">
        <span class="forecast-day">${days[dayIndex]}</span>
        <span class="icon"><img src="http://openweathermap.org/img/wn/${
          valasz.data.list[index].weather[0].icon
        }@2x.png" alt=""></span>
        <span class="temperature">
        ${
          Math.round(valasz.data.list[index].main.temp) +
          " " +
          localStorage.getItem("temp")
        }
        
        </span>
      </div>
        `
    );
    //console.log(new Date(valasz.data.list[index].dt_txt).getDay());
  }
  console.log(valasz);
}
showDate();

let city = "Budapest";

async function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${
    localStorage.getItem("temp") === "°C" || !localStorage.getItem("temp")
      ? "metric"
      : "imperial"
  }&appid=${apiKey}`;
  let response = await axios.get(apiUrl);

  //console.dir(response.data);
  /*descContainer.innerHTML = response.data.weather[0].description;*/
  let icon = "";
  switch (response.data.weather[0].description) {
    case "light rain":
      icon = "wi-day-rain.svg";

      break;

    default:
      icon = "";
      break;
  }
  //console.log(icon);
  /*descContainer.innerHTML = ` <img src="../weather-icons-master/svg/${icon}" alt="">`;*/
  descContainer.innerHTML = ` <img src="http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" alt="">`;
  document.getElementById("city").innerText = response.data.name;
  //console.log(temperatureElement);
  temperatureElement.innerHTML =
    Math.round(response.data.main.temp) + " " + localStorage.getItem("temp");
}
/*function searchCity(event) {
  event.preventDefault();

  searchCity(searchInput.value);
}*/
cityForm.addEventListener("submit", function (event) {
  event.preventDefault();

  searchCity(searchInput.value);
});

fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=budapest&units=${
    localStorage.getItem("temp") === "°C" || !localStorage.getItem("temp")
      ? "metric"
      : "imperial"
  }&appid=${apiKey}`
)
  .then((response) => response.json())
  .then(
    (data) =>
      (temperatureElement.innerHTML =
        Math.round(data.main.temp) + " " + localStorage.getItem("temp"))
  );
