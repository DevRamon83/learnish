import mistralCli from "../ai/fetch/mistralFetch.js";
import {
  mistralVocabularyPrompt,
  pollinationsImgPrompt,
} from "../ai/prompt/prompt.js";
import vocabularyModel from "../models/vocabulary.js";
import saveNewWord from "./helpers/saveNewWord.js";
import getWordData from "./helpers/wordData.js";
import getFlashcard from "./helpers/flashcard.js";
import { attempt } from "./helpers/commons.js";
import {
  pickupAudio,
  pickupFlashcards,
  pickupWordData,
} from "./helpers/pickupData.js";
import getAudio from "./helpers/audioPollinations.js";

const dailyRecordCounter = async () => {
  const today = new Date().setHours(0, 0, 0, 0);
  const count = await vocabularyModel.countDocuments({
    createdAt: { $gte: today },
  });

  return count;
};

const dispatcher = async (process, wordList) => {
  if (process === "wordsData") {
    const { wordObj, dataError } = pickupWordData(wordList);
    const mongoObj = await attempt(saveNewWord, [wordObj], dataError);
    const newWord = mongoObj.res?.newWord;
    const myWord = await attempt(getWordData, [newWord], dataError);
  }

  if (process === "flashcard") {
    const data = await pickupFlashcards();
    const flashcard = await getFlashcard(data);
    return flashcard.discard;
  }

  if (process === "audio") {
    const data = await pickupAudio();
    const audio = await getAudio(data, "vocabulary");
  }
};

const vocabularyPipeline = async (wordList, process) => {
  await dispatcher(process, wordList);

  setTimeout(() => {
    vocabularyPipeline(wordList, process);
  }, 60000);
};

export default vocabularyPipeline;
