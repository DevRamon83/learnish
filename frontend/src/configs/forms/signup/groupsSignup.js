import { signupInputGroups } from "../../inputs/auth";

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
