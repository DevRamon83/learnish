export default function SummaryFailed({
  classes,
  status,
  strings,
  retryHandler,
}) {
  return (
    <>
      <div
        className={
          status === "failed"
            ? classes.summary.processLabel
            : classes.summary.processUnavailable
        }
      >
        {strings[status]}
        <img src={`/${status || "pending"}.svg`} />
      </div>
      {status === "failed" && (
        <button onClick={retryHandler}>{strings.retry}</button>
      )}
    </>
  );
}
