const defineErrorMsg = (errorObj) => {
  if (errorObj.errorArray) return errorObj.errorArray[0];
  return errorObj.errorMsg;
};

const authErrorHandler = (input) => {
  if (input.onChange?.error) return defineErrorMsg(input.onChange);

  return null;
};

export default authErrorHandler;
