import { NavLink } from "react-router-dom";
import { classes } from "../constants/pages/home";

export default function CallToSignup({ strings, showSignup }) {
  const { callToSignup, callToSignupHide } = classes;
  return (
    <>
      <div className={showSignup ? callToSignup : callToSignupHide}>
        <p className={classes.startText}>{strings.callToSignup}</p>
        <NavLink to="/signup">
          <div className={classes.startBtn}> {strings.callToSignupBtn}</div>
        </NavLink>
      </div>
    </>
  );
}
