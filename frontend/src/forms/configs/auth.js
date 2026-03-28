import bundle from "shared";
import { usernameOnBlur, usernameOnChange } from "../funcs/signup";

const username = {
  id: "username",
  type: "text",
  placeholder: null,
  label: null,
  required: true,
  onChange: null,
  onBlur: null,
};

const email = {
  id: "email",
  type: "email",
  placeholder: null,
  label: null,
  required: true,
};

const confirmEmail = {
  id: "confirmEmail",
  type: "email",
  placeholder: null,
  label: null,
  required: true,
};

const password = {
  id: "password",
  type: "password",
  placeholder: null,
  label: null,
  required: true,
};

const confirmPassword = {
  id: "confirmPassword",
  type: "password",
  placeholder: null,
  label: null,
  required: true,
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

const authConfigBuilder = (strings, process) => {
  username.label = strings.labels.username;
  email.label = strings.labels.email;
  confirmEmail.label = strings.labels.confirmEmail;
  password.label = strings.labels.password;
  confirmPassword.label = strings.labels.confirmPassword;
  username.placeholder = strings.placeholders.username;
  email.placeholder = strings.placeholders.email;
  confirmEmail.placeholder = strings.placeholders.confirmEmail;
  password.placeholder = strings.placeholders.password;
  confirmPassword.placeholder = strings.placeholders.confirmPassword;

  let array = [];

  if (process === "signup") {
    username.onChange = usernameOnChange;
    username.onBlur = usernameOnBlur;
    array = [
      username,
      email,
      confirmEmail,
      password,
      confirmPassword,
      privacy,
      tos,
    ];
  }

  if (process === "login") {
    username.onChange = null;
    username.onBlur = null;
    array = [username, password];
  }

  return {
    configArray: array,
    isAsync: false,
    i18n: true,
  };
};

export default authConfigBuilder;
