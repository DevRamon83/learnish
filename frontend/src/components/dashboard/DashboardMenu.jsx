import { classes } from "../../constants/components/dashboard";
import IconBtn from "../../ui/buttons/IconBtn";

export default function DashboardMenu({ setCurrentTab, currentTab }) {
  const { dashBtn, dashActiveBtn, menu } = classes;

  return (
    <div className={menu}>
      <IconBtn
        iconClass={currentTab === "study" ? dashActiveBtn : dashBtn}
        img={"/study.svg"}
        handler={setCurrentTab}
        value={"study"}
      />
      <IconBtn
        iconClass={currentTab === "stats" ? dashActiveBtn : dashBtn}
        img={"/stats.svg"}
        handler={setCurrentTab}
        value={"stats"}
      />
      <IconBtn
        iconClass={currentTab === "settings" ? dashActiveBtn : dashBtn}
        img={"/settings.svg"}
        handler={setCurrentTab}
        value={"settings"}
      />
      <IconBtn
        iconClass={currentTab === "logout" ? dashActiveBtn : dashBtn}
        img={"/logout.svg"}
        handler={setCurrentTab}
        value={"logout"}
      />
    </div>
  );
}
