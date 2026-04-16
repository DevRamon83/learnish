import { useEffect, useState } from "react";
import Summary from "./Summary";
import { classes } from "../../../constants/layout/dashboard";
import {
  getSummaryDate,
  getSummaryStatus,
  getSummaryTitle,
} from "../../../helpers/getSummaryInfo";
import ReadSummary from "../../../ui/ReadSummary";
import SummaryErrorTab from "../../../ui/SummaryErrorTab";
import SummaryCardErrors from "../../../ui/SummaryCardErrors";

export default function SummaryCard({ summary, setter, open }) {
  const title = getSummaryTitle(summary.title);
  const status = getSummaryStatus(summary);
  const date = getSummaryDate(summary.createdAt);
  const [currentError, setCurrentError] = useState(summary.errorCodes[0]);
  const [currentCount, setCurrentCount] = useState(null);

  useEffect(() => {
    const howManyError = summary.errorCodes.filter(
      (err) => err === currentError,
    ).length;
    setCurrentCount(howManyError);
  }, [currentError]);

  return (
    <>
      <div className={classes.summary.card}>
        <SummaryErrorTab
          setCurrentError={setCurrentError}
          errorCodes={summary.errorCodes}
          id={summary._id}
        />
        <div className={classes.summary.info}>
          <div className={classes.summary.title}>{title}</div>
          <div className={classes.summary.channel}>{summary.channel}</div>
          <SummaryCardErrors
            currentCount={currentCount}
            currentError={currentError}
            summary={summary}
          />
          <div>{date}</div>

          <ReadSummary status={status} setter={setter} />

          {open && <Summary data={summary} setter={setter} />}
        </div>
      </div>
    </>
  );
}
