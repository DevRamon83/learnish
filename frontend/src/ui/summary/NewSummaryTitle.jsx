export default function NewSummaryTitle({ strings, closeHandler, classes }) {
  return (
    <div className={classes.summary.formTitle}>
      <h2>{strings.newSummary}</h2>
      <div onClick={closeHandler} className={classes.summary.closeBtn}>
        <img src="/close.svg" />
      </div>
    </div>
  );
}
