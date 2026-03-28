import constants from "./constants/index.js";
import langs from "./languages/index.js";
import {
  acceptOnly,
  usernameValidator,
  matcher,
  passwordValidator,
  emailValidator,
} from "ramon-vanilla";
import validators from "./validators/index.js";

const bundle = {
  langs,
  constants,
  acceptOnly,
  matcher,
  usernameValidator,
  validators,
  passwordValidator,
  emailValidator,
};

export default bundle;
