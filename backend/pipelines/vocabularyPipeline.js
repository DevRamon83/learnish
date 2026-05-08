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

const writeLog = async (data) => {
  try {
    await pipelinesLogModel.create(data);
  } catch (err) {
    console.error("Vocabulary pipeline log failed: ", err);
  }
};

const attempt = async (func, data, dataError, jump) => {
  if (jump) return { error: true };
  const res = await func(...data);
  if (res.error) {
    dataError.errorMsg = res.errorMsg;
    dataError.type = res.type;
    dataError.service = res.service;
    jump = true;
    await writeLog(dataError);
    return { error: true };
  }

  return { error: false, res };
};

const vocabularyPipeline = async (wordList) => {
  const lastRecord = await vocabularyModel.findOne().sort({ _id: -1 });
  const currentIndex = lastRecord?.index + 1 || 0;
  const wordObj = wordList[currentIndex];

  const word = await vocabularyModel.findOne({ word: wordObj.word });
  let jump = false;

  const dataError = {
    word: wordObj.word,
    process: "internal",
    type: "failed",
    errorMsg: null,
  };

  if (word && word.type === wordObj.type) {
    dataError.errorMsg = "word already exist";
    dataError.type = "duplicate";
    jump = true;
    await writeLog(dataError);
  }

  const mongoObj = await attempt(saveNewWord, [wordObj], dataError, jump);
  const newWord = mongoObj.res?.newWord;
  const myWord = await attempt(getWordData, [newWord], dataError, jump);

  if (myWord.res?.parse.flashcard) {
    await attempt(getFlashcard, [newWord, wordObj], dataError, jump);
  }

  const audioData = [newWord, "vocabulary"];
  const wordAudio = await attempt(audioGroq, audioData, dataError, jump);

  audioData[1] = "examplePhrase";
  const exampleAudio = await attempt(audioGroq, audioData, dataError, jump);

  setTimeout(() => {
    vocabularyPipeline(wordList);
  }, 600000);
};

export default vocabularyPipeline;
