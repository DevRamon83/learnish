export default function SuccessfullyUpload({
  setExercise,
  setSuccess,
  lang,
  strings,
  classes,
}) {
  const handler = () => {
    setExercise({
      type: null,
      question: null,
      lang,
      clozeQuestion: null,
      answer: [],
      multipleWrongs: null,
      lessonData: {
        lessonIndex: null,
        lessonKey: null,
        lessonLevel: null,
      },
    });
    setSuccess(false);
  };
  return (
    <div className={classes.alert}>
      <p>
        {strings.success}
        <button className={classes.successBtn} onClick={handler}>
          {strings.close}
        </button>
      </p>
    </div>
  );
}
