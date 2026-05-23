import { API_URLS } from "../../constants/apiUrls";
import { fetchData } from "../fetchData";

const fetchLessons = async (signal) => {
  const { base, trackers } = API_URLS;
  const apiUrl = base + trackers.base + trackers.lessons;

  const method = "GET";
  const credentials = "include";
  const myData = null;
  const response = await fetchData(apiUrl, method, credentials, myData, {
    signal,
  });

  return response;
};

export default fetchLessons;
