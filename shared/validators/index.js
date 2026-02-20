import {
  acceptOnly,
  atLeastOne,
  isObjValid,
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
    acceptOnly,
    atLeastOne,
    tooShort,
    tooLong,
    isLeapYear,
    typeChecker,
    isObjValid,
  },
  authValidators: {
    username: usernameValidator,
    email: emailValidator,
    password: passwordValidator,
    confirmPassword: confirmPasswordValidator,
  },
};

export default validators;
