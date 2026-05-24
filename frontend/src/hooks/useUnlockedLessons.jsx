import { useEffect, useState } from "react";
import fetchLessons from "../api/handlers/fetchLessons";

export const useUnlockedLessons = () => {
  const [userLessons, setUserLessons] = useState(null);
  useEffect(() => {
    const controller = new AbortController();

    const lessons = async () => {
      const resp = await fetchLessons(controller.signal);
      if (resp.error) {
        // error handler
      } else {
        setUserLessons(resp.unlocked);
      }
    };

    lessons();
    return () => controller.abort();
  }, []);

  return { userLessons, setUserLessons };
};
