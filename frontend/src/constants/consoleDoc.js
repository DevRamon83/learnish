export const dev = true;

export const customLogicDoc = {
  controlledFields: "boolean",
  states: [],
  _states_help: "The state names must match the values in the fieldSSOT array.",
  onChangeLogicMap: {},
  _onChangeLogicMap_help:
    "Maps each state key to its specific validation or transformation function. Each key must match an ID from the fieldSSOT array to link the logic to the correct input",
  useRef: "boolean",
  refs: [],
  _refs_help:
    "The refs array follows the same pattern as the states array; please refer to _states_help",
  onBlurFuncs: {},
  _onBlur_helpFunc:
    "Maps functions to keys; each key must match a key in the fieldSSOT",
  onBlurIndexes: [],
  _onBlur_helpIndexes:
    "Indexes used to extract unique keys from the fieldSSOT array for logic mapping",
  onFocusFuncs: {},
  onFocusIndexes: [],
  onKeyDownFuncs: {},
  onKeyDownIndexes: [],
  _indexesHelp:
    "All index arrays follow the same pattern as onBlur, read the text in _onBlur_helpIndexes",
  _funcsHelp:
    "All funcMap objects follow the same pattern as onBlur, read the text in _onBlur_helpFunc",
};
