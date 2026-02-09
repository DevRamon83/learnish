import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLanguage } from "../redux/slices/settingsSlice";
import {
  boilerPlate,
  createSettings,
  getSettings,
} from "../utils/localStorage";

const getData = (settings) => {
  if (!settings) {
    createSettings();
    return boilerPlate;
  } else {
    return JSON.parse(settings);
  }
};

export const usePersonalSettings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const settings = getSettings();
    const data = getData(settings);
    dispatch(setLanguage(data.language));
  }, []);
};
