import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import statsModel from "../../models/stats.js";

const getStats = async (req, res) => {
  try {
    const userId = req.context.auth.id;
    const stats = await statsModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json({ error: false, stats });
  } catch (err) {
    console.error("Error in get stats:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default getStats;
