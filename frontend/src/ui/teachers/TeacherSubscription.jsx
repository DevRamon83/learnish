import bundle from "shared";
const { currencyMap } = bundle.constants;

export default function TeacherSubscription({ strings, teacher, classes }) {
  const dataContract = teacher.contract.subscription;
  const currency = currencyMap[teacher.currency];
  return (
    <>
      <h4>{strings.contract.subscription}</h4>

      <div className={classes.front}>
        <div className={classes.contractLabel}>{strings.costs.monthly}</div>
        <div className={classes.contractCost}>
          {dataContract.monthly}
          {currency}
        </div>
      </div>
      <div className={classes.front}>
        <div className={classes.contractLabel}>
          {strings.costs.semiannually}
        </div>
        <div className={classes.contractCost}>
          {dataContract.semiannually}
          {currency}
        </div>
      </div>
      <div className={classes.front}>
        <div className={classes.contractLabel}>{strings.costs.annually}</div>
        <div className={classes.contractCost}>
          {dataContract.annually}
          {currency}
        </div>
      </div>
    </>
  );
}
