import vocabularyModel from "../../models/vocabulary.js";
import { writeLog } from "./commons.js";

export const pickupWordData = async (wordList) => {
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

  return { wordObj, dataError };
};

export const pickupFlashcards = async () => {
  const records = await vocabularyModel.find({ type: "noun" });
  const wordObj = () => {
    for (let i = 0; i < records.length; i++) {
      if (records[i].discard) {
        continue;
      }
      if (records[i].discard === undefined) {
        return { finish: false, wordObj: records[i] };
      }

      if (i + 1 === records.length) {
        return { finish: true };
      }
    }
  };
  return wordObj();
};
