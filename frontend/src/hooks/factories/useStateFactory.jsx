import { useState } from "react";

const buildInitialState = (customLogic, initial) => {
  const obj = {};
  const { SSOT, states } = customLogic;
  states.forEach((value) => {
    const key = SSOT[value];
    obj[key] = initial;
  });

  return obj;
};

const buildDispatcher = (controlled, customLogic, initial) => {
  if (!controlled) return {};

  return buildInitialState(customLogic, initial);
};

export const useStateFactory = (customLogic) => {
  const { controlledInputs, controlledInputGroup } = customLogic;

  const [state, setState] = useState(() =>
    buildDispatcher(controlledInputs, customLogic, ""),
  );

  const [igState, setIgState] = useState(() =>
    buildDispatcher(controlledInputGroup, customLogic, false),
  );

  return { state, setState, igState, setIgState };
};
