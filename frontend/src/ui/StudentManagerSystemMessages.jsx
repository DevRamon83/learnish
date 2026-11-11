import Spinner from "./Spinner";

export default function StudentManagerSystemMessages({
  summaries,
  tab,
  currentStudent,
  fetchState,
  strings,
}) {
  const summaryOrStats = tab === "summaries" || tab === "stats";
  const noSummary = !summaries && summaryOrStats;

  return (
    <>
      {noSummary &&
        currentStudent &&
        (fetchState === "pending" ? (
          <Spinner />
        ) : (
          <p>{strings.studentManager.noTexts}</p>
        ))}
      {!currentStudent && <p>{strings.studentManager.noSelection}</p>}
    </>
  );
}
