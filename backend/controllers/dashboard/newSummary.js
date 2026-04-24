import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import getVideoMetadata from "../../services/getVideoMetadata.js";
import summaryModel from "../../models/summaries.js";

const newSummary = async (req, res) => {
  const log = false;

  try {
    const { id, shared } = req.context.auth;

    const { summary, idVideo, lang } = req.body;
    const userLang = lang;
    // const video = await getVideoMetadata(idVideo);

    const video = {
      error: false,
      title: "title patch",
      channel: "channel patch",
    };

    if (video.error) {
      const errorMsg = "retryDraft";
      return handleErrorResponse(res, req, errorMsg, 409, log);
    }

    const data = {
      title: video.title,
      channel: video.channel,
      videoID: idVideo,
      summary,
      shared,
      owner: id,
    };

    const mySummary = await summaryModel.create(data);

    // Respond immediately to the user to bypass AI analysis latency
    res.status(200).json({ error: false, summary: mySummary });
  } catch (err) {
    console.error("Error in newSummary:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default newSummary;
