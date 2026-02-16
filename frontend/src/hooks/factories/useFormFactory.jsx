import { useMemo, useRef } from "react";
import { useI18nFormSchema } from "./useI18nFormSchema";
import { useStateFactory } from "./useStateFactory";
import { useHandlersFactory } from "./useHandlersFactory";
import bundle from "../../../../shared";
import { formFactoryGuard } from "../../guards/factories/formFactoryGuard";

export const useFormFactory = (customLogic) => {
  formFactoryGuard(customLogic);

  const { SSOT } = customLogic;
  const [state, setter] = useStateFactory(customLogic);
  const { cloneInterface } = bundle.utils;
  const inputsRef = useRef({});
  const inputsData = useI18nFormSchema(customLogic.basicConfig);
  useHandlersFactory(inputsData, customLogic, setter);

  const finalObjConfig = useMemo(() => {
    const objConfigClone = cloneInterface(inputsData);
    if (objConfigClone.error || !objConfigClone.yourClone) return;
    const finalObjConfig = objConfigClone.yourClone;
    for (let i = 0; i < SSOT.length; i++) {
      finalObjConfig[SSOT[i]].states = { value: state[SSOT[i]] };
      const refName = SSOT[i] + "Ref";
      const setRef = (el) => (inputsRef.current[refName] = el);
      finalObjConfig[SSOT[i]].states.inputRef = setRef;
    }
    return objConfigClone.yourClone;
  }, [inputsData, state]);

  return finalObjConfig;
};
