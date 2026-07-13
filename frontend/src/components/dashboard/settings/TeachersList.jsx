import { useEffect, useState } from "react";
import fetchTeachers from "../../../api/handlers/fetchTeachers";
import useScrollToTop from "../../../hooks/useScrollToTop";
import TeachersProfile from "../../../ui/teachers/TeachersProfile";
import fetchYourTeacher from "../../../api/handlers/fetchYourTeacher";
import { useLang } from "../../../hooks/useLang";
import { i18nAddresses } from "../../../constants/i18nAddresses";

export default function TeachersList({ studentProps, props }) {
  const { strings, setToggle, setError } = props;
  const classes = props.classes.settings;
  const { myTeacher, setMyTeacher, teachersList, setTeachersList } =
    studentProps;
  const errorStrings = useLang(i18nAddresses.errors);
  const [currentTeacher, setCurrentTeacher] = useState(0);
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");
  useScrollToTop();

  useEffect(() => {
    const controller = new AbortController();
    setError(null);

    const retrive = async () => {
      const res = await fetchTeachers(controller.signal);
      if (res.aborted) return;

      if (res.error) {
        setError(errorStrings.strings.generic);
      } else {
        setTeachersList([...res]);
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

    if (currentTeacher === teachersList.length - 1) {
      setNext(strings.end);
    } else {
      setNext(strings.next);
    }
  }, [currentTeacher]);

  const navigationHandler = (action) => {
    const step = action === "next" ? 1 : -1;
    const end = action === "next" ? teachersList.length - 1 : 0;

    if (currentTeacher !== end) {
      setCurrentTeacher((prev) => prev + step);
    }
  };

  const chooseTeacher = async () => {
    if (myTeacher.id === teachersList[currentTeacher]._id) {
      setToggle(false);
      return;
    }

    setError(null);
    const newTeacher = await fetchYourTeacher({
      id: teachersList[currentTeacher]._id,
    });

    if (newTeacher.error) {
      setError(errorStrings.strings.generic);
      return;
    }

    setMyTeacher(newTeacher.teacher);
    setToggle(false);
  };

  return (
    <div className={classes.teacherList}>
      {teachersList.length !== 0 && (
        <TeachersProfile
          teacher={teachersList[currentTeacher]}
          strings={strings}
          classes={classes}
        />
      )}
      <div className={classes.teacherMenu}>
        <div onClick={() => navigationHandler("back")}>{previous}</div>
        <div onClick={chooseTeacher}>{strings.choose}</div>
        <div onClick={() => navigationHandler("next")}>{next}</div>
      </div>
    </div>
  );
}
