import constants from "./constants/index.js";
import langs from "./languages/index.js";
import { acceptOnly, usernameValidator } from "ramon-vanilla";

const bundle = {
  langs,
  constants,
  acceptOnly,
  usernameValidator,
};

export default bundle;
