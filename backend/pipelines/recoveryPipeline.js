import pipelinesLogModel from "../models/logs/pipelinesLog.js";
import vocabularyModel from "../models/vocabulary.js";
import { attempt } from "./helpers/commons.js";
import getWordData from "./helpers/wordData.js";

const canDelete = async (id) => {
  try {
    const deletedDocument = await pipelinesLogModel.findByIdAndDelete(id);
    console.log("deleted successfully ");
  } catch (err) {
    console.log("failed ", err);
  }
};

const delay = async () => {
  return new Promise((resolve) => setTimeout(resolve, 70000));
};

export const recoveryWordData = async () => {
  const records = await pipelinesLogModel.find({});

  for (let i = 0; i < records.length; i++) {
    const wrongWord = records[i].word;
    const wordObj = await vocabularyModel.findOne({ word: wrongWord });
    const myWord = await attempt(getWordData, [wordObj]);

    if (!myWord.error) {
      await canDelete(records[i]._id);
    } else {
      console.log("failed");
    }

    await delay();
  }
};

export const recoveryMissingValues = async (value) => {
  const recordsToFix = await vocabularyModel.find({
    [value]: { $exists: false },
  });

  for (let i = 0; i < recordsToFix.length; i++) {
    const myWord = await attempt(getWordData, [recordsToFix[i]]);

    if (!myWord.error) {
      console.log("recover");
    } else {
      console.log("failed ", wrongWord);
    }

    await delay();
  }
};
