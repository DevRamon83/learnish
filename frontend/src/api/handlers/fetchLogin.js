import { API_URLS } from "../../constants/apiUrls";
import { fetchData } from "../fetchData";

const fetchLogin = async (data) => {
  const { base, auth } = API_URLS;
  const apiUrl = base + auth.base + auth.login;

  const method = "POST";
  const credentials = "include";
  const response = await fetchData(apiUrl, method, credentials, data);

  return response;
};

export default fetchLogin;
