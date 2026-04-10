import bundle from "shared";
import fetchUnique from "../../api/handlers/fetchUnique";
const {
  usernameValidator,
  acceptOnly,
  matcher,
  passwordValidator,
  emailValidator,
} = bundle;

export const usernameOnBlur = async (string, id) => {
  const data = { key: id, value: string };
  const isUnique = await fetchUnique(data);
  if (isUnique.error) return { error: true, errorMsg: "notUnique" };
  return usernameValidator(string);
};

export const pswOnBlur = (string, id) => {
  const isValid = passwordValidator(string);
  if (isValid.error) {
    const errorMsg = isValid.errorArray[0];
    return { error: true, errorMsg };
  }
  return { error: false };
};

export const emailOnBlur = async (string, id) => {
  const data = { key: id, value: string };
  const isUnique = await fetchUnique(data);
  if (isUnique.error) return { error: true, errorMsg: "notUnique" };

  const isValid = emailValidator(string);
  if (isValid.error) {
    const errorMsg = isValid.errorArray[0];
    return { error: true, errorMsg };
  }
  return { error: false };
};

export const usernameOnChange = (string, id) => {
  const allowedCharacters = "a-zA-Z0-9-_.";
  const validChar = acceptOnly(string, allowedCharacters);
  return validChar
    ? { error: false }
    : { error: true, errorMsg: "carattere invalido" };
};

export const emailMatch = () => {
  const match = matcher("email", "confirmEmail");
  return { error: !match, errorMsg: "don't match" };
};

export const pswMatch = () => {
  const match = matcher("password", "confirmPassword");
  return { error: !match, errorMsg: "don't match" };
};
