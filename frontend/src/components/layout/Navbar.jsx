import Logo from "./Logo";
import { classes } from "../../constants/layout/navbar";
import { NavLink } from "react-router-dom";
import { usePersonalSettings } from "../../hooks/usePersonalSettings";
import { useSelector } from "react-redux";
import Hamburger from "../../ui/Hamburger";
import { useEffect, useState } from "react";
import { useLang } from "../../hooks/useLang";
import { i18nAddresses } from "../../constants/i18nAddresses";
import ConditionalNavbar from "../../ui/ConditionalNavbar";
import useLogout from "../../hooks/useLogout";
import { initializeSocket } from "../../socket/socketClient";
import { API_URLS } from "../../constants/apiUrls";
import socketActions from "../../socket/socketActions";

export default function Navbar() {
  const { navbarContainer, nav, navOpen } = classes;
  const [isOpen, setIsOpen] = useState(false);
  const [navbarState, setNavbarState] = useState(navbarContainer);
  const [logoState, setLogoState] = useState("");
  const user = useSelector((state) => state.auth.user);

  const { strings, lang } = useLang(i18nAddresses.layout);

  useEffect(() => {
    if (!user) return;

    const backendOrigin = API_URLS.base.replace("/api", "");

    initializeSocket(backendOrigin);
    const data = { userId: user.id, username: user.username };

    socketActions("register_user", data);
  }, [user]);

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

  const { logoutHandler } = useLogout("navbar");

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
