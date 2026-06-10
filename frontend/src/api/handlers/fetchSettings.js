import { API_URLS } from "../../constants/apiUrls";
import { fetchData } from "../fetchData";

const fetchSettings = async (data, signal) => {
  const { base, auth } = API_URLS;
  const apiUrl = base + auth.base + auth.retrieve;

  const method = "POST";
  const credentials = "include";
  const response = await fetchData(apiUrl, method, credentials, data, {
    signal,
  });

  return response;
};

export default fetchSettings;
