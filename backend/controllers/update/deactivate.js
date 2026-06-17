import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import { userModel } from "../../models/user.js";

const deactivate = async (req, res) => {
  const log = true;

  try {
    const userID = req.context.auth.id;
    const contract = req.body.contract;
    const user = await userModel.findById(userID);
    user.contract[contract].available = false;
    await user.save();

    return res.status(200).json({ error: false });
  } catch (err) {
    console.error("Error in deactivate:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default deactivate;
