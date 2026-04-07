import { NavLink } from "react-router-dom";
import ArrowBtn from "./buttons/ArrowBtn";

export default function Info({ strings }) {
  return (
    <>
      <NavLink to="/price">
        <ArrowBtn iconSrc={"/price.svg"} text={strings.price} />
      </NavLink>
      <NavLink to="/faq">
        <ArrowBtn iconSrc={"/faq.svg"} text={strings.faq} />
      </NavLink>
    </>
  );
}
