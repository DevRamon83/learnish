import { useState } from "react";
import Study from "../components/dashboard/Study";
import useRetrieveStats from "../hooks/useRetrieveStats";
import { classes } from "../constants/components/dashboard";
import useLogout from "../hooks/useLogout";
import bundle from "shared";
import Settings from "../components/dashboard/Settings";
import DashboardMenu from "../ui/DashboardMenu";
import Statistics from "../components/dashboard/stats/Statistics";
const { dashboardStudentsTabs } = bundle.constants;

export default function StudentsDashboard() {
  const [currentTab, setCurrentTab] = useState("study");

  // NOTE: This hook fetches and synchronizes student statistics into the global store.
  // It is explicitly kept here because other independent features
  // (e.g., generating new summaries)rely on this up-to-date statistical data
  // to function correctly.
  useRetrieveStats();
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
        {currentTab === "stats" && <Statistics />}
        {currentTab === "settings" && <Settings userType="student" />}
      </div>
    </main>
  );
}
