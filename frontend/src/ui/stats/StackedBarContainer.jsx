import StackedBar from "../../components/charts/StackedBar";
import { classes } from "../../constants/components/stats";

export default function StackedBarContainer({
  totalMistakes,
  rawAverage,
  averageWord,
  strings,
}) {
  return (
    <>
      <h2>{strings.stackedBarH2}</h2>
      <h3>
        {strings.stackedBarH3Average}
        {averageWord}
        {strings.stackedBarH3Explain}
      </h3>
      <div className={classes.stackedBarContainer}>
        <StackedBar totalMistakes={totalMistakes} rawData={rawAverage} />
      </div>
    </>
  );
}
