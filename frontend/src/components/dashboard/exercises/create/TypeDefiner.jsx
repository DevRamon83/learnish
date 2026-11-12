export default function TypeDefiner({
  setExercise,
  exercise,
  strings,
  classes,
}) {
  const handler = (type) => {
    setExercise((prev) => ({
      ...prev,
      type,
    }));
  };

  const btnBase = classes.btnBase;

  return (
    <>
      <h2>{strings.type}</h2>
      <div className={classes.type}>
        <button
          className={`${btnBase}${exercise.type === "multipleChoice" ? "-selected" : ""}`}
          onClick={() => handler("multipleChoice")}
        >
          {strings.multipleChoice}
        </button>
        <button
          className={`${btnBase}${exercise.type === "freeText" ? "-selected" : ""}`}
          onClick={() => handler("freeText")}
        >
          {strings.freeText}
        </button>
      </div>
    </>
  );
}
