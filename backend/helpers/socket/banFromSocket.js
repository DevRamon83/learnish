import banUser from "../../services/banUser.js";

export const banFromSocket = async (securityCache, senderID) => {
  securityCache.tokensRevoked.set(senderID);
  securityCache.usersBanned.set(senderID);
  const data = { userID: senderID };

  try {
    await banUser(null, data);
    return { error: false };
  } catch (err) {
    console.error(err);
    return { error: true };
  }
};

export const isBanned = (securityCache, senderID) => {
  if (
    securityCache.tokensRevoked.has(senderID) ||
    securityCache.usersBanned.has(senderID)
  ) {
    return true;
  }

  return false;
};

export const passForwardOrBan = (securityCache, messages, senderID) => {
  const timestamps = Date.now();

  const userTraffic = messages.get(senderID);

  if (!userTraffic) {
    messages.set(senderID, [timestamps]);
  } else {
    userTraffic.push(timestamps);
  }

  if (messages.get(senderID).length > 5) {
    messages.delete(senderID);
    banFromSocket(securityCache, senderID);
    return true;
  }

  return false;
};
