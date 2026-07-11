import { useState } from "react";
import bundle from "shared";
import useLogout from "../hooks/useLogout";
import { classes } from "../constants/components/dashboard";
import YourStudents from "../components/dashboard/YourStudents";
import Settings from "../components/dashboard/Settings";
import DashboardMenu from "../ui/DashboardMenu";
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
        {currentTab === "students" && (
          <div className={classes.core}>
            <YourStudents />
          </div>
        )}
        {currentTab === "settings" && (
          <div className={classes.core}>
            <Settings userType="teacher" />
          </div>
        )}
      </main>
    </>
  );
}
