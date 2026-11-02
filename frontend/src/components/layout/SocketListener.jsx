import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocket, socketConnection } from "../../socket/socketClient";
import { addLiveMessage } from "../../redux/slices/messagesSlice";

export default function SocketListener() {
  const loginState = useSelector((state) => state.auth.authState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginState !== "authenticated") return;

    socketConnection();
    const socket = getSocket();
    socket.on("received_msg", (data) => {
      if (data.banned) {
        window.location.reload();
        return;
      }

      dispatch(addLiveMessage(data));
    });

    return () => socket.off("received_msg");
  }, [loginState]);

  return null;
}
