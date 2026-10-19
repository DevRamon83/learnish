import { useState } from "react";

const useTeacherNav = (strings, myTeacher, teachersList) => {
  const [currentTeacher, setCurrentTeacher] = useState(0);

  const previous = currentTeacher === 0 ? strings.start : strings.back;
  const next =
    currentTeacher === teachersList.length - 1 ? strings.end : strings.next;

  const navigationHandler = (action) => {
    const step = action === "next" ? 1 : -1;
    const end = action === "next" ? teachersList.length - 1 : 0;

    if (currentTeacher !== end) {
      setCurrentTeacher((prev) => prev + step);
    }
  };

  const chooseBtnText =
    teachersList[currentTeacher]?.username === myTeacher.username
      ? strings.deactivate
      : strings.choose;

  return { chooseBtnText, navigationHandler, next, previous, currentTeacher };
};

export default useTeacherNav;
