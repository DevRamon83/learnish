import { messageModel } from "../models/messages.js";
import { userModel } from "../models/user.js";

const idChecker = async (data) => {
  const { userID } = data;
  try {
    const user = await userModel.findById(userID);
    return user;
  } catch (err) {
    return false;
  }
};

const createMessage = async (message) => {
  try {
    const newMessage = await messageModel.create(message).lean();
    return newMessage;
  } catch (err) {
    return null;
  }
};

const receiverOffline = async (data) => {
  const { receiver, senderName } = data;
  try {
    if (!receiver.unreadMessages.includes(senderName)) {
      receiver.unreadMessages.push(senderName);
      await receiver.save();
    }
  } catch (err) {
    console.error("Errore notifica offline:", err);
  }
};

export const workOnDb = async (data, key) => {
  switch (key) {
    case "userExist":
      return await idChecker(data);
    case "newMessage":
      return await createMessage(data);
    case "receiverOffline":
      return await receiverOffline(data);
    default:
      return false;
  }
};

export const sendMessage = (io, connectedUsers, data) => {
  const { receiverID } = data;

  const recipient = connectedUsers.get(receiverID);

  if (recipient) {
    io.to(recipient.socketId).emit("received_msg", data);
  }

  return recipient;
};
