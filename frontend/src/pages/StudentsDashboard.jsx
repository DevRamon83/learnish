import { useState } from "react";
import DashboardMenu from "../components/dashboard/DashboardMenu";
import Study from "../components/dashboard/Study";
import useRetriveStats from "../hooks/useRetriveStats";
import { classes } from "../constants/components/dashboard";
import useLogout from "../hooks/useLogout";
import bundle from "shared";
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
      <div className={classes.core}>{currentTab === "study" && <Study />}</div>
    </main>
  );
}
