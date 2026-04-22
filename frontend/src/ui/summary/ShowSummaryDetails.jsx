import { i18nAddresses } from "../../constants/i18nAddresses";
import { classes } from "../../constants/components/dashboard";
import { useLang } from "../../hooks/useLang";
import SummaryScore from "./SummaryScore";

export default function ShowSummaryDetails({ data, stats }) {
  const { strings, lang } = useLang(i18nAddresses.summary);

  return (
    <div className={classes.summary.detailsContainer}>
      <SummaryScore strings={strings} stats={stats} data={data} />
      <div className="summary__feedback">
        <h4>{strings.score.rating}:</h4>
        <p>{data.feedback}</p>
      </div>
    </div>
  );
}
