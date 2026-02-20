const formatFormState = (schemas) => {
  const objConfig = {};

  for (let i = 0; i < schemas.length; i++) {
    objConfig[schemas[i].id] = { config: schemas[i] };
  }

  return objConfig;
};

export const configHelper = (customLogic, caller) => {
  const objconfigs = customLogic[caller];

  if (!objconfigs) return {};
  const { originalObjects } = objconfigs;
  const schemas = [];

  for (let i = 0; i < originalObjects.length; i++) {
    schemas.push(originalObjects[i]);
  }

  const formConfigurator = formatFormState(schemas);

  return formConfigurator;
};

const populateConfig = (configuration) => {
  const { addThisKeys, strings, targetKey, ssot } = configuration;

  addThisKeys.forEach((key) => {
    const stringKey = key + "s";

    ssot.config[key] = strings[stringKey][targetKey];
  });
};

export const interfaceI18n = (elements, config, strings) => {
  const { targetKeys, addThisKeys } = config;

  for (let i = 0; i < targetKeys.length; i++) {
    const configuration = {
      targetKey: targetKeys[i],
      strings,
      addThisKeys,
      ssot: elements[targetKeys[i]],
    };
    populateConfig(configuration);
  }
};
