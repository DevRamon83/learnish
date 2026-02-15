import { typeChecker } from "../validators/atomicValidators";

const tooManyEntries = (element) => {
  if (element.length > 100) return "tooManyEntries";
  return false;
};

export const analyzeArray = (element) => {
  if (typeChecker(element, "null")) {
    return { error: false, type: "primitive" };
  }

  if (typeChecker(element, "object")) {
    return { error: false, type: "object" };
  }

  if (Array.isArray(element)) {
    const error = tooManyEntries(element);
    return {
      error: error || false,
      errorMessage: error,
      type: "array",
    };
  }

  return { error: false, type: "primitive" };
};
