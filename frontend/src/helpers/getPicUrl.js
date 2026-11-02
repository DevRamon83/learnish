import { userBaseURL } from "../constants/components/dashboard";

const getPicUrl = (user, timestamps) => {
  const picObj = user.pic || user.profilePic;
  if (!picObj || Object.keys(picObj).length === 0) {
    return `/noPic.svg`;
  }

  const now = Date.now();

  const refresh = timestamps ? `?t=${now}` : "";

  if (picObj.storage === "supabase") {
    return `${userBaseURL}${picObj.bucketImg}/profilePics/${picObj.fileName}${refresh}`;
  }
};

export default getPicUrl;
