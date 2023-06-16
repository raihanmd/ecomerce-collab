import getUnixTimestamps from "./getUnixTimestamps";

export const productIsNew = (unixTime) => {
  const currentTimestamp = getUnixTimestamps();
  const timeDifference = (currentTimestamp - unixTime) * 1000;
  const weekDaysInMillisecond = 24 * 60 * 60 * 1000;
  return timeDifference <= weekDaysInMillisecond;
};
