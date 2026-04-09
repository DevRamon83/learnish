import { API_URLS } from "../../constants/apiUrls";
import { fetchData } from "../fetchData";

const fetchConfirmationToken = async (token, signal) => {
  const { base, auth } = API_URLS;
  const apiUrl = base + auth.base + auth.verify + token;

  const method = "GET";
  const credentials = "include";
  const myData = null;
  const response = await fetchData(apiUrl, method, credentials, myData, {
    signal,
  });

  return response;
};

export default fetchConfirmationToken;
