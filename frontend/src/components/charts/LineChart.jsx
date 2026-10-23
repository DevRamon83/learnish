import { useEffect, useState } from "react";
import useViewportObserver from "../../hooks/useViewportObserver";
import { defineMax } from "../../helpers/stats/calculators";
import { findLabelsX } from "../../helpers/stats/finders";
import { classes, ids } from "../../constants/components/stats";
import LineChartSvg from "./LineChartSVG";

export default function LineChart({ rawData, height, period }) {
  const { chartWidth, isMobile } = useViewportObserver();
  const [labels, setLabels] = useState(null);
  const [points, setPoints] = useState(null);
  const max = defineMax(rawData);

  const date = new Date();
  const { tags, simplifyTags } = findLabelsX(period, date);

  useEffect(() => {
    if (chartWidth) {
      const allLines = []; // ["x1,y1 x2,y2", "x3,y3 x4,y4"]
      let currentLinePoints = [];
      const circles = [];

      let starter = false;

      for (let i = 0; i < rawData.length; i++) {
        const datum = rawData[i];

        // until no data
        if (datum.words === 0 && !starter) {
          continue;
        }

        starter = true;
        const x = i * (chartWidth / (rawData.length - 1));

        if (datum.words > 0) {
          // 2. we have data
          const ratio = (datum.errors / datum.words) * 100;
          const y = height - Math.min((ratio / max) * height, height);

          currentLinePoints.push(`${x},${y}`);
          circles.push({ x, y });
        } else {
          // 3. no data, cut the line
          if (currentLinePoints.length >= 2) {
            allLines.push(currentLinePoints.join(" "));
          }
          currentLinePoints = [];
        }
      }

      if (currentLinePoints.length >= 2) {
        allLines.push(currentLinePoints.join(" "));
      }

      setPoints({
        lines: allLines,
        circles: circles,
      });
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
        <div className={classes.lineContainer}>
          <div id={ids.lineWrapper}>
            <LineChartSvg
              chartWidth={chartWidth}
              height={height}
              ids={ids}
              points={points}
            />
          </div>
          <div className={classes.labelX}>
            {labels &&
              labels.map((tag) => (
                <div key={tag.replace(" ", "")} className={classes.labels}>
                  {tag}
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
