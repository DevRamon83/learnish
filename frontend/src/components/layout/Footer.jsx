import { i18nAddresses } from "../../constants/i18nAddresses";
import { useLang } from "../../hooks/useLang";
import FooterInfo from "../../ui/FooterInfo";
import FooterLegal from "../../ui/FooterLegal";
import FooterSystem from "../../ui/FooterSystem";
import SocialSection from "../../ui/SocialSection";

export default function Footer() {
  const { strings, lang } = useLang(i18nAddresses.navbar);

  return (
    <footer>
      <div className="footer_left">
        <FooterSystem />
        <h2>Seguici sui social</h2>
        <SocialSection />
      </div>
      <div className="footer_right">
        <FooterInfo strings={strings} />
        <FooterLegal strings={strings} />
      </div>
      <h6 className="footer_bottom">
        {`Copyright © 2001-${new Date().getFullYear()} learnish - Tutti i diritti riservati`}
      </h6>
    </footer>
  );
}
