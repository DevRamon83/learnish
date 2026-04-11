import Summary from "../components/dashboard/summaries/Summary";
import { classes } from "../constants/layout/dashboard";
import ReadSummary from "./ReadSummary";

export default function SummaryCard({ summary, setter, open }) {
  return (
    <>
      <div className={classes.summary.card}>
        <img className={classes.summary.cardImg} src={summary.thumbnail} />
        <div>
          <div className={classes.summary.title}>{summary.title}</div>
          <div className={classes.summary.channel}>{summary.channel}</div>
          <div>errori: {summary.errorCodes.length}</div>

          <ReadSummary date={summary.createdAt} setter={setter} />

          {open && <Summary data={summary} setter={setter} />}
        </div>
      </div>
    </>
  );
}
