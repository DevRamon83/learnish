import { NavLink } from "react-router-dom";

export default function PrivatNavbar({ dashboardLink, btn, logoutHandler }) {
  return (
    <>
      <NavLink to={dashboardLink} className={btn}>
        dashboard
      </NavLink>
      <NavLink onClick={logoutHandler} to="/" className={btn}>
        logout
      </NavLink>
    </>
  );
}
