import { useRef } from "react";
import { cleanDoubleSpace } from "../../../../helpers/exercises/exerciseHelpers";

export default function QuestionDefiner({
  setExercise,
  setError,
  exercise,
  changeQuestion,
  setChangeQuestion,
  setChooseAnswer,
  strings,
  classes,
}) {
  const text = exercise.question ? exercise.question : "";
  const questionRef = useRef(null);

  const questionHandler = () => {
    const text = questionRef.current.value;
    setChangeQuestion(text);

    if (text.length === 250) return setError("invalidQuestion");

    if (!text || text.trim() === "") return setError("invalidQuestion");

    const cleanText = cleanDoubleSpace(text);

    const answerArray = cleanText.split(" ");
    if (answerArray.length < 3) return setError("questionTooShort");
    setChooseAnswer(answerArray);
    setError(null);
    setExercise((prev) => ({
      ...prev,
      question: cleanText,
    }));
  };

  const changeQuestionHandler = () => {
    setExercise((prev) => ({
      ...prev,
      answer: [],
    }));
    setChangeQuestion(false);
  };

  return (
    <>
      <h2>{!changeQuestion ? strings.questionText : strings.yourQuestion}</h2>
      {!changeQuestion ? (
        <div className={classes.questionContainer}>
          <textarea
            ref={questionRef}
            defaultValue={text}
            maxLength={250}
            rows="5"
          />

          <img
            src="/upload.svg"
            className={classes.submit}
            onClick={questionHandler}
          />
        </div>
      ) : (
        <div className={classes.yourQuestion}>
          {changeQuestion}
          <img
            src="/change.svg"
            className={classes.sendBtn}
            onClick={changeQuestionHandler}
          />
        </div>
      )}
    </>
  );
}
