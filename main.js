import { createMarkup } from "./markup.js";
import {
  createWeatherObject,
  deleteFavoriteLocation,
  deleteParentNodes,
  checkIfValid,
} from "./helpers.js";
import {
  weatherUI,
  locationList,
  form,
  input,
  errorContainer,
} from "./DOMelements.js";
import {
  addToStorage,
  setCurrentCity,
  getFavoriteLocations,
} from "./localStorage.js";
import { fetchData } from "./API.js";

const favoriteLocations = getFavoriteLocations() ?? [];

const initialInput = "";

const handleFormSubmit = async (event) => {
  event.preventDefault();

  const cityName = input.value.trim();

  try {
    if (checkIfValid(cityName))
      throw new Error("Input field should not be empty");

    const data = await fetchData(cityName);

    reRenderUI(weatherUI, createWeatherObject(data));

    input.value = initialInput;
  } catch (error) {
    deleteParentNodes(errorContainer);
    createMarkup(errorContainer, null, null, error.message);
  }
};

const handleAddFavorite = (event) => {
  if (!event.target.classList.contains("favorite-btn")) return;
  const favoriteBtn = document.querySelector(".favorite-btn");

  const currentLocationName = document.querySelector(
    ".current-location-cityName"
  );

  const cityName = currentLocationName.textContent;

  favoriteBtn.classList.add("bounce-effect");
  if (favoriteBtn.classList.contains("liked")) {
    favoriteBtn.classList.remove("liked");
    deleteFavoriteLocation(favoriteLocations, cityName);
    addToStorage(favoriteLocations);
    deleteParentNodes(locationList);
    favoriteLocations.map((item) =>
      createMarkup(locationList, null, item.cityName)
    );
  } else {
    favoriteBtn.classList.add("liked");
    favoriteLocations.push({ cityName });
    addToStorage(favoriteLocations);
    deleteParentNodes(locationList);
    favoriteLocations.map((item) =>
      createMarkup(locationList, null, item.cityName)
    );
  }

  favoriteBtn.onanimationend = () => {
    favoriteBtn.classList.remove("bounce-effect");
  };
};

const handleDeleteLocation = (event) => {
  const favName = event.target.nextElementSibling.textContent;

  deleteFavoriteLocation(favoriteLocations, favName);
  addToStorage(favoriteLocations);
  deleteParentNodes(locationList);
  favoriteLocations.map((item) =>
    createMarkup(locationList, null, item.cityName)
  );
  const favoriteBtn = document.querySelector(".favorite-btn");
  favoriteBtn.classList.remove("liked");
};

const showFavoritesWeather = (event) => {
  const cityName = event.target.textContent;

  fetchData(cityName).then((data) =>
    reRenderUI(weatherUI, createWeatherObject(data))
  );
  setCurrentCity(cityName);
};

const reRenderUI = (parentElement, weather) => {
  deleteParentNodes(parentElement);
  createMarkup(parentElement, weather, null, null, favoriteLocations);
};

window.addEventListener("DOMContentLoaded", async function (event) {
  const cityName = this.localStorage.getItem("currentCity") || "Moscow";

  const data = await fetchData(cityName);

  reRenderUI(weatherUI, createWeatherObject(data));
  favoriteLocations.map((item) =>
    createMarkup(locationList, null, item.cityName)
  );
});

form.addEventListener("submit", handleFormSubmit);
weatherUI.addEventListener("click", handleAddFavorite);
locationList.addEventListener("click", (event) => {
  if (event.target.classList.contains("fav-city")) showFavoritesWeather(event);
  if (event.target.classList.contains("lnr")) handleDeleteLocation(event);
});
