import InfoBtn from "./buttons/InfoBtn";

export default function FooterInfo({ strings }) {
  const buttons = ["faq", "contact", "about", "mission", "team"];
  return (
    <div className="footer__info">
      {buttons.map((element) => (
        <InfoBtn
          key={"footer_" + element}
          element={element}
          text={strings[element]}
        />
      ))}
    </div>
  );
}
