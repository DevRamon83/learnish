import { useEffect } from "react";
import fetchRetrieveMessages from "../api/handlers/fetchRetrieveMessages";

const retrieveMessages = async (
  receiverID,
  messagesMap,
  setMessages,
  controller,
) => {
  const res = await fetchRetrieveMessages(
    receiverID,
    [0, 9],
    controller.signal,
  );

  if (res.error) {
    // error handler
  } else {
    const dataFallback = res.data.length > 0 ? res.data : [];

    // Mutate the cache map directly to persist the initial chunk of fetched messages
    messagesMap.push(...dataFallback);
    setMessages(dataFallback);
  }
};

const useChatRetriever = (messagesCachet, receiverID, setMessages) => {
  useEffect(() => {
    const senderCache = messagesCachet.current.get(receiverID);
    if (!senderCache) return;
    const indexes = senderCache.get("indexes");

    // If the upper index is not 9, the initial message chunk (0-9)
    // has already been fetched or modified
    if (indexes[1] !== 9) return;
    const messagesMap = senderCache.get("messages");
    if (messagesMap.length > 0) return;

    const controller = new AbortController();

    retrieveMessages(receiverID, messagesMap, setMessages, controller);

    return () => controller.abort();
  }, [messagesCachet, receiverID]);
};

export default useChatRetriever;
