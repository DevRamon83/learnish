import NavbarBtn from "./buttons/NavbarBtn";

export default function CommonNavbar({ strings, toggleNavbar }) {
  const links = [
    "team",
    "about",
    "mission",
    "price",
    "faq",
    "tos",
    "privacy",
    "contact",
  ];
  return (
    <>
      {links.map((tag) => (
        <NavbarBtn
          key={`navBtn_${tag}`}
          toggleNavbar={toggleNavbar}
          link={`/${tag}`}
          img={`/${tag}.svg`}
          text={strings[tag]}
        />
      ))}
    </>
  );
}
