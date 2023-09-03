export const groupBy = (key: string) => {
  return (array: any[]) => {
    return array.reduce((acc: { [key: string]: any[] }, obj) => {
      const property = obj[key];
      const { date, ...rest } = obj;
      acc[property] = acc[property] || [];
      acc[property].push(rest);
      return acc;
    }, {});
  };
};

export const getAverage = (array: number[], isRound = true): number => {
  const sum = array.reduce((a, b) => a + b, 0);
  const length = array.length;

  if (isRound) {
    return Math.round(sum / length);
  } else {
    return parseFloat((sum / length).toFixed(2));
  }
};

export const getMostFrequentWeather = (arr: string[]): string => {
  const frequencyMap: Record<string, number> = {};

  for (const weather of arr) {
    frequencyMap[weather] = (frequencyMap[weather] || 0) + 1;
  }

  let mostFrequentWeather = "";

  for (const weather in frequencyMap) {
    if (frequencyMap[weather] > frequencyMap[mostFrequentWeather]) {
      mostFrequentWeather = weather;
    }
  }

  return mostFrequentWeather;
};

export const descriptionToIconName = (
  desc: string,
  descriptions_list: { description: string; icon: string }[]
): string => {
  let iconName = descriptions_list.find((item) => item.description === desc);
  return iconName?.icon || "unknown";
};

export const getWeekForecastWeather = (
  response: {
    list: {
      dt_txt: string;
      weather: { description: string }[];
      main: { temp: number; humidity: number };
      wind: { speed: number };
      clouds: { all: number };
    }[];
    cod: string;
  },
  descriptions_list: { description: string; icon: string }[]
): {
  date: string;
  temp: number;
  humidity: number;
  wind: number;
  clouds: number;
  description: string;
  icon: string;
}[] => {
  let foreacast_data: {
    date: string;
    temp: number;
    humidity: number;
    wind: number;
    clouds: number;
  }[] = [];
  let descriptions_data: { description: string; date: string }[] = [];

  if (!response || Object.keys(response).length === 0 || response.cod === "404")
    return [];
  else
    response?.list.slice().map((item, idx) => {
      descriptions_data.push({
        description: item.weather[0].description,
        date: item.dt_txt.substring(0, 10),
      });
      foreacast_data.push({
        date: item.dt_txt.substring(0, 10),
        temp: item.main.temp,
        humidity: item.main.humidity,
        wind: item.wind.speed,
        clouds: item.clouds.all,
      });

      return { idx, item };
    });

  const groupByDate = groupBy("date");
  let grouped_forecast_data = groupByDate(foreacast_data);
  let grouped_forecast_descriptions = groupByDate(descriptions_data);

  const description_keys = Object.keys(grouped_forecast_descriptions);

  let dayDescList: string[] = [];

  description_keys.forEach((key) => {
    let singleDayDescriptions = grouped_forecast_descriptions[key].map(
      (item) => item.description
    );
    let mostFrequentDescription = getMostFrequentWeather(singleDayDescriptions);
    dayDescList.push(mostFrequentDescription);
  });

  const forecast_keys = Object.keys(grouped_forecast_data);
  let dayAvgsList: {
    date: string;
    temp: number;
    humidity: number;
    wind: number;
    clouds: number;
    description: string;
    icon: string;
  }[] = [];

  forecast_keys.forEach((key, idx) => {
    let dayTempsList: number[] = [];
    let dayHumidityList: number[] = [];
    let dayWindList: number[] = [];
    let dayCloudsList: number[] = [];

    for (let i = 0; i < grouped_forecast_data[key].length; i++) {
      dayTempsList.push(grouped_forecast_data[key][i].temp);
      dayHumidityList.push(grouped_forecast_data[key][i].humidity);
      dayWindList.push(grouped_forecast_data[key][i].wind);
      dayCloudsList.push(grouped_forecast_data[key][i].clouds);
    }

    dayAvgsList.push({
      date: key,
      temp: getAverage(dayTempsList),
      humidity: getAverage(dayHumidityList),
      wind: getAverage(dayWindList, false),
      clouds: getAverage(dayCloudsList),
      description: dayDescList[idx],
      icon: descriptionToIconName(dayDescList[idx], descriptions_list),
    });
  });

  return dayAvgsList;
};

export const getTodayForecastWeather = (
  response: {
    list: {
      dt_txt: string;
      weather: { icon: string };
      main: { temp: number };
    }[];
    cod: string;
  },
  currentDate: string,
  currentDateTime: number
): {
  time: string;
  icon: string;
  temperature: string;
}[] => {
  let allTodayForecasts: {
    time: string;
    icon: string;
    temperature: string;
  }[] = [];

  if (!response || Object.keys(response).length === 0 || response.cod === "404")
    return [];

  response.list.forEach((item) => {
    if (
      item.dt_txt.startsWith(currentDate.substring(0, 10)) &&
      item.dt > currentDateTime
    ) {
      allTodayForecasts.push({
        time: item.dt_txt.split(" ")[1].substring(0, 5),
        icon: item.weather[0].icon,
        temperature: Math.round(item.main.temp) + " °C",
      });
    }
  });

  if (allTodayForecasts.length < 7) {
    return [...allTodayForecasts];
  } else {
    return allTodayForecasts.slice(-6);
  }
};
