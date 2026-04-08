import NavbarBtn from "./buttons/NavbarBtn";

export default function CommonNavbar({ strings }) {
  return (
    <>
      <NavbarBtn link={"/team"} img={"/team.svg"} text={strings.team} />
      <NavbarBtn link={"/about"} img={"/about.svg"} text={strings.about} />
      <NavbarBtn
        link={"/mission"}
        img={"/mission.svg"}
        text={strings.mission}
      />

      <NavbarBtn link={"/price"} img={"/price.svg"} text={strings.price} />
      <NavbarBtn link={"/faq"} img={"/faq.svg"} text={strings.faq} />
      <NavbarBtn link={"/tos"} img={"/tos.svg"} text={strings.tos} />
      <NavbarBtn
        link={"/privacy"}
        img={"/privacy.svg"}
        text={strings.privacy}
      />
      <NavbarBtn
        link={"/contact"}
        img={"/contact.svg"}
        text={strings.contact}
      />
    </>
  );
}
