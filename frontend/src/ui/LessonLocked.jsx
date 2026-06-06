import { NavLink } from "react-router-dom";
import { i18nAddresses } from "../constants/i18nAddresses";
import { useLang } from "../hooks/useLang";
import { useSelector } from "react-redux";
import { classes } from "../constants/components/dashboard";

export default function LessonLocked() {
  const { strings } = useLang(i18nAddresses.dashboard);
  const user = useSelector((state) => state.auth.user);

  return (
    <div className={classes.lessons.mainLocked}>
      <h1>{strings.lessonLocked}</h1>
      <div className={classes.lessons.locked}>
        <img src="/locked.jpeg" />
        <div className={classes.lessons.textLocked}>
          {strings.lockedText}
          <NavLink
            className={classes.lessons.lockedBack}
            to={`/user/${user.type}/${user.id}`}
          >
            {strings.goToDashboard}
          </NavLink>
        </div>
      </div>
    </div>
  );
}
