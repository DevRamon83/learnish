import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import { messageModel } from "../../models/messages.js";

const retrieveMessages = async (req, res) => {
  const log = true;

  try {
    const { chatID, indexArray } = req.body;

    const skip = indexArray[0];
    const limit = indexArray[1] - indexArray[0] + 1;

    const messages = await messageModel
      .find({ chatID: { $all: [...chatID] } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.status(200).json({ error: false, data: messages });
  } catch (err) {
    console.error("Error in unreadMessages:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default retrieveMessages;
