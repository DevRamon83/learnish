import { useEffect, useState } from "react";
import fetchTeachers from "../../../api/handlers/fetchTeachers";
import useScrollToTop from "../../../hooks/useScrollToTop";
import TeachersProfile from "../../../ui/teachers/TeachersProfile";
import ChangeTeacherMenu from "../../../ui/teachers/ChangeTeacherMenu";

export default function TeachersList({ setChangeTeacher, strings, classes }) {
  const [teachers, setTeachers] = useState([]);
  const [currentTeacher, setCurrentTeacher] = useState(0);
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");
  useScrollToTop();

  useEffect(() => {
    const controller = new AbortController();

    const retrive = async () => {
      const res = await fetchTeachers(controller.signal);
      if (res.error) {
        // error handler
      } else {
        setTeachers([...res]);
      }
    };

    retrive();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (currentTeacher === 0) {
      setPrevious(strings.start);
    } else {
      setPrevious(strings.back);
    }

    if (currentTeacher === teachers.length - 1) {
      setNext(strings.end);
    } else {
      setNext(strings.next);
    }
  }, [currentTeacher]);

  const navigationHandler = (action) => {
    const step = action === "next" ? 1 : -1;
    const end = action === "next" ? teachers.length - 1 : 0;

    if (currentTeacher !== end) {
      setCurrentTeacher((prev) => prev + step);
    }
  };

  return (
    <div className={classes.teacherList}>
      <h1>{strings.list}</h1>
      {teachers.length !== 0 && (
        <TeachersProfile
          teacher={teachers[currentTeacher]}
          strings={strings}
          classes={classes}
        />
      )}
      <ChangeTeacherMenu
        classes={classes}
        navigationHandler={navigationHandler}
        setChangeTeacher={setChangeTeacher}
        strings={strings}
        previous={previous}
        next={next}
      />
    </div>
  );
}
