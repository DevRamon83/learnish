const formatFormState = (schemas) => {
  const objConfig = {};

  for (let i = 0; i < schemas.length; i++) {
    objConfig[schemas[i].id] = { config: schemas[i] };
  }

  return objConfig;
};

export const fieldsConfigHelper = (customLogic) => {
  const { inputFieldsConfig } = customLogic;
  const { originalObjects } = inputFieldsConfig;
  const schemas = [];

  for (let i = 0; i < originalObjects.length; i++) {
    schemas.push(originalObjects[i]);
  }

  const formConfigurator = formatFormState(schemas);

  return formConfigurator;
};
