import { NavLink } from "react-router-dom";
import { classes } from "../../constants/layout/footer";

export default function InfoBtn({ element, text }) {
  const link = "/" + element;
  const src = link + ".svg";

  return (
    <NavLink className={`${classes.btnBase}-info`} to={link}>
      <div className={`${classes.btnBase}-img`}>
        <img src={src} />
      </div>
      <div className={`${classes.btnBase}-text`}>{text}</div>
    </NavLink>
  );
}
