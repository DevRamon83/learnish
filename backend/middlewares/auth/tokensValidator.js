import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import tokenChecker from "../../helpers/middleware/tokenChecker.js";

const rtErrorHandler = (data) => {
  const { res, req, errorType, status } = data;
  let log = false;
  let ipBann = false;
  if (errorType === "invalidToken") {
    log = true;
    ipBann = true;
    handleErrorResponse(res, req, errorType, status, log, ipBann);
  } else {
    handleErrorResponse(res, req, errorType, status, log, ipBann);
  }
};

const tokensValidator = async (req, res, next) => {
  let log = true;
  let ipBann = true;
  let rotateToken = false;
  const tokensRevoked = req.context.tokensRevoked;
  const ipsBanned = req.context.ipsBanned;

  if (ipsBanned.has(req.ip)) {
    ipBann = false;
    const errorType = "ipBanned";
    return handleErrorResponse(res, req, errorType, 401, log, ipBann);
  }

  const accessToken = await tokenChecker(req, "accessToken");

  if (accessToken.error && accessToken.errorType === "invalidToken") {
    const errorType = accessToken.errorType;
    return handleErrorResponse(res, req, errorType, 401, log, ipBann);
  }

  if (accessToken.error) {
    rotateToken = true;
  }

  let refreshToken = null;

  if (accessToken.error) {
    refreshToken = await tokenChecker(req, "refreshToken");
  }

  if (refreshToken && refreshToken.error) {
    const errorType = refreshToken.errorType;
    const status = 401;
    const data = { res, req, errorType, status };
    return rtErrorHandler(data);
  }

  const payload = refreshToken ? refreshToken.payload : accessToken.payload;
  const username = payload.username;

  if (tokensRevoked.has(username)) {
    log = false;
    const errorType = "mustLogged";
    return handleErrorResponse(res, req, errorType, 401, log, ipBann);
  }

  req.context.tokens.rotate = rotateToken;
  req.context.tokens.payload = payload;
  next();
};

export default tokensValidator;
