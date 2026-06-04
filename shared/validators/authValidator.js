import {
  emailValidator,
  passwordValidator,
  usernameValidator,
} from "ramon-vanilla";
import {
  currentPrivacy,
  currentTos,
  userType,
  plan,
} from "../constants/atomicConstants.js";

const errorTracker = (obj, key, error) => {
  obj[key] = error;
};

const checker = (obj, errors) => {
  const { func, value1, value2, key, backend } = obj;
  let exit = false;
  let error = false;
  const test = func(value1, value2);
  if (test.error) {
    exit = backend;
    error = test.errorArray;
  }
  if (!exit && error) errorTracker(errors, key, test.errorArray);
  return { exit, error };
};

const compare = (value1, value2) => {
  const dontMatch = value1 !== value2;

  return { error: dontMatch, errorArray: dontMatch ? ["match failed"] : [] };
};

const arrayValidator = (value, arraySSOT) => {
  const isValid = arraySSOT.includes(value);
  const error = isValid ? false : true;
  return { error, errorArray: ["invalid datum into array"] };
};

const giveMeValidator = (key) => {
  switch (key) {
    case "username":
      return usernameValidator;
    case "email":
      return emailValidator;
    case "password":
      return passwordValidator;
    case "userType":
      return arrayValidator;
    case "plan":
      return arrayValidator;
    default:
      return compare;
  }
};

const giveMeValue2 = (data, key) => {
  switch (key) {
    case "confirmEmail":
      return data.email;
    case "confirmPassword":
      return data.password;
    case "privacy":
      return currentPrivacy;
    case "tos":
      return currentTos;
    case "userType":
      return userType;
    case "plan":
      return plan;
    default:
      return null;
  }
};

const authValidator = (path, data, caller) => {
  const errors = {};
  let error = false;
  const dataKeys = Object.keys(data);

  const objChecker = {
    func: null,
    value1: null,
    key: null,
    backend: caller === "backend",
    value2: null,
  };
  const isLogin = path === "/login";
  const loginArray = ["username", "password"];

  for (let i = 0; i < dataKeys.length; i++) {
    const key = dataKeys[i];
    if (isLogin && !loginArray.includes(key)) continue;
    objChecker.func = giveMeValidator(key);
    objChecker.value1 = data[key];
    objChecker.value2 = giveMeValue2(data, key);
    objChecker.key = key;
    const checkDatum = checker(objChecker, errors);

    error = error ? error : checkDatum.error;
    if (checkDatum.exit) break;
  }

  const elementToReturn = objChecker.backend ? error : errors;
  return { error, errors: elementToReturn };
};

export default authValidator;
