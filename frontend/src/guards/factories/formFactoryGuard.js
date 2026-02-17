import { dev } from "../../constants/consoleDoc";
import { error005a, errorHandler } from "../errorMsgCreators";
import {
  basicConfigChecker,
  controlledInputsChecker,
  indexChecker,
  SSOTchecker,
} from "./checkers/formFactoryCheckers";
import { dispatchHandlerChecker } from "./dispatchers/formFactoryDispatch";

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
  let validMap = true;
  if (customLogic.controlledInputs) {
    validStates = indexChecker(customLogic.states, SSOT);
    validMap = dispatchHandlerChecker(customLogic, "onChangeMap", SSOT);
  }
  if (!validStates || !validMap) return;

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
