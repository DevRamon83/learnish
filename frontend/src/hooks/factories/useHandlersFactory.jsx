import { useCallback } from "react";

const customLogicHandler = (funcsMap, indexes, SSOT, inputsData, innerKey) => {
  for (let i = 0; i < indexes.length; i++) {
    const targetId = SSOT[indexes[i]];
    inputsData[targetId].eventHandlers[innerKey] = funcsMap[targetId];
  }
};

export const useHandlersFactory = (inputsData, SSOT, setter, customLogic) => {
  const changeHandler = useCallback(
    (e) => {
      const { id, value } = e.target;
      setter((prev) => ({
        ...prev,
        [id]: value,
      }));
    },
    [setter],
  );

  if (!inputsData) return;

  for (let i = 0; i < SSOT.length; i++) {
    inputsData[SSOT[i]].eventHandlers = { onChange: changeHandler };
  }

  if (!customLogic) return inputsData;

  if (customLogic.onBlurIndexes.length > 0) {
    const { onBlurFuncs, onBlurIndexes } = customLogic;
    customLogicHandler(onBlurFuncs, onBlurIndexes, SSOT, inputsData, "onBlur");
  }

  if (customLogic.onFocusIndexes.length > 0) {
    const { onFocusFuncs, onFocusIndexes } = customLogic;
    customLogicHandler(
      onFocusFuncs,
      onFocusIndexes,
      SSOT,
      inputsData,
      "onFocus",
    );
  }

  if (customLogic.onKeyDownIndexes.length > 0) {
    const { onKeyDownFuncs, onKeyDownIndexes } = customLogic;
    customLogicHandler(
      onKeyDownFuncs,
      onKeyDownIndexes,
      SSOT,
      inputsData,
      "onKeyDown",
    );
  }

  return inputsData;
};
