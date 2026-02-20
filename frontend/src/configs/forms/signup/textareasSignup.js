import { eventsHandler } from "../helpers";

const { test } = signupInputTextarea;

const textareasSSOT = [test.id];

const inputTextareasConfig = {
  targetKeys: textareasSSOT,
  originalObjects: [test],
  addThisKeys: keyToAdd,
};

const textareasMap = {
  [test.id]: validators.username,
};

const textareaEventArray = [];
const textareaEeventobj = {};

export const textareaLogic = {
  textareasSSOT,
  inputTextareas: true,
  inputTextareasConfig,
  controlledTextareas: true,
  textareasState: [0],
  onChangeTextareasMap: textareasMap,
  refTextareas: true,
  refs: [],
  ...eventsHandler(textareaEventArray, textareaEeventobj),
};
