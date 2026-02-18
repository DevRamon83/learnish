const populateField = (configuration) => {
  const { addThisKeys, strings, targetKey, field } = configuration;

  addThisKeys.forEach((key) => {
    const stringKey = key + "s";
    field.config[key] = strings[stringKey][targetKey];
  });
};

export const fieldsInterfaceI18n = (fields, inputFieldsConfig, strings) => {
  const { targetKeys, addThisKeys } = inputFieldsConfig;

  for (let i = 0; i < targetKeys.length; i++) {
    const configuration = {
      targetKey: targetKeys[i],
      strings,
      addThisKeys,
      field: fields[targetKeys[i]],
    };
    populateField(configuration);
  }
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

export const inputGroupInterfaceI18n = (groupConfig, strings) => {
  for (let key in groupConfig) {
    setTitleInConfigGroup(groupConfig[key], strings, key);
    setLabelsInConfigGroup(groupConfig[key], strings);
  }

  return groupConfig;
};
