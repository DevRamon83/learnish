import bundle from "shared";
import {
  banFromSocket,
  isBanned,
  passForwardOrBan,
} from "../helpers/socket/banFromSocket.js";
import { sendMessage, workOnDb } from "../services/socketServices.js";
const { validateChatMessage } = bundle.validators;

const getDataMessage = (senderData, message, error) => {
  const { receiverID, receiverName, content } = message;
  const { senderName, senderID } = senderData;

  return {
    banned: false,
    whoAmI: senderID,
    receiverID,
    receiverName,
    senderID,
    senderName,
    content,
    messageID: null,
    createdAt: null,
    receiverIsOnline: null,
    error,
  };
};

const newMessageSocket = async (io, contextMaps, message, socket) => {
  const senderID = socket.owner;

  const isValidMessage = validateChatMessage(message.content);
  if (!isValidMessage) {
    banFromSocket(securityCache, senderID);
    return socket.emit("received_msg", { banned: true });
  }

  const { securityCache, connectedUsers, messages } = contextMaps;
  const { receiverID } = message;

  const senderSession = connectedUsers.get(senderID);

  if (!senderSession) return;

  const senderName = senderSession.username;

  const wantBan = passForwardOrBan(securityCache, messages, senderID);
  if (wantBan) return socket.emit("received_msg", { banned: wantBan });

  const banned = isBanned(securityCache, receiverID);
  const error = banned ? "bannedReceiver" : "receiver404";

  let receiver = null;

  if (!banned) {
    receiver = await workOnDb({ userID: receiverID }, "userExist");
  }

  const senderData = { senderName, senderID };
  const data = getDataMessage(senderData, message, error);

  if (!receiver || banned) return socket.emit("received_msg", data);

  // validazione (da scrivere)
  const newMessage = await workOnDb(message, "newMessage");

  if (!newMessage) {
    data.error = "CannotSaveMessage";
    return socket.emit("received_msg", data);
  }

  data.error = false;
  data.messageID = newMessage._id;
  data.createdAt = newMessage.createdAt;

  messages.get(senderID).length === 1
    ? messages.delete(senderID)
    : messages.get(senderID).shift();

  data.whoAmI = receiverID;
  const isOnline = sendMessage(io, connectedUsers, data);
  data.receiverIsOnline = isOnline;
  data.whoAmI = senderID;
  socket.emit("received_msg", data);

  if (!isOnline) {
    workOnDb({ receiver, senderName }, "receiverOffline");
  }
};

export default newMessageSocket;
