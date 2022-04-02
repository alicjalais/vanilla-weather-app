let searchInput = document.querySelector("#search-input");
let cityForm = document.querySelector("#search-form");
let mainCity = document.querySelector(".main-city");
let temperatureElement = document.querySelector(".temp-container");
let dateContainer = document.querySelector(".date-container");
let searchButton = document.querySelector(".btn-outline-success");
let descContainer = document.querySelector(".weather-desc");
let testContainer = document.querySelector(".test");
let apiKey = "855c2de2be25508191312e2bfc361fa5";

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
  let apiLink = `https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=${apiKey}`;
  let valasz = await axios.get(apiLink);

  for (let index = 0; index < valasz.data.list.length; index += 8) {
    let dayIndex = new Date(valasz.data.list[index].dt_txt).getDay();
    testContainer.insertAdjacentHTML(
      "beforeend",
      `
        <div class="col">${days[dayIndex]}</div>
        `
    );
    console.log(new Date(valasz.data.list[index].dt_txt).getDay());
  }
  console.log(valasz);
}
showDate();

let city = "Budapest";

async function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  let response = await axios.get(apiUrl);

  console.dir(response.data);
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
  console.log(icon);
  /*descContainer.innerHTML = ` <img src="../weather-icons-master/svg/${icon}" alt="">`;*/
  descContainer.innerHTML = ` <img src="http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" alt="">`;
}
/*function searchCity(event) {
  event.preventDefault();

  searchCity(searchInput.value);
}*/
cityForm.addEventListener("submit", function (event) {
  event.preventDefault();

  searchCity(searchInput.value);
});
