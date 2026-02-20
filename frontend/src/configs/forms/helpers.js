const getBoilerplate = () => {
  return {
    onBlurFuncs: {},
    onBlurIndexes: [],
    onFocusFuncs: {},
    onFocusIndexes: [],
    onKeyDownFuncs: {},
    onKeyDownIndexes: [],
  };
};

const populateBoilerplate = (caller, eventObj, boilerplate) => {
  const indexKey = caller + "Indexes";
  const mapKey = caller + "Funcs";
  boilerplate[indexKey] = eventObj[indexKey];
  boilerplate[mapKey] = eventObj[mapKey];
};

export const eventsHandler = (eventArray, eventObj) => {
  const boilerplate = getBoilerplate();
  if (eventArray.length === 0) return boilerplate;

  for (let i = 0; i < eventArray.length; i++) {
    populateBoilerplate(eventArray[i], eventObj, boilerplate);
  }

  return boilerplate;
};
