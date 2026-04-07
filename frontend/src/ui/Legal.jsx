import { NavLink } from "react-router-dom";
import SimpleBtn from "./buttons/SimpleBtn";
import { classes } from "../constants/layout/buttons";

export default function Legal({ btn, strings }) {
  return (
    <>
      <NavLink to="/tos" className={btn}>
        <SimpleBtn btnClass={classes.legal} text={strings.tos} />
      </NavLink>
      <NavLink to="/privacy" className={btn}>
        <SimpleBtn btnClass={classes.legal} text={strings.privacy} />
      </NavLink>
    </>
  );
}
