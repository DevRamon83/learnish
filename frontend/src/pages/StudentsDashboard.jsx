import { useState } from "react";
import Study from "../components/dashboard/Study";
import useRetriveStats from "../hooks/useRetriveStats";
import { classes } from "../constants/components/dashboard";
import useLogout from "../hooks/useLogout";
import bundle from "shared";
import Settings from "../components/dashboard/Settings";
import DashboardMenu from "../ui/DashboardMenu";
const { dashboardStudentsTabs } = bundle.constants;

export default function StudentsDashboard() {
  const [currentTab, setCurrentTab] = useState("study");
  useRetriveStats();
  useLogout(currentTab);

  return (
    <main className={classes.main}>
      <DashboardMenu
        tabs={dashboardStudentsTabs}
        setCurrentTab={setCurrentTab}
        currentTab={currentTab}
      />
      <div className={classes.core}>
        {currentTab === "study" && <Study />}
        {currentTab === "settings" && <Settings userType="student" />}
      </div>
    </main>
  );
}
