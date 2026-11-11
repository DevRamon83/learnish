import SummaryCard from "../components/dashboard/summaries/SummaryCard";

export default function StudentManagerSummaries({
  summaries,
  currentStudent,
  classes,
  open,
  setOpen,
}) {
  return (
    <>
      {summaries && currentStudent && (
        <div className={classes.summary.list}>
          {summaries.reverse().map((summary) => (
            <SummaryCard
              key={summary._id}
              summary={summary}
              open={open}
              setter={setOpen}
              classes={classes}
            />
          ))}
        </div>
      )}
    </>
  );
}
