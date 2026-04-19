import { API_URLS } from "../../constants/apiUrls";
import { fetchData } from "../fetchData";

const fetchNewSummary = async (data, signal) => {
  const { base, dashboard } = API_URLS;
  const apiUrl = base + dashboard.base + dashboard.summary;

  const method = "POST";
  const credentials = "include";
  const response = await fetchData(apiUrl, method, credentials, data, {
    signal,
  });

  return response;
};

export default fetchNewSummary;
