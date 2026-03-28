const defineErrorMsg = (errorObj) => {
  if (errorObj.errorArray) return errorObj.errorArray[0];
  return errorObj.errorMsg;
};

export const onChangeErrorGenerator = (input) => {
  if (input.onChange?.error) return defineErrorMsg(input.onChange);

  return null;
};
