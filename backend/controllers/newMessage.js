import handleErrorResponse from "../helpers/handleErrorResponse.js";
import messageModel from "../models/messages.js";

const newMessage = async (req, res) => {
  const log = true;
  try {
    const data = req.body;
    await messageModel.create(data);
    return res.status(201).json({ error: false, message: "created" });
  } catch (err) {
    console.error("Error in newMessage:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default newMessage;
