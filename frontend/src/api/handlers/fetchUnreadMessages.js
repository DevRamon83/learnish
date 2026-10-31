import { API_URLS } from "../../constants/apiUrls";
import { fetchData } from "../fetchData";

const unreadMessages = async (signal) => {
  const { base, messages } = API_URLS;
  const apiUrl = base + messages.base + messages.unreadMessages;

  const method = "GET";
  const credentials = "include";
  const myData = null;
  const response = await fetchData(apiUrl, method, credentials, myData, {
    signal,
  });

  return response;
};

export default unreadMessages;
