import { typeChecker } from "../validators/atomicValidators";

export const analyzeArray = (element) => {
  if (typeChecker(element, "null")) {
    return "primitive";
  }

  if (typeChecker(element, "object")) {
    return "object";
  }

  if (Array.isArray(element)) {
    return "array";
  }

  return "primitive";
};
