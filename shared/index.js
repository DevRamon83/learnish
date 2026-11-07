import constants from "./constants/index.js";
import langs from "./languages/index.js";
import dialogues from "./dialogues/index.js";
import {
  acceptOnly,
  typeChecker,
  usernameValidator,
  matcher,
  passwordValidator,
  emailValidator,
} from "ramon-vanilla";
import validators from "./validators/index.js";
import helpers from "./helpers/index.js";

const bundle = {
  langs,
  constants,
  typeChecker,
  acceptOnly,
  matcher,
  usernameValidator,
  validators,
  passwordValidator,
  emailValidator,
  helpers,
  dialogues,
};

export default bundle;
