import { API_URLS } from "../../constants/apiUrls";
import { fetchData } from "../fetchData";

const fetchNewPsw = async (data, token) => {
  const { base, auth } = API_URLS;
  const apiUrl = base + auth.base + auth.newPsw + token;
  const method = "POST";
  const credentials = "include";
  const response = await fetchData(apiUrl, method, credentials, data);

  return response;
};

export default fetchNewPsw;
