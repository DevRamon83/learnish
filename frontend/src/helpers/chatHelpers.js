import fetchRetrieveMessages from "../api/handlers/fetchRetrieveMessages";
import fetchUpdateMessages from "../api/handlers/fetchUpdateMessages";

export const chatInfo = (data) => {
  const iAmSender = data.whoAmI === "sender";
  const iAmReceiver = data.whoAmI === "receiver";
  const cacheName = iAmReceiver ? data.senderID : data.receiverID;
  const receiver404 = !data.receiverIsOnline && iAmSender;

  return { iAmReceiver, iAmSender, cacheName, receiver404 };
};

export const notifyToBackend = async (data) => {
  const notificationObj = {
    userID: data.receiverID,
    receiverName: data.senderName,
    action: "wakeUp",
  };
  const res = await fetchUpdateMessages(notificationObj);
  if (res.error) {
    // error handler
  }
};

export const formatMessage = (data) => {
  return {
    _id: data.messageID,
    chatID: data.chatID,
    content: data.content,
    createdAt: data.createdAt,
    receiverID: data.receiverID,
    receiverName: data.receiverName,
    senderID: data.senderID,
    senderName: data.senderName,
  };
};

export const updateCache = async (allMessages, myCache) => {
  allMessages.forEach((message) => {
    const myMessage = formatMessage(message);
    const allMessagesCache = myCache.get("messages");
    const indexes = myCache.get("indexes");
    const newFinishIndex = indexes[1] + 1;
    indexes[1] = newFinishIndex;
    allMessagesCache.push(myMessage);
  });
};

export const resetCache = (allSenders, messagesCache) => {
  allSenders.forEach((sender) => {
    const myCache = messagesCache.current.get(sender);
    if (!myCache) return;
    myCache.clear();
    myCache.set("messages", []);
    myCache.set("indexes", [0, 9]);
  });
};

const handleMessageShift = (retrieved, messagesMap, indexes, setMessages) => {
  const uniqueOlderMessages = retrieved.filter(
    (msg) => !messages.includes(msg._id),
  );

  if (uniqueOlderMessages.length > 0) {
    messagesMap.unshift(...uniqueOlderMessages);
    setMessages([...messagesMap]);
    indexes[1] = indexes[1] + uniqueOlderMessages.length;
  }
};

export const olderHandler = async (data, mapStates) => {
  const { messages, setMessages, olderBtn, setOlderBtn } = mapStates;
  const { receiverID, messagesCache, strings } = data;
  if (olderBtn !== strings.olderText) return;
  setOlderBtn(strings.pending);
  const chat = messagesCache.current.get(receiverID);
  const indexes = chat.get("indexes");
  const messagesMap = chat.get("messages");
  const retrieveIndexes = [indexes[1] + 1, indexes[1] + 10];

  const res = await fetchRetrieveMessages(receiverID, retrieveIndexes);

  if (res.error) {
    setOlderBtn(strings.error);
    return;
  }

  if (!res.data[0]) return setOlderBtn(strings.finish);

  const firstMessageId = res.data[0]._id;

  // EDGE CASE: "Simultaneous Message Shift"
  // Handles a race condition where a new incoming message shifts the DB indices
  // a split second before this query runs, causing the server to return duplicates.
  // 'handleMessageShift' filters the duplicates and re-aligns the cache indexes.
  if (messages.includes(firstMessageId)) {
    handleMessageShift(res.data, messagesMap, indexes, setMessages);
  } else {
    messagesMap.unshift(...res.data);
    setMessages([...messagesMap]);
    indexes[1] = indexes[1] + res.data.length;
  }

  setOlderBtn(strings.olderText);
};
