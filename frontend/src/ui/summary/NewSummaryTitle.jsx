export default function NewSummaryTitle({ strings, closeHandler, classes }) {
  return (
    <div className={classes.summary.formTitle}>
      <h2>{strings.newSummary}</h2>
      <button onClick={closeHandler} className={classes.summary.closeBtn}>
        <img src="/close.svg" />
      </button>
    </div>
  );
}
