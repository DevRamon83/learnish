import { useMemo, useRef } from "react";
import { useI18nFactory } from "./useI18nFactory";
import { useStateFactory } from "./useStateFactory";
import { useHandlersFactory } from "./useHandlersFactory";
import { formFactoryGuard } from "../../guards/factories/formFactoryGuard";
import { fieldsConfigHelper } from "./helpers/fieldsConfigHelper";
import {
  cloneHandler,
  syncRefs,
  syncStates,
} from "./helpers/formFactoryHelper";

export const useFormFactory = (customLogic) => {
  formFactoryGuard(customLogic);

  const {
    fieldsSSOT,
    groupsSSOT,
    selectsSSOT,
    controlledFields,
    controlledGroups,
    controlledSelects,
    refFields,
    refGroups,
    refSelects,
  } = customLogic;

  const {
    fieldsState,
    setFieldState,
    groupsState,
    setGroupsState,
    selectsState,
    setSelects,
  } = useStateFactory(customLogic);

  const fieldsRef = useRef({});
  const groupsRef = useRef({});
  const selectsRef = useRef({});
  const fields = fieldsConfigHelper(customLogic);
  const { configFields, configGroups, configSelects } = useI18nFactory(
    customLogic,
    fields,
  );

  useHandlersFactory(
    configFields,
    configGroups,
    configSelects,
    customLogic,
    setFieldState,
    setGroupsState,
    setSelects,
  );

  // We use useMemo with cloned objects to ensure referential stability.
  // By returning a fresh clone, we force child components to re-render,
  // preventing state-UI mismatch (lag) while maintaining controlled input focus.
  const finalObjConfig = useMemo(() => {
    const fieldsClone = cloneHandler(configFields);
    const groupsClone = cloneHandler(configGroups);
    const selectsClone = cloneHandler(configSelects);
    if (!groupsClone || !fieldsClone || !selectsClone) return null;

    controlledFields && syncStates(fieldsSSOT, fieldsClone, fieldsState);
    controlledGroups && syncStates(groupsSSOT, groupsClone, groupsState);
    controlledSelects && syncStates(selectsSSOT, selectsClone, selectsState);
    refFields && syncRefs(fieldsSSOT, fieldsClone, fieldsRef);
    refGroups && syncRefs(groupsSSOT, groupsClone, groupsRef);
    refSelects && syncRefs(selectsSSOT, selectsClone, selectsRef);

    return {
      fields: fieldsClone,
      groups: groupsClone,
      selects: selectsClone,
    };
  }, [
    configFields,
    configGroups,
    configSelects,
    fieldsState,
    groupsState,
    selectsState,
  ]);

  return finalObjConfig;
};
