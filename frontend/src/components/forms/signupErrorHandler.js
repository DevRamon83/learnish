const defineErrorMsg = (errorObj) => {
  if (errorObj.errorArray) return errorObj.errorArray[0];
  return errorObj.errorMsg;
};

export const errorGenerator = (input) => {
  if (input.onChange?.error) return defineErrorMsg(input.onChange);
  if (input.onBlur?.error) return defineErrorMsg(input.onBlur);
  if (input.onFocus?.error) return defineErrorMsg(input.onFocus);
  if (input.onKeyDown?.error) return defineErrorMsg(input.onKeyDown);

  return null;
};
