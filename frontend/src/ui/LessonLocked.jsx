import { NavLink } from "react-router-dom";
import { i18nAddresses } from "../constants/i18nAddresses";
import { useLang } from "../hooks/useLang";
import { useSelector } from "react-redux";

export default function LessonLocked() {
  const { strings } = useLang(i18nAddresses.dashboard);
  const userID = useSelector((state) => state.auth.user.id);

  return (
    <div className="lesson__mainLocked">
      <h1>{strings.lessonLocked}</h1>
      <div className="lesson__locked">
        <img src="/locked.jpeg" />
        <div className="lesson__lockedText">
          {strings.lockedText}
          <NavLink
            className="lesson__lockedBack"
            to={`/user/dashboard/${userID}`}
          >
            {strings.goToDashboard}
          </NavLink>
        </div>
      </div>
    </div>
  );
}
