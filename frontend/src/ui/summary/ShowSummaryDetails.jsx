import { i18nAddresses } from "../../constants/i18nAddresses";
import { classes } from "../../constants/components/dashboard";
import { useLang } from "../../hooks/useLang";
import SummaryScore from "./SummaryScore";
import SummaryErrorStats from "./SummaryErrorStats";

export default function ShowSummaryDetails({ data, stats }) {
  const { strings, lang } = useLang(i18nAddresses.summary);

  return (
    <>
      <div className={classes.summary.scoreContainer}>
        <SummaryScore strings={strings} stats={stats} data={data} />
        <div className={classes.summary.feed}>
          <h4>{strings.score.rating}:</h4>
          <p>{data.feedback}</p>
        </div>
      </div>

      <div className={classes.summary.errorsContainer}>
        <SummaryErrorStats strings={strings} stats={stats} data={data} />
      </div>
    </>
  );
}
