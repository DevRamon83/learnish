import { useEffect, useState } from "react";
import { useLang } from "../../../../hooks/useLang";
import { i18nAddresses } from "../../../../constants/i18nAddresses";
import InvalidExercise from "../../../../ui/exercises/InvalidExercise";
import SubmitExercise from "./SubmitExercise";
import SetCorrectAnswer from "./SetCorrectAnswer";
import MultipleChoice from "./MultipleChoice";
import TypeDefiner from "./TypeDefiner";
import LessonDefiner from "./LessonDefiner";
import QuestionDefiner from "./QuestionDefiner";
import { cleanUp } from "../../../../helpers/exercises/exerciseHelpers";
import { classes } from "../../../../constants/components/exercises";
const { create } = classes;

/**
 * ARCHITECTURAL NOTE:
 * This component orchestrates a progressive, step-by-step exercise creation wizard.
 * Instead of traditional multi-page navigation (Next/Back buttons), the UI unfolds
 * linearly down the page as the teacher fills in each field. This approach ensures
 * a continuous visual context for the user.
 *
 * STATE MANAGEMENT & DATA FLOW:
 * - 'exercise': The single source of truth for the payload destined for the database.
 * - 'changeQuestion': Serves a dual purpose. It acts as a visual anchor holding the
 *   confirmed question string, and functions as a conditional toggle to lock/unlock
 *   subsequent configuration steps.
 * - Final validation and deep-cloning (including legacy browser safety checks) are
 *   delegated to external helpers during the submission phase to keep this component
 *   lean and declarative.
 */

export default function NewExercise() {
  const lessons = useLang(i18nAddresses.englishLessons);
  const texts = useLang(i18nAddresses.exercises);
  const errors = useLang(i18nAddresses.errors);
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(null);
  const [changeQuestion, setChangeQuestion] = useState(false);
  const [chooseAnswer, setChooseAnswer] = useState([]);

  const [exercise, setExercise] = useState({
    type: null,
    question: null,
    clozeQuestion: null,
    answer: [],
    multipleWrongs: null,
    lessonData: {
      lessonIndex: null,
      lessonTitle: null,
      lessonKey: null,
      lessonLevel: null,
    },
  });

  const errorHandler = (invalid, errorType) => {
    if (invalid) {
      setError(errorType);
    } else {
      setError(null);
    }
  };

  useEffect(() => {
    if (!submit) return;

    // Sanitize payload before API submission: removes orphaned 'multipleWrongs' data
    // if the teacher switched the exercise type to 'freeText' mid-setup.
    // Includes a safe deep-clone fallback mechanism for backward compatibility
    // with older browsers.
    const payload = cleanUp(exercise);

    // qui dentro facciamo partire la fetch
    // a seconda della risposta possiamo mostrare un errore o un tasto
    // per inserire un nuovo esercizio
    console.log(payload);
  }, [submit]);

  return (
    <div className="exercises__createContainer">
      <h1>{texts.strings.newExerciseHeader}</h1>
      <TypeDefiner
        setExercise={setExercise}
        exercise={exercise}
        strings={texts.strings}
        classes={create}
      />
      {exercise.type && (
        <LessonDefiner
          setExercise={setExercise}
          lessons={lessons}
          strings={texts.strings}
          classes={create}
        />
      )}
      {exercise.lessonData.lessonIndex && (
        <>
          <QuestionDefiner
            setExercise={setExercise}
            setError={setError}
            exercise={exercise}
            changeQuestion={changeQuestion}
            setChangeQuestion={setChangeQuestion}
            setChooseAnswer={setChooseAnswer}
            strings={texts.strings}
            classes={create}
          />
        </>
      )}

      {changeQuestion && exercise.question && (
        <SetCorrectAnswer
          chooseAnswer={chooseAnswer}
          setExercise={setExercise}
        />
      )}

      {exercise.type === "multipleChoice" &&
        exercise.answer.length !== 0 &&
        changeQuestion && (
          <MultipleChoice
            setError={setError}
            setExercise={setExercise}
            strings={texts.strings}
          />
        )}

      {exercise.answer.length !== 0 && changeQuestion && (
        <SubmitExercise
          lessons={lessons.strings}
          exercise={exercise}
          errorHandler={errorHandler}
          setExercise={setExercise}
          setSubmit={setSubmit}
          classes={create}
        />
      )}
      {error && <InvalidExercise strings={errors.strings} error={error} />}
    </div>
  );
}
