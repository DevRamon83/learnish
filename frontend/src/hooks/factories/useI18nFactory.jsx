import { useLang } from "../useLang";
import {
  fieldsInterfaceI18n,
  inputGroupsInterfaceI18n,
} from "./helpers/i18nHelper";

export const useI18nFactory = (customLogic, fields) => {
  const { inputFieldsConfig, groupsConfig } = customLogic;
  const { stringsAddress } = inputFieldsConfig;
  const strings = useLang(stringsAddress);
  if (!strings || Object.keys(strings).length === 0) return null;

  fieldsInterfaceI18n(fields, inputFieldsConfig, strings);
  inputGroupsInterfaceI18n(groupsConfig, strings);
  return { configFields: fields, configGroups: groupsConfig };
};
