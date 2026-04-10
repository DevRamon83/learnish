export const idDefiner = (data) => {
  const defineID = data.config.id || data.config.name;
  const formContainer = `form__input-${defineID}`;
  const inputContainer = `form__inputContainer-${defineID}`;
  return { formContainer, inputContainer };
};

export const uiDefiner = (error) => {
  const inputClass = error ? "form__input-error" : "form__input-valid";
  const iconSrc = error ? "/invalid.svg" : "/valid.svg";
  return { inputClass, iconSrc };
};

export const getErrorMsg = (input) => {
  if (input?.error) {
    const error = input;
    return error.errorMsg || error.errorArray[0];
  }

  return null;
};

export const promiseHandler = (result, setter) => {
  result.then((resolvedValue) => {
    const onBlur = getErrorMsg(resolvedValue);
    const { inputClass, iconSrc } = uiDefiner(onBlur);
    setter(onBlur, iconSrc, inputClass);
  });
};

export const INITIAL_UI_STATE = {
  error: null,
  inputClass: "form__input-signup",
  iconSrc: null,
};
