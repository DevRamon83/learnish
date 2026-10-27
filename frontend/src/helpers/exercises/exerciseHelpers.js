import bundle from "shared";

const { acceptOnly } = bundle;

export const answerCleaner = (answer) => {
  const trimmed = answer.trim();
  const firstChar = trimmed.at(0);
  const lastChar = trimmed.at(-1);
  const validSet = "a-zA-Z";
  const validFirst = acceptOnly(firstChar, validSet);
  const validLast = acceptOnly(lastChar, validSet);
  let cleanAnswer = null;
  if (!validFirst) {
    cleanAnswer = answer.slice(1);
  }
  if (!validLast) {
    cleanAnswer = answer.slice(0, -1);
  }

  return {
    firstChar: validFirst ? null : firstChar,
    lastChar: validLast ? null : lastChar,
    cleanAnswer: cleanAnswer ? cleanAnswer : answer,
  };
};

export const cleanUp = (exercise) => {
  if (exercise.type === "freeText" && !exercise.multipleWrongs) return exercise;
  if (exercise.type === "multipleChoice") return exercise;

  if (typeof structuredClone === "function") {
    const clone = structuredClone(exercise);
    clone.multipleWrongs = null;
    return clone;
  }

  return {
    ...exercise,
    multipleWrongs: null,
    answer: [...exercise.answer],
    lessonData: { ...exercise.lessonData },
  };
};

export const cleanDoubleSpace = (string) => {
  const lettersArray = string.trim().split("");
  let newString = "";
  for (let i = 0; i < lettersArray.length; i++) {
    const newStringLastChar = newString.at(-1);
    if (newStringLastChar === " " && lettersArray[i] === " ") continue;

    newString += lettersArray[i];
  }

  return newString;
};
