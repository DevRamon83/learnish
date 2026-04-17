import { API_URLS } from "../../constants/apiUrls";
import { fetchData } from "../fetchData";

const fetchCorrection = async (data) => {
  const { base, dashboard } = API_URLS;
  const apiUrl = base + dashboard.base + dashboard.correction;

  const method = "POST";
  const credentials = "include";
  const response = await fetchData(apiUrl, method, credentials, data);

  return response;
};

export default fetchCorrection;
