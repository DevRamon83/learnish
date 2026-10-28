import bundle from "shared";
const { validators } = bundle;

export default function SubmitExercise({
  exercise,
  setError,
  lessons,
  setExercise,
  setSubmit,
  classes,
  strings,
}) {
  const handler = () => {
    const isInvalid = validators.invalidExercise(
      exercise,
      lessons,
      "frontend",
      setExercise,
    );

    if (isInvalid) {
      setSubmit(false);
      return setError(isInvalid);
    }
    setSubmit(true);
  };
  return (
    <>
      <div className={classes.submitExercise} onClick={handler}>
        {strings.submitExercise}
      </div>
    </>
  );
}
