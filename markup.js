export const createWeatherMarkup = (parentElement, weather) => {
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
    <p class="current-location-cityName">${weather.cityName}</p>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#f50000"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-heart"
    >
      <path
        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
      />
    </svg>
  </div>
  `;
  parentElement.insertAdjacentHTML("beforeend", markup);
};

export const createLocationMarkup = (parentElement, cityName) => {
  const markup = `
  <li class="location-name">
   <button type="button" class="delete-btn">
     <span class="lnr lnr-cross"></span>
   </button>
   <p class="fav-city">${cityName}</p>
  </li>
  `;
  parentElement.insertAdjacentHTML("beforeend", markup);
};
