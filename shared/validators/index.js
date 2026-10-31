import authValidator from "./authValidator.js";
import summaryValidator from "./summaryValidator.js";
import messageValidator from "./messageValidator.js";
import { invalidExercise } from "./exerciseValidator.js";
import validateChatMessage from "./validateChatMessage.js";

const validators = {
  authValidator,
  summaryValidator,
  messageValidator,
  invalidExercise,
  validateChatMessage,
};

export default validators;
