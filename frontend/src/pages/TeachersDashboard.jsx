import { useEffect, useRef, useState } from "react";
import bundle from "shared";
import { classes } from "../constants/components/dashboard";
import YourStudents from "../components/dashboard/YourStudents";
import Settings from "../components/dashboard/Settings";
import DashboardMenu from "../ui/DashboardMenu";
import NewExercise from "../components/dashboard/exercises/create/NewExercise";
import Messages from "../components/dashboard/messages/Messages";
import useTabRouting from "../hooks/useTabRouting";
import useChatSignal from "../hooks/useChatSignal";
import useMessageSync from "../hooks/useMessageSync";
import { useSelector } from "react-redux";
const { dashboardTeachersTabs } = bundle.constants;

export default function TeachersDashboard() {
  const user = useSelector((state) => state.auth.user);
  const students = user.studentsList;
  const [currentTab, setCurrentTab] = useState("students");

  // Sets the active tab from URL params (e.g., via navbar notifications)
  // and cleans up the URL afterward.
  useTabRouting(setCurrentTab);
  // Determines if the user is chatting
  useChatSignal(currentTab);
  const studentsMapRef = useRef(new Map());
  const studentsMap = studentsMapRef.current;

  useEffect(() => {
    if (!students) return;
    students.forEach((student) => {
      if (!studentsMap.has(student._id)) {
        studentsMap.set(student._id, {
          summaries: [],
          stats: [],
        });
      }
    });
  }, [students]);

  // Initializes the local chat cache and keeps it synchronized with Redux live updates.
  // CRITICAL: This hook also acts as a cleanup mechanism, resetting the global
  // messages store once incoming notifications are processed to avoid memory leaks.
  const messagesCache = useMessageSync();

  return (
    <>
      <main className={classes.main}>
        <DashboardMenu
          tabs={dashboardTeachersTabs}
          setCurrentTab={setCurrentTab}
          currentTab={currentTab}
        />
        {currentTab === "students" && (
          <div className={classes.core}>
            <YourStudents
              studentsMap={studentsMap}
              students={students}
              classrooms={user.classrooms}
            />
          </div>
        )}
        {currentTab === "classrooms" && (
          <div className={classes.core}>
            <NewExercise />
          </div>
        )}
        {currentTab === "settings" && (
          <div className={classes.core}>
            <Settings userType="teacher" />
          </div>
        )}
        {currentTab === "messages" && (
          <div className={classes.core}>
            <Messages cache={messagesCache} />
          </div>
        )}
      </main>
    </>
  );
}
