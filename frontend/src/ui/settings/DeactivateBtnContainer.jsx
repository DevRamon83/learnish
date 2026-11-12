export default function DeactivateBtnContainer({
  classes,
  setDeactivatePanel,
  handler,
  strings,
}) {
  return (
    <div className={classes.deactivateBtnContainer}>
      <button
        className={classes.deactivateBtnNo}
        onClick={() => setDeactivatePanel("close")}
      >
        {strings.change.no}
      </button>
      <button className={classes.deactivateBtnYes} onClick={handler}>
        {strings.change.yes}
      </button>
    </div>
  );
}
