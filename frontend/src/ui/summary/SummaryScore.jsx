import { statsSymbols } from "../../constants/components/dashboard";
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

  return (
    <div className="summary__score">
      {scoreKeys.map((key) => (
        <div className="summary__detail-scoreContainer" key={key}>
          {strings.score[key]}: {data.score[key]}
          <div
            className={`summary__details-score summary__details-${scoreMap[key]}`}
          >
            {statsSymbols[scoreMap[key]]}
          </div>
        </div>
      ))}
    </div>
  );
}
