import bundle from "shared";
import TeacherPrices from "./TeacherPrices";
const { currencyMap } = bundle.constants;

export default function TeacherFront({ strings, teacher, contract, classes }) {
  const dataContract = teacher.contract[contract];
  const currency = currencyMap[teacher.currency];
  return (
    <>
      <h4>{strings.contract[contract]}</h4>
      {contract === "qNa" ? (
        <TeacherPrices
          classes={classes}
          string={strings.front.perRes}
          currency={currency}
          dataContract={dataContract.price}
        />
      ) : (
        <>
          <TeacherPrices
            classes={classes}
            string={strings.front.perSession}
            currency={currency}
            dataContract={dataContract.single}
          />
          <TeacherPrices
            classes={classes}
            string={strings.front.fiveSessions}
            currency={currency}
            dataContract={dataContract.fivePack}
          />
          <TeacherPrices
            classes={classes}
            string={strings.front.tenSessions}
            currency={currency}
            dataContract={dataContract.tenPack}
          />
        </>
      )}
    </>
  );
}
