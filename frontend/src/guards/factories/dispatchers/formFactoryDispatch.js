import { mapNIndexFinder } from "../../../helpers/formFactoryHelper";
import { error003a, errorHandler, missingError } from "../../errorMsgCreators";
import { handlerChecker } from "../checkers/formFactoryCheckers";

const isMissing = (element, caller) => {
  let missing = false;
  let text;
  if (!element) {
    missing = true;
    element = caller + " indexes";
    text = missingError("factoryFormGuard", element, "customLogic");
  }

  return { missing, text };
};

const handlerFinder = (customLogic, caller) => {
  let missing = false;
  const { map, indexes } = mapNIndexFinder(caller, customLogic);

  const missingIndex = isMissing(indexes, caller);

  if (missingIndex.missing) {
    missing = true;
    caller === "onChangeMap" ? errorHandler(missingIndex.text) : null;
  }

  const missingMap = isMissing(map, caller);

  if (missingMap.missing) {
    missing = true;
    caller === "onChangeMap" ? errorHandler(missingMap.text) : null;
  }

  return { indexes, map, missing };
};

export const dispatchHandlerChecker = (customLogic, caller, fieldSSOT) => {
  const { indexes, map, missing } = handlerFinder(customLogic, caller);

  // Only for onChangeMap caller missing values is invalid
  if (caller === "onChangeMap" && missing) return false;
  if (missing) return true;

  let isValid = true;
  isValid = handlerChecker(fieldSSOT, indexes, caller, map);
  !isValid && errorHandler(error003a);
  return isValid;
};
