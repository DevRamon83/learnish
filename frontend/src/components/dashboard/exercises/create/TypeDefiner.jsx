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
      <div className="exercise__typeDefiner">
        <div
          className={`${btnBase}${exercise.type === "multipleChoice" ? "-selected" : ""}`}
          onClick={() => handler("multipleChoice")}
        >
          {strings.multipleChoice}
        </div>
        <div
          className={`${btnBase}${exercise.type === "freeText" ? "-selected" : ""}`}
          onClick={() => handler("freeText")}
        >
          {strings.freeText}
        </div>
      </div>
    </>
  );
}
