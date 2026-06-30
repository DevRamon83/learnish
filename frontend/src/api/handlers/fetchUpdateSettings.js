import { API_URLS } from "../../constants/apiUrls";
import { fetchData } from "../fetchData";

const fetchUpdateSettings = async (data) => {
  const { base, update } = API_URLS;
  const apiUrl = base + update.base + update.settings;
  const method = "POST";
  const credentials = "include";
  const response = await fetchData(apiUrl, method, credentials, data);

  return response;
};

export default fetchUpdateSettings;
