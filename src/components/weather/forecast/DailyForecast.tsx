import React from "react";
import { Grid, Typography, TypographyProps } from "@mui/material";
import DailyForecastItem from "./DailyForecastItem";
import ErrorBox from "components/common/ErrorBox";
import Layout from "components/common/Layout";

interface DailyForecastProps {
  data: {
    // Define the type of your 'data' prop here
  };
  forecastList: {
    // Define the type of your 'forecastList' prop here
  }[];
}

const DailyForecast: React.FC<DailyForecastProps> = ({
  data,
  forecastList,
}) => {
  const noDataProvided =
    !data ||
    !forecastList ||
    Object.keys(data).length === 0 ||
    (data.cod === "404" && forecastList.cod === "404");

  let subHeader: React.ReactNode;

  if (!noDataProvided && forecastList.length > 0)
    subHeader = (
      <Typography
        variant="h5"
        component="h5"
        sx={
          {
            fontSize: { xs: "10px", sm: "12px" },
            textAlign: "center",
            lineHeight: 1,
            color: "#04C4E0",
            fontFamily: "Roboto Condensed",
            marginBottom: "1rem",
          } as TypographyProps
        }
      >
        {forecastList.length === 1
          ? "1 available forecast"
          : `${forecastList.length} available forecasts`}
      </Typography>
    );

  let content: React.ReactNode;

  if (noDataProvided) content = <ErrorBox flex="1" type="error" />;

  if (!noDataProvided && forecastList.length > 0)
    content = (
      <Grid
        item
        container
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "fit-content",
        }}
        spacing="4px"
      >
        {forecastList.map((item, idx) => (
          <Grid
            key={idx}
            item
            xs={4}
            sm={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
              marginBottom: { xs: "1rem", sm: "0" },
            }}
          >
            <DailyForecastItem item={item} data={data} />
          </Grid>
        ))}
      </Grid>
    );

  if (!noDataProvided && forecastList && forecastList.length === 0)
    subHeader = (
      <ErrorBox
        flex="1"
        type="info"
        margin="2rem auto"
        errorMessage="No available forecasts for tonight."
      />
    );

  return (
    <Layout
      title="TODAY'S FORECAST"
      content={content}
      sectionSubHeader={subHeader}
      sx={{ marginTop: "2.9rem" }}
      mb="0.3rem"
    />
  );
};

export default DailyForecast;
