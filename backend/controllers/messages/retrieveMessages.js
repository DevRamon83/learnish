import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import { messageModel } from "../../models/messages.js";

const retrieveMessages = async (req, res) => {
  const log = true;

  try {
    const userID = req.context.auth.id;
    const { peerID, start, end } = req.query;

    const limit = end - start + 1;

    const messages = await messageModel
      .find({ chatID: { $all: [userID, peerID] } })
      .sort({ createdAt: -1 })
      .skip(start)
      .limit(limit)
      .lean();

    res.status(200).json({ error: false, data: messages.reverse() });
  } catch (err) {
    console.error("Error in unreadMessages:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default retrieveMessages;
