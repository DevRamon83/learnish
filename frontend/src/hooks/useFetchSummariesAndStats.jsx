import { useEffect, useState } from "react";
import fetchAllStats from "../api/handlers/fetchAllStats";
import { useDispatch } from "react-redux";
import statsHandler from "../helpers/stats/statsHandler";
import { setStats } from "../redux/slices/statsSlice";

const useFetchSummariesAndStats = (fetchHandler) => {
  const [fetchStatus, setFetchStatus] = useState(null);
  const [retry, setRetry] = useState(0);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const summariesController = new AbortController();
    const statsController = new AbortController();

    const loadData = async () => {
      setFetchStatus(null);
      const res = await fetchHandler(summariesController.signal);

      if (res.error) {
        setFetchStatus("fail");
        return;
      }

      if (res.length === 0) {
        setFetchStatus("void");
      } else {
        setFetchStatus(null);
        setData(res);
      }
    };

    const allStats = async () => {
      const resp = await fetchAllStats(statsController.signal);
      if (resp.error) {
        // error handler
      } else {
        statsHandler(resp.stats, dispatch, setStats);
      }
    };

    allStats();
    loadData();

    return () => {
      summariesController.abort();
      statsController.abort();
    };
  }, [retry]);

  return { fetchStatus, setFetchStatus, retry, setRetry, data, setData };
};

export default useFetchSummariesAndStats;
