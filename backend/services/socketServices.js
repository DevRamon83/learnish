import { messageModel } from "../models/messages.js";
import { userModel } from "../models/user.js";

const idChecker = async (data) => {
  const { userID } = data;
  try {
    await userModel.findById(userID).lean();
    return true;
  } catch (err) {
    return false;
  }
};

const createMessage = async (message) => {
  try {
    const newMessage = await messageModel.create(message);
    return newMessage;
  } catch (err) {
    return null;
  }
};

export const workOnDb = async (data, key) => {
  switch (key) {
    case "userExist":
      return await idChecker(data);
    case "newMessage":
      return await createMessage(data);
    default:
      return false;
  }
};

export const notifyMessage = (io, connectedUsers, data, notifyTo) => {
  const { receiverID, senderID } = data;
  const id = notifyTo === "sender" ? senderID : receiverID;

  const recipient = connectedUsers.get(id);

  if (recipient) {
    io.to(recipient.socketId).emit("received_msg", data);
  }
};
