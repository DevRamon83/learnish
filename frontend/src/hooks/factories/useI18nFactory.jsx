import { useLang } from "../useLang";
import {
  fieldsInterfaceI18n,
  inputGroupsInterfaceI18n,
  selectsInterfaceI18n,
} from "./helpers/i18nHelper";

export const useI18nFactory = (customLogic, fields) => {
  const { inputFieldsConfig, groupsConfig, selectsConfig } = customLogic;
  const { stringsAddress } = customLogic.commonsConfig;
  console.log(stringsAddress);
  const strings = useLang(stringsAddress);
  if (!strings || Object.keys(strings).length === 0) return null;

  fieldsInterfaceI18n(fields, inputFieldsConfig, strings);
  inputGroupsInterfaceI18n(groupsConfig, strings);
  selectsInterfaceI18n(selectsConfig, strings);
  return {
    configFields: fields,
    configGroups: groupsConfig,
    configSelects: selectsConfig,
  };
};
