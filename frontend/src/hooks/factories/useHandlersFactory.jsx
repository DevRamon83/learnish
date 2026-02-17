import { useCallback } from "react";

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

const executeChangeLogic = (id, customLogic, value) => {
  const { onChangeLogicMap } = customLogic;
  const myFunc = onChangeLogicMap[id];
  myFunc(value);
};

export const useHandlersFactory = (fieldsConfig, customLogic, setter) => {
  const { SSOT, states } = customLogic;

  const changeHandler = useCallback(
    (e) => {
      const { id, value } = e.target;
      setter((prev) => ({
        ...prev,
        [id]: value,
      }));

      executeChangeLogic(id, customLogic, value);
    },
    [setter],
  );

  if (customLogic.controlledInputs) {
    for (let i = 0; i < states.length; i++) {
      const targetId = SSOT[states[i]];
      fieldsConfig[targetId].handlers = { onChange: changeHandler };
    }
  }

  if (customLogic.onBlurIndexes.length > 0) {
    const { onBlurFuncs, onBlurIndexes } = customLogic;
    customLogicHandler(
      onBlurFuncs,
      onBlurIndexes,
      SSOT,
      fieldsConfig,
      "onBlur",
    );
  }

  if (customLogic.onFocusIndexes.length > 0) {
    const { onFocusFuncs, onFocusIndexes } = customLogic;
    customLogicHandler(
      onFocusFuncs,
      onFocusIndexes,
      SSOT,
      fieldsConfig,
      "onFocus",
    );
  }

  if (customLogic.onKeyDownIndexes.length > 0) {
    const { onKeyDownFuncs, onKeyDownIndexes } = customLogic;
    customLogicHandler(
      onKeyDownFuncs,
      onKeyDownIndexes,
      SSOT,
      fieldsConfig,
      "onKeyDown",
    );
  }

  return fieldsConfig;
};
