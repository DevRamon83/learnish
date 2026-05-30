export default function ScoreAndPoints({
  strings,
  stringKey,
  state,
  scoreClass,
}) {
  return (
    <div className={scoreClass}>
      <div>{strings[stringKey]}</div>
      <div> {state}</div>
    </div>
  );
}
