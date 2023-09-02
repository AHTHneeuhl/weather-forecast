import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { getUTCDatetime } from "utils/datetimeUtils";

const UTCDatetime: React.FC = () => {
  const [utcFullDate, setUtcFullDate] = useState<string>("");

  useEffect(() => {
    const fetchUTCDate = async () => {
      try {
        const utcDate = await getUTCDatetime();
        setUtcFullDate(utcDate);
      } catch (error) {
        console.error("Error fetching UTC time:", error);
      }
    };

    fetchUTCDate();
  }, []);

  return (
    <Typography
      variant="h3"
      component="h3"
      sx={{
        fontWeight: "400",
        fontSize: { xs: "10px", sm: "12px" },
        color: "rgba(255, 255, 255, .7)",
        lineHeight: 1,
        paddingRight: "2px",
        fontFamily: "Poppins",
      }}
    >
      {utcFullDate} GMT
    </Typography>
  );
};

export default UTCDatetime;
