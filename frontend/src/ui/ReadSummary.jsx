import { classes } from "../constants/layout/dashboard";

export default function ReadSummary({ setter, status }) {
  return (
    <p className={classes.summary.read} onClick={() => setter(true)}>
      <span className={classes.summary.status}>{status}</span>
      <span className={classes.summary.arrow}>⊳</span>
    </p>
  );
}
