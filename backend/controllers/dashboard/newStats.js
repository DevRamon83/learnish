import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import generateStats from "../../services/generateStats.js";
import summaryModel from "../../models/summaries.js";

const newStats = async (req, res) => {
  const log = true;

  try {
    const { id } = req.body;
    const user = req.context.auth;

    const mySummary = await summaryModel.findById(id);

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

    res.status(200).json({ error: false, message: "success" });
  } catch (err) {
    console.error("Error in new stats:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default newStats;
