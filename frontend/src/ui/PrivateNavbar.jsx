import NavbarBtn from "./buttons/NavbarBtn";

export default function PrivateNavbar({
  user,
  strings,
  toggleNavbar,
  logoutHandler,
}) {
  const dashboardLink = `/user/${user.type}/${user.id}`;
  const handleLogoutAndClose = () => {
    toggleNavbar();
    logoutHandler();
  };

  return (
    <>
      <NavbarBtn
        onAction={toggleNavbar}
        link={dashboardLink}
        img={"/dashboard.svg"}
        text={strings.dashboard}
      />
      <NavbarBtn
        onAction={handleLogoutAndClose}
        link="/"
        img={"/logout.svg"}
        text={strings.logout}
      />
    </>
  );
}
