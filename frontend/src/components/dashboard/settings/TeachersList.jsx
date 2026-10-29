import useScrollToTop from "../../../hooks/useScrollToTop";
import TeachersProfile from "../../../ui/teachers/TeachersProfile";
import fetchYourTeacher from "../../../api/handlers/fetchYourTeacher";
import { useLang } from "../../../hooks/useLang";
import { i18nAddresses } from "../../../constants/i18nAddresses";
import useTeacherNav from "../../../hooks/UseTeacherNav";
import useRetriveTeachersList from "../../../hooks/useRetriveTeachersList";
import { useState } from "react";
import TeacherDeactivateAlert from "../../../ui/settings/TeacherDeactivateAlert";
import { updateStudentTeacher } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

export default function TeachersList({ studentProps, props }) {
  // 1. Destructuring & Layout Config
  const { strings, setToggle, setError } = props;
  const classes = props.classes.settings;
  const { myTeacher, setMyTeacher, teachersList, setTeachersList } =
    studentProps;

  const dispatch = useDispatch();

  // 2. Local UI States & Translations
  const [deactivatePanel, setDeactivatePanel] = useState("close");
  const errorStrings = useLang(i18nAddresses.errors);

  // 3. Side Effects & Domain Hooks
  useScrollToTop();
  useRetriveTeachersList(setError, setTeachersList, errorStrings);
  const { chooseBtnText, navigationHandler, next, previous, currentTeacher } =
    useTeacherNav(strings, myTeacher, teachersList);

  const chooseTeacher = async () => {
    setError(null);

    const action =
      teachersList[currentTeacher].username === myTeacher.username
        ? "deactivate"
        : "choose";

    const alert = deactivatePanel === "close" && action === "deactivate";

    if (alert) return setDeactivatePanel("open");

    setDeactivatePanel("close");

    const newTeacher = await fetchYourTeacher({
      id: teachersList[currentTeacher]._id,
      action,
    });

    if (newTeacher.error) {
      setError(errorStrings.strings.generic);
      return;
    }

    let teacherData = null;

    if (action === "choose") {
      teacherData = {
        id: teachersList[currentTeacher]._id,
        username: teachersList[currentTeacher].username,
      };
    }

    dispatch(updateStudentTeacher(teacherData));
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
        <div onClick={chooseTeacher}>{chooseBtnText}</div>
        <div onClick={() => navigationHandler("next")}>{next}</div>
      </div>
      <TeacherDeactivateAlert
        deactivatePanel={deactivatePanel}
        setDeactivatePanel={setDeactivatePanel}
        chooseTeacher={chooseTeacher}
        classes={classes}
        strings={strings}
      />
    </div>
  );
}
