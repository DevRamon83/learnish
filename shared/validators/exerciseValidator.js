import { acceptOnly } from "ramon-vanilla";

const validTypes = ["multipleChoice", "freeText"];

const validateMultipleAnswer = (wrongString) => {
  const resp = { error: false, cleanArray: [] };

  let normalizeString = wrongString;

  if (Array.isArray(normalizeString)) {
    normalizeString = wrongString.join(",");
  }

  const lastChar = normalizeString.at(-1);
  const charSet = "a-zA-Z";
  const isValidLastChar = acceptOnly(lastChar, charSet);
  if (!isValidLastChar) {
    resp.error = "invalidLastChar";
    return resp;
  }

  if (!normalizeString) {
    resp.error = "missingWrongAnswer";
    return resp;
  }

  if (normalizeString.length > 250) {
    resp.error = "wrongAnswerInvalidLength";
    return resp;
  }

  const wrongsArray = normalizeString.split(",");
  if (wrongsArray.length > 9) {
    resp.error = "max9Answer";
    return resp;
  }

  if (wrongsArray.length < 3) {
    resp.error = "min3Answer";
    return resp;
  }

  let invalidAnswer = false;

  const cleanArray = wrongsArray.map((wrong) => {
    const cleanAnswer = wrong.trim();

    if (cleanAnswer.length > 20) {
      invalidAnswer = invalidAnswer ? invalidAnswer : "answerToLong";
    }

    if (cleanAnswer.length === 0) {
      invalidAnswer = invalidAnswer ? invalidAnswer : "missingWrongAnswer";
    }

    return cleanAnswer;
  });

  if (invalidAnswer) {
    resp.error = invalidAnswer;
    return resp;
  }

  resp.cleanArray = cleanArray;

  return resp;
};

export const invalidExercise = (exercise, lessons, caller, setExercise) => {
  if (!validTypes.includes(exercise.type)) return "invalidTypeExercise";

  if (typeof exercise.question !== "string") return "invalidTypeExercise";

  if (exercise.question.length > 250) return "invalidQuestion";

  const { lessonIndex, lessonKey, lessonLevel } = exercise.lessonData;

  if (!lessonIndex || !lessonKey || !lessonLevel) return "lessonDataMissing";

  const lessonObj = lessons.get(lessonKey);
  if (!lessonObj) return "invalidLessonKey";

  if (lessonIndex.trim() !== lessonObj.index.trim())
    return "invalidLessonIndex";

  if (lessonLevel.trim() !== lessonObj.level.trim())
    return "invalidLessonLevel";

  let resp;

  if (exercise.type === "multipleChoice") {
    resp = validateMultipleAnswer(exercise.multipleWrongs);
  }

  if (resp && resp.error) return resp.error;

  if (!Array.isArray(exercise.answer)) return "malformedAnswer";

  if (exercise.answer.length !== 2) return "malformedAnswer";

  if (typeof exercise.answer[0] !== "string") return "malformedAnswer";

  if (exercise.answer[0].trim().length === 0) return "malformedAnswer";

  if (typeof exercise.answer[1] !== "number") return "malformedAnswer";

  if (resp && caller === "frontend") {
    setExercise((prev) => ({
      ...prev,
      multipleWrongs: resp.cleanArray,
    }));
  }

  return false;
};
