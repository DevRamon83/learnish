import { NavLink } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";
import HeroCTA from "./HeroCTA";

export default function HeroCTASection({ strings, signupHandler }) {
  return (
    <>
      <ScrollReveal handler={signupHandler} action="hide">
        <HeroCTA strings={strings} isMobile={false} />
        <HeroCTA strings={strings} isMobile={true} />
      </ScrollReveal>
    </>
  );
}
