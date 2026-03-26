import {
  emailValidator,
  passwordValidator,
  usernameValidator,
} from "ramon-vanilla";
import bundle from "../../../shared/index.js";
const authValidator = (caller, data) => {
  const { username, email, confirmEmail } = data;
  const validUser = usernameValidator(username);
  if (validUser.error) return validUser.errorArray;

  const isLogin = caller === "login";

  const validEmail = !isLogin && emailValidator(email);

  if (validEmail.error) return validEmail.errorArray;

  const matchFail = "match failed";

  if (!isLogin && email !== confirmEmail) return "email " + matchFail;

  const { password, confirmPassword, privacy, tos } = data;

  const validPassword = passwordValidator(password);

  if (validPassword.error) return validPassword.errorArray;

  if (!isLogin && password !== confirmPassword) return "password " + matchFail;

  const { constants } = bundle;

  if (!isLogin && privacy !== constants.currentPrivacy)
    return "invalid privacy policy";

  if (!isLogin && tos !== constants.currentTos) return "invalid tos";

  return false;
};

export default authValidator;
