import bundle from "../../../../shared";
const { defineDate } = bundle.helpers;

export const findMyStats = (errors, stats, data) => {
  const { day, month, year } = defineDate(data.createdAt);

  const errorsArray = Object.keys(errors);
  const monthStats = stats.data.find((stat) => stat.month === month);
  const summaryStat = monthStats.dayStat.find(
    (stat) => stat.mongoIDsummary === data._id,
  );

  return summaryStat;
};

export const mapSymbols = (array, firstSet, secondSet, min, max) => {
  const symbolsMap = {};

  array.forEach((key) => {
    const average = firstSet[key] - secondSet[key];
    if (average < min) {
      symbolsMap[key] = "down";
    } else if (average > max) {
      symbolsMap[key] = "up";
    } else {
      symbolsMap[key] = "equal";
    }
  });

  return symbolsMap;
};
