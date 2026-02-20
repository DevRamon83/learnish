import { useState } from "react";
import { buildDispatcher } from "./helpers/stateConfigHelper";

export const useStateFactory = (customLogic) => {
  const {
    controlledFields,
    controlledGroups,
    controlledSelects,
    controlledTextareas,
  } = customLogic;
  const initial = "";

  const [fieldsState, setFieldState] = useState(() =>
    buildDispatcher(controlledFields, customLogic, "fields", initial),
  );

  const [groupsState, setGroupsState] = useState(() =>
    buildDispatcher(controlledGroups, customLogic, "groups", initial),
  );

  const [selectsState, setSelectsState] = useState(() =>
    buildDispatcher(controlledSelects, customLogic, "selects", initial),
  );

  const [textareasState, setTextareasState] = useState(() =>
    buildDispatcher(controlledTextareas, customLogic, "textareas", initial),
  );

  return {
    fieldsState,
    setFieldState,
    groupsState,
    setGroupsState,
    selectsState,
    setSelectsState,
    textareasState,
    setTextareasState,
  };
};
