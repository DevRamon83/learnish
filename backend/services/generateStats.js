import wordsCounter from "../helpers/stats/wordsCounter.js";
import statsModel from "../models/stats.js";
import summaryModel from "../models/summaries.js";
import misalignmentHandler from "./misalignmentHandler.js";
import bundle from "../../shared/index.js";
const { defineDate } = bundle.helpers;

const generateStats = async (summary) => {
  const mongoIDsummary = summary._id;
  try {
    const { day, month, year } = defineDate(summary.createdAt);
    const userId = summary.owner;
    const words = wordsCounter(summary.summary);
    const mistakes = summary.mistakes.length;
    const errorTypes = summary.errorCodes;

    await statsModel.findOneAndUpdate(
      { userId, year, month },
      {
        $push: {
          dayStat: {
            day,
            mongoIDsummary,
            words,
            mistakes,
            errorTypes,
            score: {
              overall: summary.score.overall,
              cohesion: summary.score.cohesion,
              vocabulary: summary.score.vocabulary,
              grammar: summary.score.grammar,
            },
          },
        },
      },
      { upsert: true, new: true },
    );

    const updateSummary = await summaryModel.findOneAndUpdate(
      { _id: mongoIDsummary },
      { misalignment: false },
      { upsert: true, new: true },
    );

    return { error: false, summary: updateSummary };
  } catch (err) {
    console.error("stat error ", err);
    misalignmentHandler(mongoIDsummary);
    return { error: true, errorMsg: err.message || err };
  }
};

export default generateStats;
