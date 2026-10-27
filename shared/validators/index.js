import authValidator from "./authValidator.js";
import summaryValidator from "./summaryValidator.js";
import messageValidator from "./messageValidator.js";
import { invalidExercise } from "./exerciseValidator.js";

const validators = {
  authValidator,
  summaryValidator,
  messageValidator,
  invalidExercise,
};

export default validators;
