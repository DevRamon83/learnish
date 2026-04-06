import { useEffect, useState } from "react";
import useViewportObserver from "../../hooks/useViewportObserver";

const tagDefiner = (chartType, startDate) => {
  let duration = null;
  if (chartType === "weekly") {
    duration = 7;
  }

  if (chartType === "montly") {
    duration = 30;
  }

  if (chartType === "quarter") {
    duration = 90;
  }

  const step = parseInt(duration / 6);
  const tags = [];

  for (let i = 0; i < 7; i++) {
    const newDate = new Date(startDate);
    newDate.setDate(startDate.getDate() + i * step);
    const label = newDate.toLocaleString(undefined, {
      day: "numeric",
      month: "long",
    });
    tags.push(label);
  }

  const simplifyTags = [];
  simplifyTags.push(tags[0], tags[3], tags[6]);

  return { tags, simplifyTags };
};

export default function LineChart() {
  const { chartWidth, isMobile } = useViewportObserver();
  const [labels, setLabels] = useState(null);
  const [points, setPoints] = useState(null);
  const max = 2;
  const rawData = [
    { errors: 5, words: 500 },
    { errors: 3, words: 350 },
    { errors: 3, words: 400 },
    { errors: 1, words: 420 },
    { errors: 3, words: 440 },
    { errors: 7, words: 380 },
    { errors: 4, words: 280 },
  ];

  const date = new Date();
  const { tags, simplifyTags } = tagDefiner("montly", date);

  useEffect(() => {
    if (chartWidth) {
      const chartPoints = rawData.map((datum, i) => {
        const ratio = (datum.errors / datum.words) * 100;

        const x = i * (chartWidth / (rawData.length - 1));

        const y = 100 - Math.min((ratio / max) * 100, 100);

        return `${x},${y}`;
      });

      setPoints(chartPoints);
    }

    if (isMobile) {
      setLabels(simplifyTags);
    } else {
      setLabels(tags);
    }
  }, [chartWidth]);

  return (
    <>
      {chartWidth && (
        <div className="chart__line-container">
          <div id="chart__line-wrapper">
            <svg
              viewBox={`0 0 ${chartWidth} 100`}
              preserveAspectRatio="none"
              width="100%"
              height="100"
            >
              <g id="reveal-wrapper">
                {" "}
                {/* Riutilizziamo la tua animazione clip-path */}
                <polyline
                  points={points}
                  fill="none"
                  stroke="#3B82F6" // Un blu per la linea
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke" // Mantiene lo spessore costante
                />
              </g>
            </svg>
          </div>
          <div className="chart__labels-x">
            {labels &&
              labels.map((tag) => (
                <div key={tag.replace(" ", "")} className="chart__labels">
                  {tag}
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
