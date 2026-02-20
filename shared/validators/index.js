import {
  acceptOnly,
  atLeastOne,
  isLeapYear,
  tooLong,
  tooShort,
  typeChecker,
} from "./atomicValidators";
import {
  confirmPasswordValidator,
  emailValidator,
  passwordValidator,
  usernameValidator,
} from "./authValidators";

const validators = {
  atomicsValidators: {
    acceptOnly: acceptOnly,
    atLeastOne: atLeastOne,
    tooShort: tooShort,
    tooLong: tooLong,
    isLeapYear: isLeapYear,
    typeChecker: typeChecker,
  },
  authValidators: {
    username: usernameValidator,
    email: emailValidator,
    password: passwordValidator,
    confirmPassword: confirmPasswordValidator,
  },
};

export default validators;
