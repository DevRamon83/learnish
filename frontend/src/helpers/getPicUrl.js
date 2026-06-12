import { userBaseURL } from "../constants/components/dashboard";

const getPicUrl = (user) => {
  if (!user.pic || Object.keys(user.pic).length === 0) {
    return `/noPic.svg`;
  }

  const now = Date.now();

  if (user.pic.storage === "supabase") {
    return `${userBaseURL}${user.pic.bucketImg}/profilePics/${user.pic.fileName}?t=${now}`;
  }
};

export default getPicUrl;
