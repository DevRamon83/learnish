import {
  emailValidator,
  passwordValidator,
  usernameValidator,
} from "ramon-vanilla";
import bundle from "../../../shared/index.js";
const authValidator = (caller, data) => {
  const { username, email, confirmEmail, password } = data;

  const validUser = usernameValidator(username);
  if (validUser.error) return validUser.errorArray;

  const isLogin = caller === "login";

  const validEmail = !isLogin && emailValidator(email);

  if (validEmail.error) return validEmail.errorArray;

  const matchFail = "match failed";

  if (!isLogin && email !== confirmEmail) return "email " + matchFail;

  const validPassword = passwordValidator(password);

  if (validPassword.error) return validPassword.errorArray;

  const { confirmPassword, accountTypes, privacy, tos } = data;

  if (!isLogin && password !== confirmPassword) return "password " + matchFail;

  const { constants } = bundle;
  const normalizeAccount = accountTypes.trim().toLowerCase();
  if (!isLogin && !constants.accountTypes.includes(normalizeAccount))
    return "invalid account";

  if (!isLogin && privacy !== constants.currentPrivacy)
    return "invalid privacy policy";

  if (!isLogin && tos !== constants.currentTos) return "invalid tos";

  return false;
};

export default authValidator;
