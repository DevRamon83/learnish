import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import summaryModel from "../../models/summaries.js";

const summariesList = async (req, res) => {
  const log = false;
  try {
    const userId = req.context.auth.id;
    if (!userId) {
      const errorMsg = "missing username in summaries list";
      return handleErrorResponse(res, req, errorMsg, 422, true);
    }

    const userSummaries = await summaryModel.find({ owner: userId }).lean();
    return res.status(200).json(userSummaries);
  } catch (err) {
    console.error("Error in summaryList:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default summariesList;
