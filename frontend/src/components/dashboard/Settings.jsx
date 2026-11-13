import { useState } from "react";
import SettingError from "./settings/SettingError";
import { classes } from "../../constants/components/dashboard";
import SettingsStudent from "../../ui/settings/SettingsStudent";
import getCardSettings from "../../helpers/getCardSettings";
import SettingsTeacher from "../../ui/settings/SettingsTeacher";
import SettingsCommon from "../../ui/settings/SettingsCommon";
import Breadcrumb from "../../ui/settings/Breadcrumb";
import { useLang } from "../../hooks/useLang";
import { i18nAddresses } from "../../constants/i18nAddresses";

export default function Settings({ userType }) {
  const [error, setError] = useState(null);
  const [card, setCard] = useState("Pic");
  const { strings, lang } = useLang(i18nAddresses.settings);

  const [toggle, setToggle] = useState(false);
  const userCards = getCardSettings(userType);

  const sharedProps = {
    card,
    setCard,
    setError,
    toggle,
    setToggle,
    userCards,
    strings,
    lang,
    classes,
  };

  return (
    <div className={classes.settings.main}>
      <div className={classes.settings.container}>
        <SettingsCommon sharedProps={sharedProps} />

        <SettingsStudent sharedProps={sharedProps} />
        <SettingsTeacher sharedProps={sharedProps} />
        <Breadcrumb sharedProps={sharedProps} />

        {error && (
          <SettingError
            setError={setError}
            classes={classes.settings}
            error={error}
          />
        )}
      </div>
    </div>
  );
}
