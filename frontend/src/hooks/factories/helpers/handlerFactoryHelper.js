import { mapNIndexFinder } from "../../../helpers/formFactoryHelper";

const customLogicHandler = (
  funcsMap,
  indexes,
  fieldsSSOT,
  fieldsConfig,
  innerKey,
) => {
  for (let i = 0; i < indexes.length; i++) {
    const targetId = fieldsSSOT[indexes[i]];
    fieldsConfig[targetId].handlers[innerKey] = funcsMap[targetId];
  }
};

export const customLogicHandlerInterface = (
  caller,
  customLogic,
  fieldsConfig,
) => {
  const { map, indexes } = mapNIndexFinder(caller, customLogic);
  if (indexes.length === 0) return;
  customLogicHandler(
    map,
    indexes,
    customLogic.fieldsSSOT,
    fieldsConfig,
    caller,
  );
};

export const executeOnChangeLogic = (id, map, value) => {
  if (!map || Object.keys(map).length === 0) return;
  const myFunc = map[id];
  myFunc(value);
};

export const onChangeInterface = (
  SSOT,
  states,
  controlled,
  changeHandler,
  fieldsConfig,
) => {
  if (controlled) {
    for (let i = 0; i < states.length; i++) {
      const targetId = SSOT[states[i]];
      fieldsConfig[targetId].handlers = { onChange: changeHandler };
    }
  }
};
