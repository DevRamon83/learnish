import { useState } from "react";
import { buildDispatcher } from "./helpers/stateConfigHelper";

export const useStateFactory = (customLogic) => {
  const { controlledFields, controlledGroups, controlledSelects } = customLogic;
  const initial = "";

  const [fieldsState, setFieldState] = useState(() =>
    buildDispatcher(controlledFields, customLogic, "fields", initial),
  );

  const [groupsState, setGroupsState] = useState(() =>
    buildDispatcher(controlledGroups, customLogic, "groups", initial),
  );

  const [selectsState, setSelects] = useState(() =>
    buildDispatcher(controlledSelects, customLogic, "selects", initial),
  );

  return {
    fieldsState,
    setFieldState,
    groupsState,
    setGroupsState,
    selectsState,
    setSelects,
  };
};
