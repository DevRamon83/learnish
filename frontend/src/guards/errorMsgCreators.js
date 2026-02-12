export const errorHandler = (text) => {
  console.error(text);
  return true;
};

export const error001a = (caller, position, targetIndex) => {
  return `[Guard]: ${caller} has an invalid index at position ${position} 
  (Value: ${targetIndex})`;
};

export const error002a = (caller, key) => {
  return `[Guard]: ${caller}Map is missing the function for key: "${key}"`;
};
