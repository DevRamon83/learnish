import { i18nAddresses } from "../constants/i18nAddresses";
import { classes } from "../constants/layout/dashboard";
import { useLang } from "../hooks/useLang";

export default function ShowSummaryDetails({ data }) {
  const { score } = data;
  const scoreKeys = Object.keys(score).reverse();
  const { strings, lang } = useLang(i18nAddresses.summary);

  return (
    <div className={classes.summary.score}>
      {strings.score.rating}:
      {scoreKeys.map((key) => (
        <div key={key}>
          <div>
            {strings.score[key]}: {data.score[key]}
          </div>
        </div>
      ))}
      <p>{data.feedback}</p>
    </div>
  );
}
