import { API_URLS } from "../../constants/apiUrls";
import { fetchData } from "../fetchData";

const fetchUpdateContract = async (data) => {
  const { base, update } = API_URLS;
  const apiUrl = base + update.base + update.contract;

  const method = "POST";
  const credentials = "include";
  const response = await fetchData(apiUrl, method, credentials, data);

  return response;
};

export default fetchUpdateContract;
