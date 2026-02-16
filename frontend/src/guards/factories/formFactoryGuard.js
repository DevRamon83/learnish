import { dev } from "../../constants/consoleDoc";
import { error003a, error005a, errorHandler } from "../errorMsgCreators";
import {
  basicConfigChecker,
  controlledInputsChecker,
  handlerChecker,
  indexChecker,
  SSOTchecker,
} from "./checkers/formFactoryCheckers";

const dispatchHandlerChecker = (customLogic, caller, SSOT) => {
  const indexName = caller + "Indexes";
  const mapName = caller + "Funcs";
  const indexes = customLogic[indexName];
  const map = customLogic[mapName];

  if (!indexes || indexes.length === 0) return true;

  let isValid = true;
  isValid = handlerChecker(SSOT, indexes, caller, map);
  !isValid && errorHandler(error003a);
  return isValid;
};

export const formFactoryGuard = (customLogic) => {
  if (!dev) return;

  if (!customLogic) {
    errorHandler(error005a);
    return;
  }

  const { SSOT } = customLogic;

  const validSSOT = SSOTchecker(SSOT);
  if (!validSSOT) return;

  const validBasicConfig = basicConfigChecker(customLogic);
  if (!validBasicConfig) return;

  const validControlledInputs = controlledInputsChecker(customLogic);
  if (!validControlledInputs) return;

  let validStates = true;
  if (customLogic.controlledInputs) {
    validStates = indexChecker(customLogic.states, SSOT);
  }
  if (!validStates) return;

  let validRefs = true;
  if (customLogic.useRef) {
    validRefs = indexChecker(customLogic.refs, SSOT);
  }
  if (!validRefs) return;

  const validBlur = dispatchHandlerChecker(customLogic, "onBlur", SSOT);
  if (!validBlur) return;

  const validFocus = dispatchHandlerChecker(customLogic, "onFocus", SSOT);
  if (!validFocus) return;

  const validKeyDown = dispatchHandlerChecker(customLogic, "onKeyDown", SSOT);
  if (!validKeyDown) return;
};
