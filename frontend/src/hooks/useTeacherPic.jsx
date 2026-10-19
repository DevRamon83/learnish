import { useEffect, useState } from "react";
import getPicUrl from "../helpers/getPicUrl";

const useTeacherPic = (myTeacher) => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!myTeacher) {
      setUrl(null);
    } else if (typeof myTeacher === "string") {
      setUrl("/choose.jpg");
    } else {
      const teacherURI = {
        profilePic: {
          storage: "supabase",
          bucketImg: "users",
          fileName: `avatar_${myTeacher.id}.webp`,
        },
      };
      setUrl(getPicUrl(teacherURI));
    }
  }, [myTeacher]);

  return url;
};

export default useTeacherPic;
