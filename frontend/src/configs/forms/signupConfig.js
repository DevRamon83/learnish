import bundle from "../../../../shared";
import {
  signupInputFields,
  signupInputGroups,
  signupInputSelects,
} from "../inputs/auth";

const { username, email, password, confirmPassword, keyToAdd, address } =
  signupInputFields;

const fieldsSSOT = [username.id, email.id, password.id, confirmPassword.id];

const inputFieldsConfig = {
  targetKeys: fieldsSSOT,
  originalObjects: [username, email, password, confirmPassword],
  addThisKeys: keyToAdd,
  stringsAddress: address,
};

const validators = bundle.validators.authValidators;

const fieldsMap = {
  [username.id]: validators.username,
  [email.id]: validators.email,
  [password.id]: validators.psw,
  [confirmPassword.id]: validators.confirmPSw,
};

export const fieldsLogic = {
  fieldsSSOT,
  inputFields: true,
  inputFieldsConfig,
  controlledFields: true,
  fieldsState: [0, 1, 2, 3],
  onChangeFieldsMap: fieldsMap,
  refFields: true,
  refs: [],
  onBlurFuncs: {},
  onBlurIndexes: [],
  onFocusFuncs: {},
  onFocusIndexes: [],
  onKeyDownFuncs: {},
  onKeyDownIndexes: [],
};

const { privacy, tos } = signupInputGroups;
const groupsSSOT = ["privacy", "tos"];

export const groupsLogic = {
  groupsSSOT,
  inputGroups: true,
  groupsConfig: {
    privacy,
    tos,
  },
  controlledGroups: true,
  groupsState: [0, 1],
  onChangeGroupsMap: {},
  refGroups: false,
  refs: [],
};

const { accountType } = signupInputSelects;
const selectsSSOT = ["accountType"];

export const selectsLogic = {
  selectsSSOT,
  inputSelects: true,
  selectsConfig: {
    accountType,
  },
  controlledSelects: false,
  selectsState: [],
  onChangeSelectsMap: {},
  refSelects: false,
  refs: [],
};
