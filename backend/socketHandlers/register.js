import tokensValidator from "../middlewares/auth/tokensValidator.js";

const parseCookies = (cookieString) => {
  if (!cookieString) return {};
  return cookieString.split(";").reduce((cookies, cookie) => {
    const [name, ...value] = cookie.split("=");
    if (name && value) {
      cookies[name.trim()] = value.join("=").trim();
    }
    return cookies;
  }, {});
};

const register = async (socket, contextMaps) => {
  const { securityCache, connectedUsers } = contextMaps;

  const rawCookies = socket.handshake.headers.cookie || "";
  const parsedCookies = parseCookies(rawCookies);
  const req = {
    cookies: parsedCookies,
    context: {
      tokens: { rotate: false, payload: null },
      tokensRevoked: securityCache.tokensRevoked,
      usersBanned: securityCache.usersBanned,
      auth: { username: null, id: null, type: null, plan: null },
    },
  };

  const isValid = await tokensValidator(req, null, null);

  if (isValid.error) return;

  const { payload } = isValid;

  connectedUsers.set(payload.id, {
    socketId: socket.id,
    username: payload.username,
  });
  socket.owner = payload.id;
};

export default register;
