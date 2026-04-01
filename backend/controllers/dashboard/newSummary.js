import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import getVideoMetadata from "../../services/getVideoMetadata.js";
import getAiCorrection from "../../services/getAiCorrection.js";
import { userModel } from "../../models/user.js";
import summaryModel from "../../models/summaries.js";

const newSummary = async (req, res) => {
  const log = false;

  try {
    const { id } = req.context.auth;

    const user = await userModel
      .findOne({ _id: id })
      .select("shareErrors")
      .lean();

    const { summary, idVideo, lang } = req.body;

    const video = await getVideoMetadata(idVideo);

    if (video.error) {
      const errorMsg = video.errorMsg;
      return handleErrorResponse(res, req, errorMsg, 409, log);
    }

    const resp = await getAiCorrection(summary, lang);
    if (resp.error) {
      const errorMsg = video.errorMsg;
      return handleErrorResponse(res, req, errorMsg, 409, log);
    }

    const mistakes = resp.data.mistakes;

    const errors = mistakes.flatMap((obj) => obj.errorCode.split("-"));

    const data = {
      title: video.title,
      channel: video.channel,
      thumbnail: video.thumbnail,
      videoID: idVideo,
      summary,
      aiText: resp.data.text,
      mistakes,
      errorCodes: errors,
      shared: user.shareErrors,
      owner: id,
    };

    await summaryModel.create(data);
    return res.status(200).json({ error: false });
  } catch (err) {
    console.error("Error in login:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default newSummary;
