import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import { userModel } from "../../models/user.js";

const retrieve = async (req, res) => {
  const log = true;
  const ban = true;
  try {
    const data = req.body;
    const userID = req.context.auth.id;

    const datum = await userModel.findById(userID).select(data.retrieve);

    if (!datum[data.retrieve] && data.retrieve !== "teacher") {
      return handleErrorResponse(res, req, "invalid retrieve", 400, log, ban);
    }

    return res.status(201).json(datum);
  } catch (err) {
    console.error("Error in retrieve:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default retrieve;
