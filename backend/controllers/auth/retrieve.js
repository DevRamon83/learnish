import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import { userModel } from "../../models/user.js";

const retrieve = async (req, res) => {
  const log = true;
  try {
    const data = req.body;
    const userID = req.context.auth.id;
    const datum = await userModel.findById(userID).select(data.retrieve);
    return res.status(201).json(datum);
  } catch (err) {
    console.error("Error in retrieve:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default retrieve;
