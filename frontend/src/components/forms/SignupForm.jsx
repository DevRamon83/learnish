import bundle from "../../../../shared";
import { signupConfig } from "../../configs/inputs/auth";
import { useFormFactory } from "../../hooks/factories/useFormFactory";
import InputField from "../inputs/InputField";

const { username, email, password, confirmPassword, keyToAdd, address } =
  signupConfig;

const SSOT = [username.id, email.id, password.id, confirmPassword.id];

const basicConfig = {
  targetKeys: SSOT,
  originalObjects: [username, email, password, confirmPassword],
  addThisKeys: keyToAdd,
  stringsAddress: address,
};

const validators = bundle.validators.authValidators;

export default function SignupForm() {
  const map = {
    [username.id]: validators.username,
    [email.id]: validators.email,
    [password.id]: validators.psw,
    [confirmPassword.id]: validators.confirmPSw,
  };

  const customLogic = {
    SSOT,
    basicConfig,
    controlledInputs: true,
    states: [0, 1, 2, 3],
    onChangeLogicMap: map, // qui devi modificare factory e guardia
    useRef: true,
    refs: [],
    onBlurFuncs: {},
    onBlurIndexes: [],
    onFocusFuncs: {},
    onFocusIndexes: [],
    onKeyDownFuncs: {},
    onKeyDownIndexes: [],
  };

  const objConfig = useFormFactory(customLogic);

  return (
    <>
      {objConfig && (
        <form>
          {SSOT.map((id) => (
            <InputField key={id} dataField={objConfig[id]} />
          ))}
        </form>
      )}
    </>
  );
}
