import NavbarBtn from "./buttons/NavbarBtn";

export default function PublicNavbar({ strings, toggleNavbar }) {
  return (
    <>
      <NavbarBtn
        onAction={toggleNavbar}
        link={"/login"}
        img={"/login.svg"}
        text={strings.login}
      />
      <NavbarBtn
        onAction={toggleNavbar}
        link={"/signup"}
        img={"/signup.svg"}
        text={strings.signup}
      />
    </>
  );
}
