import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import { userModel } from "../../models/user.js";

const updateMessages = async (req, res) => {
  const log = true;

  try {
    const { userID, receiverName, action } = req.body;

    const user = await userModel.findById(userID);

    if (user.unreadMessages.includes(receiverName) && action === "cleanUp") {
      user.unreadMessages.pull(receiverName);

      await user.save();
    }

    if (action === "wakeUp") {
      user.unreadMessages.push(receiverName);
      await user.save();
    }

    res.status(200).json({
      error: false,
      data: action === "cleanUp" ? user.unreadMessages : "success",
    });
  } catch (err) {
    console.error("Error in updateMessages:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default updateMessages;
