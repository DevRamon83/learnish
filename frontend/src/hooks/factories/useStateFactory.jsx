import { useState } from "react";
import { buildDispatcher } from "./helpers/stateConfigHelper";

export const useStateFactory = (customLogic) => {
  const { controlledFields, controlledGroups } = customLogic;
  const initial = "";

  const [fieldsState, setState] = useState(() =>
    buildDispatcher(controlledFields, customLogic, "fields", initial),
  );

  const [groupsState, setGroupsState] = useState(() =>
    buildDispatcher(controlledGroups, customLogic, "groups", initial),
  );

  return { fieldsState, setState, groupsState, setGroupsState };
};
