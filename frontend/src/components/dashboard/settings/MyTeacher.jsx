import { useState } from "react";
import getPicUrl from "../../../helpers/getPicUrl";
import Breadcrumb from "./Breadcrumb";
import SettingsButtonContainer from "../../../ui/buttons/SettingsButtonContainer";
import SettingsCommonTitle from "../../../ui/settings/SettingsCommonTitle";

export default function MyTeacher({ props }) {
  const { strings, classes, cardHandler, toggle, setToggle, teacherObj } =
    props;
  const { id, username, url, setter, state } = teacherObj;

  return (
    <div className={classes.settings.container}>
      <SettingsCommonTitle
        classes={classes}
        string={`${strings.yourTeacher} ${username}`}
        src={url}
      />

      <SettingsButtonContainer
        toggle={toggle}
        setToggle={setToggle}
        classes={classes}
      />

      <Breadcrumb props={props} />
    </div>
  );
}
