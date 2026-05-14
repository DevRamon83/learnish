import { i18nAddresses } from "../../constants/i18nAddresses";
import { findMyStats, mapSymbols } from "../../helpers/stats/finders";
import { useLang } from "../../hooks/useLang";
import { statsSymbols } from "../../constants/components/dashboard";

export default function SummaryErrorStats({ strings, data, stats }) {
  const errorLang = useLang(i18nAddresses.errors);
  const errorStrings = errorLang.strings;

  const errors = data.errorCodes.reduce((acc, error) => {
    if (error.trim() !== "") {
      acc[error] = (acc[error] || 0) + 1;
    }
    return acc;
  }, {});

  const ratio = (errors, words) => {
    const ratio = (errors / words) * 100;
    return +ratio.toFixed(1);
  };

  const summaryStats = findMyStats(errors, stats, data);

  const errorsArray = Object.keys(errors);
  const errorsRatio = {};

  errorsArray.forEach((error) => {
    errorsRatio[error] = ratio(errors[error], summaryStats.words);
  });

  const errorMap = mapSymbols(
    errorsArray,
    errorsRatio,
    stats.average.errorTypes,
    -0.5,
    0.5,
  );

  return (
    <div className="summary__errors">
      <h4>Errori ogni 100 parole</h4>
      {errorsArray.map((key) => (
        <div className="summary__detail-errorsContainer" key={`${key}Details`}>
          {errorStrings[key]}: {ratio(errors[key], summaryStats.words)}
          <div
            className={`summary__details-score summary__details-${errorMap[key]}`}
          >
            {statsSymbols[errorMap[key]]}
          </div>
        </div>
      ))}
    </div>
  );
}

/*


            */
