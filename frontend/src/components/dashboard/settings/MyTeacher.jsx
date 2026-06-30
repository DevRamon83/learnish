import { useState } from "react";
import useRetrievePersonalSettings from "../../../hooks/useRetrievePersonalSettings";
import getPicUrl from "../../../helpers/getPicUrl";
import SettingsBreadcrumb from "../SettingsBreadcrumb";
import SettingsButtonContainer from "../../../ui/buttons/SettingsButtonContainer";

export default function MyTeacher({ props }) {
  const { strings, classes, cardHandler, toggle, setToggle, teacherObj } =
    props;
  const { id, username, url, setter, state } = teacherObj;

  const retrieveConfig = {
    data: { retrieve: "teacher" },
    setter,
    key: "teacher",
    strings,
  };
  useRetrievePersonalSettings(retrieveConfig);

  const submitHandler = () => {
    console.log("ciao");
  };

  return (
    <div className={classes.settings.container}>
      <h3 className="settings__title">{`${strings.yourTeacher} ${username}`}</h3>
      <div className="settings__imgContainer">
        <img src={url} />
      </div>

      <SettingsButtonContainer
        toggle={toggle}
        setToggle={setToggle}
        classes={classes}
        submitHandler={submitHandler}
      />

      <SettingsBreadcrumb props={props} />
    </div>
  );
}
