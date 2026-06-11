import bundle from "shared";
const { constants } = bundle;
import { pswOnBlur } from "../funcs/auth";
import { syncLang } from "../syncLang";

const password = {
  id: "password",
  type: "password",
  placeholder: null,
  label: null,
  required: true,
  onBlur: pswOnBlur,
};

const newPassword = {
  id: "newPassword",
  type: "password",
  placeholder: null,
  label: null,
  required: true,
  onBlur: pswOnBlur,
};

const confirmNewPassword = {
  id: "confirmNewPassword",
  type: "password",
  placeholder: null,
  label: null,
  required: true,
  onBlur: pswOnBlur,
};

const pswArray = [password, newPassword, confirmNewPassword];

const newPswConfigBuilder = (strings, process) => {
  syncLang(pswArray, strings);

  return {
    configArray: [...pswArray],
    isAsync: false,
    i18n: true,
  };
};

export default newPswConfigBuilder;
