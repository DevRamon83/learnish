import bundle from "shared";
import handleErrorResponse from "../../helpers/handleErrorResponse.js";
const { plans, currencies, passwordKeys } = bundle.constants;
const { emailValidator, passwordValidator } = bundle;

const keyChecker = (array, checkArray) => {
  let isValid = true;

  if (array.length === 1) {
    isValid = checkArray.includes(array[0]);
  } else {
    isValid = JSON.stringify(array) === JSON.stringify(checkArray);
  }

  return isValid;
};

const newPasswordValidator = (data) => {
  const keys = Object.keys(data);
  let isValid = keyChecker(keys, passwordKeys);

  keys.forEach((key) => {
    const isValidPsw = passwordValidator(data[key]);
    isValid = isValidPsw.error ? false : isValid;
  });

  if (data.newPassword.trim() !== data.confirmNewPassword.trim()) {
    isValid = false;
  }

  return isValid;
};

const validateNumericFields = (data, fieldName) => {
  let isValid = true;
  const keys = Object.keys(data[fieldName]);

  isValid = keyChecker(keys, bundle.constants[fieldName]);

  for (let key in data[fieldName]) {
    const type = typeof data[fieldName][key];
    isValid = isValid ? type === "number" : isValid;
    isValid = isValid ? data[fieldName][key] !== 0 : isValid;
  }

  return isValid;
};

const dispatchValidator = (fieldName, data) => {
  switch (fieldName) {
    case "plan":
      return plans.includes(data[fieldName]);
    case "email":
      return emailValidator(data[fieldName]);
    case "password":
      return newPasswordValidator(data);
    case "currency":
      return currencies.includes(data[fieldName]);
    case "subscription":
    case "tutoring":
    case "speaking":
    case "qNa":
      return validateNumericFields(data, fieldName);
    default:
      return false;
  }
};

const stopIt = (req, res, fieldName = "payload structure") => {
  const log = true;
  const errorMessage = `invalid settingsValidator ${fieldName}`;
  console.error(errorMessage);
  handleErrorResponse(res, req, errorMessage, 400, log);
};

const settingsValidator = async (req, res, next) => {
  const data = req.body;
  const path = req.path;

  const fieldArray = Object.keys(data);

  const fieldName = fieldArray[0];

  const isValid = dispatchValidator(fieldName, data);
  if (!isValid) return stopIt(req, res, fieldName);

  next();
};

export default settingsValidator;
