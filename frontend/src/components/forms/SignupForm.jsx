import bundle from "../../../../shared";
import { signupInputField, signupInputGroup } from "../../configs/inputs/auth";
import { useFormFactory } from "../../hooks/factories/useFormFactory";
import InputField from "../inputs/InputField";
import InputGroup from "../inputs/InputGroup";

const { username, email, password, confirmPassword, keyToAdd, address } =
  signupInputField;

const { privacy, ToS } = signupInputGroup;

const SSOT = [username.id, email.id, password.id, confirmPassword.id];

const inputFieldsConfig = {
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
    inputFieldsConfig,
    controlledInputs: true,
    states: [0, 1, 2, 3],
    onChangeLogicMap: map,
    useRef: true,
    refs: [],
    onBlurFuncs: {},
    onBlurIndexes: [],
    onFocusFuncs: {},
    onFocusIndexes: [],
    onKeyDownFuncs: {},
    onKeyDownIndexes: [],
    inputGroup: true,
    controlledInputGroup: false,
    groupConfig: {
      privacy,
      ToS,
    },
  };

  const { fields, groups } = useFormFactory(customLogic);

  return (
    <>
      {fields && (
        <form>
          {SSOT.map((id) => (
            <InputField key={id} dataField={fields[id]} />
          ))}
          <InputGroup dataField={groups.privacy} />
        </form>
      )}
    </>
  );
}
