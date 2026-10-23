export const average = (value, total, fixTo) => {
  const averageValue = value / total;

  return +averageValue.toFixed(fixTo);
};

export const defineMax = (rawData) => {
  let max = 2;
  for (const datum of rawData) {
    if (datum.words === 0) continue;
    const ratio = (datum.errors / datum.words) * 100;
    max = max > ratio ? max : ratio;
  }

  return max * 1.1;
};
