import LoginForm from "../components/forms/LoginForm";
import { i18nAddresses } from "../constants/i18nAddresses";
import { classes } from "../constants/pages/auth";
import { useLang } from "../hooks/useLang";

export default function Login() {
  const { strings, lang } = useLang(i18nAddresses.auth);

  return (
    <main className={classes.mainLogin}>
      <LoginForm strings={strings} key={lang} lang={lang} />
    </main>
  );
}
