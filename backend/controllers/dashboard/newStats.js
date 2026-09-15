import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import generateStats from "../../services/generateStats.js";
import summaryModel from "../../models/summaries.js";

const summaryFinder = async (id, summary) => {
  if (!id && !summary) return false;
  if (summary) return summary;
  return await summaryModel.findById(id);
};

const newStats = async (req, res) => {
  const log = true;

  try {
    const { id, summary } = req.body;
    const user = req.context.auth;

    const mySummary = await summaryFinder(id, summary);

    if (!mySummary) {
      const errorMsg = "notFound";
      return handleErrorResponse(res, req, errorMsg, 404, log);
    }

    const owner = mySummary.owner;

    if (user.id !== owner.toString()) {
      const errorMsg = "Unauthorized";
      return handleErrorResponse(res, req, errorMsg, 409, log);
    }

    const stats = await generateStats(mySummary);

    if (stats.error) {
      const errorMsg = stats.errorMsg;
      return handleErrorResponse(res, req, errorMsg, 500, log);
    }

    res.status(200).json({ error: false, summary: stats.summary });
  } catch (err) {
    console.error("Error in new stats:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default newStats;
