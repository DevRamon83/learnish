export default function SuccessfullyUpload({
  setExercise,
  setSuccess,
  lang,
  strings,
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
    <div className="exercise__successAlert">
      <p>
        {strings.success}
        <button className="exercise__successBtn" onClick={handler}>
          {strings.close}
        </button>
      </p>
    </div>
  );
}
