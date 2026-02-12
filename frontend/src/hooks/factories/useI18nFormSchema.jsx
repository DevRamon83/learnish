import { useLang } from "../useLang";

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
const factoryRunner = (factoryConfig) => {
  const { targetKeys, formSchema, addThisKeys, strings } = factoryConfig;

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
const buildFormSchema = (factoryConfig, strings) => {
  const { targetKeys, originalObjects, addThisKeys } = factoryConfig;
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

export const useI18nFormSchema = (factoryConfig) => {
  const { stringsAddress } = factoryConfig;
  const strings = useLang(stringsAddress);

  return useMemo(() => {
    if (!strings || Object.keys(strings).length === 0) return null;

    const configObj = buildFormSchema(factoryConfig, strings);

    return { ...configObj };
  }, [strings, factoryConfig]);
};
