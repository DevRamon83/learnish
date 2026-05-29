import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import vocabularyModel from "../../models/vocabulary.js";

// need plan block logic (is a middleware)
const flashcards = async (req, res) => {
  const log = true;
  try {
    const words = await vocabularyModel.find({ flashcard: true }).lean();
    res.status(200).json({ error: false, words });
  } catch (err) {
    console.error("Error in flashcards:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default flashcards;
