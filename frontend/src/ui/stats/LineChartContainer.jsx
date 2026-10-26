import LineChart from "../../components/charts/LineChart";
import PeriodSelect from "./PeriodSelect";

export default function LineChartContainer({
  currentRawData,
  setPeriod,
  labelY,
  period,
  strings,
  currentStat,
  classes,
}) {
  const { texts, errorCodes } = strings;

  return (
    <>
      <h2>
        {texts.category} {errorCodes[currentStat]}
      </h2>
      <h3>{texts.lineChartH3}</h3>
      <PeriodSelect setter={setPeriod} strings={strings.texts} />
      {currentRawData && (
        <div className={classes.lineChartContainer}>
          <div className={classes.y}>
            {labelY &&
              labelY.map((label) => (
                <div key={`labelY_${label}`}>{label.toFixed(2)} -</div>
              ))}
          </div>
          <LineChart
            key={`${currentStat}-${period}`}
            rawData={currentRawData}
            height={250}
            period={period}
          />
        </div>
      )}
    </>
  );
}
