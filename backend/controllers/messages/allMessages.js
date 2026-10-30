import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import { messageModel } from "../../models/messages.js";

const AllMessages = async (req, res) => {
  const log = true;

  try {
    const userId = req.context.auth.id;
    const messages = await messageModel
      .find({
        $or: [{ receiverID: userId }, { senderID: userId }],
      })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({ error: false, data: messages });
  } catch (err) {
    console.error("Error in AllMessages:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default AllMessages;
