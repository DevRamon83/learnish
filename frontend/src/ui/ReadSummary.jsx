import { classes } from "../constants/layout/dashboard";

export default function ReadSummary({ setter, date }) {
  const wrote = new Date(date).toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <p className={classes.summary.read} onClick={() => setter(true)}>
      <span className={classes.summary.date}>{wrote}</span>
      <span className={classes.summary.arrow}>⊳</span>
    </p>
  );
}
