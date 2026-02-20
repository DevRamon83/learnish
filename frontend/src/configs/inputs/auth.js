import { i18nAddresses } from "../../constants/i18nAddresses";

export const inputFieldKeyToAdd = ["label", "placeholder"];
export const inputTextareaKeyToAdd = ["textareaLabel", "charLabel"];
export const address = i18nAddresses.auth;

export const signupInputFields = {
  username: {
    id: "username",
    type: "text",
    autoComplete: "username",
  },
  email: {
    id: "email",
    type: "email",
    autoComplete: "email",
  },
  password: {
    id: "password",
    type: "password",
    autoComplete: "new-password",
  },
  confirmPassword: {
    id: "confirmPassword",
    type: "password",
    autoComplete: "new-password",
  },
  keyToAdd: inputFieldKeyToAdd,
};

export const signupInputGroups = {
  privacy: {
    options: { ids: ["privacy"] },
    config: {
      type: "checkbox",
      classContainer: "",
      classLabel: "",
      title: false,
    },
  },
  tos: {
    options: { ids: ["tos"] },
    config: {
      type: "radio",
      name: "tos",
      classContainer: "",
      classLabel: "",
      title: false,
    },
  },
};

export const signupInputSelects = {
  accountType: {
    options: ["teacher", "student"],
    id: "accountType",
    labelText: true,
  },
};

export const signupInputTextareas = {
  test: {
    id: "test",
    charLabel: "boh",
    rows: 10,
    cols: 5,
    maxChars: 500,
    textClass: "",
  },
  keyToAdd: inputTextareaKeyToAdd,
};
