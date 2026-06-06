import NavbarBtn from "./buttons/NavbarBtn";

export default function PublicNavbar({ strings, toggleNavbar }) {
  return (
    <>
      <NavbarBtn
        toggleNavbar={toggleNavbar}
        link={"/login"}
        img={"/login.svg"}
        text={strings.login}
      />
      <NavbarBtn
        toggleNavbar={toggleNavbar}
        link={"/signup"}
        img={"/signup.svg"}
        text={strings.signup}
      />
    </>
  );
}
