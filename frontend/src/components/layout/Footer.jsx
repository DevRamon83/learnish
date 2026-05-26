import { i18nAddresses } from "../../constants/i18nAddresses";
import { classes } from "../../constants/layout/footer";
import { useLang } from "../../hooks/useLang";
import FooterInfo from "../../ui/FooterInfo";
import FooterLegal from "../../ui/FooterLegal";
import FooterSystem from "../../ui/FooterSystem";
import SocialSection from "../../ui/SocialSection";

export default function Footer() {
  const { strings, lang } = useLang(i18nAddresses.layout);

  return (
    <footer>
      <div className={classes.left}>
        <FooterSystem />
        <h2>{strings.social}</h2>
        <SocialSection />
      </div>
      <div className={classes.right}>
        <FooterInfo strings={strings} />
        <FooterLegal strings={strings} />
      </div>
      <h6 className={classes.bottom}>
        {`Copyright © 2025-${new Date().getFullYear()} learnish - ${strings.copy}`}
      </h6>
    </footer>
  );
}
