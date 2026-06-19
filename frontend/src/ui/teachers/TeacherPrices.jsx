export default function TeacherPrices({
  classes,
  string,
  currency,
  dataContract,
}) {
  return (
    <div className={classes.front}>
      <div className={classes.contractLabel}>{string}</div>
      <div className={classes.contractCost}>
        {dataContract}
        {currency}
      </div>
    </div>
  );
}
