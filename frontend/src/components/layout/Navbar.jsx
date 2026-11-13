import LogoPanel from "./LogoPanel";
import { classes } from "../../constants/layout/navbar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { usePersonalSettings } from "../../hooks/usePersonalSettings";
import { useDispatch, useSelector } from "react-redux";
import Hamburger from "../../ui/Hamburger";
import { useEffect, useState } from "react";
import { useLang } from "../../hooks/useLang";
import { i18nAddresses } from "../../constants/i18nAddresses";
import ConditionalNavbar from "../../ui/ConditionalNavbar";
import useLogout from "../../hooks/useLogout";
import NavbarNotify from "../../ui/NavbarNotify";
import { setIsChatting } from "../../redux/slices/messagesSlice";

export default function Navbar() {
  const { navbarContainer, nav, navOpen } = classes;
  const location = useLocation();
  const path = location.pathname.substring(1, 5);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [notify, setNotify] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [navbarState, setNavbarState] = useState(navbarContainer);
  const [logoState, setLogoState] = useState("");
  const auth = useSelector((state) => state.auth);
  const isChatting = useSelector((state) => state.messages.data.isChatting);
  const navigate = useNavigate();
  const { strings } = useLang(i18nAddresses.layout);
  const unreadMessages = auth.user?.unreadMessages || [];

  useEffect(() => {
    if (path !== "user" && isChatting) {
      dispatch(setIsChatting(false));
    }
  }, [path]);

  useEffect(() => {
    const { user } = auth;
    if (isChatting || !user) return;
    if (unreadMessages.length > 0) {
      setLogoState("-open");
      setNotify(true);
    }
  }, [auth.user?.unreadMessages?.length, isChatting]);

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

  const { logoutHandler } = useLogout(setNotify);
  const closeNotify = () => {
    setLogoState("-close");
    setNotify(false);
    setIsNotificationOpen(false);
  };

  const goToMessages = () => {
    const { user } = auth;
    navigate(`/user/${user.type}/${user.id}?tab=messages`);
    closeNotify();
  };

  const notifyFromWho = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  return (
    <>
      <nav className={isOpen || notify ? navOpen : nav}>
        <NavLink to="/" end>
          <LogoPanel
            toggleNavbar={toggleNavbar}
            isOpen={isOpen}
            isNotificationOpen={isNotificationOpen}
            logoState={logoState}
            user={auth.user}
            setIsNotificationOpen={setIsNotificationOpen}
            notifyClass={classes.notifyContainer}
          />
        </NavLink>
        {notify && (
          <NavbarNotify
            notifyFromWho={notifyFromWho}
            goToMessages={goToMessages}
            closeNotify={closeNotify}
            classes={classes}
          />
        )}
        <ConditionalNavbar
          navbarState={navbarState}
          auth={auth}
          toggleNavbar={toggleNavbar}
          logoutHandler={logoutHandler}
          strings={strings}
        />
        {!notify && (
          <Hamburger
            toggleNavbar={toggleNavbar}
            isOpen={isOpen}
            classes={classes}
          />
        )}
      </nav>
    </>
  );
}
