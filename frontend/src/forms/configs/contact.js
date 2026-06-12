import { emailOnBlur } from "../funcs/contact";
import { syncLang } from "../syncLang";

const email = {
  id: "email",
  type: "email",
  placeholder: null,
  label: null,
  required: true,
  onBlur: emailOnBlur,
};

const message = {
  id: "message",
  type: "textarea",
  placeholder: null,
  rows: 10,
  cols: 70,
  label: null,
  required: true,
  maxWords: 500,
  onChange: true,
  counterLabel: null,
};

const dataMsg = [email, message];

const contactConfigBuilder = (strings) => {
  syncLang(dataMsg, strings);
  message.counterLabel = strings.message.counterLabel;

  return {
    configArray: dataMsg,
    isAsync: false,
    i18n: true,
  };
};

export default contactConfigBuilder;
