export default function SummarySuccess({ classes, status, step, bar, label }) {
  return (
    <>
      <div className={classes.summary.processLabel}>
        {label}
        <img src={`/${status || "pending"}.svg`} />
      </div>
      <div className={classes.summary.processContainer}>
        <div className={step ? `${bar}-process` : bar}></div>
      </div>
    </>
  );
}
