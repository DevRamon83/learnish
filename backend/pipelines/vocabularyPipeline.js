import mistralCli from "../ai/fetch/mistralFetch.js";
import {
  mistralVocabularyPrompt,
  pollinationsImgPrompt,
} from "../ai/prompt/prompt.js";
import vocabularyModel from "../models/vocabulary.js";
import saveNewWord from "./helpers/saveNewWord.js";
import getWordData from "./helpers/wordData.js";
import uploadFile from "./helpers/uploadFile.js";
import getFlashcard from "./helpers/flashcard.js";
import pipelinesLogModel from "../models/logs/pipelinesLog.js";
import audioGroq from "./helpers/audioGroq.js";
import { attempt } from "./helpers/commons.js";

const dailyRecordCounter = async () => {
  const today = new Date().setHours(0, 0, 0, 0);
  const count = await vocabularyModel.countDocuments({
    createdAt: { $gte: today },
  });

  return count;
};

const dispatcher = async (process, wordObj, dataError) => {
  if (process === "wordsData") {
    const mongoObj = await attempt(saveNewWord, [wordObj], dataError);
    const newWord = mongoObj.res?.newWord;
    const myWord = await attempt(getWordData, [newWord], dataError);
  }

  if (process === "flashcard") {
    // need a check on flashcard schema flag
    // Cannot access newWord, it is out of scope
    // await attempt(getFlashcard, [newWord, wordObj], dataError);
  }

  if (process === "audio") {
    // Cannot access newWord, it is out of scope
    /*
    const audioData = [newWord, "vocabulary"];
    const wordAudio = await attempt(audioGroq, audioData, dataError);

    audioData[1] = "examplePhrase";
    const exampleAudio = await attempt(audioGroq, audioData, dataError);
    */
  }
};

const vocabularyPipeline = async (wordList, process) => {
  /* don't need of a rateLimit in this phase
   const rateLimit = await dailyRecordCounter();
   if (rateLimit === 49) return;
*/
  console.log("go");
  const lastRecord = await vocabularyModel.findOne().sort({ index: -1 });
  const currentIndex = lastRecord?.index + 1 || 0;
  const wordObj = wordList[currentIndex];

  const word = await vocabularyModel.findOne({ word: wordObj.word });
  const dataError = {
    word: wordObj.word,
    process: "internal",
    type: "failed",
    errorMsg: null,
    skip: false,
  };

  if (word && word.type === wordObj.type) {
    dataError.errorMsg = "word already exist";
    dataError.type = "duplicate";
    dataError.skip = true;
    await writeLog(dataError);
  }

  await dispatcher(process, wordObj, dataError);

  setTimeout(() => {
    vocabularyPipeline(wordList, process);
  }, 70000);
};

export default vocabularyPipeline;
