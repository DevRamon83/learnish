import { useEffect, useState } from "react";
import bundle from "shared";
import { classes } from "../constants/components/dashboard";
import YourStudents from "../components/dashboard/YourStudents";
import Settings from "../components/dashboard/Settings";
import DashboardMenu from "../ui/DashboardMenu";
import NewExercise from "../components/dashboard/exercises/create/NewExercise";
import Messages from "../components/dashboard/messages/Messages";
import useTabRouting from "../hooks/useTabRouting";
import useChatSignal from "../hooks/useChatSignal";
const { dashboardTeachersTabs } = bundle.constants;

export default function TeachersDashboard() {
  const [currentTab, setCurrentTab] = useState("students");

  // If the user lands on the dashboard by clicking the notification button
  // in the navbar, this hook reads the parameter from the URL to set the current tab
  // and then clears the parameter from the URL itself.
  useTabRouting(setCurrentTab);
  useChatSignal(currentTab);

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
            <YourStudents />
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
            <Messages />
          </div>
        )}
      </main>
    </>
  );
}
