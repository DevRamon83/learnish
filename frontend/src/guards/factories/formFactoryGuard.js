import { dev } from "../../constants/consoleDoc";
import { error005a, errorHandler } from "../errorMsgCreators";
import {
  fieldsConfigChecker,
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

  const { fieldsSSOT } = customLogic;

  const validfieldsSSOT = SSOTchecker(fieldsSSOT);
  if (!validfieldsSSOT) return;

  const validFieldsConfig = fieldsConfigChecker(customLogic);
  if (!validFieldsConfig) return;

  const validControlledFields = controlledChecker(customLogic);
  if (!validControlledFields) return;

  let validStates = true;
  let validMap = true;
  if (customLogic.controlledFields) {
    validStates = indexChecker(customLogic.fieldsState, fieldsSSOT);
    validMap = dispatchHandlerChecker(customLogic, "onChangeMap", fieldsSSOT);
  }
  if (!validStates || !validMap) return;

  let validRefs = true;
  if (customLogic.useRef) {
    validRefs = indexChecker(customLogic.refs, fieldsSSOT);
  }
  if (!validRefs) return;

  const validBlur = dispatchHandlerChecker(customLogic, "onBlur", fieldsSSOT);
  if (!validBlur) return;

  const validFocus = dispatchHandlerChecker(customLogic, "onFocus", fieldsSSOT);
  if (!validFocus) return;

  const validKeyDown = dispatchHandlerChecker(
    customLogic,
    "onKeyDown",
    fieldsSSOT,
  );
  if (!validKeyDown) return;
};
