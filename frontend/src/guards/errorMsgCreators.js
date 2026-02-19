import { customLogicDoc } from "../constants/consoleDoc";

export const errorHandler = (text) => {
  console.error(
    text,
    ". Check the documentation example below:",
    customLogicDoc,
  );
  return true;
};

export const error001a = (caller, position, targetIndex) => {
  return `[Guard]: ${caller} has an invalid index at position ${position} 
  (Value: ${targetIndex})`;
};

export const error002a = (caller, key) => {
  return `[Guard]: ${caller}Map is missing the function for key: "${key}"`;
};

export const error003a =
  "[Guard]: Your customLogic object is invalid. Check the documentation example below:";

export const error004a = "[Guard]: fieldsSSOT is missing or not an array";

export const error005a = "[Guard]: customLogic is missing";

export const missingError = (caller, element, position) => {
  return `[Guard ${caller}]: ${element} is missing in ${position}`;
};

export const invalidType = (caller, element, rightType) => {
  return `[Guard ${caller}]: ${element} must be ${rightType}`;
};
