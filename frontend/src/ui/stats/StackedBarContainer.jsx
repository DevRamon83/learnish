import StackedBar from "../../components/charts/StackedBar";

export default function StackedBarContainer({
  totalMistakes,
  rawAverage,
  averageWord,
  strings,
  classes,
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
