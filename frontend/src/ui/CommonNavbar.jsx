import NavbarBtn from "./buttons/NavbarBtn";

export default function CommonNavbar({ strings, toggleNavbar }) {
  return (
    <>
      <NavbarBtn
        toggleNavbar={toggleNavbar}
        link={"/team"}
        img={"/team.svg"}
        text={strings.team}
      />
      <NavbarBtn
        toggleNavbar={toggleNavbar}
        link={"/about"}
        img={"/about.svg"}
        text={strings.about}
      />
      <NavbarBtn
        toggleNavbar={toggleNavbar}
        link={"/mission"}
        img={"/mission.svg"}
        text={strings.mission}
      />

      <NavbarBtn
        toggleNavbar={toggleNavbar}
        link={"/price"}
        img={"/price.svg"}
        text={strings.price}
      />
      <NavbarBtn
        toggleNavbar={toggleNavbar}
        link={"/faq"}
        img={"/faq.svg"}
        text={strings.faq}
      />
      <NavbarBtn
        toggleNavbar={toggleNavbar}
        link={"/tos"}
        img={"/tos.svg"}
        text={strings.tos}
      />
      <NavbarBtn
        toggleNavbar={toggleNavbar}
        link={"/privacy"}
        img={"/privacy.svg"}
        text={strings.privacy}
      />
      <NavbarBtn
        toggleNavbar={toggleNavbar}
        link={"/contact"}
        img={"/contact.svg"}
        text={strings.contact}
      />
    </>
  );
}
