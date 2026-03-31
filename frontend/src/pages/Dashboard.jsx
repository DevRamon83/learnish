import { useState } from "react";
import TabMenu from "../components/dashboard/TabMenu";
import Exercises from "../components/dashboard/Exercises";
import { dashboardTab } from "../constants/layout/dashboard";

export default function Dashboard() {
  const [tabMenu, setTabMenu] = useState(dashboardTab[0]);
  return (
    <main>
      <aside>
        <nav>
          <TabMenu tabMenu={tabMenu} setTabMenu={setTabMenu} />
        </nav>
      </aside>
      <div className="dashboard">{tabMenu === "esercizi" && <Exercises />}</div>
    </main>
  );
}
