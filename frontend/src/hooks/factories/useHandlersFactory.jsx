import { useCallback } from "react";
import {
  customLogicHandlerInterface,
  executeOnChangeLogic,
  onChangeInterface,
} from "./helpers/handlerFactoryHelper";

export const useHandlersFactory = (
  fieldsConfig,
  configGroups,
  customLogic,
  fieldSetter,
  setGroupsState,
) => {
  const { onChangeFieldsMap, onChangeGroupsMap } = customLogic;
  const changeFieldsHandler = useCallback(
    (e) => {
      const { id, value } = e.target;
      fieldSetter((prev) => ({
        ...prev,
        [id]: value,
      }));

      executeOnChangeLogic(id, onChangeFieldsMap, value);
    },
    [fieldSetter],
  );

  const changeGroupsHandler = useCallback(
    (e) => {
      const { id, value, type, name, checked } = e.target;
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

      executeOnChangeLogic(id, onChangeGroupsMap, value);
    },
    [setGroupsState],
  );

  const { fieldsSSOT, fieldsState, controlledFields } = customLogic;
  onChangeInterface(
    fieldsSSOT,
    fieldsState,
    controlledFields,
    changeFieldsHandler,
    fieldsConfig,
  );

  const { groupsSSOT, groupsState, controlledGroups } = customLogic;
  onChangeInterface(
    groupsSSOT,
    groupsState,
    controlledGroups,
    changeGroupsHandler,
    configGroups,
  );

  customLogicHandlerInterface("onBlur", customLogic, fieldsConfig);

  customLogicHandlerInterface("onFocus", customLogic, fieldsConfig);

  customLogicHandlerInterface("onKeyDown", customLogic, fieldsConfig);

  return fieldsConfig;
};
