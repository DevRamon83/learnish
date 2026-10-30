import ContactForm from "../components/forms/ContactForm";
import { classes } from "../constants/components/forms";
import { i18nAddresses } from "../constants/i18nAddresses";
import { useLang } from "../hooks/useLang";

export default function Contact() {
  const { strings, lang } = useLang(i18nAddresses.contact);

  return (
    <div className={classes.contact.main}>
      <ContactForm strings={strings} key={lang} />
    </div>
  );
}
