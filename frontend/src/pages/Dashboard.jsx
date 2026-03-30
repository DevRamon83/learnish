import { useState } from "react";
import { dashboardTab } from "../constants/dashboard";
import TabMenu from "../components/dashboard/TabMenu";
import Exercises from "../components/dashboard/Exercises";

export default function Dashboard() {
  const [tabMenu, setTabMenu] = useState(dashboardTab[0]);
  return (
    <main>
      <aside>
        <nav>
          <TabMenu tabMenu={tabMenu} setTabMenu={setTabMenu} />
        </nav>
      </aside>
      {tabMenu === "esercizi" && <Exercises />}
    </main>
  );
}
