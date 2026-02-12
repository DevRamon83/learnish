const acceptOnly = (string, setCharacters) => {
  const regex = new RegExp(`^[${setCharacters}]+$`);
  return regex.test(string);
};

const atLeastOne = (string, setCharacters) => {
  const regex = new RegExp(`[${setCharacters}]`);
  return regex.test(string);
};

const tooShort = (string, num) => {
  const length = string.length;

  if (length < num) {
    return true;
  } else {
    return false;
  }
};

const tooLong = (string, num) => {
  const length = string.length;

  if (length > num) {
    return true;
  } else {
    return false;
  }
};

const isLeapYear = (year) => {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
};

const isMyType = (datum, type) => {
  if (type === "array") return Array.isArray(datum);
  if (type === "object") return datum !== null && !Array.isArray(datum);
  return typeof datum === type;
};
