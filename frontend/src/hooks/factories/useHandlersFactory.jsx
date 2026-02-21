import { useCallback } from "react";
import {
  customLogicDispatcher,
  executeOnChangeLogic,
  onChangeInterface,
} from "./helpers/handlerFactoryHelper";

export const useHandlersFactory = (configs, customLogic, states, SSOTS) => {
  const {
    onChangeFieldsMap,
    onChangeGroupsMap,
    onChangeSelectsMap,
    onChangeTextareasMap,
  } = customLogic;

  const { setFieldState, setGroupsState, setSelectsState, setTextareasState } =
    states;

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

  const changeGroupsHandler = (setter) =>
    useCallback(
      (e) => {
        const { id, value, type, name, checked } = e.target;
        const finalValue = type === "checkbox" ? checked : value;
        if (type === "radio") {
          setter((prev) => ({
            ...prev,
            [name]: value,
          }));
        } else {
          setter((prev) => ({
            ...prev,
            [name]: {
              ...prev[name],
              [id]: checked,
            },
          }));
        }

        executeOnChangeLogic(id, onChangeGroupsMap, finalValue);
      },
      [setter],
    );

  const handlers = {
    fields: commonOnChangeHandler(setFieldState, onChangeFieldsMap),
    selects: commonOnChangeHandler(setSelectsState, onChangeSelectsMap),
    textareas: commonOnChangeHandler(setTextareasState, onChangeTextareasMap),
    groups: changeGroupsHandler(setGroupsState),
  };

  onChangeInterface(customLogic, SSOTS, configs, handlers);

  const { configFields, configGroups, configSelects, configTextareas } =
    configs;

  customLogicDispatcher(customLogic, configs);

  return { configFields, configGroups, configSelects, configTextareas };
};
