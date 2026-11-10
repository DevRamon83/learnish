import { API_URLS } from "../../constants/apiUrls";
import { fetchData } from "../fetchData";

const fetchRetrieveStudentData = async (studentID, signal) => {
  const { base, dashboard } = API_URLS;
  const ID = `?studentID=${studentID}`;

  const apiUrl = base + dashboard.base + dashboard.studentData + ID;

  const method = "GET";
  const credentials = "include";
  const response = await fetchData(apiUrl, method, credentials, null, {
    signal,
  });

  return response;
};

export default fetchRetrieveStudentData;
