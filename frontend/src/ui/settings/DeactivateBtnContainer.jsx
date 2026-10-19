export default function DeactivateBtnContainer({
  classes,
  setDeactivatePanel,
  handler,
  strings,
}) {
  return (
    <div className={classes.deactivateBtnContainer}>
      <div
        className={classes.deactivateBtnNo}
        onClick={() => setDeactivatePanel("close")}
      >
        {strings.change.no}
      </div>
      <div className={classes.deactivateBtnYes} onClick={handler}>
        {strings.change.yes}
      </div>
    </div>
  );
}
