import { useEffect, useState } from "react";
import { i18nAddresses } from "../../../constants/i18nAddresses";
import { useLang } from "../../../hooks/useLang";

export default function SettingError({ error, classes }) {
  const { strings } = useLang(i18nAddresses.errors);
  const [text, setText] = useState(null);

  useEffect(() => {
    if (!error) return;

    const errorCodes = error.split("_");

    setText(`${strings[errorCodes[0]]} ${strings[errorCodes[1]]}`);
  }, [error]);

  return <div className={classes.error}>{text}</div>;
}
