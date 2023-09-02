import { months as MONTHS, days as DAYS } from "./constants";

const date = new Date();

export const getWeekDays = (): string[] => {
  const dayInAWeek = new Date().getDay();
  const days = [...DAYS.slice(dayInAWeek), ...DAYS.slice(0, dayInAWeek)];
  return days;
};

export const getDayMonthFromDate = (): string => {
  const month = MONTHS[date.getMonth()].slice(0, 3);
  const day = date.getUTCDate();

  return `${day} ${month}`;
};

export const transformDateFormat = (): string => {
  const month = date.toLocaleString("en-US", { month: "2-digit" });
  const day = date.toLocaleString("en-US", { day: "2-digit" });
  const year = date.getFullYear();
  const time = date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  return `${year}-${month}-${day} ${time}`;
};

export const getUTCDatetime = (): string => {
  const utcTime = date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "UTC",
  });

  const isoDateString = new Date().toISOString();
  const utcDate = `${isoDateString.split("T")[0]} ${utcTime}`;
  return utcDate;
};

export const getUTCTime = (): string => {
  const utcTime = date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
    timeZone: "UTC",
  });

  return utcTime;
};
