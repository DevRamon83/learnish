export const organizeMessages = (messageArray, userID) => {
  const allMessages = {};
  const newSenders = new Set();
  let newMessage = false;

  for (let i = 0; i < messageArray.length; i++) {
    const message = messageArray[i];
    const { senderID, receiverID } = message;
    const peerID = userID === senderID ? receiverID : senderID;
    const isTracked = allMessages[peerID];

    if (!isTracked) {
      allMessages[peerID] = [];
    }

    if (!message.read) {
      newMessage = true;
    }
    newSenders.add(peerID);

    allMessages[peerID].push(message);
  }

  return {
    allMessages,
    newSenders: [...newSenders],
    newMessage,
  };
};
