export default function ExplainMistake({ mistake, classMistake }) {
  return (
    <>
      {mistake && (
        <p
          className={
            classMistake
              ? `summary__explain${classMistake}`
              : "summary__explain"
          }
        >
          {mistake.explain}
        </p>
      )}
    </>
  );
}
