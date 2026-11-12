import { useEffect, useState } from "react";
import { classes, teacherTabs } from "../../constants/components/dashboard";
import Statistics from "./stats/Statistics";
const { container } = classes.studentManager;
import { classes as classrooms } from "../../constants/components/classroom";
import useRetrieveStudentData from "../../hooks/useRetrieveStudentData";
import StudentManagerTabMenu from "../../ui/StudentManagerTabMenu";
import StudentManagerSystemMessages from "../../ui/StudentManagerSystemMessages";
import StudentManagerBadge from "../../ui/StudentManagerBadge";
import StudentManagerSummaries from "../../ui/StudentManagerSummaries";
const { badge } = classrooms;

export default function StudentManager({
  currentStudent,
  studentsMap,
  students,
  strings,
  setNotify,
}) {
  const [tab, setTab] = useState(null);
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(null);
  const [animal, setAnimal] = useState(null);
  const [fetchState, setFetchState] = useState("pending");

  const summaries = useRetrieveStudentData(
    currentStudent,
    studentsMap,
    tab,
    setFetchState,
    setNotify,
  );

  useEffect(() => {
    if (!currentStudent) return;
    const myStudent = students.find(
      (student) => student._id === currentStudent.id,
    );

    const badgeColor = myStudent.classroom ? myStudent.classroom[0] : null;
    const badgeAnimal = myStudent.classroom ? myStudent.classroom[1] : null;
    setColor(badgeColor);
    setAnimal(badgeAnimal);
  }, [currentStudent?.id]);

  return (
    <>
      <StudentManagerTabMenu
        classes={classes}
        teacherTabs={teacherTabs}
        strings={strings.studentManager}
        setTab={setTab}
        tab={tab}
      />
      <div className={container}>
        {tab === "summaries" && (
          <StudentManagerSummaries
            summaries={summaries}
            currentStudent={currentStudent}
            classes={classes}
            open={open}
            setOpen={setOpen}
          />
        )}
        {tab === "stats" && summaries && <Statistics />}
        {tab === "enrolled" && (
          <StudentManagerBadge
            currentStudent={currentStudent}
            badge={badge}
            color={color}
            animal={animal}
            strings={strings}
          />
        )}
        <StudentManagerSystemMessages
          summaries={summaries}
          tab={tab}
          currentStudent={currentStudent}
          fetchState={fetchState}
          strings={strings}
        />
      </div>
    </>
  );
}
