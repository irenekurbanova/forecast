export const createWeatherObject = function ({ data, hourlyForecastData }) {
  const weather = data;
  const hourlyForecast = hourlyForecastData;
  console.log(weather);
  return {
    dateTime: dateConverter(weather.dt),
    timezone: weather.timezone,
    cityName: weather.name,
    temp: Math.round(weather.main.temp),
    feelsLike: Math.round(weather.main.feels_like),
    humidity: weather.main.humidity,
    icon: weather.weather[0].icon,
    description: weather.weather[0].description,
    sunrise: timeConverter(weather.sys.sunrise, weather.timezone),
    sunset: timeConverter(weather.sys.sunset, weather.timezone),
    firstTimeStampForecast: {
      dateTime: timeConverter(hourlyForecast.list[1].dt),
      temp: Math.round(hourlyForecast.list[1].main.temp),
      feelsLike: Math.round(hourlyForecast.list[1].main.feels_like),
      icon: hourlyForecast.list[1].weather[0].icon,
      description: hourlyForecast.list[1].weather[0].description,
    },
    secondTimeStampForecast: {
      dateTime: timeConverter(hourlyForecast.list[2].dt),
      temp: Math.round(hourlyForecast.list[2].main.temp),
      feelsLike: Math.round(hourlyForecast.list[2].main.feels_like),
      icon: hourlyForecast.list[2].weather[0].icon,
      description: hourlyForecast.list[2].weather[0].description,
    },
    thirdTimeStampForecast: {
      dateTime: timeConverter(hourlyForecast.list[3].dt),
      temp: Math.round(hourlyForecast.list[3].main.temp),
      feelsLike: Math.round(hourlyForecast.list[3].main.feels_like),
      icon: hourlyForecast.list[3].weather[0].icon,
      description: hourlyForecast.list[3].weather[0].description,
    },
  };
};

const dateConverter = (sec) => {
  const fullDate = new Date(sec * 1000);
  const weekday = fullDate.toLocaleString("en-EN", {
    weekday: "long",
  });
  const dateMonth =
    fullDate.getDate() +
    " " +
    fullDate.toLocaleString("en-En", {
      month: "long",
    });
  const time = fullDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${weekday}, ${dateMonth} \n ${time}`;
};

const timeConverter = (sec, timezone = 0) => {
  const time = (sec + timezone) * 1000;

  return new Date(time).toISOString().slice(11, 16);
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
