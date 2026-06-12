import bundle from "shared";
import handleErrorResponse from "../../helpers/handleErrorResponse.js";
const { plans, currency, subscription } = bundle.constants;
const { emailValidator, passwordValidator } = bundle;

const newPasswordValidator = (data) => {
  const keys = Object.keys(data);
  let isValid = true;
  if (keys.length !== 3) return false;

  keys.forEach((key) => {
    const isValidPsw = passwordValidator(data[key]);
    isValid = isValidPsw.error ? false : isValid;
  });

  if (data.newPassword.trim() !== data.confirmNewPassword.trim()) {
    isValid = false;
  }

  return isValid;
};

const validateSubscription = (data) => {
  const keys = Object.keys(data.subscription);
  if (JSON.stringify(keys) !== JSON.stringify(subscription)) {
    return false;
  }

  const areAllNum = keys.every(
    (key) =>
      !isNaN(parseInt(data.subscription[key])) &&
      data.subscription[key].trim() !== "",
  );

  return areAllNum;
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
      return currency.includes(data[fieldName]);
    case "subscription":
      return validateSubscription(data);
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

  if (fieldArray.length !== 1 && path !== "/settings") {
    return stopIt(req, res, fieldName);
  }

  const isValid = dispatchValidator(fieldName, data);

  if (!isValid) return stopIt(req, res, fieldName);

  next();
};

export default settingsValidator;
