import { typeChecker } from "../../../../../shared/validators/atomicValidators";
import {
  error001a,
  error002a,
  error004a,
  errorHandler,
  invalidType,
  missingError,
} from "../../errorMsgCreators";

const caller = "factoryFormGuard";
const checkedIn = "customLogic";

export const indexChecker = (SSOT, indexes, callBy) => {
  let isValid = true;

  indexes.forEach((targetIndex, position) => {
    const validType = typeChecker(targetIndex, "number");
    isValid = validType ? isValid : false;
    const validNum = targetIndex >= 0;
    isValid = validNum ? isValid : false;
    const text = error001a(callBy, position, targetIndex);

    // errorHandler returns true, so we need to revert it
    isValid = targetIndex >= SSOT.length ? !errorHandler(text) : isValid;
  });

  return isValid;
};

export const SSOTchecker = (SSOT) => {
  if (!SSOT || !Array.isArray(SSOT)) {
    errorHandler(error004a);
    return false;
  }
  return true;
};

export const InputFieldsConfigChecker = (customLogic) => {
  const checked = "inputFieldsConfig";
  const { inputFieldsConfig } = customLogic;

  if (!inputFieldsConfig) {
    const text = missingError(caller, checked, checkedIn);
    errorHandler(text);
    return false;
  }

  if (!typeChecker(inputFieldsConfig, "object")) {
    const text = invalidType(caller, checked, "an object");
    errorHandler(text);
    return false;
  }

  return true;
};

export const controlledInputsChecker = (customLogic) => {
  const { controlledInputs } = customLogic;
  const checked = "controlledInputs";

  if (controlledInputs === undefined || controlledInputs === null) {
    const text = missingError(caller, checked, checkedIn);
    errorHandler(text);
    return false;
  }

  if (!typeChecker(controlledInputs, "boolean")) {
    const text = invalidType(caller, checked, checkedIn);
    errorHandler(text);
    return false;
  }

  return true;
};

const keyChecker = (SSOT, indexes, callBy, map) => {
  let isValid = true;

  indexes.forEach((index) => {
    const key = SSOT[index];
    const text = error002a(callBy, key);

    // errorHandler returns true, so we need to revert it
    isValid = !map[key] ? !errorHandler(text) : isValid;
  });

  return isValid;
};

export const handlerChecker = (SSOT, indexes, callBy, map) => {
  let isValid = true;
  isValid = indexChecker(SSOT, indexes, callBy) ? isValid : false;
  isValid = keyChecker(SSOT, indexes, callBy, map) ? isValid : false;

  return isValid;
};
