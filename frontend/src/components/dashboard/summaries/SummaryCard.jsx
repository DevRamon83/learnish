import { useEffect, useState } from "react";
import Summary from "./Summary";
import { classes } from "../../../constants/layout/dashboard";
import {
  getSummaryDate,
  getSummaryTitle,
} from "../../../helpers/getSummaryInfo";
import ReadSummary from "./ReadSummary";
import SummaryErrorTab from "../../../ui/SummaryErrorTab";
import SummaryCardErrors from "../../../ui/SummaryCardErrors";

export default function SummaryCard({ summary, setter, open, classes }) {
  const [mySummary, setMySummary] = useState(summary);
  const title = getSummaryTitle(mySummary.title);
  const date = getSummaryDate(mySummary.createdAt);
  const [currentError, setCurrentError] = useState(mySummary.errorCodes[0]);
  const [errorCount, setErrorCount] = useState(null);

  useEffect(() => {
    const howManyError = mySummary.errorCodes.filter(
      (err) => err === currentError,
    ).length;
    setErrorCount(howManyError);
  }, [mySummary, currentError]);

  return (
    <>
      <div className={classes.summary.card}>
        <SummaryErrorTab
          setCurrentError={setCurrentError}
          currentError={currentError}
          errorCodes={mySummary.errorCodes}
          id={mySummary._id}
          classes={classes}
        />

        <div className={classes.summary.title}>{title}</div>
        <div className={classes.summary.channel}>{mySummary.channel}</div>
        <div className={classes.summary.info}>
          <SummaryCardErrors
            errorCount={errorCount}
            currentError={currentError}
            summary={mySummary}
          />
          <div>{date}</div>
          {open === mySummary._id && (
            <Summary data={mySummary} setter={setter} />
          )}
        </div>
        <ReadSummary
          setMySummary={setMySummary}
          setCurrentError={setCurrentError}
          summary={mySummary}
          setter={setter}
          classes={classes}
        />
      </div>
    </>
  );
}
