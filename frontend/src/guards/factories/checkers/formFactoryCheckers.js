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

export const indexChecker = (fieldsSSOT, indexes, callBy) => {
  let isValid = true;

  indexes.forEach((targetIndex, position) => {
    const validType = typeChecker(targetIndex, "number");
    isValid = validType ? isValid : false;
    const validNum = targetIndex >= 0;
    isValid = validNum ? isValid : false;
    const text = error001a(callBy, position, targetIndex);

    // errorHandler returns true, so we need to revert it
    isValid = targetIndex >= fieldsSSOT.length ? !errorHandler(text) : isValid;
  });

  return isValid;
};

export const SSOTchecker = (fieldsSSOT) => {
  if (!fieldsSSOT || !Array.isArray(fieldsSSOT)) {
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

export const controlledChecker = (customLogic) => {
  const { controlledFields } = customLogic;
  const checked = "controlledFields";

  if (controlledFields === undefined || controlledFields === null) {
    const text = missingError(caller, checked, checkedIn);
    errorHandler(text);
    return false;
  }

  if (!typeChecker(controlledFields, "boolean")) {
    const text = invalidType(caller, checked, checkedIn);
    errorHandler(text);
    return false;
  }

  return true;
};

const keyChecker = (fieldsSSOT, indexes, callBy, map) => {
  let isValid = true;

  indexes.forEach((index) => {
    const key = fieldsSSOT[index];
    const text = error002a(callBy, key);

    // errorHandler returns true, so we need to revert it
    isValid = !map[key] ? !errorHandler(text) : isValid;
  });

  return isValid;
};

export const handlerChecker = (fieldsSSOT, indexes, callBy, map) => {
  let isValid = true;
  isValid = indexChecker(fieldsSSOT, indexes, callBy) ? isValid : false;
  isValid = keyChecker(fieldsSSOT, indexes, callBy, map) ? isValid : false;

  return isValid;
};
