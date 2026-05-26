import { NavLink } from "react-router-dom";
import { classes } from "../constants/layout/footer";

export default function FooterLegal({ strings }) {
  return (
    <h5>
      <NavLink className={classes.tos} to="/tos">
        {strings.tos}
      </NavLink>
      <NavLink className={classes.privacy} to="/privacy">
        {strings.privacy}
      </NavLink>
    </h5>
  );
}
