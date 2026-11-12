import { useEffect, useState } from "react";
import statsHandler from "../helpers/stats/statsHandler";
import fetchRetrieveStudentData from "../api/handlers/fetchRetrieveStudentData";
import { useDispatch } from "react-redux";
import { setStats } from "../redux/slices/statsSlice";

const useRetrieveStudentData = (
  currentStudent,
  studentsMap,
  tab,
  setFetchState,
  setNotify,
) => {
  const [summaries, setSummaries] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();

    const retrieveData = async () => {
      const studentID = currentStudent?.id;
      const currentStudentMap = studentsMap.get(studentID);
      if (!currentStudentMap) return;

      const retrieveSummaries = currentStudentMap.summaries.length === 0;
      const retrieveStats = currentStudentMap.summaries.length === 0;

      if (!retrieveSummaries && !retrieveStats) {
        setSummaries(currentStudentMap.summaries);
        statsHandler(currentStudentMap.stats, dispatch, setStats);
        setFetchState("complete");
        return;
      }

      const resp = await fetchRetrieveStudentData(studentID, controller.signal);

      if (resp.error) return setNotify("generic");

      const data = resp.data;
      const { summaries, stats } = data;

      if (summaries.length === 0) {
        setSummaries(null);
        dispatch(setStats([]));
        setFetchState("complete");
        return;
      }

      const filteredSummaries = summaries.filter(
        (summary) => !summary.misalignment,
      );

      if (filteredSummaries.length === 0) {
        setSummaries(null);
        dispatch(setStats([]));
        setFetchState("complete");
        return;
      }

      currentStudentMap.summaries.push(...filteredSummaries);
      setSummaries(filteredSummaries);
      currentStudentMap.stats.push(...stats);
      statsHandler(stats, dispatch, setStats);
      setFetchState("complete");
    };

    if (tab === "summaries" || tab === "stats") {
      retrieveData();
    }

    return () => controller.abort();
  }, [currentStudent?.id, tab]);

  return summaries;
};

export default useRetrieveStudentData;
