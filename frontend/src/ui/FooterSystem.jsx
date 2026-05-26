import { NavLink } from "react-router-dom";
import { classes } from "../constants/layout/footer";

export default function FooterSystem() {
  return (
    <div className={classes.system}>
      <NavLink className={`${classes.btnBase}-system`} to="/" end>
        home
      </NavLink>
      |
      <NavLink className={`${classes.btnBase}-system`} to="/login">
        accedi
      </NavLink>
      |
      <NavLink className={`${classes.btnBase}-system`} to="/signup">
        registrati
      </NavLink>
      |
      <NavLink className={`${classes.btnBase}-system`} to="/price">
        prezzi
      </NavLink>
    </div>
  );
}
