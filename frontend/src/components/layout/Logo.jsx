import el from "../../assets/logo/el.svg";
import er from "../../assets/logo/er.svg";
import en from "../../assets/logo/en.svg";
import e from "../../assets/logo/e.svg";
import squareOpen from "../../assets/logo/squareOpen.svg";
import squareClose from "../../assets/logo/squareClose.svg";
import i from "../../assets/logo/i.svg";
import es from "../../assets/logo/es.svg";
import aitch from "../../assets/logo/aitch.svg";

export default function Logo({ logoState }) {
  return (
    <div className={"navbar__logo" + logoState}>
      <img id={"logo__el" + logoState} src={el} />
      <img id={"logo__er" + logoState} src={er} />
      <img id={"logo__en" + logoState} src={en} />
      <img id={"logo__e" + logoState} src={e} />
      <img id={"logo__a" + logoState} src={e} />
      <img id={"logo__squareOpen" + logoState} src={squareOpen} />
      <img id={"logo__squareClose" + logoState} src={squareClose} />
      <img id={"logo__i" + logoState} src={i} />
      <img id={"logo__es" + logoState} src={es} />
      <img id={"logo__aitch" + logoState} src={aitch} />
    </div>
  );
}
