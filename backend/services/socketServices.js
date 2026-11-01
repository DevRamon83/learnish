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
    const newMessage = await messageModel.create(message);
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

const invalidTeacher = (receiver, senderID) => {
  if (!receiver.students) return true;

  return !receiver.students.includes(senderID);
};

const invalidStudent = (receiver, senderID) => {
  if (!receiver.teacher || !receiver.teacher.id) return true;
  return receiver.teacher.id !== senderID;
};

export const validReceiver = async (receiver, senderID, securityCache) => {
  let error = false;
  if (receiver.userType === "student" && invalidStudent(receiver, senderID)) {
    error = "notYourStudent";
  }

  if (receiver.userType === "teacher" && invalidTeacher(receiver, senderID)) {
    const banUser = { securityCache, senderID };
    await banFromSocket(null, banUser);
    error = "banIt";
  }

  return { error };
};
