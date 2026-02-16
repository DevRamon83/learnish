import { useState } from "react";

const buildInitialState = (customLogic) => {
  if (!customLogic.controlledInputs) return {};
  const obj = {};
  const { states, SSOT } = customLogic;

  states.forEach((value) => {
    const key = SSOT[value];
    obj[key] = "";
  });

  return obj;
};

export const useStateFactory = (customLogic) => {
  const [state, setState] = useState(() => buildInitialState(customLogic));

  return [state, setState];
};
