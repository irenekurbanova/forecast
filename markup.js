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
            <div class="tab-item" id="tab-now">
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
              <p class="current-location-cityName">${weather.cityName}</p>
              <p>${weather.dateTime.dateMonth}, ${weather.dateTime.time}</p>
              <div class="weather-details">
                <p>Temperature: ${weather.temp}&deg;C</p>
                <p>Weather: ${weather.description}</p>
                <p>Feels like: ${weather.feelsLike}&deg;C</p>
                <p>Humidity: ${weather.humidity}&percnt;</p>
                <p>Sunrise: ${weather.sunrise.time}</p>
                <p>Sunset: ${weather.sunset.time}</p>
              </div>
            </div>
            <div class="tab-item" id="tab-forecast">
              <p class="current-location-cityName">${weather.cityName}</p>
              <div class="hourly-forecast">
                <div class="hourly-forecast-time">
                  <p>${weather.firstTimeStampForecast.dateTime.dateMonth}</p>
                  <p>${weather.firstTimeStampForecast.dateTime.time}</p>
                </div>
                <div class="hourly-forecast-details">
                  <div class="hourly-forecast-temp">
                    <div class="time">Temperature: ${
                      weather.firstTimeStampForecast.temp
                    }</div>
                    <div class="time">Feels like: ${
                      weather.firstTimeStampForecast.feelsLike
                    }</div>
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
                <div class="hourly-forecast-time"><p>${
                  weather.secondTimeStampForecast.dateTime.dateMonth
                }</p>
                <p>${weather.secondTimeStampForecast.dateTime.time}</p></div>
                <div class="hourly-forecast-details">
                  <div class="hourly-forecast-temp">
                    <div class="time">Temperature: ${
                      weather.secondTimeStampForecast.temp
                    }</div>
                    <div class="time">Feels like: ${
                      weather.secondTimeStampForecast.feelsLike
                    }</div>
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
                <div class="hourly-forecast-time"><p>${
                  weather.thirdTimeStampForecast.dateTime.dateMonth
                }</p>
                <p>${weather.thirdTimeStampForecast.dateTime.time}</p></div>
                <div class="hourly-forecast-details">
                  <div class="hourly-forecast-temp">
                    <div class="time">Temperature: ${
                      weather.thirdTimeStampForecast.temp
                    }</div>
                    <div class="time">Feels like: ${
                      weather.thirdTimeStampForecast.feelsLike
                    }</div>
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
