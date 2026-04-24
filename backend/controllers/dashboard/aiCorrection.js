import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import summaryModel from "../../models/summaries.js";
import doCorrections from "../../services/doCorrections.js";

const aiCorrection = async (req, res) => {
  const log = true;

  try {
    const { id, lang } = req.body;
    const user = req.context.auth;
    const summary = await summaryModel.findById(id);

    if (!summary) {
      const errorMsg = "notFound";
      return handleErrorResponse(res, req, errorMsg, 404, log);
    }

    const owner = summary.owner.toString();

    if (user.id !== owner) {
      const errorMsg = "Unauthorized";
      return handleErrorResponse(res, req, errorMsg, 409, log);
    }

    const newSummary = await doCorrections(summary, lang);

    if (newSummary.error) {
      const errorMsg = newSummary.errorMsg;
      return handleErrorResponse(res, req, errorMsg, 500, log);
    }

    res.status(200).json({ error: false, summary: newSummary.updatedSummary });
  } catch (err) {
    console.error("Error in correction:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default aiCorrection;
