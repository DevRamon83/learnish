import { useEffect } from "react";
import {
  chatInfo,
  formatMessage,
  notifyToBackend,
} from "../helpers/chatHelpers";
import { getSocket } from "../socket/socketClient";

const useChatSocket = (
  setMessages,
  setNotification,
  messagesCache,
  receiverID,
) => {
  useEffect(() => {
    const socket = getSocket();
    socket.on("received_msg", async (data) => {
      if (data.banned) {
        window.location.reload();
        return;
      }

      const { iAmReceiver, iAmSender, cacheName, receiver404 } = chatInfo(data);
      if (receiver404) notifyToBackend(data);

      const newMessage = formatMessage(data, iAmReceiver, iAmSender);

      const imChattingWithYou = iAmReceiver && receiverID === data.senderID;
      if (iAmSender || imChattingWithYou) {
        setMessages((prev) => [...prev, newMessage]);
      }

      const cache = messagesCache.current.get(cacheName);
      if (!cache) {
        return setNotification(data.senderName);
      }

      if (iAmReceiver && !imChattingWithYou) {
        setNotification(data.senderName);
      }

      const indexes = cache.get("indexes");
      const newFinishIndex = indexes[1] + 1;
      indexes[1] = newFinishIndex;
      const messagesMap = cache.get("messages");

      messagesMap.push(newMessage);
    });

    return () => socket.off("received_msg");
  }, [receiverID]);
};

export default useChatSocket;
