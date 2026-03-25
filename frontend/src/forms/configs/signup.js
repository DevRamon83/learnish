import { usernameOnBlur, usernameOnChange } from "../funcs/signup";

const username = {
  id: "username",
  type: "text",
  placeholder: null,
  label: null,
  required: false,
  onChange: usernameOnChange,
  onBlur: false,
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

const privacy = {
  name: "privacy",
  type: "radio",
  options: {
    ids: ["privacyPolicy"],
    labels: ["ho letto e compreso la privacy policy"],
  },
  required: true,
};

const tos = {
  name: "tos",
  type: "radio",
  options: {
    ids: ["tosPolicy"],
    labels: ["ho letto e compreso le condizioni generali di contratto"],
  },
  required: true,
};

const accountTypes = {
  id: "accountTypes",
  type: "select",
  options: ["teatcher", "student"],
  labels: ["insegnante", "studente"],
  label: "Scegli il tippo di account",
  required: true,
};

export const signupConfigBuilder = (strings) => {
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

  const signup = [
    username,
    email,
    confirmEmail,
    password,
    confirmPassword,
    privacy,
    tos,
    accountTypes,
  ];

  return {
    configArray: signup,
    isAsync: false,
    i18n: true,
  };
};
