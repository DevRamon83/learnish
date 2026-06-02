import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import { userModel } from "../../models/user.js";
import vocabularyModel from "../../models/vocabulary.js";

const checkPlan = (plan) => {
  const planMap = {
    free: ["A1", "A2"],
    basic: ["A1", "A2", "B1", "B2"],
    pro: ["A1", "A2", "B1", "B2", "C1", "C2"],
  };

  return planMap[plan];
};

const flashcards = async (req, res) => {
  const log = true;
  try {
    const userID = req.context.auth.id;
    const userPlan = await userModel.findById(userID).select("plan").lean();
    const filterBy = checkPlan(userPlan.plan);
    const userWords = await vocabularyModel
      .find({
        flashcard: true,
        level: { $in: filterBy },
      })
      .lean();

    const wordsMap = new Map();

    for (let i = 0; i < 100; i++) {
      const cardIndex = Math.floor(Math.random() * userWords.length);
      wordsMap.set(userWords[cardIndex].index, userWords[cardIndex]);
      userWords.splice(cardIndex, 1);
    }

    res.status(200).json({ error: false, words: Object.fromEntries(wordsMap) });
  } catch (err) {
    console.error("Error in flashcards:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default flashcards;
