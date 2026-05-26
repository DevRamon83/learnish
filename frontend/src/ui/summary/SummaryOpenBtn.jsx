import { classes } from "../../constants/components/dashboard";

export default function SummaryOpenBtn({ id, setter }) {
  return (
    <div className={classes.summary.iconRead} onClick={() => setter(id)}>
      <img src="/read.svg" />
    </div>
  );
}
