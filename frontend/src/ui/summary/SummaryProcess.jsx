export default function SummaryProcess({ step, status, label, bar }) {
  return (
    <div className="summary__process-space">
      <div className="summary__process-label">
        {label}
        <img src={`/${status}.svg`} />
      </div>
      <div className="summary__process-container">
        <div className={step ? `${bar}-process` : bar}></div>
      </div>
    </div>
  );
}
