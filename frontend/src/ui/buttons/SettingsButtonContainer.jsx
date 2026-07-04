export default function SettingsButtonContainer({
  toggle,
  setToggle,
  classes,
}) {
  return (
    <div className={classes.settings.buttons}>
      <div
        onClick={() => setToggle(!toggle)}
        className={
          toggle ? classes.settings.btnClose : classes.settings.btnChange
        }
      ></div>
    </div>
  );
}
