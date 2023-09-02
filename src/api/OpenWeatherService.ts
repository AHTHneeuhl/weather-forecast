import axios from "axios";

const geoApiUrl = "https://wft-geo-db.p.rapidapi.com/v1/geo";

const weatherApiUrl = "https://api.openweathermap.org/data/2.5";
const weatherApiKey = "Your API KEY";

const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "4f0dcce84bmshac9e329bd55fd14p17ec6fjsnff18c2e61917",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const fetchWeather = async (lat: number, lon: number) => {
  try {
    const [weatherResponse, forcastResponse] = await Promise.all([
      axios.get(`${weatherApiUrl}/weather`, {
        params: {
          lat: lat,
          lon: lon,
          appid: weatherApiKey,
          units: "metric",
        },
      }),
      axios.get(`${weatherApiUrl}/forecast`, {
        params: {
          lat: lat,
          lon: lon,
          appid: weatherApiKey,
          units: "metric",
        },
      }),
    ]);

    return [weatherResponse.data, forcastResponse.data];
  } catch (error) {
    console.log(error);
  }
};

export const fetchCities = async (input: string) => {
  try {
    const response = await axios.get(`${geoApiUrl}/cities`, {
      params: {
        minPopulation: 10000,
        namePrefix: input,
      },
      ...geoApiOptions,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
