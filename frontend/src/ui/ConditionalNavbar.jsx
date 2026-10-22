import Langs from "../components/layout/Langs";
import CommonNavbar from "./CommonNavbar";
import PrivateNavbar from "./PrivateNavbar";
import PublicNavbar from "./PublicNavbar";

export default function ConditionalNavbar({
  navbarState,
  user,
  toggleNavbar,
  logoutHandler,
  strings,
}) {
  return (
    <div className={navbarState}>
      <Langs />
      {user ? (
        <PrivateNavbar
          user={user}
          toggleNavbar={toggleNavbar}
          logoutHandler={logoutHandler}
          strings={strings}
        />
      ) : (
        <PublicNavbar strings={strings} toggleNavbar={toggleNavbar} />
      )}
      <CommonNavbar strings={strings} toggleNavbar={toggleNavbar} />
    </div>
  );
}
