import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import { messageModel } from "../../models/messages.js";

const unreadMessages = async (req, res) => {
  const log = true;

  try {
    const userId = req.context.auth.id;
    const messages = await messageModel
      .find({ receiverID: userId, read: false })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({ error: false, data: messages });
  } catch (err) {
    console.error("Error in unreadMessages:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default unreadMessages;
