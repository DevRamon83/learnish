export default function DeactivatePanel({
  classes,
  strings,
  setDeactivate,
  confirmHandler,
}) {
  return (
    <>
      <div className={classes.confirmTxt}>{strings.confirmDeactivate}</div>
      <div
        className={classes.closeDeactivation}
        onClick={() => setDeactivate(false)}
      >
        {strings.close}
      </div>

      <div className={classes.confirmBtn} onClick={confirmHandler}>
        {strings.deactivateOk}
      </div>
    </>
  );
}
