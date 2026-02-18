import bundle from "../../../../shared";
import { signupInputField, signupInputGroup } from "../../configs/inputs/auth";
import { useFormFactory } from "../../hooks/factories/useFormFactory";
import InputField from "../inputs/InputField";
import InputGroup from "../inputs/InputGroup";

const { username, email, password, confirmPassword, keyToAdd, address } =
  signupInputField;

const { privacy, ToS } = signupInputGroup;

const fieldSSOT = [username.id, email.id, password.id, confirmPassword.id];
const groupsSSOT = ["privacy", "ToS"];

const inputFieldsConfig = {
  targetKeys: fieldSSOT,
  originalObjects: [username, email, password, confirmPassword],
  addThisKeys: keyToAdd,
  stringsAddress: address,
};

const validators = bundle.validators.authValidators;

export default function SignupForm() {
  const fieldsMap = {
    [username.id]: validators.username,
    [email.id]: validators.email,
    [password.id]: validators.psw,
    [confirmPassword.id]: validators.confirmPSw,
  };

  const customLogic = {
    fieldSSOT,
    inputFieldsConfig,
    controlledFields: true,
    fieldsState: [0, 1, 2, 3],
    onChangeFieldsMap: fieldsMap,
    useRef: true,
    refs: [],
    onBlurFuncs: {},
    onBlurIndexes: [],
    onFocusFuncs: {},
    onFocusIndexes: [],
    onKeyDownFuncs: {},
    onKeyDownIndexes: [],
    groupsSSOT,
    inputGroup: true,
    controlledGroups: true,
    groupsStates: [0, 1],
    onChangeGroupsMap: {},
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
          {fieldSSOT.map((id) => (
            <InputField key={id} dataField={fields[id]} />
          ))}
          <InputGroup dataField={groups.privacy} />
          <InputGroup dataField={groups.ToS} />
        </form>
      )}
    </>
  );
}
