import NavbarBtn from "./buttons/NavbarBtn";

export default function PubblicNavbar({ strings }) {
  return (
    <>
      <NavbarBtn link={"/login"} img={"/login.svg"} text={strings.login} />
      <NavbarBtn link={"/signup"} img={"/signup.svg"} text={strings.signup} />
    </>
  );
}
