import { i18nAddresses } from "../../constants/i18nAddresses";

export const inputFieldKeyToAdd = ["label", "placeholder"];

export const signupInputField = {
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
  address: i18nAddresses.auth,
};

export const signupInputGroup = {
  privacy: {
    options: { ids: ["privacy"] },
    config: {
      type: "radio",
      name: "checkbox",
      classContainer: "",
      classLabel: "",
      title: false,
    },
  },
  ToS: {
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
