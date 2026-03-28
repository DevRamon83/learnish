import bundle from "shared";
import fetchUnique from "../../api/handlers.js/fetchUnique";
const { usernameValidator, acceptOnly } = bundle;

export const usernameOnBlur = async (string, id) => {
  const data = { key: id, value: string };
  const isUnique = await fetchUnique(data);
  if (isUnique.error) return { error: true, errorMsg: "notUnique" };
  return usernameValidator(string);
};

export const usernameOnChange = (string, id) => {
  const allowedCharacters = "a-zA-Z0-9-_.";
  const validChar = acceptOnly(string, allowedCharacters);
  return validChar
    ? { error: false }
    : { error: true, errorMsg: "carattere invalido" };
};
