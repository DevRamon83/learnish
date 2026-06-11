import bundle from "shared";
const { passwordValidator } = bundle;

export const validateText = (data) => {
  const keys = Object.keys(data);
  if (keys.length !== 1) {
    return { error: true, errorMsg: "invalidText" };
  }

  if (data[keys].trim() === "") {
    return { error: true, errorMsg: "invalidText" };
  }

  return { error: false };
};

export const validatePlan = (data, user) => {
  const isValidText = validateText(data);

  if (isValidText.error) {
    return { error: true, errorMsg: isValidText.errorMsg };
  }

  if (data.plan === user.plan) {
    return { error: true, errorMsg: "equal" };
  }

  return { error: false };
};

export const validatePic = (file) => {
  if (!file || file.size === 0) {
    return { error: true, errorMsg: "noFile" };
  }

  if (file.size > 2 * 1024 * 1024) {
    return { error: true, errorMsg: "tooBig" };
  }

  return { error: false };
};

export const validatePsw = (data) => {
  const keys = Object.keys(data);
  let error = false;
  let errorMsg = "";

  if (keys.length === 0) {
    return { error: true };
  }

  keys.forEach((key) => {
    const isValid = passwordValidator(data[key]);
    if (isValid.error) {
      error = true;
      errorMsg = isValid.errorMsg[0];
    }
  });

  if (data.newPassword.trim() !== data.confirmNewPassword.trim()) {
    error = true;
    errorMsg = "unmatched";
  }

  return { error, errorMsg };
};
