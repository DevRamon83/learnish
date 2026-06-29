import { useState } from "react";
import MyTeacher from "./settings/MyTeacher";
import TeachersList from "./settings/TeachersList";
import getPicUrl from "../../helpers/getPicUrl";

export default function SettingsStudent({ props }) {
  const {
    classes,
    card,
    setCard,
    toggle,
    myTeacher,
    setMyTeacher,
    teachersList,
    setTeachersList,
    teacherObj,
    setToggle,
  } = props;

  return (
    <>
      <MyTeacher props={props} />

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
