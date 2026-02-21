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

const customLogicHandlerInterface = (caller, customLogic, fieldsConfig) => {
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

export const customLogicDispatcher = (customLogic, configs) => {
  const { configFields, configTextareas } = configs;
  customLogicHandlerInterface("onBlur", customLogic, configFields);
  customLogicHandlerInterface("onBlur", customLogic, configTextareas);

  customLogicHandlerInterface("onFocus", customLogic, configFields);
  customLogicHandlerInterface("onFocus", customLogic, configTextareas);

  customLogicHandlerInterface("onKeyDown", customLogic, configFields);
  customLogicHandlerInterface("onKeyDown", customLogic, configTextareas);
};

export const executeOnChangeLogic = (id, map, value) => {
  if (!map || Object.keys(map).length === 0) return;
  const myFunc = map[id];
  myFunc(value);
};

const populateOC = (SSOT, config, states, handler) => {
  for (let i = 0; i < states.length; i++) {
    const targetId = SSOT[states[i]];
    config[targetId].handlers = { onChange: handler };
  }
};

export const onChangeInterface = (customLogic, SSOTS, configs, handlers) => {
  for (let key in configs) {
    const basicKey = key.replace("config", "");
    const kControlled = "controlled" + basicKey;
    const isControlled = customLogic[kControlled];
    if (!isControlled) continue;

    const basicKeyLC = basicKey.toLowerCase();
    const kSSOT = basicKeyLC + "SSOT";
    const kState = basicKeyLC + "State";
    const SSOT = SSOTS[kSSOT];
    const config = configs[key];
    const handler = handlers[basicKeyLC];
    const stateIndexes = customLogic[kState];
    populateOC(SSOT, config, stateIndexes, handler);
  }
};
