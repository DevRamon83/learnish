import { useMemo, useRef } from "react";
import { useI18nFormSchema } from "./useI18nFormSchema";
import { useStateFactory } from "./useStateFactory";
import { useHandlersFactory } from "./useHandlersFactory";
import { formFactoryGuard } from "../../guards/factories/formFactoryGuard";

const syncFormFields = (SSOT, finalObjConfig, inputsRef, state) => {
  for (let i = 0; i < SSOT.length; i++) {
    finalObjConfig[SSOT[i]].states = { value: state[SSOT[i]] };
    const refName = SSOT[i] + "Ref";
    const setRef = (el) => (inputsRef.current[refName] = el);
    finalObjConfig[SSOT[i]].states.inputRef = setRef;
  }
};

export const useFormFactory = (customLogic) => {
  formFactoryGuard(customLogic);

  const { SSOT } = customLogic;
  const { state, setState, igState, setIgState } = useStateFactory(customLogic);
  const inputsRef = useRef({});
  const { newFieldsConfig, newInputGroup } = useI18nFormSchema(customLogic);

  useHandlersFactory(newFieldsConfig, customLogic, setState);

  const finalObjConfig = useMemo(() => {
    syncFormFields(SSOT, newFieldsConfig, inputsRef, state);

    return {
      fields: newFieldsConfig,
      groups: newInputGroup,
    };
  }, [newFieldsConfig, state]);

  return finalObjConfig;
};
