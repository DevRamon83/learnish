export default function LineChartSvg({ chartWidth, height, ids, points }) {
  return (
    <svg
      viewBox={`0 0 ${chartWidth} ${height}`}
      preserveAspectRatio="none"
      width="100%"
      height={height}
    >
      <g id={ids.revealWrapper}>
        {points?.lines &&
          points.lines.map((linePoints, index) => (
            <polyline
              key={`broken_line_${index}`}
              points={linePoints}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          ))}

        {points?.circles &&
          points.circles.map((c, index) => (
            <circle
              key={`dot_${index}`}
              cx={c.x}
              cy={c.y}
              r="4"
              fill="#3B82F6"
              stroke="#FFF"
              strokeWidth="1.5"
            />
          ))}
      </g>
    </svg>
  );
}
