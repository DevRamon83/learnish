import { API_URLS } from "../../constants/apiUrls";
import { fetchData } from "../fetchData";

const fetchNewMessage = async (data) => {
  const { base, messages } = API_URLS;
  const apiUrl = base + messages.base + messages.new;

  const method = "POST";
  const credentials = "include";
  const response = await fetchData(apiUrl, method, credentials, data);

  return response;
};

export default fetchNewMessage;
