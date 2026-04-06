import useViewportObserver from "../../hooks/useViewportObserver";

export default function StackedBar() {
  const { chartWidth, isMobile } = useViewportObserver();

  const totalMistakes = 39;

  const rawData = [
    { id: "spell", errors: 5 },
    { id: "tens", errors: 6 },
    { id: "agree", errors: 3 },
    { id: "prep", errors: 6 },
    { id: "word", errors: 4 },
    { id: "order", errors: 9 },
    { id: "sing", errors: 3 },
    { id: "art", errors: 2 },
    { id: "pron", errors: 1 },
  ];

  let currentX = 0;

  const chartData = rawData.map((item) => {
    const barWidth = (item.errors / totalMistakes) * 100;
    const normalize = (chartWidth / 100) * barWidth;
    const x = currentX;
    currentX = currentX + normalize;

    return { ...item, barWidth: normalize, x };
  });

  return (
    <div>
      <svg
        viewBox={`0 0 ${chartWidth} 40`}
        preserveAspectRatio="none"
        width="100%"
        height="40"
        className="chart__stackedBar-border"
      >
        <g id="reveal-wrapper">
          {chartData.map((datum) => (
            <rect
              key={datum.id}
              id={"chart__stackedBar-" + datum.id}
              x={datum.x}
              width={datum.barWidth}
              y="0"
              height="40"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
