import React from "react";
import { Grid, GridProps } from "@mui/material";
import AirConditions from "./AirConditions/AirConditions";
import DailyForecast from "./Forecast/DailyForecast";
import Details from "./Details/Details";

interface TodayWeatherProps {
  data: {
    // Define the type of your 'data' prop here
  };
  forecastList: {
    // Define the type of your 'forecastList' prop here
  }[];
}

const TodayWeather: React.FC<TodayWeatherProps> = ({ data, forecastList }) => {
  return (
    <Grid container sx={{ padding: "3rem 0rem 0rem" } as GridProps}>
      <Details data={data} />
      <AirConditions data={data} />
      <DailyForecast data={data} forecastList={forecastList} />
    </Grid>
  );
};

export default TodayWeather;
