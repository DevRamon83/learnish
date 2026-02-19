const inizializeField = (SSOT, indexes, initial) => {
  const obj = {};
  indexes.forEach((value) => {
    const key = SSOT[value];
    obj[key] = initial;
  });

  return obj;
};

const inizializeCheckbox = (state, initial) => {
  const obj = {};
  state.forEach((value) => {
    obj[value] = initial;
  });

  return obj;
};

const initializeGroups = (customLogic, initial) => {
  const { groupsConfig, groupsSSOT } = customLogic;
  const obj = {};
  groupsSSOT.forEach((key) => {
    if (groupsConfig[key].config.type === "radio") {
      obj[key] = initial;
    } else {
      const states = groupsConfig[key].options.ids;
      console.log("states ", groupsConfig[key].options.ids);
      obj[key] = { ...inizializeCheckbox(states, false) };
    }
  });

  return obj;
};

export const buildDispatcher = (controlled, customLogic, caller, initial) => {
  if (!controlled) return {};

  if (caller === "fields") {
    const { fieldsSSOT, fieldsState } = customLogic;
    return inizializeField(fieldsSSOT, fieldsState, initial);
  } else {
    return initializeGroups(customLogic, initial);
  }
};
