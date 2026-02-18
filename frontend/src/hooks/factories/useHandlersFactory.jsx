import { useCallback } from "react";
import {
  customLogicHandlerInterface,
  executeChangeLogic,
  onChangeInterface,
} from "./helpers/handlerFactoryHelper";

export const useHandlersFactory = (fieldsConfig, customLogic, setter) => {
  const changeHandler = useCallback(
    (e) => {
      const { id, value } = e.target;
      setter((prev) => ({
        ...prev,
        [id]: value,
      }));

      executeChangeLogic(id, customLogic, value);
    },
    [setter],
  );

  onChangeInterface(customLogic, changeHandler, fieldsConfig);

  customLogicHandlerInterface("onBlur", customLogic, fieldsConfig);

  customLogicHandlerInterface("onFocus", customLogic, fieldsConfig);

  customLogicHandlerInterface("onKeyDown", customLogic, fieldsConfig);

  return fieldsConfig;
};
