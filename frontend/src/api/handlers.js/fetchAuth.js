import { API_URLS } from "../../constants/apiUrls";
import { fetchData } from "../fetchData";

const fetchAuth = async () => {
  const { base, auth } = API_URLS;
  const apiUrl = base + auth.base + auth.check;

  const method = "POST";
  const credentials = "include";
  const response = await fetchData(apiUrl, method, credentials);

  return response;
};

export default fetchAuth;
