export const acceptOnly = (string, setCharacters) => {
  const regex = new RegExp(`^[${setCharacters}]+$`);
  return regex.test(string);
};

export const atLeastOne = (string, setCharacters) => {
  const regex = new RegExp(`[${setCharacters}]`);
  return regex.test(string);
};

export const tooShort = (string, num) => {
  const length = string.length;

  if (length < num) {
    return true;
  } else {
    return false;
  }
};

export const tooLong = (string, num) => {
  const length = string.length;

  if (length > num) {
    return true;
  } else {
    return false;
  }
};

export const isLeapYear = (year) => {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
};

export const typeChecker = (datum, type) => {
  const yourType = typeof datum;
  const cleanType = type.toLowerCase();

  // verifica se può essere un tipo oggetto
  const objType = yourType === "object" && datum !== null;

  if (cleanType === "array") return Array.isArray(datum);

  // se è un tipo oggetto e non è un array
  if (cleanType === "object" && objType) return !Array.isArray(datum);

  // a questo punto è restato solo il caso null
  if (cleanType === "null") return datum === null;

  if (cleanType === yourType) return true;
};

export const isObjValid = (obj) => {
  if (!obj) return false; // Tratta null/undefined come "vuoto"
  return Object.keys(obj).length > 0;
};
