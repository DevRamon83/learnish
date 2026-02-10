import { useSelector } from "react-redux";
import { getSharedAsset } from "../utils/getSharedAsset";
import { useMemo } from "react";

export const useStrings = () => {
  const language = useSelector((state) => state.settings.language);
  // memoizziamo per evitare che il riferimento cambi se 'language' è uguale
  return useMemo(() => getSharedAsset("language", language), [language]);
};
