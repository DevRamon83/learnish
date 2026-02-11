import { useSelector } from "react-redux";
import { useMemo } from "react";
import bundle from "../../../shared";

// Navigates the strings object to find the required segment
// based on the provided keys array.
const getNestedNamespace = (strings, srcArray) => {
  let myStrings = { ...strings };

  for (let i = 0; i < srcArray.length; i++) {
    const src = srcArray[i];
    const obj = myStrings[src];
    myStrings = obj;
  }
  return myStrings;
};

const getStrings = (language, path) => {
  const fullBundle = bundle.langs[language];
  const pathArray = path.split(".");
  const strings = getNestedNamespace(fullBundle, pathArray);
  return strings;
};

const isValid = (path) => {
  if (!path) {
    console.error("[useLang] The path provided is empty or not a string.");
    return false;
  }

  return true;
};

export const useLang = (path = "") => {
  const language = useSelector((state) => state.settings.language);

  return useMemo(() => {
    if (language) {
      const validPath = isValid(path);
      return validPath ? getStrings(language, path) : {};
    }

    return {};
  }, [language, path]);
};
