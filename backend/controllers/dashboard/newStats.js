import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import generateStats from "../../services/generateStats.js";

const newStats = async (req, res) => {
  const log = true;

  try {
    const { summary } = req.body;
    const user = req.context.auth;
    const owner = summary.owner;

    if (user.id !== owner) {
      const errorMsg = "Unauthorized";
      return handleErrorResponse(res, req, errorMsg, 409, log);
    }

    const stats = await generateStats(summary);

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
