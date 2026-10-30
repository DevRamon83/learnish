import { isBanned, passForwardOrBan } from "../helpers/socket/banFromSocket.js";
import { notifyMessage, workOnDb } from "../services/socketServices.js";

const newMessageSocket = async (io, contextMaps, message) => {
  const { securityCache, connectedUsers, messages } = contextMaps;
  const { senderID, senderName, receiverID, receiverName, content, userID } =
    message;

  const banned = isBanned(securityCache, senderID);

  if (banned) return;

  const receiverExist = await workOnDb({ userID: receiverID }, "userExist");

  if (!receiverExist) return;

  const wantBan = passForwardOrBan(securityCache, messages, senderID);
  const sender = connectedUsers.get(senderID);

  if (wantBan) {
    io.to(sender.socketId).emit("received_msg", {
      banned: wantBan,
    });
    return;
  }

  // validazione (da scrivere)
  const newMessage = await workOnDb(message, "newMessage");

  messages.get(senderID).length === 1
    ? messages.delete(senderID)
    : messages.get(senderID).shift();

  const whoAmI = userID === senderID ? "sender" : "receiver";

  const data = {
    whoAmI,
    receiverID,
    receiverName,
    senderID,
    senderName,
    content,
    messageID: newMessage._id,
    createdAt: newMessage.createdAt,
  };

  notifyMessage(io, connectedUsers, data, "sender");
  notifyMessage(io, connectedUsers, data, "receiver");
};

export default newMessageSocket;
