import bundle from "shared";
import exerciseModel from "../models/exercises.js";
import mistralFetch from "../ai/fetch/mistralFetch.js";
const { englishLessons } = bundle.langs.italian.lessons;

const respHandler = (resp, key) => {
  const { text, answer } = resp;
  if ((!text, !answer)) {
    console.log("missing error ", key);
    return { error: true };
  }

  const array = text.split(" ");
  let answerPosition;
  const cleanArray = [];

  array.forEach((value, index) => {
    if (value.at(1) === "_") {
      answerPosition = index;
      cleanArray.push(answer);
    } else {
      cleanArray.push(value);
    }
  });

  return { error: false, answerPosition, question: cleanArray.join(" ") };
};

const exercisesPipeline = async (currentPosition) => {
  const titles = [];
  const keys = [];
  const position = currentPosition || 1;

  for (const lesson of englishLessons) {
    const title = lesson[0].replaceAll("_", " ");
    titles.push(title);
    keys.push(lesson[0]);
  }

  const reply = `Reply to me with the following object: {
fill_in_the_blanks: {
text: the exercise text containing '____', as a string
answer: the missing word to fill the blank, as a string
},
multiple_choice: {
text: a different exercise text containing '____', as a string
answer: the missing word to fill the blank, as a string
incorrect_answers: an array of strings with 4 incorrect answers
}
}`;

  const mistralPrompt = `You are an English teacher who has just finished the lesson on ${titles[position]}; you have to prepare two exercises on the lesson just finished of type: "fill in the blanks" and "multiple choice".
CRITICAL: Both exercises must be a sentence containing '____' where a word is missing. Do not use open questions for the multiple choice.
${reply}. IMPORTANT: you cannot use the same text for the two exercises`;

  const mistralResp = await mistralFetch(mistralPrompt);

  if (mistralResp.error) {
    console.log("error ", keys[currentPosition]);
    return;
  }

  const mistralJSON = JSON.parse(mistralResp.response.content);
  const { fill_in_the_blanks, multiple_choice } = mistralJSON;

  if (!fill_in_the_blanks || !multiple_choice) {
    console.log("error ", keys[currentPosition]);
    return;
  }

  const freeText = respHandler(fill_in_the_blanks);
  const multiple = respHandler(multiple_choice);

  if (freeText.error || multiple.error) {
    console.log("handler fail ", keys[currentPosition]);
    return;
  }

  const lessonKey = keys[position];

  const freeTextData = {
    type: "freeText",
    question: freeText.question,
    clozeQuestion: fill_in_the_blanks.text,
    answerText: fill_in_the_blanks.answer,
    answerPosition: freeText.answerPosition,
    targetLang: "english",
    lessonKey,
    aiGenerated: true,
  };

  const multipleData = {
    type: "multipleChoice",
    question: multiple.question,
    clozeQuestion: multiple_choice.text,
    answerText: multiple_choice.answer,
    answerPosition: multiple.answerPosition,
    targetLang: "english",
    lessonKey,
    multipleWrongs: multiple_choice.incorrect_answers,
    aiGenerated: true,
  };

  try {
    await exerciseModel.create(freeTextData);
    await exerciseModel.create(multipleData);
  } catch (err) {
    console.log("error in db ", keys[position]);
    console.log(err);
  }

  const newPosition = position + 1;
  setTimeout(() => {
    if (position === titles.length - 1) {
      console.log("finish");
    } else {
      console.log("COMPLETE ", position);
      exercisesPipeline(newPosition);
    }
  }, 60000);
};

export default exercisesPipeline;
