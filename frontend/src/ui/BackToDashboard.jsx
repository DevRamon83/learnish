import { useSelector } from "react-redux";
import { i18nAddresses } from "../constants/i18nAddresses";
import { useLang } from "../hooks/useLang";
import { NavLink } from "react-router-dom";
import { classes } from "../constants/components/dashboard";

export default function BackToDashboard() {
  const { strings } = useLang(i18nAddresses.dashboard);
  const userID = useSelector((state) => state.auth.user.id);
  const backToDashboard = classes.lessons.backToDashboard;

  return (
    <NavLink className={backToDashboard} to={`/user/dashboard/${userID}`}>
      <img className={`${backToDashboard}-img`} src="/back.svg" />
      {strings.backToDashboard}
    </NavLink>
  );
}
