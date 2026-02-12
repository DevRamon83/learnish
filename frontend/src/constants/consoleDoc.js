export const dev = true;

export const statesFactory = {
  params: ["username", "password"], // Unique identifiers for language keys, ref naming, and state naming
  refIndexes: [0], // Indexes from the 'params' array used to generate refs
  stateIndexes: [0, 1], // Indexes from the 'params' array used to generate states
};

export const customLogicDoc = {
  onBlurFuncs: {},
  _onBlur_helpFunc:
    "Maps functions to keys; each key must match a key in the SSOT",
  onBlurIndexes: [],
  _onBlur_helpIndexes:
    "Indexes used to extract unique keys from the SSOT array for logic mapping",
  onFocusFuncs: {},
  onFocusIndexes: [],
  onKeyDownFuncs: {},
  onKeyDownIndexes: [],
  _indexesHelp: "All index arrays follow the same pattern as onBlur",
  _funcsHelp: "All funcMap objects follow the same pattern as onBlur",
};
