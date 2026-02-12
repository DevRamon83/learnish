import { customLogicDoc } from "../../constants/consoleDoc";
import { error001a, error002a, errorHandler } from "../errorMsgCreators";

const invalidIndex = (configObj) => {
  let error = false;
  const { SSOT, indexArray, caller } = configObj;

  indexArray.forEach((targetIndex, position) => {
    const text = error001a(caller, position, targetIndex);
    error = targetIndex >= SSOT.length ? errorHandler(text) : error;
  });

  return error;
};

const invalidKey = (configObj, funcsMap) => {
  let error = false;
  const { SSOT, indexArray, caller } = configObj;

  indexArray.forEach((index) => {
    const key = SSOT[index];
    const text = error002a(caller, key);
    error = !funcsMap[key] ? errorHandler(text) : error;
  });

  return error;
};

export const handlersFactoryGuard = (customLogic, SSOT) => {
  if (!customLogic) return;
  let error = false;
  const configObj = {
    SSOT,
    indexArray: null,
    caller: null,
  };

  const { onBlurFuncs, onBlurIndexes } = customLogic;

  if (onBlurIndexes.length > 0) {
    configObj.indexArray = onBlurIndexes;
    configObj.caller = "onBlur";
    error = invalidIndex(configObj) ? true : error;
    error = invalidKey(configObj, onBlurFuncs) ? true : error;
  }

  const { onFocusFuncs, onFocusIndexes } = customLogic;

  if (onFocusIndexes.length > 0) {
    configObj.indexArray = onFocusIndexes;
    configObj.caller = "onFocus";
    error = invalidIndex(configObj) ? true : error;
    error = invalidKey(configObj, onFocusFuncs) ? true : error;
  }

  const { onKeyDownFuncs, onKeyDownIndexes } = customLogic;

  if (onKeyDownIndexes.length > 0) {
    configObj.indexArray = onKeyDownIndexes;
    configObj.caller = "onKeyDown";
    error = invalidIndex(configObj) ? true : error;
    error = invalidKey(configObj, onKeyDownFuncs) ? true : error;
  }

  if (error) {
    console.error(
      "Your customLogic object is invalid. Check the documentation example below:",
      customLogicDoc,
    );
  }
};
