import LineChart from "../components/charts/LineChart";
import StackedBar from "../components/charts/StackedBar";
import { useLang } from "../hooks/useLang";
import CallToSignup from "../ui/CallToSignup";
import HeroSection from "../ui/HeroSection";
import IntroHome from "../components/home/IntroHome";
import HomeSectionZ from "../ui/HomeSectionZ";
import HeroCTASection from "../ui/HeroCTASection";
import { useState } from "react";
import ScrollReveal from "../components/ScrollReveal";
import { classes } from "../constants/home";
import { i18nAddresses } from "../constants/i18nAddresses";

export default function Home() {
  const { strings } = useLang(i18nAddresses.home);
  const [showSignup, setShowSignup] = useState(true);
  const signupHandler = (action) => {
    if (action === "show") {
      setShowSignup(true);
    } else {
      setShowSignup(false);
    }
  };

  return (
    <main className={classes.main}>
      <HeroSection strings={strings} />
      <IntroHome strings={strings} />
      <ScrollReveal>
        <HomeSectionZ strings={strings} side="left" protagonist="teachers" />
      </ScrollReveal>
      <ScrollReveal handler={signupHandler} action="show">
        <HomeSectionZ strings={strings} side="right" protagonist="students" />
      </ScrollReveal>
      <HeroCTASection strings={strings} signupHandler={signupHandler} />
      <CallToSignup strings={strings} showSignup={showSignup} />
    </main>
  );
}
