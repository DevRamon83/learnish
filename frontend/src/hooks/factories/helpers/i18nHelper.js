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

export const inputGroupsInterfaceI18n = (groupsConfig, strings) => {
  for (let key in groupsConfig) {
    setTitleInConfigGroup(groupsConfig[key], strings, key);
    setLabelsInConfigGroup(groupsConfig[key], strings);
  }

  return groupsConfig;
};

const labelTextHandler = (selectsConfig, key, strings) => {
  selectsConfig[key].config = { id: selectsConfig[key].id };
  if (selectsConfig[key].labelText) {
    const string = strings[key].labelText;
    selectsConfig[key].config.labelText = string;
  }
};

const optionsLabelHandler = (selectsConfig, key, strings) => {
  const { options } = selectsConfig[key];
  const labelsArray = [];
  for (let i = 0; i < options.length; i++) {
    const string = strings[key].options[options[i]];
    labelsArray.push(string);
  }

  selectsConfig[key].config.options = selectsConfig[key].options;
  selectsConfig[key].config.labels = labelsArray;
};
export const selectsInterfaceI18n = (selectsConfig, strings) => {
  const keys = Object.keys(selectsConfig);
  for (let i = 0; i < keys.length; i++) {
    labelTextHandler(selectsConfig, keys[i], strings);
    optionsLabelHandler(selectsConfig, keys[i], strings);
  }
  return selectsConfig;
};
