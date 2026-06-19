import bundle from "shared";
const { currencyMap } = bundle.constants;

export default function TeacherSubscription({ strings, teacher }) {
  const dataContract = teacher.contract.subscription;
  const currency = currencyMap[teacher.currency];
  return (
    <>
      <h4>{strings.contract.subscription}</h4>

      <div className="settings__teacherFront">
        <div className="settings__contractLabel">costo mensile</div>
        <div className="settings__contractCost">
          {dataContract.monthly}
          {currency}
        </div>
      </div>
      <div className="settings__teacherFront">
        <div className="settings__contractLabel">costo semestrale</div>
        <div className="settings__contractCost">
          {dataContract.semiannually}
          {currency}
        </div>
      </div>
      <div className="settings__teacherFront">
        <div className="settings__contractLabel">costo annuale</div>
        <div className="settings__contractCost">
          {dataContract.annually}
          {currency}
        </div>
      </div>
    </>
  );
}
