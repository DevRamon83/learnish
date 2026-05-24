import { useSelector } from "react-redux";
import { i18nAddresses } from "../constants/i18nAddresses";
import { useLang } from "../hooks/useLang";
import { NavLink } from "react-router-dom";

export default function BackToDashboard() {
  const { strings } = useLang(i18nAddresses.dashboard);
  const userID = useSelector((state) => state.auth.user.id);

  return (
    <NavLink
      className="lesson__backToDashboard"
      to={`/user/dashboard/${userID}`}
    >
      <img className="lesson__backToDashboard-img" src="/back.svg" />
      {strings.backToDashboard}
    </NavLink>
  );
}
