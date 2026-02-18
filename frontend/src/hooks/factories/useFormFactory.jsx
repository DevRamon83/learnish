import { useMemo, useRef } from "react";
import { useI18nFormSchema } from "./useI18nFormSchema";
import { useStateFactory } from "./useStateFactory";
import { useHandlersFactory } from "./useHandlersFactory";
import { formFactoryGuard } from "../../guards/factories/formFactoryGuard";
import bundle from "../../../../shared";
import { fieldsConfigHelper } from "./helpers/fieldsConfigHelper";
const cloneInterface = bundle.utils.cloneInterface;

const syncFormFields = (SSOT, finalObjConfig, inputsRef, state) => {
  for (let i = 0; i < SSOT.length; i++) {
    finalObjConfig[SSOT[i]].states = { value: state[SSOT[i]] };
    const refName = SSOT[i] + "Ref";
    const setRef = (el) => (inputsRef.current[refName] = el);
    finalObjConfig[SSOT[i]].states.inputRef = setRef;
  }
};

const cloneHandler = (objToClone) => {
  const clone = cloneInterface(objToClone);
  if (clone.error) {
    return null;
  } else {
    return clone.yourClone;
  }
};

export const useFormFactory = (customLogic) => {
  formFactoryGuard(customLogic);

  const { SSOT } = customLogic;
  const { state, setState, igState, setIgState } = useStateFactory(customLogic);
  const inputsRef = useRef({});
  const fields = fieldsConfigHelper(customLogic);
  const { configFields, configGroups } = useI18nFormSchema(customLogic, fields);

  useHandlersFactory(configFields, customLogic, setState);

  // We use useMemo with cloned objects to ensure referential stability.
  // By returning a fresh clone, we force child components to re-render,
  // preventing state-UI mismatch (lag) while maintaining controlled input focus.
  const finalObjConfig = useMemo(() => {
    const fieldsClone = cloneHandler(configFields);
    const groupsClone = cloneHandler(configGroups);
    if (!groupsClone || !fieldsClone) return null;
    syncFormFields(SSOT, fieldsClone, inputsRef, state);

    return {
      fields: fieldsClone,
      groups: groupsClone,
    };
  }, [configFields, configGroups, state]);

  return finalObjConfig;
};
