export default function MultipleChoice({
  setExercise,
  strings,
  setError,
  classes,
}) {
  const handler = (e) => {
    setExercise((prev) => ({
      ...prev,
      multipleWrongs: e.target.value,
    }));
  };
  return (
    <>
      <h2>{strings.multipleChoiceHeader}</h2>
      <input
        className={classes.inputMultipleChoice}
        onFocus={() => setError(null)}
        onBlur={handler}
        type="text"
        placeholder={strings.multipleChoiceExample}
      />
    </>
  );
}
