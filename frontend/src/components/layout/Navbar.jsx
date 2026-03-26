import Logo from "./Logo";
import { classes } from "../../constants/layout/navbar";
import { NavLink } from "react-router-dom";
import { usePersonalSettings } from "../../hooks/usePersonalSettings";
import { useDashboardLink } from "../../hooks/useDashboardLink";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { container, btn, logo } = classes;

  const dashboard = useDashboardLink();
  usePersonalSettings();
  useAuth(dashboard);

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
        {dashboard && (
          <NavLink to={dashboard} className={btn}>
            dashboard
          </NavLink>
        )}
      </nav>
    </>
  );
}
