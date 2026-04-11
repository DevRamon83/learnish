import el from "../../assets/logo/el.svg";
import er from "../../assets/logo/er.svg";
import en from "../../assets/logo/en.svg";
import e from "../../assets/logo/e.svg";
import squareOpen from "../../assets/logo/squareOpen.svg";
import squareClose from "../../assets/logo/squareClose.svg";
import i from "../../assets/logo/i.svg";
import es from "../../assets/logo/es.svg";
import aitch from "../../assets/logo/aitch.svg";
import { ids, classes } from "../../constants/layout/logo";

export default function Logo({ logoState, isOpen, toggleNavbar }) {
  const handler = () => {
    if (isOpen) toggleNavbar();
  };

  return (
    <div onClick={handler} className={classes.logo + logoState}>
      <img id={ids.el + logoState} src={el} />
      <img id={ids.er + logoState} src={er} />
      <img id={ids.en + logoState} src={en} />
      <img id={ids.e + logoState} src={e} />
      <img id={ids.a + logoState} src={e} />
      <img id={ids.squareOpen + logoState} src={squareOpen} />
      <img id={ids.squareClose + logoState} src={squareClose} />
      <img id={ids.i + logoState} src={i} />
      <img id={ids.es + logoState} src={es} />
      <img id={ids.aitch + logoState} src={aitch} />
    </div>
  );
}
