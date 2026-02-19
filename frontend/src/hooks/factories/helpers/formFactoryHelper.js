import bundle from "../../../../../shared";

const cloneInterface = bundle.utils.cloneInterface;

export const syncStates = (elements, clone, state) => {
  for (let i = 0; i < elements.length; i++) {
    clone[elements[i]].states = { value: state[elements[i]] };
  }
};

export const syncRefs = (elements, clone, ref) => {
  for (let i = 0; i < elements.length; i++) {
    const refName = elements[i] + "Ref";
    const setRef = (el) => (ref.current[refName] = el);
    clone[elements[i]].states.inputRef = setRef;
  }
};

export const cloneHandler = (objToClone) => {
  const clone = cloneInterface(objToClone);
  if (clone.error) {
    return null;
  } else {
    return clone.yourClone;
  }
};
