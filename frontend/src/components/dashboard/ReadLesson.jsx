import { NavLink } from "react-router-dom";
import { useLang } from "../../hooks/useLang";
import { i18nAddresses } from "../../constants/i18nAddresses";
import { classes } from "../../constants/components/dashboard";

export default function ReadLesson({ url }) {
  const link = url.replace("_", "-");
  const { strings } = useLang(i18nAddresses.dashboard);

  return (
    <NavLink className={classes.lessons.read} to={`/user/lesson/${link}`}>
      {strings.read}
    </NavLink>
  );
}
