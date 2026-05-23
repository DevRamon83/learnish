import { API_URLS } from "../../constants/apiUrls";
import { fetchData } from "../fetchData";

const fetchUnlock = async (data) => {
  const { base, trackers } = API_URLS;
  const apiUrl = base + trackers.base + trackers.unlock;

  const method = "POST";
  const credentials = "include";
  const response = await fetchData(apiUrl, method, credentials, data);

  return response;
};

export default fetchUnlock;
