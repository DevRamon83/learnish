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
import Hamburger from "../../ui/Hamburger";
import { useState } from "react";
import { useLang } from "../../hooks/useLang";
import CommonNavbar from "../../ui/CommonNavbar";
import { i18nAddresses } from "../../constants/i18nAddresses";

export default function Navbar() {
  const { navbarContainer, navbarContainerActive, btn, logo } = classes;
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const { strings, lang } = useLang(i18nAddresses.navbar);

  const dashboardLink = "/user/dashboard/" + user?.id;
  const dispatch = useDispatch();
  usePersonalSettings();

  const hamburgerHandler = () => {
    setIsOpen((prev) => !prev);
  };

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
        <div className="navbar__logo">
          <NavLink to="/" className={logo} end>
            <Logo />
          </NavLink>
        </div>
        <div className={isOpen ? navbarContainerActive : navbarContainer}>
          {user ? (
            <PrivatNavbar
              dashboardLink={dashboardLink}
              btn={btn}
              logoutHandler={logoutHandler}
            />
          ) : (
            <PubblicNavbar btn={btn} />
          )}
          <CommonNavbar strings={strings} />
        </div>
        <Hamburger
          hamburgerHandler={hamburgerHandler}
          isOpen={isOpen}
          classes={classes}
        />
      </nav>
    </>
  );
}
