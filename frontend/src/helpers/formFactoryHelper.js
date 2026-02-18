export const mapNIndexFinder = (caller, customLogic) => {
  let indexes;
  let map;
  if (caller === "onChangeMap") {
    indexes = customLogic.fieldsState;
    map = customLogic.onChangeFieldsMap;
  } else {
    const indexName = caller + "Indexes";
    const mapName = caller + "Funcs";
    indexes = customLogic[indexName];
    map = customLogic[mapName];
  }
  return { map, indexes };
};
