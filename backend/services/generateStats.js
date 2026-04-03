import defineDate from "../helpers/stats/defineDate.js";
import wordsCounter from "../helpers/stats/wordsCounter.js";
import statsModel from "../models/stats.js";
import misalignmentHandler from "./misalignmentHandler.js";

const generateStats = async (ai, summary) => {
  const mongoIDsummary = summary._id;
  try {
    const { day, month, year } = defineDate(summary.createdAt);
    const userId = summary.owner;
    const words = wordsCounter(summary.summary);
    const mistakes = ai.mistakes.length;
    const errorTypes = ai.errorCodes;

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
          },
        },
      },
      { upsert: true, new: true },
    );
  } catch (err) {
    console.error("stat error ", err);
    misalignmentHandler(mongoIDsummary);
  }
};

export default generateStats;
