import Langs from "../components/layout/Langs";
import CommonNavbar from "./CommonNavbar";
import PrivateNavbar from "./PrivateNavbar";
import PublicNavbar from "./PublicNavbar";

export default function ConditionalNavbar({
  navbarState,
  auth,
  toggleNavbar,
  logoutHandler,
  strings,
}) {
  return (
    <div className={navbarState}>
      <Langs />
      {auth.authState === "authenticated" ? (
        <PrivateNavbar
          user={auth.user}
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
