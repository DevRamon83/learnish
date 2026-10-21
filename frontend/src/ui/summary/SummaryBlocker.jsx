export default function SummaryBlocker({ strings, classes }) {
  return (
    <div className={classes.summary.uiBlocker}>
      <p>
        {strings.blocker.why}
        {strings.blocker.patience}
      </p>
    </div>
  );
}
