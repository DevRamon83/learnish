import { typeChecker } from "../validators/atomicValidators";
import { analyzeArray } from "./analyzeArray";

const caller = ["CloneInterface"];
const noElementMsgg = ": you must send an element to clone";
const tooManyKeys = ": can't clone an obj with more than 100 keys";
const tooDepp = ": your obj is too deep to be cloned";

export const errorHandler = (caller, message) => {
  console.error(caller, message);
};

const isTooDeep = (depth) => {
  if (depth > 5) {
    errorHandler(caller, tooDepp);
    return true;
  }
};

function cloneArray(element, depth = 0) {
  let recurse = false;
  let error = false;
  let clonedArray = [];
  let elementToRecurse = null;
  const actualDepth = depth + 1;

  const stop = isTooDeep(actualDepth);
  if (stop) return { error: true, clonedArray: null };

  const recurseArray = (array) => {
    const newArray = cloneArray(array, actualDepth);
    error = newArray.error ? newArray.error : error;
    clonedArray.push(newArray.clonedArray);
  };

  const recurseOBj = (obj) => {
    const newObj = cloneInterface(obj, actualDepth);
    error = newObj.error ? newObj.error : error;
    clonedArray.push(newObj.yourClone);
  };

  for (let i = 0; i < element.length; i++) {
    const status = analyzeArray(element[i], actualDepth);

    if (status.error) {
      error = status.error;
      break;
    }

    if (status.type === "array") {
      recurse = true;
      recurseArray(element[i]);
    } else if (status.type === "object") {
      recurse = true;
      recurseOBj(element[i]);
    } else if (status.type === "primitive") {
      recurse = false;
      clonedArray.push(element[i]);
    }
  }

  return { error, recurse, clonedArray, elementToRecurse };
}

// Receives an object or an array and clones it recursively
export function cloneInterface(element, depth = 0) {
  const limitKeys = 100;
  let clonedObj = {};
  let yourClonedArray = null;

  let error = false;
  const actualDepth = depth + 1;

  // Handles recursion specifically for objects
  const recursiveObj = (newElement, newKey) => {
    const res = cloneInterface(newElement, actualDepth);
    error = res.error ? res.error : error;
    clonedObj[newKey] = res.yourClone;
  };

  // cloneInterface requires a valid element to proceed
  if (element === undefined) {
    errorHandler(caller, noElementMsgg);
    return { error };
  }

  // If we are in a recursion, we check the depth limit
  const stop = isTooDeep(actualDepth);

  if (stop) return { error: true, yourClone: null };

  // If the element is an array, we use a specific function to handle it
  if (Array.isArray(element)) {
    const res = cloneArray(element, actualDepth);
    res.recurse ? cloneArray(element, actualDepth) : null;
    error = res.error ? true : error;
    yourClonedArray = res.clonedArray ? res.clonedArray : yourClonedArray;
  }

  if (error) return { error };

  // If the array was successfully cloned, return it
  if (yourClonedArray) return { error, yourClonedArray };

  // If the element is not an array, we treat it as an object

  if (typeChecker(element, "null")) return { error: false, yourClone: null };

  const keys = Object.keys(element);

  if (keys.length > limitKeys) {
    errorHandler(caller, tooManyKeys);
  }

  for (let i = 0; i < keys.length; i++) {
    if (Array.isArray(element[keys[i]])) {
      const res = cloneInterface(element[keys[i]], actualDepth);
      error = res.error ? res.error : error;
      clonedObj[keys[i]] = res.yourClonedArray;
      continue;
    }

    if (error) return { error };

    const isAnObj = typeChecker(element[keys[i]], "object");
    if (isAnObj) {
      recursiveObj(element[keys[i]], keys[i]);
    } else {
      clonedObj[keys[i]] = element[keys[i]];
    }
  }

  return { error, yourClone: clonedObj };
}
