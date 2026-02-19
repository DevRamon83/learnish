import { useCallback } from "react";
import {
  customLogicHandlerInterface,
  executeOnChangeLogic,
  onChangeInterface,
} from "./helpers/handlerFactoryHelper";

export const useHandlersFactory = (
  configFields,
  configGroups,
  configSelects,
  customLogic,
  setFieldState,
  setGroupsState,
  setSelects,
) => {
  const { onChangeFieldsMap, onChangeGroupsMap, onChangeSelectsMap } =
    customLogic;
  const commonOnChangeHandler = (setter, map) =>
    useCallback(
      (e) => {
        const { id, value } = e.target;
        setter((prev) => ({
          ...prev,
          [id]: value,
        }));

        executeOnChangeLogic(id, map, value);
      },
      [setter],
    );

  const changeGroupsHandler = useCallback(
    (e) => {
      const { id, value, type, name, checked } = e.target;
      const finalValue = type === "checkbox" ? checked : value;
      if (type === "radio") {
        setGroupsState((prev) => ({
          ...prev,
          [name]: value,
        }));
      } else {
        setGroupsState((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            [id]: checked,
          },
        }));
      }

      executeOnChangeLogic(id, onChangeGroupsMap, finalValue);
    },
    [setGroupsState],
  );

  const { fieldsSSOT, fieldsState, controlledFields } = customLogic;
  onChangeInterface(
    fieldsSSOT,
    fieldsState,
    controlledFields,
    commonOnChangeHandler(setFieldState, onChangeFieldsMap),
    configFields,
  );

  const { groupsSSOT, groupsState, controlledGroups } = customLogic;
  onChangeInterface(
    groupsSSOT,
    groupsState,
    controlledGroups,
    changeGroupsHandler,
    configGroups,
  );

  const { selectsSSOT, selectsState, controlledSelects } = customLogic;
  onChangeInterface(
    selectsSSOT,
    selectsState,
    controlledSelects,
    commonOnChangeHandler(setSelects, onChangeSelectsMap),
    configSelects,
  );

  customLogicHandlerInterface("onBlur", customLogic, configFields);

  customLogicHandlerInterface("onFocus", customLogic, configFields);

  customLogicHandlerInterface("onKeyDown", customLogic, configFields);

  return configFields;
};
