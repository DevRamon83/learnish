export const average = (value, total, fixTo) => {
  const averageValue = value / total;

  return +averageValue.toFixed(fixTo);
};
