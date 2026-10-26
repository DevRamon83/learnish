export default function Legend({
  errorKeys,
  rawData,
  currentStat,
  setCurrentStat,
  strings,
  classes,
}) {
  const { errorCodes, texts } = strings;

  return (
    <>
      <h1>{texts.legend}</h1>
      <div className={classes.legendContainer}>
        {errorKeys.map((error) => (
          <div
            onClick={() => setCurrentStat(error)}
            className={
              currentStat === error ? classes.legendActive : `stats__${error}`
            }
            key={`legend_${error}`}
          >
            <div
              className={classes.legendContent}
            >{`${errorCodes[error]}: ${rawData[error]}%`}</div>
          </div>
        ))}
      </div>
    </>
  );
}
