import { classes, statsSymbols } from "../../constants/components/dashboard";
import { mapSymbols } from "../../helpers/stats/finders";

export default function SummaryScore({ strings, data, stats }) {
  const { score } = data;
  const scoreKeys = Object.keys(score).reverse();

  const scoreMap = mapSymbols(
    scoreKeys,
    data.score,
    stats.average.score,
    -0.5,
    0.5,
  );

  const detailsBase = classes.summary.detailsBase;

  return (
    <div className={classes.summary.scoreStats}>
      {scoreKeys.map((key) => (
        <div className={classes.summary.scoreDetailsContainer} key={key}>
          {strings.score[key]}: {data.score[key]}
          <div
            className={`${detailsBase}-score ${detailsBase}-${scoreMap[key]}`}
          >
            {statsSymbols[scoreMap[key]]}
          </div>
        </div>
      ))}
    </div>
  );
}
