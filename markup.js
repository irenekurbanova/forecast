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
              <div>
              <span class="current-location-degrees">${weather.temp}&deg;</span>
              <p>${weather.dateTime}</p>
              </div>
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
                <p class="weather-details-city">${weather.cityName}</p>
                <p>Feels like: ${weather.feelsLike}&deg;</p>
                <p>Humidity level: ${weather.humidity}%</p>
                <p>Sunrise: ${weather.sunrise}</p>
                <p>Sunset: ${weather.sunset}</p>
              </div>
            </div>
            <div class="tab-item" id="tab-forecast">
              <p class="tab-item-city">${weather.cityName}</p>
              <div class="hourly-forecast">
                <div class="hourly-forecast-time">
                <p>${weather.firstTimeStampForecast.dateTime}</p>
                <p></p>
                </div>
                <div class="hourly-forecast-details">
                  <div class="hourly-forecast-temp">
                    <div class="time">Temperature: ${
                      weather.firstTimeStampForecast.temp
                    }&deg;</div>
                    <div class="time">Feels like: ${
                      weather.firstTimeStampForecast.feelsLike
                    }&deg;</div>
                  </div>
                  <img
                    class="hourly-forecast-icon"
                    src="./assets/icons-openweathermap/${
                      weather.firstTimeStampForecast.icon
                    }.svg"
                    alt="${weather.firstTimeStampForecast.description}"
                    width="48px"
                    height="48px"
                  />
                </div>
              </div>
              <div class="hourly-forecast">
                <div class="hourly-forecast-time">${
                  weather.secondTimeStampForecast.dateTime
                }</div>
                <div class="hourly-forecast-details">
                  <div class="hourly-forecast-temp">
                    <div class="time">Temperature: ${
                      weather.secondTimeStampForecast.temp
                    }&deg;</div>
                    <div class="time">Feels like: ${
                      weather.secondTimeStampForecast.feelsLike
                    }&deg;</div>
                  </div>
                  <img
                    class="hourly-forecast-icon"
                    src="./assets/icons-openweathermap/${
                      weather.secondTimeStampForecast.icon
                    }.svg"
                    alt="${weather.secondTimeStampForecast.description}"
                    width="48px"
                    height="48px"
                  />
                </div>
              </div>
              <div class="hourly-forecast">
                <div class="hourly-forecast-time">${
                  weather.thirdTimeStampForecast.dateTime
                }</div>
                <div class="hourly-forecast-details">
                  <div class="hourly-forecast-temp">
                    <div class="time">Temperature: ${
                      weather.thirdTimeStampForecast.temp
                    }&deg;</div>
                    <div class="time">Feels like: ${
                      weather.thirdTimeStampForecast.feelsLike
                    }&deg;</div>
                  </div>
                  <img
                    class="hourly-forecast-icon"
                    src="./assets/icons-openweathermap/${
                      weather.thirdTimeStampForecast.icon
                    }.svg"
                    alt="${weather.thirdTimeStampForecast.description}"
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
