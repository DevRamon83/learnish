import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import summaryModel from "../../models/summaries.js";

const newSummary = async (req, res) => {
  const log = false;

  try {
    const { id, shared } = req.context.auth;

    const { summary, idVideo, lang, title } = req.body;
    const userLang = lang;

    const data = {
      title: title,
      videoID: idVideo,
      summary,
      shared,
      owner: id,
    };

    const mySummary = await summaryModel.create(data);

    res.status(200).json({ error: false, summary: mySummary });
  } catch (err) {
    console.error("Error in newSummary:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default newSummary;
