import { classes } from "../constants/components/dashboard";
import IconBtn from "./buttons/IconBtn";

export default function DashboardMenu({ tabs, setCurrentTab, currentTab }) {
  const { dashBtn, dashActiveBtn, menu } = classes;
  return (
    <div className={menu}>
      {tabs.map((tab) => (
        <IconBtn
          key={`tab${tab}`}
          iconClass={currentTab === tab ? dashActiveBtn : dashBtn}
          img={`/${tab}.svg`}
          handler={setCurrentTab}
          value={tab}
        />
      ))}
    </div>
  );
}
