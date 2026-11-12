import { useState } from "react";
import NewClassroom from "./NewClassroom";
import ClassroomManager from "./ClassroomManager";
import ClassroomBadgeContainer from "../../ui/ClassroomBadgeContainer";

export default function Classroom({
  classrooms,
  students,
  strings,
  classes,
  setNotify,
}) {
  const [currentClassroom, setCurrentClassroom] = useState(null);

  const [enrollmentPanel, setEnrollmentPanel] = useState("");
  const [badgePanel, setBadgePanel] = useState("");

  const enrollmentHandler = (key, value) => {
    setCurrentClassroom(key);
    setEnrollmentPanel(value);
    if (badgePanel === "-open") setBadgePanel("-close");
  };

  const currentBadge = currentClassroom ? currentClassroom.split("-") : null;
  const animals = Object.keys(classrooms);

  const resetAll = () => {
    setEnrollmentPanel("-close");
    setCurrentClassroom(null);
    setNotify(null);
  };

  const badgePanelIsClose = badgePanel === "" || badgePanel === "-close";

  const badgeBtn = badgePanel === "-open" ? "close" : "add";

  const toggleBadgePanel = () => {
    const nextAction = badgePanel === "-open" ? "-close" : "-open";
    setBadgePanel(nextAction);

    if (enrollmentPanel === "-open") {
      enrollmentHandler(null, "-close");
    }
  };

  return (
    <div className={classes.container}>
      {classrooms.length === 0 ? (
        badgePanelIsClose && (
          <>
            <h4>{strings.createFirst}</h4>
            <img src="/add.svg" />
          </>
        )
      ) : (
        <>
          <ClassroomBadgeContainer
            classes={classes}
            animals={animals}
            enrollmentHandler={enrollmentHandler}
            currentClassroom={currentClassroom}
            classrooms={classrooms}
            badgeBtn={badgeBtn}
            toggleBadgePanel={toggleBadgePanel}
          />

          <NewClassroom
            classes={classes}
            strings={strings}
            badgePanel={badgePanel}
            setBadgePanel={setBadgePanel}
            setNotify={setNotify}
          />

          <ClassroomManager
            currentBadge={currentBadge}
            enrollmentHandler={enrollmentHandler}
            students={students}
            currentClassroom={currentClassroom}
            resetAll={resetAll}
            classes={classes}
            strings={strings}
            enrollmentPanel={enrollmentPanel}
            setNotify={setNotify}
          />
        </>
      )}
    </div>
  );
}
