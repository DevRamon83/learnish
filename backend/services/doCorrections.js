import summaryModel from "../models/summaries.js";
import generateStats from "./generateStats.js";
import getAiCorrection from "./getAiCorrection.js";

const doCorrections = async (summary, lang) => {
  const ai = {};
  try {
    const summaryId = summary._id;
    const userText = summary.summary;
    const resp = await getAiCorrection(userText, lang, summaryId);
    // logs update already handle
    if (resp.error) return;

    const mistakes = resp.data.mistakes;
    const errors = mistakes.flatMap((obj) => obj.errorCode.split("-"));
    ai.aiText = resp.data.text;
    ai.mistakes = mistakes;
    ai.errorCodes = errors;
    ai.isDraft = false;

    await summaryModel.updateOne({ _id: summaryId }, ai);
  } catch (err) {
    console.error("update failed", err);
    return;
  }

  generateStats(ai, summary);
};

export default doCorrections;
