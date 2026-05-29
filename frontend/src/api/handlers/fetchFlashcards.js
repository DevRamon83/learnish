import { API_URLS } from "../../constants/apiUrls";
import { fetchData } from "../fetchData";

const fetchFlashcards = async (signal) => {
  const { base, dashboard } = API_URLS;
  const apiUrl = base + dashboard.base + dashboard.flashcards;

  const method = "GET";
  const credentials = "include";
  const myData = null;
  const response = await fetchData(apiUrl, method, credentials, myData, {
    signal,
  });

  return response;
};

export default fetchFlashcards;
