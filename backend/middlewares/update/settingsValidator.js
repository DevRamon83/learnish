import bundle from "shared";
import handleErrorResponse from "../../helpers/handleErrorResponse.js";
const { plans } = bundle.constants;
const { emailValidator, passwordValidator } = bundle;

const dispatchValidator = (fieldName, data) => {
  switch (fieldName) {
    case "plan":
      return plans.includes(data[fieldName]);
    case "email":
      return emailValidator(data[fieldName]);
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

  const fieldArray = Object.keys(data);
  const fieldName = fieldArray[0];

  if (fieldArray.length !== 1) return stopIt(req, res, fieldName);
  const isValid = dispatchValidator(fieldName, data);

  if (!isValid) return stopIt(req, res, fieldName);

  next();
};

export default settingsValidator;
