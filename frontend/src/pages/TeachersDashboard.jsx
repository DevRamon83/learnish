import { useState } from "react";
import bundle from "shared";
import { classes } from "../constants/components/dashboard";
import YourStudents from "../components/dashboard/YourStudents";
import Settings from "../components/dashboard/Settings";
import DashboardMenu from "../ui/DashboardMenu";
import NewExercise from "../components/dashboard/exercises/create/NewExercise";
const { dashboardTeachersTabs } = bundle.constants;

export default function TeachersDashboard() {
  const [currentTab, setCurrentTab] = useState("students");

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
        {currentTab === "messages" && <Messages />}
      </main>
    </>
  );
}
