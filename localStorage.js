export const addToStorage = (array) => {
  localStorage.setItem(
    "favoriteCities",
    array.map((item) => item.cityName)
  );
};

export const setCurrentCity = (cityName) => {
  localStorage.setItem("currentCity", cityName);
};

export const getFavoriteLocations = () => {
  if (!localStorage.getItem("favoriteCities")) {
    return;
  }
  const favCities = localStorage.getItem("favoriteCities").split(",");
  return favCities.map((city) => {
    return {
      cityName: city,
    };
  });
};
