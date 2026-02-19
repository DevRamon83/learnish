import { i18nAddresses } from "../../constants/i18nAddresses";

export const inputFieldKeyToAdd = ["label", "placeholder"];

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
  address: i18nAddresses.auth,
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
