import { syncLang } from "../syncLang";

const blueprint = {
  id: null,
  type: "number",
  placeholder: null,
  label: null,
  required: true,
};

const configBasicArray = (array) => {
  const dataContract = [];

  array.forEach((element) => {
    const basic = { ...blueprint };
    basic.id = element;
    dataContract.push(basic);
  });

  return dataContract;
};

const contractConfigBuilder = (strings, array) => {
  const basicArray = configBasicArray(array);

  syncLang(basicArray, strings);

  return {
    configArray: basicArray,
    isAsync: false,
    i18n: true,
  };
};

export default contractConfigBuilder;
