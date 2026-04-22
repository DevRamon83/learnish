export default function SummaryScore({ strings, data, stats }) {
  const { score } = data;
  const scoreKeys = Object.keys(score).reverse();

  const scoreSymbols = { up: "🢁", down: "🢃", equal: "≈" };
  const scoreMap = {};

  scoreKeys.forEach((key) => {
    const average = data.score[key] - stats.average.score[key];
    console.log(data.score[key]);
    if (average < -0.5) {
      scoreMap[key] = "down";
    } else if (average > 0.5) {
      scoreMap[key] = "up";
    } else {
      scoreMap[key] = "equal";
    }
  });
  return (
    <div className="summary__score">
      {scoreKeys.map((key) => (
        <div className="summary__detail-scoreContainer" key={key}>
          {strings.score[key]}: {data.score[key]}
          <div
            className={`summary__details-score summary__details-${scoreMap[key]}`}
          >
            {scoreSymbols[scoreMap[key]]}
          </div>
        </div>
      ))}
    </div>
  );
}
