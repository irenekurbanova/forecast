import { weatherUI, locationList, errorContainer } from "./DOMelements.js";

export const createMarkup = (
  parentElement,
  weather,
  cityName,
  errorMessage,
  favoriteLocations
) => {
  let markup = "";

  if (parentElement === weatherUI) {
    markup = `
      <div class="tabs-container">
            <input type="radio" id="tab_01" name="tabs" class="input" checked />
            <label for="tab_01" class="label">Now</label>
            <input type="radio" id="tab_02" name="tabs" class="input" />
            <label for="tab_02" class="label">Details</label>
            <input type="radio" id="tab_03" name="tabs" class="input" />
            <label for="tab_03" class="label">Forecast</label>
            <div id="tab-now" class="tab-item">
              <span class="current-location-degrees">${weather.temp}&deg;</span>
              <img
                class="current-location-weather-icon"
                src="./assets/icons-openweathermap/${weather.icon}.svg"
                alt="${weather.description}"
              />
              <div class="current-location">
                <p class="current-location-cityName">${weather.cityName}</p>
                <button type="button" class="${
                  favoriteLocations.some(
                    (item) => item.cityName === weather.cityName
                  )
                    ? "favorite-btn liked"
                    : "favorite-btn"
                }"></button>
              </div>
            </div>
            <div class="tab-item" id="tab-details">
              <div class="weather-details">
                <p>Feels like: ${weather.feelsLike}</p>
                <p>Sunrise: ${weather.sunrise}</p>
                <p>Sunset: ${weather.sunset}</p>
              </div>
            </div>
            <div class="tab-item" id="tab-forecast">
              <div class="hourly-forecast">
                <div class="hourly-forecast-time">${
                  weather.morningForecast.dateTime
                }</div>
                <div class="hourly-forecast-details">
                  <div class="hourly-forecast-temp">
                    <div class="time">Temperature: ${
                      weather.morningForecast.temp
                    }</div>
                    <div class="time">Feels like: ${
                      weather.morningForecast.feelsLike
                    }</div>
                  </div>
                  <img
                    class="hourly-forecast-icon"
                    src="./assets/icons-openweathermap/${
                      weather.morningForecast.icon
                    }.svg"
                    alt="${weather.morningForecast.description}"
                    width="48px"
                    height="48px"
                  />
                </div>
              </div>
              <div class="hourly-forecast">
                <div class="hourly-forecast-time">${
                  weather.dayForecast.dateTime
                }</div>
                <div class="hourly-forecast-details">
                  <div class="hourly-forecast-temp">
                    <div class="time">Temperature: ${
                      weather.dayForecast.temp
                    }</div>
                    <div class="time">Feels like: ${
                      weather.dayForecast.feelsLike
                    }</div>
                  </div>
                  <img
                    class="hourly-forecast-icon"
                    src="./assets/icons-openweathermap/${
                      weather.dayForecast.icon
                    }.svg"
                    alt="${weather.dayForecast.description}"
                    width="48px"
                    height="48px"
                  />
                </div>
              </div>
              <div class="hourly-forecast">
                <div class="hourly-forecast-time">${
                  weather.eveningForecast.dateTime
                }</div>
                <div class="hourly-forecast-details">
                  <div class="hourly-forecast-temp">
                    <div class="time">Temperature: ${
                      weather.eveningForecast.temp
                    }</div>
                    <div class="time">Feels like: ${
                      weather.eveningForecast.feelsLike
                    }</div>
                  </div>
                  <img
                    class="hourly-forecast-icon"
                    src="./assets/icons-openweathermap/${
                      weather.eveningForecast.icon
                    }.svg"
                    alt="${weather.eveningForecast.description}"
                    width="48px"
                    height="48px"
                  />
                </div>
              </div>
            </div>
          </div>
      `;
  }

  if (parentElement === locationList) {
    markup = `
  <li class="location-name">
    <span class="lnr lnr-cross"></span>
    <p class="fav-city">${cityName}</p>
  </li>
  `;
  }

  if (parentElement === errorContainer) {
    markup = `
    <p>${errorMessage}</p>
    `;
  }

  parentElement.insertAdjacentHTML("beforeend", markup);
};
