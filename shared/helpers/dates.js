export const defineDate = (myDate) => {
  const date = new Date(myDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return { day, month, year };
};
