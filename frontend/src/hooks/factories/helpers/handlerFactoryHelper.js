import { mapNIndexFinder } from "../../../helpers/formFactoryHelper";

const customLogicHandler = (
  funcsMap,
  indexes,
  SSOT,
  fieldsConfig,
  innerKey,
) => {
  for (let i = 0; i < indexes.length; i++) {
    const targetId = SSOT[indexes[i]];
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
  customLogicHandler(map, indexes, customLogic.SSOT, fieldsConfig, caller);
};

export const executeChangeLogic = (id, customLogic, value) => {
  const { onChangeLogicMap } = customLogic;
  const myFunc = onChangeLogicMap[id];
  myFunc(value);
};

export const onChangeInterface = (customLogic, changeHandler, fieldsConfig) => {
  const { SSOT, states } = customLogic;
  if (customLogic.controlledInputs) {
    for (let i = 0; i < states.length; i++) {
      const targetId = SSOT[states[i]];
      fieldsConfig[targetId].handlers = { onChange: changeHandler };
    }
  }
};
