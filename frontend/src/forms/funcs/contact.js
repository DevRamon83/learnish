import bundle from "shared";
const { emailValidator } = bundle;

export const emailOnBlur = async (string, id) => {
  const isValid = emailValidator(string);
  if (isValid.error) {
    const errorMsg = isValid.errorArray[0];
    return { error: true, errorMsg };
  }
  return { error: false };
};
