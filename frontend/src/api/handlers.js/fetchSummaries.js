import { API_URLS } from "../../constants/apiUrls";
import { fetchData } from "../fetchData";

const fetchSummaries = async (signal) => {
  const { base, dashboard } = API_URLS;
  const apiUrl = base + dashboard.base + dashboard.summaries;

  const method = "GET";
  const credentials = "include";
  const myData = null;
  const response = await fetchData(apiUrl, method, credentials, myData, {
    signal,
  });

  return response;
};

export default fetchSummaries;
