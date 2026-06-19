import { useState } from "react";
import { classes } from "../../../constants/components/dashboard";
import SettingsDataContainer from "../../../ui/SettingsDataContainer";
import useRetrievePersonalSettings from "../../../hooks/useRetrievePersonalSettings";
import bundle from "shared";
const { emailValidator } = bundle;

export default function MyTeacher({
  strings,
  changeTeacher,
  setChangeTeacher,
}) {
  const [userTeacher, setUserTeacher] = useState(null);
  const retrieveConfig = {
    data: { retrieve: "teacher" },
    setter: setUserTeacher,
    key: "teacher",
    strings,
  };
  useRetrievePersonalSettings(retrieveConfig);

  return (
    <div className={classes.settings.evenContainer}>
      <SettingsDataContainer
        type={"text"}
        data={userTeacher}
        classes={classes.settings}
      />

      <div
        onClick={() => setChangeTeacher(true)}
        className={classes.settings.btnChange}
      ></div>
    </div>
  );
}
