import SignupForm from "../components/forms/SignupForm";
import { i18nAddresses } from "../constants/i18nAddresses";
import { classes } from "../constants/pages/auth";
import { useLang } from "../hooks/useLang";

export default function SignupPage() {
  const { strings, lang } = useLang(i18nAddresses.auth);

  return (
    <main className={classes.mainSignup}>
      <SignupForm key={lang} strings={strings} lang={lang} />
    </main>
  );
}
