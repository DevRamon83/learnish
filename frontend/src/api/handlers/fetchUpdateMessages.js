import { API_URLS } from "../../constants/apiUrls";
import { fetchData } from "../fetchData";

const fetchUpdateMessages = async (data, signal) => {
  const { base, messages } = API_URLS;
  const apiUrl = base + messages.base + messages.updateMessages;

  const method = "POST";
  const credentials = "include";
  const response = await fetchData(apiUrl, method, credentials, data, {
    signal,
  });

  return response;
};

export default fetchUpdateMessages;
