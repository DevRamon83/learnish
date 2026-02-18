export const mapNIndexFinder = (caller, customLogic) => {
  let indexes;
  let map;
  if (caller === "onChangeMap") {
    indexes = customLogic.states;
    map = customLogic.onChangeLogicMap;
  } else {
    const indexName = caller + "Indexes";
    const mapName = caller + "Funcs";
    indexes = customLogic[indexName];
    map = customLogic[mapName];
  }
  return { map, indexes };
};
