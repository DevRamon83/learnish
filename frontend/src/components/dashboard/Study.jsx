import { classes } from "../../constants/layout/dashboard";
import Summaries from "./summaries/Summaries";

export default function Study() {
  return (
    <>
      <div className={classes.dashPanel}></div>
      <Summaries />
    </>
  );
}
