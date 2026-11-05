import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocket, socketConnection } from "../../socket/socketClient";
import { addLiveMessage } from "../../redux/slices/messagesSlice";
import { addNewUnreadMessage } from "../../redux/slices/authSlice";

export default function SocketListener() {
  const loginState = useSelector((state) => state.auth.authState);
  const dispatch = useDispatch();
  const isChatting = useSelector((state) => state.messages.data.isChatting);

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

      if (!isChatting) dispatch(addNewUnreadMessage(data.senderName));
    });

    return () => socket.off("received_msg");
  }, [loginState, isChatting]);

  return null;
}
