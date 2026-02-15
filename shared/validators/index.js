import {
  acceptOnly,
  atLeastOne,
  isLeapYear,
  tooLong,
  tooShort,
  typeChecker,
} from "./atomicValidators";

const validators = {
  atomicsValidators: {
    acceptOnly: acceptOnly,
    atLeastOne: atLeastOne,
    tooShort: tooShort,
    tooLong: tooLong,
    isLeapYear: isLeapYear,
    typeChecker: typeChecker,
  },
};

export default validators;
