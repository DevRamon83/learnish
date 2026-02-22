import { typeChecker } from "../validators/atomicValidators";
import { analyzeArray } from "./analyzeArray";

const caller = ["CloneInterface"];
const noElementMsgg = ": you must send an element to clone";

export const errorHandler = (caller, message) => {
  console.error(caller, message);
};

function cloneArray(element) {
  let recurse = false;
  let error = false;
  let clonedArray = [];
  let elementToRecurse = null;

  // Push cloning result to the array
  const processArray = (array) => {
    const newArray = cloneArray(array);
    error = newArray.error ? newArray.error : error;
    clonedArray.push(newArray.clonedArray);
  };

  // Push cloning result to the array
  const processObj = (obj) => {
    const newObj = cloneInterface(obj);
    error = newObj.error ? newObj.error : error;
    clonedArray.push(newObj.yourClone);
  };

  for (let i = 0; i < element.length; i++) {
    const arrayType = analyzeArray(element[i]);

    let recurse = true;

    // Determine whether to recurse based on the arrayType
    if (arrayType === "array") processArray(element[i]);
    if (arrayType === "object") processObj(element[i]);

    if (arrayType === "primitive") {
      recurse = false;
      clonedArray.push(element[i]);
    }
  }

  return { error, recurse, clonedArray, elementToRecurse };
}

// Receives an object or an array and clones it recursively
// Standard cloning methods aren't suitable here
// as this function needs to handle function cloning.
export function cloneInterface(element) {
  let clonedObj = {};
  let yourClonedArray = null;

  let error = false;

  // cloneInterface requires a valid element to proceed
  if (element === undefined) {
    errorHandler(caller, noElementMsgg);
    return { error };
  }

  // Handles recursion specifically for objects
  const recursiveObj = (newElement, newKey) => {
    const res = cloneInterface(newElement);
    error = res.error ? res.error : error;
    clonedObj[newKey] = res.yourClone;
  };

  // If the element is an array, we use a specific function to handle it
  if (Array.isArray(element)) {
    const res = cloneArray(element);

    // Execute recursive path only when necessary to handle nested objects/arrays
    res.recurse && cloneArray(element);
    error = res.error ? true : error;
    yourClonedArray = res.clonedArray ? res.clonedArray : yourClonedArray;
  }

  if (error) return { error };

  // If the array was successfully cloned, return it
  if (yourClonedArray) return { error, yourClonedArray };

  // Null objects are valid during the recursion process
  if (typeChecker(element, "null")) return { error: false, yourClone: null };

  // If the element is not an array, we treat it as an object
  const keys = Object.keys(element);

  for (let i = 0; i < keys.length; i++) {
    if (Array.isArray(element[keys[i]])) {
      const res = cloneInterface(element[keys[i]]);
      error = res.error ? res.error : error;
      clonedObj[keys[i]] = res.yourClonedArray;
      continue;
    }

    if (error) return { error };

    // Flat objects are cloned, otherwise recurse
    const isAnObj = typeChecker(element[keys[i]], "object");
    if (isAnObj) {
      recursiveObj(element[keys[i]], keys[i]);
    } else {
      clonedObj[keys[i]] = element[keys[i]];
    }
  }

  return { error, yourClone: clonedObj };
}
