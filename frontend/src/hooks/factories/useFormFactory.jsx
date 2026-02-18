import { useMemo, useRef } from "react";
import { useI18nFactory } from "./useI18nFactory";
import { useStateFactory } from "./useStateFactory";
import { useHandlersFactory } from "./useHandlersFactory";
import { formFactoryGuard } from "../../guards/factories/formFactoryGuard";
import bundle from "../../../../shared";
import { fieldsConfigHelper } from "./helpers/fieldsConfigHelper";
const cloneInterface = bundle.utils.cloneInterface;

const syncFormFields = (elements, clone, ref, state) => {
  for (let i = 0; i < elements.length; i++) {
    clone[elements[i]].states = { value: state[elements[i]] };
    const refName = elements[i] + "Ref";
    const setRef = (el) => (ref.current[refName] = el);
    clone[elements[i]].states.inputRef = setRef;
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

  const { fieldSSOT } = customLogic;
  const { fieldsState, setState, groupsState, setGroupsState } =
    useStateFactory(customLogic);
  const fieldsRef = useRef({});
  const groupsRef = useRef({});
  const fields = fieldsConfigHelper(customLogic);
  const { configFields, configGroups } = useI18nFactory(customLogic, fields);

  useHandlersFactory(
    configFields,
    configGroups,
    customLogic,
    setState,
    setGroupsState,
  );

  // We use useMemo with cloned objects to ensure referential stability.
  // By returning a fresh clone, we force child components to re-render,
  // preventing state-UI mismatch (lag) while maintaining controlled input focus.
  const finalObjConfig = useMemo(() => {
    const fieldsClone = cloneHandler(configFields);
    const groupsClone = cloneHandler(configGroups);
    if (!groupsClone || !fieldsClone) return null;
    syncFormFields(fieldSSOT, fieldsClone, fieldsRef, fieldsState);
    syncFormFields(
      Object.keys(configGroups),
      groupsClone,
      groupsRef,
      groupsState,
    );

    return {
      fields: fieldsClone,
      groups: groupsClone,
    };
  }, [configFields, configGroups, fieldsState, groupsState]);

  return finalObjConfig;
};
