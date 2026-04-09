import CommonNavbar from "./CommonNavbar";
import PrivateNavbar from "./PrivateNavbar";
import PubblicNavbar from "./PubblicNavbar";

export default function ConditionalNavbar({
  navbarState,
  user,
  toggleNavbar,
  logoutHandler,
  strings,
}) {
  return (
    <div className={navbarState}>
      {user ? (
        <PrivateNavbar
          user={user}
          toggleNavbar={toggleNavbar}
          logoutHandler={logoutHandler}
          strings={strings}
        />
      ) : (
        <PubblicNavbar strings={strings} toggleNavbar={toggleNavbar} />
      )}
      <CommonNavbar strings={strings} toggleNavbar={toggleNavbar} />
    </div>
  );
}
