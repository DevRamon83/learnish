import summaryModel from "../models/summaries.js";
import getAiCorrection from "./getAiCorrection.js";

const doCorrections = async (summary, lang) => {
  const ai = {};
  let error = false;
  let errorMsg = null;
  let updatedSummary = null;
  try {
    const summaryId = summary._id;
    const userText = summary.summary;
    const resp = await getAiCorrection(userText, lang, summaryId);

    if (resp.error) {
      console.log("resp ", resp);
      error = true;
      errorMsg = resp;
      return { error, errorMsg };
    }

    const mistakes = resp.data.mistakes;
    const errors = mistakes.flatMap((obj) => obj.errorCode.split("-"));
    ai.aiText = resp.data.text;
    ai.mistakes = mistakes;
    ai.errorCodes = errors;
    ai.isDraft = false;
    ai.score = {
      overall: resp.data.score.overall,
      cohesion: resp.data.score.breakdown.cohesion,
      vocabulary: resp.data.score.breakdown.vocabulary,
      grammar: resp.data.score.breakdown.grammar,
    };
    ai.feedback = resp.data.score.feedback;

    updatedSummary = await summaryModel.findOneAndUpdate(
      { _id: summaryId },
      ai,
      { new: true },
    );
    return { error: false, updatedSummary };
  } catch (err) {
    console.error("update failed", err);
    return { error, errorMsg: errorMsg || err };
  }
};

export default doCorrections;
