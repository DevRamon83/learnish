import constants from "./constants/index.js";
import langs from "./languages/index.js";
import { acceptOnly, usernameValidator } from "ramon-vanilla";
import validators from "./validators/index.js";

const bundle = {
  langs,
  constants,
  acceptOnly,
  usernameValidator,
  validators,
};

export default bundle;
