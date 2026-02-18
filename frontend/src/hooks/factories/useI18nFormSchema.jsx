import { useLang } from "../useLang";
import {
  fieldsInterfaceI18n,
  inputGroupInterfaceI18n,
} from "./helpers/i18nHelper";

export const useI18nFormSchema = (customLogic, fields) => {
  const { inputFieldsConfig, groupConfig } = customLogic;
  const { stringsAddress } = inputFieldsConfig;
  const strings = useLang(stringsAddress);
  if (!strings || Object.keys(strings).length === 0) return null;

  fieldsInterfaceI18n(fields, inputFieldsConfig, strings);
  inputGroupInterfaceI18n(groupConfig, strings);
  return { configFields: fields, configGroups: groupConfig };
};
