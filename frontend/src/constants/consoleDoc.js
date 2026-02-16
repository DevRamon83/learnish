export const dev = true;

export const customLogicDoc = {
  controlledInputs: "boolean",
  states: [],
  _states_help: "The state names must match the values in the SSOT array.",
  onChangeLogicMap: {},
  _onChangeLogicMap_help:
    "Maps each state key to its specific validation or transformation function. Each key must match an ID from the SSOT array to link the logic to the correct input",
  useRef: "boolean",
  refs: [],
  _refs_help:
    "The refs array follows the same pattern as the states array; please refer to _states_help",
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
  _indexesHelp:
    "All index arrays follow the same pattern as onBlur, read the text in _onBlur_helpIndexes",
  _funcsHelp:
    "All funcMap objects follow the same pattern as onBlur, read the text in _onBlur_helpFunc",
};
