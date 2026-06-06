import NavbarBtn from "./buttons/NavbarBtn";

export default function PrivateNavbar({
  user,
  strings,
  toggleNavbar,
  logoutHandler,
}) {
  const dashboardLink = `/user/${user?.type}/${user?.id}`;
  const handler = () => {
    toggleNavbar();
    logoutHandler();
  };

  return (
    <>
      <NavbarBtn
        toggleNavbar={toggleNavbar}
        link={dashboardLink}
        img={"/dashboard.svg"}
        text={strings.dashboard}
      />
      <NavbarBtn
        toggleNavbar={handler}
        link={"/"}
        img={"/logout.svg"}
        text={strings.logout}
      />
    </>
  );
}
