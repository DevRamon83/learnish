import bundle from "../../../../../shared";
import { signupInputFields } from "../../inputs/auth";
import { eventsHandler } from "../helpers";

const { username, email, password, confirmPassword, keyToAdd } =
  signupInputFields;

const fieldsSSOT = [username.id, email.id, password.id, confirmPassword.id];

const inputFieldsConfig = {
  targetKeys: fieldsSSOT,
  originalObjects: [username, email, password, confirmPassword],
  addThisKeys: keyToAdd,
};

const validators = bundle.validators.authValidators;

const fieldsMap = {
  [username.id]: validators.username,
  [email.id]: validators.email,
  [password.id]: validators.password,
  [confirmPassword.id]: validators.confirmPassword,
};

const fieldEventArray = [];
const fieldEeventobj = {};

export const fieldsLogic = {
  fieldsSSOT,
  inputFields: true,
  inputFieldsConfig,
  controlledFields: true,
  fieldsState: [0, 1, 2, 3],
  onChangeFieldsMap: fieldsMap,
  refFields: true,
  refs: [],
  ...eventsHandler(fieldEventArray, fieldEeventobj),
};
