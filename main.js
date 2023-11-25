import { createLocationMarkup, createWeatherMarkup } from "./markup.js";

const serverUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "63a7e2a14a9ec168471f7c2d8cd6e676";

const form = document.querySelector("form");
const input = document.querySelector("input");
const weatherUI = document.querySelector(".weather");
const locationList = document.querySelector(".locations-list");

const favoriteLocations = [];

const handleFormSubmit = async (event) => {
  event.preventDefault();
  const initialInput = "";

  const cityName = input.value;

  const data = await fetchData(cityName);
  input.value = initialInput;
  reRenderUI(weatherUI, createWeatherObject(data));
};

const reRenderUI = (parentElement, weather) => {
  deleteParentNodes(parentElement);
  createWeatherMarkup(parentElement, weather);
};

const deleteParentNodes = (parentElement) => {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.lastChild);
  }
};

const fetchData = async (cityName) => {
  try {
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) throw new Error("Something went wrong");

    return data;
  } catch (error) {
    alert(error);
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

const handleAddFavorite = (event) => {
  if (!event.target.parentElement.classList.contains("lucide-heart")) return;

  const favoriteBtn = document.querySelector(".lucide-heart");
  const currentLocationName = document.querySelector(
    ".current-location-cityName"
  );

  favoriteBtn.classList.add("bounce-effect");
  favoriteBtn.classList.add("favorite");

  favoriteBtn.onanimationend = () => {
    favoriteBtn.classList.remove("bounce-effect");
  };

  const cityName = currentLocationName.textContent;
  favoriteLocations.push({ cityName, favorite: true });
  deleteParentNodes(locationList);
  favoriteLocations.map((item) =>
    createLocationMarkup(locationList, item.cityName)
  );
};

const handleDeleteLocation = (event) => {
  const favName = event.target.nextElementSibling.textContent;

  console.log(favName);
  favoriteLocations.splice(
    favoriteLocations.findIndex((item) => item.cityName === favName),
    1
  );
  console.log(favoriteLocations);
  deleteParentNodes(locationList);
  favoriteLocations.map((item) =>
    createLocationMarkup(locationList, item.cityName)
  );
  console.log(favoriteLocations);
};

const showFavoritesWeather = async (event) => {
  const cityName = event.target.textContent;

  const data = await fetchData(cityName);
  reRenderUI(weatherUI, createWeatherObject(data));
};

form.addEventListener("submit", handleFormSubmit);
weatherUI.addEventListener("click", handleAddFavorite);
locationList.addEventListener("click", (event) => {
  if (event.target.classList.contains("fav-city")) showFavoritesWeather(event);
  if (event.target.classList.contains("lnr")) handleDeleteLocation(event);
});
