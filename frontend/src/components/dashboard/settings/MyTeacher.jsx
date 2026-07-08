import { useState } from "react";
import getPicUrl from "../../../helpers/getPicUrl";
import SettingsCommonTitle from "../../../ui/settings/SettingsCommonTitle";
import useRetrievePersonalSettings from "../../../hooks/useRetrievePersonalSettings";

export default function MyTeacher({ props, studentProps }) {
  const { strings, classes, toggle, setToggle } = props;
  const { myTeacher, setMyTeacher } = studentProps;

  const retrieveConfig = {
    data: { retrieve: "teacher" },
    setter: setMyTeacher,
    key: "teacher",
    strings,
  };
  useRetrievePersonalSettings(retrieveConfig);

  const teacher = {
    profilePic: {
      storage: "supabase",
      bucketImg: "users",
      fileName: `avatar_${myTeacher?.id}.webp`,
    },
  };

  const url = getPicUrl(teacher);

  return (
    <>
      <SettingsCommonTitle
        classes={classes}
        string={`${strings.yourTeacher} ${myTeacher?.username}`}
        src={url}
      />
    </>
  );
}
