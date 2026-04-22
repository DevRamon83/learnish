import { useEffect } from "react";
import fetchAllStats from "../api/handlers/fetchAllStats";
import { useDispatch, useSelector } from "react-redux";
import { setStats } from "../redux/slices/statsSlice";
import statsHandler from "../helpers/stats/statsHandler";

const useRetriveStats = () => {
  const statsRedux = useSelector((state) => state.stats);
  const dispatch = useDispatch();

  useEffect(() => {
    if (statsRedux.data.length !== 0) return;
    const controller = new AbortController();

    const allStats = async () => {
      const resp = await fetchAllStats(controller.signal);
      if (resp.error) {
        // error handler
      } else {
        statsHandler(resp.stats, dispatch, setStats);
      }
    };

    allStats();

    return () => controller.abort();
  }, []);
};

export default useRetriveStats;
