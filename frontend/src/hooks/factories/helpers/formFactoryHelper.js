import bundle from "../../../../../shared";

const cloneInterface = bundle.utils.cloneInterface;

const syncStates = (elements, clone, state) => {
  for (let i = 0; i < elements.length; i++) {
    clone[elements[i]].states = { value: state[elements[i]] };
  }
};

const syncRefs = (elements, clone, ref) => {
  for (let i = 0; i < elements.length; i++) {
    const refName = elements[i] + "Ref";
    const setRef = (el) => (ref.current[refName] = el);
    clone[elements[i]].states.inputRef = setRef;
  }
};

export const synchronize = (customLogic, SSOTS, clones, states, refs) => {
  for (let key in clones) {
    const controlledKey = "controlled" + bundle.utils.capitalize(key);
    const refControl = "ref" + bundle.utils.capitalize(key);
    const SSOTkey = key + "SSOT";
    const stateKey = key + "State";
    const refKey = key + "Ref";
    const isControlled = customLogic[controlledKey];
    const haveRef = customLogic[refControl];
    isControlled && syncStates(SSOTS[SSOTkey], clones[key], states[stateKey]);
    haveRef && syncRefs(SSOTS[SSOTkey], clones[key], refs[refKey]);
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

export const clone = (configs) => {
  let fields = {};
  let groups = {};
  let selects = {};
  let textareas = {};

  for (let key in configs) {
    const clone = cloneHandler(configs[key]);
    if (key === "configFields") fields = clone;
    if (key === "configGroups") groups = clone;
    if (key === "configSelects") selects = clone;
    if (key === "configTextareas") textareas = clone;
  }

  return { fields, groups, selects, textareas };
};
