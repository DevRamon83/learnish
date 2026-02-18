import { dev } from "../../constants/consoleDoc";
import { error005a, errorHandler } from "../errorMsgCreators";
import {
  InputFieldsConfigChecker,
  controlledChecker,
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

  const { fieldSSOT } = customLogic;

  const validFieldSSOT = SSOTchecker(fieldSSOT);
  if (!validFieldSSOT) return;

  const validInputFieldsConfig = InputFieldsConfigChecker(customLogic);
  if (!validInputFieldsConfig) return;

  const validControlledFields = controlledChecker(customLogic);
  if (!validControlledFields) return;

  let validStates = true;
  let validMap = true;
  if (customLogic.controlledFields) {
    validStates = indexChecker(customLogic.states, fieldSSOT);
    validMap = dispatchHandlerChecker(customLogic, "onChangeMap", fieldSSOT);
  }
  if (!validStates || !validMap) return;

  let validRefs = true;
  if (customLogic.useRef) {
    validRefs = indexChecker(customLogic.refs, fieldSSOT);
  }
  if (!validRefs) return;

  const validBlur = dispatchHandlerChecker(customLogic, "onBlur", fieldSSOT);
  if (!validBlur) return;

  const validFocus = dispatchHandlerChecker(customLogic, "onFocus", fieldSSOT);
  if (!validFocus) return;

  const validKeyDown = dispatchHandlerChecker(
    customLogic,
    "onKeyDown",
    fieldSSOT,
  );
  if (!validKeyDown) return;
};
