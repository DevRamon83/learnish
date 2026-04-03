import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import getVideoMetadata from "../../services/getVideoMetadata.js";
import summaryModel from "../../models/summaries.js";
import doCorrections from "../../services/doCorrections.js";
const newSummary = async (req, res) => {
  const log = false;
  let mySummary = null;
  let userLang = null;

  try {
    const { id, shared } = req.context.auth;

    const { summary, idVideo, lang } = req.body;
    userLang = lang;

    const video = await getVideoMetadata(idVideo);

    if (video.error) {
      const errorMsg = video.errorMsg;
      return handleErrorResponse(res, req, errorMsg, 409, log);
    }

    const data = {
      title: video.title,
      channel: video.channel,
      thumbnail: video.thumbnail,
      videoID: idVideo,
      summary,
      isDraft: true,
      shared,
      owner: id,
    };

    mySummary = await summaryModel.create(data);

    // Respond immediately to the user to bypass AI analysis latency
    res.status(200).json({ error: false, summaryId: mySummary._id });
  } catch (err) {
    console.error("Error in login:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }

  // Process summary analysis asynchronously without affecting response time
  doCorrections(mySummary, lang);
};

export default newSummary;
