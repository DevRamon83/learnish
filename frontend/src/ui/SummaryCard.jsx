import Summary from "../components/dashboard/summaries/Summary";
import ReadSummary from "./ReadSummary";

export default function SummaryCard({ summary, setter, open }) {
  return (
    <>
      <div className="summary__card">
        <img className="summary__card-img" src={summary.thumbnail} />
        <div>
          <div className="summary__title">{summary.title}</div>
          <div className="summary__channel">{summary.channel}</div>
          <div>errori: {summary.errorCodes.length}</div>

          <ReadSummary date={summary.createdAt} setter={setter} />

          {open && <Summary data={summary} setter={setter} />}
        </div>
      </div>
    </>
  );
}
