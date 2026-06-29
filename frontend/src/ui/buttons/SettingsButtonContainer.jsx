export default function SettingsButtonContainer({
  toggle,
  setToggle,
  classes,
  submitHandler,
}) {
  return (
    <div className="settings__buttons">
      <div
        onClick={() => setToggle(!toggle)}
        className={
          toggle ? classes.settings.btnClose : classes.settings.btnChange
        }
      ></div>
    </div>
  );
}
