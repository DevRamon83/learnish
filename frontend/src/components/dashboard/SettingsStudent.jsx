import { useState } from "react";
import MyTeacher from "./settings/MyTeacher";
import TeachersList from "./settings/TeachersList";
import getPicUrl from "../../helpers/getPicUrl";
import useRetrievePersonalSettings from "../../hooks/useRetrievePersonalSettings";

export default function SettingsStudent({ props }) {
  const {
    strings,
    classes,
    toggle,
    teachersList,
    setTeachersList,
    teacherObj,
  } = props;
  const { setter } = teacherObj;

  const retrieveConfig = {
    data: { retrieve: "teacher" },
    setter,
    key: "teacher",
    strings,
  };
  useRetrievePersonalSettings(retrieveConfig);

  return (
    <>
      <MyTeacher props={props} teacherObj={teacherObj} />

      {toggle && (
        <TeachersList
          classes={classes.settings}
          props={props}
          teacherObj={teacherObj}
          teachersList={teachersList}
          setTeachersList={setTeachersList}
        />
      )}
    </>
  );
}
