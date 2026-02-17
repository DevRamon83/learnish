import { useCallback } from "react";

const customLogicHandler = (funcsMap, indexes, SSOT, objConfig, innerKey) => {
  for (let i = 0; i < indexes.length; i++) {
    const targetId = SSOT[indexes[i]];
    objConfig[targetId].handlers[innerKey] = funcsMap[targetId];
  }
};

const executeChangeLogic = (id, customLogic, value) => {
  const { onChangeLogicMap } = customLogic;
  const myFunc = onChangeLogicMap[id];
  myFunc(value);
};

export const useHandlersFactory = (objConfig, customLogic, setter) => {
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
      objConfig[targetId].handlers = { onChange: changeHandler };
    }
  }

  if (customLogic.onBlurIndexes.length > 0) {
    const { onBlurFuncs, onBlurIndexes } = customLogic;
    customLogicHandler(onBlurFuncs, onBlurIndexes, SSOT, objConfig, "onBlur");
  }

  if (customLogic.onFocusIndexes.length > 0) {
    const { onFocusFuncs, onFocusIndexes } = customLogic;
    customLogicHandler(
      onFocusFuncs,
      onFocusIndexes,
      SSOT,
      objConfig,
      "onFocus",
    );
  }

  if (customLogic.onKeyDownIndexes.length > 0) {
    const { onKeyDownFuncs, onKeyDownIndexes } = customLogic;
    customLogicHandler(
      onKeyDownFuncs,
      onKeyDownIndexes,
      SSOT,
      objConfig,
      "onKeyDown",
    );
  }

  return objConfig;
};
