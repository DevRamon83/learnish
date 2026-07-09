import bundle from "shared";
import Groq from "groq-sdk";
import exerciseModel from "../models/exercises.js";
import exerciseSchema from "../ai/schema/exerciseSchema.js";
import mistralFetch from "../ai/fetch/mistralFetch.js";
const { englishLessons } = bundle.langs.italian.lessons;

const exercisesPipeline = async (currentPosition) => {
  const titles = [];
  const indexes = [];
  const position = currentPosition || 1;

  englishLessons.forEach((lesson) => {
    titles.push(lesson.title);
    indexes.push(lesson.index);
  });

  const mistralPrompt = "Translate from italian to english";
  const content = titles[position];
  const mistralResponse = await mistralFetch(mistralPrompt, content);

  if (mistralResponse.error) {
    console.log("error in translation");
    return;
  }

  const mistralJSON = JSON.parse(mistralResponse.response.content);
  const title = mistralJSON.translation;
  console.log(title);

  const type = "multiple choice";
  const targetLang = "english";
  const prompt = `You are an English teacher who just finished a lesson on the following topic: "${title}".
  Generate a multiple-choice exercise to test the student's understanding.`;

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const schemaStr = JSON.stringify(exerciseSchema());
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `${prompt}. 
                    Respond ONLY in JSON format, following this pattern: ${schemaStr}`,
        },
        {
          role: "user",
          content: "generate five exercises",
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0,
    });

    if (response.error) {
      console.error("error in position ", position);
      return;
    }

    const aiResp = response.choices[0].message.content;
    const dataObject = JSON.parse(aiResp);
    const data = dataObject.exercise.questions;

    for (const datum of data) {
      await exerciseModel.create({
        instructions: dataObject.exercise.instructions,
        index: indexes[position],
        type: "multipleChoice",
        targetLang: "english",
        question: { english: datum.question },
        options: { english: datum.options },
        answer: { english: [datum.correct_answer] },
      });
    }

    console.log("position completed ", position);
    setTimeout(() => {
      if (position === titles.length - 1) {
        console.log("finish");
      } else {
        exercisesPipeline(position + 1);
      }
    }, 60000);
  } catch (err) {
    console.error("exercises pipeline ", err);
  }
};

export default exercisesPipeline;
