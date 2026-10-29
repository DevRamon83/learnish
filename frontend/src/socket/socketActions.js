import { getSocket } from "./socketClient.js";

const socketActions = (handler, data) => {
  const socket = getSocket();

  if (!socket) {
    return { error: true, errorMsg: "socketMissing" };
  }

  socket.emit(handler, data);
};

export default socketActions;
