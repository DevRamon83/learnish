import {
  acceptOnly,
  atLeastOne,
  isLeapYear,
  tooLong,
  tooShort,
  typeChecker,
} from "./atomicValidators";
import {
  confirmPswlValidator,
  emailValidator,
  pswValidator,
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
    psw: pswValidator,
    confirmPSw: confirmPswlValidator,
  },
};

export default validators;
