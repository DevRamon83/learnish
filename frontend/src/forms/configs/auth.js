import bundle from "shared";
import {
  emailMatch,
  emailOnBlur,
  pswMatch,
  pswOnBlur,
  usernameOnBlur,
  usernameOnChange,
} from "../funcs/auth";
import { syncLang } from "../syncLang";

const username = {
  id: "username",
  type: "text",
  placeholder: null,
  label: null,
  required: true,
  onChange: usernameOnChange,
  onBlur: null,
};

const email = {
  id: "email",
  type: "email",
  placeholder: null,
  label: null,
  required: true,
  onBlur: emailOnBlur,
};

const confirmEmail = {
  id: "confirmEmail",
  type: "email",
  placeholder: null,
  label: null,
  required: true,
  onBlur: emailMatch,
};

const password = {
  id: "password",
  type: "password",
  placeholder: null,
  label: null,
  required: true,
  onBlur: pswOnBlur,
};

const confirmPassword = {
  id: "confirmPassword",
  type: "password",
  placeholder: null,
  label: null,
  required: true,
  onBlur: pswMatch,
};

const { constants } = bundle;

const privacy = {
  name: "privacy",
  type: "radio",
  options: {
    ids: [constants.currentPrivacy],
    labels: ["ho letto e compreso la privacy policy"],
  },
  required: true,
};

const tos = {
  name: "tos",
  type: "radio",
  options: {
    ids: [constants.currentTos],
    labels: ["ho letto e compreso le condizioni generali di contratto"],
  },
  required: true,
};

const loginElements = [username, password];
const signupElements = [email, confirmEmail, confirmPassword];

const authConfigBuilder = (strings, process) => {
  syncLang(loginElements, strings);
  let array = [];

  if (process === "signup") {
    syncLang(signupElements, strings);
    username.onBlur = usernameOnBlur;
    array = [...loginElements, ...signupElements, privacy, tos];
  }

  if (process === "login") {
    username.onBlur = null;
    array = [...loginElements];
  }

  return {
    configArray: array,
    isAsync: false,
    i18n: true,
  };
};

export default authConfigBuilder;
