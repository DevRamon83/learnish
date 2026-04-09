import { API_URLS } from "../../constants/apiUrls";
import { fetchData } from "../fetchData";

const fetchSignup = async (dataSignup) => {
  const { base, auth } = API_URLS;
  const apiUrl = base + auth.base + auth.signup;

  const method = "POST";
  const credentials = "include";
  const response = await fetchData(apiUrl, method, credentials, dataSignup);

  return response;
};

export default fetchSignup;
