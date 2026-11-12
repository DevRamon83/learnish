import { useDispatch } from "react-redux";
import { updateStudentsList } from "../../redux/slices/authSlice";
import fetchStudentsClassroom from "../../api/handlers/fetchStudentsClassroom";
import useClassroomsHandler from "../../hooks/useClassroomsHandler";
import { useState } from "react";
import ClassroomSelection from "../../ui/ClassroomSelection";
import getClassroomPayload from "../../helpers/stats/getClassroomPayload";
import ClassroomManagerBtnsContainer from "../../ui/ClassroomManagerBtnsContainer";

export default function ClassroomManager({
  currentBadge,
  enrollmentHandler,
  students,
  currentClassroom,
  resetAll,
  classes,
  strings,
  enrollmentPanel,
  setNotify,
}) {
  const dispatch = useDispatch();
  const [sendBtn, setSendBtn] = useState(true);

  const { enrolled, setEnrolled, free, setFree } = useClassroomsHandler(
    currentClassroom,
    students,
  );

  // handles the logic of adding and removing from both ClassroomSelection
  const studentHandler = (username, action) => {
    const removeFrom = action === "add" ? free : enrolled;
    const addTo = action === "add" ? enrolled : free;

    const remover = action === "add" ? setFree : setEnrolled;
    const adder = action === "add" ? setEnrolled : setFree;

    const array = [...removeFrom];
    const filtered = array.filter((user) => user !== username);
    remover(filtered);
    adder([...addTo, username]);
  };

  const addStudent = async () => {
    if (!sendBtn) return;
    setSendBtn(false);
    // Starting from the list of all students, defines which ones have been acted upon.
    const payload = getClassroomPayload(students, currentClassroom, enrolled);

    if (Object.keys(payload).length === 0) {
      resetAll();
      setSendBtn(true);
      return;
    }

    const data = { currentClassroom, payload };

    const resp = await fetchStudentsClassroom(data);
    if (resp.error) {
      setSendBtn(true);
      setNotify("generic");
      return;
    }

    const dataRedux = { currentBadge, data: payload };

    dispatch(updateStudentsList(dataRedux));
    resetAll();
    setSendBtn(true);
  };

  const { badge } = classes;

  return (
    <div className={`classrooms__panel${enrollmentPanel}`}>
      {currentBadge && (
        <div className={`${badge}-h2 ${`${badge}-${currentBadge[0]}`}`}>
          <img src={`/badges/${currentBadge[1]}.svg`} />{" "}
          <h2>{strings.classroomH2}</h2>
        </div>
      )}
      <div className={classes.listContainer}>
        <ClassroomSelection
          classes={classes}
          array={free}
          action="add"
          icon="next"
          studentHandler={studentHandler}
          strings={strings}
        />
        <ClassroomSelection
          classes={classes}
          array={enrolled}
          action="remove"
          icon="trash"
          studentHandler={studentHandler}
          strings={strings}
        />
      </div>

      <ClassroomManagerBtnsContainer
        classes={classes}
        enrollmentHandler={enrollmentHandler}
        strings={strings}
        addStudent={addStudent}
      />
    </div>
  );
}
