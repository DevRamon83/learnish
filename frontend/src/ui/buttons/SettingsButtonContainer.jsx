import CloseSettingsBtn from "./CloseSettingsBtn";
import SettingsBtn from "./SettingsBtn";

export default function SettingsButtonContainer({
  toggle,
  setToggle,
  classes,
  setError,
}) {
  return (
    <div className="settings__buttons">
      <CloseSettingsBtn
        setError={setError}
        classes={classes}
        state={toggle}
        setter={setToggle}
      />
      <SettingsBtn classes={classes} state={toggle} />
    </div>
  );
}
