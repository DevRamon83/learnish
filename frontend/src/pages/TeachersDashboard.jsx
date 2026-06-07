import { useState } from "react";
import bundle from "shared";
import useLogout from "../hooks/useLogout";
import DashboardMenu from "../components/dashboard/DashboardMenu";
import { classes } from "../constants/components/dashboard";
import YourStudents from "../components/dashboard/YourStudents";
const { dashboardTeachersTabs } = bundle.constants;

export default function TeachersDashboard() {
  const [currentTab, setCurrentTab] = useState("students");
  useLogout(currentTab);

  return (
    <>
      <main className={classes.main}>
        <DashboardMenu
          tabs={dashboardTeachersTabs}
          setCurrentTab={setCurrentTab}
          currentTab={currentTab}
        />
        <div className={classes.core}>
          {currentTab === "students" && <YourStudents />}
        </div>
      </main>
    </>
  );
}
