import { useEffect } from "react";
import fetchSettings from "../api/handlers/fetchSettings";

export default function useRetrievePersonalSettings(config) {
  const { data, setter, key } = config;
  useEffect(() => {
    const controller = new AbortController();

    const retrive = async () => {
      const res = await fetchSettings(data, controller.signal);
      if (res.error) {
        // error handler
      } else {
        setter(res[key]);
      }
    };

    retrive();

    return () => controller.abort();
  }, []);
}
