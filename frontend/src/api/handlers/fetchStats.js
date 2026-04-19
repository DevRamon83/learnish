import { API_URLS } from "../../constants/apiUrls";
import { fetchData } from "../fetchData";

const fetchStats = async (data, signal) => {
  const { base, dashboard } = API_URLS;
  const apiUrl = base + dashboard.base + dashboard.stats;

  const method = "POST";
  const credentials = "include";
  const response = await fetchData(apiUrl, method, credentials, data, {
    signal,
  });

  return response;
};

export default fetchStats;
