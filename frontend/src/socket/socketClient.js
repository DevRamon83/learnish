import { io } from "socket.io-client";

let socket = null;

export const initializeSocket = (backendUrl) => {
  if (!socket) {
    socket = io(backendUrl, {
      transports: ["websocket"],
      withCredentials: true,
    });
  }
  return socket;
};

export const getSocket = () => {
  return socket;
};
