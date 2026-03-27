import Logo from "./Logo";
import { classes } from "../../constants/layout/navbar";
import { NavLink } from "react-router-dom";
import { usePersonalSettings } from "../../hooks/usePersonalSettings";
import { useDashboardLink } from "../../hooks/useDashboardLink";
import { useAuth } from "../../hooks/useAuth";
import fetchLogout from "../../api/handlers.js/fetchLogout";

export default function Navbar() {
  const { container, btn, logo } = classes;

  const { dashboardLink, setDashboardLink } = useDashboardLink();
  usePersonalSettings();
  useAuth(dashboardLink);

  const logoutHandler = async () => {
    const response = await fetchLogout();
    if (response.error) {
      console.error(response.errorMsg);
    } else {
      setDashboardLink(null);
    }
  };

  return (
    <>
      <nav className={container}>
        <NavLink to="/" className={logo} end>
          <Logo />
        </NavLink>
        <NavLink to="/login" className={btn}>
          login
        </NavLink>
        <NavLink to="/signup" className={btn}>
          signup
        </NavLink>
        {dashboardLink && (
          <>
            <NavLink to={dashboardLink} className={btn}>
              dashboard
            </NavLink>
            <NavLink onClick={logoutHandler} to="/" className={btn}>
              logout
            </NavLink>
          </>
        )}
      </nav>
    </>
  );
}
