import { classes } from "../../constants/components/dashboard";
import IconBtn from "../../ui/buttons/IconBtn";

export default function DashboardMenu({ setCurrent, current }) {
  const { dashBtn, dashActiveBtn, menu } = classes;

  return (
    <div className={menu}>
      <IconBtn
        iconClass={current === "study" ? dashActiveBtn : dashBtn}
        img={"/study.svg"}
        handler={setCurrent}
        value={"study"}
      />
      <IconBtn
        iconClass={current === "stats" ? dashActiveBtn : dashBtn}
        img={"/stats.svg"}
        handler={setCurrent}
        value={"stats"}
      />
      <IconBtn
        iconClass={current === "settings" ? dashActiveBtn : dashBtn}
        img={"/settings.svg"}
        handler={setCurrent}
        value={"settings"}
      />
      <IconBtn
        iconClass={current === "logout" ? dashActiveBtn : dashBtn}
        img={"/logout.svg"}
        handler={setCurrent}
        value={"logout"}
      />
    </div>
  );
}
