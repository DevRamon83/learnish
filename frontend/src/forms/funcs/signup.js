import { acceptOnly, usernameValidator } from "ramon-vanilla";
export const usernameOnBlur = (string, id) => {
  return usernameValidator(string);
};

export const usernameOnChange = (string, id) => {
  const allowedCharacters = "a-zA-Z0-9-_.";
  const validChar = acceptOnly(string, allowedCharacters);
  return validChar
    ? { error: false }
    : { error: true, errorMsg: "carattere invalido" };
};
