import Logo from "./Logo";
import { classes } from "../../constants/layout/navbar";
import { NavLink } from "react-router-dom";
import { usePersonalSettings } from "../../hooks/usePersonalSettings";
import fetchLogout from "../../api/handlers.js/fetchLogout";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "../../redux/slices/authSlice";
import PrivatNavbar from "../../ui/PrivatNavbar";
import PubblicNavbar from "../../ui/PubblicNavbar";

export default function Navbar() {
  const { container, btn, logo } = classes;
  const user = useSelector((state) => state.auth.user);
  const dashboardLink = "/user/dashboard/" + user?.id;
  const dispatch = useDispatch();
  usePersonalSettings();

  const logoutHandler = async () => {
    const response = await fetchLogout();
    if (response.error) {
      console.error(response.errorMsg);
    } else {
      dispatch(setUser(null));
      dispatch(setAuth("unauthenticated"));
    }
  };

  return (
    <>
      <nav>
        <NavLink to="/" className={logo} end>
          <Logo />
        </NavLink>
        {!user && <PubblicNavbar btn={btn} />}
        {user && (
          <PrivatNavbar
            dashboardLink={dashboardLink}
            btn={btn}
            logoutHandler={logoutHandler}
          />
        )}
      </nav>
    </>
  );
}
