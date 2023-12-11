const serverUrl = "https://api.openweathermap.org/data/2.5/";
const geoCodingUrl = "http://api.openweathermap.org/geo/1.0/direct";
const apiKey = "e3299253c4b95e1ce399295bbd26beb9";

export const fetchData = async (cityName) => {
  try {
    const url = `${serverUrl}weather?q=${cityName}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) throw new Error("Something went wrong");

    const coords = await fetchLatLonData(cityName);
    const { lat, lon } = coords[0];

    const hourlyForecastData = await fetchForecastData({ lat, lon });

    return { data, hourlyForecastData };
  } catch (error) {
    throw error;
  }
};

export const fetchLatLonData = async (cityName) => {
  try {
    const url = `${geoCodingUrl}?q=${cityName}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) throw new Error("Something went wrong");

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchForecastData = async ({ lat, lon }) => {
  try {
    const url = `${serverUrl}forecast?lat=${lat}&lon=${lon}&cnt=3&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) throw new Error("Something went wrong");

    return data;
  } catch (error) {
    console.log(error);
  }
};
