import { useLang } from "../../hooks/useLang";
import { i18nAddresses } from "../../constants/i18nAddresses";
import StudentsList from "../../ui/StudentsList";
import { useState } from "react";
import StudentManager from "./StudentManager";
import Classroom from "./Classroom";
import { classes } from "../../constants/components/classroom";

export default function YourStudents({ studentsMap, students, classrooms }) {
  const { strings } = useLang(i18nAddresses.dashboard);
  const [notify, setNotify] = useState(null);

  const [currentStudent, setCurrentStudent] = useState(null);

  const studentHandler = (student) => {
    setCurrentStudent({ id: student._id, username: student.username });
  };

  return (
    <>
      <div className={classes.myStudents}>
        <h2>{strings.yourClassroom}</h2>
        <Classroom
          classrooms={classrooms}
          students={students}
          strings={strings.classrooms}
          classes={classes}
          setNotify={setNotify}
        />
        <h2>{strings.yourStudents}</h2>
        {students.length > 0 ? (
          <>
            <StudentsList
              list={students}
              current={currentStudent?.id}
              studentHandler={studentHandler}
            />
            <StudentManager
              currentStudent={currentStudent}
              studentsMap={studentsMap}
              students={students}
              strings={strings}
              setNotify={setNotify}
            />
          </>
        ) : (
          <>
            <h4>{strings.zeroStudents}</h4>
            <h5>{strings.checkSettings}</h5>
          </>
        )}
      </div>
      {notify && (
        <div className={classes.notification}>{strings.classrooms[notify]}</div>
      )}
    </>
  );
}
