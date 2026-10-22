import { NavLink } from "react-router-dom";
import { classes } from "../constants/layout/footer";

export default function FooterSystem({ strings }) {
  return (
    <div className={classes.system}>
      <NavLink className={`${classes.btnBase}-system`} to="/" end>
        home
      </NavLink>
      |
      <NavLink className={`${classes.btnBase}-system`} to="/login">
        {strings.login}
      </NavLink>
      |
      <NavLink className={`${classes.btnBase}-system`} to="/signup">
        {strings.signup}
      </NavLink>
      |
      <NavLink className={`${classes.btnBase}-system`} to="/price">
        {strings.price}
      </NavLink>
    </div>
  );
}
