import newMessageSocket from "./socketHandlers/newMessageSocket.js";
import register from "./socketHandlers/register.js";

const initSocketLogic = (io, contextMaps) => {
  const { connectedUsers } = contextMaps;
  io.on("connection", (socket) => {
    socket.on("register_user", (data) => {
      register(socket, contextMaps.connectedUsers, data);
    });

    socket.on("send_msg", (message) => {
      newMessageSocket(io, contextMaps, message);
    });

    socket.on("disconnect", () => {
      const userId = socket.customUserId;

      if (userId) {
        connectedUsers.delete(userId);
      }
    });
  });
};

export default initSocketLogic;
