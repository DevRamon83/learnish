import bundle from "../../../../shared";
import { useLang } from "../useLang";
import { interfaceI18n } from "./helpers/commonsHelper";
import {
  inputGroupsInterfaceI18n,
  selectsInterfaceI18n,
} from "./helpers/i18nHelper";

const validObj = bundle.validators.atomicsValidators.isObjValid;

export const useI18nFactory = (customLogic, fields, textareas) => {
  const { fieldsConfig, groupsConfig, selectsConfig, textareasConfig } =
    customLogic;

  const { stringsAddress } = customLogic.commonsConfig;
  const strings = useLang(stringsAddress);
  if (!strings || Object.keys(strings).length === 0) return null;
  validObj(fieldsConfig) && interfaceI18n(fields, fieldsConfig, strings);
  validObj(groupsConfig) && inputGroupsInterfaceI18n(groupsConfig, strings);
  validObj(selectsConfig) && selectsInterfaceI18n(selectsConfig, strings);
  validObj(textareasConfig) &&
    interfaceI18n(textareas, textareasConfig, strings);
  return {
    configFields: fields,
    configGroups: groupsConfig,
    configSelects: selectsConfig,
    configTextareas: textareas,
  };
};
