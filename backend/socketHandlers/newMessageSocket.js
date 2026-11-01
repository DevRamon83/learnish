import bundle from "shared";
import {
  banFromSocket,
  isBanned,
  passForwardOrBan,
} from "../helpers/socket/banFromSocket.js";
import {
  sendMessage,
  validReceiver,
  workOnDb,
} from "../services/socketServices.js";
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
    chatID: [senderID, receiverID],
    error,
  };
};

const newMessageSocket = async (io, contextMaps, message, socket) => {
  const { securityCache, connectedUsers, messages } = contextMaps;
  const senderID = socket.owner;
  const senderSession = connectedUsers.get(senderID);
  const senderName = senderSession.username;

  const isValidMessage = validateChatMessage(message.content);
  if (!isValidMessage) {
    banFromSocket(securityCache, senderID, senderName);
    return socket.emit("received_msg", { banned: true });
  }

  const { receiverID } = message;

  if (!senderSession) return;

  const wantBan = passForwardOrBan(
    securityCache,
    messages,
    senderID,
    senderName,
  );
  if (wantBan) return socket.emit("received_msg", { banned: wantBan });

  const banned = isBanned(securityCache, receiverID);
  let error = banned ? "bannedReceiver" : "receiver404";

  let receiver = null;
  let isReceiverValid = null;

  if (!banned) {
    receiver = await workOnDb({ userID: receiverID }, "userExist");
    isReceiverValid = await validReceiver(receiver, senderID, securityCache);
  }

  if (isReceiverValid && isReceiverValid.error === "banIt") {
    return socket.emit("received_msg", { banned: true });
  }

  if (isReceiverValid && isReceiverValid.error) {
    error = receiver.isBanned ? error : "notYourStudent";
    receiver = null;
  }

  const senderData = { senderName, senderID };
  const data = getDataMessage(senderData, message, error);

  if (!receiver || banned) return socket.emit("received_msg", data);

  const newMessage = await workOnDb(data, "newMessage");
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
  data.receiverIsOnline = isOnline || false;
  data.whoAmI = senderID;
  socket.emit("received_msg", data);

  if (!isOnline) {
    workOnDb({ receiver, senderName }, "receiverOffline");
  }
};

export default newMessageSocket;
