export default function SummaryActionContainer({
  label,
  classes,
  actionHandler,
  closeAlert,
  action,
  close,
  handlerParam,
}) {
  return (
    <div>
      {label}
      <div className={classes.summary.actionIconContainer}>
        <button onClick={() => actionHandler(handlerParam)}>{action}</button>
        <button onClick={() => closeAlert(null)}>{close}</button>
      </div>
    </div>
  );
}
