import { useRef, useState } from "react";

const config = {
  params: ["username", "password"], // parametri unici sia per trovare le chiavi delle lingue, sia per nominare ref e stati
  address: "components.login", // per trovare i testi
  refIndexes: [0], //
  stateIndexes: [0, 1], //
};

const buildInitialState = (configObj) => {
  const obj = {};

  configObj.stateIndexes.forEach((value) => {
    const key = configObj.params[value];
    obj[key] = "";
  });

  return obj;
};

export const useStateFactory = (configObj) => {
  const stateIndexes = configObj.stateIndexes;
  const [state, setState] = useState(() => buildInitialState(configObj));
  const globalRef = useRef();

  return [state, setState];
};
