import bundle from "shared";
const { validators } = bundle;

export default function SubmitExercise({
  exercise,
  errorHandler,
  lessons,
  setExercise,
  setSubmit,
  classes,
}) {
  const handler = () => {
    const isInvalid = validators.invalidExercise(
      exercise,
      lessons,
      setExercise,
    );

    if (isInvalid) {
      setSubmit(false);
      return errorHandler(true, isInvalid);
    }
    setSubmit(true);
  };
  return (
    <>
      <img className={classes.submit} src="/upload.svg" onClick={handler} />
    </>
  );
}
