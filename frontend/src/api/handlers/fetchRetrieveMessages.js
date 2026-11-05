import { API_URLS } from "../../constants/apiUrls";
import { fetchData } from "../fetchData";

const fetchRetrieveMessages = async (receiverID, indexArray, signal) => {
  const { base, messages } = API_URLS;
  const chatEndpoint = `peerID=${receiverID}`;
  const limitEndpoint = `start=${indexArray[0]}&end=${indexArray[1]}`;
  const endpoint = `?${chatEndpoint}&${limitEndpoint}`;

  const apiUrl = base + messages.base + messages.retrieveMessages + endpoint;

  const method = "GET";
  const credentials = "include";
  const response = await fetchData(apiUrl, method, credentials, null, {
    signal,
  });

  return response;
};

export default fetchRetrieveMessages;
