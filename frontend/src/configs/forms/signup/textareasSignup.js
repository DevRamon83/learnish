import bundle from "../../../../../shared";
import { signupInputTextareas } from "../../inputs/auth";
import { eventsHandler } from "../helpers";

const { test, keyToAdd } = signupInputTextareas;

const textareasSSOT = [test.id];

const textareasConfig = {
  targetKeys: textareasSSOT,
  originalObjects: [test],
  addThisKeys: keyToAdd,
};

const validators = bundle.validators.authValidators;

const textareasMap = {
  [test.id]: validators.username,
};

const textareaEventArray = [];
const textareaEeventobj = {};

export const textareaLogic = {
  textareasSSOT,
  inputTextareas: true,
  textareasConfig,
  controlledTextareas: true,
  textareasState: [0],
  onChangeTextareasMap: textareasMap,
  refTextareas: true,
  refs: [],
  ...eventsHandler(textareaEventArray, textareaEeventobj),
};
