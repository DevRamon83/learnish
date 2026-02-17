import { useMemo } from "react";
import { useLang } from "../useLang";
import bundle from "../../../../shared";

const cloneInterface = bundle.utils.cloneInterface;
// InputField.jsx consumes props calling "config" key
const formatFormState = (schemas) => {
  const objConfig = {};

  for (let i = 0; i < schemas.length; i++) {
    objConfig[schemas[i].id] = { config: schemas[i] };
  }

  return objConfig;
};

// Dynamically creates keys and values for the configuration
const populateObjConfig = (strings, inputName, schema, key) => {
  const firstKey = key + "s";
  schema[key] = strings[firstKey][inputName];
};

// Iterates through keys to populate the configuration object
const inputFactory = (configuration) => {
  const { targetKey, schema, addThisKeys, strings } = configuration;

  for (let i = 0; i < addThisKeys.length; i++) {
    populateObjConfig(strings, targetKey, schema, addThisKeys[i]);
  }
};

// Runs the factory for each object representing an input configuration
const factoryRunner = (inputFieldsConfig) => {
  const { targetKeys, formSchema, addThisKeys, strings } = inputFieldsConfig;

  for (let i = 0; i < formSchema.length; i++) {
    const configuration = {
      targetKey: targetKeys[i],
      schema: formSchema[i],
      addThisKeys,
      strings,
    };
    inputFactory(configuration);
  }
};

// Uses a copy of the objects to avoid mutating the originals,
// returns the entire obj config which we will consume in the component
const buildFormSchema = (inputFieldsConfig, strings) => {
  const { targetKeys, originalObjects, addThisKeys } = inputFieldsConfig;
  const schemas = [];

  for (let i = 0; i < originalObjects.length; i++) {
    schemas.push({ ...originalObjects[i] });
  }

  const configuration = {
    targetKeys,
    formSchema: schemas,
    addThisKeys,
    strings,
  };

  factoryRunner(configuration);
  const formConfigurator = formatFormState(schemas);

  return formConfigurator;
};

const setTitleInConfigGroup = (obj, strings, key) => {
  const title = obj.config.title;
  const tag = key + "Title";
  if (title) {
    obj.config.title = strings[tag];
  }
  return obj;
};

const setLabelsInConfigGroup = (obj, strings) => {
  const ids = obj.options.ids;
  const labelsArray = [];

  ids.forEach((id) => {
    const key = id + "Label";
    labelsArray.push(strings[key]);
  });
  obj.options.labels = labelsArray;
};

const inputGroupSetter = (groupConfig, strings) => {
  for (let key in groupConfig) {
    setTitleInConfigGroup(groupConfig[key], strings, key);
    setLabelsInConfigGroup(groupConfig[key], strings);
  }

  return groupConfig;
};

export const useI18nFormSchema = (customLogic) => {
  const { inputFieldsConfig, inputGroup } = customLogic;
  const { stringsAddress } = inputFieldsConfig;
  const strings = useLang(stringsAddress);

  return useMemo(() => {
    if (!strings || Object.keys(strings).length === 0) return null;

    const workOnConfig = buildFormSchema(inputFieldsConfig, strings);
    const fieldClone = cloneInterface(workOnConfig);
    if (fieldClone.error || !fieldClone.yourClone) return;
    const newFieldsConfig = fieldClone.yourClone;

    let newInputGroup = null;

    if (inputGroup) {
      const inputClone = cloneInterface(customLogic.groupConfig);
      newInputGroup = inputClone.error
        ? null
        : inputGroupSetter(inputClone.yourClone, strings);
    }

    return { newFieldsConfig, newInputGroup };
  }, [strings, inputFieldsConfig, inputGroup]);
};
