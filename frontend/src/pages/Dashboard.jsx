import { useState } from "react";
import TabMenu from "../components/dashboard/TabMenu";
import Exercises from "../components/dashboard/Exercises";
import { useLang } from "../hooks/useLang";
import { i18nAddresses } from "../constants/i18nAddresses";

export default function Dashboard() {
  const { strings, lang } = useLang(i18nAddresses.dashboard);
  const dashboardTab = strings.dashboardTab;
  const exercisesTab = strings.exercisesTab;
  const [tabMenu, setTabMenu] = useState(dashboardTab[0]);
  return (
    <main>
      <aside>
        <nav>
          <TabMenu
            dashboardTab={dashboardTab}
            tabMenu={tabMenu}
            setTabMenu={setTabMenu}
          />
        </nav>
      </aside>
      <div className="dashboard">
        {tabMenu === "esercizi" && <Exercises exercisesTab={exercisesTab} />}
      </div>
    </main>
  );
}
