import { signupInputSelects } from "../../inputs/auth";

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
