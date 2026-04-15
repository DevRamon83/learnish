import Logo from "./Logo";
import { classes } from "../../constants/layout/navbar";
import { NavLink } from "react-router-dom";
import { usePersonalSettings } from "../../hooks/usePersonalSettings";
import fetchLogout from "../../api/handlers/fetchLogout";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "../../redux/slices/authSlice";
import Hamburger from "../../ui/Hamburger";
import { useState } from "react";
import { useLang } from "../../hooks/useLang";
import { i18nAddresses } from "../../constants/i18nAddresses";
import ConditionalNavbar from "../../ui/ConditionalNavbar";

export default function Navbar() {
  const { navbarContainer, nav, navOpen } = classes;
  const [isOpen, setIsOpen] = useState(false);
  const [navbarState, setNavbarState] = useState(navbarContainer);
  const [logoState, setLogoState] = useState("");
  const user = useSelector((state) => state.auth.user);

  const { strings, lang } = useLang(i18nAddresses.layout);

  const dispatch = useDispatch();
  usePersonalSettings();

  const toggleNavbar = () => {
    if (isOpen) {
      setNavbarState(classes.navbarContainerClose);
      setLogoState("-close");
    } else {
      setNavbarState(classes.navbarContainerActive);
      setLogoState("-open");
    }
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
      <nav className={isOpen ? navOpen : nav}>
        <NavLink to="/" end>
          <Logo
            toggleNavbar={toggleNavbar}
            isOpen={isOpen}
            logoState={logoState}
          />
        </NavLink>
        <ConditionalNavbar
          navbarState={navbarState}
          user={user}
          toggleNavbar={toggleNavbar}
          logoutHandler={logoutHandler}
          strings={strings}
        />
        <Hamburger
          toggleNavbar={toggleNavbar}
          isOpen={isOpen}
          classes={classes}
        />
      </nav>
    </>
  );
}
