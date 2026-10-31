import { io } from "socket.io-client";
import socketActions from "./socketActions";
import { API_URLS } from "../constants/apiUrls";

let socket = null;

export const initializeSocket = (backendUrl) => {
  let newActivation = false;
  if (!socket) {
    socket = io(backendUrl, {
      transports: ["websocket"],
      withCredentials: true,
    });
    newActivation = true;
  }
  return { socket, newActivation };
};

export const getSocket = () => {
  return socket;
};

export const socketConnection = () => {
  const backendOrigin = API_URLS.base.replace("/api", "");
  const socketState = initializeSocket(backendOrigin);

  if (socketState.newActivation) {
    socketActions("register_user");
  }
};
