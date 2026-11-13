import { useEffect, useState } from "react";
import { i18nAddresses } from "../../../constants/i18nAddresses";
import { useLang } from "../../../hooks/useLang";

export default function SettingError({ error, classes, setError }) {
  const { strings } = useLang(i18nAddresses.errors);
  const [text, setText] = useState(null);

  useEffect(() => {
    if (!error) return;
    if (strings[error]) {
      return setText(strings[error]);
    }

    const errorCodes = error.split("_");

    setText(`${strings[errorCodes[0]]} ${strings[errorCodes[1]]}`);
  }, [error]);

  return (
    <div className={classes.error}>
      {text}
      <button onClick={() => setError(null)}>
        <img src="/close.svg" />
      </button>
    </div>
  );
}
