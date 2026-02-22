import { useMemo, useRef } from "react";
import { useI18nFactory } from "./useI18nFactory";
import { useStateFactory } from "./useStateFactory";
import { useHandlersFactory } from "./useHandlersFactory";
import { formFactoryGuard } from "../../guards/factories/formFactoryGuard";
import { clone, synchronize } from "./helpers/formFactoryHelper";
import { configHelper } from "./helpers/commonsHelper";

export const useFormFactory = (customLogic) => {
  formFactoryGuard(customLogic);

  const { fieldsSSOT, groupsSSOT, selectsSSOT, textareasSSOT } = customLogic;

  const SSOTS = { fieldsSSOT, groupsSSOT, selectsSSOT, textareasSSOT };

  const states = useStateFactory(customLogic);

  const fieldsRef = useRef({});
  const groupsRef = useRef({});
  const selectsRef = useRef({});
  const textareasRef = useRef({});
  const refs = { fieldsRef, groupsRef, selectsRef, textareasRef };
  const fields = configHelper(customLogic, "fieldsConfig");
  const textareas = configHelper(customLogic, "textareasConfig");

  const configs = useI18nFactory(customLogic, fields, textareas);

  useHandlersFactory(configs, customLogic, states, SSOTS);

  // We use useMemo with cloned objects to ensure referential stability.
  // By returning a fresh clone, we force child components to re-render,
  // preventing state-UI mismatch (lag) while maintaining controlled input focus.
  const finalObjConfig = useMemo(() => {
    const clones = clone(configs);
    const { fields, groups, selects, textareas } = clones;

    if (!groups || !fields || !selects || !textareas) return null;
    synchronize(customLogic, SSOTS, clones, states, refs);

    return { fields, groups, selects, textareas };
  }, [states]);

  return finalObjConfig;
};
