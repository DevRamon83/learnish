import bundle from "../../../../shared";
import { defineMax } from "./calculators";
const { defineDate } = bundle.helpers;

export const findMyStats = (stats, data) => {
  const { month } = defineDate(data.createdAt);

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

export const findLabelsX = (chartType, startDate) => {
  let duration = null;
  if (chartType === "weekly") {
    duration = 7;
  }

  if (chartType === "monthly") {
    duration = 30;
  }

  if (chartType === "quarter") {
    duration = 90;
  }

  if (chartType === "semiAnnually") {
    duration = 180;
  }

  const step = parseInt(duration / 6);
  const tags = [];

  for (let i = 0; i < 7; i++) {
    const newDate = new Date(startDate);
    newDate.setDate(startDate.getDate() - i * step);
    const label = newDate.toLocaleString(undefined, {
      day: "numeric",
      month: "long",
    });
    tags.unshift(label);
  }

  const simplifyTags = [];
  simplifyTags.push(tags[0], tags[3], tags[6]);

  return { tags, simplifyTags };
};

export const findLabelsY = (currentRawData, setLabelY) => {
  const max = defineMax(currentRawData);

  const index = max / 5;
  const indexArray = [];
  let currentIndex = 0;
  for (let i = 0; i < 5; i++) {
    currentIndex += index;
    indexArray.unshift(currentIndex);
  }
  setLabelY(indexArray);
};
