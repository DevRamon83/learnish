export default function SummaryProcess({
  step,
  status,
  label,
  bar,
  setters,
  strings,
  value,
}) {
  const { setUploadStatus, setRetry, setUploadStep } = setters;

  const retryHandler = () => {
    setUploadStatus((prev) => ({ ...prev, [value]: null }));
    const newStep = value === "draft" ? true : null;
    setUploadStep((prev) => ({ ...prev, [value]: newStep }));
    setRetry((prev) => prev + 1);
  };

  return (
    <div className="summary__process-space">
      {status === "failed" ? (
        <>
          <div className="summary__process-label">
            Qualcosa è andato storto
            <img src={`/${status || "pending"}.svg`} />
          </div>
          <button onClick={retryHandler}>{strings.retry}</button>
        </>
      ) : (
        <>
          <div className="summary__process-label">
            {label}
            <img src={`/${status || "pending"}.svg`} />
          </div>
          <div className="summary__process-container">
            <div className={step ? `${bar}-process` : bar}></div>
          </div>
        </>
      )}
    </div>
  );
}
