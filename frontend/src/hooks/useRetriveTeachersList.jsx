import { useEffect } from "react";
import fetchTeachers from "../api/handlers/fetchTeachers";

export const useRetriveTeachersList = async (
  setError,
  setTeachersList,
  errorStrings,
) => {
  useEffect(() => {
    const controller = new AbortController();
    setError(null);

    const retrive = async () => {
      const res = await fetchTeachers(controller.signal);
      if (res.aborted) return;

      if (res.error) {
        setError(errorStrings.strings.generic);
      } else {
        setTeachersList([...res]);
      }
    };

    retrive();

    return () => controller.abort();
  }, []);
};

export default useRetriveTeachersList;
