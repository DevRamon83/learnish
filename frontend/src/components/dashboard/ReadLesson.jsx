import { NavLink } from "react-router-dom";
import { useLang } from "../../hooks/useLang";
import { i18nAddresses } from "../../constants/i18nAddresses";

export default function ReadLesson({ url }) {
  const link = url.replace("_", "-");
  const { strings } = useLang(i18nAddresses.dashboard);

  return (
    <NavLink className="dashboard__readLesson" to={`/user/lesson/${link}`}>
      {strings.read}
    </NavLink>
  );
}
