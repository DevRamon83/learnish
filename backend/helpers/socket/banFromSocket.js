import banUser from "../../services/banUser.js";

export const banFromSocket = async (securityCache, senderID, senderName) => {
  securityCache.tokensRevoked.add(senderName);
  securityCache.usersBanned.add(senderName);
  const data = { userID: senderID };

  try {
    await banUser(null, data);
    return { error: false };
  } catch (err) {
    console.error(err);
    return { error: true };
  }
};

export const isBanned = (securityCache, senderName) => {
  if (
    securityCache.tokensRevoked.has(senderName) ||
    securityCache.usersBanned.has(senderName)
  ) {
    return true;
  }

  return false;
};

export const passForwardOrBan = (
  securityCache,
  messages,
  senderID,
  senderName,
) => {
  const banned = isBanned(securityCache, senderName);
  if (banned) return true;
  const timestamps = Date.now();

  const userTraffic = messages.get(senderID);

  if (!userTraffic) {
    messages.set(senderID, [timestamps]);
  } else {
    userTraffic.push(timestamps);
  }

  if (messages.get(senderID).length > 5) {
    messages.delete(senderID);
    banFromSocket(securityCache, senderID, senderName);
    return true;
  }

  return false;
};
