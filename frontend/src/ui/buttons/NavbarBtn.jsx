import { NavLink } from "react-router-dom";
import { classes } from "../../constants/layout/navbar";

export default function NavbarBtn({ link, img, text, toggleNavbar }) {
  return (
    <>
      <NavLink onClick={toggleNavbar} to={link} className={classes.tab}>
        <div className={classes.tabImg}>
          <img src={img} />
        </div>
        {text}
      </NavLink>
    </>
  );
}
