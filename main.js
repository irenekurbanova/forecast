const serverUrl = "https://api.openweathermap.org/data/2.5/weather";
const cityName = "boston";
const apiKey = "63a7e2a14a9ec168471f7c2d8cd6e676";

const form = document.querySelector("form");
const input = document.querySelector("input");
const weatherUI = document.querySelector(".weather");

const handleFormSubmit = async (event) => {
  event.preventDefault();

  const cityName = input.value;
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

  const data = await getJSON(url);
  // const weather = createWeatherObject(data);
  // reRenderUI(weatherUI, weather);

  return new Promise(() => {
    setTimeout(() => {
      const weather = createWeatherObject(data);
      reRenderUI(weatherUI, weather);
    }, 10);
  });
};

const reRenderUI = (parentElement, weather) => {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.lastChild);
  }

  const markup = `
  <div class="weather-degrees"><span>${Math.round(
    weather.temp
  )}&deg;</span></div>
  <img
    class="weather-icon"
    src="./assets/icons-openweathermap/${weather.icon}.svg"
    alt="${weather.description}"
    width="150px"
    height="150px"
  />
  <div class="current-location">
    <p>${weather.cityName}</p>
    <img src="./assets/icon-heart.svg" alt="heart-icon" />
  </div>
  `;

  parentElement.insertAdjacentHTML("beforeend", markup);
};

const getJSON = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) throw new Error("Something went wrong");

    return data;
  } catch (error) {
    alert(error);
    console.log(error);
  }
};

const createWeatherObject = function (data) {
  const weather = data;
  return {
    cityName: weather.name,
    temp: weather.main.temp,
    icon: weather.weather[0].icon,
    description: weather.weather[0].description,
  };
};

form.addEventListener("submit", handleFormSubmit);
