import { NavLink } from "react-router-dom";
import { classes } from "../constants/home";

export default function HeroCTA({ strings, isMobile }) {
  const suffix = isMobile ? "mobile" : "";
  return (
    <div className={`${classes.heroCTA}${suffix}`}>
      <img src={`/heroCTA${suffix}.jpeg`} />
      <div className={`${classes.heroCTA}-text`}>
        {strings.callToSignup}
        <NavLink to="/signup">
          <div className={`${classes.heroCTA}-btn`}>
            {strings.callToSignupBtn}
          </div>
        </NavLink>
      </div>
    </div>
  );
}
