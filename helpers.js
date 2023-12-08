export const createWeatherObject = function ({ data, hourlyForecastData }) {
  const weather = data;
  const hourlyForecast = hourlyForecastData;
  return {
    cityName: weather.name,
    temp: Math.round(weather.main.temp),
    feelsLike: Math.round(weather.main.feels_like),
    icon: weather.weather[0].icon,
    description: weather.weather[0].description,
    sunrise: timeConverter(weather.sys.sunrise),
    sunset: timeConverter(weather.sys.sunset),
    morningForecast: {
      dateTime: timeConverter(hourlyForecast.list[0].dt),
      temp: Math.round(hourlyForecast.list[0].main.temp),
      feelsLike: Math.round(hourlyForecast.list[0].main.feels_like),
      icon: hourlyForecast.list[0].weather[0].icon,
      description: hourlyForecast.list[0].weather[0].description,
    },
    dayForecast: {
      dateTime: timeConverter(hourlyForecast.list[1].dt),
      temp: Math.round(hourlyForecast.list[1].main.temp),
      feelsLike: Math.round(hourlyForecast.list[1].main.feels_like),
      icon: hourlyForecast.list[1].weather[0].icon,
      description: hourlyForecast.list[1].weather[0].description,
    },
    eveningForecast: {
      dateTime: timeConverter(hourlyForecast.list[2].dt),
      temp: Math.round(hourlyForecast.list[2].main.temp),
      feelsLike: Math.round(hourlyForecast.list[2].main.feels_like),
      icon: hourlyForecast.list[2].weather[0].icon,
      description: hourlyForecast.list[2].weather[0].description,
    },
  };
};

const timeConverter = (sec) => {
  return new Date(sec * 1000).toISOString().slice(11, 16);
};

export const checkIfValid = (value) => {
  return value.trim().length === 0;
};

export const deleteFavoriteLocation = (array, name) => {
  array.splice(
    array.findIndex((item) => item.cityName === name),
    1
  );
};

export const deleteParentNodes = (parentElement) => {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.lastChild);
  }
};
