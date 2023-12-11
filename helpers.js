export const createWeatherObject = function ({ data, hourlyForecastData }) {
  const weather = data;
  const hourlyForecast = hourlyForecastData;
  return {
    dateTime: dateTimeConverter(weather.dt, weather.timezone),
    humidity: weather.main.humidity,
    cityName: weather.name,
    temp: Math.round(weather.main.temp),
    feelsLike: Math.round(weather.main.feels_like),
    icon: weather.weather[0].icon,
    description: weather.weather[0].main,
    sunrise: dateTimeConverter(weather.sys.sunrise, weather.timezone),
    sunset: dateTimeConverter(weather.sys.sunset, weather.timezone),
    firstTimeStampForecast: {
      dateTime: dateTimeConverter(hourlyForecast.list[0].dt, weather.timezone),
      temp: Math.round(hourlyForecast.list[0].main.temp),
      feelsLike: Math.round(hourlyForecast.list[0].main.feels_like),
      icon: hourlyForecast.list[0].weather[0].icon,
      description: hourlyForecast.list[0].weather[0].description,
    },
    secondTimeStampForecast: {
      dateTime: dateTimeConverter(hourlyForecast.list[1].dt, weather.timezone),
      temp: Math.round(hourlyForecast.list[1].main.temp),
      feelsLike: Math.round(hourlyForecast.list[1].main.feels_like),
      icon: hourlyForecast.list[1].weather[0].icon,
      description: hourlyForecast.list[1].weather[0].description,
    },
    thirdTimeStampForecast: {
      dateTime: dateTimeConverter(hourlyForecast.list[2].dt, weather.timezone),
      temp: Math.round(hourlyForecast.list[2].main.temp),
      feelsLike: Math.round(hourlyForecast.list[2].main.feels_like),
      icon: hourlyForecast.list[2].weather[0].icon,
      description: hourlyForecast.list[2].weather[0].description,
    },
  };
};

const dateTimeConverter = (sec, timezone) => {
  const timezoneOffset = new Date().getTimezoneOffset() * 60;
  const fullDate = new Date((sec + timezone + timezoneOffset) * 1000);

  const dateMonth = fullDate.toLocaleString("en-En", {
    month: "long",
    day: "numeric",
  });
  const time = fullDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return { dateMonth, time };
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
