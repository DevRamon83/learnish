import { classes } from "../../constants/layout/dashboard";

export default function TabMenu({ tabMenu, setTabMenu, dashboardTab }) {
  return (
    <div>
      {dashboardTab.map((tab) => (
        <div
          key={tab}
          className={tabMenu === tab ? classes.dashActiveBtn : classes.dashBtn}
          onClick={() => {
            setTabMenu(tab);
          }}
        >
          {tab}
        </div>
      ))}
    </div>
  );
}
