import { classes, buttons } from "../constants/layout/footer";
import InfoBtn from "./buttons/InfoBtn";

export default function FooterInfo({ strings }) {
  return (
    <div className={classes.infoBase}>
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
