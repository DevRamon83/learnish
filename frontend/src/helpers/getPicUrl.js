import { userBaseURL } from "../constants/components/dashboard";

const getPicUrl = (user) => {
  const picObj = user.pic || user.profilePic;
  if (!picObj || Object.keys(picObj).length === 0) {
    return `/noPic.svg`;
  }

  const now = Date.now();

  if (picObj.storage === "supabase") {
    return `${userBaseURL}${picObj.bucketImg}/profilePics/${picObj.fileName}?t=${now}`;
  }
};

export default getPicUrl;
